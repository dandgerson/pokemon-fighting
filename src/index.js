import './style.css'
import './assets/Pokemon_logo.png'

import { pokemonsData, rolesList } from './constants'
import { random } from './utils'
import { fabric } from './helpers'
import Character from './Character'

const generateLog = function (rival, damage, stepCount) {
  const getCharName = (char, suffix) => `${char.name}${this.name === rival.name ? ` #${suffix}` : ''}`

  const logs = [
    `<b>[${getCharName(rival, 2)}]</b> вспомнил что-то важное, но неожиданно <b>[${getCharName(this, 1)}]</b>, не помня себя от испуга, ударил в предплечье врага.`,
    `<b>[${getCharName(rival, 2)}]</b> поперхнулся, и за это <b>[${getCharName(this, 1)}]</b> с испугу приложил прямой удар коленом в лоб врага.`,
    `<b>[${getCharName(rival, 2)}]</b> забылся, но в это время наглый <b>[${getCharName(this, 1)}]</b>, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `<b>[${getCharName(rival, 2)}]</b> поперхнулся, но в это время <b>[${getCharName(this, 1)}]</b> нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `<b>[${getCharName(rival, 2)}]</b> пришел в себя, но неожиданно <b>[${getCharName(this, 1)}]</b> случайно нанес мощнейший удар.`,
    `<b>[${getCharName(rival, 2)}]</b> удивился, а <b>[${getCharName(this, 1)}]</b> пошатнувшись влепил подлый удар.`,
    `<b>[${getCharName(rival, 2)}]</b> высморкался, но неожиданно <b>[${getCharName(this, 1)}]</b> провел дробящий удар.`,
    `<b>[${getCharName(rival, 2)}]</b> пошатнулся, и внезапно наглый <b>[${getCharName(this, 1)}]</b> беспричинно ударил в ногу противника`,
    `<b>[${getCharName(rival, 2)}]</b> расстроился, как вдруг, неожиданно <b>[${getCharName(this, 1)}]</b> случайно влепил стопой в живот соперника.`,
    `<b>[${getCharName(rival, 2)}]</b> пытался что-то сказать, но вдруг, неожиданно <b>[${getCharName(this, 1)}]</b> со скуки, разбил бровь сопернику.`,
  ]

  const rivalHpStatusLog = `Теперь у <b>[${getCharName(rival, 2)}]</b> : <b>[${rival.currentHp} / ${rival.defaultHp}]</b> очков здоровья`

  const logTemplate = `
      <div class="log">
        <div><b>#${stepCount}:</b> ${logs[random(0, logs.length)]}</div>
        <div>Нанеся <b>[${damage}]</b> очков урона</div>
        <div>${rivalHpStatusLog}</div>
      </div>
    `

  return logTemplate
}

const initCharacters = (pokemonsData, rolesList) => {
  const charactersData = rolesList.map((role) => {
    const randomPokemon = pokemonsData[random(0, pokemonsData.length)]

    return {
      ...randomPokemon,
      roleName: role,
    }
  })

  const characters = fabric(charactersData, Character)

  characters.forEach((character) => {
    document.querySelector(`#name-${character.roleName}`).innerText = `${character.name}`
    document.querySelector(`#health-${character.roleName}`).innerText = `${character.currentHp} / ${character.defaultHp}`
    document.querySelector(`#stamina-${character.roleName}`).innerText = `${character.currentStamina} / ${character.defaultStamina}`
    document.querySelector(`.pokemon.${character.roleName} img`).src = `http://sify4321.000webhostapp.com/${character.name.toLowerCase()}.png`
  })

  return characters
}

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
