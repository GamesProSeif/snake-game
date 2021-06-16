class Snake {
	public path: p5.Vector[];
	public board: Board;
	public vel = createVector(0, -1);

	public constructor(board: Board) {
		this.board = board;
	}

	public get spacing() {
		return this.board.spacing;
	}

	public get head() {
		return this.path[this.length - 1];
	}

	public get afterHead() {
		return this.path[this.length - 2];
	}

	public get length() {
		return this.path.length;
	}

	public init() {
		this.path = [createVector(3, 8), createVector(4, 8), createVector(5, 8)];
	}

	public update() {
		let x = this.head.x + this.vel.x;
		let y = this.head.y + this.vel.y;

		// if (x > this.board.cols) x = 0;
		// else if (x < 0) x = this.board.cols - 1;

		// if (y > this.board.rows) y = 0;
		// else if (y < 0) y = this.board.rows - 1;

		this.path.push(createVector(x, y));

		if ((this.head.x === this.board.apple.x && this.head.y === this.board.apple.y))
			this.board.generateApple();
		else
			this.path.shift();
	}

	public draw() {
		beginShape();
		for (let i = 0; i < this.length; i++) {
			const block = this.path[i];
			noFill();
			stroke(0, 0, 255);
			strokeWeight(this.spacing / 1.3);
			vertex((block.x + 0.5) * this.spacing, (block.y + 0.5) * this.spacing);
		}
		endShape();
		stroke(0, 0, 200);
		// strokeWeight(this.spacing);
		circle((this.head.x + 0.5) * this.spacing, (this.head.y + 0.5) * this.spacing, 1);
		stroke(255);
		strokeWeight(1);
		textAlign(CENTER);
		text(this.length, (this.head.x + 0.5) * this.spacing, (this.head.y + 0.55) * this.spacing);
	}
}
