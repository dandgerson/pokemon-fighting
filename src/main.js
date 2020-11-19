const character = {
  name: 'Pikachu',
  defaultHp: 100,
  currentHp: 100,
  damage: 20,
  elHp: document.getElementById('health-character'),
  elProgressBar: document.getElementById('progressbar-character'),
  elBtnKick: document.getElementById('btn-kick-character')
}

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  currentHp: 100,
  damage: 20,
  elHp: document.getElementById('health-enemy'),
  elProgressBar: document.getElementById('progressbar-enemy'),
  elBtnKick: document.getElementById('btn-kick-enemy')
}

const renderHp = (person) => {
  const renderHpLife = (person) => {
    person.elHp.innerText = person.currentHp + ' / ' + person.defaultHp
  }
  const renderProgresBar = (person) => {
    Object.assign(person.elProgressBar.style, {
      width: person.currentHp + '%',
    })
  }

  renderHpLife(person)
  renderProgresBar(person)
}

const changeHp = (damage, person) => {
  if (damage > person.currentHp) {
    person.currentHp = 0

    alert(`Бедный ${person.name} -- проиграл...`)
    person.elBtnKick.disabled = true
  } else {
    person.currentHp -= damage
  }
  renderHp(person)
}

const random = (num) => Math.ceil(Math.random() * num)


// Init Game

const init = () => {
  console.log('Start Game!')

  character.elBtnKick.addEventListener('click', () => changeHp(random(character.damage), enemy))
  enemy.elBtnKick.addEventListener('click', () => changeHp(random(character.damage), character))

}

init()

