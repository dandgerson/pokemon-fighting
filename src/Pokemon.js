class Pokemon {
  constructor({
    name, hp, damage, stamina,
  }) {
    this.name = name
    this.defaultHp = hp
    this.currentHp = hp
    this.defaultStamina = stamina
    this.currentStamina = stamina
    this.damage = damage
  }
}

export default Pokemon
