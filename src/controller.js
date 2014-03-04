function Controller() {
  // Create an array to hold our player objects
  this.players = [];
  this.currentPlayer = 0;
  this.rollInFrame = 0;
}

Controller.prototype.addPlayer = function(name) {
  // Check the player name isn't empty
  if(name && name != '' && !name.match(/^ *$/)) {
    // Check we're not trying to add more than 6 players
    if(this.players.length < 6) {
      // Instantiate a new Player object
      this.players.push(new Player(name));
      return true;
    } else {
      return false;
    }
  }
}

Controller.prototype.getPlayers = function() {
  return this.players.map(function(e) { return e.name; });
}

Controller.prototype.getScores = function(player) {
  return this.players[player].getRolls();
}

Controller.prototype.getFrames = function(player) {
  return this.players[player].getFrames();
}

Controller.prototype.addScore = function(score) {
  // Get integer value of score
  var scoreVal = parseInt(score);

  var player = this.players[this.currentPlayer];

  // Check the score is between 0 and 10
  if(scoreVal >= 0 && scoreVal <= 10) {

    // Add score
    if(!player.addScore(scoreVal))
      return false;

    // If that's the end of the frame move to the next player
    if(player.isFrameOver()) {
      this.currentPlayer++;
      if(this.currentPlayer >= this.players.length) {
        this.currentPlayer = 0; 
      }
    }

    return true;
  } else {
    return false;
  }
}

Controller.prototype.getTotal = function(player) {
  // Return the score of the given player
  return this.players[player].getScore();
}

Controller.prototype.getCurrentPlayer = function() {
  // Return the index of the current player
  return this.currentPlayer;
}

Controller.prototype.getCurrentRoll = function() {
  // Return the index of the current roll (next roll to be made) of the current player
  return this.players[this.currentPlayer].getRolls().length;
}

Controller.prototype.isGameOver = function() {
  // Check whether the last player has finished
  return this.players[this.players.length - 1].isGameOver();
}

Controller.prototype.getWinner = function() {
  // If the game isn't over we don't have a winner
  if(!this.isGameOver())
    return false;

  var winner;

  // Find the player with the highest score
  this.players.forEach(function(player) {
    if(!(winner && winner.getScore() > player.getScore()))
      winner = player;
    })

  return winner.name;
}