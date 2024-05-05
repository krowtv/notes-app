import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import 'react-mde/lib/styles/css/react-mde-all.css';

export default function App() {
    const [notes, setNotes] = React.useState(
      () => JSON.parse(localStorage.getItem("notes")) || []);

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    React.useEffect(() => {
      if (notes.length > 0) {
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }, [notes]);

    function updateNote(text) {
        setNotes(oldNotes => {
          const newArr = [];
          oldNotes.map((oldNote) => {
            if (oldNote.id === currentNoteId) {
              oldNote = {...oldNote, body: text};
              newArr.unshift(oldNote);
            }
            else
              newArr.push(oldNote);
          })
          return newArr;
        })
      }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function deleteNote(event, noteId) {
      event.stopPropagation();
      setNotes(oldNotes => oldNotes.filter((note) => note.id !== noteId));
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
