const expess = require('express');
const fs = require('fs'); //import file system

const app = expess(); //tworzymy server

app.listen(3002, () => {
  console.log('Server is listening at http://localhost:3002');
});

const loadData = (fileName) => {
  return JSON.parse(fs.existsSync(fileName) ? fs.readFileSync(fileName) : '""');
  //zwraca dane z pliku jesli plik istanieje (podajemy sciezke do pliku)
};

const saveData = (fileName, dataToSave) => {
  const dataFileContainer = loadData(fileName); //pobiera aktualne dane z json file
  dataFileContainer.text = dataToSave; //przypisuje nowe wartosci dla property text
  return fs.writeFileSync(fileName, JSON.stringify(dataFileContainer));
};

saveData('./src/textEditorData.json', ''); //wywolanie funkcji zapsiującej do pliku json
