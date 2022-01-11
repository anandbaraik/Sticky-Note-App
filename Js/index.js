const notesContainer = document.getElementById("app");
const addNoteBtn = document.querySelector(".add-note");

addNoteBtn.addEventListener('click', () => addNote());

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteBtn);
});

function getNotes() {
    return JSON.parse(localStorage.getItem('sticky-notes') || "[]");
}

function saveNotes(notes) {
    localStorage.setItem('sticky-notes', JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const noteElement = document.createElement('textarea');
    noteElement.classList.add('note');
    noteElement.value = content;
    noteElement.placeholder = "Empty Sticky Note";

    noteElement.addEventListener("change", (element) => {
        updateNote(id, element.target.value);
    });

    noteElement.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure? this sticky note won't be recovered once deleted!");
        if(doDelete) {
            deleteNote(id, noteElement);
        }
    });
    
    return noteElement;
}

function addNote() {
    const newNote = {
        id: Math.floor(Math.random() * 1000000000),
        content: ""
    };
    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
    let noteElement = createNoteElement(newNote.id, newNote.content);
    notesContainer.insertBefore(noteElement, addNoteBtn);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, noteElement) {
    const notes = getNotes().filter((note) => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(noteElement);
}