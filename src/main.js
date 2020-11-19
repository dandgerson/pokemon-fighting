const pokemonsData = [
  {
    name: 'Pikachu',
    hp: 100,
    damage: 20,
  },
  {
    name: 'Charmander',
    hp: 100,
    damage: 20,
  },
]

const roles = {
  character: {
    elHp: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
    elBtnKick: document.getElementById('btn-kick-character')
  },
  enemy: {
    elHp: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
    elBtnKick: document.getElementById('btn-kick-enemy')
  },
}

const Pokemon = function ({ name, hp, damage }) {
  this.name = name
  this.defaultHp = hp
  this.currentHp = hp
  this.damage = damage
}

const random = (num, type) => type === 'fromZero'
  ? Math.floor(Math.random() * num)
  : Math.ceil(Math.random() * num)

const createPokemons = (pokemonsData, pokemonConstructor) => pokemonsData.map(pokemonData => new pokemonConstructor(pokemonData))

const assignRoles = (pokemons, roles) => {

  return Object.entries(roles).map(([role, roleProps]) => {
    const randomPokemon = pokemons[random(pokemons.length, 'fromZero')]

    document.querySelector(`#name-${role}`).innerText = `${randomPokemon.name}`
    document.querySelector(`.pokemon.${role} img`).src = `http://sify4321.000webhostapp.com/${randomPokemon.name.toLowerCase()}.png`

    return {
      ...randomPokemon,
      role,
      ...roleProps,
    }
  })
}


const renderHp = (pokemon) => {
  const renderHpLife = (pokemon) => {
    pokemon.elHp.innerText = pokemon.currentHp + ' / ' + pokemon.defaultHp
  }
  const renderProgresBar = (pokemon) => {
    Object.assign(pokemon.elProgressBar.style, {
      width: pokemon.currentHp + '%',
    })
  }

  renderHpLife(pokemon)
  renderProgresBar(pokemon)
}

const changeHp = (damage, pokemon) => {
  if (damage > pokemon.currentHp) {
    pokemon.currentHp = 0

    alert(`Бедный ${pokemon.name} -- проиграл...`)
    pokemon.elBtnKick.disabled = true
  } else {
    pokemon.currentHp -= damage
  }
  renderHp(pokemon)
}



// Init Game

const init = () => {
  console.log('Start Game!')

  const pokemons = createPokemons(pokemonsData, Pokemon)
  const [character, enemy] = assignRoles(pokemons, roles)

  character.elBtnKick.addEventListener('click', () => changeHp(random(character.damage), enemy))
  enemy.elBtnKick.addEventListener('click', () => changeHp(random(enemy.damage), character))

}

init()

