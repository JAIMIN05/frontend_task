import React, { useEffect, useRef, useState } from 'react';
import { summarizeNote, grammarCheck } from '../utils/ai';

const Editor = ({ content, setContent }) => {
  const editorRef = useRef(null);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Add this function to maintain editor focus after toolbar clicks
  const handleFocus = () => {
    editorRef.current?.focus();
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await summarizeNote(editorRef.current.innerText);
      if (result) {
        setSummary(result);
      } else {
        setError('Failed to generate summary');
      }
    } catch (error) {
      setError(`Error generating summary ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrammarCheck = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await grammarCheck(editorRef.current.innerText);
      if (result) {
        setSummary(result);
      } else {
        setError('Failed to check grammar');
      }
    } catch (error) {
      setError(`Error checking grammar ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col" onClick={handleFocus}>
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
      
      <div className="border-t p-4 space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Summarize'}
          </button>
          
          <button
            onClick={handleGrammarCheck}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Check Grammar'}
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        
        {summary && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">
              {summary.startsWith('Grammar') ? 'Grammar Suggestions' : 'Summary'}
            </h3>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;