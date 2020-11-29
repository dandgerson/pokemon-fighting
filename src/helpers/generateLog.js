import random from 'utils/random'

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

export default generateLog
