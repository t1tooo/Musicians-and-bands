import fs from 'fs';
import Band from './band.js';

export default class Musiker {
  musikerLista = [];

  constructor() {
    this.fetchData();
    this.band = new Band();
  }

  fetchData() {
    const jsonString = fs.readFileSync('./musiker.json');
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.musikerLista.push(data[i]);
    }
  }
  editMusikerLista(index, instrument, bandID, bandNamn, yearCreated) {
    if (!this.musikerLista[index].instrument.includes(instrument)) {
      this.musikerLista[index].instrument.push(instrument);
    }
    this.musikerLista[index].currentBand.push({ bandID: bandID, bandName: bandNamn, yearCreated: yearCreated });
    this.skrivTillJson();
  }
  visaDetaljeradInfo(bandIndex) {
    if (bandIndex < 0 || bandIndex >= this.band.bandLista.length) {
      console.log("Invalid band index.");
      return;
    }

    const band = this.band.bandLista[bandIndex];
    console.log(`Band Name: ${band.name}`);
    console.log(`Band Age: ${band.age}`);
    console.log("Current Band Members:");
    band.currentBand.forEach((member, index) => {
      console.log(`${index + 1}. ${member.memberName}, ${member.instrument}`);
    });
    console.log("Previous Band Members:");
    band.previusBand.forEach((member, index) => {
      console.log(`${index + 1}. ${member.memberName}, ${member.instrument}, Left: ${member.dateItLeft}`);
    });
  }

  taBortMusiker(musikerID) {
    const musikerIndex = this.musikerLista.findIndex((musiker) => musiker.musikerID === musikerID);
    if (musikerIndex === -1) {
      return false;
    }

    const borttagenMusiker = this.musikerLista[musikerIndex];
    let tidigareMedlemmar = [];

    if (fs.existsSync('./tidigareMedlemmar.json')) {
      fs.readFile('./tidigareMedlemmar.json', 'utf-8', (err, data) => {
        if (!err) {
          tidigareMedlemmar = JSON.parse(data);
          tidigareMedlemmar.push(borttagenMusiker);
          this.skrivTillTidigareMedlemmarJson(tidigareMedlemmar);
        }
      });
    } else {
      tidigareMedlemmar.push(borttagenMusiker);
      this.skrivTillTidigareMedlemmarJson(tidigareMedlemmar);
    }

    const bandIDsToRemoveFrom = this.musikerLista[musikerIndex].currentBand.map((b) => b.bandID);
    for (const bandID of bandIDsToRemoveFrom) {
      const bandIndex = this.band.bandLista.findIndex((band) => band.bandID === bandID);
      if (bandIndex !== -1) {
        this.band.currentToPrevious(bandIndex, musikerID, new Date().toLocaleString());
      }
    }

    this.musikerLista.splice(musikerIndex, 1);
    this.skrivTillJson();
    return true;
  }

  skapaMusiker(name, age, info) {
    const newMusiker = new NewMusiker(name, age, info);
    this.musikerLista.push(newMusiker.dataInfo());
    this.skrivTillJson();
  }

  skrivTillJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.musikerLista, null, 2), (err) => {
      if (err) throw err;
      console.log('Artist data written to file');
    });
  }

  skrivTillTidigareMedlemmarJson(data) {
    fs.writeFileSync('./tidigareMedlemmar.json', JSON.stringify(data, null, 2), (err) => {
      if (err) throw err;
      console.log('Tidigare medlem data skriven till fil');
    });
  }

  visaAllaMusiker() {
    for (let i = 0; i < this.musikerLista.length; i++) {
      console.log(`${i}. ${this.musikerLista[i].name}`);
    }
  }


  visaEnMusiker(val) {
    console.log(this.musikerLista[val]);
  }

  skapaEttBand(val, instrument, bandNamn, bandAge) {
    const tempID = this.band.skapaEttBand(bandNamn, bandAge, this.musikerLista[val].musikerID, this.musikerLista[val].name, instrument);
    this.editMusikerLista(val, instrument, tempID, bandNamn, bandAge);
    this.band.skrivTillJson();
    this.skrivTillJson();
  }

}

class NewMusiker {
  constructor(name, age, info) {
    this.name = name;
    this.age = age;
    this.info = info;
  }

  dataInfo() {
    return {
      musikerID: 'id' + new Date().getTime(),
      name: this.name,
      age: this.age,
      info: this.info,
      currentBand: [],
      previusBand: [],
      instrument: [],
    };
  }
}
