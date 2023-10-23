import fs from "fs";
import Band from "./band.js";

export default class BandList {
  #list = [];

  constructor() {
    this.#fetchBandData();
  }

  get list() {
    return this.#list;
  }

  #fetchBandData() {
    const jsonString = fs.readFileSync("band.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.#list.push(new Band(data[i].bandName, data[i].bandInfoText, data[i].createdYear, data[i].endYear));
    }
  }

  displayBands() {
    for (let i = 0; i < this.#list.length; i++) {
      console.log(`${i + 1}. ${this.#list[i].bandName}`);
    }
  }

  addBand(bandName, bandInfoText, createdYear, endYear) {
    this.#list.push(new Band(bandName, bandInfoText, createdYear, endYear));
    this.#updateJsonFile();
  }

  removeBand(index) {
    this.#list.splice(index, 1);
    this.#updateJsonFile();
  }

  #updateJsonFile() {
    const bandData = this.#list.map((band) => band.dataInfo());
    fs.writeFileSync('./band.json', JSON.stringify(bandData, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }

  getLength() {
    return this.#list.length;
  }
}
