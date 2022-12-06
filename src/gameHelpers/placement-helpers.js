
  const illegalVariants = [
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
    [-1, +1],
    [1, 1],
  ];

const shipArray = [
  {
    name: "destroyer",
    length: 2,
  },
  {
    name: "submarine",
    length: 3,
  },
  {
    name: "cruiser",
    length: 3,
  },
  {
    name: "battleship",
    length: 4,
  },
  {
    name: "carrier",
    length: 5,
  },
];

export {illegalVariants, shipArray}