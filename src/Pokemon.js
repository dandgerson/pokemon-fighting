class Pokemon {
  constructor({
    name,
    hp,
    damage,
    attacks,
    img,
  }) {
    this.name = name
    this.defaultHp = hp
    this.currentHp = hp
    this.attacks = attacks
    this.img = img

    const stamina = this.attacks
      .map(attack => attack.maxCount)
      .reduce((acc, current) => acc + current, 0)

    this.currentStamina = stamina
    this.defaultStamina = stamina
  }
}

export default Pokemon
