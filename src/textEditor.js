// funkcja podmienjąca parametr w funcji zaleznie od wybranego formatowania
const textFormat = (typeOfFormat) => {
  document.execCommand(typeOfFormat, false); //typeOfFormat - wybrany typ formatowania
};

const content = document.querySelector('div.text-editor-area');

const saveDataToFile = () => {};

const loadDataFromFile = () => {};
