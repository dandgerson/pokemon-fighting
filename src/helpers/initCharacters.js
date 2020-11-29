import fabric from 'utils/fabric'
import random from 'utils/random'

import Character from '../Character'

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

export default initCharacters
