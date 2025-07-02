import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export const Markdown: React.FC<{ children: string; className?: string }> = ({ children, className = "" }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      // className={cn(
      //   "prose dark:prose-invert prose-h6:bg-sky-400 dark:prose-h6:bg-sky-600",
      //   className
      // )}
    >
      {children}
    </ReactMarkdown>
  );
};
