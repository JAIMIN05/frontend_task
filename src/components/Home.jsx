import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Editor from './Editor';
import PasswordModal from './PasswordModal';
import { saveNotes, loadNotes } from '../utils/storage';
import { encryptNote, decryptNote } from '../utils/encryption';

const Home = () => {
  // State management
  const [notes, setNotes] = useState(() => loadNotes());
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [currentContent, setCurrentContent] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState('encrypt');

  // Load selected note content
  useEffect(() => {
    if (selectedNoteId) {
      const note = notes.find(n => n.id === selectedNoteId);
      setCurrentContent(note?.content || '');
    } else {
      setCurrentContent('');
    }
  }, [selectedNoteId]);

  // Save notes to localStorage
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Note management functions
  const handleCreateNote = () => {
    const title = prompt('Enter note title:', 'New Note');
    if (title) {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        preview: 'Click to edit...',
        content: '',
        isPinned: false
      };
      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
    }
  };

  const handleSelectNote = (noteId) => {
    setSelectedNoteId(noteId);
  };

  const handlePinNote = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, isPinned: !note.isPinned }
        : note
    ));
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNoteId === noteId) {
        setSelectedNoteId(null);
        setCurrentContent('');
      }
    }
  };

  const handleTitleChange = (noteId, newTitle) => {
    if (newTitle.trim()) {
      setNotes(notes.map(note =>
        note.id === noteId
          ? { ...note, title: newTitle.trim() }
          : note
      ));
    }
  };

  const handleContentChange = (newContent) => {
    setCurrentContent(newContent);
    if (selectedNoteId) {
      setNotes(notes.map(note =>
        note.id === selectedNoteId
          ? {
              ...note,
              content: newContent,
              preview: newContent.replace(/<[^>]+>/g, '').slice(0, 50) + '...'
            }
          : note
      ));
    }
  };

  const handleEncryptNote = () => {
    if (selectedNoteId) {
      setPasswordModalMode('encrypt');
      setIsPasswordModalOpen(true);
    }
  };

  const handleDecryptNote = () => {
    if (selectedNoteId) {
      setPasswordModalMode('decrypt');
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordSubmit = (password) => {
    if (!selectedNoteId) return;

    const note = notes.find(n => n.id === selectedNoteId);
    if (!note) return;

    if (passwordModalMode === 'encrypt') {
      const encrypted = encryptNote(note.content, password);
      if (encrypted) {
        const updatedNote = {
          ...note,
          content: encrypted,
          isEncrypted: true,
          preview: '🔒 Encrypted Note'
        };
        setNotes(notes.map(n => n.id === selectedNoteId ? updatedNote : n));
        setCurrentContent('🔒 This note is encrypted. Click decrypt to view.');
      }
    } else {
      const decrypted = decryptNote(note.content, password);
      if (decrypted) {
        const updatedNote = {
          ...note,
          content: decrypted,
          isEncrypted: false,
          preview: decrypted.replace(/<[^>]+>/g, '').slice(0, 50) + '...'
        };
        setNotes(notes.map(n => n.id === selectedNoteId ? updatedNote : n));
        setCurrentContent(decrypted);
      }
    }
    setIsPasswordModalOpen(false);
  };

  return (
    <>
      <Layout 
        notes={notes}
        onPinNote={handlePinNote}
        onDeleteNote={handleDeleteNote}
        activeNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
        onTitleChange={handleTitleChange}
        onEncryptNote={handleEncryptNote}
        onDecryptNote={handleDecryptNote}
      >
        {selectedNoteId ? (
          <Editor 
            content={currentContent}
            setContent={handleContentChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-center">
              {notes.length === 0 
                ? "Create your first note by clicking the + button"
                : "Select a note or create a new one to start editing"}
            </p>
          </div>
        )}
      </Layout>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        mode={passwordModalMode}
      />
    </>
  );
};

export default Home;