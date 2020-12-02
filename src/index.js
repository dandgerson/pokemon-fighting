import './style.scss'
import './assets/Pokemon_logo.png'

import { rolesList } from './constants'
import pokemonsData from './pokemons'
import generateLog from './helpers/generateLog'
import initPlayers from './helpers/initPlayers'

// Init Game

const init = () => {
  console.log('Start Game!')

  const [player1, player2] = initPlayers(pokemonsData, rolesList)

  let stepCount = 0

  const handleAttackBtnClick = function ({ player, attack, rival, attackBtn }) {
    const renderLog = ({ damage, attackName }) => {
      const $logsContainer = document.querySelector('.logs')
      $logsContainer
        .insertAdjacentHTML('afterbegin', generateLog.call(player, rival, damage, attackName, stepCount))

      $logsContainer.scrollTop = 0
      $logsContainer.querySelector('.log').classList.add('log-last')
    }

    stepCount += 1

    if (player.currentStamina === 0) {
      document.querySelectorAll(`#control-${player.roleName}`).forEach((button) => { button.disabled = true })
    }

    if (player.currentStamina > 0) {
      attack.currentCount -= 1

      attackBtn.querySelector(`#${attack.id}-count`).innerText = attack.currentCount

      if (attack.currentCount === 0) attackBtn.disabled = true

      const damage = attack.action(rival) // sideEffect: this.currentStamina--
      rival.renderHp()
      player.renderStamina()

      renderLog({ damage, attackName: attack.name })

      if (rival.currentHp === 0) {
        document.querySelectorAll('.control button').forEach((button) => { button.disabled = true })

        setTimeout(() => {
          alert(`Бедный ${rival.name} -- проиграл...`)
        }, 300)
      }
    }
  }

  player1.attacks.forEach((attack) => {
    const $attackBtn = document.querySelector(`#btn-${attack.id}-${player1.roleName}`)
    $attackBtn.addEventListener('click', () => handleAttackBtnClick({
      player: player1,
      rival: player2,
      attack,
      attackBtn: $attackBtn,
    }))
  })

  player2.attacks.forEach((attack) => {
    const $attackBtn = document.querySelector(`#btn-${attack.id}-${player2.roleName}`)
    $attackBtn.addEventListener('click', () => handleAttackBtnClick({
      player: player2,
      rival: player1,
      attack,
      attackBtn: $attackBtn,
    }))
  })
}

init()
