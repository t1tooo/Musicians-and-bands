import fs from "fs"
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true })

let musikerArray = [];
const musicianData = fs.readFileSync("musiker.json")


export default class Musician {

  #firstName;
  #lastName;
  #infoText;
  #birthYear;
  #band;
  #oldBand;
  #instruments;


  constructor() {
    this.createNewMusician()
  }

  createNewMusician() {
    this.#firstName = JSON.parse(musicianData)
    const musikerFirstName = prompt("Ange musikerns namn: ")
    const musikerLastName = prompt("Ange musikerns efternamn: ")
    const musikerInfoText = prompt("Ange en infotext: ")
    const musikerBirthYear = prompt("Ange musikerns födelseår: ")
    const musikerBand = prompt("Ange musikerns nuvarande band: ")
    const musikerOldBand = prompt("Ange musikerns gamla band: ")
    const musikerInstrument = prompt("Ange instrument: ")

    let i = 0; i < musicianData.length; i++
    musikerArray.push(musicianData[i]);
    let aMusician = new Musician(musikerFirstName, musikerLastName, musikerInfoText, musikerBirthYear, musikerBand, musikerOldBand, musikerInstrument);
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
  }
}

