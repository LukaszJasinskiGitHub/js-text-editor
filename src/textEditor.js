// funkcja podmienjąca parametr w funcji zaleznie od wybranego formatowania
const textFormat = (typeOfFormat) => {
  document.execCommand(typeOfFormat, false); //typeOfFormat - wybrany typ formatowania
};

const content = document.querySelector('div.text-editor-area');

const saveDataToFile = () => {
  console.log('save');
  console.log(content.innerHTML);
  fetch('/save', {
    method: 'POST',
    body: JSON.stringify({
      text: content.innerHTML, //przesyłany html
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const loadDataFromFile = () => {};
