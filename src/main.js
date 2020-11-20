const pokemonsData = [
  {
    name: 'Pikachu',
    hp: 200,
    damage: 10,
  },
  {
    name: 'Charmander',
    hp: 180,
    damage: 12,
  },
  {
    name: 'Eevee',
    hp: 100,
    damage: 20,
  },
  {
    name: 'Squirtle',
    hp: 160,
    damage: 14,
  },
  {
    name: 'Bulbasaur',
    hp: 140,
    damage: 16,
  },
]

const rolesList = ['character', 'enemy']

const random = (num, type) => type === 'withZero'
  ? Math.floor(Math.random() * num)
  : Math.ceil(Math.random() * num)


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
        <div><b>#${stepCount}:</b> ${logs[random(logs.length, 'withZero')]}</div>
        <div>Нанеся <b>[${damage}]</b> очков урона</div>
        <div>${rivalHpStatusLog}</div>
      </div>
    `

  return logTemplate
}

const Role = function (role) {
  this.roleName = role
  this.elHp = document.getElementById(`health-${role}`)
  this.elProgressBar = document.getElementById(`progressbar-${role}`)
  this.elBtnKick = document.getElementById(`btn-kick-${role}`)

  this.attack = function (rival) {
    const damage = random(this.damage) * 2
    rival.currentHp -= damage

    if (rival.currentHp <= 0) {
      rival.currentHp = 0
    }

    return damage
  }

  this.renderHp = function () {
    this.elHp.innerText = this.currentHp + ' / ' + this.defaultHp
    const width = (this.currentHp / this.defaultHp) * 100

    width < 50 && document.querySelector(`#progressbar-${this.roleName}`).classList.add('low')
    width < 25 && document.querySelector(`#progressbar-${this.roleName}`).classList.add('critical')

    Object.assign(this.elProgressBar.style, {
      width: width + '%',
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
    document.querySelector(`#health-${role.roleName}`).innerText = `${randomPokemon.currentHp} / ${randomPokemon.defaultHp}`
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

  let stepCount = 0
  let timeOut

  const handleBtnKickClick = function (rival) {
    const damage = this.attack(rival)
    rival.renderHp()

    if (rival.currentHp === 0) {
      setTimeout(() => {
        alert(`Бедный ${rival.name} -- проиграл...`)
      }, 500)
      clearTimeout(timeOut)

      rival.elBtnKick.disabled = true
      this.elBtnKick.disabled = true
      rival.elBtnKick.removeEventListener('click', handleBtnKickClick)
      this.elBtnKick.removeEventListener('click', handleBtnKickClick)

      return
    }

    const $logsContainer = document.querySelector('.logs')
    $logsContainer
      .insertAdjacentHTML('afterbegin', generateLog.call(this, rival, damage, ++stepCount))

    $logsContainer.scrollTop = 0
    $logsContainer.querySelector('.log').classList.add('log-last')

    this.elBtnKick.disabled = true
     timeOut = setTimeout(() => {
      this === character && rival.elBtnKick.click()
      this.elBtnKick.disabled = false
    }, 1000)
  }

  character.elBtnKick.addEventListener('click', handleBtnKickClick.bind(character, enemy))
  enemy.elBtnKick.addEventListener('click', handleBtnKickClick.bind(enemy, character))

}

init()

