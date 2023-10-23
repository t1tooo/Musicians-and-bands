export default class Band {
  #bandName;
  #infoText;
  #createdYear;
  #endYear;

  #active;

  constructor(bandName, infoText, createdYear, endYear, active = false) {
    this.#bandName = bandName;
    this.#infoText = infoText;
    this.#createdYear = createdYear;
    this.#endYear = endYear;
    this.#active = active;
  }

  get bandName() {
    return this.#bandName;
  }

  get infoText() {
    return this.#infoText;
  }

  get createdYear() {
    return this.#createdYear;
  }

  get endYear() {
    return this.#endYear;
  }

  get active() {
    return this.#active;
  }

  set bandName(newName) {
    this.#bandName = newName;
  }

  set infoText(newInfo) {
    this.#infoText = newInfo;
  }

  set createdYear(newYear) {
    this.#createdYear = newYear;
  }

  set endYear(newYear) {
    this.#endYear = newYear;
  }


  active() {
    this.#active = !this.#active;
  }

  getInfo() {
    return {
      bandName: this.#bandName,
      infoText: this.#infoText,
      createdYear: this.#createdYear,
      endYear: this.#endYear,
      active: this.#active,
    };
  }
}
