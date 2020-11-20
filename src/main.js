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


const generateLog = function (rival, damage) {
  const getCharName = (char, suffix) => `${char.name}${this.name === rival.name ? ` #${suffix}` : ''}`

  const logs = [
    `[${getCharName(rival, 2)}] вспомнил что-то важное, но неожиданно [${getCharName(this, 1)}], не помня себя от испуга, ударил в предплечье врага.`,
    `[${getCharName(rival, 2)}] поперхнулся, и за это [${getCharName(this, 1)}] с испугу приложил прямой удар коленом в лоб врага.`,
    `[${getCharName(rival, 2)}] забылся, но в это время наглый [${getCharName(this, 1)}], приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `[${getCharName(rival, 2)}] поперхнулся, но в это время [${getCharName(this, 1)}] нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `[${getCharName(rival, 2)}] пришел в себя, но неожиданно [${getCharName(this, 1)}] случайно нанес мощнейший удар.`,
    `[${getCharName(rival, 2)}] удивился, а [${getCharName(this, 2)}] пошатнувшись влепил подлый удар.`,
    `[${getCharName(rival, 2)}] высморкался, но неожиданно [${getCharName(this, 1)}] провел дробящий удар.`,
    `[${getCharName(rival, 2)}] пошатнулся, и внезапно наглый [${getCharName(this, 1)}] беспричинно ударил в ногу противника`,
    `[${getCharName(rival, 2)}] расстроился, как вдруг, неожиданно [${getCharName(this, 1)}] случайно влепил стопой в живот соперника.`,
    `[${getCharName(rival, 2)}] пытался что-то сказать, но вдруг, неожиданно [${getCharName(this, 1)}] со скуки, разбил бровь сопернику.`,
  ]

  const rivalDamageLog = ` Нанеся [${damage}] очков урона`
  const rivalHpStatusLog = `Теперь у [${getCharName(rival, 2)}] : [${rival.currentHp} / ${rival.defaultHp}] очков здоровья`

  console.log('#### ', logs[random(logs.length, 'withZero')] + rivalDamageLog)
  console.log('#### ', rivalHpStatusLog)

  // return logs[random(logs.length, 'withZero')]
}

const Role = function (role) {
  this.roleName = role
  this.elHp = document.getElementById(`health-${role}`)
  this.elProgressBar = document.getElementById(`progressbar-${role}`)
  this.elBtnKick = document.getElementById(`btn-kick-${role}`)

  this.attack = function (rival) {
    const damage = random(this.damage)
    rival.currentHp -= damage

    if (rival.currentHp <= 0) {
      rival.currentHp = 0
      alert(`Бедный ${rival.name} -- проиграл...`)
      rival.elBtnKick.disabled = true
    }

    return damage
  }

  this.renderHp = function () {
    this.elHp.innerText = this.currentHp + ' / ' + this.defaultHp
    Object.assign(this.elProgressBar.style, {
      width: this.currentHp + '%',
    })
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

  const handleBtnKickClick = function (rival) {
    const damage = this.attack(rival)
    rival.renderHp()
    generateLog.call(this, rival, damage)
  }

  character.elBtnKick.addEventListener('click', handleBtnKickClick.bind(character, enemy))
  enemy.elBtnKick.addEventListener('click', handleBtnKickClick.bind(enemy, character))

}

init()

