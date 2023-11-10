class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];  // top, right, bottom, left
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

        // rect(this.i * w, this.j * h, w, h);
    }

    addNeighbors(grid) {
        if (this.blocked) {
            return;
        }

        let i = this.i;
        let j = this.j;

        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
            if (j > 0) {
                this.neighbors.push(grid[i - 1][j - 1]);
            }
            if (j < rows - 1) {
                this.neighbors.push(grid[i - 1][j + 1]);
            }
        }
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
            if (j > 0) {
                this.neighbors.push(grid[i + 1][j - 1]);
            }
            if (j < rows - 1) {
                this.neighbors.push(grid[i + 1][j + 1]);
            }
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
    }

    setHeuristic(goalNode) {
        this.h = dist(this.i, this.j, goalNode.i, goalNode.j);
    }
}
