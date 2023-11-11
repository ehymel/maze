class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];  // top, right, bottom, left
        this.visited = false;
    }

    show() {
        let i = this.i * w;
        let j = this.j * h;
        stroke(255);
        strokeWeight(1);

        if (this.walls[0]) {
            line(i    , j,     i + w, j);
        }
        if (this.walls[1]) {
            line(i + w, j,     i + w, j + h);
        }
        if (this.walls[2]) {
            line(i + w, j + h, i    , j + h);
        }
        if (this.walls[3]) {
            line(i    , j + h, i    , j);
        }

        if (this.visited) {
            fill(255, 0, 255, 80);
            rect(this.i * w, this.j * h, w, h);
        }
    }

    getUnvisitedNeighbor() {
        let top, right, bottom, left;

        let i = this.i;
        let j = this.j;
        let neighbors = [];

        if (j > 0) {
            top = grid[i][j-1];
        }
        if (i < cols-1) {
            right = grid[i+1][j];
        }
        if (j < cols-1) {
            bottom = grid[i][j+1];
        }
        if (i > 0) {
            left = grid[i-1][j];
        }

        for (let nbr of [top, right, bottom, left]) {
            if (nbr && !nbr.visited) {
                neighbors.push(nbr);
            }
        }

        if (neighbors.length > 0) {
            return random(neighbors);
        } else {
            return undefined;
        }
    }

    removeWalls(neighbor) {
        let x = this.i - neighbor.i;
        let y = this.j - neighbor.j;

        if (x === 1) {
            // neighbor is to the left
            this.walls[3] = false;
            neighbor.walls[1] = false;
        } else if (x === -1) {
            // neighbor is to the right
            this.walls[1] = false;
            neighbor.walls[3] = false;
        } else if (y === 1) {
            // neighbor is to the top
            this.walls[0] = false;
            neighbor.walls[2] = false;
        } else if (y === -1) {
            // neighbor is to the bottom
            this.walls[2] = false;
            neighbor.walls[0] = false;
        }
    }
}
