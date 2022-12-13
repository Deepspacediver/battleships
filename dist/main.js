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
var overlay = document.querySelector("#overlay");
var boardModal = document.querySelector("#board-creator");
var gameoverDisplay = document.querySelector("#gameover-display");
var gameoverResult = document.querySelector("#gameover-result");
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
  var everyShip = Array.from(shipsContainer.children);
  if (alignmentState === "horizontal") {
    alignmentState = "vertical";
    everyShip.forEach(function (ship) {
      ship.dataset.alignment = alignmentState;
      ship.classList.add("vertical");
    });
  } else {
    everyShip.forEach(function (ship) {
      alignmentState = "horizontal";
      ship.dataset.alignment = alignmentState;
      ship.classList.remove("vertical");
    });
  }
});
var canEndGame = function canEndGame() {
  // Implement modal to pop up instead of alter
  if (myGameHandler.isGameOver()) {
    if (myGameHandler.players.AI.board.areAllSunk()) gameoverResult.textContent = "You won";else gameoverResult.textContent = "AI won";
    gameoverDisplay.classList.add("active");
    overlay.classList.add("active");
  }
};
var attackingPhase = function attackingPhase() {
  boardModal.classList.remove("active");
  overlay.classList.remove("active");
  AIBoard.classList.add("active");
  renderPlayerShips();
  myGameHandler.players.AI.board.randomlyPlaceShips();
  AIBoard.addEventListener("mousedown", function (e) {
    if (myGameHandler.isGameOver() || myGameHandler.getTurn() === "ai" || !e.target.classList.contains("square")) return;
    console.log(e.target);
    myGameHandler.startAttack(e);
    canEndGame();
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
  classRemoval("sunk");
  gameoverDisplay.classList.remove("active");
  boardModal.classList.add("active");
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
  var markSunk = function markSunk(coords, turn) {
    var boardToMark;
    if (turn === "realPlayer") boardToMark = AIBoardDOM;else boardToMark = playerBoardDOM;
    coords.forEach(function (coord) {
      var hitSquare = boardToMark.querySelector("[data-x=\"".concat(coord[0], "\"][data-y=\"").concat(coord[1], "\"]"));
      hitSquare.classList.add("sunk");
    });
  };
  var markSquare = function markSquare(coordinate, _ref, turn) {
    var hit = _ref.hit,
      sunk = _ref.sunk,
      coords = _ref.coords;
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
    var currentTurn = getTurn();
    displayWhoseTurn(currentTurn);
    markSquare(playerTarget, playerAttack, currentTurn);
    if (playerAttack.sunk === true) markSunk(playerAttack.coords, currentTurn);
    changeTurn();
  };
  var AIMove = function AIMove() {
    if (players.AI.board.areAllSunk()) return;
    var currentTurn = getTurn();
    var AITarget = (0,_gameHelpers_AI_possible_attacks__WEBPACK_IMPORTED_MODULE_1__.getValidAttack)(AIPossibleAttacks);
    var AIAttack = players.AI.attack(players.realPlayer, AITarget);
    setTimeout(function () {
      markSquare(AITarget, AIAttack, currentTurn);
      if (AIAttack.sunk === true) markSunk(AIAttack.coords, currentTurn);
    }, 500);
    setTimeout(function () {
      displayWhoseTurn(currentTurn);
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
  return {
    startAttack: startAttack,
    players: players,
    anchorAShip: anchorAShip,
    canStartGame: canStartGame,
    isOutOfBounds: isOutOfBounds,
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
        coords: shipInList.coordinates
      };
      return {
        hit: true,
        sunk: false,
        coords: null
      };
    }
    missedShots.add(String(coordinate));
    return {
      hit: false,
      sunk: false,
      coords: null
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Norwester\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n}\n@font-face {\n  font-family: \"ArmaliteRifle\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\"),\n    url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff\");\n}\n\n:root {\n  --primary: #0e4b6c;\n  --secondary: #0a0a0a;\n  --tertiary: #155684;\n  --light-green: #48bf91;\n  --light-red: #e03333;\n  font-size: 10px;\n  font-family: \"Norwester\", sans-serif;\n  color: var(--light-green);\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  /* Prevents from dragging selected text to droppable element */\n  user-select: none;\n}\nhtml {\n  height: 100%;\n}\nbody {\n  height: 100%;\n  background-image: linear-gradient(to right, #161616, #2e2e2e, #161616);\n  background-position: 50% 100%;\n  background-size: cover;\n  font-family: \"Norwester\";\n}\n\nheader {\n  padding: 1.5rem;\n  padding-left: 2.5rem;\n  display: flex;\n  align-items: center;\n}\nheader > h1 {\n  font-family: \"ArmaliteRifle\";\n  letter-spacing: 0.5rem;\n  font-size: 3.5rem;\n  padding: 0 1.5rem;\n  text-shadow: 0.4rem 0.4rem 0.2rem rgb(0, 0, 0);\n  transition: 100ms ease-in-out;\n  position: relative;\n}\nh1:after {\n  position: absolute;\n  content: \"\";\n  border-bottom: 2px solid var(--light-green);\n  top: 4rem;\n  left: 1rem; \n  width: 0;\n  transition: width cubic-bezier(.97,.03,.46,1.27) 400ms;\n}\n\nh1:hover:after{\n  width: 90%;\n}\n\nsvg.github-logo{\n  transition: transform ease-in 350ms;\n  width: 100%;\n  height: 35px;\n  fill: var(--light-green) !important;\n}\nsvg.github-logo:hover{\n  transform: rotate(360deg);\n  filter: saturate(10);\n}\nsvg.github-logo:active{\n  transform: scale(2);\n}\nmain {\n  width: 100%;\n  margin: 0 auto;\n  display: grid;\n  justify-items: center;\n  gap: 2rem;\n\n}\n#turn-display {\n  width: 80%;\n  font-size: 3rem;\n  text-align: center;\n  text-shadow: .6rem .6rem 1rem rgba(0, 0, 0, 0.9);\n}\n#player-board,\n#ai-board,\n#place-ship-board {\n  border: 0.5px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  margin: 0.5rem;\n  gap: 0.05rem;\n  box-shadow: 0px 1rem 2rem 3px rgba(0, 0, 0, 0.7);\n}\n\n#player-board,\n#ai-board {\n  width: 400px;\n  height: 400px;\n}\n\n\nbutton {\n  background-color: #282828;\n  /* box-shadow: -3px 3px var(--light-green), -2px 2px var(--light-green),\n    -1px 1px var(--light-green); */\n  color: var(--light-green);\n  font-size: 1rem;\n  font-weight: bold;\n}\n\n/* Board classes */\n.square {\n  border: 2px solid var(--secondary);\n  background-color: var(--tertiary);\n  position: relative;\n}\n.active > .square:hover {\n  background-color: #48bf91;\n  cursor: pointer;\n}\n.missed {\n  background-color: #8f8f8f;\n  pointer-events: none;\n}\n\n.anchored {\n  background-color: #48bf91;\n}\n\n.hit {\n  background-color: #e03333;\n  pointer-events: none;\n}\n.sunk::after{\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%,-50%);\n  content: \"X\";\n  font-size: 2rem;\n  color: var(--secondary);\n}\n.dragover {\n  background-color: #48bf91;\n}\n.removed {\n  opacity: 0.2;\n}\n.outOfBounds {\n  background-color: gray;\n}\n\n.block {\n  border: 1px solid black;\n  width: 40px;\n}\n.hidden {\n  display: none;\n}\n\n\n\n@media (min-width:850px) {\n  main{\n    margin-top: 8rem;\n    grid-template-columns: 1fr 1fr;\n    align-content: center;\n  }\n\n  #turn-display{\n    grid-column: span 2;\n    grid-row-start: 1;\n    margin-bottom: 7rem;\n    font-size: 4rem;\n  }\n}\n\n\n@media (min-width:1220px) {\n  #player-board,\n  #ai-board {\n    width: 50rem;\n    height: 50rem;\n  }\n  header{\n    padding-left: 13rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,wBAAwB;EACxB;0DACqD;AACvD;AACA;EACE,4BAA4B;EAC5B;0DAC0D;AAC5D;;AAEA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,sBAAsB;EACtB,oBAAoB;EACpB,eAAe;EACf,oCAAoC;EACpC,yBAAyB;AAC3B;;AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,8DAA8D;EAC9D,iBAAiB;AACnB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;EACZ,sEAAsE;EACtE,6BAA6B;EAC7B,sBAAsB;EACtB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;EACf,oBAAoB;EACpB,aAAa;EACb,mBAAmB;AACrB;AACA;EACE,4BAA4B;EAC5B,sBAAsB;EACtB,iBAAiB;EACjB,iBAAiB;EACjB,8CAA8C;EAC9C,6BAA6B;EAC7B,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,2CAA2C;EAC3C,SAAS;EACT,UAAU;EACV,QAAQ;EACR,sDAAsD;AACxD;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,mCAAmC;EACnC,WAAW;EACX,YAAY;EACZ,mCAAmC;AACrC;AACA;EACE,yBAAyB;EACzB,oBAAoB;AACtB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,WAAW;EACX,cAAc;EACd,aAAa;EACb,qBAAqB;EACrB,SAAS;;AAEX;AACA;EACE,UAAU;EACV,eAAe;EACf,kBAAkB;EAClB,gDAAgD;AAClD;AACA;;;EAGE,yBAAyB;EACzB,aAAa;EACb,sCAAsC;EACtC,cAAc;EACd,YAAY;EACZ,gDAAgD;AAClD;;AAEA;;EAEE,YAAY;EACZ,aAAa;AACf;;;AAGA;EACE,yBAAyB;EACzB;kCACgC;EAChC,yBAAyB;EACzB,eAAe;EACf,iBAAiB;AACnB;;AAEA,kBAAkB;AAClB;EACE,kCAAkC;EAClC,iCAAiC;EACjC,kBAAkB;AACpB;AACA;EACE,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,yBAAyB;EACzB,oBAAoB;AACtB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,oBAAoB;AACtB;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,+BAA+B;EAC/B,YAAY;EACZ,eAAe;EACf,uBAAuB;AACzB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,YAAY;AACd;AACA;EACE,sBAAsB;AACxB;;AAEA;EACE,uBAAuB;EACvB,WAAW;AACb;AACA;EACE,aAAa;AACf;;;;AAIA;EACE;IACE,gBAAgB;IAChB,8BAA8B;IAC9B,qBAAqB;EACvB;;EAEA;IACE,mBAAmB;IACnB,iBAAiB;IACjB,mBAAmB;IACnB,eAAe;EACjB;AACF;;;AAGA;EACE;;IAEE,YAAY;IACZ,aAAa;EACf;EACA;IACE,mBAAmB;EACrB;AACF","sourcesContent":["@font-face {\n  font-family: \"Norwester\";\n  src: url(\"~./assets/fonts/norwester.woff2\") format(\"woff2\"),\n    url(\"./assets/fonts/norwester.woff\") format(\"woff\");\n}\n@font-face {\n  font-family: \"ArmaliteRifle\";\n  src: url(\"./assets/fonts/armalite_rifle.woff2\") format(\"woff2\"),\n    url(\"./assets/fonts/armalite_rifle.woff\") format(\"woff\");\n}\n\n:root {\n  --primary: #0e4b6c;\n  --secondary: #0a0a0a;\n  --tertiary: #155684;\n  --light-green: #48bf91;\n  --light-red: #e03333;\n  font-size: 10px;\n  font-family: \"Norwester\", sans-serif;\n  color: var(--light-green);\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  /* Prevents from dragging selected text to droppable element */\n  user-select: none;\n}\nhtml {\n  height: 100%;\n}\nbody {\n  height: 100%;\n  background-image: linear-gradient(to right, #161616, #2e2e2e, #161616);\n  background-position: 50% 100%;\n  background-size: cover;\n  font-family: \"Norwester\";\n}\n\nheader {\n  padding: 1.5rem;\n  padding-left: 2.5rem;\n  display: flex;\n  align-items: center;\n}\nheader > h1 {\n  font-family: \"ArmaliteRifle\";\n  letter-spacing: 0.5rem;\n  font-size: 3.5rem;\n  padding: 0 1.5rem;\n  text-shadow: 0.4rem 0.4rem 0.2rem rgb(0, 0, 0);\n  transition: 100ms ease-in-out;\n  position: relative;\n}\nh1:after {\n  position: absolute;\n  content: \"\";\n  border-bottom: 2px solid var(--light-green);\n  top: 4rem;\n  left: 1rem; \n  width: 0;\n  transition: width cubic-bezier(.97,.03,.46,1.27) 400ms;\n}\n\nh1:hover:after{\n  width: 90%;\n}\n\nsvg.github-logo{\n  transition: transform ease-in 350ms;\n  width: 100%;\n  height: 35px;\n  fill: var(--light-green) !important;\n}\nsvg.github-logo:hover{\n  transform: rotate(360deg);\n  filter: saturate(10);\n}\nsvg.github-logo:active{\n  transform: scale(2);\n}\nmain {\n  width: 100%;\n  margin: 0 auto;\n  display: grid;\n  justify-items: center;\n  gap: 2rem;\n\n}\n#turn-display {\n  width: 80%;\n  font-size: 3rem;\n  text-align: center;\n  text-shadow: .6rem .6rem 1rem rgba(0, 0, 0, 0.9);\n}\n#player-board,\n#ai-board,\n#place-ship-board {\n  border: 0.5px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  margin: 0.5rem;\n  gap: 0.05rem;\n  box-shadow: 0px 1rem 2rem 3px rgba(0, 0, 0, 0.7);\n}\n\n#player-board,\n#ai-board {\n  width: 400px;\n  height: 400px;\n}\n\n\nbutton {\n  background-color: #282828;\n  /* box-shadow: -3px 3px var(--light-green), -2px 2px var(--light-green),\n    -1px 1px var(--light-green); */\n  color: var(--light-green);\n  font-size: 1rem;\n  font-weight: bold;\n}\n\n/* Board classes */\n.square {\n  border: 2px solid var(--secondary);\n  background-color: var(--tertiary);\n  position: relative;\n}\n.active > .square:hover {\n  background-color: #48bf91;\n  cursor: pointer;\n}\n.missed {\n  background-color: #8f8f8f;\n  pointer-events: none;\n}\n\n.anchored {\n  background-color: #48bf91;\n}\n\n.hit {\n  background-color: #e03333;\n  pointer-events: none;\n}\n.sunk::after{\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%,-50%);\n  content: \"X\";\n  font-size: 2rem;\n  color: var(--secondary);\n}\n.dragover {\n  background-color: #48bf91;\n}\n.removed {\n  opacity: 0.2;\n}\n.outOfBounds {\n  background-color: gray;\n}\n\n.block {\n  border: 1px solid black;\n  width: 40px;\n}\n.hidden {\n  display: none;\n}\n\n\n\n@media (min-width:850px) {\n  main{\n    margin-top: 8rem;\n    grid-template-columns: 1fr 1fr;\n    align-content: center;\n  }\n\n  #turn-display{\n    grid-column: span 2;\n    grid-row-start: 1;\n    margin-bottom: 7rem;\n    font-size: 4rem;\n  }\n}\n\n\n@media (min-width:1220px) {\n  #player-board,\n  #ai-board {\n    width: 50rem;\n    height: 50rem;\n  }\n  header{\n    padding-left: 13rem;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/modals.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/modals.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal {\n  color: var(--light-green);\n  background-image: linear-gradient(to right, #161616, #2e2e2e 10%, #161616);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  transition: transform 200ms ease-out;\n  background-color: var(--secondary);\n  z-index: 10;\n  border: 5px solid var(--secondary);\n  border-radius: 2rem;\n}\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  transition: opactiy 200ms ease-out;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  pointer-events: none;\n}\n\n#overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n/*       SHIP FACTORY             */\n#board-creator.modal {\n  max-width: 90%;\n  width: 1000px;\n  max-height: 70%;\n  height: 700px;\n  display: grid;\n  grid-template-rows: 0.8fr 3fr 3fr 1.5fr;\n  align-items: center;\n  justify-items: center;\n}\n\nh2.board-creator-header {\n  font-size: 3rem;\n  font-family: \"ArmaliteRifle\";\n}\n#place-ship-board {\n  width: 300px;\n  height: 300px;\n}\n#ships-container {\n  max-width: 80%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}\n.ship {\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: row;\n  box-shadow: 0px 0.3rem 0.2rem 3px rgba(0, 0, 0, 0.3);\n}\n.ship.vertical {\n  flex-direction: column !important;\n}\n.block {\n  border: 1px solid black;\n  height: 3rem;\n  width: 3rem;\n  background-color: #48bf91;\n}\n\n#start,\n#board-reset,\n#alignment-btn,\n#game-reset {\n  font-family: \"Norwester\";\n  text-transform: uppercase;\n  letter-spacing: 0.1rem;\n  padding: 1rem;\n  font-size: 1.7rem;\n  border-radius: 1rem;\n  border: 2px solid var(--secondary);\n  margin: 0.5rem;\n  cursor: pointer;\n  transition: filter, box-shadow 100ms ease-in;\n}\n\nbutton:hover {\n  filter: saturate(60%);\n  box-shadow: 0px 5px 16px 3px rgba(0, 0, 0, 0.4);\n}\n\nbutton:active {\n  transform: scale(0.93);\n}\n\n/* Game over modal */\n#gameover-display {\n  max-width: 50%;\n  max-height: 50%;\n  height: 300px;\n  width: 40rem;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5rem;\n}\n\nh3#gameover-result {\n  font-size: 4rem;\n}\n\nbutton#game-reset {\n  padding: 2rem;\n  font-size: 2.5rem;\n}\n\n@media (min-width: 860px) {\n  #board-creator.modal {\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 0.8fr 5fr 1.5fr;\n    padding: 1rem;\n  }\n\n  h2.board-creator-header,\n  .buttons {\n    grid-column: span 2;\n  }\n  h2.board-creator-header {\n    font-size: 4rem;\n  }\n  #place-ship-board {\n    height: 40rem;\n    width: 40rem;\n  }\n  .block {\n    width: 4rem;\n    height: 4rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/modals.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,0EAA0E;EAC1E,eAAe;EACf,QAAQ;EACR,SAAS;EACT,yCAAyC;EACzC,oCAAoC;EACpC,kCAAkC;EAClC,WAAW;EACX,kCAAkC;EAClC,mBAAmB;AACrB;AACA;EACE,yCAAyC;AAC3C;;AAEA;EACE,eAAe;EACf,UAAU;EACV,kCAAkC;EAClC,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,oCAAoC;EACpC,oBAAoB;AACtB;;AAEA;EACE,UAAU;EACV,mBAAmB;AACrB;AACA,mCAAmC;AACnC;EACE,cAAc;EACd,aAAa;EACb,eAAe;EACf,aAAa;EACb,aAAa;EACb,uCAAuC;EACvC,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,eAAe;EACf,4BAA4B;AAC9B;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,cAAc;EACd,aAAa;EACb,eAAe;EACf,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;AACA;EACE,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,oDAAoD;AACtD;AACA;EACE,iCAAiC;AACnC;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,yBAAyB;AAC3B;;AAEA;;;;EAIE,wBAAwB;EACxB,yBAAyB;EACzB,sBAAsB;EACtB,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,kCAAkC;EAClC,cAAc;EACd,eAAe;EACf,4CAA4C;AAC9C;;AAEA;EACE,qBAAqB;EACrB,+CAA+C;AACjD;;AAEA;EACE,sBAAsB;AACxB;;AAEA,oBAAoB;AACpB;EACE,cAAc;EACd,eAAe;EACf,aAAa;EACb,YAAY;;EAEZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,iBAAiB;AACnB;;AAEA;EACE;IACE,8BAA8B;IAC9B,mCAAmC;IACnC,aAAa;EACf;;EAEA;;IAEE,mBAAmB;EACrB;EACA;IACE,eAAe;EACjB;EACA;IACE,aAAa;IACb,YAAY;EACd;EACA;IACE,WAAW;IACX,YAAY;EACd;AACF","sourcesContent":[".modal {\n  color: var(--light-green);\n  background-image: linear-gradient(to right, #161616, #2e2e2e 10%, #161616);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  transition: transform 200ms ease-out;\n  background-color: var(--secondary);\n  z-index: 10;\n  border: 5px solid var(--secondary);\n  border-radius: 2rem;\n}\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  transition: opactiy 200ms ease-out;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  pointer-events: none;\n}\n\n#overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n/*       SHIP FACTORY             */\n#board-creator.modal {\n  max-width: 90%;\n  width: 1000px;\n  max-height: 70%;\n  height: 700px;\n  display: grid;\n  grid-template-rows: 0.8fr 3fr 3fr 1.5fr;\n  align-items: center;\n  justify-items: center;\n}\n\nh2.board-creator-header {\n  font-size: 3rem;\n  font-family: \"ArmaliteRifle\";\n}\n#place-ship-board {\n  width: 300px;\n  height: 300px;\n}\n#ships-container {\n  max-width: 80%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}\n.ship {\n  margin-top: 1rem;\n  display: flex;\n  flex-direction: row;\n  box-shadow: 0px 0.3rem 0.2rem 3px rgba(0, 0, 0, 0.3);\n}\n.ship.vertical {\n  flex-direction: column !important;\n}\n.block {\n  border: 1px solid black;\n  height: 3rem;\n  width: 3rem;\n  background-color: #48bf91;\n}\n\n#start,\n#board-reset,\n#alignment-btn,\n#game-reset {\n  font-family: \"Norwester\";\n  text-transform: uppercase;\n  letter-spacing: 0.1rem;\n  padding: 1rem;\n  font-size: 1.7rem;\n  border-radius: 1rem;\n  border: 2px solid var(--secondary);\n  margin: 0.5rem;\n  cursor: pointer;\n  transition: filter, box-shadow 100ms ease-in;\n}\n\nbutton:hover {\n  filter: saturate(60%);\n  box-shadow: 0px 5px 16px 3px rgba(0, 0, 0, 0.4);\n}\n\nbutton:active {\n  transform: scale(0.93);\n}\n\n/* Game over modal */\n#gameover-display {\n  max-width: 50%;\n  max-height: 50%;\n  height: 300px;\n  width: 40rem;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5rem;\n}\n\nh3#gameover-result {\n  font-size: 4rem;\n}\n\nbutton#game-reset {\n  padding: 2rem;\n  font-size: 2.5rem;\n}\n\n@media (min-width: 860px) {\n  #board-creator.modal {\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 0.8fr 5fr 1.5fr;\n    padding: 1rem;\n  }\n\n  h2.board-creator-header,\n  .buttons {\n    grid-column: span 2;\n  }\n  h2.board-creator-header {\n    font-size: 4rem;\n  }\n  #place-ship-board {\n    height: 40rem;\n    width: 40rem;\n  }\n  .block {\n    width: 4rem;\n    height: 4rem;\n  }\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/styles/modals.css":
/*!*******************************!*\
  !*** ./src/styles/modals.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modals_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./modals.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/modals.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_modals_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_modals_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_modals_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_modals_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/* harmony import */ var _styles_modals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/modals.css */ "./src/styles/modals.css");
/* harmony import */ var _DOM_createBoardDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM/createBoardDOM */ "./src/DOM/createBoardDOM.js");
/* harmony import */ var _DOM_DOMEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOM/DOMEvents */ "./src/DOM/DOMEvents.js");
/* harmony import */ var _DOM_dragDropShips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOM/dragDropShips */ "./src/DOM/dragDropShips.js");
/* harmony import */ var _DOM_dragDropShips__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_DOM_dragDropShips__WEBPACK_IMPORTED_MODULE_4__);





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLE1BQU0sT0FBTyxNQUFNLEtBQUssWUFBWSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLEtBQUssS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sT0FBTyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxhQUFhLFdBQVcsWUFBWSxPQUFPLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxVQUFVLFFBQVEsS0FBSyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sT0FBTyxLQUFLLE1BQU0sVUFBVSxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0scUNBQXFDLCtCQUErQixrSUFBa0ks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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLEdBQUc7QUFDZCxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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VUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBb0I7QUFDUTtBQUVDO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ET00vRE9NRXZlbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL0RPTS9jcmVhdGVCb2FyZERPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ET00vZHJhZ0Ryb3BTaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVIZWxwZXJzL3BsYWNlbWVudC1oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21vZHVsZXMvYmF0dGxlc2hpcC1mYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL21vZHVsZXMvZ2FtZUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvbW9kdWxlcy9wbGF5ZXItZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzL21vZGFscy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy9tb2RhbHMuY3NzP2QwNTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVIYW5kbGVyIGZyb20gXCIuLi9tb2R1bGVzL2dhbWVIYW5kbGVyXCI7XG5cbmNvbnN0IEFJQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFpLWJvYXJkXCIpO1xuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbmNvbnN0IGJvYXJkRm9yUGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwLWJvYXJkXCIpO1xuY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLWNvbnRhaW5lclwiKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGFydFwiKTtcbmNvbnN0IGJvYXJkUmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvYXJkLXJlc2V0XCIpO1xuY29uc3QgZ2FtZVJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNnYW1lLXJlc2V0XCIpO1xuY29uc3QgYWxpZ25tZW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGlnbm1lbnQtYnRuXCIpO1xuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3ZlcmxheVwiKTtcblxuY29uc3QgYm9hcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9hcmQtY3JlYXRvclwiKTtcbmNvbnN0IGdhbWVvdmVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ2FtZW92ZXItZGlzcGxheVwiKTtcbmNvbnN0IGdhbWVvdmVyUmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNnYW1lb3Zlci1yZXN1bHRcIik7XG5cbmxldCBteUdhbWVIYW5kbGVyID0gZ2FtZUhhbmRsZXIoXCJ0ZXN0XCIpO1xuXG5jb25zdCByZW5kZXJQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyU2hpcHMgPSBteUdhbWVIYW5kbGVyLnBsYXllcnMucmVhbFBsYXllci5ib2FyZC5zaGlwTGlzdDtcbiAgcGxheWVyU2hpcHMuZm9yRWFjaCgoc2hpcE9iaikgPT4ge1xuICAgIHNoaXBPYmouY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkT25QbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS14PVwiJHtjb29yZFswXX1cIl1bZGF0YS15PVwiJHtjb29yZFsxXX1cIl1gXG4gICAgICApO1xuICAgICAgY29vcmRPblBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoXCJhbmNob3JlZFwiKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5hbGlnbm1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgbGV0IGFsaWdubWVudFN0YXRlID0gc2hpcHNDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQuZGF0YXNldC5hbGlnbm1lbnQ7XG4gIGNvbnN0IGV2ZXJ5U2hpcCA9IEFycmF5LmZyb20oc2hpcHNDb250YWluZXIuY2hpbGRyZW4pO1xuICBpZiAoYWxpZ25tZW50U3RhdGUgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgYWxpZ25tZW50U3RhdGUgPSBcInZlcnRpY2FsXCI7XG4gICAgZXZlcnlTaGlwLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuZGF0YXNldC5hbGlnbm1lbnQgPSBhbGlnbm1lbnRTdGF0ZTtcbiAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGV2ZXJ5U2hpcC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBhbGlnbm1lbnRTdGF0ZSA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgc2hpcC5kYXRhc2V0LmFsaWdubWVudCA9IGFsaWdubWVudFN0YXRlO1xuICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIik7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5jb25zdCBjYW5FbmRHYW1lID0gKCkgPT4ge1xuICAvLyBJbXBsZW1lbnQgbW9kYWwgdG8gcG9wIHVwIGluc3RlYWQgb2YgYWx0ZXJcbiAgaWYgKG15R2FtZUhhbmRsZXIuaXNHYW1lT3ZlcigpKSB7XG4gICAgaWYgKG15R2FtZUhhbmRsZXIucGxheWVycy5BSS5ib2FyZC5hcmVBbGxTdW5rKCkpXG4gICAgICBnYW1lb3ZlclJlc3VsdC50ZXh0Q29udGVudCA9IFwiWW91IHdvblwiO1xuICAgIGVsc2UgZ2FtZW92ZXJSZXN1bHQudGV4dENvbnRlbnQgPSBcIkFJIHdvblwiO1xuXG4gICAgZ2FtZW92ZXJEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG59O1xuXG5jb25zdCBhdHRhY2tpbmdQaGFzZSA9ICgpID0+IHtcbiAgYm9hcmRNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIEFJQm9hcmQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgcmVuZGVyUGxheWVyU2hpcHMoKTtcbiAgbXlHYW1lSGFuZGxlci5wbGF5ZXJzLkFJLmJvYXJkLnJhbmRvbWx5UGxhY2VTaGlwcygpO1xuICBBSUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICBpZiAoXG4gICAgICBteUdhbWVIYW5kbGVyLmlzR2FtZU92ZXIoKSB8fFxuICAgICAgbXlHYW1lSGFuZGxlci5nZXRUdXJuKCkgPT09IFwiYWlcIiB8fFxuICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNxdWFyZVwiKVxuICAgIClcbiAgICAgIHJldHVybjtcbiAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgbXlHYW1lSGFuZGxlci5zdGFydEF0dGFjayhlKTtcbiAgICBjYW5FbmRHYW1lKCk7XG4gICAgY29uc29sZS5sb2cobXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuc2hpcExpc3QpO1xuICB9KTtcbn07XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gIC8vIElmIGNsaWNrZWQgYmVmb3JlIHBsYXlhYmxlLCBwcmV2ZW50cyBmcm9tIGZ1cnRociBwbGF5aW5nXG4gIFwiY2xpY2tcIixcbiAgKCkgPT4ge1xuICAgIGlmIChteUdhbWVIYW5kbGVyLmNhblN0YXJ0R2FtZSgpKSB7XG4gICAgICBhdHRhY2tpbmdQaGFzZSgpO1xuICAgIH1cbiAgfVxuKTtcblxuc2hpcHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICBjb25zb2xlLmxvZyhlKTtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwic2hpcC1sZW5ndGhcIiwgZS50YXJnZXQuZGF0YXNldC5sZW5ndGgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJzaGlwLW5hbWVcIiwgZS50YXJnZXQuaWQpO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJzaGlwLWFsaWdubWVudFwiLCBlLnRhcmdldC5kYXRhc2V0LmFsaWdubWVudCk7XG4gIH1cbn0pO1xuXG5ib2FyZEZvclBsYWNlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgaWYgKFxuICAgIGUudGFyZ2V0LmlkID09PSBcInBsYWNlLXNoaXAtYm9hcmRcIiB8fFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFuY2hvcmVkXCIpXG4gIClcbiAgICByZXR1cm47XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcmFnb3ZlclwiKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmJvYXJkRm9yUGxhY2VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcInBsYWNlLXNoaXAtYm9hcmRcIikgcmV0dXJuO1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ292ZXJcIik7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5jb25zdCBhZGRBbmNob3JlZENsYXNzID0gKHNoaXBQbGFjZW1lbnQpID0+IHtcbiAgc2hpcFBsYWNlbWVudC5mb3JFYWNoKChwbGFjZW1lbnQpID0+IHtcbiAgICBjb25zdCBwbGFjZW1lbnRJbkRPTSA9IGJvYXJkRm9yUGxhY2VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEteD1cIiR7cGxhY2VtZW50WzBdfVwiXVtkYXRhLXk9XCIke3BsYWNlbWVudFsxXX1cIl1gXG4gICAgKTtcbiAgICBwbGFjZW1lbnRJbkRPTS5jbGFzc0xpc3QuYWRkKFwiYW5jaG9yZWRcIik7XG4gIH0pO1xufTtcblxuYm9hcmRGb3JQbGFjZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdvdmVyXCIpO1xuICBjb25zdCBvYmplY3REYXRhID0ge1xuICAgIGxlbmd0aDogTnVtYmVyKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJzaGlwLWxlbmd0aFwiKSksXG4gICAgbmFtZTogZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInNoaXAtbmFtZVwiKSxcbiAgICBhbGlnbm1lbnQ6IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJzaGlwLWFsaWdubWVudFwiKSxcbiAgfTtcbiAgY29uc29sZS5sb2cob2JqZWN0RGF0YSk7XG4gIGNvbnN0IGNob3NlbkNvb3JkaW5hdGUgPSBbXG4gICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueCksXG4gICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueSksXG4gIF07XG5cbiAgY29uc3Qgc2hpcExvY2F0aW9uID0gbXlHYW1lSGFuZGxlci5hbmNob3JBU2hpcChjaG9zZW5Db29yZGluYXRlLCBvYmplY3REYXRhKTtcbiAgaWYgKHNoaXBMb2NhdGlvbikge1xuICAgIGFkZEFuY2hvcmVkQ2xhc3Moc2hpcExvY2F0aW9uKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtvYmplY3REYXRhLm5hbWV9YCkuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XG4gICAgY29uc29sZS5sb2cobXlHYW1lSGFuZGxlci5wbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQudW5hdmFpbGFibGVDb29yZHMpO1xuICB9XG59KTtcblxuY29uc3QgY2xhc3NSZW1vdmFsID0gKGNsYXNzTmFtZSwgY29udGFpbmVyID0gZG9jdW1lbnQpID0+IHtcbiAgY29uc3QgZWxlbWVudHNUb0NsZWFyID0gQXJyYXkuZnJvbShcbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NOYW1lfWApXG4gICk7XG4gIGVsZW1lbnRzVG9DbGVhci5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG59O1xuXG4vKiA8ISEhISEhISEhISBHYW1lIFJlc2V0ICEhISEhISEhISEhPiAqL1xuY29uc3QgcmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgbXlHYW1lSGFuZGxlciA9IGdhbWVIYW5kbGVyKFwidGVzdFwiKTtcbiAgY2xhc3NSZW1vdmFsKFwiYW5jaG9yZWRcIik7XG4gIGNsYXNzUmVtb3ZhbChcInJlbW92ZWRcIiwgc2hpcHNDb250YWluZXIpO1xufTtcblxuYm9hcmRSZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZXNldEJvYXJkKCk7XG59KTtcblxuZ2FtZVJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJlc2V0Qm9hcmQoKTtcbiAgY2xhc3NSZW1vdmFsKFwiaGl0XCIpO1xuICBjbGFzc1JlbW92YWwoXCJtaXNzZWRcIik7XG4gIGNsYXNzUmVtb3ZhbChcInN1bmtcIik7XG4gIGdhbWVvdmVyRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICBib2FyZE1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59KTtcbiIsImltcG9ydCBwb3NzaWJsZUF0dGFja3MgZnJvbSBcIi4uL2dhbWVIZWxwZXJzL0FJLXBvc3NpYmxlLWF0dGFja3NcIjtcblxuY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbmNvbnN0IEFJQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFpLWJvYXJkXCIpO1xuY29uc3QgYm9hcmRGb3JQbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLXNoaXAtYm9hcmRcIik7XG5cbmNvbnN0IGNyZWF0ZUJvYXJkcyA9IChjb29yZGluYXRlcykgPT4ge1xuICBjb29yZGluYXRlcy5mb3JFYWNoKChjb29yZGluYXRlKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICBzcXVhcmUuZGF0YXNldC54ID0gY29vcmRpbmF0ZVswXTtcbiAgICBzcXVhcmUuZGF0YXNldC55ID0gY29vcmRpbmF0ZVsxXTtcbiAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIGNvbnN0IHNxdWFyZUNsb25lMSA9IHNxdWFyZS5jbG9uZU5vZGUoKTtcbiAgICBBSUJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZUNsb25lMSk7XG4gICAgY29uc3Qgc3F1YXJlQ2xvbmUyID0gc3F1YXJlLmNsb25lTm9kZSgpO1xuICAgIGJvYXJkRm9yUGxhY2VtZW50LmFwcGVuZENoaWxkKHNxdWFyZUNsb25lMik7XG4gIH0pO1xufTtcblxuY3JlYXRlQm9hcmRzKHBvc3NpYmxlQXR0YWNrcyk7XG5cbiIsImNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuXG5jb25zdCBnZW5lcmF0ZVNoaXBCbG9ja3MgPSAoKSA9PiB7XG4gIEFycmF5LmZyb20oc2hpcHMpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gTnVtYmVyKHNoaXAuZGF0YXNldC5sZW5ndGgpO1xuICAgIHNoaXAuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTsgXG4gICAgc2hpcC5kYXRhc2V0LmFsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaGlwQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc2hpcEJsb2NrLmNsYXNzTGlzdC5hZGQoXCJibG9ja1wiKTtcbiAgICAgIHNoaXAuYXBwZW5kQ2hpbGQoc2hpcEJsb2NrKTtcbiAgICB9XG4gIH0pO1xufTtcbmdlbmVyYXRlU2hpcEJsb2NrcygpO1xuIiwiY29uc3QgY3JlYXRlQXJyYXlPZkF0dGFja3MgPSAoKSA9PiB7XG4gIGNvbnN0IGF0dGFja3MgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCB4Q29vcmRpbmF0ZSA9IGk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCB5Q29vcmRpbmF0ZSA9IGo7XG4gICAgICBhdHRhY2tzLnB1c2goW3hDb29yZGluYXRlLCB5Q29vcmRpbmF0ZV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXR0YWNrcztcbn07XG5cbmNvbnN0IHBvc3NpYmxlQXR0YWNrcyA9IGNyZWF0ZUFycmF5T2ZBdHRhY2tzKCk7XG5cbmNvbnN0IGdldFZhbGlkQXR0YWNrID0gKGF0dGFja3NBcnJheSkgPT5cbiAgYXR0YWNrc0FycmF5XG4gICAgLnNwbGljZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdHRhY2tzQXJyYXkubGVuZ3RoKSwgMSlcbiAgICAuZmxhdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBwb3NzaWJsZUF0dGFja3M7XG5leHBvcnQgeyBnZXRWYWxpZEF0dGFjayB9O1xuIiwiXG4gIGNvbnN0IGlsbGVnYWxWYXJpYW50cyA9IFtcbiAgICBbMCwgLTFdLFxuICAgIFstMSwgLTFdLFxuICAgIFsxLCAtMV0sXG4gICAgWy0xLCAwXSxcbiAgICBbMSwgMF0sXG4gICAgWzAsIDFdLFxuICAgIFstMSwgKzFdLFxuICAgIFsxLCAxXSxcbiAgXTtcblxuY29uc3Qgc2hpcEFycmF5ID0gW1xuICB7XG4gICAgbmFtZTogXCJkZXN0cm95ZXJcIixcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInN1Ym1hcmluZVwiLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY3J1aXNlclwiLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYmF0dGxlc2hpcFwiLFxuICAgIGxlbmd0aDogNCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY2FycmllclwiLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbl07XG5cbmV4cG9ydCB7aWxsZWdhbFZhcmlhbnRzLCBzaGlwQXJyYXl9IiwiY29uc3QgU2hpcCA9IChsZW5ndGgsIG5hbWUpID0+IHtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgbGV0IGhpdHNUYWtlbiA9IDA7XG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBoaXRzVGFrZW4gKz0gMTtcbiAgfTtcbiAgY29uc3QgZ2V0SGl0c1Rha2VuID0gKCkgPT4gaGl0c1Rha2VuO1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IGhpdHNUYWtlbiA+PSBsZW5ndGg7XG5cbiAgcmV0dXJuIHsgZ2V0TGVuZ3RoLCBnZXROYW1lLCBoaXQsIGdldEhpdHNUYWtlbiwgaXNTdW5rIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXItZmFjdG9yeVwiO1xuaW1wb3J0IHBvc3NpYmxlQXR0YWNrcywge1xuICBnZXRWYWxpZEF0dGFjayxcbn0gZnJvbSBcIi4uL2dhbWVIZWxwZXJzL0FJLXBvc3NpYmxlLWF0dGFja3NcIjtcblxuY29uc3QgcGxheWVyQm9hcmRET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbmNvbnN0IEFJQm9hcmRET00gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFpLWJvYXJkXCIpO1xuY29uc3QgdHVybkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm4tZGlzcGxheVwiKTtcbmNvbnN0IGdhbWVIYW5kbGVyID0gKHBsYXllck5hbWUpID0+IHtcbiAgbGV0IHBsYXllclR1cm4gPSBcInJlYWxQbGF5ZXJcIjtcbiAgY29uc3QgcGxheWVycyA9IHtcbiAgICByZWFsUGxheWVyOiBQbGF5ZXIocGxheWVyTmFtZSksXG4gICAgQUk6IFBsYXllcihcIkFJXCIpLFxuICB9O1xuXG4gIC8vIFNoaXAgcGxhY2VtZW50XG4gIC8qIGxldCBpbGxlZ2FsU2hpcFBsYWNlbWVudHMgPSBuZXcgU2V0KCk7ICovXG5cbiAgLy8gQ2hlY2sgaWYgeSBheGlzIGlzIG91dCBvZiBib3VuZFxuXG4gIGNvbnN0IGlzT3V0T2ZCb3VuZHMgPSAoY29vcmRpbmF0ZSwgc2hpcExlbmd0aCwgYWxpZ25tZW50ID0gXCJob3Jpem9udGFsXCIpID0+XG4gICAgYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIlxuICAgICAgPyBjb29yZGluYXRlWzFdICsgc2hpcExlbmd0aCA+IDEwXG4gICAgICA6IGNvb3JkaW5hdGVbMF0gKyBzaGlwTGVuZ3RoID4gMTA7XG5cbiAgY29uc3QgZ2VuZXJhdGVQbGFjZW1lbnQgPSAoXG4gICAgY29vcmRpbmF0ZSxcbiAgICBzaGlwTGVuZ3RoLFxuICAgIGFsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiXG4gICkgPT4ge1xuICAgIGNvbnN0IHNoaXBQbGFjZW1lbnQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gXCJob3Jpem9udGFsXCIpXG4gICAgICAgIHNoaXBQbGFjZW1lbnQucHVzaChbY29vcmRpbmF0ZVswXSwgY29vcmRpbmF0ZVsxXSArIGldKTtcbiAgICAgIGVsc2Ugc2hpcFBsYWNlbWVudC5wdXNoKFtjb29yZGluYXRlWzBdICsgaSwgY29vcmRpbmF0ZVsxXV0pO1xuICAgIH1cbiAgICByZXR1cm4gc2hpcFBsYWNlbWVudDtcbiAgfTtcbiAgLyogXG4gIGNvbnN0IGlzSW5BbkFycmF5ID0gKGFycmF5LCBlbGVtZW50KSA9PlxuICAgIGFycmF5LnNvbWUoKGVsKSA9PiBpc0VxdWFsKGVsLCBlbGVtZW50KSk7ICovXG5cbiAgY29uc3QgaXNTaGlwUGxhY2VkID0gKG5hbWUsIHNoaXBMaXN0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yIChjb25zdCBzaGlwT2JqZWN0IG9mIHNoaXBMaXN0KSB7XG4gICAgICBpZiAoc2hpcE9iamVjdC5zaGlwLmdldE5hbWUoKSA9PT0gbmFtZSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBhbmNob3JBU2hpcCA9IChjaG9zZW5Db29yZGluYXRlLCBzaGlwRGF0YSkgPT4ge1xuICAgIGlmIChpc091dE9mQm91bmRzKGNob3NlbkNvb3JkaW5hdGUsIHNoaXBEYXRhLmxlbmd0aCwgc2hpcERhdGEuYWxpZ25tZW50KSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBzaGlwUGxhY2VtZW50ID0gZ2VuZXJhdGVQbGFjZW1lbnQoXG4gICAgICBjaG9zZW5Db29yZGluYXRlLFxuICAgICAgc2hpcERhdGEubGVuZ3RoLFxuICAgICAgc2hpcERhdGEuYWxpZ25tZW50XG4gICAgKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IHBsYXllcnMucmVhbFBsYXllci5ib2FyZDtcbiAgICBpZiAoXG4gICAgICBpc1NoaXBQbGFjZWQoc2hpcERhdGEubmFtZSwgcGxheWVyQm9hcmQuc2hpcExpc3QpIHx8XG4gICAgICBwbGF5ZXJCb2FyZC5pc0luSWxsZWdhbENvb3JkcyhzaGlwUGxhY2VtZW50KVxuICAgIClcbiAgICAgIHJldHVybjtcblxuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwRGF0YS5sZW5ndGgsIHNoaXBEYXRhLm5hbWUsIHNoaXBQbGFjZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkLnNoaXBMaXN0KTtcbiAgICByZXR1cm4gc2hpcFBsYWNlbWVudDtcbiAgfTtcblxuICBjb25zdCBjYW5TdGFydEdhbWUgPSAoKSA9PlxuICAgIHBsYXllcnMucmVhbFBsYXllci5ib2FyZC5zaGlwTGlzdC5sZW5ndGggPT09IDU7IC8qICAmJlxuICAgIHBsYXllcnMuQUkuYm9hcmQuc2hpcExpc3QubGVuZ3RoID09PSA1OyAqL1xuXG4gIC8vIEdhbWUgbG9vcFxuICBjb25zdCBBSVBvc3NpYmxlQXR0YWNrcyA9IHBvc3NpYmxlQXR0YWNrcztcblxuICBjb25zdCBnZXRUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXJUdXJuID09PSBcInJlYWxQbGF5ZXJcIikgcGxheWVyVHVybiA9IFwiYWlcIjtcbiAgICBlbHNlIHBsYXllclR1cm4gPSBcInJlYWxQbGF5ZXJcIjtcbiAgICByZXR1cm4gcGxheWVyVHVybjtcbiAgfTtcblxuICBjb25zdCBjb252ZXJ0VG9Db29yZGluYXRlID0gKHRhcmdldCkgPT4gW1xuICAgIE51bWJlcih0YXJnZXQuZGF0YXNldC54KSxcbiAgICBOdW1iZXIodGFyZ2V0LmRhdGFzZXQueSksXG4gIF07XG5cbiAgY29uc3QgZGlzcGxheVdob3NlVHVybiA9ICh0dXJuKSA9PiB7XG4gICAgY29uc3Qgd2hvc2VUdXJuID0gdHVybjtcbiAgICBpZiAod2hvc2VUdXJuID09PSBcInJlYWxQbGF5ZXJcIikge1xuICAgICAgdHVybkRpc3BsYXkudGV4dENvbnRlbnQgPSBcImNvbXB1dGVyJ3MgdHVyblwiO1xuICAgIH0gZWxzZSB0dXJuRGlzcGxheS50ZXh0Q29udGVudCA9IFwicGxheWVyJ3MgdHVyblwiO1xuICB9O1xuXG4gIGNvbnN0IG1hcmtTdW5rID0gKGNvb3JkcywgdHVybikgPT4ge1xuICAgIGxldCBib2FyZFRvTWFyaztcbiAgICBpZiAodHVybiA9PT0gXCJyZWFsUGxheWVyXCIpIGJvYXJkVG9NYXJrID0gQUlCb2FyZERPTTtcbiAgICBlbHNlIGJvYXJkVG9NYXJrID0gcGxheWVyQm9hcmRET007XG5cbiAgICBjb29yZHMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGhpdFNxdWFyZSA9IGJvYXJkVG9NYXJrLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS14PVwiJHtjb29yZFswXX1cIl1bZGF0YS15PVwiJHtjb29yZFsxXX1cIl1gXG4gICAgICApO1xuICAgICAgaGl0U3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IG1hcmtTcXVhcmUgPSAoY29vcmRpbmF0ZSwgeyBoaXQsIHN1bmssIGNvb3JkcyB9LCB0dXJuKSA9PiB7XG4gICAgbGV0IHRhcmdldDtcbiAgICBpZiAodHVybiA9PT0gXCJyZWFsUGxheWVyXCIpIHtcbiAgICAgIHRhcmdldCA9IEFJQm9hcmRET00ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC5zcXVhcmVbZGF0YS14PVwiJHtjb29yZGluYXRlWzBdfVwiXVtkYXRhLXk9XCIke2Nvb3JkaW5hdGVbMV19XCJdYFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHR1cm4gPT09IFwiYWlcIikge1xuICAgICAgdGFyZ2V0ID0gcGxheWVyQm9hcmRET00ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC5zcXVhcmVbZGF0YS14PVwiJHtjb29yZGluYXRlWzBdfVwiXVtkYXRhLXk9XCIke2Nvb3JkaW5hdGVbMV19XCJdYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoaGl0ID09PSB0cnVlKSB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICBlbHNlIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICB9O1xuXG4gIGNvbnN0IHBsYXllck1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICBBSUJvYXJkRE9NLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgY29uc3QgcGxheWVyVGFyZ2V0ID0gY29udmVydFRvQ29vcmRpbmF0ZShldmVudC50YXJnZXQpO1xuICAgIGNvbnN0IHBsYXllckF0dGFjayA9IHBsYXllcnMucmVhbFBsYXllci5hdHRhY2socGxheWVycy5BSSwgcGxheWVyVGFyZ2V0KTtcbiAgICBjb25zdCBjdXJyZW50VHVybiA9IGdldFR1cm4oKTtcbiAgICBkaXNwbGF5V2hvc2VUdXJuKGN1cnJlbnRUdXJuKTtcbiAgICBtYXJrU3F1YXJlKHBsYXllclRhcmdldCwgcGxheWVyQXR0YWNrLCBjdXJyZW50VHVybik7XG4gICAgaWYgKHBsYXllckF0dGFjay5zdW5rID09PSB0cnVlKSBtYXJrU3VuayhwbGF5ZXJBdHRhY2suY29vcmRzLCBjdXJyZW50VHVybik7XG4gICAgY2hhbmdlVHVybigpO1xuICB9O1xuXG4gIGNvbnN0IEFJTW92ZSA9ICgpID0+IHtcbiAgICBpZiAocGxheWVycy5BSS5ib2FyZC5hcmVBbGxTdW5rKCkpIHJldHVybjtcbiAgICBjb25zdCBjdXJyZW50VHVybiA9IGdldFR1cm4oKTtcbiAgICBjb25zdCBBSVRhcmdldCA9IGdldFZhbGlkQXR0YWNrKEFJUG9zc2libGVBdHRhY2tzKTtcbiAgICBjb25zdCBBSUF0dGFjayA9IHBsYXllcnMuQUkuYXR0YWNrKHBsYXllcnMucmVhbFBsYXllciwgQUlUYXJnZXQpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBtYXJrU3F1YXJlKEFJVGFyZ2V0LCBBSUF0dGFjaywgY3VycmVudFR1cm4pO1xuICAgICAgaWYgKEFJQXR0YWNrLnN1bmsgPT09IHRydWUpIG1hcmtTdW5rKEFJQXR0YWNrLmNvb3JkcywgY3VycmVudFR1cm4pO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRpc3BsYXlXaG9zZVR1cm4oY3VycmVudFR1cm4pO1xuICAgIH0sIDcwMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNoYW5nZVR1cm4oKTtcbiAgICAgIEFJQm9hcmRET00uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9LCA4MDApO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0QXR0YWNrID0gKGUpID0+IHtcbiAgICBpZiAoXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzZWRcIikgfHxcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fFxuICAgICAgZ2V0VHVybigpID09PSBcImFpXCIgfHxcbiAgICAgIHBsYXllcnMuQUkuYm9hcmQuYXJlQWxsU3VuaygpIHx8XG4gICAgICBwbGF5ZXJzLnJlYWxQbGF5ZXIuYm9hcmQuYXJlQWxsU3VuaygpXG4gICAgKVxuICAgICAgcmV0dXJuO1xuICAgIHBsYXllck1vdmUoZSk7XG4gICAgQUlNb3ZlKCk7XG4gIH07XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+XG4gICAgcGxheWVycy5BSS5ib2FyZC5hcmVBbGxTdW5rKCkgfHwgcGxheWVycy5yZWFsUGxheWVyLmJvYXJkLmFyZUFsbFN1bmsoKTtcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0QXR0YWNrLFxuICAgIHBsYXllcnMsXG4gICAgYW5jaG9yQVNoaXAsXG4gICAgY2FuU3RhcnRHYW1lLFxuICAgIGlzT3V0T2ZCb3VuZHMsXG4gICAgaXNHYW1lT3ZlcixcbiAgICBnZXRUdXJuLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUhhbmRsZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuaW1wb3J0IGlzRXF1YWwgZnJvbSBcImxvZGFzaC5pc2VxdWFsXCI7XG5pbXBvcnQgcG9zc2libGVBdHRhY2tzIGZyb20gXCIuLi9nYW1lSGVscGVycy9BSS1wb3NzaWJsZS1hdHRhY2tzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLWZhY3RvcnlcIjtcbmltcG9ydCB7IGlsbGVnYWxWYXJpYW50cywgc2hpcEFycmF5IH0gZnJvbSBcIi4uL2dhbWVIZWxwZXJzL3BsYWNlbWVudC1oZWxwZXJzXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbLi4ucG9zc2libGVBdHRhY2tzXTtcbiAgY29uc3Qgc2hpcExpc3QgPSBbXTtcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHVuYXZhaWxhYmxlQ29vcmRzID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0IGlzSW5BbkFycmF5ID0gKGFycmF5LCBlbGVtZW50KSA9PlxuICAgIGFycmF5LnNvbWUoKGVsKSA9PiBpc0VxdWFsKGVsLCBlbGVtZW50KSk7XG5cbiAgY29uc3QgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMgPSAoXG4gICAgY29vcmRpbmF0ZXMsXG4gICAgaWxsZWdhbFBvc3NpYmlsaXRlcyA9IGlsbGVnYWxWYXJpYW50cyxcbiAgICBpbGxlZ2FsU2V0ID0gdW5hdmFpbGFibGVDb29yZHNcbiAgKSA9PiB7XG4gICAgY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWxsZWdhbFBvc3NpYmlsaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpbGxlZ2FsVmFyaWFudCA9IGlsbGVnYWxQb3NzaWJpbGl0ZXNbaV07XG4gICAgICAgIGNvbnN0IGlsbGVnYWxNb3ZlID0gW1xuICAgICAgICAgIGNvb3JkWzBdICsgaWxsZWdhbFZhcmlhbnRbMF0sXG4gICAgICAgICAgY29vcmRbMV0gKyBpbGxlZ2FsVmFyaWFudFsxXSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlsbGVnYWxNb3ZlWzBdID49IDAgJiZcbiAgICAgICAgICBpbGxlZ2FsTW92ZVswXSA8PSA5ICYmXG4gICAgICAgICAgaWxsZWdhbE1vdmVbMV0gPj0gMCAmJlxuICAgICAgICAgIGlsbGVnYWxNb3ZlWzFdIDw9IDkgJiZcbiAgICAgICAgICBpc0luQW5BcnJheShjb29yZGluYXRlcywgaWxsZWdhbE1vdmUpID09PSBmYWxzZVxuICAgICAgICApXG4gICAgICAgICAgaWxsZWdhbFNldC5hZGQoU3RyaW5nKGlsbGVnYWxNb3ZlKSk7XG4gICAgICB9XG4gICAgICBpbGxlZ2FsU2V0LmFkZChTdHJpbmcoY29vcmQpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBpc0luSWxsZWdhbENvb3JkcyA9IChcbiAgICBzaGlwUGxhY2VtZW50LFxuICAgIGlsbGVnYWxNb3ZlcyA9IHVuYXZhaWxhYmxlQ29vcmRzXG4gICkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3QgcGxhY2VtZW50IG9mIHNoaXBQbGFjZW1lbnQpIHtcbiAgICAgIGlmIChpbGxlZ2FsTW92ZXMuaGFzKFN0cmluZyhwbGFjZW1lbnQpKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBuYW1lLCBjb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IHNoaXBPYmplY3QgPSB7XG4gICAgICBzaGlwOiBTaGlwKGxlbmd0aCwgbmFtZSksXG4gICAgICBjb29yZGluYXRlcyxcbiAgICB9O1xuICAgIHNoaXBMaXN0LnB1c2goc2hpcE9iamVjdCk7XG4gICAgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMoY29vcmRpbmF0ZXMsIGlsbGVnYWxWYXJpYW50cywgdW5hdmFpbGFibGVDb29yZHMpO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRpbmF0ZSkgPT4ge1xuICAgIGNvbnN0IGluZGV4T2ZTaGlwID0gY2hlY2tIaXQoY29vcmRpbmF0ZSk7XG4gICAgaWYgKGluZGV4T2ZTaGlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHNoaXBJbkxpc3QgPSBzaGlwTGlzdFtpbmRleE9mU2hpcF07XG4gICAgICBzaGlwSW5MaXN0LnNoaXAuaGl0KCk7XG4gICAgICBpZiAoc2hpcEluTGlzdC5zaGlwLmlzU3VuaygpKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhpdDogdHJ1ZSxcbiAgICAgICAgICBzdW5rOiB0cnVlLFxuICAgICAgICAgIGNvb3Jkczogc2hpcEluTGlzdC5jb29yZGluYXRlcyxcbiAgICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhpdDogdHJ1ZSxcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGNvb3JkczogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIG1pc3NlZFNob3RzLmFkZChTdHJpbmcoY29vcmRpbmF0ZSkpO1xuICAgIHJldHVybiB7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgICAgc3VuazogZmFsc2UsXG4gICAgICBjb29yZHM6IG51bGwsXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hpdCA9IChjb29yZGluYXRlKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBzaGlwTGlzdCkge1xuICAgICAgaWYgKG9iamVjdC5jb29yZGluYXRlcy5zb21lKCh4KSA9PiBpc0VxdWFsKGNvb3JkaW5hdGUsIHgpKSkgcmV0dXJuIGluZGV4O1xuICAgICAgaW5kZXggKz0gMTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU3VuayA9ICgpID0+IHNoaXBMaXN0LmV2ZXJ5KChlbCkgPT4gZWwuc2hpcC5pc1N1bmsoKSk7XG5cbiAgLy8gQUkgcmFuZG9tIHNoaXAgcGxhY2VtZW50XG4gIGNvbnN0IGdldFJhbmRvbUluZGV4ID0gKGluZGV4QXJyYXkpID0+XG4gICAgaW5kZXhBcnJheS5zcGxpY2UoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaW5kZXhBcnJheS5sZW5ndGgpLCAxKTtcblxuICBjb25zdCBnZXRSYW5kb21BbGlnbm1lbnQgPSAoYWxpZ25tZW50cyA9IFtcImhvcml6b250YWxcIiwgXCJ2ZXJ0aWNhbFwiXSkgPT5cbiAgICBhbGlnbm1lbnRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcblxuICBjb25zdCBnZXRJbml0aWFsQm9hcmRTcXVhcmUgPSAoc2hpcExlbmd0aCwgYWxpZ25tZW50KSA9PiB7XG4gICAgbGV0IGluaXRpYWxCb2FyZFNxdWFyZTtcbiAgICB3aGlsZSAoXG4gICAgICBpbml0aWFsQm9hcmRTcXVhcmUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdW5hdmFpbGFibGVDb29yZHMuaGFzKFN0cmluZyhpbml0aWFsQm9hcmRTcXVhcmUpKVxuICAgICkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbENvb3JkID1cbiAgICAgICAgICBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmQubGVuZ3RoIC0gc2hpcExlbmd0aCkpXTtcblxuICAgICAgICAvLyBQcmV2ZW50IGZyb20gZ29pbmcgb3V0IG9mIGJvdW5kcyBvbiB5IGF4aXNcbiAgICAgICAgaWYgKGhvcml6b250YWxDb29yZFsxXSArIHNoaXBMZW5ndGggPD0gMTApXG4gICAgICAgICAgaW5pdGlhbEJvYXJkU3F1YXJlID0gaG9yaXpvbnRhbENvb3JkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbENvb3JkID1cbiAgICAgICAgICBib2FyZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoKHNoaXBMZW5ndGggKyAxKSAqIDEwKSldO1xuXG4gICAgICAgIC8vIFByZXZlbnQgZnJvbSBnb2luZyBvdXQgb2YgYm91bmRzIG9uIHggYXhpc1xuICAgICAgICBpZiAoaG9yaXpvbnRhbENvb3JkWzBdICsgc2hpcExlbmd0aCA8PSAxMClcbiAgICAgICAgICBpbml0aWFsQm9hcmRTcXVhcmUgPSBob3Jpem9udGFsQ29vcmQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbml0aWFsQm9hcmRTcXVhcmU7XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tUGxhY2VtZW50ID0gKHNoaXBMZW5ndGgpID0+IHtcbiAgICBjb25zdCBwbGFjZW1lbnQgPSBbXTtcbiAgICB3aGlsZSAocGxhY2VtZW50Lmxlbmd0aCA8PSAxKSB7XG4gICAgICBjb25zdCBhbGlnbm1lbnQgPSBnZXRSYW5kb21BbGlnbm1lbnQoKTtcbiAgICAgIGNvbnN0IGluaXRpYWxDb29yZCA9IGdldEluaXRpYWxCb2FyZFNxdWFyZShzaGlwTGVuZ3RoLCBhbGlnbm1lbnQpO1xuICAgICAgcGxhY2VtZW50LnB1c2goaW5pdGlhbENvb3JkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gY29uc3QgbGFzdEl0ZW0gPSBwbGFjZW1lbnRbcGxhY2VtZW50Lmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIilcbiAgICAgICAgICBwbGFjZW1lbnQucHVzaChbaW5pdGlhbENvb3JkWzBdLCBpbml0aWFsQ29vcmRbMV0gKyBpXSk7XG4gICAgICAgIGVsc2UgcGxhY2VtZW50LnB1c2goW2luaXRpYWxDb29yZFswXSArIGksIGluaXRpYWxDb29yZFsxXV0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzSW5JbGxlZ2FsQ29vcmRzKHBsYWNlbWVudCkpIHBsYWNlbWVudC5zcGxpY2UoMCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVJbGxlZ2FsTW92ZXMocGxhY2VtZW50KTtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9O1xuICBjb25zdCByYW5kb21seVBsYWNlU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5kZXhBcnJheSA9IFswLCAxLCAyLCAzLCA0XTtcbiAgICB3aGlsZSAoaW5kZXhBcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gZ2V0UmFuZG9tSW5kZXgoaW5kZXhBcnJheSk7XG4gICAgICBjb25zdCBzaGlwSGVscGVyID0gc2hpcEFycmF5W3JhbmRvbUluZGV4XTtcbiAgICAgIGNvbnN0IHNoaXBQbGFjZW1lbnQgPSBnZXRSYW5kb21QbGFjZW1lbnQoc2hpcEhlbHBlci5sZW5ndGgpO1xuICAgICAgcGxhY2VTaGlwKHNoaXBIZWxwZXIubGVuZ3RoLCBzaGlwSGVscGVyLm5hbWUsIHNoaXBQbGFjZW1lbnQpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBzaGlwTGlzdCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBtaXNzZWRTaG90cyxcbiAgICBhcmVBbGxTdW5rLFxuICAgIHVuYXZhaWxhYmxlQ29vcmRzLFxuICAgIGlzSW5JbGxlZ2FsQ29vcmRzLFxuICAgIHJhbmRvbWx5UGxhY2VTaGlwcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICBjb25zdCBib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgY29vcmRpbmF0ZSkgPT4gZW5lbXkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKTtcblxuICByZXR1cm4geyBnZXROYW1lLCBib2FyZCwgYXR0YWNrIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvbm9yd2VzdGVyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9hc3NldHMvZm9udHMvbm9yd2VzdGVyLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9mb250cy9hcm1hbGl0ZV9yaWZsZS53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2ZvbnRzL2FybWFsaXRlX3JpZmxlLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yd2VzdGVyXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJBcm1hbGl0ZVJpZmxlXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcblxcbjpyb290IHtcXG4gIC0tcHJpbWFyeTogIzBlNGI2YztcXG4gIC0tc2Vjb25kYXJ5OiAjMGEwYTBhO1xcbiAgLS10ZXJ0aWFyeTogIzE1NTY4NDtcXG4gIC0tbGlnaHQtZ3JlZW46ICM0OGJmOTE7XFxuICAtLWxpZ2h0LXJlZDogI2UwMzMzMztcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yd2VzdGVyXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC1ncmVlbik7XFxufVxcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiBQcmV2ZW50cyBmcm9tIGRyYWdnaW5nIHNlbGVjdGVkIHRleHQgdG8gZHJvcHBhYmxlIGVsZW1lbnQgKi9cXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5odG1sIHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICMxNjE2MTYsICMyZTJlMmUsICMxNjE2MTYpO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDEwMCU7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOb3J3ZXN0ZXJcXFwiO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgcGFkZGluZzogMS41cmVtO1xcbiAgcGFkZGluZy1sZWZ0OiAyLjVyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuaGVhZGVyID4gaDEge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJBcm1hbGl0ZVJpZmxlXFxcIjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjVyZW07XFxuICBmb250LXNpemU6IDMuNXJlbTtcXG4gIHBhZGRpbmc6IDAgMS41cmVtO1xcbiAgdGV4dC1zaGFkb3c6IDAuNHJlbSAwLjRyZW0gMC4ycmVtIHJnYigwLCAwLCAwKTtcXG4gIHRyYW5zaXRpb246IDEwMG1zIGVhc2UtaW4tb3V0O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5oMTphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB2YXIoLS1saWdodC1ncmVlbik7XFxuICB0b3A6IDRyZW07XFxuICBsZWZ0OiAxcmVtOyBcXG4gIHdpZHRoOiAwO1xcbiAgdHJhbnNpdGlvbjogd2lkdGggY3ViaWMtYmV6aWVyKC45NywuMDMsLjQ2LDEuMjcpIDQwMG1zO1xcbn1cXG5cXG5oMTpob3ZlcjphZnRlcntcXG4gIHdpZHRoOiA5MCU7XFxufVxcblxcbnN2Zy5naXRodWItbG9nb3tcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSBlYXNlLWluIDM1MG1zO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBmaWxsOiB2YXIoLS1saWdodC1ncmVlbikgIWltcG9ydGFudDtcXG59XFxuc3ZnLmdpdGh1Yi1sb2dvOmhvdmVye1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIGZpbHRlcjogc2F0dXJhdGUoMTApO1xcbn1cXG5zdmcuZ2l0aHViLWxvZ286YWN0aXZle1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgyKTtcXG59XFxubWFpbiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMnJlbTtcXG5cXG59XFxuI3R1cm4tZGlzcGxheSB7XFxuICB3aWR0aDogODAlO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1zaGFkb3c6IC42cmVtIC42cmVtIDFyZW0gcmdiYSgwLCAwLCAwLCAwLjkpO1xcbn1cXG4jcGxheWVyLWJvYXJkLFxcbiNhaS1ib2FyZCxcXG4jcGxhY2Utc2hpcC1ib2FyZCB7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIGJsYWNrO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgbWFyZ2luOiAwLjVyZW07XFxuICBnYXA6IDAuMDVyZW07XFxuICBib3gtc2hhZG93OiAwcHggMXJlbSAycmVtIDNweCByZ2JhKDAsIDAsIDAsIDAuNyk7XFxufVxcblxcbiNwbGF5ZXItYm9hcmQsXFxuI2FpLWJvYXJkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxufVxcblxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyODI4O1xcbiAgLyogYm94LXNoYWRvdzogLTNweCAzcHggdmFyKC0tbGlnaHQtZ3JlZW4pLCAtMnB4IDJweCB2YXIoLS1saWdodC1ncmVlbiksXFxuICAgIC0xcHggMXB4IHZhcigtLWxpZ2h0LWdyZWVuKTsgKi9cXG4gIGNvbG9yOiB2YXIoLS1saWdodC1ncmVlbik7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLyogQm9hcmQgY2xhc3NlcyAqL1xcbi5zcXVhcmUge1xcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tc2Vjb25kYXJ5KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRlcnRpYXJ5KTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmFjdGl2ZSA+IC5zcXVhcmU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4YmY5MTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLm1pc3NlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGY4ZjhmO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5hbmNob3JlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiZjkxO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMDMzMzM7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLnN1bms6OmFmdGVye1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLC01MCUpO1xcbiAgY29udGVudDogXFxcIlhcXFwiO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XFxufVxcbi5kcmFnb3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiZjkxO1xcbn1cXG4ucmVtb3ZlZCB7XFxuICBvcGFjaXR5OiAwLjI7XFxufVxcbi5vdXRPZkJvdW5kcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4uYmxvY2sge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB3aWR0aDogNDBweDtcXG59XFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDo4NTBweCkge1xcbiAgbWFpbntcXG4gICAgbWFyZ2luLXRvcDogOHJlbTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuXFxuICAjdHVybi1kaXNwbGF5e1xcbiAgICBncmlkLWNvbHVtbjogc3BhbiAyO1xcbiAgICBncmlkLXJvdy1zdGFydDogMTtcXG4gICAgbWFyZ2luLWJvdHRvbTogN3JlbTtcXG4gICAgZm9udC1zaXplOiA0cmVtO1xcbiAgfVxcbn1cXG5cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDoxMjIwcHgpIHtcXG4gICNwbGF5ZXItYm9hcmQsXFxuICAjYWktYm9hcmQge1xcbiAgICB3aWR0aDogNTByZW07XFxuICAgIGhlaWdodDogNTByZW07XFxuICB9XFxuICBoZWFkZXJ7XFxuICAgIHBhZGRpbmctbGVmdDogMTNyZW07XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx3QkFBd0I7RUFDeEI7MERBQ3FEO0FBQ3ZEO0FBQ0E7RUFDRSw0QkFBNEI7RUFDNUI7MERBQzBEO0FBQzVEOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixlQUFlO0VBQ2Ysb0NBQW9DO0VBQ3BDLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLDhEQUE4RDtFQUM5RCxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsWUFBWTtFQUNaLHNFQUFzRTtFQUN0RSw2QkFBNkI7RUFDN0Isc0JBQXNCO0VBQ3RCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixvQkFBb0I7RUFDcEIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsNEJBQTRCO0VBQzVCLHNCQUFzQjtFQUN0QixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLDhDQUE4QztFQUM5Qyw2QkFBNkI7RUFDN0Isa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLDJDQUEyQztFQUMzQyxTQUFTO0VBQ1QsVUFBVTtFQUNWLFFBQVE7RUFDUixzREFBc0Q7QUFDeEQ7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsV0FBVztFQUNYLFlBQVk7RUFDWixtQ0FBbUM7QUFDckM7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLFNBQVM7O0FBRVg7QUFDQTtFQUNFLFVBQVU7RUFDVixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdEQUFnRDtBQUNsRDtBQUNBOzs7RUFHRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxjQUFjO0VBQ2QsWUFBWTtFQUNaLGdEQUFnRDtBQUNsRDs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osYUFBYTtBQUNmOzs7QUFHQTtFQUNFLHlCQUF5QjtFQUN6QjtrQ0FDZ0M7RUFDaEMseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUEsa0JBQWtCO0FBQ2xCO0VBQ0Usa0NBQWtDO0VBQ2xDLGlDQUFpQztFQUNqQyxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsK0JBQStCO0VBQy9CLFlBQVk7RUFDWixlQUFlO0VBQ2YsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSx5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFdBQVc7QUFDYjtBQUNBO0VBQ0UsYUFBYTtBQUNmOzs7O0FBSUE7RUFDRTtJQUNFLGdCQUFnQjtJQUNoQiw4QkFBOEI7SUFDOUIscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsZUFBZTtFQUNqQjtBQUNGOzs7QUFHQTtFQUNFOztJQUVFLFlBQVk7SUFDWixhQUFhO0VBQ2Y7RUFDQTtJQUNFLG1CQUFtQjtFQUNyQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOb3J3ZXN0ZXJcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIn4uL2Fzc2V0cy9mb250cy9ub3J3ZXN0ZXIud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgIHVybChcXFwiLi9hc3NldHMvZm9udHMvbm9yd2VzdGVyLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIkFybWFsaXRlUmlmbGVcXFwiO1xcbiAgc3JjOiB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL2FybWFsaXRlX3JpZmxlLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICB1cmwoXFxcIi4vYXNzZXRzL2ZvbnRzL2FybWFsaXRlX3JpZmxlLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1wcmltYXJ5OiAjMGU0YjZjO1xcbiAgLS1zZWNvbmRhcnk6ICMwYTBhMGE7XFxuICAtLXRlcnRpYXJ5OiAjMTU1Njg0O1xcbiAgLS1saWdodC1ncmVlbjogIzQ4YmY5MTtcXG4gIC0tbGlnaHQtcmVkOiAjZTAzMzMzO1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOb3J3ZXN0ZXJcXFwiLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LWdyZWVuKTtcXG59XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIC8qIFByZXZlbnRzIGZyb20gZHJhZ2dpbmcgc2VsZWN0ZWQgdGV4dCB0byBkcm9wcGFibGUgZWxlbWVudCAqL1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbmh0bWwge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzE2MTYxNiwgIzJlMmUyZSwgIzE2MTYxNik7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgMTAwJTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBmb250LWZhbWlseTogXFxcIk5vcndlc3RlclxcXCI7XFxufVxcblxcbmhlYWRlciB7XFxuICBwYWRkaW5nOiAxLjVyZW07XFxuICBwYWRkaW5nLWxlZnQ6IDIuNXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5oZWFkZXIgPiBoMSB7XFxuICBmb250LWZhbWlseTogXFxcIkFybWFsaXRlUmlmbGVcXFwiO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXJlbTtcXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xcbiAgcGFkZGluZzogMCAxLjVyZW07XFxuICB0ZXh0LXNoYWRvdzogMC40cmVtIDAuNHJlbSAwLjJyZW0gcmdiKDAsIDAsIDApO1xcbiAgdHJhbnNpdGlvbjogMTAwbXMgZWFzZS1pbi1vdXQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbmgxOmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWxpZ2h0LWdyZWVuKTtcXG4gIHRvcDogNHJlbTtcXG4gIGxlZnQ6IDFyZW07IFxcbiAgd2lkdGg6IDA7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCBjdWJpYy1iZXppZXIoLjk3LC4wMywuNDYsMS4yNykgNDAwbXM7XFxufVxcblxcbmgxOmhvdmVyOmFmdGVye1xcbiAgd2lkdGg6IDkwJTtcXG59XFxuXFxuc3ZnLmdpdGh1Yi1sb2dve1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIGVhc2UtaW4gMzUwbXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMzVweDtcXG4gIGZpbGw6IHZhcigtLWxpZ2h0LWdyZWVuKSAhaW1wb3J0YW50O1xcbn1cXG5zdmcuZ2l0aHViLWxvZ286aG92ZXJ7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgZmlsdGVyOiBzYXR1cmF0ZSgxMCk7XFxufVxcbnN2Zy5naXRodWItbG9nbzphY3RpdmV7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbn1cXG5tYWluIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAycmVtO1xcblxcbn1cXG4jdHVybi1kaXNwbGF5IHtcXG4gIHdpZHRoOiA4MCU7XFxuICBmb250LXNpemU6IDNyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXNoYWRvdzogLjZyZW0gLjZyZW0gMXJlbSByZ2JhKDAsIDAsIDAsIDAuOSk7XFxufVxcbiNwbGF5ZXItYm9hcmQsXFxuI2FpLWJvYXJkLFxcbiNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gIGJvcmRlcjogMC41cHggc29saWQgYmxhY2s7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBtYXJnaW46IDAuNXJlbTtcXG4gIGdhcDogMC4wNXJlbTtcXG4gIGJveC1zaGFkb3c6IDBweCAxcmVtIDJyZW0gM3B4IHJnYmEoMCwgMCwgMCwgMC43KTtcXG59XFxuXFxuI3BsYXllci1ib2FyZCxcXG4jYWktYm9hcmQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG59XFxuXFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyODI4Mjg7XFxuICAvKiBib3gtc2hhZG93OiAtM3B4IDNweCB2YXIoLS1saWdodC1ncmVlbiksIC0ycHggMnB4IHZhcigtLWxpZ2h0LWdyZWVuKSxcXG4gICAgLTFweCAxcHggdmFyKC0tbGlnaHQtZ3JlZW4pOyAqL1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LWdyZWVuKTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4vKiBCb2FyZCBjbGFzc2VzICovXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGVydGlhcnkpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uYWN0aXZlID4gLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDhiZjkxO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ubWlzc2VkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZjhmOGY7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmFuY2hvcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0OGJmOTE7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwMzMzMztcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uc3Vuazo6YWZ0ZXJ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XFxuICBjb250ZW50OiBcXFwiWFxcXCI7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcXG59XFxuLmRyYWdvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0OGJmOTE7XFxufVxcbi5yZW1vdmVkIHtcXG4gIG9wYWNpdHk6IDAuMjtcXG59XFxuLm91dE9mQm91bmRzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbi5ibG9jayB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHdpZHRoOiA0MHB4O1xcbn1cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcblxcblxcbkBtZWRpYSAobWluLXdpZHRoOjg1MHB4KSB7XFxuICBtYWlue1xcbiAgICBtYXJnaW4tdG9wOiA4cmVtO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG5cXG4gICN0dXJuLWRpc3BsYXl7XFxuICAgIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxuICAgIGdyaWQtcm93LXN0YXJ0OiAxO1xcbiAgICBtYXJnaW4tYm90dG9tOiA3cmVtO1xcbiAgICBmb250LXNpemU6IDRyZW07XFxuICB9XFxufVxcblxcblxcbkBtZWRpYSAobWluLXdpZHRoOjEyMjBweCkge1xcbiAgI3BsYXllci1ib2FyZCxcXG4gICNhaS1ib2FyZCB7XFxuICAgIHdpZHRoOiA1MHJlbTtcXG4gICAgaGVpZ2h0OiA1MHJlbTtcXG4gIH1cXG4gIGhlYWRlcntcXG4gICAgcGFkZGluZy1sZWZ0OiAxM3JlbTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLm1vZGFsIHtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC1ncmVlbik7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICMxNjE2MTYsICMyZTJlMmUgMTAlLCAjMTYxNjE2KTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1vdXQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgei1pbmRleDogMTA7XFxuICBib3JkZXI6IDVweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG59XFxuLm1vZGFsLmFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcXG59XFxuXFxuI292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWN0aXkgMjAwbXMgZWFzZS1vdXQ7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuI292ZXJsYXkuYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG4vKiAgICAgICBTSElQIEZBQ1RPUlkgICAgICAgICAgICAgKi9cXG4jYm9hcmQtY3JlYXRvci5tb2RhbCB7XFxuICBtYXgtd2lkdGg6IDkwJTtcXG4gIHdpZHRoOiAxMDAwcHg7XFxuICBtYXgtaGVpZ2h0OiA3MCU7XFxuICBoZWlnaHQ6IDcwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMC44ZnIgM2ZyIDNmciAxLjVmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmgyLmJvYXJkLWNyZWF0b3ItaGVhZGVyIHtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQXJtYWxpdGVSaWZsZVxcXCI7XFxufVxcbiNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzAwcHg7XFxufVxcbiNzaGlwcy1jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxcmVtO1xcbn1cXG4uc2hpcCB7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBib3gtc2hhZG93OiAwcHggMC4zcmVtIDAuMnJlbSAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG4uc2hpcC52ZXJ0aWNhbCB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XFxufVxcbi5ibG9jayB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGhlaWdodDogM3JlbTtcXG4gIHdpZHRoOiAzcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4YmY5MTtcXG59XFxuXFxuI3N0YXJ0LFxcbiNib2FyZC1yZXNldCxcXG4jYWxpZ25tZW50LWJ0bixcXG4jZ2FtZS1yZXNldCB7XFxuICBmb250LWZhbWlseTogXFxcIk5vcndlc3RlclxcXCI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBmb250LXNpemU6IDEuN3JlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgbWFyZ2luOiAwLjVyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBmaWx0ZXIsIGJveC1zaGFkb3cgMTAwbXMgZWFzZS1pbjtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGZpbHRlcjogc2F0dXJhdGUoNjAlKTtcXG4gIGJveC1zaGFkb3c6IDBweCA1cHggMTZweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG5idXR0b246YWN0aXZlIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC45Myk7XFxufVxcblxcbi8qIEdhbWUgb3ZlciBtb2RhbCAqL1xcbiNnYW1lb3Zlci1kaXNwbGF5IHtcXG4gIG1heC13aWR0aDogNTAlO1xcbiAgbWF4LWhlaWdodDogNTAlO1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIHdpZHRoOiA0MHJlbTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1cmVtO1xcbn1cXG5cXG5oMyNnYW1lb3Zlci1yZXN1bHQge1xcbiAgZm9udC1zaXplOiA0cmVtO1xcbn1cXG5cXG5idXR0b24jZ2FtZS1yZXNldCB7XFxuICBwYWRkaW5nOiAycmVtO1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA4NjBweCkge1xcbiAgI2JvYXJkLWNyZWF0b3IubW9kYWwge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMC44ZnIgNWZyIDEuNWZyO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgfVxcblxcbiAgaDIuYm9hcmQtY3JlYXRvci1oZWFkZXIsXFxuICAuYnV0dG9ucyB7XFxuICAgIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxuICB9XFxuICBoMi5ib2FyZC1jcmVhdG9yLWhlYWRlciB7XFxuICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gIH1cXG4gICNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gICAgaGVpZ2h0OiA0MHJlbTtcXG4gICAgd2lkdGg6IDQwcmVtO1xcbiAgfVxcbiAgLmJsb2NrIHtcXG4gICAgd2lkdGg6IDRyZW07XFxuICAgIGhlaWdodDogNHJlbTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9tb2RhbHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UseUJBQXlCO0VBQ3pCLDBFQUEwRTtFQUMxRSxlQUFlO0VBQ2YsUUFBUTtFQUNSLFNBQVM7RUFDVCx5Q0FBeUM7RUFDekMsb0NBQW9DO0VBQ3BDLGtDQUFrQztFQUNsQyxXQUFXO0VBQ1gsa0NBQWtDO0VBQ2xDLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFVBQVU7RUFDVixrQ0FBa0M7RUFDbEMsTUFBTTtFQUNOLFFBQVE7RUFDUixTQUFTO0VBQ1QsT0FBTztFQUNQLG9DQUFvQztFQUNwQyxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0FBQ3JCO0FBQ0EsbUNBQW1DO0FBQ25DO0VBQ0UsY0FBYztFQUNkLGFBQWE7RUFDYixlQUFlO0VBQ2YsYUFBYTtFQUNiLGFBQWE7RUFDYix1Q0FBdUM7RUFDdkMsbUJBQW1CO0VBQ25CLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZiw0QkFBNEI7QUFDOUI7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7QUFDQTtFQUNFLGNBQWM7RUFDZCxhQUFhO0VBQ2IsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixvREFBb0Q7QUFDdEQ7QUFDQTtFQUNFLGlDQUFpQztBQUNuQztBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0VBQ1gseUJBQXlCO0FBQzNCOztBQUVBOzs7O0VBSUUsd0JBQXdCO0VBQ3hCLHlCQUF5QjtFQUN6QixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsa0NBQWtDO0VBQ2xDLGNBQWM7RUFDZCxlQUFlO0VBQ2YsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLCtDQUErQztBQUNqRDs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQSxvQkFBb0I7QUFDcEI7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLGFBQWE7RUFDYixZQUFZOztFQUVaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFO0lBQ0UsOEJBQThCO0lBQzlCLG1DQUFtQztJQUNuQyxhQUFhO0VBQ2Y7O0VBRUE7O0lBRUUsbUJBQW1CO0VBQ3JCO0VBQ0E7SUFDRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxhQUFhO0lBQ2IsWUFBWTtFQUNkO0VBQ0E7SUFDRSxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm1vZGFsIHtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC1ncmVlbik7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICMxNjE2MTYsICMyZTJlMmUgMTAlLCAjMTYxNjE2KTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMCk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMjAwbXMgZWFzZS1vdXQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgei1pbmRleDogMTA7XFxuICBib3JkZXI6IDVweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG59XFxuLm1vZGFsLmFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcXG59XFxuXFxuI292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWN0aXkgMjAwbXMgZWFzZS1vdXQ7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuI292ZXJsYXkuYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG4vKiAgICAgICBTSElQIEZBQ1RPUlkgICAgICAgICAgICAgKi9cXG4jYm9hcmQtY3JlYXRvci5tb2RhbCB7XFxuICBtYXgtd2lkdGg6IDkwJTtcXG4gIHdpZHRoOiAxMDAwcHg7XFxuICBtYXgtaGVpZ2h0OiA3MCU7XFxuICBoZWlnaHQ6IDcwMHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMC44ZnIgM2ZyIDNmciAxLjVmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmgyLmJvYXJkLWNyZWF0b3ItaGVhZGVyIHtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQXJtYWxpdGVSaWZsZVxcXCI7XFxufVxcbiNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzAwcHg7XFxufVxcbiNzaGlwcy1jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxcmVtO1xcbn1cXG4uc2hpcCB7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBib3gtc2hhZG93OiAwcHggMC4zcmVtIDAuMnJlbSAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbn1cXG4uc2hpcC52ZXJ0aWNhbCB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uICFpbXBvcnRhbnQ7XFxufVxcbi5ibG9jayB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGhlaWdodDogM3JlbTtcXG4gIHdpZHRoOiAzcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ4YmY5MTtcXG59XFxuXFxuI3N0YXJ0LFxcbiNib2FyZC1yZXNldCxcXG4jYWxpZ25tZW50LWJ0bixcXG4jZ2FtZS1yZXNldCB7XFxuICBmb250LWZhbWlseTogXFxcIk5vcndlc3RlclxcXCI7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBmb250LXNpemU6IDEuN3JlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xcbiAgbWFyZ2luOiAwLjVyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBmaWx0ZXIsIGJveC1zaGFkb3cgMTAwbXMgZWFzZS1pbjtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGZpbHRlcjogc2F0dXJhdGUoNjAlKTtcXG4gIGJveC1zaGFkb3c6IDBweCA1cHggMTZweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG5idXR0b246YWN0aXZlIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC45Myk7XFxufVxcblxcbi8qIEdhbWUgb3ZlciBtb2RhbCAqL1xcbiNnYW1lb3Zlci1kaXNwbGF5IHtcXG4gIG1heC13aWR0aDogNTAlO1xcbiAgbWF4LWhlaWdodDogNTAlO1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIHdpZHRoOiA0MHJlbTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1cmVtO1xcbn1cXG5cXG5oMyNnYW1lb3Zlci1yZXN1bHQge1xcbiAgZm9udC1zaXplOiA0cmVtO1xcbn1cXG5cXG5idXR0b24jZ2FtZS1yZXNldCB7XFxuICBwYWRkaW5nOiAycmVtO1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA4NjBweCkge1xcbiAgI2JvYXJkLWNyZWF0b3IubW9kYWwge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMC44ZnIgNWZyIDEuNWZyO1xcbiAgICBwYWRkaW5nOiAxcmVtO1xcbiAgfVxcblxcbiAgaDIuYm9hcmQtY3JlYXRvci1oZWFkZXIsXFxuICAuYnV0dG9ucyB7XFxuICAgIGdyaWQtY29sdW1uOiBzcGFuIDI7XFxuICB9XFxuICBoMi5ib2FyZC1jcmVhdG9yLWhlYWRlciB7XFxuICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gIH1cXG4gICNwbGFjZS1zaGlwLWJvYXJkIHtcXG4gICAgaGVpZ2h0OiA0MHJlbTtcXG4gICAgd2lkdGg6IDQwcmVtO1xcbiAgfVxcbiAgLmJsb2NrIHtcXG4gICAgd2lkdGg6IDRyZW07XFxuICAgIGhlaWdodDogNHJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLyoqXG4gKiBMb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBKUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanMuZm91bmRhdGlvbi8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5maWx0ZXJgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlGaWx0ZXIoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmVzdWx0W3Jlc0luZGV4KytdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlLFxuICAgIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gICAgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgdGhpcy5zaXplICs9IHRoaXMuaGFzKGtleSkgPyAwIDogMTtcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICArK3RoaXMuc2l6ZTtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID09IG51bGwgPyAwIDogdmFsdWVzLmxlbmd0aDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gZGF0YS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICB0aGlzLnNpemUgPSArK2RhdGEuc2l6ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICogIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3RMaWtlKHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgYmFzZUlzRXF1YWwsIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gb2JqSXNBcnIgPyBhcnJheVRhZyA6IGdldFRhZyhvYmplY3QpLFxuICAgICAgb3RoVGFnID0gb3RoSXNBcnIgPyBhcnJheVRhZyA6IGdldFRhZyhvdGhlcik7XG5cbiAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIG90aFRhZyA9IG90aFRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuXG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgaXNCdWZmZXIob2JqZWN0KSkge1xuICAgIGlmICghaXNCdWZmZXIob3RoZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG9iaklzQXJyID0gdHJ1ZTtcbiAgICBvYmpJc09iaiA9IGZhbHNlO1xuICB9XG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHZhciBvYmpVbndyYXBwZWQgPSBvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCxcbiAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9ialVud3JhcHBlZCwgb3RoVW53cmFwcGVkLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBvYmpQcm9wcyA9IGdldEFsbEtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0gZ2V0QWxsS2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIG9iamVjdCk7XG5cbiAgdmFyIHNraXBDdG9yID0gaXNQYXJ0aWFsO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKG9ialZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpXG4gICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzLCBnZXRTeW1ib2xzKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSAhbmF0aXZlR2V0U3ltYm9scyA/IHN0dWJBcnJheSA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHJldHVybiBhcnJheUZpbHRlcihuYXRpdmVHZXRTeW1ib2xzKG9iamVjdCksIGZ1bmN0aW9uKHN5bWJvbCkge1xuICAgIHJldHVybiBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgc3ltYm9sKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYXJyYXkgYnVmZmVycywgYm9vbGVhbnMsXG4gKiBkYXRlIG9iamVjdHMsIGVycm9yIG9iamVjdHMsIG1hcHMsIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsXG4gKiBzZXRzLCBzdHJpbmdzLCBzeW1ib2xzLCBhbmQgdHlwZWQgYXJyYXlzLiBgT2JqZWN0YCBvYmplY3RzIGFyZSBjb21wYXJlZFxuICogYnkgdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NXG4gKiBub2RlcyBhcmUgY29tcGFyZWQgYnkgc3RyaWN0IGVxdWFsaXR5LCBpLmUuIGA9PT1gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogb2JqZWN0ID09PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbW9kYWxzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbW9kYWxzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIlxuaW1wb3J0IFwiLi9zdHlsZXMvbW9kYWxzLmNzc1wiXG5cbmltcG9ydCBcIi4vRE9NL2NyZWF0ZUJvYXJkRE9NXCJcbmltcG9ydCBcIi4vRE9NL0RPTUV2ZW50c1wiXG5pbXBvcnQgXCIuL0RPTS9kcmFnRHJvcFNoaXBzXCIgIl0sIm5hbWVzIjpbImdhbWVIYW5kbGVyIiwiQUlCb2FyZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwbGF5ZXJCb2FyZCIsImJvYXJkRm9yUGxhY2VtZW50Iiwic2hpcHNDb250YWluZXIiLCJzdGFydEJ0biIsInF1ZXJ5U2VsZWN0b3IiLCJib2FyZFJlc2V0QnRuIiwiZ2FtZVJlc2V0QnRuIiwiYWxpZ25tZW50QnRuIiwib3ZlcmxheSIsImJvYXJkTW9kYWwiLCJnYW1lb3ZlckRpc3BsYXkiLCJnYW1lb3ZlclJlc3VsdCIsIm15R2FtZUhhbmRsZXIiLCJyZW5kZXJQbGF5ZXJTaGlwcyIsInBsYXllclNoaXBzIiwicGxheWVycyIsInJlYWxQbGF5ZXIiLCJib2FyZCIsInNoaXBMaXN0IiwiZm9yRWFjaCIsInNoaXBPYmoiLCJjb29yZGluYXRlcyIsImNvb3JkIiwiY29vcmRPblBsYXllckJvYXJkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFsaWdubWVudFN0YXRlIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkYXRhc2V0IiwiYWxpZ25tZW50IiwiZXZlcnlTaGlwIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGRyZW4iLCJzaGlwIiwicmVtb3ZlIiwiY2FuRW5kR2FtZSIsImlzR2FtZU92ZXIiLCJBSSIsImFyZUFsbFN1bmsiLCJ0ZXh0Q29udGVudCIsImF0dGFja2luZ1BoYXNlIiwicmFuZG9tbHlQbGFjZVNoaXBzIiwiZSIsImdldFR1cm4iLCJ0YXJnZXQiLCJjb250YWlucyIsImNvbnNvbGUiLCJsb2ciLCJzdGFydEF0dGFjayIsImNhblN0YXJ0R2FtZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJsZW5ndGgiLCJpZCIsInByZXZlbnREZWZhdWx0IiwiYWRkQW5jaG9yZWRDbGFzcyIsInNoaXBQbGFjZW1lbnQiLCJwbGFjZW1lbnQiLCJwbGFjZW1lbnRJbkRPTSIsIm9iamVjdERhdGEiLCJOdW1iZXIiLCJnZXREYXRhIiwibmFtZSIsImNob3NlbkNvb3JkaW5hdGUiLCJ4IiwieSIsInNoaXBMb2NhdGlvbiIsImFuY2hvckFTaGlwIiwidW5hdmFpbGFibGVDb29yZHMiLCJjbGFzc1JlbW92YWwiLCJjbGFzc05hbWUiLCJjb250YWluZXIiLCJlbGVtZW50c1RvQ2xlYXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbWVudCIsInJlc2V0Qm9hcmQiLCJwb3NzaWJsZUF0dGFja3MiLCJjcmVhdGVCb2FyZHMiLCJjb29yZGluYXRlIiwic3F1YXJlIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwic3F1YXJlQ2xvbmUxIiwiY2xvbmVOb2RlIiwic3F1YXJlQ2xvbmUyIiwic2hpcHMiLCJnZW5lcmF0ZVNoaXBCbG9ja3MiLCJzaGlwTGVuZ3RoIiwic2V0QXR0cmlidXRlIiwiaSIsInNoaXBCbG9jayIsImNyZWF0ZUFycmF5T2ZBdHRhY2tzIiwiYXR0YWNrcyIsInhDb29yZGluYXRlIiwiaiIsInlDb29yZGluYXRlIiwicHVzaCIsImdldFZhbGlkQXR0YWNrIiwiYXR0YWNrc0FycmF5Iiwic3BsaWNlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZmxhdCIsImlsbGVnYWxWYXJpYW50cyIsInNoaXBBcnJheSIsIlNoaXAiLCJnZXRMZW5ndGgiLCJnZXROYW1lIiwiaGl0c1Rha2VuIiwiaGl0IiwiZ2V0SGl0c1Rha2VuIiwiaXNTdW5rIiwiUGxheWVyIiwicGxheWVyQm9hcmRET00iLCJBSUJvYXJkRE9NIiwidHVybkRpc3BsYXkiLCJwbGF5ZXJOYW1lIiwicGxheWVyVHVybiIsImlzT3V0T2ZCb3VuZHMiLCJnZW5lcmF0ZVBsYWNlbWVudCIsImlzU2hpcFBsYWNlZCIsInNoaXBPYmplY3QiLCJzaGlwRGF0YSIsImlzSW5JbGxlZ2FsQ29vcmRzIiwicGxhY2VTaGlwIiwiQUlQb3NzaWJsZUF0dGFja3MiLCJjaGFuZ2VUdXJuIiwiY29udmVydFRvQ29vcmRpbmF0ZSIsImRpc3BsYXlXaG9zZVR1cm4iLCJ0dXJuIiwid2hvc2VUdXJuIiwibWFya1N1bmsiLCJjb29yZHMiLCJib2FyZFRvTWFyayIsImhpdFNxdWFyZSIsIm1hcmtTcXVhcmUiLCJzdW5rIiwicGxheWVyTW92ZSIsImV2ZW50IiwicGxheWVyVGFyZ2V0IiwicGxheWVyQXR0YWNrIiwiYXR0YWNrIiwiY3VycmVudFR1cm4iLCJBSU1vdmUiLCJBSVRhcmdldCIsIkFJQXR0YWNrIiwic2V0VGltZW91dCIsImlzRXF1YWwiLCJHYW1lYm9hcmQiLCJtaXNzZWRTaG90cyIsIlNldCIsImlzSW5BbkFycmF5IiwiYXJyYXkiLCJzb21lIiwiZWwiLCJnZW5lcmF0ZUlsbGVnYWxNb3ZlcyIsImlsbGVnYWxQb3NzaWJpbGl0ZXMiLCJpbGxlZ2FsU2V0IiwiaWxsZWdhbFZhcmlhbnQiLCJpbGxlZ2FsTW92ZSIsIlN0cmluZyIsImlsbGVnYWxNb3ZlcyIsImhhcyIsInJlY2VpdmVBdHRhY2siLCJpbmRleE9mU2hpcCIsImNoZWNrSGl0IiwidW5kZWZpbmVkIiwic2hpcEluTGlzdCIsImluZGV4Iiwib2JqZWN0IiwiZXZlcnkiLCJnZXRSYW5kb21JbmRleCIsImluZGV4QXJyYXkiLCJnZXRSYW5kb21BbGlnbm1lbnQiLCJhbGlnbm1lbnRzIiwiZ2V0SW5pdGlhbEJvYXJkU3F1YXJlIiwiaW5pdGlhbEJvYXJkU3F1YXJlIiwiaG9yaXpvbnRhbENvb3JkIiwiZ2V0UmFuZG9tUGxhY2VtZW50IiwiaW5pdGlhbENvb3JkIiwicmFuZG9tSW5kZXgiLCJzaGlwSGVscGVyIiwiZW5lbXkiXSwic291cmNlUm9vdCI6IiJ9