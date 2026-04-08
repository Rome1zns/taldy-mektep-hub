import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  File as FileIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  publicationsSupabase,
  publicationsPublicUrl,
} from "@/integrations/supabase/publications-client";

type Publication = {
  id: string;
  school_number: number;
  category: string;
  category_slug: string;
  original_filename: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_at: string;
};

type Status = "loading" | "ready" | "empty" | "error";

interface PublicationsTabProps {
  schoolNumber: number;
}

const publicUrl = publicationsPublicUrl;

function formatSize(bytes: number | null): string {
  if (!bytes && bytes !== 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

function iconFor(filename: string) {
  const ext = extOf(filename);
  if (ext === "pdf") return FileText;
  if (["doc", "docx", "txt", "rtf"].includes(ext)) return FileText;
  if (["xls", "xlsx", "csv"].includes(ext)) return FileSpreadsheet;
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return FileImage;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return FileArchive;
  return FileIcon;
}

function isPdf(p: Publication) {
  return extOf(p.original_filename) === "pdf";
}

function isImage(p: Publication) {
  return ["jpg", "jpeg", "png", "webp", "gif"].includes(extOf(p.original_filename));
}

const PublicationsTab = ({ schoolNumber }: PublicationsTabProps) => {
  const [items, setItems] = useState<Publication[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<Publication | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setErrorMsg("");
    const { data, error } = await publicationsSupabase
      .from("school_publications")
      .select(
        "id, school_number, category, category_slug, original_filename, storage_path, mime_type, size_bytes, uploaded_at"
      )
      .eq("school_number", schoolNumber)
      .order("uploaded_at", { ascending: false });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    if (!data || data.length === 0) {
      setItems([]);
      setStatus("empty");
      return;
    }
    setItems(data as Publication[]);
    setStatus("ready");
  }, [schoolNumber]);

  useEffect(() => {
    void load();
  }, [load]);

  // Filter then group by category
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter((p) => p.original_filename.toLowerCase().includes(q))
      : items;
    const map = new Map<string, Publication[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, "kk"));
  }, [items, query]);

  // Open handler: PDF/image → modal preview, others → download
  const handleOpen = (p: Publication) => {
    if (isPdf(p) || isImage(p)) {
      setPreview(p);
    } else {
      window.open(publicUrl(p.storage_path), "_blank", "noopener,noreferrer");
    }
  };

  // ---------- LOADING ----------
  if (status === "loading") {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-primary/30 bg-card/60 p-5 shadow-card"
          >
            <div className="h-4 w-40 rounded bg-primary/20 animate-pulse mb-4" />
            <div className="space-y-2">
              {[0, 1, 2].map((j) => (
                <div key={j} className="h-10 rounded bg-primary/10 animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ---------- ERROR ----------
  if (status === "error") {
    return (
      <div className="rounded-xl border border-destructive/40 bg-card/60 p-8 text-center shadow-card">
        <p className="text-sm text-foreground mb-4">Қате орын алды</p>
        {errorMsg && (
          <p className="text-xs text-muted-foreground mb-4 break-all">{errorMsg}</p>
        )}
        <button
          onClick={() => void load()}
          className="rounded-lg border border-primary px-5 py-2 text-sm font-mono uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
        >
          Қайталау
        </button>
      </div>
    );
  }

  // ---------- EMPTY ----------
  if (status === "empty") {
    return (
      <div className="rounded-xl border border-primary/30 bg-card/60 p-12 text-center shadow-card">
        <p className="text-sm text-muted-foreground">
          Бұл мектептің жарияланымдары әлі жоқ
        </p>
      </div>
    );
  }

  // ---------- READY ----------
  return (
    <div>
      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Құжат іздеу..."
          aria-label="Құжат іздеу"
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Categories */}
      {grouped.length === 0 ? (
        <div className="rounded-xl border border-primary/30 bg-card/60 p-8 text-center text-sm text-muted-foreground">
          Нәтиже табылмады
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map(([category, files], gi) => (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.04 }}
              className="rounded-xl border border-primary/30 bg-card/60 shadow-card overflow-hidden"
            >
              <header className="border-b border-primary/20 px-5 py-3 bg-card/40">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary text-glow">
                  &gt; {category}
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {files.length} құжат
                </p>
              </header>
              <ul className="divide-y divide-primary/10">
                {files.map((p) => {
                  const Icon = iconFor(p.original_filename);
                  return (
                    <li key={p.id}>
                      <div className="flex items-center gap-3 px-5 py-3 hover:bg-primary/5 transition-colors group">
                        <button
                          type="button"
                          onClick={() => handleOpen(p)}
                          aria-label={`${p.original_filename} ашу`}
                          className="flex flex-1 items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        >
                          <Icon
                            size={18}
                            className="text-primary shrink-0"
                            aria-hidden
                          />
                          <span className="flex-1 min-w-0 truncate text-sm text-foreground group-hover:text-primary transition-colors">
                            {p.original_filename}
                          </span>
                          <span className="hidden sm:inline text-[10px] font-mono text-muted-foreground shrink-0">
                            {formatSize(p.size_bytes)}
                          </span>
                          <span className="hidden md:inline text-[10px] font-mono text-muted-foreground shrink-0">
                            {formatDate(p.uploaded_at)}
                          </span>
                        </button>
                        <a
                          href={publicUrl(p.storage_path)}
                          download={p.original_filename}
                          aria-label={`${p.original_filename} жүктеу`}
                          className="flex h-8 w-8 items-center justify-center rounded border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={14} aria-hidden />
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.section>
          ))}
        </div>
      )}

      {/* Preview modal */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 bg-card border-primary/40 flex flex-col">
          <DialogTitle className="sr-only">
            {preview?.original_filename ?? "Құжатты қарау"}
          </DialogTitle>
          <header className="flex items-center justify-between border-b border-primary/20 px-4 py-3 shrink-0">
            <h4 className="font-mono text-xs text-primary truncate pr-4">
              {preview?.original_filename}
            </h4>
            {preview && (
              <a
                href={publicUrl(preview.storage_path)}
                download={preview.original_filename}
                className="flex items-center gap-1.5 rounded border border-primary/30 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors shrink-0"
              >
                <Download size={12} /> Жүктеу
              </a>
            )}
          </header>
          <div className="flex-1 min-h-0 bg-background">
            {preview && isPdf(preview) && (
              <iframe
                src={publicUrl(preview.storage_path)}
                title={preview.original_filename}
                className="h-full w-full border-0"
              />
            )}
            {preview && isImage(preview) && (
              <div className="h-full w-full flex items-center justify-center p-4">
                <img
                  src={publicUrl(preview.storage_path)}
                  alt={preview.original_filename}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublicationsTab;
