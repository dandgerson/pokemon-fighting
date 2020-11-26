// eslint-disable-next-line import/prefer-default-export
export const fabric = (data, constructor) => data.map(item => new constructor(item))
