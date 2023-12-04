import markdownStyles from "./markdown-styles.module.css";
import "highlight.js/styles/default.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { useEffect } from "react";

hljs.registerLanguage("javascript", javascript);

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  const newContent = content.replaceAll("<code>", '<code className="js">');

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: newContent }}
      />
    </div>
  );
};

export default PostBody;
