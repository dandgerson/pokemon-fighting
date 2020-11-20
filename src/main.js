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
  {
    name: 'Eevee',
    hp: 100,
    damage: 20,
  },
  {
    name: 'Squirtle',
    hp: 100,
    damage: 20,
  },
  {
    name: 'Bulbasaur',
    hp: 100,
    damage: 20,
  },
]

const rolesList = ['character', 'enemy']

const random = (num, type) => type === 'withZero'
  ? Math.floor(Math.random() * num)
  : Math.ceil(Math.random() * num)


const Role = function (role) {
  this.roleName = role
  this.elHp = document.getElementById(`health-${role}`)
  this.elProgressBar = document.getElementById(`progressbar-${role}`)
  this.elBtnKick = document.getElementById(`btn-kick-${role}`)

  this.attack = function (assignedRole) {
    const damage = random(this.damage)

    if (damage > assignedRole.currentHp) {
      assignedRole.currentHp = 0
      alert(`Бедный ${assignedRole.name} -- проиграл...`)
      assignedRole.elBtnKick.disabled = true
    } else {
      assignedRole.currentHp -= damage
    }
  }

  this.renderHp = function () {
    const renderHpLife = () => {
      this.elHp.innerText = this.currentHp + ' / ' + this.defaultHp
    }
    const renderProgresBar = () => {
      Object.assign(this.elProgressBar.style, {
        width: this.currentHp + '%',
      })
    }

    renderHpLife()
    renderProgresBar()
  }
}

const Pokemon = function ({ name, hp, damage }) {
  this.name = name
  this.defaultHp = hp
  this.currentHp = hp
  this.damage = damage
}

const build = (data, constructor) => data.map(item => new constructor(item))

const assignRoles = (pokemons, roles) => {
  return roles.map(role => {
    const randomPokemon = pokemons[random(pokemons.length, 'withZero')]

    document.querySelector(`#name-${role.roleName}`).innerText = `${randomPokemon.name}`
    document.querySelector(`.pokemon.${role.roleName} img`).src = `http://sify4321.000webhostapp.com/${randomPokemon.name.toLowerCase()}.png`

    return {
      ...randomPokemon,
      ...role,
    }
  })
}

// Init Game

const init = () => {
  console.log('Start Game!')

  const pokemons = build(pokemonsData, Pokemon)
  const roles = build(rolesList, Role)
  const [character, enemy] = assignRoles(pokemons, roles)

  const handleBtnKickClick = function (role) {
    this.attack(role)
    role.renderHp()
  }

  character.elBtnKick.addEventListener('click', handleBtnKickClick.bind(character, enemy))
  enemy.elBtnKick.addEventListener('click', handleBtnKickClick.bind(enemy, character))

}

init()

