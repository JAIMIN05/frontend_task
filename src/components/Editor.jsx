import React, { useEffect, useRef } from 'react';

const Editor = ({ content, setContent }) => {
  const editorRef = useRef(null);

  // Sync content with the editable div
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = (e) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
  };

  return (
    <div className="h-full flex flex-col">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 outline-none p-6 prose prose-slate max-w-none
          focus:ring-0 overflow-y-auto
          text-gray-700 text-base leading-relaxed
          placeholder:text-gray-400"
        data-placeholder="Start writing your note here..."
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default Editor;