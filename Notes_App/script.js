let root,
    saveNoteBtn, infoDialog, noteTitleElem, noteBodyElem, savedNotes,
    bodyElem, loadedNotes;

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
    if (saveNoteBtn !== null) {

        saveNoteBtn.addEventListener("click", () => {

            let [noteTitle, noteBody, msg] = [
                noteTitleElem.value,
                noteBodyElem.value, ''
            ],

            savedNotes = JSON.parse(sessionStorage.getItem("savedNotes"));

            if (noteTitle === '' || noteBody === '') {
                msg = 'Note title and body cannot be empty.';
            } else {
                let newNote = new Note(noteTitle, noteBody);
                //console.log(noteTitle, noteBody, newNote);
                msg = `saving the note\nTitle: ${noteTitle}\nBody: ${noteBody}`;
                savedNotes.push(newNote);
                sessionStorage.setItem("savedNotes", JSON.stringify(savedNotes));

                console.log(savedNotes.length);
                //console.log(savedNotes[0].title, savedNotes[0].body);
            }

            infoDialog.innerHTML = `${msg}<br><div class="flex-cc dialogBtnWrapDiv"><button onclick="infoDialog.close(); saveNoteDialog.close()">Close</button></div>`;
            infoDialog.showModal();

        });
    }

    /******************* Loading saved Notes *********************/

    loadedNotes = JSON.parse(sessionStorage.getItem("savedNotes"));

    //console.log(loadedNotes);

    if (bodyElem.id === 'gridBox') {
        if (loadedNotes !== null && loadedNotes.length !== 0) {
            loadedNotes.forEach(el => {
                console.log(el);
                let noteCardElem = document.createElement('div');
                ['noteCard', 'flex-cc', 'col'].forEach(el => {
                    noteCardElem.classList.add(el);
                });
                noteCardElem.innerHTML = `<button class="deleteNoteBtn">Delete</button>
    <h3>${el.title}</h3>
    <p>${el.body}</p>`;
                bodyElem.appendChild(noteCardElem);
            });
        }
    }

}