const express = require('express');
const path = require('path');
const fs = require('fs'); //import file system

const app = express(); //tworzymy server
app.use(express.static('./')); // root argument - main folder
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3002, () => {
  console.log('Server is listening at http://localhost:3002');
});

const loadData = (fileName) => {
  return JSON.parse(fs.existsSync(fileName) ? fs.readFileSync(fileName) : '""');
  //zwraca dane z pliku jesli plik istanieje (podajemy sciezke do pliku)
};

const saveData = (fileName, dataToSave) => {
  console.log(dataToSave);
  const dataFileContainer = loadData(fileName); //pobiera aktualne dane z json file
  dataFileContainer.text = dataToSave; //przypisuje nowe wartosci dla property text
  return fs.writeFileSync(fileName, JSON.stringify(dataFileContainer));
};

saveData('./src/textEditorData.json', ''); //wywolanie funkcji zapsiującej do pliku json

app.post('/save', (req, res) => {
  const { text } = req.body; //destrukturyzacja param text z requesta
  saveData('./src/textEditorData.json', text);
});
