/*jslint browser this */
/*global _, player */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },
        play: function () {
            var self = this;
            setTimeout(function () {
                self.game.fire(this, 0, 0, function (hasSucced) {
                    self.tries[0][0] = hasSucced;
                });
            }, 2000);
        },
        areShipsOk: function (callback) {
            var i = 0;
            var j;

            this.fleet.forEach(function (ship, i) {
                let vertical
                let randomX
                let randomY

                // do
                // random horizontal or vertical
                // random x coordinate
                // random y coordinate
                // check if the active boat fits in the coordinates given with the function in player.js that already exists.
                // while(setships are ok)
                // j = 0;
                // while (j < ship.life) {
                //     this.grid[i][j] = ship.getId();
                //     j += 1;
                // }
                do {
                    vertical = Math.round(Math.random() * (1 - 0) + 0)
                    randomX = Math.round(Math.random() * (9 - 0) + 0)
                    randomY = Math.round(Math.random() * (9 - 0) + 0)
                } while (!this.setActiveShipPosition(randomX, randomY, vertical, ship))
            }, this);

            setTimeout(function () {
                callback();
            }, 500);
        },
        // same as the player.js but with the ship passed with the parameters
        setActiveShipPosition: function (x, y, vertical, ship) {
            let i = 0;

            if (!vertical) {
                if (ship.getLife() == 3) x++;

                while (i < ship.getLife()) {
                    if (this.grid[y][x + i] > 0) {
                        return false;
                    }
                    i += 1;
                }

                if (x < 0 || (x + ship.getLife() > 10)) {
                    return false;
                }

                i = 0;
                while (i < ship.getLife()) {
                    this.grid[y][x + i] = ship.getId();
                    i += 1;
                }
            } else {
                if (ship.getLife() == 3) y++;

                while (i < ship.getLife()) {
                    if (this.grid[y + i - 2][x + 2] > 0) {
                        return false;
                    }
                    i += 1;
                }

                if (y < 2 || (y + ship.getLife() > 12)) {
                    return false;
                }

                i = 0;
                while (i < ship.getLife()) {
                    this.grid[y + i - 2][x + 2] = ship.getId();
                    i += 1;
                }
            }
            return true;
        },
        setGame: function (game) {
            this.game = game
        }
    });

    global.computer = computer;

}(this));