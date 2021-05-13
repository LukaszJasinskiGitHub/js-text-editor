const express = require('express');
const fs = require('fs'); // import File system

const dataFile = './src/textEditorData.json'; // plik z danymi w formacie json

const app = express(); // tworzymy serwer
app.use(express.static('./')); // root argument -> main folder
app.use(express.json()); // do requestów w postaci json

app.get('/', (req, res) => {
  res.sendFile('index.html'); // serwowanie glownej strony aplikacji
});

app.listen(3002, () => {
  console.log('Server is listening at http://localhost:3002'); // postawienie serwera, oczekuje na polaczenia na porcie 3002
});

const loadData = (fileName) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  JSON.parse(fs.existsSync(fileName) ? fs.readFileSync(fileName) : '""');
// zwraca dane z pliku jesli plik istnieje (podajemy sciezke do pliku)

const saveData = (fileName, dataToSave) => {
  const dataFileContainer = loadData(fileName); // pobiera aktualne dane z json file
  dataFileContainer.text = dataToSave; // przypisuje nowe wartosci dla property text
  return fs.writeFileSync(fileName, JSON.stringify(dataFileContainer));
};

saveData(dataFile, ''); // wywolanie funkcji zapsiującej do pliku json

app.post('/save', (req, res) => {
  const { text } = req.body; // destrukturyzacja param text z request
  saveData('./src/textEditorData.json', text);
  res.send();
});

app.get('/load', (req, res) => {
  const dataToLoad = loadData(dataFile); // pobiera aktualne dane z json file
  res.send(dataToLoad);
});
