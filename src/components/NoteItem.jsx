import React from 'react';
import { FaThumbtack, FaTrash } from 'react-icons/fa';

const NoteItem = ({ note, onPin, onDelete, isActive }) => {
  return (
    <div 
      className={`group flex items-center justify-between p-3 mb-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors
        ${isActive ? 'bg-blue-50' : 'bg-white'} 
        ${note.isPinned ? 'border-l-4 border-blue-500' : ''}`}
    >
      <div className="flex-1 truncate">
        <h3 className="text-gray-700 font-medium truncate">{note.title}</h3>
        <p className="text-gray-400 text-sm truncate">{note.preview}</p>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onPin(note.id)}
          className={`p-1 rounded hover:bg-gray-200 ${note.isPinned ? 'text-blue-500' : 'text-gray-500'}`}
          title={note.isPinned ? "Unpin" : "Pin"}
        >
          <FaThumbtack />
        </button>
        <button
          onClick={() => onDelete(note.id)}
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