const addButton = document.querySelector('#add');


const updateLSDate = ()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    // console.log(textAreaData);

    textAreaData.forEach((curElem)=>{
        return notes.push(curElem.value);
    })
    console.log(notes);

    //adding input data on localstorage.
    localStorage.setItem('notes',JSON.stringify(notes));

}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `      
     <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div> 
    <textarea class="${text ? "hidden" : ""}"></textarea> `;

    // main div and textarea are on the same place and only one should be visible at one time.
    // if there is some data in main div then hide textarea and if it's empty then hide main div.

note.insertAdjacentHTML('afterbegin',htmlData);

// console.log(note);

//getting the references

const editButton = note.querySelector('.edit');
const delButton = note.querySelector('.delete');
const mainDiv = note.querySelector('.main');
const textarea = note.querySelector('textarea');


//deleting the note

delButton.addEventListener('click',()=>{
    note.remove();
    updateLSDate();
})

//toggle using edit button
mainDiv.innerHTML = text;
textarea.value = text;

editButton.addEventListener('click',()=>{
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
})

//keep the data on main div

textarea.addEventListener('change',(event)=>{
    const value = event.target.value;
    console.log(value);
    mainDiv.innerHTML = value;

    updateLSDate();
})



document.body.appendChild(note);
//It appends a node as the last child of the node
}



// getting data back from localstorage.

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());
