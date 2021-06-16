class Board {
	// public spacing = 35;
	// public cols = width / this.spacing;
	// public rows = height / this.spacing;
	public cols = 10;
	public rows = 10;
	public spacing = width / this.cols;
	public snake = new Snake(this);
	public apple: p5.Vector;
	public status = 0;
	public allowedButtons = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW];

	public init() {
		this.snake.init();
		this.generateApple();
	}

	/* TODO: Optimise */
	public generateApple() {
		this.apple = createVector(int(random(0, this.cols)), int(random(0, this.rows)));
		if (this.snake.path.some(block => this.apple.x === block.x && this.apple.y === block.y)) this.generateApple();
	}

	public drawBackground() {
		for (let i = 0; i < this.cols; i++) {
			for (let j = 0; j < this.rows; j++) {
				(i + j) % 2 == 0
					? fill("#a7d948")
					: fill("#8ccc3c");
				strokeWeight(0);
				rect(i * this.spacing, j * this.spacing, this.spacing, this.spacing);
			}
		}
	}

	public drawApple() {
		// fill(255, 0, 0);
		strokeWeight(this.spacing - 10);
		noFill();
		stroke(255, 0, 0);
		// rect(this.apple.x * this.spacing, this.apple.y * this.spacing, this.spacing, this.spacing);
		point((this.apple.x + 0.5) * this.spacing, (this.apple.y + 0.5) * this.spacing);
	}

	public draw() {
		this.drawBackground();
		this.snake.draw();
		this.drawApple();
	}

	public update() {
		// if (keyIsPressed) this.handleKeyPress();
		if (this.status !== 1) return;
		this.snake.update();
		const head = this.snake.head;
		// console.log(head);
		if (
			head.x >= this.cols
			|| head.x < 0
			|| head.y >= this.rows
			|| head.y < 0) this.endGame();

		for (let i = 0; i < this.snake.length - 2; i++) {
			if (head.x === this.snake.path[i].x && head.y === this.snake.path[i].y) this.endGame();
		}
	}

	public handleKeyPress() {
		if (!this.allowedButtons.includes(keyCode)) return;
		if (this.status === 0 && this.snake.length === 3) this.status = 1;

		const head = this.snake.head;
		const afterHead = this.snake.afterHead;

		switch (keyCode) {
			case LEFT_ARROW:
				if (afterHead.x === head.x - 1 && afterHead.y === head.y) break;
				// if (this.snake.vel.x === 1 && this.snake.vel.y === 0) break;
				this.snake.vel.x = -1;
				this.snake.vel.y = 0
				break;
			case RIGHT_ARROW:
				if (afterHead.x === head.x + 1 && afterHead.y === head.y) break;
				// if (this.snake.vel.x === -1 && this.snake.vel.y === 0) break;
				this.snake.vel.x = 1;
				this.snake.vel.y = 0;
				break;
			case UP_ARROW:
				if (afterHead.x === head.x && afterHead.y === head.y - 1) break;
				// if (this.snake.vel.x === 0 && this.snake.vel.y === 1) break;
				this.snake.vel.x = 0;
				this.snake.vel.y = -1;
				break;
			case DOWN_ARROW:
				if (afterHead.x === head.x && afterHead.y === head.y + 1) break;
				// if (this.snake.vel.x === 0 && this.snake.vel.y === -1) break;
				this.snake.vel.x = 0;
				this.snake.vel.y = 1;
				break;
		}
	}

	public endGame() {
		this.status = -1;
		console.log('Game Over');
	}
}
