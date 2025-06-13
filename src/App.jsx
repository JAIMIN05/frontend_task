import { useState } from 'react'
import Layout from './components/Layout'
import Editor from './components/Editor'
import { initialNotes } from './store/notesData'

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [currentContent, setCurrentContent] = useState('');

  const handlePinNote = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, isPinned: !note.isPinned }
        : note
    ));
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleContentChange = (newContent) => {
    setCurrentContent(newContent);
    if (activeNoteId) {
      setNotes(notes.map(note =>
        note.id === activeNoteId
          ? { ...note, content: newContent }
          : note
      ));
    }
  };

  return (
    <Layout 
      notes={notes}
      onPinNote={handlePinNote}
      onDeleteNote={handleDeleteNote}
      activeNoteId={activeNoteId}
    >
      <Editor 
        content={currentContent}
        setContent={handleContentChange}
      />
    </Layout>
  )
}

export default App