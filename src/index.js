import './style.css'
import './assets/Pokemon_logo.png'

import { pokemonsData, rolesList } from './constants'
import generateLog from './helpers/generateLog'
import initCharacters from './helpers/initCharacters'

// Init Game

const init = () => {
  console.log('Start Game!')

  const [character, enemy] = initCharacters(pokemonsData, rolesList)

  let stepCount = 0

  const handleBtnKickClick = function (rival) {
    stepCount += 1

    const renderLog = ({ damage }) => {
      const $logsContainer = document.querySelector('.logs')
      $logsContainer
        .insertAdjacentHTML('afterbegin', generateLog.call(this, rival, damage, stepCount))

      $logsContainer.scrollTop = 0
      $logsContainer.querySelector('.log').classList.add('log-last')
    }

    if (this.currentStamina > 0) {
      const damage = this.attack(rival) // sideEffect: this.currentStamina--
      rival.renderHp()
      this.renderStamina()

      renderLog({ damage })

      if (rival.currentHp === 0) {
        rival.elBtnKick.disabled = true
        this.elBtnKick.disabled = true

        setTimeout(() => {
          alert(`Бедный ${rival.name} -- проиграл...`)
        }, 300)

        return
      }

      if (this === character && !rival.elBtnKick.disabled) {
        setTimeout(() => rival.elBtnKick.click(), 500)
      }
    }
  }

  character.elBtnKick.addEventListener('click', handleBtnKickClick.bind(character, enemy))
  enemy.elBtnKick.addEventListener('click', handleBtnKickClick.bind(enemy, character))
}

init()
