describe("Player", function() {
  var player;

  beforeEach(function() {
    player = new Player("Player");
  });

  it("should accept scores", function() {
    player.addScore(4);
    player.addScore(6);
    player.addScore(10)
    player.addScore(2);
    player.addScore(8);
    expect(player.getFrames()).toEqual([[4, 6], [10], [2, 8]]);
  });

  describe("should calculate scores correctly", function() {
    
    it("set one - twelve strikes", function() {
      for(var i = 0; i < 12; i++) {
        player.addScore(10);
      }
      expect(player.getScore()).toBe(300);
    });

    it("set two", function() {
      var scores = [9, 1, 7, 3, 0, 8, 0, 5, 6, 0, 0, 7, 7, 1, 1, 5, 10, 10, 1, 4]

      scores.forEach(function(score) {
        player.addScore(score);
      });

      expect(player.getScore()).toBe(103);
    });

    it("set three", function() {
      var scores = [9, 1, 10, 3, 7, 8, 2, 8, 2, 7, 3, 8, 2, 10, 10, 9, 1, 6];

      scores.forEach(function(score) {
        player.addScore(score);
      });

      expect(player.getScore()).toBe(196);
    });
  });

  it("should calculate the current roll in the frame", function() {
    expect(player.getRollInFrame()).toBe(0);
    player.addScore(1);
    expect(player.getRollInFrame()).toBe(1);
    player.addScore(6);
    expect(player.getRollInFrame()).toBe(2);
    player.addScore(10);
    expect(player.getRollInFrame()).toBe(1);
    player.addScore(10);
    expect(player.getRollInFrame()).toBe(1);
  });

  describe("should determine when game is finished", function() {
    it("set one - twelve strikes", function() {
      for(var i = 0; i < 12; i++) {
        player.addScore(10);
      }

      expect(player.isGameOver()).toBeTruthy();
    });

    it("set two", function() {
      var scores = [9, 1, 7, 3, 0, 8, 0, 5, 6, 0, 0, 7, 7, 1, 1, 5, 10, 10, 1, 4]

      scores.forEach(function(score) {
        player.addScore(score);
      });

      expect(player.isGameOver()).toBeTruthy();
    });

    it("set three", function() {
      var scores = [9, 1, 10, 3, 7, 8, 2, 8, 2, 7, 3, 8, 2, 10, 10, 9, 1];

      scores.forEach(function(score) {
        player.addScore(score);
      });

      expect(player.isGameOver()).toBeFalsy();
    });

    it("set four", function() {
      for(var i = 0; i < 11; i++) {
        player.addScore(10);
        expect(player.isGameOver()).toBeFalsy();
      }
    });
  })
});