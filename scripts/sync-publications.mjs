#!/usr/bin/env node
/**
 * sync-publications.mjs
 *
 * One-shot, idempotent sync of school publication files from a local
 * folder hierarchy into Supabase Storage + the school_publications table.
 *
 * Usage:
 *   node scripts/sync-publications.mjs
 *   node scripts/sync-publications.mjs /custom/path/to/root
 *
 * Required env (load from .env.local — NOT committed):
 *   PUBLICATIONS_SUPABASE_URL              project URL of the publications-only Supabase
 *   PUBLICATIONS_SUPABASE_SERVICE_ROLE_KEY service_role / sb_secret_* key
 *
 * Optional env:
 *   LOCAL_PUBLICATIONS_ROOT       defaults to ~/Desktop/Все школы
 *
 * NEVER import this from src/. Run only via npm run sync:publications.
 */

import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";

// ---------------------------------------------------------------------
// 1. Load .env.local manually (no extra deps)
// ---------------------------------------------------------------------
const ENV_LOCAL = path.resolve(process.cwd(), ".env.local");
if (existsSync(ENV_LOCAL)) {
  for (const line of readFileSync(ENV_LOCAL, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

const SUPABASE_URL =
  process.env.PUBLICATIONS_SUPABASE_URL ||
  process.env.VITE_PUBLICATIONS_SUPABASE_URL;
const SERVICE_ROLE = process.env.PUBLICATIONS_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error(
    "❌ Missing env: PUBLICATIONS_SUPABASE_URL and PUBLICATIONS_SUPABASE_SERVICE_ROLE_KEY are required."
  );
  console.error("   Put them into .env.local. See .env.example.");
  process.exit(1);
}

const ROOT =
  process.argv[2] ||
  process.env.LOCAL_PUBLICATIONS_ROOT ||
  path.join(os.homedir(), "Desktop", "Все школы");

if (!existsSync(ROOT)) {
  console.error(`❌ Publications root folder not found: ${ROOT}`);
  process.exit(1);
}

const BUCKET = "school-publications";
const DEFAULT_CATEGORY = "Жалпы";

// ---------------------------------------------------------------------
// 2. Supabase admin client (service_role)
// ---------------------------------------------------------------------
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ---------------------------------------------------------------------
// 3. Sanitization helpers
// ---------------------------------------------------------------------
const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  // Kazakh extras
  ә: "a", ғ: "g", қ: "k", ң: "n", ө: "o", ұ: "u", ү: "u", һ: "h", і: "i",
};

function transliterate(str) {
  let out = "";
  for (const ch of str.toLowerCase()) {
    out += TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch;
  }
  return out;
}

function sanitizeForStorage(name) {
  // Split off extension to preserve it intact (lowercased).
  const ext = path.extname(name).toLowerCase();
  const base = name.slice(0, name.length - ext.length);
  const slug = transliterate(base)
    .replace(/[^a-z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[_-]+|[_-]+$/g, "");
  return (slug || "file") + ext;
}

function categorySlug(name) {
  const slug = transliterate(name)
    .replace(/[^a-z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[_-]+|[_-]+$/g, "");
  return slug || "category";
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

const MIME_BY_EXT = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".txt": "text/plain",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".zip": "application/zip",
};

// ---------------------------------------------------------------------
// 4. Fallback names for school №18 (mojibake-corrupted source filenames).
//    User-approved: invent plausible Kazakh school document names,
//    preserve original extensions in order.
// ---------------------------------------------------------------------
const SCHOOL_18_FALLBACK_NAMES = [
  "Оқу-тәрбие жоспары 2025-2026",
  "Мектептің даму бағдарламасы 2023-2028",
  "Мектепішілік бақылау жоспары",
  "Білім сапасы мониторингі 2024-2025",
  "Ғылыми-әдістемелік қызмет жоспары",
  "Мектепішілік жобалар",
  "Тәрбие бағыты жоспары",
  "Функционалдық сауаттылық жоспары",
  "Инклюзивті білім беруді ұйымдастыру",
  "ЖИ цифрландыру жұмыс жоспары",
  "Ата-анамен жұмыс жоспары",
  "Адал азамат бағдарламасы",
  "Жылдық есеп",
];

// ---------------------------------------------------------------------
// 5. Walk
// ---------------------------------------------------------------------
function parseSchoolNumber(folderName) {
  const m = folderName.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

async function listEntries(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => !e.name.startsWith("."));
}

async function ensureBucketExists() {
  // Bucket creation is idempotent: insert into storage.buckets is in the migration.
  // We still call listBuckets to fail fast if RLS or auth is wrong.
  const { data, error } = await supabase.storage.listBuckets();
  if (error) throw new Error(`Cannot list buckets: ${error.message}`);
  const found = data.find((b) => b.name === BUCKET);
  if (!found) {
    console.warn(
      `⚠️  Bucket "${BUCKET}" not found. Apply the SQL migration first ` +
        "(supabase/migrations/20260408000001_school_publications.sql)."
    );
    process.exit(2);
  }
}

async function fetchExistingHashes() {
  // Single round-trip — pull all known publications into a Map keyed by storage_path.
  const { data, error } = await supabase
    .from("school_publications")
    .select("storage_path, file_hash");
  if (error) throw new Error(`DB select failed: ${error.message}`);
  const map = new Map();
  for (const row of data) map.set(row.storage_path, row.file_hash);
  return map;
}

const stats = {
  schoolFolders: 0,
  schoolsMatched: 0,
  filesScanned: 0,
  filesUploaded: 0,
  filesUpdated: 0,
  filesUnchanged: 0,
  filesFailed: 0,
  unmatchedFolders: [],
  errors: [],
};

async function syncFile({ schoolNumber, category, absPath, fileName, fallbackName, existingHashes }) {
  stats.filesScanned += 1;

  let buffer;
  try {
    buffer = await readFile(absPath);
  } catch (err) {
    stats.filesFailed += 1;
    stats.errors.push(`READ ${absPath}: ${err.message}`);
    return;
  }

  const hash = sha256(buffer);
  const ext = path.extname(fileName).toLowerCase();
  const mime = MIME_BY_EXT[ext] || "application/octet-stream";
  const displayName = fallbackName ? fallbackName + ext : fileName;
  const safeFileName = sanitizeForStorage(displayName);
  const safeCategory = categorySlug(category);
  const storagePath = `school-${schoolNumber}/${safeCategory}/${safeFileName}`;

  const existingHash = existingHashes.get(storagePath);
  if (existingHash === hash) {
    // Identical content; just bump updated_at to mark this run.
    const { error } = await supabase
      .from("school_publications")
      .update({ updated_at: new Date().toISOString() })
      .eq("storage_path", storagePath);
    if (error) {
      stats.filesFailed += 1;
      stats.errors.push(`UPDATE-TS ${storagePath}: ${error.message}`);
      return;
    }
    stats.filesUnchanged += 1;
    return;
  }

  // Upload (upsert) to Storage
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: mime, upsert: true });
  if (upErr) {
    stats.filesFailed += 1;
    stats.errors.push(`UPLOAD ${storagePath}: ${upErr.message}`);
    return;
  }

  // Upsert row in DB
  const row = {
    school_number: schoolNumber,
    category,
    category_slug: safeCategory,
    original_filename: displayName,
    storage_path: storagePath,
    mime_type: mime,
    size_bytes: buffer.length,
    file_hash: hash,
  };

  const { error: dbErr } = await supabase
    .from("school_publications")
    .upsert(row, { onConflict: "storage_path" });

  if (dbErr) {
    stats.filesFailed += 1;
    stats.errors.push(`DB-UPSERT ${storagePath}: ${dbErr.message}`);
    return;
  }

  if (existingHash === undefined) stats.filesUploaded += 1;
  else stats.filesUpdated += 1;
}

async function syncSchoolFolder(schoolDir, schoolNumber, existingHashes) {
  const entries = await listEntries(schoolDir);

  // Files at the root → default category "Жалпы"
  const rootFiles = entries.filter((e) => e.isFile());
  // For school 18, allocate fallback names by stable sort order.
  let fallbackIndex = 0;
  const sortedRootFiles = [...rootFiles].sort((a, b) => a.name.localeCompare(b.name));
  for (const f of sortedRootFiles) {
    const fallback =
      schoolNumber === 18 && fallbackIndex < SCHOOL_18_FALLBACK_NAMES.length
        ? SCHOOL_18_FALLBACK_NAMES[fallbackIndex++]
        : null;
    await syncFile({
      schoolNumber,
      category: DEFAULT_CATEGORY,
      absPath: path.join(schoolDir, f.name),
      fileName: f.name,
      fallbackName: fallback,
      existingHashes,
    });
  }

  // Subfolders → category = subfolder name
  const subDirs = entries.filter((e) => e.isDirectory());
  for (const sd of subDirs) {
    const categoryDir = path.join(schoolDir, sd.name);
    const subEntries = await listEntries(categoryDir);
    for (const f of subEntries) {
      if (!f.isFile()) continue; // we only support 1 level of nesting per ТЗ
      await syncFile({
        schoolNumber,
        category: sd.name,
        absPath: path.join(categoryDir, f.name),
        fileName: f.name,
        fallbackName: null,
        existingHashes,
      });
    }
  }
}

// ---------------------------------------------------------------------
// 6. Run
// ---------------------------------------------------------------------
async function main() {
  console.log(`📂 Root: ${ROOT}`);
  console.log(`🌐 Supabase: ${SUPABASE_URL}`);
  console.log(`📦 Bucket: ${BUCKET}\n`);

  await ensureBucketExists();
  const existingHashes = await fetchExistingHashes();
  console.log(`📊 Existing publications in DB: ${existingHashes.size}\n`);

  const topEntries = await listEntries(ROOT);
  for (const entry of topEntries) {
    if (!entry.isDirectory()) continue;
    stats.schoolFolders += 1;
    const schoolNum = parseSchoolNumber(entry.name);
    if (!schoolNum) {
      stats.unmatchedFolders.push(entry.name);
      console.warn(`⚠️  Skip (no number in name): ${entry.name}`);
      continue;
    }
    stats.schoolsMatched += 1;
    console.log(`→ school №${schoolNum} (${entry.name})`);
    await syncSchoolFolder(path.join(ROOT, entry.name), schoolNum, existingHashes);
  }

  // ---------------- Report ----------------
  console.log("\n══════════════ REPORT ══════════════");
  console.log(`School folders found:    ${stats.schoolFolders}`);
  console.log(`Schools matched (№ ok):  ${stats.schoolsMatched}`);
  console.log(`Files scanned:           ${stats.filesScanned}`);
  console.log(`Uploaded (new):          ${stats.filesUploaded}`);
  console.log(`Updated (hash changed):  ${stats.filesUpdated}`);
  console.log(`Unchanged:               ${stats.filesUnchanged}`);
  console.log(`Failed:                  ${stats.filesFailed}`);
  if (stats.unmatchedFolders.length) {
    console.log(`\nUnmatched folders:`);
    for (const f of stats.unmatchedFolders) console.log(`  • ${f}`);
  }
  if (stats.errors.length) {
    console.log(`\nErrors:`);
    for (const e of stats.errors.slice(0, 30)) console.log(`  • ${e}`);
    if (stats.errors.length > 30) console.log(`  … and ${stats.errors.length - 30} more`);
  }
  console.log("════════════════════════════════════\n");

  process.exit(stats.filesFailed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("\n💥 Fatal:", err.message || err);
  process.exit(1);
});
