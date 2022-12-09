const Ship = (length, name) => {
  const getLength = () => length;
  const getName = () => name;
  let hitsTaken = 0;
  const hit = () => {
    hitsTaken += 1;
  };
  const getHitsTaken = () => hitsTaken;

  const isSunk = () => hitsTaken >= length;

  return { getLength, getName, hit, getHitsTaken, isSunk };
};

export default Ship;
