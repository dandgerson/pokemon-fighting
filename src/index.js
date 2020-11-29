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

  const handleAttackBtnClick = function ({ player, attack, rival }) {
    const renderLog = ({ damage }) => {
      const $logsContainer = document.querySelector('.logs')
      $logsContainer
        .insertAdjacentHTML('afterbegin', generateLog.call(player, rival, damage, stepCount))

      $logsContainer.scrollTop = 0
      $logsContainer.querySelector('.log').classList.add('log-last')
    }

    stepCount += 1

    if (player.currentStamina === 0) {
      document.querySelectorAll(`#control-${player.roleName}`).forEach((button) => { button.disabled = true })
    }

    if (player.currentStamina > 0) {
      attack.currentCount -= 1
      const damage = attack.action(rival) // sideEffect: this.currentStamina--
      rival.renderHp()
      player.renderStamina()

      renderLog({ damage })

      if (rival.currentHp === 0) {
        document.querySelectorAll('.control button').forEach((button) => { button.disabled = true })

        setTimeout(() => {
          alert(`Бедный ${rival.name} -- проиграл...`)
        }, 300)
      }
    }
  }

  player1.attacks.forEach((attack) => {
    const $attackBtn = document.querySelector(`#btn-${attack.name.replace(' ', '')}-${player1.roleName}`)
    $attackBtn.addEventListener('click', () => handleAttackBtnClick({
      player: player1,
      rival: player2,
      attack,
    }))
  })

  player2.attacks.forEach((attack) => {
    const $attackBtn = document.querySelector(`#btn-${attack.name.replace(' ', '')}-${player2.roleName}`)
    $attackBtn.addEventListener('click', () => handleAttackBtnClick({
      player: player2,
      rival: player1,
      attack,
    }))
  })

  // player1.elBtnKick.addEventListener('click', handleAttackBtnClick.bind(player1, player2))
  // player2.elBtnKick.addEventListener('click', handleAttackBtnClick.bind(player2, player1))
}

init()
