// funkcja podmienjąca parametr w funcji zaleznie od wybranego formatowania
const textFormat = (typeOfFormat) => {
  document.execCommand(typeOfFormat, false); // typeOfFormat - wybrany typ formatowania
};

const content = document.querySelector('div.text-editor-area');
const messageBox = document.querySelector('div.information-container');
let isLoading = false; // zapobiega kilku requestom przed otzrymaniem response

// funkcja wyswietlająca komunikaty
const handlingMessageBox = (saveData = false, loadData = false) => {
  let msg = '';
  if (saveData) {
    // obsuga wiadomosci dla zapisu
    msg = 'Document saved';
  } else if (loadData) {
    // obsuga wiadomosci dla wczytywania
    msg = 'Document loaded';
  }
  // kasowanie wiadomosci po 2 sekundach
  setTimeout(() => {
    messageBox.innerText = '';
  }, 2000);
  messageBox.innerText = msg; // wyswietalnie wiadomosci
};

// funkcja zapisujaca tekst w pliku
const saveDataToFile = async () => {
  if (isLoading) {
    // zapobiega wyslaniu kolejnego requesta przed otrzymaniem odp
    messageBox.innerText = 'Loading... Please wait...';
    return;
  }

  isLoading = true;

  const response = await fetch('/save', {
    method: 'POST',
    body: JSON.stringify({
      text: content.innerHTML, // przesyłany html
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  isLoading = false;
  handlingMessageBox(true, false); // wyswietlanie informacji o zapisie
};

// funkcja wczytująca tekst z pliku
const loadDataFromFile = async () => {
  if (isLoading) {
    // zapobiega wyslaniu kolejnego requesta przed otrzymaniem odp
    messageBox.innerText = 'Loading... Please wait...';
    return;
  }
  isLoading = true;

  const response = await fetch('/load', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  isLoading = false;
  handlingMessageBox(false, true); // wyswietlanie informacji o wczytaniu
  content.innerHTML = response.text; // podstawianie otrzymanego html do edytora tekstu
};
