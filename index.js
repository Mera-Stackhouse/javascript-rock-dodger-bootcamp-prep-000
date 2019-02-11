/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top >= 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge<dodgerLeftEdge && rockRightEdge>dodgerLeftEdge) {
      return true;
      }
    else if (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) {
      return true;
      }
    else if (rockLeftEdge<dodgerRightEdge && rockRightEdge>dodgerRightEdge) {
      return true;
    } else {return false;}
  }
}

function createRock(x) {
  var rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0

  rock.style.top = top

  document.getElementById('game').appendChild(rock);
   
  function moveRock() {
    top = top + 2
    rock.style.top = `${top}px`;
    //window.requestAnimationFrame(moveRock);
  
  }
  
  if (checkCollision(rock) === true) {
     endGame();
  }

  if (top < GAME_HEIGHT){
    moveRock();
    //window.requestAnimationFrame(moveRock);
  } else {
    rock.remove();
  }
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);
   
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  for (i=0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  document.removeEventListener('keydown', moveDodger);
  alert('You Lose.');
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
     if (e.which === LEFT_ARROW) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerLeft();
     }
     if (e.which === RIGHT_ARROW) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerRight();
     }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
    var dodgerLeftEdge = positionToInteger(DODGER.style.left)
    if ( dodgerLeftEdge === 0) {
     return; 
    }
    dodgerLeftEdge = dodgerLeftEdge - 4;
    dodger.style.left = `${dodgerLeftEdge}px`;
   });
}


function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
   var dodgerLeftEdge = positionToInteger(DODGER.style.left);
   if ( dodgerLeftEdge === 360) {
     return; 
   }
   dodgerLeftEdge = dodgerLeftEdge + 4;
   dodger.style.left = `${dodgerLeftEdge}px`;
   });
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
