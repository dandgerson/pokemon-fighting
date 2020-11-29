import fabric from 'utils/fabric'
import random from 'utils/random'

import Player from '../Player'

const initPlayers = (pokemonsData, rolesList) => {
  const playersData = rolesList.map((role) => {
    const randomPokemon = pokemonsData[random(0, pokemonsData.length)]

    return {
      ...randomPokemon,
      roleName: role,
    }
  })

  const players = fabric(playersData, Player)

  players.forEach((player) => {
    document.querySelector(`#name-${player.roleName}`).innerText = `${player.name}`
    document.querySelector(`#health-${player.roleName}`).innerText = `${player.currentHp} / ${player.defaultHp}`
    document.querySelector(`#stamina-${player.roleName}`).innerText = `${player.currentStamina} / ${player.defaultStamina}`
    document.querySelector(`.pokemon.${player.roleName} img`).src = player.img

    player.initStamina()
    player.initAttacks()

    const $control = document.querySelector(`#control-${player.roleName}`)

    player.attacks.forEach((attack) => {
      $control.insertAdjacentHTML('afterbegin', `
        <button class="button" id="btn-${attack.name.replace(' ', '')}-${player.roleName}">
          ${attack.name} (${attack.currentCount})
        </button>
      `)
    })
    console.log($control)
  })


  return players
}

export default initPlayers
