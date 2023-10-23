export default class Musician {
  #firstName;
  #lastName;
  #instrument;
  #birthYear;
  #currentBand;
  #prevBand;
  #active;

  constructor(firstName, lastName, instrument, birthYear, currentBand, prevBand, active = false) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#instrument = instrument;
    this.#birthYear = birthYear;
    this.#currentBand = currentBand;
    this.#prevBand = prevBand;
    this.#active = active;
  }

  get name() {
    return this.#firstName;
  }

  get lastname() {
    return this.#lastName;
  }

  get instrument() {
    return this.#instrument;
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

  set name(newName) {
    this.#firstName = newName;
  }

  set lastname(newName) {
    this.#lastName = newName;
  }

  set instrument(NewInst) {
    this.#instrument = NewInst;
  }

  set birthYear(NewAge) {
    this.#birthYear = NewAge;
  }

  set currentBand(NewCurrentBand) {
    this.#currentBand = NewCurrentBand;
  }

  set band(prevBand) {
    this.#prevBand = prevBand;
  }




  active() {
    this.#active = !this.#active;
  }

  dataInfo() {
    return {
      "firstname": this.#firstName,
      "lastname": this.#lastName,
      "birthyear": this.#birthYear,
      "currentband": this.#currentBand,
      "prevband": this.#prevBand,
      "instrument": this.#instrument,
      "active": this.#active
    };
  }
}
