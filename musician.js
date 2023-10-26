import fs from "fs"
import Band from "./band.js";

export default class Musician {
  musicianList = []
  constructor() {
    this.fetchData()
    this.band = new Band();
  }
  fetchData() {
    const jsonString = fs.readFileSync("./musician.json");
    const data = JSON.parse(jsonString)

    for (let i = 0; i < data.length; i++) {
      this.musicianList.push(data[i]);
    }
  }

  createMusician(name, age, info) {
    const newMusician = new NewMusician(name, age, info);
    this.musicianList.push(newMusician.dataInfo())
    this.writeToJson();
  }
  writeToJson() {
    fs.writeFileSync('./musician.json', JSON.stringify(this.musicianList, null, 2), (err) => {
      if (err) throw err;
      console.log('Artist data succsefully into file')
    })
  }


  showAllMusician() {
    for (let i = 0; i < this.musicianList.length; i++) {
      console.log(`${i}. ${this.musicianList[i].name} ${this.musicianList[i].age}`)
    }
  }
  editMusicianList(index, instrument, bandID, bandName, startYear) {
    if (!this.musicianList[index].instrument.includes(instrument)) {
      this.musicianList[index].instrument.push(instrument);
    }
    this.musicianList[index].currentBand.push({ bandID: bandID, bandName: bandName, startYear: startYear })
  }
  addMTB(musicianIndex, instrument, bandID) {
    this.editMusicianList(musicianIndex, instrument, bandID, bandName, new Date().getFullYear());
    this.band.editBand(this.band.bandList.findIndex(x => x.bandID === bandID),);
  }

  createBand(choice, instrument, bandName, bandAge,) {
    const tempID = this.band.createBand(bandName, bandAge, this.musicianList[choice].musicianID, this.musicianList[choice].name, instrument)
    this.editMusicianList(choice, instrument, tempID, bandName, bandAge)
    this.band.writeToJson();
    this.writeToJson();
  }

  removeOneMusician(bandID, bandIndex, musicianID) {
    const date = new Date().toLocaleString();

    this.band.currentToPrevious(bandIndex, musicianID, date)
    this.currentToPrevious(this.musicianList.findIndex(x => x.musicianID === musicianID), bandID, date);

  }
  currentToPrevious(bandIndex, musicianID, date) {
    const music = this.musicianList[musicianID];
    const band = music.currentBand.find(x => x.bandID === bandID);
    band["timeLeft"] = date;

    music.previousBand.push(band);
    music.currentBand.splice(music.currentBand.findIndex(x => x.bandID === bandID), 1)
  }
}



class NewMusician {
  constructor(name, age, info) {
    this.name = name
    this.age = age
    this.info = info
  }
  dataInfo() {
    return {
      musicianID: 'id' + new Date().getTime(),
      name: this.name,
      age: this.age,
      info: this.info,
      currentBand: [],
      previousBand: [],
      instrument: []
    };
  }
}
