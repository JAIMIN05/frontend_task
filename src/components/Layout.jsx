import React from 'react';
import NoteList from './NoteList';

const Layout = ({ children, notes, onPinNote, onDeleteNote, activeNoteId }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - 25% width */}
      <div className="w-1/4 bg-white shadow-lg">
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notes</h2>
          <NoteList 
            notes={notes || []} // Provide empty array as fallback
            onPinNote={onPinNote}
            onDeleteNote={onDeleteNote}
            activeNoteId={activeNoteId}
          />
        </div>
      </div>

      {/* Main Content Area - 75% width */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-white shadow-sm border-b">
          <div className="h-full px-4 flex items-center">
            {/* Toolbar content will go here */}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;



