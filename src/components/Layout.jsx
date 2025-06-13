import React from 'react';
import NoteList from './NoteList';
import Toolbar from './Toolbar';
import { FaPlus } from 'react-icons/fa';

const Layout = ({ 
  children, 
  notes, 
  onPinNote, 
  onDeleteNote, 
  activeNoteId,
  onSelectNote,
  onCreateNote 
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - 25% width */}
      <div className="w-1/4 bg-white shadow-lg">
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
            <button
              onClick={onCreateNote}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
              title="Create New Note"
            >
              <FaPlus />
            </button>
          </div>
          <NoteList 
            notes={notes || []}
            onPinNote={onPinNote}
            onDeleteNote={onDeleteNote}
            activeNoteId={activeNoteId}
            onSelectNote={onSelectNote}
          />
        </div>
      </div>

      {/* Main Content Area - 75% width */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b">
          <Toolbar />
        </div>
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;



