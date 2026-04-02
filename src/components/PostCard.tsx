import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Post } from "@/data/posts";
import { SCHOOLS } from "@/data/schools";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const school = SCHOOLS.find((s) => s.id === post.schoolId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!school) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link to={`/schools/${school.id}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-heading text-xs font-bold text-primary">
            {school.avatar}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/schools/${school.id}`} className="font-heading text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block">
            {school.name}
          </Link>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary whitespace-nowrap">
          {post.valueIcon} {post.valueTag}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-heading text-base font-semibold text-foreground mb-2">{post.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? "text-red-400" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle size={16} />
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Share2 size={16} />
          {post.shares}
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`ml-auto flex items-center gap-1.5 text-xs transition-colors ${saved ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          {post.saved + (saved ? 1 : 0)}
        </button>
      </div>
    </motion.div>
  );
};

export default PostCard;
