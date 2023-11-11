let cols = 30;
let rows = 30;
let grid = [];
let current;
let w, h;
let stack = [];

function setup() {
    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    // define grid
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    // fill grid with nodes
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Node(i, j);
        }
    }

    current = grid[0][0];
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    current.visited = true;
    current.highlight();

    let next = current.getUnvisitedNeighbor();
    if (next) {
        next.visited = true;
        stack.push(current);
        current.removeWalls(next);
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

