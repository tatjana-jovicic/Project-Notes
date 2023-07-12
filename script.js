//-----------------------------------------------------------------------------------------------velika dugmad lijevo i njihovi iventi (onclick)
const buttonCreate = document.getElementById("button-create");
const clickCreate = document.getElementById("click-create");
const buttonEdit = document.getElementById("button-edit");
const clickEdit = document.getElementById("click-edit");
const buttonRefresh = document.getElementById("button-refresh");
const buttonSearch = document.getElementById("button-search");
const clickSearch = document.getElementById("input-search");
//------------------------------------------------------------------------------------------------karica za biljeske
const postContainer = document.getElementById("posts");
//------------------------------------------------------------------------------------------------velika dugmad desno
const buttonHide = document.getElementById("button-hide");
const buttonShow = document.getElementById("button-show");
const buttonDeleteAll = document.getElementById("button-delete");
//-------------------------------------------------------------------------------------------------kartica kad se klikne Create New
const createHeadline = document.getElementById("create-headline");
const createText = document.getElementById("create-text");
const createButton = document.getElementById("create-button"); //malo dugme na kartici
const errorMessageCreate = document.getElementById("error-message");
//-------------------------------------------------------------------------------------------------kartica kad se klikne Edit
const message = document.getElementById("message"); // napomena za unos indeksa
const editIndex = document.getElementById("edit-index");
const editHeadline = document.getElementById("edit-headline");
const editText = document.getElementById("edit-text");
const editButton = document.getElementById("edit-button"); //malo dugme na kartici
const errorMessageEdit = document.getElementById("error-message-edit");

let isContentRendered = false;

const notes = [];

//----------------------------------------------------veliko dugme Create
buttonCreate.onclick = () => {
  clickCreate.classList.remove("hidden");
  clickEdit.classList.add("hidden");
  clickSearch.classList.add("hidden");
  message.classList.add("hidden");
  errorMessageEdit.classList.add("hidden");
  RenderNotes(notes);
};

//--------------------------------------------------funkcija za validaciju polja na kartici za kreiranje i kreiranje biljeski
function addNotes() {
  errorMessageCreate.classList.remove("hidden");
  const headline = createHeadline.value;
  const text = createText.value;

  let isValid = true;

  if (headline.length == 0) {
    isValid = false;
    createHeadline.classList.add("border_red");
    errorMessageCreate.innerText = "Title can`t be empty!";
  } else {
    createHeadline.classList.remove("border_red");
  }

  if (text.length == 0) {
    isValid = false;
    errorMessageCreate.innerText = "Text can`t be empty!";
    createText.classList.add("border_red");
  } else {
    createText.classList.remove("border_red");
  }

  if (headline.length == 0 && text.length == 0) {
    isValid = false;
    errorMessageCreate.innerText = "Title and text can`t be empty!";
  }

  if (isValid) {
    createHeadline.value = "";
    createText.value = "";
    notes.push({
      title: headline,
      text: text,
    });
    RenderNotes(notes);
  }
}
//-----------------------------------------------------malo dugme na kartici za kreiranje
createButton.onclick = () => {
  addNotes();
};

//---------------------------------------------------veliko dugme Edit
buttonEdit.onclick = () => {
  clickEdit.classList.remove("hidden");
  clickCreate.classList.add("hidden");
  clickSearch.classList.add("hidden");
  errorMessageCreate.classList.add("hidden");
  message.classList.remove("hidden");
  errorMessageEdit.classList.add("hidden");
  RenderNotes(notes);
};

//---------------------------------------------------dugme Refresh
buttonRefresh.onclick = () => {
  clickCreate.classList.add("hidden");
  clickEdit.classList.add("hidden");
  clickSearch.classList.add("hidden");
  errorMessageCreate.classList.add("hidden");
  message.classList.add("hidden");
  errorMessageEdit.classList.add("hidden");
  clickSearch.value = "";
  createHeadline.value = "";
  createText.value = "";
  RenderNotes(notes);
};

//---------------------------------------------------veliko dugme Search
buttonSearch.onclick = () => {
  clickSearch.classList.remove("hidden");
  clickEdit.classList.add("hidden");
  clickCreate.classList.add("hidden");
  errorMessageCreate.classList.add("hidden");
  message.classList.add("hidden");
  errorMessageEdit.classList.add("hidden");
};

//--------------------------------------------------funkcija koja provjerava da li ima kreiranih biljeski i prikazuje ih
function ShowPosts() {
  if (!isContentRendered) {
    RenderNotes(notes);
    isContentRendered = true;
  }
}

//----------------------------------------------------funkcija za prikazivanje biljeski iz niza na stranici
const RenderNotes = (notesToRender) => {
  postContainer.innerHTML = "";
  for (let index = 0; index < notesToRender.length; index++) {
    postContainer.innerHTML += `
    <div class="post_card">
      <div id="post-top" class="post_top">
        <div>
          <h1 id="body-title" class="body_title">${notesToRender[index].title}</h1>
          <p id="text-notes" class="text_notes">${notesToRender[index].text}</p>
        </div>
        <button onclick="clickDelete(${index})" class="post_delete">DELETE</button>
        <button onclick="takeIndexForEdit(${index})" class="post_index">TAKE THE INDEX</button>
    </div>
    </div>
    `;
  }
};

ShowPosts(); //ova funkcija mora biti pozvana ispod funckije za renderovanje biljeski

//----------------------------------------------dugme za prikazivanje biljeski ako su sakriveni
buttonShow.onclick = () => {
  ShowPosts();
};

//--------------------------------------------dugme za skrivanje biljeski
buttonHide.onclick = () => {
  postContainer.innerHTML = "";
  isContentRendered = false;
};

//-------------------------------------------dugme za brisanje svih biljeski odjednom
buttonDeleteAll.onclick = (id) => {
  notes.splice(id, notes.length);
  RenderNotes(notes);
};

//------------------------------------------funkcija tj. ivent dugmeta Delete na svakoj biljeski posebno za brisanje bas te biljeske
function clickDelete(id) {
  notes.splice(id, 1);
  RenderNotes(notes);
  editIndex.value = "";
  editHeadline.value = "";
  editText.value = "";
}

//-------------------------------------------ivent input polja za pretragu tj. Search
clickSearch.oninput = () => {
  let newNotes = [];
  for (let i = 0; i < notes.length; i++) {
    if (
      notes[i].title.toLowerCase().includes(clickSearch.value.toLowerCase())
    ) {
      newNotes.push(notes[i]);
    }
  }
  RenderNotes(newNotes);
};

//----------------------------------------funkcija tj. ivent dugmeta TAKE THE INDEX na svakoj biljeski posebno za hvatanje indeksa bas te biljeske
function takeIndexForEdit(id) {
  editIndex.value = id;

  editHeadline.value = notes[id].title;
  editText.value = notes[id].text;
}

//---------------------------------------malo dugme Edit na kartici i validacija polja Index
editButton.onclick = () => {
  const id = editIndex.value;

  if (id == "" || id >= notes.length) {
    errorMessageEdit.classList.remove("hidden");
    errorMessageEdit.innerHTML =
      "Index can't be empty or that note does not exist!";
    editIndex.classList.add("border_red");
  } else {
    editIndex.classList.remove("border_red");
    errorMessageEdit.classList.add("hidden");

    notes[id].title = editHeadline.value;
    notes[id].text = editText.value;
  }
  RenderNotes(notes);
};
