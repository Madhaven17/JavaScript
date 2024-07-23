document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add');
    const notesContainer = document.getElementById('notes-container');
    loadNotes();
    addBtn.addEventListener("click", () => {
        addNewNote();
    });

    function addNewNote(content = '') {
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerHTML = `
            <div class="notes">
                <div class="tools">
                    <button class="edit"><i class="fa fa-paper-plane-o"></i></button>
                    <button class="delete"><i class="fa fa-trash-o"></i></button>
                </div>
                <div class="main ${content ? '' : 'hidden'}">${content}</div>
                <textarea class="${content ? 'hidden' : ''}"></textarea>
            </div>
        `;

        const editBtn = note.querySelector('.edit');
        const deleteBtn = note.querySelector('.delete');
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        textArea.value = content;

        editBtn.addEventListener("click", () => {
            if (textArea.classList.contains('hidden')) {
                main.classList.add('hidden');
                textArea.classList.remove('hidden');
                textArea.value = main.innerHTML;
            } else {
                main.classList.remove('hidden');
                textArea.classList.add('hidden');
                main.innerHTML = textArea.value;
                saveNotes();
            }
        });

        deleteBtn.addEventListener("click", () => {
            note.remove();
            saveNotes();
        });

        notesContainer.appendChild(note);
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note').forEach(note => {
            const main = note.querySelector('.main');
            notes.push(main.innerHTML);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.forEach(note => addNewNote(note));
    }
});
