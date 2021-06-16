var Board = (function () {
    function Board() {
        this.cols = 10;
        this.rows = 10;
        this.spacing = width / this.cols;
        this.snake = new Snake(this);
        this.status = 0;
        this.allowedButtons = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW];
    }
    Board.prototype.init = function () {
        this.snake.init();
        this.generateApple();
    };
    Board.prototype.generateApple = function () {
        var _this = this;
        this.apple = createVector(int(random(0, this.cols)), int(random(0, this.rows)));
        if (this.snake.path.some(function (block) { return _this.apple.x === block.x && _this.apple.y === block.y; }))
            this.generateApple();
    };
    Board.prototype.drawBackground = function () {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                (i + j) % 2 == 0
                    ? fill("#a7d948")
                    : fill("#8ccc3c");
                strokeWeight(0);
                rect(i * this.spacing, j * this.spacing, this.spacing, this.spacing);
            }
        }
    };
    Board.prototype.drawApple = function () {
        strokeWeight(this.spacing - 10);
        noFill();
        stroke(255, 0, 0);
        point((this.apple.x + 0.5) * this.spacing, (this.apple.y + 0.5) * this.spacing);
    };
    Board.prototype.draw = function () {
        this.drawBackground();
        this.snake.draw();
        this.drawApple();
    };
    Board.prototype.update = function () {
        if (this.status !== 1)
            return;
        this.snake.update();
        var head = this.snake.head;
        if (head.x >= this.cols
            || head.x < 0
            || head.y >= this.rows
            || head.y < 0)
            this.endGame();
        for (var i = 0; i < this.snake.length - 2; i++) {
            if (head.x === this.snake.path[i].x && head.y === this.snake.path[i].y)
                this.endGame();
        }
    };
    Board.prototype.handleKeyPress = function () {
        if (!this.allowedButtons.includes(keyCode))
            return;
        if (this.status === 0 && this.snake.length === 3)
            this.status = 1;
        var head = this.snake.head;
        var afterHead = this.snake.afterHead;
        switch (keyCode) {
            case LEFT_ARROW:
                if (afterHead.x === head.x - 1 && afterHead.y === head.y)
                    break;
                this.snake.vel.x = -1;
                this.snake.vel.y = 0;
                break;
            case RIGHT_ARROW:
                if (afterHead.x === head.x + 1 && afterHead.y === head.y)
                    break;
                this.snake.vel.x = 1;
                this.snake.vel.y = 0;
                break;
            case UP_ARROW:
                if (afterHead.x === head.x && afterHead.y === head.y - 1)
                    break;
                this.snake.vel.x = 0;
                this.snake.vel.y = -1;
                break;
            case DOWN_ARROW:
                if (afterHead.x === head.x && afterHead.y === head.y + 1)
                    break;
                this.snake.vel.x = 0;
                this.snake.vel.y = 1;
                break;
        }
    };
    Board.prototype.endGame = function () {
        this.status = -1;
        console.log('Game Over');
    };
    return Board;
}());
