// funkcja podmienjąca parametr w funcji zaleznie od wybranego formatowania
const textFormat = (typeOfFormat) => {
  document.execCommand(typeOfFormat, false); //typeOfFormat - wybrany typ formatowania
};

const content = document.querySelector('div.text-editor-area');

const saveDataToFile = async () => {
  const response = await fetch('/save', {
    method: 'POST',
    body: JSON.stringify({
      text: content.innerHTML, //przesyłany html
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const loadDataFromFile = async () => {
  const response = await fetch('/load', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  content.innerHTML = response.text; //podstawianie otrzymanego html do edytora tekstu
};
