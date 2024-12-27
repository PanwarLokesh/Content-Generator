import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; 
import './MarkDown.css'
const MarkdownRenderer = ({ markdownText }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;







