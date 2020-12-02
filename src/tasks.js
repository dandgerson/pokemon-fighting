// first task
const firstRow = 'мама мыла раму'
const secondRow = 'собака друг человека'

const getRow = (first, second) => {
  const countChar = (char, row) => {
    let count = 0

    for (let i = 0; i < row.length; i++) {
      row.charAt(i) === char && count++
    }

    return count
  }

  return countChar('а', first) > countChar('а', second) ? first : second
}

// second task
const formatPhone = (numbers) => {
  let result = ''

  const phoneFormatMap = {
    1: ' (',
    4: ') ',
    7: '-',
    9: '-',
  }

  for (let i = 0; i < numbers.length; i++) {
    result += numbers.charAt(i)
    phoneFormatMap[i] && (result += phoneFormatMap[i])
  }

  return result
}
