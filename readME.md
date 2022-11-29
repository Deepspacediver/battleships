Battleship game written with TDD. 

Gameboard is an array of 100 length (10 by 10)

1.Gameboard places 5 ships of sizes 2,3,3,4,5
a)Create ships with length,  assign correspodning name it base on the length store them in the gameboard class/factory

b)When gameboard places ship in the DOM add to ships name to the corresponding indexes of parentNode.children to the gameboard array

c)when user click a square, check index of NodeList with gameBoard array and check if ship is in there, 
-if the ship is in the array, ship.hit() and check if it is sunk
if the ship is sunk 


<!-- const indexOfChild = Array.from(e.target.parentNode.children).indexOf(e.target) -->