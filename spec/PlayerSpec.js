describe("Player", function() {
	var player;

	beforeEach(function() {
		player = new Player("Player");
	});

	it("should accept scores", function() {
		player.addScore(4);
		player.addScore(6);
		player.addScore(2);
		player.addScore(8);
		expect(player.getFrames()).toEqual([[4, 6], [2, 8]]);
	});

	describe("should calculate scores correctly", function() {
		
		it("set one - twelve strikes", function() {
			for(var i = 0; i < 12; i++) {
				player.addScore(10);
			}
			expect(player.getScore()).toBe(300);
		});

		it("set two", function() {
			player.addScore(9);
			player.addScore(1);
			player.addScore(7);
			player.addScore(3);
			player.addScore(0);
			player.addScore(8);
			player.addScore(0);
			player.addScore(5);
			player.addScore(6);
			player.addScore(0);
			player.addScore(0);
			player.addScore(7);
			player.addScore(7);
			player.addScore(1);
			player.addScore(1);
			player.addScore(5);
			player.addScore(10);
			player.addScore(10);
			player.addScore(1);
			player.addScore(4);

			expect(player.getScore()).toBe(103);
		});

		it("set three", function() {
			player.addScore(9);
			player.addScore(1);
			player.addScore(10);
			player.addScore(3);
			player.addScore(7);
			player.addScore(8);
			player.addScore(2);
			player.addScore(8);
			player.addScore(2);
			player.addScore(7);
			player.addScore(3);
			player.addScore(8);
			player.addScore(2);
			player.addScore(10);
			player.addScore(10);
			player.addScore(9);
			player.addScore(1);
			player.addScore(6);

			expect(player.getScore()).toBe(196);
		});
	});

	describe("should determine when game is finished", function() {
		it("set one - twelve strikes", function() {
			for(var i = 0; i < 12; i++) {
				player.addScore(10);
			}

			expect(player.isGameOver()).toBeTruthy();
		});

		it("set two", function() {
			player.addScore(9);
			player.addScore(1);
			player.addScore(7);
			player.addScore(3);
			player.addScore(0);
			player.addScore(8);
			player.addScore(0);
			player.addScore(5);
			player.addScore(6);
			player.addScore(0);
			player.addScore(0);
			player.addScore(7);
			player.addScore(7);
			player.addScore(1);
			player.addScore(1);
			player.addScore(5);
			player.addScore(10);
			player.addScore(10);
			player.addScore(1);
			player.addScore(4);

			expect(player.isGameOver()).toBeTruthy();
		});

		it("set three", function() {
			player.addScore(9);
			player.addScore(1);
			player.addScore(10);
			player.addScore(3);
			player.addScore(7);
			player.addScore(8);
			player.addScore(2);
			player.addScore(8);
			player.addScore(2);
			player.addScore(7);
			player.addScore(3);
			player.addScore(8);
			player.addScore(2);
			player.addScore(10);
			player.addScore(10);
			player.addScore(9);
			player.addScore(1);

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