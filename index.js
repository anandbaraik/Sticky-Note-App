const notesContainer = document.getElementById("app");
const addNoteBtn = document.querySelector(".add-note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener('click', () => addNote());
function getNotes() {
    return JSON.parse(localStorage.getItem('sticky-notes') || "[]");
}

function saveNotes(notes) {
    
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
        const doDelete = confirm("Are you sure? this sticky note won't be reverted once deleted!");
        if(doDelete) {
            deleteNote(id);
        }
    });
    
    return noteElement;
}

function addNote() {
    console.log('add note');
}

function updateNote(id, newContent) {
    console.log(id);
    console.log(newContent);
}

function deleteNote(id) {
    console.log(id);
}