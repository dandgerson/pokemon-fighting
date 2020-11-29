import random from 'utils/random'

const generateLog = function (rival, damage, attackName, stepCount) {
  const getPokemonName = (pokemon, suffix) => `${pokemon.name}${this.name === rival.name ? ` #${suffix}` : ''}`

  const logs = [
    `<b>[${getPokemonName(rival, 2)}]</b> вспомнил что-то важное, но неожиданно <b>[${getPokemonName(this, 1)}]</b>, не помня себя от испуга, ударил в предплечье врага, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> поперхнулся, и за это <b>[${getPokemonName(this, 1)}]</b> с испугу приложил прямой удар коленом в лоб врага, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> забылся, но в это время наглый <b>[${getPokemonName(this, 1)}]</b>, приняв волевое решение, неслышно подойдя сзади, ударил, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> поперхнулся, но в это время <b>[${getPokemonName(this, 1)}]</b> нехотя раздробил кулаком \<вырезанно цензурой\> противника, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> пришел в себя, но неожиданно <b>[${getPokemonName(this, 1)}]</b> случайно нанес мощнейший удар, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> удивился, а <b>[${getPokemonName(this, 1)}]</b> пошатнувшись влепил подлый удар, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> высморкался, но неожиданно <b>[${getPokemonName(this, 1)}]</b> провел дробящий удар, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> пошатнулся, и внезапно наглый <b>[${getPokemonName(this, 1)}]</b> беспричинно ударил в ногу противника, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> расстроился, как вдруг, неожиданно <b>[${getPokemonName(this, 1)}]</b> случайно влепил стопой в живот соперника, использовав <b>${attackName}</b>.`,
    `<b>[${getPokemonName(rival, 2)}]</b> пытался что-то сказать, но вдруг, неожиданно <b>[${getPokemonName(this, 1)}]</b> со скуки, разбил бровь сопернику, использовав <b>${attackName}</b>.`,
  ]

  const rivalHpStatusLog = `Теперь у <b>[${getPokemonName(rival, 2)}]</b> : <b>[${rival.currentHp} / ${rival.defaultHp}]</b> очков здоровья`

  const logTemplate = `
      <div class="log">
        <div><b>#${stepCount}:</b> ${logs[random(0, logs.length)]}</div>
        <div>Нанеся <b>[${damage}]</b> очков урона</div>
        <div>${rivalHpStatusLog}</div>
      </div>
    `

  return logTemplate
}

export default generateLog
