import fs from "fs";
import Musician from "./musician.js";

export default class MusikerLista {
  #lista = [];

  constructor() {
    this.#fetchMusikerData();
  }

  get lista() {
    return this.#lista;
  }

  #fetchMusikerData() {
    const jsonString = fs.readFileSync("musician.json");
    const data = JSON.parse(jsonString);
    const year = Number(2023);
    for (let i = 0; i < data.length; i++) {
      const birthYear = Number(data[i].birthYear);
      if (!isNaN(birthYear)) {
        const age = year - birthYear;
        this.#lista.push(new Musician(data[i].firstName, data[i].lastName, birthYear, data[i].currentBand, data[i].prevBand, data[i].instrument, age));
      }
    }
  }

  skrivUtMusiker() {
    for (let i = 0; i < this.#lista.length; i++) {
      console.log(`${i + 1}. ${this.#lista[i].firstName} ${this.#lista[i].lastName}`);
    }
  }

  skrivUtMusikerMedCheckIn() {
    for (let i = 0; i < this.#lista.length; i++) {
      console.log(`${i + 1}. ${this.#lista[i].firstName} -> ${this.#lista[i].checkedIn}`);
    }
  }

  addMusikerToList(firstName, lastName, födelseår, currentBand, prevBand, instrument, age) {
    this.#lista.push(new Musician(firstName, lastName, födelseår, currentBand, prevBand, instrument, age));
    this.#updateJsonFile();
  }

  removeMusikerFromList(index) {
    this.#lista.splice(index, 1);
    this.#updateJsonFile();
  }

  #updateJsonFile() {
    let tempList = [];

    for (let i = 0; i < this.#lista.length; i++) {
      tempList.push(this.#lista[i].dataInfo());
    }

    fs.writeFileSync('./musician.json', JSON.stringify(tempList, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }

  activeMusiker(index) {
    this.#lista[index].active();
    this.#updateJsonFile();
  }

  getLength() {
    return this.#lista.length;
  }
}
