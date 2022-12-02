Battleship game written with TDD. 

Gameboard is a 2d array of in total 100 positions. 

1.Gameboard places 5 ships of sizes 2,3,3,4,5
a)Create ships with length,  assign correspodning name to it based on the length, store them in an array of objects in the gameboard class/factory

b)When gameboard places ship in the DOM, store in an object coordinates of a ship

c)when user click a square, check object with ships if there was a hit
-if the ship was hit, ship.hit() and check if it is sunk, store a hit coordinate in a Set
-if there was no hit, store hit coordinate in a Set


Game loop:
Create player with a name  using input
Show HTML gameboard with draggable ships
CReate ships based on placement in the DOM inside player's board(Each time player drags a ship player.board.placeShip())

Gameplay:
define playerTurn
playerTurn initial value points to player1
if player1 turn  addeventlistener to enemyboard which passes event values into player1.attack(enemy, coordinate)
-if player1.attack value returns hit:false ti was a miss
-if returns hit:true sunk false it was only a hit
-if returns hit:true sunk:true ship was sunk, alert name of sunk ship/mark a sunk ship within DOM
add either hit/missed class to the DOM square

<!-- const indexOfChild = Array.from(e.target.parentNode.children).indexOf(e.target) -->