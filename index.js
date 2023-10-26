import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true })
import Musician from "./musician.js"
import Band from "./band.js";

const musician = new Musician();
const band = new Band();
console.log(
  `Meny:
  1. Skapa ny musiker
  2. Skapa nytt band
  3. Lägg till ett musiker till ett band
  4. Ta bort musiker eller band`
);

const choice = prompt();
switch (choice) {
  case "1":
    let musikerName = prompt("Vad heter musikern")
    let age = prompt("Hur gammal är musikern")
    let info = prompt("Information om musikern")
    musician.createMusician(musikerName, age, info);
    break;
  case "2":
    if (musician.musicianList.length <= 0) {
      console.log("Du måste skapa en musiker innan du kan skapa nytt band");
    } else {
      musician.showAllMusician();
      let choice = prompt("Välj din första bandmedlem");
      if (choice < 0 || choice > musician.musicianList.length || isNaN(choice)) {
        console.log("Valet finns inte");
      } else {
        let instrument = prompt("Vilka instrument spelar musikern");
        let bandName = prompt("Vad heter bandet")
        let bandAge = prompt("När skapades bandet?")
        musician.createBand(choice, instrument, bandName, bandAge);
      }
    }
    break;
  case "3":
    if (band.bandList.length === 0) {
      console.log("Det finns inga band")
    } else if (musician.musicianList.length === 0) {
      console.log("Det finns inga musiker!");
    } else {
      musician.showAllMusician();
      const choice = prompt("vilken musiker vill du ha ")
    } if (choice < 0 || choice > musician.musicianList.length || isNaN(choice)) {
      console.log("Valet finns inte");
    } else {
      const instrument = prompt("Vad för instrument spelar musikern");
      const temp = band.displayOngoingBand();
      if (temp.length === 0) {
        console.log("Finns inga tillgängliga band");
      } else {
        const choice2 = prompt("Vilket band vill du ha?")
        if (choice2 < 0 || choice2 > temp.length || isNaN(choice2)) {
          console.log("Valet finns inte");

        } else {
          musician.addMTB(choice, instrument, temp[choice2].bandID, temp[choice2].bandName)
        }
        break;
      }
    }
  case "4":
    if (band.bandList.length === 0) {
      console.log("Det finns inga band")
    } else if (musician.musicianList.length === 0) {
      console.log("Det finns inga musiker!");
    } else {
      const tempBand = band.displayOngoingBand();
      if (tempBand.length === 0) {
        console.log("Det finns inga tillgängliga band");
      } else {
        const choice1 = prompt("Bandet du vill ha: ")
      } if (choice1 < 0 || choice1 > tempBand.length || isNaN(choice1)) {
        console.log("Valet finns inte");
      } else {
        const tempMusician = band.displayCurrentMember(tempBand[choice1].index,)
        const choice2 = prompt("Vilken musiker vill du ta bort: ")
      } if (choice2 < 0 || choice2 > tempMusician.length || isNaN(choice2)) {
        console.log("Valet finns inte");
      } else {
        musician.removeOneMusician(tempBand[choice1].bandID, tempBand[choice].index, tempMusician[choice2])
      }
    }

    break;
    console.log("Valet finns ej");
}