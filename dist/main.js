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
myGameHandler.players.AI.board.placeShip(4, "battleship", [[5, 2], [5, 3], [5, 4], [5, 5]]);
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
  AIBoard.addEventListener("mousedown", function (e) {
    if (myGameHandler.isGameOver() || myGameHandler.getTurn() === "ai") return;
    console.log(e.target);
    myGameHandler.startAttack(e);
    myGameHandler.canEndGame();
    console.log(myGameHandler.players.realPlayer.board.shipList);
  });
};
startBtn.addEventListener("click", function () {
  if (myGameHandler.canStartGame()) {
    attackingPhase();
  }
}, {
  once: true
});
shipsContainer.addEventListener("dragstart", function (e) {
  e.dataTransfer.setData("ship-length", e.target.dataset.length);
  e.dataTransfer.setData("ship-name", e.target.id);
  e.dataTransfer.setData("ship-alignment", e.target.dataset.alignment);
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
var resetBoard = function resetBoard() {
  myGameHandler = (0,_modules_gameHandler__WEBPACK_IMPORTED_MODULE_0__["default"])("test");
  classRemoval("anchored");
  classRemoval("removed", shipsContainer);
};
boardResetBtn.addEventListener("click", function () {
  resetBoard();
});

/* <!!!!!!!!!! Full Game Reset !!!!!!!!!!!> */

var startAttackingPhase = function startAttackingPhase() {
  AIBoard.classList.add("active");
  startBtn.addEventListener("click", function () {
    console.log(myGameHandler.canStartGame());
    if (myGameHandler.canStartGame()) {
      attackingPhase();
    }
  }, {
    once: true
  });
};
gameResetBtn.addEventListener("click", function () {
  resetBoard();
  classRemoval("hit");
  classRemoval("missed");
  myGameHandler.players.AI.board.placeShip(4, "battleship", [[5, 2], [5, 3], [5, 4], [5, 5]]);
  startAttackingPhase();
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
/* harmony export */   "getValidAttack": () => (/* binding */ getValidAttack),
/* harmony export */   "myNew2D": () => (/* binding */ myNew2D)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var convertInto2DArr = function convertInto2DArr(arr) {
  var new2DArr = [];
  while (arr.length) {
    new2DArr.push(arr.splice(0, 10));
  }
  return new2DArr;
};
var myNew2D = convertInto2DArr(_toConsumableArray(possibleAttacks));
console.log(possibleAttacks);
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
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.isequal */ "./node_modules/lodash.isequal/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _player_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player-factory */ "./src/modules/player-factory.js");
/* harmony import */ var _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gameHelpers/AI-possible-attacks */ "./src/gameHelpers/AI-possible-attacks.js");
/* harmony import */ var _gameHelpers_placement_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gameHelpers/placement-helpers */ "./src/gameHelpers/placement-helpers.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var playerBoardDOM = document.getElementById("player-board");
var AIBoardDOM = document.getElementById("ai-board");
var resultDisplay = document.getElementById("display");
var gameHandler = function gameHandler(playerName) {
  var playerTurn = "realPlayer";
  var players = {
    realPlayer: (0,_player_factory__WEBPACK_IMPORTED_MODULE_1__["default"])(playerName),
    AI: (0,_player_factory__WEBPACK_IMPORTED_MODULE_1__["default"])("AI")
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
  var AIPossibleAttacks = _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_2__["default"];
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
  var displayAttackResult = function displayAttackResult(_ref, turn) {
    var hit = _ref.hit,
      sunk = _ref.sunk,
      name = _ref.name;
    var whoseTurn = turn;
    console.log("?", whoseTurn);
    if (whoseTurn === "realPlayer") {
      if (hit === false) resultDisplay.textContent = "Your shot missed";else if (hit === true && sunk === false) resultDisplay.textContent = "Your shot was a hit!";else if (hit === true && sunk === true) resultDisplay.textContent = "You sunk enemy's ".concat(name, "!");
    } else if (whoseTurn === "ai") {
      if (hit === false) resultDisplay.textContent = "Computer's shot missed";else if (hit === true && sunk === false) resultDisplay.textContent = "Computer hit one of your ships!";else resultDisplay.textContent = "Computer sunk your ".concat(name, "!");
    }
  };
  var markSquare = function markSquare(coordinate, _ref2, turn) {
    var hit = _ref2.hit;
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
    displayAttackResult(playerAttack, getTurn());
    markSquare(playerTarget, playerAttack, getTurn());
    changeTurn();
  };
  var AIMove = function AIMove() {
    if (players.AI.board.areAllSunk()) return;
    var AITarget = (0,_gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_2__.getValidAttack)(AIPossibleAttacks);
    var AIAttack = players.AI.attack(players.realPlayer, AITarget);
    setTimeout(function () {
      markSquare(AITarget, AIAttack, getTurn());
    }, 500);
    setTimeout(function () {
      displayAttackResult(AIAttack, getTurn());
    }, 700);
    setTimeout(function () {
      changeTurn();
      AIBoardDOM.classList.add("active");
    }, 850);
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
  var getRandomShipHelper = function getRandomShipHelper(shipCollectionHelper) {
    return shipCollectionHelper[getRandomIndex()];
  };
  var initialBoardSquare = function initialBoardSquare(shipLength, alignment) {
    // Prevent from going out of bounds
    var initialBoardSquare;
    while (initialBoardSquare === undefined || unavailableCoords.has(String(initialBoardSquare))) {
      if (alignment === "horizontal") {
        var horizontalCoord = board[Math.floor(Math.random() * (board.length - shipLength))];
        if (horizontalCoord[1] + shipLength <= 10) initialBoardSquare = horizontalCoord;
      } else {
        var _horizontalCoord = board[Math.floor(Math.random() * ((shipLength + 1) * 10))];
        if (_horizontalCoord[0] + shipLength <= 10) initialBoardSquare = _horizontalCoord;
      }
    }
    return initialBoardSquare;
  };
  var getRandomPlacement = function getRandomPlacement(shipLength) {
    var placement = [];
    while (placement.length <= 1) {
      var alignment = getRandomAlignment();
      var initialCoord = initialBoardSquare(shipLength, alignment);
      placement.push(initialCoord);
      for (var index = 1; index < shipLength; index++) {
        var lastItem = placement[placement.length - 1];
        if (alignment === "horizontal") placement.push([lastItem[0], lastItem[1] + 1]);else placement.push([lastItem[0] + 1, lastItem[1]]);
      }
      if (isInIllegalCoords(placement)) placement.splice(0);
    }
    generateIllegalMoves(placement);
    return placement;
  };
  var randomlyPlaceShip = function randomlyPlaceShip() {
    var indexArray = [0, 1, 2, 3, 4];
    var randomIndex = getRandomIndex(indexArray);
    var randomShipHelper = _gameHelpers_placement_helpers__WEBPACK_IMPORTED_MODULE_3__.shipArray[randomIndex];
    placeShip(4, "battleship", [[5, 2], [5, 3], [5, 4], [5, 5]]);
  };
  return {
    shipList: shipList,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    missedShots: missedShots,
    areAllSunk: areAllSunk,
    unavailableCoords: unavailableCoords,
    isInIllegalCoords: isInIllegalCoords,
    randomlyPlaceShip: randomlyPlaceShip
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "main {\n  width: 850px;\n  height: 400px;\n  margin: 0 auto;\n  display: block;\n  display: flex;\n}\n#display {\n  width: 400px;\n  height: 100px;\n  margin: 0 auto;\n}\n#player-board,\n#ai-board,\n#place-ship-board {\n  width: 400px;\n  height: 400px;\n  border: 1px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.square {\n  border: 1px solid black;\n}\n.active > div:hover {\n  background-color: purple;\n  cursor: pointer;\n}\n.missed {\n  background-color: grey;\n}\n\n.anchored {\n  background-color: green;\n}\n\n.hit {\n  background-color: red;\n}\n\n.dragover {\n  background-color: purple;\n}\n.removed {\n  opacity: 0.2;\n}\n.outOfBounds {\n  background-color: gray;\n}\n#board-creator {\n  display: grid;\n  width: 80vw;\n  grid-template-columns: 1fr 1fr;\n}\n\n#ships-container {\n  display: grid;\n}\n.ship {\n  display: grid;\n  grid-auto-flow: column;\n  max-height: 40px;\n  max-width: fit-content;\n}\n.block {\n  border: 1px solid black;\n  width: 40px;\n}\n.hidden {\n  display: none;\n}\n\n#place-ship-board .square:-moz-drag-over {\n  background-color: purple;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,cAAc;EACd,cAAc;EACd,aAAa;AACf;AACA;EACE,YAAY;EACZ,aAAa;EACb,cAAc;AAChB;AACA;;;EAGE,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,uBAAuB;AACzB;AACA;EACE,wBAAwB;EACxB,eAAe;AACjB;AACA;EACE,sBAAsB;AACxB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;AAC1B;AACA;EACE,YAAY;AACd;AACA;EACE,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,WAAW;EACX,8BAA8B;AAChC;;AAEA;EACE,aAAa;AACf;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,gBAAgB;EAChB,sBAAsB;AACxB;AACA;EACE,uBAAuB;EACvB,WAAW;AACb;AACA;EACE,aAAa;AACf;;AAEA;EACE,wBAAwB;AAC1B","sourcesContent":["main {\n  width: 850px;\n  height: 400px;\n  margin: 0 auto;\n  display: block;\n  display: flex;\n}\n#display {\n  width: 400px;\n  height: 100px;\n  margin: 0 auto;\n}\n#player-board,\n#ai-board,\n#place-ship-board {\n  width: 400px;\n  height: 400px;\n  border: 1px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.square {\n  border: 1px solid black;\n}\n.active > div:hover {\n  background-color: purple;\n  cursor: pointer;\n}\n.missed {\n  background-color: grey;\n}\n\n.anchored {\n  background-color: green;\n}\n\n.hit {\n  background-color: red;\n}\n\n.dragover {\n  background-color: purple;\n}\n.removed {\n  opacity: 0.2;\n}\n.outOfBounds {\n  background-color: gray;\n}\n#board-creator {\n  display: grid;\n  width: 80vw;\n  grid-template-columns: 1fr 1fr;\n}\n\n#ships-container {\n  display: grid;\n}\n.ship {\n  display: grid;\n  grid-auto-flow: column;\n  max-height: 40px;\n  max-width: fit-content;\n}\n.block {\n  border: 1px solid black;\n  width: 40px;\n}\n.hidden {\n  display: none;\n}\n\n#place-ship-board .square:-moz-drag-over {\n  background-color: purple;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameHelpers/AI-possible-attacks */ "./src/gameHelpers/AI-possible-attacks.js");





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsR0FBRztBQUNkLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FvQjtBQUNTO0FBQ0w7QUFDSyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL0RPTS9ET01FdmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvRE9NL2NyZWF0ZUJvYXJkRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL0RPTS9kcmFnRHJvcFNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVIZWxwZXJzL0FJLXBvc3NpYmxlLWF0dGFja3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZUhlbHBlcnMvcGxhY2VtZW50LWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbW9kdWxlcy9iYXR0bGVzaGlwLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbW9kdWxlcy9nYW1lSGFuZGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9tb2R1bGVzL3BsYXllci1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZUhhbmRsZXIgZnJvbSBcIi4uL21vZHVsZXMvZ2FtZUhhbmRsZXJcIjtcblxuY29uc3QgQUlCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWktYm9hcmRcIik7XG5jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLWJvYXJkXCIpO1xuY29uc3QgYm9hcmRGb3JQbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLXNoaXAtYm9hcmRcIik7XG5jb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0XCIpO1xuY29uc3QgYm9hcmRSZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQtcmVzZXRcIik7XG5jb25zdCBnYW1lUmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dhbWUtcmVzZXRcIik7XG5jb25zdCBhbGlnbm1lbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FsaWdubWVudC1idG5cIik7XG5cbmxldCBteUdhbWVIYW5kbGVyID0gZ2FtZUhhbmRsZXIoXCJ0ZXN0XCIpO1xubXlHYW1lSGFuZGxlci5wbGF5ZXJzLkFJLmJvYXJkLnBsYWNlU2hpcCg0LCBcImJhdHRsZXNoaXBcIiwgW1xuICBbNSwgMl0sXG4gIFs1LCAzXSxcbiAgWzUsIDRdLFxuICBbNSwgNV0sXG5dKTtcblxuY29uc3QgcmVuZGVyUGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllclNoaXBzID0gbXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuc2hpcExpc3Q7XG4gIHBsYXllclNoaXBzLmZvckVhY2goKHNoaXBPYmopID0+IHtcbiAgICBzaGlwT2JqLmNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCBjb29yZE9uUGxheWVyQm9hcmQgPSBwbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEteD1cIiR7Y29vcmRbMF19XCJdW2RhdGEteT1cIiR7Y29vcmRbMV19XCJdYFxuICAgICAgKTtcbiAgICAgIGNvb3JkT25QbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yZWRcIik7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuYWxpZ25tZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGxldCBhbGlnbm1lbnRTdGF0ZSA9IHNoaXBzQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQuYWxpZ25tZW50O1xuICBpZiAoYWxpZ25tZW50U3RhdGUgPT09IFwiaG9yaXpvbnRhbFwiKSBhbGlnbm1lbnRTdGF0ZSA9IFwidmVydGljYWxcIjtcbiAgZWxzZSBhbGlnbm1lbnRTdGF0ZSA9IFwiaG9yaXpvbnRhbFwiO1xuXG4gIGNvbnN0IGV2ZXJ5U2hpcCA9IEFycmF5LmZyb20oc2hpcHNDb250YWluZXIuY2hpbGRyZW4pO1xuICBldmVyeVNoaXAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuZGF0YXNldC5hbGlnbm1lbnQgPSBhbGlnbm1lbnRTdGF0ZSkpO1xufSk7XG5cbmNvbnN0IGF0dGFja2luZ1BoYXNlID0gKCkgPT4ge1xuICBBSUJvYXJkLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIHJlbmRlclBsYXllclNoaXBzKCk7XG4gIEFJQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgIGlmIChteUdhbWVIYW5kbGVyLmlzR2FtZU92ZXIoKSB8fCBteUdhbWVIYW5kbGVyLmdldFR1cm4oKSA9PT0gXCJhaVwiKSByZXR1cm47XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgIG15R2FtZUhhbmRsZXIuc3RhcnRBdHRhY2soZSk7XG4gICAgbXlHYW1lSGFuZGxlci5jYW5FbmRHYW1lKCk7XG4gICAgY29uc29sZS5sb2cobXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuc2hpcExpc3QpO1xuICB9KTtcbn07XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiY2xpY2tcIixcbiAgKCkgPT4ge1xuICAgIGlmIChteUdhbWVIYW5kbGVyLmNhblN0YXJ0R2FtZSgpKSB7XG4gICAgICBhdHRhY2tpbmdQaGFzZSgpO1xuICAgIH1cbiAgfSxcbiAgeyBvbmNlOiB0cnVlIH1cbik7XG5cbnNoaXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInNoaXAtbGVuZ3RoXCIsIGUudGFyZ2V0LmRhdGFzZXQubGVuZ3RoKTtcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInNoaXAtbmFtZVwiLCBlLnRhcmdldC5pZCk7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJzaGlwLWFsaWdubWVudFwiLCBlLnRhcmdldC5kYXRhc2V0LmFsaWdubWVudCk7XG59KTtcblxuYm9hcmRGb3JQbGFjZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gIGlmIChcbiAgICBlLnRhcmdldC5pZCA9PT0gXCJwbGFjZS1zaGlwLWJvYXJkXCIgfHxcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmNob3JlZFwiKVxuICApXG4gICAgcmV0dXJuO1xuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZHJhZ292ZXJcIik7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5ib2FyZEZvclBsYWNlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJwbGFjZS1zaGlwLWJvYXJkXCIpIHJldHVybjtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdvdmVyXCIpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuY29uc3QgYWRkQW5jaG9yZWRDbGFzcyA9IChzaGlwUGxhY2VtZW50KSA9PiB7XG4gIHNoaXBQbGFjZW1lbnQuZm9yRWFjaCgocGxhY2VtZW50KSA9PiB7XG4gICAgY29uc3QgcGxhY2VtZW50SW5ET00gPSBib2FyZEZvclBsYWNlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLXg9XCIke3BsYWNlbWVudFswXX1cIl1bZGF0YS15PVwiJHtwbGFjZW1lbnRbMV19XCJdYFxuICAgICk7XG4gICAgcGxhY2VtZW50SW5ET00uY2xhc3NMaXN0LmFkZChcImFuY2hvcmVkXCIpO1xuICB9KTtcbn07XG5cbmJvYXJkRm9yUGxhY2VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnb3ZlclwiKTtcbiAgY29uc3Qgb2JqZWN0RGF0YSA9IHtcbiAgICBsZW5ndGg6IE51bWJlcihlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwic2hpcC1sZW5ndGhcIikpLFxuICAgIG5hbWU6IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJzaGlwLW5hbWVcIiksXG4gICAgYWxpZ25tZW50OiBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwic2hpcC1hbGlnbm1lbnRcIiksXG4gIH07XG4gIGNvbnNvbGUubG9nKG9iamVjdERhdGEpO1xuICBjb25zdCBjaG9zZW5Db29yZGluYXRlID0gW1xuICAgIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LngpLFxuICAgIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnkpLFxuICBdO1xuICBjb25zdCBzaGlwTG9jYXRpb24gPSBteUdhbWVIYW5kbGVyLmFuY2hvckFTaGlwKGNob3NlbkNvb3JkaW5hdGUsIG9iamVjdERhdGEpO1xuICBpZiAoc2hpcExvY2F0aW9uKSB7XG4gICAgYWRkQW5jaG9yZWRDbGFzcyhzaGlwTG9jYXRpb24pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke29iamVjdERhdGEubmFtZX1gKS5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlZFwiKTtcbiAgICBjb25zb2xlLmxvZyhteUdhbWVIYW5kbGVyLnBsYXllcnMucmVhbFBsYXllci5ib2FyZC51bmF2YWlsYWJsZUNvb3JkcylcbiAgfVxufSk7XG5cbmNvbnN0IGNsYXNzUmVtb3ZhbCA9IChjbGFzc05hbWUsIGNvbnRhaW5lciA9IGRvY3VtZW50KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRzVG9DbGVhciA9IEFycmF5LmZyb20oXG4gICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NsYXNzTmFtZX1gKVxuICApO1xuICBlbGVtZW50c1RvQ2xlYXIuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSkpO1xufTtcblxuY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgbXlHYW1lSGFuZGxlciA9IGdhbWVIYW5kbGVyKFwidGVzdFwiKTtcbiAgY2xhc3NSZW1vdmFsKFwiYW5jaG9yZWRcIik7XG4gIGNsYXNzUmVtb3ZhbChcInJlbW92ZWRcIiwgc2hpcHNDb250YWluZXIpO1xufTtcblxuYm9hcmRSZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZXNldEJvYXJkKCk7XG59KTtcblxuLyogPCEhISEhISEhISEgRnVsbCBHYW1lIFJlc2V0ICEhISEhISEhISEhPiAqL1xuXG5jb25zdCBzdGFydEF0dGFja2luZ1BoYXNlID0gKCkgPT4ge1xuICBBSUJvYXJkLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKG15R2FtZUhhbmRsZXIuY2FuU3RhcnRHYW1lKCkpO1xuICAgICAgaWYgKG15R2FtZUhhbmRsZXIuY2FuU3RhcnRHYW1lKCkpIHtcbiAgICAgICAgYXR0YWNraW5nUGhhc2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG59O1xuXG5nYW1lUmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVzZXRCb2FyZCgpO1xuICBjbGFzc1JlbW92YWwoXCJoaXRcIik7XG4gIGNsYXNzUmVtb3ZhbChcIm1pc3NlZFwiKTtcblxuICBteUdhbWVIYW5kbGVyLnBsYXllcnMuQUkuYm9hcmQucGxhY2VTaGlwKDQsIFwiYmF0dGxlc2hpcFwiLCBbXG4gICAgWzUsIDJdLFxuICAgIFs1LCAzXSxcbiAgICBbNSwgNF0sXG4gICAgWzUsIDVdLFxuICBdKTtcbiAgc3RhcnRBdHRhY2tpbmdQaGFzZSgpO1xufSk7XG4iLCJpbXBvcnQgcG9zc2libGVBdHRhY2tzIGZyb20gXCIuLi9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG5jb25zdCBBSUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhaS1ib2FyZFwiKTtcbmNvbnN0IGJvYXJkRm9yUGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwLWJvYXJkXCIpO1xuXG5cbmNvbnN0IGNyZWF0ZUJvYXJkcyA9IChjb29yZGluYXRlcykgPT4ge1xuICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICBzcXVhcmUuZGF0YXNldC54ID0gY29vcmRpbmF0ZVswXTtcbiAgICBzcXVhcmUuZGF0YXNldC55ID0gY29vcmRpbmF0ZVsxXTtcbiAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIGxldCBzcXVhcmVDbG9uZTEgPSBzcXVhcmUuY2xvbmVOb2RlKCk7XG4gICAgQUlCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmVDbG9uZTEpOyBcbiAgICBsZXQgc3F1YXJlQ2xvbmUyID0gc3F1YXJlLmNsb25lTm9kZSgpO1xuICAgIGJvYXJkRm9yUGxhY2VtZW50LmFwcGVuZENoaWxkKHNxdWFyZUNsb25lMik7XG5cbiAgfSk7XG59O1xuXG5jcmVhdGVCb2FyZHMocG9zc2libGVBdHRhY2tzKTtcblxuLypcbiAqL1xuIiwiY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG5cbmNvbnN0IGdlbmVyYXRlU2hpcEJsb2NrcyA9ICgpID0+IHtcbiAgQXJyYXkuZnJvbShzaGlwcykuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBOdW1iZXIoc2hpcC5kYXRhc2V0Lmxlbmd0aCk7XG4gICAgc2hpcC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICAgIHNoaXAuZGF0YXNldC5hbGlnbm1lbnQgPSBcImhvcml6b250YWxcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2hpcEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNoaXBCbG9jay5jbGFzc0xpc3QuYWRkKFwiYmxvY2tcIik7XG4gICAgICBzaGlwLmFwcGVuZENoaWxkKHNoaXBCbG9jayk7XG4gICAgfVxuICB9KTtcbn07XG5nZW5lcmF0ZVNoaXBCbG9ja3MoKTtcbiIsImNvbnN0IGNyZWF0ZUFycmF5T2ZBdHRhY2tzID0gKCkgPT4ge1xuICBjb25zdCBhdHRhY2tzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgbGV0IHhDb29yZGluYXRlID0gaTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGxldCB5Q29vcmRpbmF0ZSA9IGo7XG4gICAgICBhdHRhY2tzLnB1c2goW3hDb29yZGluYXRlLCB5Q29vcmRpbmF0ZV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXR0YWNrcztcbn07XG5cbmNvbnN0IHBvc3NpYmxlQXR0YWNrcyA9IGNyZWF0ZUFycmF5T2ZBdHRhY2tzKCk7XG5cbmNvbnN0IGdldFZhbGlkQXR0YWNrID0gKGF0dGFja3NBcnJheSkgPT5cbiAgYXR0YWNrc0FycmF5XG4gICAgLnNwbGljZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdHRhY2tzQXJyYXkubGVuZ3RoKSwgMSlcbiAgICAuZmxhdCgpO1xuXG5jb25zdCBjb252ZXJ0SW50bzJEQXJyID0gKGFycikgPT4ge1xuICBjb25zdCBuZXcyREFyciA9IFtdO1xuICB3aGlsZSAoYXJyLmxlbmd0aCkge1xuICAgIG5ldzJEQXJyLnB1c2goYXJyLnNwbGljZSgwLCAxMCkpO1xuICB9XG4gIHJldHVybiBuZXcyREFycjtcbn07XG5cbmNvbnN0IG15TmV3MkQgPSBjb252ZXJ0SW50bzJEQXJyKFsuLi5wb3NzaWJsZUF0dGFja3NdKVxuY29uc29sZS5sb2cocG9zc2libGVBdHRhY2tzKVxuZXhwb3J0IGRlZmF1bHQgcG9zc2libGVBdHRhY2tzO1xuZXhwb3J0IHsgZ2V0VmFsaWRBdHRhY2ssIG15TmV3MkQgfTtcbiIsIlxuICBjb25zdCBpbGxlZ2FsVmFyaWFudHMgPSBbXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgLTFdLFxuICAgIFstMSwgMF0sXG4gICAgWzEsIDBdLFxuICAgIFswLCAxXSxcbiAgICBbLTEsICsxXSxcbiAgICBbMSwgMV0sXG4gIF07XG5cbmNvbnN0IHNoaXBBcnJheSA9IFtcbiAge1xuICAgIG5hbWU6IFwiZGVzdHJveWVyXCIsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdWJtYXJpbmVcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNydWlzZXJcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJhdHRsZXNoaXBcIixcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNhcnJpZXJcIixcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG5dO1xuXG5leHBvcnQge2lsbGVnYWxWYXJpYW50cywgc2hpcEFycmF5fSIsImNvbnN0IFNoaXAgPSAobGVuZ3RoLCBuYW1lKSA9PiB7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gIGxldCBoaXRzVGFrZW4gPSAwO1xuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgaGl0c1Rha2VuICs9IDE7XG4gIH07XG4gIGNvbnN0IGdldEhpdHNUYWtlbiA9ICgpID0+IGhpdHNUYWtlbjtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBoaXRzVGFrZW4gPj0gbGVuZ3RoO1xuXG4gIHJldHVybiB7IGdldExlbmd0aCwgZ2V0TmFtZSwgaGl0LCBnZXRIaXRzVGFrZW4sIGlzU3VuayB9O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IGlzRXF1YWwgZnJvbSBcImxvZGFzaC5pc2VxdWFsXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllci1mYWN0b3J5XCI7XG5pbXBvcnQgcG9zc2libGVBdHRhY2tzLCB7XG4gIGdldFZhbGlkQXR0YWNrLFxufSBmcm9tIFwiLi4vZ2FtZUhlbHBlcnMvQUktcG9zc2libGUtYXR0YWNrc1wiO1xuaW1wb3J0IHsgaWxsZWdhbFZhcmlhbnRzIH0gZnJvbSBcIi4uL2dhbWVIZWxwZXJzL3BsYWNlbWVudC1oZWxwZXJzXCI7XG5cbmNvbnN0IHBsYXllckJvYXJkRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG5jb25zdCBBSUJvYXJkRE9NID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhaS1ib2FyZFwiKTtcbmNvbnN0IHJlc3VsdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXlcIik7XG5cbmNvbnN0IGdhbWVIYW5kbGVyID0gKHBsYXllck5hbWUpID0+IHtcbiAgbGV0IHBsYXllclR1cm4gPSBcInJlYWxQbGF5ZXJcIjtcbiAgY29uc3QgcGxheWVycyA9IHtcbiAgICByZWFsUGxheWVyOiBQbGF5ZXIocGxheWVyTmFtZSksXG4gICAgQUk6IFBsYXllcihcIkFJXCIpLFxuICB9O1xuXG4gIC8vIFNoaXAgcGxhY2VtZW50XG4gIC8qIGxldCBpbGxlZ2FsU2hpcFBsYWNlbWVudHMgPSBuZXcgU2V0KCk7ICovXG5cbiAgLy8gQ2hlY2sgaWYgeSBheGlzIGlzIG91dCBvZiBib3VuZFxuXG4gIGNvbnN0IGlzT3V0T2ZCb3VuZHMgPSAoY29vcmRpbmF0ZSwgc2hpcExlbmd0aCwgYWxpZ25tZW50ID0gXCJob3Jpem9udGFsXCIpID0+XG4gICAgYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIlxuICAgICAgPyBjb29yZGluYXRlWzFdICsgc2hpcExlbmd0aCA+IDEwXG4gICAgICA6IGNvb3JkaW5hdGVbMF0gKyBzaGlwTGVuZ3RoID4gMTA7XG5cbiAgY29uc3QgZ2VuZXJhdGVQbGFjZW1lbnQgPSAoXG4gICAgY29vcmRpbmF0ZSxcbiAgICBzaGlwTGVuZ3RoLFxuICAgIGFsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiXG4gICkgPT4ge1xuICAgIGNvbnN0IHNoaXBQbGFjZW1lbnQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gXCJob3Jpem9udGFsXCIpXG4gICAgICAgIHNoaXBQbGFjZW1lbnQucHVzaChbY29vcmRpbmF0ZVswXSwgY29vcmRpbmF0ZVsxXSArIGldKTtcbiAgICAgIGVsc2Ugc2hpcFBsYWNlbWVudC5wdXNoKFtjb29yZGluYXRlWzBdICsgaSwgY29vcmRpbmF0ZVsxXV0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcFBsYWNlbWVudDtcbiAgfTtcbiAgLyogXG4gIGNvbnN0IGlzSW5BbkFycmF5ID0gKGFycmF5LCBlbGVtZW50KSA9PlxuICAgIGFycmF5LnNvbWUoKGVsKSA9PiBpc0VxdWFsKGVsLCBlbGVtZW50KSk7ICovXG5cbiAgY29uc3QgaXNTaGlwUGxhY2VkID0gKG5hbWUsIHNoaXBMaXN0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yIChjb25zdCBzaGlwT2JqZWN0IG9mIHNoaXBMaXN0KSB7XG4gICAgICBpZiAoc2hpcE9iamVjdC5zaGlwLmdldE5hbWUoKSA9PT0gbmFtZSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBhbmNob3JBU2hpcCA9IChjaG9zZW5Db29yZGluYXRlLCBzaGlwRGF0YSkgPT4ge1xuICAgIGlmIChpc091dE9mQm91bmRzKGNob3NlbkNvb3JkaW5hdGUsIHNoaXBEYXRhLmxlbmd0aCwgc2hpcERhdGEuYWxpZ25tZW50KSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBzaGlwUGxhY2VtZW50ID0gZ2VuZXJhdGVQbGFjZW1lbnQoXG4gICAgICBjaG9zZW5Db29yZGluYXRlLFxuICAgICAgc2hpcERhdGEubGVuZ3RoLFxuICAgICAgc2hpcERhdGEuYWxpZ25tZW50XG4gICAgKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllcnMucmVhbFBsYXllci5ib2FyZDtcbiAgICBpZiAoXG4gICAgICBpc1NoaXBQbGFjZWQoc2hpcERhdGEubmFtZSwgcGxheWVyQm9hcmQuc2hpcExpc3QpIHx8XG4gICAgICBwbGF5ZXJCb2FyZC5pc0luSWxsZWdhbENvb3JkcyhzaGlwUGxhY2VtZW50KVxuICAgIClcbiAgICAgIHJldHVybjtcblxuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwRGF0YS5sZW5ndGgsIHNoaXBEYXRhLm5hbWUsIHNoaXBQbGFjZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkLnNoaXBMaXN0KTtcbiAgICByZXR1cm4gc2hpcFBsYWNlbWVudDtcbiAgfTtcblxuICBjb25zdCBjYW5TdGFydEdhbWUgPSAoKSA9PlxuICAgIHBsYXllcnMucmVhbFBsYXllci5ib2FyZC5zaGlwTGlzdC5sZW5ndGggPT09IDU7IC8qICAmJlxuICAgIHBsYXllcnMuQUkuYm9hcmQuc2hpcExpc3QubGVuZ3RoID09PSA1OyAqL1xuXG4gIC8vIEdhbWUgbG9vcFxuICBjb25zdCBBSVBvc3NpYmxlQXR0YWNrcyA9IHBvc3NpYmxlQXR0YWNrcztcbiAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHBsYXllclR1cm47XG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllclR1cm4gPT09IFwicmVhbFBsYXllclwiKSBwbGF5ZXJUdXJuID0gXCJhaVwiO1xuICAgIGVsc2UgcGxheWVyVHVybiA9IFwicmVhbFBsYXllclwiO1xuICAgIHJldHVybiBwbGF5ZXJUdXJuO1xuICB9O1xuXG4gIGNvbnN0IGNvbnZlcnRUb0Nvb3JkaW5hdGUgPSAodGFyZ2V0KSA9PiBbXG4gICAgTnVtYmVyKHRhcmdldC5kYXRhc2V0LngpLFxuICAgIE51bWJlcih0YXJnZXQuZGF0YXNldC55KSxcbiAgXTtcblxuICBjb25zdCBkaXNwbGF5QXR0YWNrUmVzdWx0ID0gKHsgaGl0LCBzdW5rLCBuYW1lIH0sIHR1cm4pID0+IHtcbiAgICBjb25zdCB3aG9zZVR1cm4gPSB0dXJuO1xuICAgIGNvbnNvbGUubG9nKFwiP1wiLCB3aG9zZVR1cm4pO1xuICAgIGlmICh3aG9zZVR1cm4gPT09IFwicmVhbFBsYXllclwiKSB7XG4gICAgICBpZiAoaGl0ID09PSBmYWxzZSkgcmVzdWx0RGlzcGxheS50ZXh0Q29udGVudCA9IFwiWW91ciBzaG90IG1pc3NlZFwiO1xuICAgICAgZWxzZSBpZiAoaGl0ID09PSB0cnVlICYmIHN1bmsgPT09IGZhbHNlKVxuICAgICAgICByZXN1bHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJZb3VyIHNob3Qgd2FzIGEgaGl0IVwiO1xuICAgICAgZWxzZSBpZiAoaGl0ID09PSB0cnVlICYmIHN1bmsgPT09IHRydWUpXG4gICAgICAgIHJlc3VsdERpc3BsYXkudGV4dENvbnRlbnQgPSBgWW91IHN1bmsgZW5lbXkncyAke25hbWV9IWA7XG4gICAgfSBlbHNlIGlmICh3aG9zZVR1cm4gPT09IFwiYWlcIikge1xuICAgICAgaWYgKGhpdCA9PT0gZmFsc2UpIHJlc3VsdERpc3BsYXkudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyJ3Mgc2hvdCBtaXNzZWRcIjtcbiAgICAgIGVsc2UgaWYgKGhpdCA9PT0gdHJ1ZSAmJiBzdW5rID09PSBmYWxzZSlcbiAgICAgICAgcmVzdWx0RGlzcGxheS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIgaGl0IG9uZSBvZiB5b3VyIHNoaXBzIVwiO1xuICAgICAgZWxzZSByZXN1bHREaXNwbGF5LnRleHRDb250ZW50ID0gYENvbXB1dGVyIHN1bmsgeW91ciAke25hbWV9IWA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG1hcmtTcXVhcmUgPSAoY29vcmRpbmF0ZSwgeyBoaXQgfSwgdHVybikgPT4ge1xuICAgIGxldCB0YXJnZXQ7XG4gICAgaWYgKHR1cm4gPT09IFwicmVhbFBsYXllclwiKSB7XG4gICAgICB0YXJnZXQgPSBBSUJvYXJkRE9NLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZVswXX1cIl1bZGF0YS15PVwiJHtjb29yZGluYXRlWzFdfVwiXWBcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0dXJuID09PSBcImFpXCIpIHtcbiAgICAgIHRhcmdldCA9IHBsYXllckJvYXJkRE9NLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuc3F1YXJlW2RhdGEteD1cIiR7Y29vcmRpbmF0ZVswXX1cIl1bZGF0YS15PVwiJHtjb29yZGluYXRlWzFdfVwiXWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGhpdCA9PT0gdHJ1ZSkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgZWxzZSB0YXJnZXQuY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgfTtcblxuICBjb25zdCBwbGF5ZXJNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgQUlCb2FyZERPTS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGNvbnN0IHBsYXllclRhcmdldCA9IGNvbnZlcnRUb0Nvb3JkaW5hdGUoZXZlbnQudGFyZ2V0KTtcbiAgICBjb25zdCBwbGF5ZXJBdHRhY2sgPSBwbGF5ZXJzLnJlYWxQbGF5ZXIuYXR0YWNrKHBsYXllcnMuQUksIHBsYXllclRhcmdldCk7XG4gICAgZGlzcGxheUF0dGFja1Jlc3VsdChwbGF5ZXJBdHRhY2ssIGdldFR1cm4oKSk7XG4gICAgbWFya1NxdWFyZShwbGF5ZXJUYXJnZXQsIHBsYXllckF0dGFjaywgZ2V0VHVybigpKTtcbiAgICBjaGFuZ2VUdXJuKCk7XG4gIH07XG5cbiAgY29uc3QgQUlNb3ZlID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXJzLkFJLmJvYXJkLmFyZUFsbFN1bmsoKSkgcmV0dXJuO1xuICAgIGNvbnN0IEFJVGFyZ2V0ID0gZ2V0VmFsaWRBdHRhY2soQUlQb3NzaWJsZUF0dGFja3MpO1xuICAgIGNvbnN0IEFJQXR0YWNrID0gcGxheWVycy5BSS5hdHRhY2socGxheWVycy5yZWFsUGxheWVyLCBBSVRhcmdldCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG1hcmtTcXVhcmUoQUlUYXJnZXQsIEFJQXR0YWNrLCBnZXRUdXJuKCkpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRpc3BsYXlBdHRhY2tSZXN1bHQoQUlBdHRhY2ssIGdldFR1cm4oKSk7XG4gICAgfSwgNzAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2hhbmdlVHVybigpO1xuICAgICAgQUlCb2FyZERPTS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH0sIDg1MCk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRBdHRhY2sgPSAoZSkgPT4ge1xuICAgIGlmIChcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NlZFwiKSB8fFxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8XG4gICAgICBnZXRUdXJuKCkgPT09IFwiYWlcIiB8fFxuICAgICAgcGxheWVycy5BSS5ib2FyZC5hcmVBbGxTdW5rKCkgfHxcbiAgICAgIHBsYXllcnMucmVhbFBsYXllci5ib2FyZC5hcmVBbGxTdW5rKClcbiAgICApXG4gICAgICByZXR1cm47XG4gICAgcGxheWVyTW92ZShlKTtcbiAgICBBSU1vdmUoKTtcbiAgfTtcblxuICBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT5cbiAgICBwbGF5ZXJzLkFJLmJvYXJkLmFyZUFsbFN1bmsoKSB8fCBwbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuYXJlQWxsU3VuaygpO1xuXG4gIGNvbnN0IGNhbkVuZEdhbWUgPSAoKSA9PiB7XG4gICAgLy8gSW1wbGVtZW50IG1vZGFsIHRvIHBvcCB1cCBpbnN0ZWFkIG9mIGFsdGVyXG4gICAgaWYgKGlzR2FtZU92ZXIoKSkge1xuICAgICAgaWYgKHBsYXllcnMuQUkuYm9hcmQuYXJlQWxsU3VuaygpKSBhbGVydChcIllvdSBoYXZlIHdvblwiKTtcbiAgICAgIGVsc2UgYWxlcnQoXCJBSSBoYXMgd29uIHdvblwiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydEF0dGFjayxcbiAgICBwbGF5ZXJzLFxuICAgIGFuY2hvckFTaGlwLFxuICAgIGNhblN0YXJ0R2FtZSxcbiAgICBpc091dE9mQm91bmRzLFxuICAgIGNhbkVuZEdhbWUsXG4gICAgaXNHYW1lT3ZlcixcbiAgICBnZXRUdXJuLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUhhbmRsZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IGlzRXF1YWwgZnJvbSBcImxvZGFzaC5pc2VxdWFsXCI7XG5pbXBvcnQgcG9zc2libGVBdHRhY2tzLCB7IG15TmV3MkQgfSBmcm9tIFwiLi4vZ2FtZUhlbHBlcnMvQUktcG9zc2libGUtYXR0YWNrc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vYmF0dGxlc2hpcC1mYWN0b3J5XCI7XG5pbXBvcnQgeyBpbGxlZ2FsVmFyaWFudHMsIHNoaXBBcnJheSB9IGZyb20gXCIuLi9nYW1lSGVscGVycy9wbGFjZW1lbnQtaGVscGVyc1wiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gWy4uLnBvc3NpYmxlQXR0YWNrc107XG4gIGNvbnN0IHNoaXBMaXN0ID0gW107XG4gIGNvbnN0IG1pc3NlZFNob3RzID0gbmV3IFNldCgpO1xuICBjb25zdCB1bmF2YWlsYWJsZUNvb3JkcyA9IG5ldyBTZXQoKTtcblxuICBjb25zdCBpc0luQW5BcnJheSA9IChhcnJheSwgZWxlbWVudCkgPT5cbiAgICBhcnJheS5zb21lKChlbCkgPT4gaXNFcXVhbChlbCwgZWxlbWVudCkpO1xuXG4gIGNvbnN0IGdlbmVyYXRlSWxsZWdhbE1vdmVzID0gKFxuICAgIGNvb3JkaW5hdGVzLFxuICAgIGlsbGVnYWxQb3NzaWJpbGl0ZXMgPSBpbGxlZ2FsVmFyaWFudHMsXG4gICAgaWxsZWdhbFNldCA9IHVuYXZhaWxhYmxlQ29vcmRzXG4gICkgPT4ge1xuICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlsbGVnYWxQb3NzaWJpbGl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaWxsZWdhbFZhcmlhbnQgPSBpbGxlZ2FsUG9zc2liaWxpdGVzW2ldO1xuICAgICAgICBjb25zdCBpbGxlZ2FsTW92ZSA9IFtcbiAgICAgICAgICBjb29yZFswXSArIGlsbGVnYWxWYXJpYW50WzBdLFxuICAgICAgICAgIGNvb3JkWzFdICsgaWxsZWdhbFZhcmlhbnRbMV0sXG4gICAgICAgIF07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbGxlZ2FsTW92ZVswXSA+PSAwICYmXG4gICAgICAgICAgaWxsZWdhbE1vdmVbMF0gPD0gOSAmJlxuICAgICAgICAgIGlsbGVnYWxNb3ZlWzFdID49IDAgJiZcbiAgICAgICAgICBpbGxlZ2FsTW92ZVsxXSA8PSA5ICYmXG4gICAgICAgICAgaXNJbkFuQXJyYXkoY29vcmRpbmF0ZXMsIGlsbGVnYWxNb3ZlKSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgICAgIGlsbGVnYWxTZXQuYWRkKFN0cmluZyhpbGxlZ2FsTW92ZSkpO1xuICAgICAgfVxuICAgICAgaWxsZWdhbFNldC5hZGQoU3RyaW5nKGNvb3JkKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaXNJbklsbGVnYWxDb29yZHMgPSAoXG4gICAgc2hpcFBsYWNlbWVudCxcbiAgICBpbGxlZ2FsTW92ZXMgPSB1bmF2YWlsYWJsZUNvb3Jkc1xuICApID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKGNvbnN0IHBsYWNlbWVudCBvZiBzaGlwUGxhY2VtZW50KSB7XG4gICAgICBpZiAoaWxsZWdhbE1vdmVzLmhhcyhTdHJpbmcocGxhY2VtZW50KSkpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGxlbmd0aCwgbmFtZSwgY29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBzaGlwT2JqZWN0ID0ge1xuICAgICAgc2hpcDogU2hpcChsZW5ndGgsIG5hbWUpLFxuICAgICAgY29vcmRpbmF0ZXMsXG4gICAgfTtcbiAgICBzaGlwTGlzdC5wdXNoKHNoaXBPYmplY3QpO1xuICAgIGdlbmVyYXRlSWxsZWdhbE1vdmVzKGNvb3JkaW5hdGVzLCBpbGxlZ2FsVmFyaWFudHMsIHVuYXZhaWxhYmxlQ29vcmRzKTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGUpID0+IHtcbiAgICBjb25zdCBpbmRleE9mU2hpcCA9IGNoZWNrSGl0KGNvb3JkaW5hdGUpO1xuICAgIGlmIChpbmRleE9mU2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzaGlwSW5MaXN0ID0gc2hpcExpc3RbaW5kZXhPZlNoaXBdO1xuICAgICAgc2hpcEluTGlzdC5zaGlwLmhpdCgpO1xuICAgICAgaWYgKHNoaXBJbkxpc3Quc2hpcC5pc1N1bmsoKSlcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoaXQ6IHRydWUsXG4gICAgICAgICAgc3VuazogdHJ1ZSxcbiAgICAgICAgICBuYW1lOiBzaGlwSW5MaXN0LnNoaXAuZ2V0TmFtZSgpLFxuICAgICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGl0OiB0cnVlLFxuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIG1pc3NlZFNob3RzLmFkZChTdHJpbmcoY29vcmRpbmF0ZSkpO1xuICAgIHJldHVybiB7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgICAgc3VuazogZmFsc2UsXG4gICAgICBuYW1lOiBudWxsLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgY2hlY2tIaXQgPSAoY29vcmRpbmF0ZSkgPT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZm9yIChjb25zdCBvYmplY3Qgb2Ygc2hpcExpc3QpIHtcbiAgICAgIGlmIChvYmplY3QuY29vcmRpbmF0ZXMuc29tZSgoeCkgPT4gaXNFcXVhbChjb29yZGluYXRlLCB4KSkpIHJldHVybiBpbmRleDtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFN1bmsgPSAoKSA9PiBzaGlwTGlzdC5ldmVyeSgoZWwpID0+IGVsLnNoaXAuaXNTdW5rKCkpO1xuXG4gIC8vIEFJIHJhbmRvbSBzaGlwIHBsYWNlbWVudFxuICBjb25zdCBnZXRSYW5kb21JbmRleCA9IChpbmRleEFycmF5KSA9PlxuICAgIGluZGV4QXJyYXkuc3BsaWNlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGluZGV4QXJyYXkubGVuZ3RoKSwgMSk7XG5cbiAgY29uc3QgZ2V0UmFuZG9tQWxpZ25tZW50ID0gKGFsaWdubWVudHMgPSBbXCJob3Jpem9udGFsXCIsIFwidmVydGljYWxcIl0pID0+XG4gICAgYWxpZ25tZW50c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgY29uc3QgZ2V0UmFuZG9tU2hpcEhlbHBlciA9IChzaGlwQ29sbGVjdGlvbkhlbHBlcikgPT5cbiAgICBzaGlwQ29sbGVjdGlvbkhlbHBlcltnZXRSYW5kb21JbmRleCgpXTtcblxuICBjb25zdCBpbml0aWFsQm9hcmRTcXVhcmUgPSAoc2hpcExlbmd0aCwgYWxpZ25tZW50KSA9PiB7XG4gICAgLy8gUHJldmVudCBmcm9tIGdvaW5nIG91dCBvZiBib3VuZHNcbiAgICBsZXQgaW5pdGlhbEJvYXJkU3F1YXJlO1xuICAgIHdoaWxlIChcbiAgICAgIGluaXRpYWxCb2FyZFNxdWFyZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB1bmF2YWlsYWJsZUNvb3Jkcy5oYXMoU3RyaW5nKGluaXRpYWxCb2FyZFNxdWFyZSkpXG4gICAgKSB7XG4gICAgICBpZiAoYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICBjb25zdCBob3Jpem9udGFsQ29vcmQgPVxuICAgICAgICAgIGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZC5sZW5ndGggLSBzaGlwTGVuZ3RoKSldO1xuICAgICAgICBpZiAoaG9yaXpvbnRhbENvb3JkWzFdICsgc2hpcExlbmd0aCA8PSAxMClcbiAgICAgICAgICBpbml0aWFsQm9hcmRTcXVhcmUgPSBob3Jpem9udGFsQ29vcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBob3Jpem9udGFsQ29vcmQgPVxuICAgICAgICAgIGJvYXJkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgoc2hpcExlbmd0aCArIDEpICogMTApKV07XG4gICAgICAgIGlmIChob3Jpem9udGFsQ29vcmRbMF0gKyBzaGlwTGVuZ3RoIDw9IDEwKVxuICAgICAgICAgIGluaXRpYWxCb2FyZFNxdWFyZSA9IGhvcml6b250YWxDb29yZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluaXRpYWxCb2FyZFNxdWFyZTtcbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21QbGFjZW1lbnQgPSAoc2hpcExlbmd0aCkgPT4ge1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IFtdO1xuICAgIHdoaWxlIChwbGFjZW1lbnQubGVuZ3RoIDw9IDEpIHtcbiAgICAgIGNvbnN0IGFsaWdubWVudCA9IGdldFJhbmRvbUFsaWdubWVudCgpO1xuICAgICAgY29uc3QgaW5pdGlhbENvb3JkID0gaW5pdGlhbEJvYXJkU3F1YXJlKHNoaXBMZW5ndGgsIGFsaWdubWVudCk7XG4gICAgICBwbGFjZW1lbnQucHVzaChpbml0aWFsQ29vcmQpO1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBMZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSBwbGFjZW1lbnRbcGxhY2VtZW50Lmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIilcbiAgICAgICAgICBwbGFjZW1lbnQucHVzaChbbGFzdEl0ZW1bMF0sIGxhc3RJdGVtWzFdICsgMV0pO1xuICAgICAgICBlbHNlIHBsYWNlbWVudC5wdXNoKFtsYXN0SXRlbVswXSArIDEsIGxhc3RJdGVtWzFdXSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNJbklsbGVnYWxDb29yZHMocGxhY2VtZW50KSkgcGxhY2VtZW50LnNwbGljZSgwKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMocGxhY2VtZW50KTtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9O1xuICAgIGNvbnN0IHJhbmRvbWx5UGxhY2VTaGlwID0gKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXhBcnJheSA9IFswLCAxLCAyLCAzLCA0XTtcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gZ2V0UmFuZG9tSW5kZXgoaW5kZXhBcnJheSk7XG4gICAgICBjb25zdCByYW5kb21TaGlwSGVscGVyID0gc2hpcEFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgIHBsYWNlU2hpcCg0LCBcImJhdHRsZXNoaXBcIiwgW1xuICAgICAgICBbNSwgMl0sXG4gICAgICAgIFs1LCAzXSxcbiAgICAgICAgWzUsIDRdLFxuICAgICAgICBbNSwgNV0sXG4gICAgICBdKTtcbiAgICB9O1xuICByZXR1cm4ge1xuICAgIHNoaXBMaXN0LFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIG1pc3NlZFNob3RzLFxuICAgIGFyZUFsbFN1bmssXG4gICAgdW5hdmFpbGFibGVDb29yZHMsXG4gICAgaXNJbklsbGVnYWxDb29yZHMsXG4gICAgcmFuZG9tbHlQbGFjZVNoaXAsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgY29uc3QgYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIGNvb3JkaW5hdGUpID0+IGVuZW15LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZSk7XG5cbiAgcmV0dXJuIHsgZ2V0TmFtZSwgYm9hcmQsIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJtYWluIHtcXG4gIHdpZHRoOiA4NTBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuI2Rpc3BsYXkge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4jcGxheWVyLWJvYXJkLFxcbiNhaS1ib2FyZCxcXG4jcGxhY2Utc2hpcC1ib2FyZCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcbi5hY3RpdmUgPiBkaXY6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcHVycGxlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ubWlzc2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5hbmNob3JlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5kcmFnb3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwdXJwbGU7XFxufVxcbi5yZW1vdmVkIHtcXG4gIG9wYWNpdHk6IDAuMjtcXG59XFxuLm91dE9mQm91bmRzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcbiNib2FyZC1jcmVhdG9yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogODB2dztcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG59XFxuXFxuI3NoaXBzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbn1cXG4uc2hpcCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcXG4gIG1heC1oZWlnaHQ6IDQwcHg7XFxuICBtYXgtd2lkdGg6IGZpdC1jb250ZW50O1xcbn1cXG4uYmxvY2sge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogNDBweDtcXG59XFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jcGxhY2Utc2hpcC1ib2FyZCAuc3F1YXJlOi1tb3otZHJhZy1vdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHB1cnBsZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsY0FBYztFQUNkLGNBQWM7RUFDZCxhQUFhO0FBQ2Y7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsY0FBYztBQUNoQjtBQUNBOzs7RUFHRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSx3QkFBd0I7RUFDeEIsZUFBZTtBQUNqQjtBQUNBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFdBQVc7QUFDYjtBQUNBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIm1haW4ge1xcbiAgd2lkdGg6IDg1MHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4jZGlzcGxheSB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcbiNwbGF5ZXItYm9hcmQsXFxuI2FpLWJvYXJkLFxcbiNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuLmFjdGl2ZSA+IGRpdjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwdXJwbGU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5taXNzZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLmFuY2hvcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHB1cnBsZTtcXG59XFxuLnJlbW92ZWQge1xcbiAgb3BhY2l0eTogMC4yO1xcbn1cXG4ub3V0T2ZCb3VuZHMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG59XFxuI2JvYXJkLWNyZWF0b3Ige1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHdpZHRoOiA4MHZ3O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbn1cXG5cXG4jc2hpcHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcbi5zaGlwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWF1dG8tZmxvdzogY29sdW1uO1xcbiAgbWF4LWhlaWdodDogNDBweDtcXG4gIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XFxufVxcbi5ibG9jayB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiA0MHB4O1xcbn1cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNwbGFjZS1zaGlwLWJvYXJkIC5zcXVhcmU6LW1vei1kcmFnLW92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcHVycGxlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8qKlxuICogTG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pzLmZvdW5kYXRpb24vPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZmlsdGVyYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RmlsdGVyKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gMCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJlc3VsdFtyZXNJbmRleCsrXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZVxuICogc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZSxcbiAgICBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICAgIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3JyksXG4gICAgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA9PSBudWxsID8gMCA6IHZhbHVlcy5sZW5ndGg7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIHJlc3VsdCA9IGRhdGFbJ2RlbGV0ZSddKGtleSk7XG5cbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGRhdGEuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgdGhpcy5zaXplID0gKytkYXRhLnNpemU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy5cbiAqICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGJhc2VJc0VxdWFsLCBzdGFjayk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IG9iaklzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob2JqZWN0KSxcbiAgICAgIG90aFRhZyA9IG90aElzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob3RoZXIpO1xuXG4gIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcblxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmIGlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKG90aGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBvYmpJc0FyciA9IHRydWU7XG4gICAgb2JqSXNPYmogPSBmYWxzZTtcbiAgfVxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBDT01QQVJFX1VOT1JERVJFRF9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBDT01QQVJFX1VOT1JERVJFRF9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBnZXRBbGxLZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGdldEFsbEtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYXJyYXlGaWx0ZXIobmF0aXZlR2V0U3ltYm9scyhvYmplY3QpLCBmdW5jdGlvbihzeW1ib2wpIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHN5bWJvbCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzIDwgNi5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhc2VHZXRUYWcodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogJyc7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmVcbiAqIGVxdWl2YWxlbnQuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGFycmF5IGJ1ZmZlcnMsIGJvb2xlYW5zLFxuICogZGF0ZSBvYmplY3RzLCBlcnJvciBvYmplY3RzLCBtYXBzLCBudW1iZXJzLCBgT2JqZWN0YCBvYmplY3RzLCByZWdleGVzLFxuICogc2V0cywgc3RyaW5ncywgc3ltYm9scywgYW5kIHR5cGVkIGFycmF5cy4gYE9iamVjdGAgb2JqZWN0cyBhcmUgY29tcGFyZWRcbiAqIGJ5IHRoZWlyIG93biwgbm90IGluaGVyaXRlZCwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLiBGdW5jdGlvbnMgYW5kIERPTVxuICogbm9kZXMgYXJlIGNvbXBhcmVkIGJ5IHN0cmljdCBlcXVhbGl0eSwgaS5lLiBgPT09YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIG9iamVjdCA9PT0gb3RoZXI7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIlxuaW1wb3J0IFwiLi9ET00vY3JlYXRlQm9hcmRET01cIlxuaW1wb3J0IFwiLi9ET00vRE9NRXZlbnRzXCJcbiBpbXBvcnQgXCIuL0RPTS9kcmFnRHJvcFNoaXBzXCIgXG4gaW1wb3J0IFwiLi9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzXCIiXSwibmFtZXMiOlsiZ2FtZUhhbmRsZXIiLCJBSUJvYXJkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBsYXllckJvYXJkIiwiYm9hcmRGb3JQbGFjZW1lbnQiLCJzaGlwc0NvbnRhaW5lciIsInN0YXJ0QnRuIiwicXVlcnlTZWxlY3RvciIsImJvYXJkUmVzZXRCdG4iLCJnYW1lUmVzZXRCdG4iLCJhbGlnbm1lbnRCdG4iLCJteUdhbWVIYW5kbGVyIiwicGxheWVycyIsIkFJIiwiYm9hcmQiLCJwbGFjZVNoaXAiLCJyZW5kZXJQbGF5ZXJTaGlwcyIsInBsYXllclNoaXBzIiwicmVhbFBsYXllciIsInNoaXBMaXN0IiwiZm9yRWFjaCIsInNoaXBPYmoiLCJjb29yZGluYXRlcyIsImNvb3JkIiwiY29vcmRPblBsYXllckJvYXJkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsaWdubWVudFN0YXRlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkYXRhc2V0IiwiYWxpZ25tZW50IiwiZXZlcnlTaGlwIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGRyZW4iLCJzaGlwIiwiYXR0YWNraW5nUGhhc2UiLCJlIiwiaXNHYW1lT3ZlciIsImdldFR1cm4iLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0Iiwic3RhcnRBdHRhY2siLCJjYW5FbmRHYW1lIiwiY2FuU3RhcnRHYW1lIiwib25jZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJsZW5ndGgiLCJpZCIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJhZGRBbmNob3JlZENsYXNzIiwic2hpcFBsYWNlbWVudCIsInBsYWNlbWVudCIsInBsYWNlbWVudEluRE9NIiwib2JqZWN0RGF0YSIsIk51bWJlciIsImdldERhdGEiLCJuYW1lIiwiY2hvc2VuQ29vcmRpbmF0ZSIsIngiLCJ5Iiwic2hpcExvY2F0aW9uIiwiYW5jaG9yQVNoaXAiLCJ1bmF2YWlsYWJsZUNvb3JkcyIsImNsYXNzUmVtb3ZhbCIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImVsZW1lbnRzVG9DbGVhciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwicmVzZXRCb2FyZCIsInN0YXJ0QXR0YWNraW5nUGhhc2UiLCJwb3NzaWJsZUF0dGFja3MiLCJjcmVhdGVCb2FyZHMiLCJjb29yZGluYXRlIiwic3F1YXJlIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwic3F1YXJlQ2xvbmUxIiwiY2xvbmVOb2RlIiwic3F1YXJlQ2xvbmUyIiwic2hpcHMiLCJnZW5lcmF0ZVNoaXBCbG9ja3MiLCJzaGlwTGVuZ3RoIiwic2V0QXR0cmlidXRlIiwiaSIsInNoaXBCbG9jayIsImNyZWF0ZUFycmF5T2ZBdHRhY2tzIiwiYXR0YWNrcyIsInhDb29yZGluYXRlIiwiaiIsInlDb29yZGluYXRlIiwicHVzaCIsImdldFZhbGlkQXR0YWNrIiwiYXR0YWNrc0FycmF5Iiwic3BsaWNlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZmxhdCIsImNvbnZlcnRJbnRvMkRBcnIiLCJhcnIiLCJuZXcyREFyciIsIm15TmV3MkQiLCJpbGxlZ2FsVmFyaWFudHMiLCJzaGlwQXJyYXkiLCJTaGlwIiwiZ2V0TGVuZ3RoIiwiZ2V0TmFtZSIsImhpdHNUYWtlbiIsImhpdCIsImdldEhpdHNUYWtlbiIsImlzU3VuayIsImlzRXF1YWwiLCJQbGF5ZXIiLCJwbGF5ZXJCb2FyZERPTSIsIkFJQm9hcmRET00iLCJyZXN1bHREaXNwbGF5IiwicGxheWVyTmFtZSIsInBsYXllclR1cm4iLCJpc091dE9mQm91bmRzIiwiZ2VuZXJhdGVQbGFjZW1lbnQiLCJpc1NoaXBQbGFjZWQiLCJzaGlwT2JqZWN0Iiwic2hpcERhdGEiLCJpc0luSWxsZWdhbENvb3JkcyIsIkFJUG9zc2libGVBdHRhY2tzIiwiY2hhbmdlVHVybiIsImNvbnZlcnRUb0Nvb3JkaW5hdGUiLCJkaXNwbGF5QXR0YWNrUmVzdWx0IiwidHVybiIsInN1bmsiLCJ3aG9zZVR1cm4iLCJ0ZXh0Q29udGVudCIsIm1hcmtTcXVhcmUiLCJwbGF5ZXJNb3ZlIiwiZXZlbnQiLCJwbGF5ZXJUYXJnZXQiLCJwbGF5ZXJBdHRhY2siLCJhdHRhY2siLCJBSU1vdmUiLCJhcmVBbGxTdW5rIiwiQUlUYXJnZXQiLCJBSUF0dGFjayIsInNldFRpbWVvdXQiLCJhbGVydCIsIkdhbWVib2FyZCIsIm1pc3NlZFNob3RzIiwiU2V0IiwiaXNJbkFuQXJyYXkiLCJhcnJheSIsInNvbWUiLCJlbCIsImdlbmVyYXRlSWxsZWdhbE1vdmVzIiwiaWxsZWdhbFBvc3NpYmlsaXRlcyIsImlsbGVnYWxTZXQiLCJpbGxlZ2FsVmFyaWFudCIsImlsbGVnYWxNb3ZlIiwiU3RyaW5nIiwiaWxsZWdhbE1vdmVzIiwiaGFzIiwicmVjZWl2ZUF0dGFjayIsImluZGV4T2ZTaGlwIiwiY2hlY2tIaXQiLCJ1bmRlZmluZWQiLCJzaGlwSW5MaXN0IiwiaW5kZXgiLCJvYmplY3QiLCJldmVyeSIsImdldFJhbmRvbUluZGV4IiwiaW5kZXhBcnJheSIsImdldFJhbmRvbUFsaWdubWVudCIsImFsaWdubWVudHMiLCJnZXRSYW5kb21TaGlwSGVscGVyIiwic2hpcENvbGxlY3Rpb25IZWxwZXIiLCJpbml0aWFsQm9hcmRTcXVhcmUiLCJob3Jpem9udGFsQ29vcmQiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJpbml0aWFsQ29vcmQiLCJsYXN0SXRlbSIsInJhbmRvbWx5UGxhY2VTaGlwIiwicmFuZG9tSW5kZXgiLCJyYW5kb21TaGlwSGVscGVyIiwiZW5lbXkiXSwic291cmNlUm9vdCI6IiJ9