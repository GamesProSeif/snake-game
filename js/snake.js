var Snake = (function () {
    function Snake(board) {
        this.vel = createVector(0, -1);
        this.board = board;
    }
    Object.defineProperty(Snake.prototype, "spacing", {
        get: function () {
            return this.board.spacing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "head", {
        get: function () {
            return this.path[this.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "afterHead", {
        get: function () {
            return this.path[this.length - 2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "length", {
        get: function () {
            return this.path.length;
        },
        enumerable: false,
        configurable: true
    });
    Snake.prototype.init = function () {
        this.path = [createVector(3, 8), createVector(4, 8), createVector(5, 8)];
    };
    Snake.prototype.update = function () {
        var x = this.head.x + this.vel.x;
        var y = this.head.y + this.vel.y;
        this.path.push(createVector(x, y));
        if ((this.head.x === this.board.apple.x && this.head.y === this.board.apple.y))
            this.board.generateApple();
        else
            this.path.shift();
    };
    Snake.prototype.draw = function () {
        beginShape();
        for (var i = 0; i < this.length; i++) {
            var block = this.path[i];
            noFill();
            stroke(0, 0, 255);
            strokeWeight(this.spacing / 1.3);
            vertex((block.x + 0.5) * this.spacing, (block.y + 0.5) * this.spacing);
        }
        endShape();
        stroke(0, 0, 200);
        circle((this.head.x + 0.5) * this.spacing, (this.head.y + 0.5) * this.spacing, 1);
        stroke(255);
        strokeWeight(1);
        textAlign(CENTER);
        text(this.length, (this.head.x + 0.5) * this.spacing, (this.head.y + 0.55) * this.spacing);
    };
    return Snake;
}());
