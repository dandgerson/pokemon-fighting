class Pokemon {
  constructor({
    name,
    hp,
    attacks,
    img,
  }) {
    this.name = name
    this.defaultHp = hp
    this.currentHp = hp
    this.attacks = attacks
    this.img = img
  }
}

export default Pokemon
