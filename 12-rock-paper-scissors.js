let score = JSON.parse(localStorage.getItem('score')) ||  {
  wins : 0,
  losses : 0,
  ties : 0
};

updateScoreElement();


/*
if (!score) {
  score = {
    wins : 0,
    losses : 0,
    ties : 0
  };
}
*/
let isAutoPalying = false;

let intervalId;

/*const autoPlay = () => {

};*/

function autoPlay() {
  if (!isAutoPalying) {
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing'
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPalying = true;
  } else { 
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play'
    clearInterval(intervalId);
    isAutoPalying = false;
  }  
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
})

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
})

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
})

document.querySelector('.js-reset-button').addEventListener('click', () => {
  warning();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    warning();
  }
})

function warning() {
  document.querySelector('.js-text').innerHTML = '<p>Are You Sure?</p><button class="btn-1">Yes</button><button class="btn-2">No</button>';

    document.querySelector('.btn-1').addEventListener('click', () => {
      earaseFun();
      document.querySelector('.js-text').innerHTML = '';
    })
    document.querySelector('.btn-2').addEventListener('click', () => {
      document.querySelector('.js-text').innerHTML = '';
    })
}

function earaseFun() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  

  function updateResult() {
    document.querySelector('.js-result').innerHTML = result;
  }

  function updateMove() {
    document.querySelector('.js-moves').innerHTML = `You 
    <img src="pictures/${playerMove}-emoji.png" class="move-icon"> 
    <img src="pictures/${computerMove}-emoji.png" class="move-icon">
    Computer`
  }

    if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
        result = 'You lose.';
      }
        else if (computerMove === 'paper') {
          result = 'You win!'
        }

          else if (computerMove === 'scissors') {
            result = 'Tie.'
          } 
    } else if (playerMove === 'paper') 
    {
          if (computerMove === 'rock') {
        result = 'You win!';
      }
        else if (computerMove === 'paper') {
          result = 'Tie.'
        }

          else if (computerMove === 'scissors') {
            result = 'You lose.'
          }
    } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
        result = 'Tie.';
      }
        else if (computerMove === 'paper') {
          result = 'You lose.'
        }

          else if (computerMove === 'scissors') {
            result = 'You win!'
          }
    }

    if (result === 'You win!') {
      score.wins++;
    } else if (result === 'You lose.') {
      score.losses++;
    } else if (result === 'Tie.') {
      score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    updateResult();

    updateMove();
 
  /*alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`)*/
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
  computerMove = 'rock';} 
    else if (randomNumber >=1/3 && randomNumber < 2/3 ) 
    { computerMove = 'paper'; } 
      else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
      }
  return computerMove;
}

let darkModeOff = true;

const darkMode = () => {
  
  const darkModeButton = document.querySelector('.dark-mode');
  if (darkModeOff) {
    darkModeButton.innerHTML = 'Light Mode';
    const el = document.querySelector('link')
    el.href = '12-rock-paper-scissors-darkMode.css';
    darkModeOff = false;
  }
  else {
    darkModeButton.innerHTML = 'Dark Mode';
    const el = document.querySelector('link')
    el.href = '12-rock-paper-scissors.css';
    darkModeOff = true;
  }
}

document.querySelector('.dark-mode').addEventListener('click', () => {
  darkMode();
})
