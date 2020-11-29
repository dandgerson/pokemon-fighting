import random from './utils/random'

import Pokemon from './Pokemon'

class Character extends Pokemon {
  constructor(props) {
    super(props)

    this.roleName = props.roleName
    this.elHp = document.getElementById(`health-${props.roleName}`)
    this.elStm = document.getElementById(`stamina-${props.roleName}`)
    this.elProgressBarHp = document.getElementById(`progressbar-hp-${props.roleName}`)
    this.elProgressBarStm = document.getElementById(`progressbar-stm-${props.roleName}`)
    this.elBtnKick = document.getElementById(`btn-kick-${props.roleName}`)
  }

  attack(rival) {
    const damage = random(1, this.damage) * 2

    rival.currentHp -= damage
    this.currentStamina -= 1

    if (this.currentStamina === 0) {
      this.elBtnKick.disabled = true
    }

    if (rival.currentHp <= 0) {
      rival.currentHp = 0
    }

    return damage
  }

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

export default Character
