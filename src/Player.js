import random from './utils/random'

import Pokemon from './Pokemon'

class Player extends Pokemon {
  constructor(props) {
    super(props)

    // console.log({ props })

    this.roleName = props.roleName
    this.elHp = document.getElementById(`health-${props.roleName}`)
    this.elStm = document.getElementById(`stamina-${props.roleName}`)
    this.elProgressBarHp = document.getElementById(`progressbar-hp-${props.roleName}`)
    this.elProgressBarStm = document.getElementById(`progressbar-stm-${props.roleName}`)
    this.elBtnKick = document.getElementById(`btn-kick-${props.roleName}`)
  }

  initStamina() {
    const stamina = this.attacks
      .map(attack => attack.maxCount)
      .reduce((acc, current) => acc + current, 0)
    this.currentStamina = stamina
    this.defaultStamina = stamina
  }

  initAttacks() {
    this.attacks = this.attacks.map(attack => ({
      ...attack,
      id: `${attack.name.replace(' ', '')}`.toLowerCase(),
      currentCount: attack.maxCount,
      action: (rival) => {
        const damage = random(attack.minDamage, attack.maxDamage)

        rival.currentHp -= damage

        this.currentStamina -= 1
        attack.currentCount -= 1

        if (rival.currentHp <= 0) {
          rival.currentHp = 0
        }

        return damage
      },
    }))
  }

  // attack(rival) {
  //   const damage = random(1, this.damage) * 2

  //   rival.currentHp -= damage
  //   this.currentStamina -= 1

  //   if (this.currentStamina === 0) {
  //     this.elBtnKick.disabled = true
  //   }

  //   if (rival.currentHp <= 0) {
  //     rival.currentHp = 0
  //   }

  //   return damage
  // }

  renderStamina() {
    this.elStm.innerText = `${this.currentStamina} / ${this.defaultStamina}`
    const width = (this.currentStamina / this.defaultStamina) * 100

    Object.assign(this.elProgressBarStm.style, {
      width: `${width}%`,
    })
  }

  renderHp() {
    this.elHp.innerText = `${this.currentHp} / ${this.defaultHp}`
    const width = (this.currentHp / this.defaultHp) * 100

    width < 50 && document.querySelector(`#progressbar-hp-${this.roleName}`).classList.add('low')
    width < 25 && document.querySelector(`#progressbar-hp-${this.roleName}`).classList.add('critical')

    Object.assign(this.elProgressBarHp.style, {
      width: `${width}%`,
    })
  }
}

export default Player
