// eslint-disable-next-line import/prefer-default-export
const fabric = (data, constructor) => data.map(item => new constructor(item))

export default fabric
