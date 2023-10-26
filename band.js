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
    const temp = this.ongoingBand();
    if (!temp.length === 0) {
      for (let i = 0; i < temp.length; i++) {
        console.log(`${i}. ${temp[i].bandName}`);
      }
    }
    return temp;
  }

  displayCurrentMember(bandIndex) {
    const band = this.bandList[bandIndex].currentBand;
    const currentMember = [];
    for (let i = 0; i < this.bandList[bandIndex].length; i++) {
      console.log(`${i}. ${band[i].memberName} ${band[i].instrument}`);
      currentMember.push(band[i].memberID);
    }
    return currentMember;
  }

  createBand(bandName, bandAge, musicianID, musicianName, instrument) {
    const newBand = new NewBand(bandName, bandAge, musicianID, musicianName, instrument)
    this.bandList.push(newBand.dataInfo())
    return newBand.dataInfo().bandID;
    this.writeToJson();
  }
  editBand(index, musikerID, musikerName, instrument, datum) {
    this.bandLista[index].currentBand.push({ memberID: musikerID, memberName: musikerName, instrument: instrument, joined: datum })
  }
  currentToPrevious(bandIndex, musicianID, date) {
    const member = this.bandList[bandIndex].currentBand.find(x => x.memberID === musicianID)
    member["dateItLeft"] = date;

    this.bandList[bandIndex].previousBand.push(member);
    this.bandList[bandIndex].currentBandBand.splice(this.bandList[bandIndex].currentBand.findIndex(x => x.bandID === bandID), 1)
    if (this.bandList[bandIndex].currentBand.length === 0) {
      this.bandList[bandIndex].dissolved = date;
    }
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