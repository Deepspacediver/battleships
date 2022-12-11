/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM/DOMEvents.js":
/*!******************************!*\
  !*** ./src/DOM/DOMEvents.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gameHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/gameHandler */ "./src/modules/gameHandler.js");

var AIBoard = document.getElementById("ai-board");
var playerBoard = document.getElementById("player-board");
var boardForPlacement = document.getElementById("place-ship-board");
var shipsContainer = document.getElementById("ships-container");
var startBtn = document.querySelector("#start");
var boardResetBtn = document.querySelector("#board-reset");
var gameResetBtn = document.querySelector("#game-reset");
var alignmentBtn = document.querySelector("#alignment-btn");
var myGameHandler = (0,_modules_gameHandler__WEBPACK_IMPORTED_MODULE_0__["default"])("test");
var renderPlayerShips = function renderPlayerShips() {
  var playerShips = myGameHandler.players.realPlayer.board.shipList;
  playerShips.forEach(function (shipObj) {
    shipObj.coordinates.forEach(function (coord) {
      var coordOnPlayerBoard = playerBoard.querySelector("[data-x=\"".concat(coord[0], "\"][data-y=\"").concat(coord[1], "\"]"));
      coordOnPlayerBoard.classList.add("anchored");
    });
  });
};
alignmentBtn.addEventListener("click", function () {
  var alignmentState = shipsContainer.firstElementChild.dataset.alignment;
  if (alignmentState === "horizontal") alignmentState = "vertical";else alignmentState = "horizontal";
  var everyShip = Array.from(shipsContainer.children);
  everyShip.forEach(function (ship) {
    return ship.dataset.alignment = alignmentState;
  });
});
var attackingPhase = function attackingPhase() {
  AIBoard.classList.add("active");
  renderPlayerShips();
  myGameHandler.players.AI.board.randomlyPlaceShips();
  AIBoard.addEventListener("mousedown", function (e) {
    if (myGameHandler.isGameOver() || myGameHandler.getTurn() === "ai" || !e.target.classList.contains("square")) return;
    console.log(e.target);
    myGameHandler.startAttack(e);
    myGameHandler.canEndGame();
    console.log(myGameHandler.players.realPlayer.board.shipList);
  });
};
startBtn.addEventListener(
// If clicked before playable, prevents from furthr playing
"click", function () {
  if (myGameHandler.canStartGame()) {
    attackingPhase();
  }
});
shipsContainer.addEventListener("dragstart", function (e) {
  console.log(e);
  if (e.target.classList.contains("ship")) {
    e.dataTransfer.setData("ship-length", e.target.dataset.length);
    e.dataTransfer.setData("ship-name", e.target.id);
    e.dataTransfer.setData("ship-alignment", e.target.dataset.alignment);
  }
});
boardForPlacement.addEventListener("dragover", function (e) {
  if (e.target.id === "place-ship-board" || e.target.classList.contains("anchored")) return;
  e.target.classList.add("dragover");
  e.preventDefault();
});
boardForPlacement.addEventListener("dragleave", function (e) {
  if (e.target.id === "place-ship-board") return;
  e.target.classList.remove("dragover");
  e.preventDefault();
});
var addAnchoredClass = function addAnchoredClass(shipPlacement) {
  shipPlacement.forEach(function (placement) {
    var placementInDOM = boardForPlacement.querySelector("[data-x=\"".concat(placement[0], "\"][data-y=\"").concat(placement[1], "\"]"));
    placementInDOM.classList.add("anchored");
  });
};
boardForPlacement.addEventListener("drop", function (e) {
  e.target.classList.remove("dragover");
  var objectData = {
    length: Number(e.dataTransfer.getData("ship-length")),
    name: e.dataTransfer.getData("ship-name"),
    alignment: e.dataTransfer.getData("ship-alignment")
  };
  console.log(objectData);
  var chosenCoordinate = [Number(e.target.dataset.x), Number(e.target.dataset.y)];
  var shipLocation = myGameHandler.anchorAShip(chosenCoordinate, objectData);
  if (shipLocation) {
    addAnchoredClass(shipLocation);
    document.querySelector("#".concat(objectData.name)).classList.add("removed");
    console.log(myGameHandler.players.realPlayer.board.unavailableCoords);
  }
});
var classRemoval = function classRemoval(className) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var elementsToClear = Array.from(container.querySelectorAll(".".concat(className)));
  elementsToClear.forEach(function (element) {
    return element.classList.remove(className);
  });
};

/* <!!!!!!!!!! Game Reset !!!!!!!!!!!> */
var resetBoard = function resetBoard() {
  myGameHandler = (0,_modules_gameHandler__WEBPACK_IMPORTED_MODULE_0__["default"])("test");
  classRemoval("anchored");
  classRemoval("removed", shipsContainer);
};
boardResetBtn.addEventListener("click", function () {
  resetBoard();
});
gameResetBtn.addEventListener("click", function () {
  resetBoard();
  classRemoval("hit");
  classRemoval("missed");
});

/***/ }),

/***/ "./src/DOM/createBoardDOM.js":
/*!***********************************!*\
  !*** ./src/DOM/createBoardDOM.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gameHelpers/AI-possible-attacks */ "./src/gameHelpers/AI-possible-attacks.js");

var playerBoard = document.getElementById("player-board");
var AIBoard = document.getElementById("ai-board");
var boardForPlacement = document.getElementById("place-ship-board");
var createBoards = function createBoards(coordinates) {
  coordinates.forEach(function (coordinate) {
    var square = document.createElement("div");
    square.classList.add("square");
    square.dataset.x = coordinate[0];
    square.dataset.y = coordinate[1];
    playerBoard.appendChild(square);
    var squareClone1 = square.cloneNode();
    AIBoard.appendChild(squareClone1);
    var squareClone2 = square.cloneNode();
    boardForPlacement.appendChild(squareClone2);
  });
};
createBoards(_gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_0__["default"]);

/*
 */

/***/ }),

/***/ "./src/DOM/dragDropShips.js":
/*!**********************************!*\
  !*** ./src/DOM/dragDropShips.js ***!
  \**********************************/
/***/ (() => {

var ships = document.querySelectorAll(".ship");
var generateShipBlocks = function generateShipBlocks() {
  Array.from(ships).forEach(function (ship) {
    var shipLength = Number(ship.dataset.length);
    ship.setAttribute("draggable", "true");
    ship.dataset.alignment = "horizontal";
    for (var i = 0; i < shipLength; i += 1) {
      var shipBlock = document.createElement("div");
      shipBlock.classList.add("block");
      ship.appendChild(shipBlock);
    }
  });
};
generateShipBlocks();

/***/ }),

/***/ "./src/gameHelpers/AI-possible-attacks.js":
/*!************************************************!*\
  !*** ./src/gameHelpers/AI-possible-attacks.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getValidAttack": () => (/* binding */ getValidAttack)
/* harmony export */ });
var createArrayOfAttacks = function createArrayOfAttacks() {
  var attacks = [];
  for (var i = 0; i < 10; i++) {
    var xCoordinate = i;
    for (var j = 0; j < 10; j++) {
      var yCoordinate = j;
      attacks.push([xCoordinate, yCoordinate]);
    }
  }
  return attacks;
};
var possibleAttacks = createArrayOfAttacks();
var getValidAttack = function getValidAttack(attacksArray) {
  return attacksArray.splice(Math.floor(Math.random() * attacksArray.length), 1).flat();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (possibleAttacks);


/***/ }),

/***/ "./src/gameHelpers/placement-helpers.js":
/*!**********************************************!*\
  !*** ./src/gameHelpers/placement-helpers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "illegalVariants": () => (/* binding */ illegalVariants),
/* harmony export */   "shipArray": () => (/* binding */ shipArray)
/* harmony export */ });
var illegalVariants = [[0, -1], [-1, -1], [1, -1], [-1, 0], [1, 0], [0, 1], [-1, +1], [1, 1]];
var shipArray = [{
  name: "destroyer",
  length: 2
}, {
  name: "submarine",
  length: 3
}, {
  name: "cruiser",
  length: 3
}, {
  name: "battleship",
  length: 4
}, {
  name: "carrier",
  length: 5
}];


/***/ }),

/***/ "./src/modules/battleship-factory.js":
/*!*******************************************!*\
  !*** ./src/modules/battleship-factory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length, name) {
  var getLength = function getLength() {
    return length;
  };
  var getName = function getName() {
    return name;
  };
  var hitsTaken = 0;
  var hit = function hit() {
    hitsTaken += 1;
  };
  var getHitsTaken = function getHitsTaken() {
    return hitsTaken;
  };
  var isSunk = function isSunk() {
    return hitsTaken >= length;
  };
  return {
    getLength: getLength,
    getName: getName,
    hit: hit,
    getHitsTaken: getHitsTaken,
    isSunk: isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/modules/gameHandler.js":
/*!************************************!*\
  !*** ./src/modules/gameHandler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player-factory */ "./src/modules/player-factory.js");
/* harmony import */ var _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameHelpers/AI-possible-attacks */ "./src/gameHelpers/AI-possible-attacks.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var playerBoardDOM = document.getElementById("player-board");
var AIBoardDOM = document.getElementById("ai-board");
var turnDisplay = document.getElementById("turn-display");
var gameHandler = function gameHandler(playerName) {
  var playerTurn = "realPlayer";
  var players = {
    realPlayer: (0,_player_factory__WEBPACK_IMPORTED_MODULE_0__["default"])(playerName),
    AI: (0,_player_factory__WEBPACK_IMPORTED_MODULE_0__["default"])("AI")
  };

  // Ship placement
  /* let illegalShipPlacements = new Set(); */

  // Check if y axis is out of bound

  var isOutOfBounds = function isOutOfBounds(coordinate, shipLength) {
    var alignment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "horizontal";
    return alignment === "horizontal" ? coordinate[1] + shipLength > 10 : coordinate[0] + shipLength > 10;
  };
  var generatePlacement = function generatePlacement(coordinate, shipLength) {
    var alignment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "horizontal";
    var shipPlacement = [];
    for (var i = 0; i < shipLength; i++) {
      if (alignment === "horizontal") shipPlacement.push([coordinate[0], coordinate[1] + i]);else shipPlacement.push([coordinate[0] + i, coordinate[1]]);
    }
    return shipPlacement;
  };
  /* 
  const isInAnArray = (array, element) =>
    array.some((el) => isEqual(el, element)); */

  var isShipPlaced = function isShipPlaced(name, shipList) {
    // eslint-disable-next-line no-restricted-syntax
    var _iterator = _createForOfIteratorHelper(shipList),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var shipObject = _step.value;
        if (shipObject.ship.getName() === name) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  };
  var anchorAShip = function anchorAShip(chosenCoordinate, shipData) {
    if (isOutOfBounds(chosenCoordinate, shipData.length, shipData.alignment)) return;
    var shipPlacement = generatePlacement(chosenCoordinate, shipData.length, shipData.alignment);
    var playerBoard = players.realPlayer.board;
    if (isShipPlaced(shipData.name, playerBoard.shipList) || playerBoard.isInIllegalCoords(shipPlacement)) return;
    playerBoard.placeShip(shipData.length, shipData.name, shipPlacement);
    console.log(playerBoard.shipList);
    return shipPlacement;
  };
  var canStartGame = function canStartGame() {
    return players.realPlayer.board.shipList.length === 5;
  }; /*  &&
     players.AI.board.shipList.length === 5; */

  // Game loop
  var AIPossibleAttacks = _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_1__["default"];
  var getTurn = function getTurn() {
    return playerTurn;
  };
  var changeTurn = function changeTurn() {
    if (playerTurn === "realPlayer") playerTurn = "ai";else playerTurn = "realPlayer";
    return playerTurn;
  };
  var convertToCoordinate = function convertToCoordinate(target) {
    return [Number(target.dataset.x), Number(target.dataset.y)];
  };
  var displayWhoseTurn = function displayWhoseTurn(turn) {
    var whoseTurn = turn;
    if (whoseTurn === "realPlayer") {
      turnDisplay.textContent = "computer's turn";
    } else turnDisplay.textContent = "player's turn";
  };
  var markSquare = function markSquare(coordinate, _ref, turn) {
    var hit = _ref.hit;
    var target;
    if (turn === "realPlayer") {
      target = AIBoardDOM.querySelector(".square[data-x=\"".concat(coordinate[0], "\"][data-y=\"").concat(coordinate[1], "\"]"));
    } else if (turn === "ai") {
      target = playerBoardDOM.querySelector(".square[data-x=\"".concat(coordinate[0], "\"][data-y=\"").concat(coordinate[1], "\"]"));
    }
    if (hit === true) target.classList.add("hit");else target.classList.add("missed");
  };
  var playerMove = function playerMove(event) {
    AIBoardDOM.classList.remove("active");
    var playerTarget = convertToCoordinate(event.target);
    var playerAttack = players.realPlayer.attack(players.AI, playerTarget);
    displayWhoseTurn(getTurn());
    markSquare(playerTarget, playerAttack, getTurn());
    changeTurn();
  };
  var AIMove = function AIMove() {
    if (players.AI.board.areAllSunk()) return;
    var AITarget = (0,_gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_1__.getValidAttack)(AIPossibleAttacks);
    var AIAttack = players.AI.attack(players.realPlayer, AITarget);
    setTimeout(function () {
      markSquare(AITarget, AIAttack, getTurn());
    }, 500);
    setTimeout(function () {
      displayWhoseTurn(getTurn());
    }, 700);
    setTimeout(function () {
      changeTurn();
      AIBoardDOM.classList.add("active");
    }, 800);
  };
  var startAttack = function startAttack(e) {
    if (e.target.classList.contains("missed") || e.target.classList.contains("hit") || getTurn() === "ai" || players.AI.board.areAllSunk() || players.realPlayer.board.areAllSunk()) return;
    playerMove(e);
    AIMove();
  };
  var isGameOver = function isGameOver() {
    return players.AI.board.areAllSunk() || players.realPlayer.board.areAllSunk();
  };
  var canEndGame = function canEndGame() {
    // Implement modal to pop up instead of alter
    if (isGameOver()) {
      if (players.AI.board.areAllSunk()) alert("You have won");else alert("AI has won won");
    }
  };
  return {
    startAttack: startAttack,
    players: players,
    anchorAShip: anchorAShip,
    canStartGame: canStartGame,
    isOutOfBounds: isOutOfBounds,
    canEndGame: canEndGame,
    isGameOver: isGameOver,
    getTurn: getTurn
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameHandler);

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.isequal */ "./node_modules/lodash.isequal/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameHelpers/AI-possible-attacks */ "./src/gameHelpers/AI-possible-attacks.js");
/* harmony import */ var _battleship_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./battleship-factory */ "./src/modules/battleship-factory.js");
/* harmony import */ var _gameHelpers_placement_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gameHelpers/placement-helpers */ "./src/gameHelpers/placement-helpers.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/* eslint-disable no-restricted-syntax */




var Gameboard = function Gameboard() {
  var board = _toConsumableArray(_gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_1__["default"]);
  var shipList = [];
  var missedShots = new Set();
  var unavailableCoords = new Set();
  var isInAnArray = function isInAnArray(array, element) {
    return array.some(function (el) {
      return lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default()(el, element);
    });
  };
  var generateIllegalMoves = function generateIllegalMoves(coordinates) {
    var illegalPossibilites = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _gameHelpers_placement_helpers__WEBPACK_IMPORTED_MODULE_3__.illegalVariants;
    var illegalSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : unavailableCoords;
    coordinates.forEach(function (coord) {
      for (var i = 0; i < illegalPossibilites.length; i++) {
        var illegalVariant = illegalPossibilites[i];
        var illegalMove = [coord[0] + illegalVariant[0], coord[1] + illegalVariant[1]];
        if (illegalMove[0] >= 0 && illegalMove[0] <= 9 && illegalMove[1] >= 0 && illegalMove[1] <= 9 && isInAnArray(coordinates, illegalMove) === false) illegalSet.add(String(illegalMove));
      }
      illegalSet.add(String(coord));
    });
  };
  var isInIllegalCoords = function isInIllegalCoords(shipPlacement) {
    var illegalMoves = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : unavailableCoords;
    // eslint-disable-next-line no-restricted-syntax
    var _iterator = _createForOfIteratorHelper(shipPlacement),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var placement = _step.value;
        if (illegalMoves.has(String(placement))) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  };
  var placeShip = function placeShip(length, name, coordinates) {
    var shipObject = {
      ship: (0,_battleship_factory__WEBPACK_IMPORTED_MODULE_2__["default"])(length, name),
      coordinates: coordinates
    };
    shipList.push(shipObject);
    generateIllegalMoves(coordinates, _gameHelpers_placement_helpers__WEBPACK_IMPORTED_MODULE_3__.illegalVariants, unavailableCoords);
  };
  var receiveAttack = function receiveAttack(coordinate) {
    var indexOfShip = checkHit(coordinate);
    if (indexOfShip !== undefined) {
      var shipInList = shipList[indexOfShip];
      shipInList.ship.hit();
      if (shipInList.ship.isSunk()) return {
        hit: true,
        sunk: true,
        name: shipInList.ship.getName()
      };
      return {
        hit: true,
        sunk: false,
        name: null
      };
    }
    missedShots.add(String(coordinate));
    return {
      hit: false,
      sunk: false,
      name: null
    };
  };
  var checkHit = function checkHit(coordinate) {
    var index = 0;
    var _iterator2 = _createForOfIteratorHelper(shipList),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var object = _step2.value;
        if (object.coordinates.some(function (x) {
          return lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default()(coordinate, x);
        })) return index;
        index += 1;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };
  var areAllSunk = function areAllSunk() {
    return shipList.every(function (el) {
      return el.ship.isSunk();
    });
  };

  // AI random ship placement
  var getRandomIndex = function getRandomIndex(indexArray) {
    return indexArray.splice(Math.floor(Math.random() * indexArray.length), 1);
  };
  var getRandomAlignment = function getRandomAlignment() {
    var alignments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["horizontal", "vertical"];
    return alignments[Math.floor(Math.random() * 2)];
  };
  var getInitialBoardSquare = function getInitialBoardSquare(shipLength, alignment) {
    var initialBoardSquare;
    while (initialBoardSquare === undefined || unavailableCoords.has(String(initialBoardSquare))) {
      if (alignment === "horizontal") {
        var horizontalCoord = board[Math.floor(Math.random() * (board.length - shipLength))];

        // Prevent from going out of bounds on y axis
        if (horizontalCoord[1] + shipLength <= 10) initialBoardSquare = horizontalCoord;
      } else {
        var _horizontalCoord = board[Math.floor(Math.random() * ((shipLength + 1) * 10))];

        // Prevent from going out of bounds on x axis
        if (_horizontalCoord[0] + shipLength <= 10) initialBoardSquare = _horizontalCoord;
      }
    }
    return initialBoardSquare;
  };
  var getRandomPlacement = function getRandomPlacement(shipLength) {
    var placement = [];
    while (placement.length <= 1) {
      var alignment = getRandomAlignment();
      var initialCoord = getInitialBoardSquare(shipLength, alignment);
      placement.push(initialCoord);
      for (var i = 1; i < shipLength; i++) {
        // const lastItem = placement[placement.length - 1];
        if (alignment === "horizontal") placement.push([initialCoord[0], initialCoord[1] + i]);else placement.push([initialCoord[0] + i, initialCoord[1]]);
      }
      if (isInIllegalCoords(placement)) placement.splice(0);
    }
    generateIllegalMoves(placement);
    return placement;
  };
  var randomlyPlaceShips = function randomlyPlaceShips() {
    var indexArray = [0, 1, 2, 3, 4];
    while (indexArray.length) {
      var randomIndex = getRandomIndex(indexArray);
      var shipHelper = _gameHelpers_placement_helpers__WEBPACK_IMPORTED_MODULE_3__.shipArray[randomIndex];
      var shipPlacement = getRandomPlacement(shipHelper.length);
      placeShip(shipHelper.length, shipHelper.name, shipPlacement);
    }
  };
  return {
    shipList: shipList,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    missedShots: missedShots,
    areAllSunk: areAllSunk,
    unavailableCoords: unavailableCoords,
    isInIllegalCoords: isInIllegalCoords,
    randomlyPlaceShips: randomlyPlaceShips
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/modules/player-factory.js":
/*!***************************************!*\
  !*** ./src/modules/player-factory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

var Player = function Player(name) {
  var getName = function getName() {
    return name;
  };
  var board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var attack = function attack(enemy, coordinate) {
    return enemy.board.receiveAttack(coordinate);
  };
  return {
    getName: getName,
    board: board,
    attack: attack
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/norwester.woff2 */ "./src/assets/fonts/norwester.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/norwester.woff */ "./src/assets/fonts/norwester.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/armalite_rifle.woff2 */ "./src/assets/fonts/armalite_rifle.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/armalite_rifle.woff */ "./src/assets/fonts/armalite_rifle.woff"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Norwester\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n}\n@font-face {\n  font-family: \"ArmaliteRifle\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff\");\n}\n\n:root {\n  --primary: #0e4b6c;\n  --secondary: #0a0a0a;\n  --tertiary: #155684;\n  --anchored: #48bf91;\n  --hit: #e03333;\n  font-family: \"Norwester\", sans-serif;\n}\n*{\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-image: linear-gradient(\n    to right,\n    #161616 10%,\n    #2e2e2e,\n    #161616 90%\n  );\n  background-repeat: no-repeat;\n}\n* {\n  user-select: none;\n}\nmain {\n  width: 850px;\n  height: 400px;\n  margin: 0 auto;\n  display: block;\n  display: flex;\n}\n#display {\n  width: 400px;\n  height: 100px;\n  margin: 0 auto;\n}\n#player-board,\n#ai-board,\n#place-ship-board {\n  width: 400px;\n  height: 400px;\n  /* border: 1px solid black; */\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  margin: 0.5rem;\n  gap: 0.2rem;\n}\n\n.square {\n  border: 2px solid var(--secondary);\n  background-color: var(--tertiary);\n}\n.active > div:hover {\n  background-color: #48bf91;\n  cursor: pointer;\n}\n.missed {\n  background-color: #8f8f8f;\n  pointer-events: none;\n}\n\n.anchored {\n  background-color: #48bf91;\n}\n\n.hit {\n  background-color: #e03333;\n  pointer-events: none;\n}\n\n.dragover {\n  background-color: #48bf91;\n}\n.removed {\n  opacity: 0.2;\n}\n.outOfBounds {\n  background-color: gray;\n}\n#board-creator {\n  display: grid;\n  width: 80vw;\n  grid-template-columns: 1fr 1fr;\n}\n\n#ships-container {\n  display: grid;\n}\n.ship {\n  display: grid;\n  grid-auto-flow: column;\n  max-height: 40px;\n  max-width: fit-content;\n  background-color: #48bf91;\n}\n.block {\n  border: 1px solid black;\n  width: 40px;\n}\n.hidden {\n  display: none;\n}\n\nbutton {\n  background-color: #282828;\n  box-shadow: -3px 3px var(--anchored), -2px 2px var(--anchored),\n    -1px 1px var(--anchored);\n  color: var(--anchored);\n  font-size: 1rem;\n  font-weight: bold;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,wBAAwB;EACxB;0DACqD;AACvD;AACA;EACE,4BAA4B;EAC5B;0DAC0D;AAC5D;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,mBAAmB;EACnB,cAAc;EACd,oCAAoC;AACtC;AACA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;AACA;EACE;;;;;GAKC;EACD,4BAA4B;AAC9B;AACA;EACE,iBAAiB;AACnB;AACA;EACE,YAAY;EACZ,aAAa;EACb,cAAc;EACd,cAAc;EACd,aAAa;AACf;AACA;EACE,YAAY;EACZ,aAAa;EACb,cAAc;AAChB;AACA;;;EAGE,YAAY;EACZ,aAAa;EACb,6BAA6B;EAC7B,aAAa;EACb,sCAAsC;EACtC,cAAc;EACd,WAAW;AACb;;AAEA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;AACA;EACE,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,yBAAyB;EACzB,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;AAC3B;AACA;EACE,YAAY;AACd;AACA;EACE,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,WAAW;EACX,8BAA8B;AAChC;;AAEA;EACE,aAAa;AACf;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,sBAAsB;EACtB,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,WAAW;AACb;AACA;EACE,aAAa;AACf;;AAEA;EACE,yBAAyB;EACzB;4BAC0B;EAC1B,sBAAsB;EACtB,eAAe;EACf,iBAAiB;AACnB","sourcesContent":["@font-face {\n  font-family: \"Norwester\";\n  src: url(\"~./assets/fonts/norwester.woff2\") format(\"woff2\"),\n    url(\"./assets/fonts/norwester.woff\") format(\"woff\");\n}\n@font-face {\n  font-family: \"ArmaliteRifle\";\n  src: url(\"./assets/fonts/armalite_rifle.woff2\") format(\"woff2\"),\n    url(\"./assets/fonts/armalite_rifle.woff\") format(\"woff\");\n}\n\n:root {\n  --primary: #0e4b6c;\n  --secondary: #0a0a0a;\n  --tertiary: #155684;\n  --anchored: #48bf91;\n  --hit: #e03333;\n  font-family: \"Norwester\", sans-serif;\n}\n*{\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-image: linear-gradient(\n    to right,\n    #161616 10%,\n    #2e2e2e,\n    #161616 90%\n  );\n  background-repeat: no-repeat;\n}\n* {\n  user-select: none;\n}\nmain {\n  width: 850px;\n  height: 400px;\n  margin: 0 auto;\n  display: block;\n  display: flex;\n}\n#display {\n  width: 400px;\n  height: 100px;\n  margin: 0 auto;\n}\n#player-board,\n#ai-board,\n#place-ship-board {\n  width: 400px;\n  height: 400px;\n  /* border: 1px solid black; */\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  margin: 0.5rem;\n  gap: 0.2rem;\n}\n\n.square {\n  border: 2px solid var(--secondary);\n  background-color: var(--tertiary);\n}\n.active > div:hover {\n  background-color: #48bf91;\n  cursor: pointer;\n}\n.missed {\n  background-color: #8f8f8f;\n  pointer-events: none;\n}\n\n.anchored {\n  background-color: #48bf91;\n}\n\n.hit {\n  background-color: #e03333;\n  pointer-events: none;\n}\n\n.dragover {\n  background-color: #48bf91;\n}\n.removed {\n  opacity: 0.2;\n}\n.outOfBounds {\n  background-color: gray;\n}\n#board-creator {\n  display: grid;\n  width: 80vw;\n  grid-template-columns: 1fr 1fr;\n}\n\n#ships-container {\n  display: grid;\n}\n.ship {\n  display: grid;\n  grid-auto-flow: column;\n  max-height: 40px;\n  max-width: fit-content;\n  background-color: #48bf91;\n}\n.block {\n  border: 1px solid black;\n  width: 40px;\n}\n.hidden {\n  display: none;\n}\n\nbutton {\n  background-color: #282828;\n  box-shadow: -3px 3px var(--anchored), -2px 2px var(--anchored),\n    -1px 1px var(--anchored);\n  color: var(--anchored);\n  font-size: 1rem;\n  font-weight: bold;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/lodash.isequal/index.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash.isequal/index.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/armalite_rifle.woff":
/*!**********************************************!*\
  !*** ./src/assets/fonts/armalite_rifle.woff ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "302fc584d9900b0685e9.woff";

/***/ }),

/***/ "./src/assets/fonts/armalite_rifle.woff2":
/*!***********************************************!*\
  !*** ./src/assets/fonts/armalite_rifle.woff2 ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "20bfcf9741b71af68a82.woff2";

/***/ }),

/***/ "./src/assets/fonts/norwester.woff":
/*!*****************************************!*\
  !*** ./src/assets/fonts/norwester.woff ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5a69040702e076ed4452.woff";

/***/ }),

/***/ "./src/assets/fonts/norwester.woff2":
/*!******************************************!*\
  !*** ./src/assets/fonts/norwester.woff2 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5f5e032828e75a6057b7.woff2";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _DOM_createBoardDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/createBoardDOM */ "./src/DOM/createBoardDOM.js");
/* harmony import */ var _DOM_DOMEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM/DOMEvents */ "./src/DOM/DOMEvents.js");
/* harmony import */ var _DOM_dragDropShips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOM/dragDropShips */ "./src/DOM/dragDropShips.js");
/* harmony import */ var _DOM_dragDropShips__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_DOM_dragDropShips__WEBPACK_IMPORTED_MODULE_3__);




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsR0FBRztB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O0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQW9CO0FBQ1M7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL0RPTS9ET01FdmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvRE9NL2NyZWF0ZUJvYXJkRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL0RPTS9kcmFnRHJvcFNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVIZWxwZXJzL0FJLXBvc3NpYmxlLWF0dGFja3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZUhlbHBlcnMvcGxhY2VtZW50LWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbW9kdWxlcy9iYXR0bGVzaGlwLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbW9kdWxlcy9nYW1lSGFuZGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tb2R1bGVzL3BsYXllci1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVIYW5kbGVyIGZyb20gXCIuLi9tb2R1bGVzL2dhbWVIYW5kbGVyXCI7XG5cbmNvbnN0IEFJQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFpLWJvYXJkXCIpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbmNvbnN0IGJvYXJkRm9yUGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwLWJvYXJkXCIpO1xuY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLWNvbnRhaW5lclwiKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbmNvbnN0IGJvYXJkUmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkLXJlc2V0XCIpO1xuY29uc3QgZ2FtZVJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNnYW1lLXJlc2V0XCIpO1xuY29uc3QgYWxpZ25tZW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGlnbm1lbnQtYnRuXCIpO1xuXG5sZXQgbXlHYW1lSGFuZGxlciA9IGdhbWVIYW5kbGVyKFwidGVzdFwiKTtcblxuY29uc3QgcmVuZGVyUGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllclNoaXBzID0gbXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuc2hpcExpc3Q7XG4gIHBsYXllclNoaXBzLmZvckVhY2goKHNoaXBPYmopID0+IHtcbiAgICBzaGlwT2JqLmNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9uUGxheWVyQm9hcmQgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEteD1cIiR7Y29vcmRbMF19XCJdW2RhdGEteT1cIiR7Y29vcmRbMV19XCJdYFxuICAgICAgKTtcbiAgICAgIGNvb3JkT25QbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yZWRcIik7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuYWxpZ25tZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGxldCBhbGlnbm1lbnRTdGF0ZSA9IHNoaXBzQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQuYWxpZ25tZW50O1xuICBpZiAoYWxpZ25tZW50U3RhdGUgPT09IFwiaG9yaXpvbnRhbFwiKSBhbGlnbm1lbnRTdGF0ZSA9IFwidmVydGljYWxcIjtcbiAgZWxzZSBhbGlnbm1lbnRTdGF0ZSA9IFwiaG9yaXpvbnRhbFwiO1xuXG4gIGNvbnN0IGV2ZXJ5U2hpcCA9IEFycmF5LmZyb20oc2hpcHNDb250YWluZXIuY2hpbGRyZW4pO1xuICBldmVyeVNoaXAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuZGF0YXNldC5hbGlnbm1lbnQgPSBhbGlnbm1lbnRTdGF0ZSkpO1xufSk7XG5cbmNvbnN0IGF0dGFja2luZ1BoYXNlID0gKCkgPT4ge1xuICBBSUJvYXJkLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIHJlbmRlclBsYXllclNoaXBzKCk7XG4gIG15R2FtZUhhbmRsZXIucGxheWVycy5BSS5ib2FyZC5yYW5kb21seVBsYWNlU2hpcHMoKTtcbiAgQUlCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgaWYgKFxuICAgICAgbXlHYW1lSGFuZGxlci5pc0dhbWVPdmVyKCkgfHxcbiAgICAgIG15R2FtZUhhbmRsZXIuZ2V0VHVybigpID09PSBcImFpXCIgfHxcbiAgICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzcXVhcmVcIilcbiAgICApXG4gICAgICByZXR1cm47XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgIG15R2FtZUhhbmRsZXIuc3RhcnRBdHRhY2soZSk7XG4gICAgbXlHYW1lSGFuZGxlci5jYW5FbmRHYW1lKCk7XG4gICAgY29uc29sZS5sb2cobXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuc2hpcExpc3QpO1xuICB9KTtcbn07XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gIC8vIElmIGNsaWNrZWQgYmVmb3JlIHBsYXlhYmxlLCBwcmV2ZW50cyBmcm9tIGZ1cnRociBwbGF5aW5nXG4gIFwiY2xpY2tcIixcbiAgKCkgPT4ge1xuICAgIGlmIChteUdhbWVIYW5kbGVyLmNhblN0YXJ0R2FtZSgpKSB7XG4gICAgICBhdHRhY2tpbmdQaGFzZSgpO1xuICAgIH1cbiAgfVxuKTtcblxuc2hpcHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICBjb25zb2xlLmxvZyhlKTtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwic2hpcC1sZW5ndGhcIiwgZS50YXJnZXQuZGF0YXNldC5sZW5ndGgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJzaGlwLW5hbWVcIiwgZS50YXJnZXQuaWQpO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJzaGlwLWFsaWdubWVudFwiLCBlLnRhcmdldC5kYXRhc2V0LmFsaWdubWVudCk7XG4gIH1cbn0pO1xuXG5ib2FyZEZvclBsYWNlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgaWYgKFxuICAgIGUudGFyZ2V0LmlkID09PSBcInBsYWNlLXNoaXAtYm9hcmRcIiB8fFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFuY2hvcmVkXCIpXG4gIClcbiAgICByZXR1cm47XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnb3ZlclwiKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmJvYXJkRm9yUGxhY2VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcInBsYWNlLXNoaXAtYm9hcmRcIikgcmV0dXJuO1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ292ZXJcIik7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5jb25zdCBhZGRBbmNob3JlZENsYXNzID0gKHNoaXBQbGFjZW1lbnQpID0+IHtcbiAgc2hpcFBsYWNlbWVudC5mb3JFYWNoKChwbGFjZW1lbnQpID0+IHtcbiAgICBjb25zdCBwbGFjZW1lbnRJbkRPTSA9IGJvYXJkRm9yUGxhY2VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEteD1cIiR7cGxhY2VtZW50WzBdfVwiXVtkYXRhLXk9XCIke3BsYWNlbWVudFsxXX1cIl1gXG4gICAgKTtcbiAgICBwbGFjZW1lbnRJbkRPTS5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yZWRcIik7XG4gIH0pO1xufTtcblxuYm9hcmRGb3JQbGFjZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdvdmVyXCIpO1xuICBjb25zdCBvYmplY3REYXRhID0ge1xuICAgIGxlbmd0aDogTnVtYmVyKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJzaGlwLWxlbmd0aFwiKSksXG4gICAgbmFtZTogZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInNoaXAtbmFtZVwiKSxcbiAgICBhbGlnbm1lbnQ6IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJzaGlwLWFsaWdubWVudFwiKSxcbiAgfTtcbiAgY29uc29sZS5sb2cob2JqZWN0RGF0YSk7XG4gIGNvbnN0IGNob3NlbkNvb3JkaW5hdGUgPSBbXG4gICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueCksXG4gICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueSksXG4gIF07XG5cbiAgY29uc3Qgc2hpcExvY2F0aW9uID0gbXlHYW1lSGFuZGxlci5hbmNob3JBU2hpcChjaG9zZW5Db29yZGluYXRlLCBvYmplY3REYXRhKTtcbiAgaWYgKHNoaXBMb2NhdGlvbikge1xuICAgIGFkZEFuY2hvcmVkQ2xhc3Moc2hpcExvY2F0aW9uKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtvYmplY3REYXRhLm5hbWV9YCkuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XG4gICAgY29uc29sZS5sb2cobXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQudW5hdmFpbGFibGVDb29yZHMpO1xuICB9XG59KTtcblxuY29uc3QgY2xhc3NSZW1vdmFsID0gKGNsYXNzTmFtZSwgY29udGFpbmVyID0gZG9jdW1lbnQpID0+IHtcbiAgY29uc3QgZWxlbWVudHNUb0NsZWFyID0gQXJyYXkuZnJvbShcbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NOYW1lfWApXG4gICk7XG4gIGVsZW1lbnRzVG9DbGVhci5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG59O1xuXG4gICAgICAvKiA8ISEhISEhISEhISBHYW1lIFJlc2V0ICEhISEhISEhISEhPiAqL1xuY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgbXlHYW1lSGFuZGxlciA9IGdhbWVIYW5kbGVyKFwidGVzdFwiKTtcbiAgY2xhc3NSZW1vdmFsKFwiYW5jaG9yZWRcIik7XG4gIGNsYXNzUmVtb3ZhbChcInJlbW92ZWRcIiwgc2hpcHNDb250YWluZXIpO1xufTtcblxuYm9hcmRSZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZXNldEJvYXJkKCk7XG59KTtcblxuXG5cbmdhbWVSZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZXNldEJvYXJkKCk7XG4gIGNsYXNzUmVtb3ZhbChcImhpdFwiKTtcbiAgY2xhc3NSZW1vdmFsKFwibWlzc2VkXCIpO1xufSk7XG4iLCJpbXBvcnQgcG9zc2libGVBdHRhY2tzIGZyb20gXCIuLi9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG5jb25zdCBBSUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhaS1ib2FyZFwiKTtcbmNvbnN0IGJvYXJkRm9yUGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwLWJvYXJkXCIpO1xuXG5jb25zdCBjcmVhdGVCb2FyZHMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmRpbmF0ZSkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgc3F1YXJlLmRhdGFzZXQueCA9IGNvb3JkaW5hdGVbMF07XG4gICAgc3F1YXJlLmRhdGFzZXQueSA9IGNvb3JkaW5hdGVbMV07XG4gICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICBjb25zdCBzcXVhcmVDbG9uZTEgPSBzcXVhcmUuY2xvbmVOb2RlKCk7XG4gICAgQUlCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmVDbG9uZTEpO1xuICAgIGNvbnN0IHNxdWFyZUNsb25lMiA9IHNxdWFyZS5jbG9uZU5vZGUoKTtcbiAgICBib2FyZEZvclBsYWNlbWVudC5hcHBlbmRDaGlsZChzcXVhcmVDbG9uZTIpO1xuICB9KTtcbn07XG5cbmNyZWF0ZUJvYXJkcyhwb3NzaWJsZUF0dGFja3MpO1xuXG4vKlxuICovXG4iLCJjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcblxuY29uc3QgZ2VuZXJhdGVTaGlwQmxvY2tzID0gKCkgPT4ge1xuICBBcnJheS5mcm9tKHNoaXBzKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IE51bWJlcihzaGlwLmRhdGFzZXQubGVuZ3RoKTtcbiAgICBzaGlwLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7IFxuICAgIHNoaXAuZGF0YXNldC5hbGlnbm1lbnQgPSBcImhvcml6b250YWxcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2hpcEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNoaXBCbG9jay5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIik7XG4gICAgICBzaGlwLmFwcGVuZENoaWxkKHNoaXBCbG9jayk7XG4gICAgfVxuICB9KTtcbn07XG5nZW5lcmF0ZVNoaXBCbG9ja3MoKTtcbiIsImNvbnN0IGNyZWF0ZUFycmF5T2ZBdHRhY2tzID0gKCkgPT4ge1xuICBjb25zdCBhdHRhY2tzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY29uc3QgeENvb3JkaW5hdGUgPSBpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3QgeUNvb3JkaW5hdGUgPSBqO1xuICAgICAgYXR0YWNrcy5wdXNoKFt4Q29vcmRpbmF0ZSwgeUNvb3JkaW5hdGVdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGF0dGFja3M7XG59O1xuXG5jb25zdCBwb3NzaWJsZUF0dGFja3MgPSBjcmVhdGVBcnJheU9mQXR0YWNrcygpO1xuXG5jb25zdCBnZXRWYWxpZEF0dGFjayA9IChhdHRhY2tzQXJyYXkpID0+XG4gIGF0dGFja3NBcnJheVxuICAgIC5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXR0YWNrc0FycmF5Lmxlbmd0aCksIDEpXG4gICAgLmZsYXQoKTtcblxuZXhwb3J0IGRlZmF1bHQgcG9zc2libGVBdHRhY2tzO1xuZXhwb3J0IHsgZ2V0VmFsaWRBdHRhY2sgfTtcbiIsIlxuICBjb25zdCBpbGxlZ2FsVmFyaWFudHMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgLTFdLFxuICAgIFstMSwgMF0sXG4gICAgWzEsIDBdLFxuICAgIFswLCAxXSxcbiAgICBbLTEsICsxXSxcbiAgICBbMSwgMV0sXG4gIF07XG5cbmNvbnN0IHNoaXBBcnJheSA9IFtcbiAge1xuICAgIG5hbWU6IFwiZGVzdHJveWVyXCIsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdWJtYXJpbmVcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNydWlzZXJcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJhdHRsZXNoaXBcIixcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNhcnJpZXJcIixcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG5dO1xuXG5leHBvcnQge2lsbGVnYWxWYXJpYW50cywgc2hpcEFycmF5fSIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lKSA9PiB7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gIGxldCBoaXRzVGFrZW4gPSAwO1xuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgaGl0c1Rha2VuICs9IDE7XG4gIH07XG4gIGNvbnN0IGdldEhpdHNUYWtlbiA9ICgpID0+IGhpdHNUYWtlbjtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBoaXRzVGFrZW4gPj0gbGVuZ3RoO1xuXG4gIHJldHVybiB7IGdldExlbmd0aCwgZ2V0TmFtZSwgaGl0LCBnZXRIaXRzVGFrZW4sIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyLWZhY3RvcnlcIjtcbmltcG9ydCBwb3NzaWJsZUF0dGFja3MsIHtcbiAgZ2V0VmFsaWRBdHRhY2ssXG59IGZyb20gXCIuLi9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG5jb25zdCBBSUJvYXJkRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhaS1ib2FyZFwiKTtcbmNvbnN0IHR1cm5EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuLWRpc3BsYXlcIik7XG5cbmNvbnN0IGdhbWVIYW5kbGVyID0gKHBsYXllck5hbWUpID0+IHtcbiAgbGV0IHBsYXllclR1cm4gPSBcInJlYWxQbGF5ZXJcIjtcbiAgY29uc3QgcGxheWVycyA9IHtcbiAgICByZWFsUGxheWVyOiBQbGF5ZXIocGxheWVyTmFtZSksXG4gICAgQUk6IFBsYXllcihcIkFJXCIpLFxuICB9O1xuXG4gIC8vIFNoaXAgcGxhY2VtZW50XG4gIC8qIGxldCBpbGxlZ2FsU2hpcFBsYWNlbWVudHMgPSBuZXcgU2V0KCk7ICovXG5cbiAgLy8gQ2hlY2sgaWYgeSBheGlzIGlzIG91dCBvZiBib3VuZFxuXG4gIGNvbnN0IGlzT3V0T2ZCb3VuZHMgPSAoY29vcmRpbmF0ZSwgc2hpcExlbmd0aCwgYWxpZ25tZW50ID0gXCJob3Jpem9udGFsXCIpID0+XG4gICAgYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIlxuICAgICAgPyBjb29yZGluYXRlWzFdICsgc2hpcExlbmd0aCA+IDEwXG4gICAgICA6IGNvb3JkaW5hdGVbMF0gKyBzaGlwTGVuZ3RoID4gMTA7XG5cbiAgY29uc3QgZ2VuZXJhdGVQbGFjZW1lbnQgPSAoXG4gICAgY29vcmRpbmF0ZSxcbiAgICBzaGlwTGVuZ3RoLFxuICAgIGFsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiXG4gICkgPT4ge1xuICAgIGNvbnN0IHNoaXBQbGFjZW1lbnQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gXCJob3Jpem9udGFsXCIpXG4gICAgICAgIHNoaXBQbGFjZW1lbnQucHVzaChbY29vcmRpbmF0ZVswXSwgY29vcmRpbmF0ZVsxXSArIGldKTtcbiAgICAgIGVsc2Ugc2hpcFBsYWNlbWVudC5wdXNoKFtjb29yZGluYXRlWzBdICsgaSwgY29vcmRpbmF0ZVsxXV0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcFBsYWNlbWVudDtcbiAgfTtcbiAgLyogXG4gIGNvbnN0IGlzSW5BbkFycmF5ID0gKGFycmF5LCBlbGVtZW50KSA9PlxuICAgIGFycmF5LnNvbWUoKGVsKSA9PiBpc0VxdWFsKGVsLCBlbGVtZW50KSk7ICovXG5cbiAgY29uc3QgaXNTaGlwUGxhY2VkID0gKG5hbWUsIHNoaXBMaXN0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yIChjb25zdCBzaGlwT2JqZWN0IG9mIHNoaXBMaXN0KSB7XG4gICAgICBpZiAoc2hpcE9iamVjdC5zaGlwLmdldE5hbWUoKSA9PT0gbmFtZSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBhbmNob3JBU2hpcCA9IChjaG9zZW5Db29yZGluYXRlLCBzaGlwRGF0YSkgPT4ge1xuICAgIGlmIChpc091dE9mQm91bmRzKGNob3NlbkNvb3JkaW5hdGUsIHNoaXBEYXRhLmxlbmd0aCwgc2hpcERhdGEuYWxpZ25tZW50KSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBzaGlwUGxhY2VtZW50ID0gZ2VuZXJhdGVQbGFjZW1lbnQoXG4gICAgICBjaG9zZW5Db29yZGluYXRlLFxuICAgICAgc2hpcERhdGEubGVuZ3RoLFxuICAgICAgc2hpcERhdGEuYWxpZ25tZW50XG4gICAgKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllcnMucmVhbFBsYXllci5ib2FyZDtcbiAgICBpZiAoXG4gICAgICBpc1NoaXBQbGFjZWQoc2hpcERhdGEubmFtZSwgcGxheWVyQm9hcmQuc2hpcExpc3QpIHx8XG4gICAgICBwbGF5ZXJCb2FyZC5pc0luSWxsZWdhbENvb3JkcyhzaGlwUGxhY2VtZW50KVxuICAgIClcbiAgICAgIHJldHVybjtcblxuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwRGF0YS5sZW5ndGgsIHNoaXBEYXRhLm5hbWUsIHNoaXBQbGFjZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkLnNoaXBMaXN0KTtcbiAgICByZXR1cm4gc2hpcFBsYWNlbWVudDtcbiAgfTtcblxuICBjb25zdCBjYW5TdGFydEdhbWUgPSAoKSA9PlxuICAgIHBsYXllcnMucmVhbFBsYXllci5ib2FyZC5zaGlwTGlzdC5sZW5ndGggPT09IDU7IC8qICAmJlxuICAgIHBsYXllcnMuQUkuYm9hcmQuc2hpcExpc3QubGVuZ3RoID09PSA1OyAqL1xuXG4gIC8vIEdhbWUgbG9vcFxuICBjb25zdCBBSVBvc3NpYmxlQXR0YWNrcyA9IHBvc3NpYmxlQXR0YWNrcztcblxuICBjb25zdCBnZXRUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXJUdXJuID09PSBcInJlYWxQbGF5ZXJcIikgcGxheWVyVHVybiA9IFwiYWlcIjtcbiAgICBlbHNlIHBsYXllclR1cm4gPSBcInJlYWxQbGF5ZXJcIjtcbiAgICByZXR1cm4gcGxheWVyVHVybjtcbiAgfTtcblxuICBjb25zdCBjb252ZXJ0VG9Db29yZGluYXRlID0gKHRhcmdldCkgPT4gW1xuICAgIE51bWJlcih0YXJnZXQuZGF0YXNldC54KSxcbiAgICBOdW1iZXIodGFyZ2V0LmRhdGFzZXQueSksXG4gIF07XG5cbiAgY29uc3QgZGlzcGxheVdob3NlVHVybiA9ICh0dXJuKSA9PiB7XG4gICAgY29uc3Qgd2hvc2VUdXJuID0gdHVybjtcbiAgICBpZiAod2hvc2VUdXJuID09PSBcInJlYWxQbGF5ZXJcIikge1xuICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcImNvbXB1dGVyJ3MgdHVyblwiO1xuICAgIH0gZWxzZSB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwicGxheWVyJ3MgdHVyblwiO1xuICB9O1xuXG4gIGNvbnN0IG1hcmtTcXVhcmUgPSAoY29vcmRpbmF0ZSwgeyBoaXQgfSwgdHVybikgPT4ge1xuICAgIGxldCB0YXJnZXQ7XG4gICAgaWYgKHR1cm4gPT09IFwicmVhbFBsYXllclwiKSB7XG4gICAgICB0YXJnZXQgPSBBSUJvYXJkRE9NLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZVswXX1cIl1bZGF0YS15PVwiJHtjb29yZGluYXRlWzFdfVwiXWBcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0dXJuID09PSBcImFpXCIpIHtcbiAgICAgIHRhcmdldCA9IHBsYXllckJvYXJkRE9NLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZVswXX1cIl1bZGF0YS15PVwiJHtjb29yZGluYXRlWzFdfVwiXWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGhpdCA9PT0gdHJ1ZSkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgZWxzZSB0YXJnZXQuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfTtcblxuICBjb25zdCBwbGF5ZXJNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgQUlCb2FyZERPTS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGNvbnN0IHBsYXllclRhcmdldCA9IGNvbnZlcnRUb0Nvb3JkaW5hdGUoZXZlbnQudGFyZ2V0KTtcbiAgICBjb25zdCBwbGF5ZXJBdHRhY2sgPSBwbGF5ZXJzLnJlYWxQbGF5ZXIuYXR0YWNrKHBsYXllcnMuQUksIHBsYXllclRhcmdldCk7XG4gICAgZGlzcGxheVdob3NlVHVybihnZXRUdXJuKCkpO1xuICAgIG1hcmtTcXVhcmUocGxheWVyVGFyZ2V0LCBwbGF5ZXJBdHRhY2ssIGdldFR1cm4oKSk7XG4gICAgY2hhbmdlVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IEFJTW92ZSA9ICgpID0+IHtcbiAgICBpZiAocGxheWVycy5BSS5ib2FyZC5hcmVBbGxTdW5rKCkpIHJldHVybjtcbiAgICBjb25zdCBBSVRhcmdldCA9IGdldFZhbGlkQXR0YWNrKEFJUG9zc2libGVBdHRhY2tzKTtcbiAgICBjb25zdCBBSUF0dGFjayA9IHBsYXllcnMuQUkuYXR0YWNrKHBsYXllcnMucmVhbFBsYXllciwgQUlUYXJnZXQpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBtYXJrU3F1YXJlKEFJVGFyZ2V0LCBBSUF0dGFjaywgZ2V0VHVybigpKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkaXNwbGF5V2hvc2VUdXJuKGdldFR1cm4oKSk7XG4gICAgfSwgNzAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2hhbmdlVHVybigpO1xuICAgICAgQUlCb2FyZERPTS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH0sIDgwMCk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRBdHRhY2sgPSAoZSkgPT4ge1xuICAgIGlmIChcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NlZFwiKSB8fFxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8XG4gICAgICBnZXRUdXJuKCkgPT09IFwiYWlcIiB8fFxuICAgICAgcGxheWVycy5BSS5ib2FyZC5hcmVBbGxTdW5rKCkgfHxcbiAgICAgIHBsYXllcnMucmVhbFBsYXllci5ib2FyZC5hcmVBbGxTdW5rKClcbiAgICApXG4gICAgICByZXR1cm47XG4gICAgcGxheWVyTW92ZShlKTtcbiAgICBBSU1vdmUoKTtcbiAgfTtcblxuICBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT5cbiAgICBwbGF5ZXJzLkFJLmJvYXJkLmFyZUFsbFN1bmsoKSB8fCBwbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuYXJlQWxsU3VuaygpO1xuXG4gIGNvbnN0IGNhbkVuZEdhbWUgPSAoKSA9PiB7XG4gICAgLy8gSW1wbGVtZW50IG1vZGFsIHRvIHBvcCB1cCBpbnN0ZWFkIG9mIGFsdGVyXG4gICAgaWYgKGlzR2FtZU92ZXIoKSkge1xuICAgICAgaWYgKHBsYXllcnMuQUkuYm9hcmQuYXJlQWxsU3VuaygpKSBhbGVydChcIllvdSBoYXZlIHdvblwiKTtcbiAgICAgIGVsc2UgYWxlcnQoXCJBSSBoYXMgd29uIHdvblwiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydEF0dGFjayxcbiAgICBwbGF5ZXJzLFxuICAgIGFuY2hvckFTaGlwLFxuICAgIGNhblN0YXJ0R2FtZSxcbiAgICBpc091dE9mQm91bmRzLFxuICAgIGNhbkVuZEdhbWUsXG4gICAgaXNHYW1lT3ZlcixcbiAgICBnZXRUdXJuLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUhhbmRsZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IGlzRXF1YWwgZnJvbSBcImxvZGFzaC5pc2VxdWFsXCI7XG5pbXBvcnQgcG9zc2libGVBdHRhY2tzIGZyb20gXCIuLi9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLWZhY3RvcnlcIjtcbmltcG9ydCB7IGlsbGVnYWxWYXJpYW50cywgc2hpcEFycmF5IH0gZnJvbSBcIi4uL2dhbWVIZWxwZXJzL3BsYWNlbWVudC1oZWxwZXJzXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbLi4ucG9zc2libGVBdHRhY2tzXTtcbiAgY29uc3Qgc2hpcExpc3QgPSBbXTtcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHVuYXZhaWxhYmxlQ29vcmRzID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0IGlzSW5BbkFycmF5ID0gKGFycmF5LCBlbGVtZW50KSA9PlxuICAgIGFycmF5LnNvbWUoKGVsKSA9PiBpc0VxdWFsKGVsLCBlbGVtZW50KSk7XG5cbiAgY29uc3QgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMgPSAoXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgaWxsZWdhbFBvc3NpYmlsaXRlcyA9IGlsbGVnYWxWYXJpYW50cyxcbiAgICBpbGxlZ2FsU2V0ID0gdW5hdmFpbGFibGVDb29yZHNcbiAgKSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWxsZWdhbFBvc3NpYmlsaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpbGxlZ2FsVmFyaWFudCA9IGlsbGVnYWxQb3NzaWJpbGl0ZXNbaV07XG4gICAgICAgIGNvbnN0IGlsbGVnYWxNb3ZlID0gW1xuICAgICAgICAgIGNvb3JkWzBdICsgaWxsZWdhbFZhcmlhbnRbMF0sXG4gICAgICAgICAgY29vcmRbMV0gKyBpbGxlZ2FsVmFyaWFudFsxXSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlsbGVnYWxNb3ZlWzBdID49IDAgJiZcbiAgICAgICAgICBpbGxlZ2FsTW92ZVswXSA8PSA5ICYmXG4gICAgICAgICAgaWxsZWdhbE1vdmVbMV0gPj0gMCAmJlxuICAgICAgICAgIGlsbGVnYWxNb3ZlWzFdIDw9IDkgJiZcbiAgICAgICAgICBpc0luQW5BcnJheShjb29yZGluYXRlcywgaWxsZWdhbE1vdmUpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgaWxsZWdhbFNldC5hZGQoU3RyaW5nKGlsbGVnYWxNb3ZlKSk7XG4gICAgICB9XG4gICAgICBpbGxlZ2FsU2V0LmFkZChTdHJpbmcoY29vcmQpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBpc0luSWxsZWdhbENvb3JkcyA9IChcbiAgICBzaGlwUGxhY2VtZW50LFxuICAgIGlsbGVnYWxNb3ZlcyA9IHVuYXZhaWxhYmxlQ29vcmRzXG4gICkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3QgcGxhY2VtZW50IG9mIHNoaXBQbGFjZW1lbnQpIHtcbiAgICAgIGlmIChpbGxlZ2FsTW92ZXMuaGFzKFN0cmluZyhwbGFjZW1lbnQpKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IHNoaXBPYmplY3QgPSB7XG4gICAgICBzaGlwOiBTaGlwKGxlbmd0aCwgbmFtZSksXG4gICAgICBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHNoaXBMaXN0LnB1c2goc2hpcE9iamVjdCk7XG4gICAgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMoY29vcmRpbmF0ZXMsIGlsbGVnYWxWYXJpYW50cywgdW5hdmFpbGFibGVDb29yZHMpO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZSkgPT4ge1xuICAgIGNvbnN0IGluZGV4T2ZTaGlwID0gY2hlY2tIaXQoY29vcmRpbmF0ZSk7XG4gICAgaWYgKGluZGV4T2ZTaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHNoaXBJbkxpc3QgPSBzaGlwTGlzdFtpbmRleE9mU2hpcF07XG4gICAgICBzaGlwSW5MaXN0LnNoaXAuaGl0KCk7XG4gICAgICBpZiAoc2hpcEluTGlzdC5zaGlwLmlzU3VuaygpKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhpdDogdHJ1ZSxcbiAgICAgICAgICBzdW5rOiB0cnVlLFxuICAgICAgICAgIG5hbWU6IHNoaXBJbkxpc3Quc2hpcC5nZXROYW1lKCksXG4gICAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoaXQ6IHRydWUsXG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gICAgbWlzc2VkU2hvdHMuYWRkKFN0cmluZyhjb29yZGluYXRlKSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpdDogZmFsc2UsXG4gICAgICBzdW5rOiBmYWxzZSxcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hpdCA9IChjb29yZGluYXRlKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBzaGlwTGlzdCkge1xuICAgICAgaWYgKG9iamVjdC5jb29yZGluYXRlcy5zb21lKCh4KSA9PiBpc0VxdWFsKGNvb3JkaW5hdGUsIHgpKSkgcmV0dXJuIGluZGV4O1xuICAgICAgaW5kZXggKz0gMTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU3VuayA9ICgpID0+IHNoaXBMaXN0LmV2ZXJ5KChlbCkgPT4gZWwuc2hpcC5pc1N1bmsoKSk7XG5cbiAgLy8gQUkgcmFuZG9tIHNoaXAgcGxhY2VtZW50XG4gIGNvbnN0IGdldFJhbmRvbUluZGV4ID0gKGluZGV4QXJyYXkpID0+XG4gICAgaW5kZXhBcnJheS5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaW5kZXhBcnJheS5sZW5ndGgpLCAxKTtcblxuICBjb25zdCBnZXRSYW5kb21BbGlnbm1lbnQgPSAoYWxpZ25tZW50cyA9IFtcImhvcml6b250YWxcIiwgXCJ2ZXJ0aWNhbFwiXSkgPT5cbiAgICBhbGlnbm1lbnRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcblxuICBjb25zdCBnZXRJbml0aWFsQm9hcmRTcXVhcmUgPSAoc2hpcExlbmd0aCwgYWxpZ25tZW50KSA9PiB7XG4gICAgbGV0IGluaXRpYWxCb2FyZFNxdWFyZTtcbiAgICB3aGlsZSAoXG4gICAgICBpbml0aWFsQm9hcmRTcXVhcmUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdW5hdmFpbGFibGVDb29yZHMuaGFzKFN0cmluZyhpbml0aWFsQm9hcmRTcXVhcmUpKVxuICAgICkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbENvb3JkID1cbiAgICAgICAgICBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmQubGVuZ3RoIC0gc2hpcExlbmd0aCkpXTtcblxuICAgICAgICAvLyBQcmV2ZW50IGZyb20gZ29pbmcgb3V0IG9mIGJvdW5kcyBvbiB5IGF4aXNcbiAgICAgICAgaWYgKGhvcml6b250YWxDb29yZFsxXSArIHNoaXBMZW5ndGggPD0gMTApXG4gICAgICAgICAgaW5pdGlhbEJvYXJkU3F1YXJlID0gaG9yaXpvbnRhbENvb3JkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbENvb3JkID1cbiAgICAgICAgICBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoKHNoaXBMZW5ndGggKyAxKSAqIDEwKSldO1xuXG4gICAgICAgIC8vIFByZXZlbnQgZnJvbSBnb2luZyBvdXQgb2YgYm91bmRzIG9uIHggYXhpc1xuICAgICAgICBpZiAoaG9yaXpvbnRhbENvb3JkWzBdICsgc2hpcExlbmd0aCA8PSAxMClcbiAgICAgICAgICBpbml0aWFsQm9hcmRTcXVhcmUgPSBob3Jpem9udGFsQ29vcmQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbml0aWFsQm9hcmRTcXVhcmU7XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tUGxhY2VtZW50ID0gKHNoaXBMZW5ndGgpID0+IHtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBbXTtcbiAgICB3aGlsZSAocGxhY2VtZW50Lmxlbmd0aCA8PSAxKSB7XG4gICAgICBjb25zdCBhbGlnbm1lbnQgPSBnZXRSYW5kb21BbGlnbm1lbnQoKTtcbiAgICAgIGNvbnN0IGluaXRpYWxDb29yZCA9IGdldEluaXRpYWxCb2FyZFNxdWFyZShzaGlwTGVuZ3RoLCBhbGlnbm1lbnQpO1xuICAgICAgcGxhY2VtZW50LnB1c2goaW5pdGlhbENvb3JkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gY29uc3QgbGFzdEl0ZW0gPSBwbGFjZW1lbnRbcGxhY2VtZW50Lmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIilcbiAgICAgICAgICBwbGFjZW1lbnQucHVzaChbaW5pdGlhbENvb3JkWzBdLCBpbml0aWFsQ29vcmRbMV0gKyBpXSk7XG4gICAgICAgIGVsc2UgcGxhY2VtZW50LnB1c2goW2luaXRpYWxDb29yZFswXSArIGksIGluaXRpYWxDb29yZFsxXV0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzSW5JbGxlZ2FsQ29vcmRzKHBsYWNlbWVudCkpIHBsYWNlbWVudC5zcGxpY2UoMCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMocGxhY2VtZW50KTtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9O1xuICBjb25zdCByYW5kb21seVBsYWNlU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5kZXhBcnJheSA9IFswLCAxLCAyLCAzLCA0XTtcbiAgICB3aGlsZSAoaW5kZXhBcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gZ2V0UmFuZG9tSW5kZXgoaW5kZXhBcnJheSk7XG4gICAgICBjb25zdCBzaGlwSGVscGVyID0gc2hpcEFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZW1lbnQgPSBnZXRSYW5kb21QbGFjZW1lbnQoc2hpcEhlbHBlci5sZW5ndGgpO1xuICAgICAgcGxhY2VTaGlwKHNoaXBIZWxwZXIubGVuZ3RoLCBzaGlwSGVscGVyLm5hbWUsIHNoaXBQbGFjZW1lbnQpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBzaGlwTGlzdCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBhcmVBbGxTdW5rLFxuICAgIHVuYXZhaWxhYmxlQ29vcmRzLFxuICAgIGlzSW5JbGxlZ2FsQ29vcmRzLFxuICAgIHJhbmRvbWx5UGxhY2VTaGlwcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICBjb25zdCBib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgY29vcmRpbmF0ZSkgPT4gZW5lbXkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKTtcblxuICByZXR1cm4geyBnZXROYW1lLCBib2FyZCwgYXR0YWNrIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvbm9yd2VzdGVyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvbm9yd2VzdGVyLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9hcm1hbGl0ZV9yaWZsZS53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL2FybWFsaXRlX3JpZmxlLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yd2VzdGVyXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJBcm1hbGl0ZVJpZmxlXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcblxcbjpyb290IHtcXG4gIC0tcHJpbWFyeTogIzBlNGI2YztcXG4gIC0tc2Vjb25kYXJ5OiAjMGEwYTBhO1xcbiAgLS10ZXJ0aWFyeTogIzE1NTY4NDtcXG4gIC0tYW5jaG9yZWQ6ICM0OGJmOTE7XFxuICAtLWhpdDogI2UwMzMzMztcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yd2VzdGVyXFxcIiwgc2Fucy1zZXJpZjtcXG59XFxuKntcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChcXG4gICAgdG8gcmlnaHQsXFxuICAgICMxNjE2MTYgMTAlLFxcbiAgICAjMmUyZTJlLFxcbiAgICAjMTYxNjE2IDkwJVxcbiAgKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcbioge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbm1haW4ge1xcbiAgd2lkdGg6IDg1MHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4jZGlzcGxheSB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcbiNwbGF5ZXItYm9hcmQsXFxuI2FpLWJvYXJkLFxcbiNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCBibGFjazsgKi9cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIG1hcmdpbjogMC41cmVtO1xcbiAgZ2FwOiAwLjJyZW07XFxufVxcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tc2Vjb25kYXJ5KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRlcnRpYXJ5KTtcXG59XFxuLmFjdGl2ZSA+IGRpdjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiZjkxO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ubWlzc2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZjhmOGY7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmFuY2hvcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0OGJmOTE7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwMzMzMztcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uZHJhZ292ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4YmY5MTtcXG59XFxuLnJlbW92ZWQge1xcbiAgb3BhY2l0eTogMC4yO1xcbn1cXG4ub3V0T2ZCb3VuZHMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG59XFxuI2JvYXJkLWNyZWF0b3Ige1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHdpZHRoOiA4MHZ3O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbn1cXG5cXG4jc2hpcHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcbi5zaGlwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgbWF4LWhlaWdodDogNDBweDtcXG4gIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiZjkxO1xcbn1cXG4uYmxvY2sge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogNDBweDtcXG59XFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4MjgyODtcXG4gIGJveC1zaGFkb3c6IC0zcHggM3B4IHZhcigtLWFuY2hvcmVkKSwgLTJweCAycHggdmFyKC0tYW5jaG9yZWQpLFxcbiAgICAtMXB4IDFweCB2YXIoLS1hbmNob3JlZCk7XFxuICBjb2xvcjogdmFyKC0tYW5jaG9yZWQpO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx3QkFBd0I7RUFDeEI7MERBQ3FEO0FBQ3ZEO0FBQ0E7RUFDRSw0QkFBNEI7RUFDNUI7MERBQzBEO0FBQzVEOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGNBQWM7RUFDZCxvQ0FBb0M7QUFDdEM7QUFDQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRTs7Ozs7R0FLQztFQUNELDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7RUFDZCxjQUFjO0VBQ2QsYUFBYTtBQUNmO0FBQ0E7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7QUFDaEI7QUFDQTs7O0VBR0UsWUFBWTtFQUNaLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxjQUFjO0VBQ2QsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGlDQUFpQztBQUNuQztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLGVBQWU7QUFDakI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtFQUN0Qix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHVCQUF1QjtFQUN2QixXQUFXO0FBQ2I7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qjs0QkFDMEI7RUFDMUIsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixpQkFBaUI7QUFDbkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIk5vcndlc3RlclxcXCI7XFxuICBzcmM6IHVybChcXFwifi4vYXNzZXRzL2ZvbnRzL25vcndlc3Rlci53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgdXJsKFxcXCIuL2Fzc2V0cy9mb250cy9ub3J3ZXN0ZXIud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQXJtYWxpdGVSaWZsZVxcXCI7XFxuICBzcmM6IHVybChcXFwiLi9hc3NldHMvZm9udHMvYXJtYWxpdGVfcmlmbGUud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgIHVybChcXFwiLi9hc3NldHMvZm9udHMvYXJtYWxpdGVfcmlmbGUud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLXByaW1hcnk6ICMwZTRiNmM7XFxuICAtLXNlY29uZGFyeTogIzBhMGEwYTtcXG4gIC0tdGVydGlhcnk6ICMxNTU2ODQ7XFxuICAtLWFuY2hvcmVkOiAjNDhiZjkxO1xcbiAgLS1oaXQ6ICNlMDMzMzM7XFxuICBmb250LWZhbWlseTogXFxcIk5vcndlc3RlclxcXCIsIHNhbnMtc2VyaWY7XFxufVxcbip7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIHRvIHJpZ2h0LFxcbiAgICAjMTYxNjE2IDEwJSxcXG4gICAgIzJlMmUyZSxcXG4gICAgIzE2MTYxNiA5MCVcXG4gICk7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbn1cXG4qIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5tYWluIHtcXG4gIHdpZHRoOiA4NTBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuI2Rpc3BsYXkge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4jcGxheWVyLWJvYXJkLFxcbiNhaS1ib2FyZCxcXG4jcGxhY2Utc2hpcC1ib2FyZCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgLyogYm9yZGVyOiAxcHggc29saWQgYmxhY2s7ICovXFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBtYXJnaW46IDAuNXJlbTtcXG4gIGdhcDogMC4ycmVtO1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLXNlY29uZGFyeSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10ZXJ0aWFyeSk7XFxufVxcbi5hY3RpdmUgPiBkaXY6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4YmY5MTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLm1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGY4ZjhmO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5hbmNob3JlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiZjkxO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMDMzMzM7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0OGJmOTE7XFxufVxcbi5yZW1vdmVkIHtcXG4gIG9wYWNpdHk6IDAuMjtcXG59XFxuLm91dE9mQm91bmRzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcbiNib2FyZC1jcmVhdG9yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogODB2dztcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXFxuI3NoaXBzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbn1cXG4uc2hpcCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXG4gIG1heC1oZWlnaHQ6IDQwcHg7XFxuICBtYXgtd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4YmY5MTtcXG59XFxuLmJsb2NrIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgd2lkdGg6IDQwcHg7XFxufVxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODI4Mjg7XFxuICBib3gtc2hhZG93OiAtM3B4IDNweCB2YXIoLS1hbmNob3JlZCksIC0ycHggMnB4IHZhcigtLWFuY2hvcmVkKSxcXG4gICAgLTFweCAxcHggdmFyKC0tYW5jaG9yZWQpO1xcbiAgY29sb3I6IHZhcigtLWFuY2hvcmVkKTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCIvKipcbiAqIExvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcy5mb3VuZGF0aW9uLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZpbHRlcmAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHRbcmVzSW5kZXgrK10gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgYGNhY2hlYCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2FjaGUgVGhlIGNhY2hlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlSGFzKGNhY2hlLCBrZXkpIHtcbiAgcmV0dXJuIGNhY2hlLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2UsXG4gICAgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyAoZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICAtLXRoaXMuc2l6ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgICsrdGhpcy5zaXplO1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuc2l6ZSA9IDA7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPT0gbnVsbCA/IDAgOiB2YWx1ZXMubGVuZ3RoO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICByZXN1bHQgPSBkYXRhWydkZWxldGUnXShrZXkpO1xuXG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3NbYmFzZUdldFRhZyh2YWx1ZSldO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgc2VlbiA9IChiaXRtYXNrICYgQ09NUEFSRV9VTk9SREVSRURfRkxBRykgPyBuZXcgU2V0Q2FjaGUgOiB1bmRlZmluZWQ7XG5cbiAgc3RhY2suc2V0KGFycmF5LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgYXJyYXkpO1xuXG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleCwgb3RoZXIsIGFycmF5LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgsIGFycmF5LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICBpZiAoY29tcGFyZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoc2Vlbikge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgaWYgKCFjYWNoZUhhcyhzZWVuLCBvdGhJbmRleCkgJiZcbiAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlZW4ucHVzaChvdGhJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShcbiAgICAgICAgICBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHxcbiAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKVxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10oYXJyYXkpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gQ09NUEFSRV9VTk9SREVSRURfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9ICFuYXRpdmVHZXRTeW1ib2xzID8gc3R1YkFycmF5IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgcmV0dXJuIGFycmF5RmlsdGVyKG5hdGl2ZUdldFN5bWJvbHMob2JqZWN0KSwgZnVuY3Rpb24oc3ltYm9sKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBzeW1ib2wpO1xuICB9KTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlXG4gKiBlcXVpdmFsZW50LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyBjb21wYXJpbmcgYXJyYXlzLCBhcnJheSBidWZmZXJzLCBib29sZWFucyxcbiAqIGRhdGUgb2JqZWN0cywgZXJyb3Igb2JqZWN0cywgbWFwcywgbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcyxcbiAqIHNldHMsIHN0cmluZ3MsIHN5bWJvbHMsIGFuZCB0eXBlZCBhcnJheXMuIGBPYmplY3RgIG9iamVjdHMgYXJlIGNvbXBhcmVkXG4gKiBieSB0aGVpciBvd24sIG5vdCBpbmhlcml0ZWQsIGVudW1lcmFibGUgcHJvcGVydGllcy4gRnVuY3Rpb25zIGFuZCBET01cbiAqIG5vZGVzIGFyZSBjb21wYXJlZCBieSBzdHJpY3QgZXF1YWxpdHksIGkuZS4gYD09PWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uaXNFcXVhbChvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBvYmplY3QgPT09IG90aGVyO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIlxuaW1wb3J0IFwiLi9ET00vY3JlYXRlQm9hcmRET01cIlxuaW1wb3J0IFwiLi9ET00vRE9NRXZlbnRzXCJcbmltcG9ydCBcIi4vRE9NL2RyYWdEcm9wU2hpcHNcIiAiXSwibmFtZXMiOlsiZ2FtZUhhbmRsZXIiLCJBSUJvYXJkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBsYXllckJvYXJkIiwiYm9hcmRGb3JQbGFjZW1lbnQiLCJzaGlwc0NvbnRhaW5lciIsInN0YXJ0QnRuIiwicXVlcnlTZWxlY3RvciIsImJvYXJkUmVzZXRCdG4iLCJnYW1lUmVzZXRCdG4iLCJhbGlnbm1lbnRCdG4iLCJteUdhbWVIYW5kbGVyIiwicmVuZGVyUGxheWVyU2hpcHMiLCJwbGF5ZXJTaGlwcyIsInBsYXllcnMiLCJyZWFsUGxheWVyIiwiYm9hcmQiLCJzaGlwTGlzdCIsImZvckVhY2giLCJzaGlwT2JqIiwiY29vcmRpbmF0ZXMiLCJjb29yZCIsImNvb3JkT25QbGF5ZXJCb2FyZCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhbGlnbm1lbnRTdGF0ZSIsImZpcnN0RWxlbWVudENoaWxkIiwiZGF0YXNldCIsImFsaWdubWVudCIsImV2ZXJ5U2hpcCIsIkFycmF5IiwiZnJvbSIsImNoaWxkcmVuIiwic2hpcCIsImF0dGFja2luZ1BoYXNlIiwiQUkiLCJyYW5kb21seVBsYWNlU2hpcHMiLCJlIiwiaXNHYW1lT3ZlciIsImdldFR1cm4iLCJ0YXJnZXQiLCJjb250YWlucyIsImNvbnNvbGUiLCJsb2ciLCJzdGFydEF0dGFjayIsImNhbkVuZEdhbWUiLCJjYW5TdGFydEdhbWUiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwibGVuZ3RoIiwiaWQiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZSIsImFkZEFuY2hvcmVkQ2xhc3MiLCJzaGlwUGxhY2VtZW50IiwicGxhY2VtZW50IiwicGxhY2VtZW50SW5ET00iLCJvYmplY3REYXRhIiwiTnVtYmVyIiwiZ2V0RGF0YSIsIm5hbWUiLCJjaG9zZW5Db29yZGluYXRlIiwieCIsInkiLCJzaGlwTG9jYXRpb24iLCJhbmNob3JBU2hpcCIsInVuYXZhaWxhYmxlQ29vcmRzIiwiY2xhc3NSZW1vdmFsIiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiZWxlbWVudHNUb0NsZWFyIiwicXVlcnlTZWxlY3RvckFsbCIsImVsZW1lbnQiLCJyZXNldEJvYXJkIiwicG9zc2libGVBdHRhY2tzIiwiY3JlYXRlQm9hcmRzIiwiY29vcmRpbmF0ZSIsInNxdWFyZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInNxdWFyZUNsb25lMSIsImNsb25lTm9kZSIsInNxdWFyZUNsb25lMiIsInNoaXBzIiwiZ2VuZXJhdGVTaGlwQmxvY2tzIiwic2hpcExlbmd0aCIsInNldEF0dHJpYnV0ZSIsImkiLCJzaGlwQmxvY2siLCJjcmVhdGVBcnJheU9mQXR0YWNrcyIsImF0dGFja3MiLCJ4Q29vcmRpbmF0ZSIsImoiLCJ5Q29vcmRpbmF0ZSIsInB1c2giLCJnZXRWYWxpZEF0dGFjayIsImF0dGFja3NBcnJheSIsInNwbGljZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImZsYXQiLCJpbGxlZ2FsVmFyaWFudHMiLCJzaGlwQXJyYXkiLCJTaGlwIiwiZ2V0TGVuZ3RoIiwiZ2V0TmFtZSIsImhpdHNUYWtlbiIsImhpdCIsImdldEhpdHNUYWtlbiIsImlzU3VuayIsIlBsYXllciIsInBsYXllckJvYXJkRE9NIiwiQUlCb2FyZERPTSIsInR1cm5EaXNwbGF5IiwicGxheWVyTmFtZSIsInBsYXllclR1cm4iLCJpc091dE9mQm91bmRzIiwiZ2VuZXJhdGVQbGFjZW1lbnQiLCJpc1NoaXBQbGFjZWQiLCJzaGlwT2JqZWN0Iiwic2hpcERhdGEiLCJpc0luSWxsZWdhbENvb3JkcyIsInBsYWNlU2hpcCIsIkFJUG9zc2libGVBdHRhY2tzIiwiY2hhbmdlVHVybiIsImNvbnZlcnRUb0Nvb3JkaW5hdGUiLCJkaXNwbGF5V2hvc2VUdXJuIiwidHVybiIsIndob3NlVHVybiIsInRleHRDb250ZW50IiwibWFya1NxdWFyZSIsInBsYXllck1vdmUiLCJldmVudCIsInBsYXllclRhcmdldCIsInBsYXllckF0dGFjayIsImF0dGFjayIsIkFJTW92ZSIsImFyZUFsbFN1bmsiLCJBSVRhcmdldCIsIkFJQXR0YWNrIiwic2V0VGltZW91dCIsImFsZXJ0IiwiaXNFcXVhbCIsIkdhbWVib2FyZCIsIm1pc3NlZFNob3RzIiwiU2V0IiwiaXNJbkFuQXJyYXkiLCJhcnJheSIsInNvbWUiLCJlbCIsImdlbmVyYXRlSWxsZWdhbE1vdmVzIiwiaWxsZWdhbFBvc3NpYmlsaXRlcyIsImlsbGVnYWxTZXQiLCJpbGxlZ2FsVmFyaWFudCIsImlsbGVnYWxNb3ZlIiwiU3RyaW5nIiwiaWxsZWdhbE1vdmVzIiwiaGFzIiwicmVjZWl2ZUF0dGFjayIsImluZGV4T2ZTaGlwIiwiY2hlY2tIaXQiLCJ1bmRlZmluZWQiLCJzaGlwSW5MaXN0Iiwic3VuayIsImluZGV4Iiwib2JqZWN0IiwiZXZlcnkiLCJnZXRSYW5kb21JbmRleCIsImluZGV4QXJyYXkiLCJnZXRSYW5kb21BbGlnbm1lbnQiLCJhbGlnbm1lbnRzIiwiZ2V0SW5pdGlhbEJvYXJkU3F1YXJlIiwiaW5pdGlhbEJvYXJkU3F1YXJlIiwiaG9yaXpvbnRhbENvb3JkIiwiZ2V0UmFuZG9tUGxhY2VtZW50IiwiaW5pdGlhbENvb3JkIiwicmFuZG9tSW5kZXgiLCJzaGlwSGVscGVyIiwiZW5lbXkiXSwic291cmNlUm9vdCI6IiJ9