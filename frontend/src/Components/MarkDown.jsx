
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "./MarkDown.css";

const MarkdownRenderer = ({ markdownText, streaming = false, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (streaming && markdownText) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < markdownText.length) {
          setDisplayedText((prev) => prev + (markdownText[currentIndex] || "")); 
          currentIndex++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      });

      return () => clearInterval(interval); 
    } else if (!streaming) {
      setDisplayedText(markdownText || ""); 
    }
  }, [markdownText, streaming, onComplete]);

  console.log(displayedText);
  return (
    <div className="markdown-container">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {displayedText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
