let cols = 10;
let rows = 10;
let grid = [];
let current;
let start, end;
let w, h;
let search = false;

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

    // set start and end nodes
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    startSearchButton = createButton('Start search');
    startSearchButton.position(50, 25);
    // startSearchButton.mouseClicked(startSearch);
}

function draw() {
    background(50);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    current.visited = true;
    let next = current.getUnvisitedNeighbor();
    if (next) {
        next.visited = true;
        current.removeWalls(next);
        current = next;
    }
}

