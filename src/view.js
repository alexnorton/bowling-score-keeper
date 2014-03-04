function View() {
  // Bind DOM element events to methods

  // Add player
  document.getElementById('add-player-button').addEventListener('click', this.addPlayer.bind(this));
  document.getElementById('player-name-input').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if(key == 13) {
      document.view.addPlayer();
    }
  });

  // Start game button
  document.getElementById('start-game-button').addEventListener('click', function() {
    document.view.startGame();
  });

  // Add score
  document.getElementById('score-button').addEventListener('click', this.addScore.bind(this));
  document.getElementById('score-input').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if(key == 13) {
      document.view.addScore();
    }
  });
}

View.prototype.addPlayer = function() {
  var name = document.getElementById('player-name-input').value;

  // Check the input isn't empty
  if(name != '' && !name.match(/^ *$/)) {
    if(document.controller.addPlayer(name)) {
      // Success! Hide any errors being shown, blank the input and update the board
      this.hideError();
      document.getElementById('player-name-input').value = '';
      document.view.updateBoard();
    } else {
      // Failure! Show an error
      this.showError("<strong>Sorry!</strong> You can't add more than 6 players.");
    }
  } else {
    this.showError("You must enter a player name!");
  }
}

View.prototype.startGame = function() {
  // Check we have some players   
  if(document.controller.getPlayers().length > 0) {
    // Hide the 'add players' interface and show the score input 
    document.querySelector('#add-players').style.display = 'none';
    document.querySelector('#score').style.display = 'initial';
    document.querySelector('#score-input').focus();
    this.hideError();
  } else {
    this.showError("You must add a player to start the game!");
  }
}

View.prototype.addScore = function() {
  var score = document.querySelector('#score-input').value;

  // Check the input isn't empty
  if(score != '') {
    if(document.controller.addScore.bind(document.controller)(document.querySelector('#score-input').value)) {      
      // Success! Hide any errors being shown, blank the input and update the board
      this.hideError();
      document.querySelector('#score-input').value = '';
      document.view.updateBoard();

      // Is the game over?
      if(document.controller.isGameOver()) {
        this.gameOver();
      }
    } else {
      // Failure! Show an error
      this.showError('<strong>Sorry!</strong> That score is invalid.');
    }
  }
}

View.prototype.updateBoard = function() {

  // Make sure the score board is visible
  document.querySelector('#game').style.display = 'initial';

  var tableBody = document.querySelector('#game table tbody');

  // Remove any rows already in the table body
  while(tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Create a new row for each player
  document.controller.getPlayers().forEach(function(player, i) {
    var row = document.createElement('tr');

    // Write the player's name in the first cell of the row
    row.appendChild(document.createElement('td')).innerHTML = player;

    var frames = document.controller.getFrames(i);

    for(var frame = 0; frame < 10; frame++) {

      // If this is the last frame the number of cells is 3, otherwise its 2
      var frameSize = frame == 9 ? 3 : 2;

      // For every roll in the frame
      for(var roll = 0; roll < frameSize; roll++) {
        // Create a new cell
        var cell = row.appendChild(document.createElement('td'));
        
        var score;
        // If there is a score for this roll
        if(frames[frame] && (score = frames[frame][roll]) !== null) {
          if(score == 10 && ((roll == 0 && frame < 9) || (frame == 9 && (frames[9][0] == 10 || roll == 2)))) {
            // It's a strike! Write an X
            cell.innerHTML = 'X';

            // Unless this is the last frame, just make one cell for the whole frame
            if(frame != 9) {
              cell.colSpan = frameSize;
              roll = frameSize;
            }
          } else if (score == 0) {
            // No pins knocked down, write a -
            cell.innerHTML = '-';
          } else if (roll == 1 && (score + frames[frame][0]) == 10) {
            // Spare! Write a /
            cell.innerHTML = '/';
          } else if (score) {
            // Otherwise just write the number of pins
            cell.innerHTML = score;
          }
        }
      }
    }

    if(i == document.controller.getCurrentPlayer() && !document.controller.isGameOver()) {
      row.childNodes[document.controller.getCurrentRoll() + 1].className = "info";
    }

    // Finally write the score
    row.appendChild(document.createElement('td')).innerHTML = document.controller.getTotal(i);

    // Add the row to the table
    tableBody.appendChild(row);
  });
}

View.prototype.gameOver = function() {
  // Hide the score input and show a congratulations message
  document.querySelector('#score').style.display = 'none';
  document.querySelector('#winner').style.display = 'initial';
  document.querySelector('#winner-name').innerHTML = document.controller.getWinner();
}

View.prototype.showError = function(errorMessage) {
  // Show the error box and display the given message
  var error = document.querySelector('#error');
  error.innerHTML = errorMessage;
  error.style.visibility = 'initial';
}

View.prototype.hideError = function() {
  // Hide the error box
  var error = document.querySelector('#error');
  error.style.visibility = 'hidden';
}