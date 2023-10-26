import fs from "fs";
import Band from "./band.js";

export default class Musician {
  musicianList = [];
  band;

  constructor() {
    this.band = new Band();
    this.fetchData();
  }

  fetchData() {
    try {
      const jsonString = fs.readFileSync("./musician.json");
      this.musicianList = JSON.parse(jsonString);
    } catch (err) {
      console.error("Error reading musician.json:", err);
    }
  }

  createMusician(name, birthdate, info) {
    const age = this.calculateAgeFromBirthdate(birthdate);
    if (age !== null) {
      const newMusician = new NewMusician(name, age, info);
      this.musicianList.push(newMusician.dataInfo());
      this.writeToJson();
    } else {
      console.log("Invalid birthdate format. Please use 'yyyymmdd'.");
    }
  }

  writeToJson() {
    fs.writeFileSync('./musician.json', JSON.stringify(this.musicianList, null, 2), (err) => {
      if (err) {
        console.error("Error writing to musician.json:", err);
      } else {
        console.log('Artist data successfully written to file');
      }
    });
  }

  showAMusician(choice) {
    if (choice >= 0 && choice < this.musicianList.length) {
      console.log(this.musicianList[choice]);
    } else {
      console.log("Invalid choice.");
    }
  }

  showAllMusician() {
    for (let i = 0; i < this.musicianList.length; i++) {
      console.log(`${i}. ${this.musicianList[i].name} ${this.musicianList[i].age}`);
    }
  }

  calculateAgeFromBirthdate(birthdate) {
    if (birthdate.length === 8) {
      const year = parseInt(birthdate.slice(0, 4));
      const month = parseInt(birthdate.slice(4, 6));
      const day = parseInt(birthdate.slice(6, 8));
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      let age = currentYear - year;
      if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
      }
      return age;
    }
    return null;
  }

  editMusicianList(index, instrument, bandID, bandName, startYear) {
    if (index >= 0 && index < this.musicianList.length) {
      if (!this.musicianList[index].instrument.includes(instrument)) {
        this.musicianList[index].instrument.push(instrument);
      }
      this.musicianList[index].currentBand.push({ bandID: bandID, bandName: bandName, startYear: startYear });
    } else {
      console.log("Invalid musician index.");
    }
  }

  addMTB(musicianIndex, instrument, bandID, bandName) {
    this.editMusicianList(musicianIndex, instrument, bandID, bandName, new Date().getFullYear());
    this.band.editBand(this.band.bandList.findIndex(x => x.bandID === bandID), musicianIndex);
  }

  createBand(choice, instrument, bandName, bandAge) {
    if (choice >= 0 && choice < this.musicianList.length) {
      const tempID = this.band.createBand(bandName, bandAge, this.musicianList[choice].musicianID, this.musicianList[choice].name, instrument);
      this.editMusicianList(choice, instrument, tempID, bandName, bandAge);
      this.band.writeToJson();
      this.writeToJson();
    } else {
      console.log("Invalid choice.");
    }
  }

  removeOneMusician(bandID, bandIndex, musicianID) {
    const date = new Date().toLocaleString();
    this.band.currentToPrevious(bandIndex, musicianID, date);
    this.currentToPrevious(musicianID, bandID, date);
    this.band.writeToJson();
    this.writeToJson();
  }

  currentToPrevious(musicianID, bandID, date) {
    if (musicianID >= 0 && musicianID < this.musicianList.length) {
      const music = this.musicianList[musicianID];
      const band = music.currentBand.find(x => x.bandID === bandID);
      if (band) {
        band["timeLeft"] = date;
        music.previousBand.push(band);
        music.currentBand.splice(music.currentBand.findIndex(x => x.bandID === bandID), 1);
      } else {
        console.log("Band not found for the musician.");
      }
    } else {
      console.log("Invalid musician ID.");
    }
  }
}

class NewMusician {
  constructor(name, age, info) {
    this.name = name;
    this.age = age;
    this.info = info;
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
