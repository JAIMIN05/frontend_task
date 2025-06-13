import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onPinNote, onDeleteNote, activeNoteId }) => {
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className="h-full overflow-y-auto px-2">
      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Pinned Notes
          </h2>
          {pinnedNotes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
              onPin={onPinNote}
              onDelete={onDeleteNote}
              isActive={note.id === activeNoteId}
            />
          ))}
        </div>
      )}

      {/* Other Notes Section */}
      <div>
        {pinnedNotes.length > 0 && (
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Other Notes
          </h2>
        )}
        {unpinnedNotes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onPin={onPinNote}
            onDelete={onDeleteNote}
            isActive={note.id === activeNoteId}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;