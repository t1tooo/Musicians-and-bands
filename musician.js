export default class Musician {
  #firstName;
  #lastName;
  #infoText;
  #instrument;
  #birthYear;
  #currentBand;
  #prevBand;
  #age;
  #active;

  constructor(firstName, lastName, infoText, instrument, birthYear, currentBand, prevBand, age, active = false) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#instrument = instrument;
    this.#infoText = infoText;
    this.#birthYear = birthYear;
    this.#currentBand = currentBand;
    this.#prevBand = prevBand;
    this.#age = age;
    this.#active = active;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get instrument() {
    return this.#instrument;
  }
  get infoText() {
    return this.#infoText;
  }

  get birthYear() {
    return this.#birthYear;
  }


  get currentBand() {
    return this.#currentBand;
  }

  get prevBand() {
    return this.#prevBand;
  }

  get active() {
    return this.#active;
  }
  get age() {
    return this.#age;
  }

  set name(newName) {
    this.#firstName = newName;
  }

  set lastname(newName) {
    this.#lastName = newName;
  }

  set instrument(NewInst) {
    this.#instrument = NewInst;
  }
  set infoText(NewInfo) {
    this.#infoText = NewInfo;
  }

  set birthYear(NewAge) {
    this.#birthYear = NewAge;
  }

  set currentBand(NewCurrentBand) {
    this.#currentBand = NewCurrentBand;
  }

  set prevBand(newPrevBand) {
    this.#prevBand = newPrevBand;
  }
  set age(newAge) {
    this.#age = newAge;
  }


  active() {
    this.#active = !this.#active;
  }

  dataInfo() {
    return {
      "firstName": this.#firstName,
      "lastName": this.#lastName,
      "infoText": this.infoText,
      "birthyear": this.#birthYear,
      "currentband": this.#currentBand,
      "prevband": this.#prevBand,
      "instrument": this.#instrument,
      "active": this.#active,
      "age": (Number(this.#age))
    };
  }
}
