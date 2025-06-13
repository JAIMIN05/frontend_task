import React, { useState, useRef } from 'react';
import { FaThumbtack, FaTrash, FaEdit } from 'react-icons/fa';

const NoteItem = ({ note, onPin, onDelete, isActive, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleInputRef = useRef(null);

  const handleTitleSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const newTitle = titleInputRef.current.textContent;
      if (newTitle.trim()) {
        onTitleChange(note.id, newTitle);
      }
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={`group flex items-center justify-between p-3 mb-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors
        ${isActive ? 'bg-blue-50' : 'bg-white'} 
        ${note.isPinned ? 'border-l-4 border-blue-500' : ''}`}
    >
      <div className="flex-1 truncate">
        {isEditing ? (
          <div
            ref={titleInputRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleTitleSubmit}
            onBlur={handleTitleSubmit}
            className="outline-none border-b border-gray-300 focus:border-blue-500 px-1"
          >
            {note.title}
          </div>
        ) : (
          <h3 className="text-gray-700 font-medium truncate">{note.title}</h3>
        )}
        <p className="text-gray-400 text-sm truncate">{note.preview}</p>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
            setTimeout(() => titleInputRef.current?.focus(), 0);
          }}
          className="p-1 rounded hover:bg-gray-200 text-gray-500"
          title="Edit Title"
        >
          <FaEdit />
        </button>
        <button
          onClick={onPin}
          className={`p-1 rounded hover:bg-gray-200 ${note.isPinned ? 'text-blue-500' : 'text-gray-500'}`}
          title={note.isPinned ? "Unpin" : "Pin"}
        >
          <FaThumbtack />
        </button>
        <button
          onClick={onDelete}
          className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-red-500"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;