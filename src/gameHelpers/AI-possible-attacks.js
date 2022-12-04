const createArrayOfAttacks = () => {
  const attacks = [];

  for (let i = 0; i < 10; i++) {
    let xCoordinate = i;
    for (let j = 0; j < 10; j++) {
      let yCoordinate = j;
      attacks.push([xCoordinate, yCoordinate]);
    }
  }
  return attacks;
};

const possibleAttacks = createArrayOfAttacks();

const getValidAttack = (attacksArray) =>
  attacksArray
    .splice(Math.floor(Math.random() * attacksArray.length), 1)
    .flat();

export default possibleAttacks;
export { getValidAttack };
