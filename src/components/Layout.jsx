import React, { useState } from 'react';
import NoteList from './NoteList';
import Toolbar from './Toolbar';
import { FaPlus, FaBars, FaTimes } from 'react-icons/fa';

const Layout = ({ 
  children, 
  notes, 
  onPinNote, 
  onDeleteNote, 
  activeNoteId,
  onSelectNote,
  onCreateNote,
  onEncryptNote,
  onDecryptNote
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-0 bg-white md:w-80 lg:w-96
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-200 ease-in-out
        z-40 shadow-lg
      `}>
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-4 mt-8 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
            <button
              onClick={onCreateNote}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
              title="Create New Note"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <NoteList 
              notes={notes || []}
              onPinNote={onPinNote}
              onDeleteNote={onDeleteNote}
              activeNoteId={activeNoteId}
              onSelectNote={(noteId) => {
                onSelectNote(noteId);
                setIsSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white shadow-sm border-b overflow-x-auto">
          <Toolbar 
            onEncryptNote={onEncryptNote}
            onDecryptNote={onDecryptNote}
          />
        </div>
        <div className="flex-1 p-2 md:p-4 overflow-auto">
          {children}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;