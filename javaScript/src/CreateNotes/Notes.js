document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add');
    const notesContainer = document.getElementById('notes-container');

    addBtn.addEventListener("click", () => {
        addNewNote();
    });

    function addNewNote() {
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerHTML = `
            <div class="notes">
                <div class="tools">
                    <button class="edit"><i class="fa fa-paper-plane-o"></i></button>
                    <button class="delete"><i class="fa fa-trash-o"></i></button>
                </div>
                <div class="main hidden"></div>
                <textarea></textarea>
            </div>
        `;

        const editBtn = note.querySelector('.edit');
        const deleteBtn = note.querySelector('.delete');
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        editBtn.addEventListener("click", () => {
            if (textArea.classList.contains('hidden')) {
                main.classList.add('hidden');
                textArea.classList.remove('hidden');
                textArea.value = main.innerHTML;
            } else {
                main.classList.remove('hidden');
                textArea.classList.add('hidden');
                main.innerHTML = textArea.value;
            }
        });

        deleteBtn.addEventListener("click", () => {
            note.remove();
        });

        notesContainer.appendChild(note);
    }
});
