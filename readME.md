Battleship game written with TDD. 

Gameboard is a 2d array of in total 100 positions. 

1.Gameboard places 5 ships of sizes 2,3,3,4,5
a)Create ships with length,  assign correspodning name to it based on the length, store them in an array of objects in the gameboard class/factory

b)When gameboard places ship in the DOM, store in an object coordinates of a ship

c)when user click a square, check object with ships if there was a hit
-if the ship was hit, ship.hit() and check if it is sunk, store a hit coordinate in a Set
-if there was no hit, store hit coordinate in a Set


<!-- const indexOfChild = Array.from(e.target.parentNode.children).indexOf(e.target) -->