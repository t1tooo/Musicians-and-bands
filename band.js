import fs from "fs"
export default class Band {
  bandList = []
  constructor() {
    this.fetchData()
    this.newBand = new NewBand();
  }

  fetchData() {
    const jsonString = fs.readFileSync("./band.json");
    const data = JSON.parse(jsonString)

    for (let i = 0; i < data.length; i++) {
      this.bandList.push(data[i]);
    }
  }

  writeToJson() {
    fs.writeFileSync('./band.json', JSON.stringify(this.bandList, null, 2), (err) => {
      if (err) throw err;
      console.log('Artist data succsefully into file')
    })
  }
  ongoingBand() {
    const temp = [];
    for (let i = 0; i < this.bandList; i++) {
      if (this.bandList[i].dissolved === null) {
        temp.push({ bandID: this.bandList[i].bandID, bandName: this.bandList[i].bandName })
      }
    }
    return temp;
  }
  displayOngoingBand() {
    const temp = this.displayOngoingBand();
    if (!temp.length === 0) {
      for (let i = 0; i < temp.length; i++) {
        console.log(`${i}. ${temp[i].bandName}`);
      }
    }
    return temp;
  }

  createBand(bandName, bandAge, musicianID, musicianName, instrument) {
    const newBand = new NewBand(bandName, bandAge, musicianID, musicianName, instrument)
    this.bandList.push(newBand.dataInfo())
    return newBand.dataInfo().bandID;
    this.writeToJson();
  }
  editBand() {

  }
}


class NewBand {
  constructor(bandName, bandAge, musicianID, musicianName, instrument) {
    this.bandName = bandName;
    this.bandAge = bandAge;
    this.musicianID = musicianID;
    this.musicianName = musicianName;
    this.instrument = instrument;

  }
  dataInfo() {
    return {
      bandID: 'id' + new Date().getTime(),
      name: this.bandName,
      age: this.bandAge,
      currentBand: [{ memberID: this.musicianID, memberName: this.musicianName, instrument: this.instrument, joined: this.bandAge }],
      previousBand: [],
      instrument: [],
      ended: null
    };
  }
}