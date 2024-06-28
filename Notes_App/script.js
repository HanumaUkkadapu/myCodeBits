let root,
    saveNoteBtn, infoDialog, noteTitleElem, noteBodyElem, savedNotes,
    bodyElem, loadedNotes, notesSectElem,
    editSaveBtn, editedNoteTitle, editedNoteBody, deleteNoteDialogBtn;

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
    let prevLength = loadedNotes.length;
    //console.log(`from deleteAndSaveNotes, prevLength: ${prevLength}, LoadedNotes:  ${loadedNotes}`);
    loadedNotes.splice(noteIndex, 1);
    //console.log(loadedNotes);
    sessionStorage.setItem("savedNotes", JSON.stringify(loadedNotes));
    if ((loadedNotes !== null && loadedNotes.length !== 0) || prevLength === 1) {
        //console.log('inside if block');
        loadNotes(loadedNotes);
    }
}

function editAndSaveNotes(noteIndex, newNoteDetails) {
    //console.log(loadedNotes);
    loadedNotes[noteIndex] = newNoteDetails;
    sessionStorage.setItem("savedNotes", JSON.stringify(loadedNotes));
    if (loadedNotes !== null && loadedNotes.length !== 0) {
        //console.log('inside if block');
        loadNotes(loadedNotes);
    }
}

function loadNotes(notesArr) {

    //console.log(notesSectElem.children.length);

    if (notesSectElem.children.length !== 0 && notesArr.length > 0) {
        //notesSectElem.replaceWith(notesSectElem.cloneNode(true));
        notesSectElem.innerHTML = '';
        console.log(notesSectElem.children.length);
    } else if (notesArr.length === 0) {
        notesSectElem.innerHTML = '';
    }

    if (notesSectElem.children.length === 0 && notesArr.length > 0) {
        notesArr.forEach((el, ind) => {
            //console.log(el, ind);
            let noteCardElem = document.createElement('div');
            ['noteCard', 'flex-cc', 'col'].forEach(el => {
                noteCardElem.classList.add(el);
            });
            noteCardElem.dataset.noteIndex = ind;
            noteCardElem.innerHTML = `<div class="btnsDiv">
                    <button class="editNoteBtn">Edit</button>
                    <button class="deleteNoteBtn">Delete</button>
                </div>
                <h3>${el.title}</h3>
                <p>${el.body}</p>`;
            notesSectElem.appendChild(noteCardElem);
        });

        let editNoteBtns = document.getElementsByClassName('editNoteBtn'),
            deleteNoteBtns = document.getElementsByClassName('deleteNoteBtn');

        [...editNoteBtns].forEach((editNoteBtn) => {
            editNoteBtn.addEventListener("click", (el) => {
                let noteCard = el.target.parentElement.parentElement;
                let noteInd = noteCard.dataset.noteIndex;
                //console.log(noteInd);
                editNoteDialog.children[1].children[0].value = `${loadedNotes[noteInd].title}`;
                editNoteDialog.children[1].children[1].value = `${loadedNotes[noteInd].body}`;
                editNoteDialog.showModal();
                editNoteDialog.children[2].children[0].dataset.noteIndex = noteInd;
                //deleteAndSaveNotes(noteCard.dataset.noteIndex);
            });
        });

        [...deleteNoteBtns].forEach((deleteNoteBtn) => {
            deleteNoteBtn.addEventListener("click", (el) => {
                let noteCard = el.target.parentElement.parentElement;
                //console.log(noteCard);
                let noteInd = noteCard.dataset.noteIndex;
                //console.log(noteInd);
                deleteNoteDialog.children[0].innerHTML = `<b>${loadedNotes[noteInd].title}</b>?`;
                deleteNoteDialog.showModal();
                deleteNoteDialog.children[1].children[0].dataset.noteIndex = noteInd;
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

        editSaveDialogBtn = document.getElementById('saveEditedNote'),
            editedNoteTitle = document.getElementById('editNoteTitle'),
            editedNoteBody = document.getElementById('editNoteBody'),
            deleteNoteDialogBtn = document.getElementById('deleteNote');

        editSaveDialogBtn.addEventListener("click", (el) => {
            let newNoteDetails = [editedNoteTitle.value, editedNoteBody.value];
            let editedNote = new Note(...newNoteDetails);
            editAndSaveNotes(el.target.dataset.noteIndex, editedNote);
            editNoteDialog.close();
        });
        deleteNoteDialogBtn.addEventListener("click", (el) => {
            //console.log(`deleteNoteDialogBtn ind: ${el.target.dataset.noteIndex}`)
            deleteAndSaveNotes(el.target.dataset.noteIndex);
            deleteNoteDialog.close();
        });

        if (loadedNotes !== null && loadedNotes.length !== 0) {
            loadNotes(loadedNotes);
        }

    }

}