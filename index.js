import PromptSync from "prompt-sync";
import MusikerLista from "./musicians.js";
import Musician from "./musician.js";

const musiker = new MusikerLista();
const prompt = PromptSync({ sigint: true });
let run = true;
while (run) {
  console.log(`Musikerns uppgifter: - 
Meny:
1. Lägg till artistens uppgifter



Skriv här: `);

  const val = prompt();

  switch (val) {
    case "1":
      const firstName = prompt(`Skriv in artistens förnamn: `)
      const lastName = prompt(`Skriv in artistens efternamn: `)
      const birthYear = prompt(`Skriv in artistens födelseår: `)
      const currentBand = prompt(`Skriv in artistens nuverande band: `)
      const prevBand = prompt(`Skriv in artistens tidigare band: `)
      const instrument = prompt(`Skriv in artistens instrument: `)
      musiker.addMusikerToList(firstName, lastName, instrument, birthYear, currentBand, prevBand)
      break;
    case "2":
      checkMeny();
      break;
    case "3":
      removeMusiker();
      break;
    case "4":
      console.log(musiker.skrivUtMusiker());
      break;
    case "A":
      console.log("Programmet avslutas!");
      run = false;
      break;
    default:
      console.log("Du måste välja mellan 1 - 4 eller A!");
  }
}


function removeMusiker() {
  musiker.skrivUtMusiker();
  const val = prompt("Skriv in index för den hunden du vill ta bort ->");

  if (Number(val).toString() === "NaN") {
    console.log("Måste skriva in ett tal!");
  }
  if (val <= musiker.getLength() && val >= 1) {
    musiker.removeMusikerFromList(Number(val) - 1);
  } else {
    console.log(`Talet måste vara mellan 1 och ${musiker.getLength()}`);
  }
}

function checkMeny() {
  let run = true;
  while (run) {
    musiker.skrivUtMusikerMedCheckIn();
    console.log("B. för att gå tillbaka");
    const val = prompt("Skriv in index för den hunden du checka in/ut ->");

    if (val.trim().toUpperCase() === "B") {
      run = false;
    } else if (Number(val).toString() === "NaN") {
      console.log("Du måste skriva in ett tal!");
    }
    if (val <= musiker.getLength() && val >= 1) {
      musiker.checkInMusiker(Number(val) - 1);
    } else {
      console.log(`Talet måste vara mellan 1 och ${musiker.getLength()}`);
    }
  }
}