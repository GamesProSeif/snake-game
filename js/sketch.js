var board;
function setup() {
    createCanvas(595, 595);
    board = new Board();
    board.init();
    frameRate(3);
}
function draw() {
    board.update();
    board.draw();
}
function keyPressed() {
    board.handleKeyPress();
}
