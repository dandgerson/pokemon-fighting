import fabric from 'utils/fabric'
import random from 'utils/random'

import Player from '../Player'

const initPlayers = (pokemonsData, rolesList) => {
  const playerssData = rolesList.map((role) => {
    const randomPokemon = pokemonsData[random(0, pokemonsData.length)]

    return {
      ...randomPokemon,
      roleName: role,
    }
  })

  const players = fabric(playerssData, Player)

  players.forEach((player) => {
    document.querySelector(`#name-${player.roleName}`).innerText = `${player.name}`
    document.querySelector(`#health-${player.roleName}`).innerText = `${player.currentHp} / ${player.defaultHp}`
    document.querySelector(`#stamina-${player.roleName}`).innerText = `${player.currentStamina} / ${player.defaultStamina}`
    document.querySelector(`.pokemon.${player.roleName} img`).src = `http://sify4321.000webhostapp.com/${player.name.toLowerCase()}.png`
  })

  return players
}

export default initPlayers
