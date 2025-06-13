import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onPinNote, onDeleteNote, activeNoteId, onSelectNote, onTitleChange }) => {
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  const renderNoteItem = (note) => (
    <div onClick={() => onSelectNote(note.id)} key={note.id}>
      <NoteItem
        note={note}
        onPin={(e) => {
          e.stopPropagation();
          onPinNote(note.id);
        }}
        onDelete={(e) => {
          e.stopPropagation();
          onDeleteNote(note.id);
        }}
        onTitleChange={onTitleChange}
        isActive={note.id === activeNoteId}
      />
    </div>
  );

  return (
    <div className="h-full overflow-y-auto px-2">
      {pinnedNotes.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Pinned Notes
          </h2>
          {pinnedNotes.map(renderNoteItem)}
        </div>
      )}

      <div>
        {pinnedNotes.length > 0 && (
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            Other Notes
          </h2>
        )}
        {unpinnedNotes.map(renderNoteItem)}
      </div>
    </div>
  );
};

export default NoteList;