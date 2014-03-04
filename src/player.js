function Player(name) {
  this.name = name;
  this.frames = [];
}

Player.prototype.addScore = function(score) {
  if(this.isGameOver())
    return false;

  var frame = this.frames[this.frames.length - 1];

  // Create a new frame if needed and add it to the array
  if(this.isFrameOver()) {
    frame = [];
    this.frames.push(frame);
  }

  // If we aren't on the last frame check the score for the frame won't be greater than 10
  // if we are on the last frame, check that the score for any normal (non-bonus) rolls won't be greater than 10
  if((this.frames.length < 10 && (frame[0] || 0) + score <= 10) ||
    (this.frames.length == 10 && (frame[0] == 10 || (frame[0] || 0) + score <= 10 || frame[0] + frame[1] == 10))) {
    frame.push(score);
    return true;
  } else {
    return false;
  }
}

Player.prototype.getFrames = function() {
  return this.frames;
}

Player.prototype.getRolls = function() {
  var rolls = [];
  rolls = rolls.concat.apply(rolls, this.frames);
  return rolls;
}

Player.prototype.getScore = function() {
  var score = 0;

  var frames = this.getFrames();

  for(var i = 0; i < frames.length; i++) {
    var frame = frames[i];

    for(var j = 0; j < frame.length; j++) {
      // Add the score for this roll
      score += frame[j];
      if(i < (9) && j == 0 && frame[j] == 10 && frames[i + 1]) {
        // Strike! Add the next two rolls as bonus points
        score += frames[i + 1][0] || 0;
        score += frames[i + 1][1] || (frames[i + 2] ? frames[i + 2][0] : 0);
      } else if(j == 1 && (frame[0] + frame[1]) == 10 && frames[i + 1]) {
        // Spare! Add the next roll as bonus points
        score += frames[i + 1][0] || 0;
      }
    }
  }

  return score;
}

Player.prototype.getRollInFrame = function() {
  // If we have some frames, return the length of the last frame, otherwise return 0
  return this.frames[0] ? this.frames[this.frames.length - 1].length : 0;
}

Player.prototype.isFrameOver = function() {
  var frame = this.frames[this.frames.length - 1];
  // The frame is over if 
  //   there is no frame (helpful in the addScore method)
  //   we aren't in the last frame and there have been two rolls OR the first roll was a strike
  //   we are in the last frame and there have been three rolls OR the first two rolls scored less than 10
  return !frame || (this.frames.length < 10 && (frame.length == 2 || frame[0] == 10)) || (this.frames.length == 10 && (frame.length == 3 || frame[0] + frame[1] < 10));
}

Player.prototype.isGameOver = function() {
  return this.frames.length == 10 && this.isFrameOver();
}