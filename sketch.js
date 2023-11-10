let cols = 50;
let rows = 50;
let grid = [];
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

    // set start and end nodes
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.blocked = false;
    end.blocked = false;

    // set heuristic for each node on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
            grid[i][j].setHeuristic(end);
        }
    }

    start.g = 0;
    start.f = start.h;

    astar = new Astar(start, end);

    startSearchButton = createButton('Start search');
    startSearchButton.position(50, 25);
    startSearchButton.mouseClicked(startSearch);
}

function draw() {
    background(255);

    if (search) {
        astar.findPath(start, end);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    start.show(color(0, 255, 0));
    end.show(color(255, 0, 0));

    // for (let i = 0; i < astar.openSet.length; i++) {
    //     astar.openSet[i].show(color(0, 255, 0));
    // }

    noFill();
    stroke('orange');
    strokeWeight(h/3);
    beginShape();
    for (let i = 0; i < astar.totalPath.length; i++) {
        let path = astar.totalPath[i];
        vertex(path.i * w + w/2, path.j * h + h/2);
    }
    endShape();
}
