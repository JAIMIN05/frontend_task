import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';  // Import close icon
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

  const handleCloseSummary = () => {
    setSummary('');  // Clear the summary/grammar suggestions
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto" onClick={handleFocus}>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 outline-none p-3 md:p-6 prose prose-sm md:prose-base lg:prose-lg 
          max-w-none focus:ring-0 overflow-y-auto
          text-gray-700 leading-relaxed
          placeholder:text-gray-400"
        data-placeholder="Start writing your note here..."
        suppressContentEditableWarning={true}
      />
      
      <div className="border-t p-3 md:p-4 space-y-3 md:space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg 
              hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed
              text-sm md:text-base"
          >
            {isLoading ? 'Processing...' : 'Summarize'}
          </button>
          
          <button
            onClick={handleGrammarCheck}
            disabled={isLoading}
            className="px-3 py-1.5 md:px-4 md:py-2 bg-green-500 text-white rounded-lg 
              hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed
              text-sm md:text-base"
          >
            {isLoading ? 'Processing...' : 'Check Grammar'}
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 text-xs md:text-sm">
            {error}
          </div>
        )}
        
        {summary && (
          <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-sm md:text-base">
                Grammar Suggestions
              </h3>
              <button
                onClick={handleCloseSummary}
                className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700"
                title="Close"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <div className="text-gray-700 text-xs md:text-sm space-y-2">
              {summary.split('\n').map((line, index) => (
                line.trim() && (
                  <p 
                    key={index}
                    className={`${line.match(/^\d+\./) ? 'font-medium text-gray-800' : 'pl-4'}`}
                  >
                    {line.trim()}
                  </p>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;