let root,
    saveNoteBtn, infoDialog, noteTitleElem, noteBodyElem, savedNotes,
    bodyElem, loadedNotes, notesSectElem, deleteNote;

class Note {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }
};

/******* counting and saving how many times the page ran ********/
function countingRuns() {
    let runCount = parseInt(sessionStorage.getItem("runCount"));
    if (isNaN(runCount)) {
        sessionStorage.setItem("runCount", "0");
        runCount = 0;
    }
    runCount++;
    sessionStorage.setItem("runCount", `${runCount++}`);
    console.log(runCount, typeof runCount, isNaN(runCount));
    //console.log(sessionStorage.getItem("runCount"));
}

function deleteAndSaveNotes(noteIndex) {
    //console.log(loadedNotes);
    loadedNotes.splice(noteIndex, 1);
    console.log(loadedNotes);
    sessionStorage.setItem("savedNotes", JSON.stringify(loadedNotes));
    if (loadedNotes !== null && loadedNotes.length !== 0) {
        loadNotes(loadedNotes);
    }
}

function loadNotes(notesArr) {

    console.log(notesSectElem.children.length);

    if (notesSectElem.children.length !== 0) {
        //notesSectElem.replaceWith(notesSectElem.cloneNode(true));
        notesSectElem.innerHTML = '';
        console.log(notesSectElem.children.length);
    }
    if (notesSectElem.children.length === 0) {
        notesArr.forEach((el, ind) => {
            console.log(el, ind);
            let noteCardElem = document.createElement('div');
            ['noteCard', 'flex-cc', 'col'].forEach(el => {
                noteCardElem.classList.add(el);
            });
            noteCardElem.dataset.noteIndex = ind;
            noteCardElem.innerHTML = `<button class="deleteNoteBtn">Delete</button>
                <h3>${el.title}</h3>
                <p>${el.body}</p>`;
            notesSectElem.appendChild(noteCardElem);
        });

        let deleteNoteBtns = document.getElementsByClassName('deleteNoteBtn');
        [...deleteNoteBtns].forEach((deleteNoteBtn) => {
            deleteNoteBtn.addEventListener("click", (el) => {
                let noteCard = el.target.parentElement;
                let noteInd = noteCard.dataset.noteIndex;
                console.log(noteInd);
                deleteDialog.children[0].innerHTML = `<b>${loadedNotes[noteInd].title}</b>?`;
                deleteDialog.showModal();
                deleteDialog.children[1].dataset.noteIndex = noteInd;
                console.log(deleteDialog.children);
                //deleteAndSaveNotes(noteCard.dataset.noteIndex);
            });
        });
    }

}

window.onload = () => {

    countingRuns();

    root = document.documentElement;
    bodyElem = document.body;

    /********* Ad same nav header to all 3 pages *********/

    if (bodyElem.firstChild.id !== 'navHeader') {
        let navHeader = document.createElement('header');
        navHeader.id = 'navHeader';

        // ['flex-cc', 'col'].forEach(el => {
        navHeader.classList.add('flex-cc');
        // });

        navHeader.innerHTML = `<nav class="flex-cc">
            <ul class="nav-ul flex-cc">
                <li class="nav-li flex-cc col">
                    <a class="nav-link" href="./index.html">Home</a>
                </li>
                <li class="nav-li flex-cc col">
                    <a class="nav-link" href="./newNote.html">Create</a>
                </li>
                <li class="nav-li flex-cc col">
                    <a class="nav-link" href="./savedNotes.html">Saved</a>
                </li>
            </ul>
        </nav>`;

        bodyElem.insertBefore(navHeader, bodyElem.firstChild);

    }

    /******************* Create new Notes *********************/

    saveNoteBtn = document.getElementById('saveNoteBtn');
    infoDialog = document.getElementById('infoDialog');
    noteTitleElem = document.getElementById('noteTitle');
    noteBodyElem = document.getElementById('noteBody');

    //console.log(savedNotes, typeof savedNotes);

    if (bodyElem.id == 'newNoteBody') {
        noteTitleElem.value = '';
        noteBodyElem.value = '';
    }

    if (saveNoteBtn !== null) {

        saveNoteBtn.addEventListener("click", () => {

            let [noteTitle, noteBody, msg] = [
                noteTitleElem.value,
                noteBodyElem.value, ''
            ],

            savedNotes = JSON.parse(sessionStorage.getItem("savedNotes"));
            savedNotes = savedNotes === null ? [] : savedNotes;
            //console.log(savedNotes, typeof savedNotes);

            if (noteTitle === '' || noteBody === '') {
                [msg, btnText] = [
                    '⚠️Note title and body cannot be empty.',
                    'Retry'
                ];

            } else {
                let newNote = new Note(noteTitle, noteBody);
                //console.log(noteTitle, noteBody, newNote);
                [msg, btnText] = [
                    `✅Saved the note<br>Title: ${noteTitle}<br>Body: ${noteBody}`,
                    'Close'
                ];
                savedNotes.push(newNote);
                sessionStorage.setItem("savedNotes", JSON.stringify(savedNotes));

                console.log(savedNotes.length);
                //console.log(savedNotes[0].title, savedNotes[0].body);
            }

            infoDialog.innerHTML = `${msg}<br><div class="flex-cc dialogBtnWrapDiv"><button onclick="infoDialog.close(); saveNoteDialog.close()">${btnText}</button></div>`;
            infoDialog.showModal();

        });
    }

    /******************* Loading saved Notes *********************/

    if (bodyElem.id === 'gridBox') {

        loadedNotes = JSON.parse(sessionStorage.getItem("savedNotes"));
        //console.log(loadedNotes);
        notesSectElem = document.getElementById('savedNotesSect');
        deleteNoteBtn = document.getElementById('deleteNote');

        deleteNoteBtn.addEventListener("click", () => {
            deleteAndSaveNotes(deleteNoteBtn.dataset.noteIndex);
            deleteDialog.close();
        });

        if (loadedNotes !== null && loadedNotes.length !== 0) {
            loadNotes(loadedNotes);
        }

    }

}