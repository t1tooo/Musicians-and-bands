const { log } = require('console');
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });

const menu = `Musiker och band - Meny:
  1. Skapa ett band
  2. Skriv ut alla band
  3. Skriv ut musiker  `


musikerNamn = prompt("Ange musikerns namn: ")
musikerInfoText = prompt("Ange en infotext: ")
musikerBirthYear = prompt("Ange musikerns födelseår: ")
musikerBand = prompt("Ange musikerns nuvarande band: ")
musikerOldBand = prompt("Ange musikerns gamla band: ")
musikerInstrument = prompt("Ange instrument: ")

class Musician {

  constructor(name, infotext, birthYear, band, oldBand, instruments) {
    this.name = name;
    this.infotext = infotext;
    this.birthYear = birthYear;
    this.band = band;
    this.oldBand = oldBand;
    this.instruments = instruments;
  }
}

let aMusician = new Musician(musikerNamn, musikerInfoText, musikerBirthYear, musikerBand, musikerOldBand, musikerInstrument);
console.log(aMusician);