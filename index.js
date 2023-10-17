import fs from "fs"
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true })

import Musician from "./musician.js"

let musician = new Musician();

const musiker = fs.readFileSync("./musiker.json")

/*let musikerArray = [];*/


/*for (let i = 0; i < musiker.length; i++) {
  musikerArray.push(musiker[i]);
}*/

const menu = `Musiker och band - Meny:
  1. Skapa ett band
  2. Skriv ut alla band
  3. Skriv ut musiker  `

const val = prompt("Tryck 1")

if (val === "1") {
  createNewMusician();
}

/*const musikerFirstName = prompt("Ange musikerns namn: ")
const musikerLastName = prompt("Ange musikerns efternamn: ")
const musikerInfoText = prompt("Ange en infotext: ")
const musikerBirthYear = prompt("Ange musikerns födelseår: ")
const musikerBand = prompt("Ange musikerns nuvarande band: ")
const musikerOldBand = prompt("Ange musikerns gamla band: ")
const musikerInstrument = prompt("Ange instrument: ")*/

/*let aMusician = new Musician(musikerFirstName, musikerLastName, musikerInfoText, musikerBirthYear, musikerBand, musikerOldBand, musikerInstrument);
console.log(aMusician);

aMusician = {
  firstname: musikerFirstName,
  lastname: musikerLastName,
  infotext: musikerInfoText,
  birthyear: musikerBirthYear,
  band: musikerBand,
  roldband: musikerOldBand,
  instrument: musikerInstrument
}

musikerArray.push(aMusician);

fs.writeFile('./musiker.json', JSON.stringify(musikerArray, null, 2), (err) => {
  if (err) throw err;
  console.log('Dina resultat har nu sparats, Tack och välkommen att svara igen! ');
});*/
