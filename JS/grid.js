import { Grass } from "./Objects/Grass.js";
import { cam } from "./Cam.js";
import { QuadTree } from "./QuadTree.js";

const GRID_SPACE = 64;

class Grid {
    constructor(size = [0, 0]) {
        this.size = size;
        this.realSize = [size[0] * GRID_SPACE, size[1] * GRID_SPACE];
        this.map = [];
        this.quadTree = new QuadTree([0, 0, this.realSize[0], this.realSize[1]], 4);

        // Create map and populate quadtree
        for (let column = 0; column < this.size[0]; column++) {
            this.map.push([]);
            for (let row = 0; row < this.size[1]; row++) {
                const cell = new Grass(
                    [column * GRID_SPACE, row * GRID_SPACE],
                    [column, row]
                );
                this.map[column].push(cell);
                this.quadTree.insert(cell); // Adiciona a célula à quadtree
            }
        }
    }

    draw() {
        let startX, endX, startY, endY;
        startX = Math.max(0, Math.floor(-cam.place[0] / GRID_SPACE));
        endX = Math.min(this.size[0], Math.ceil((-cam.place[0] + cam.size[0]) / GRID_SPACE));

        startY = Math.max(0, Math.floor(-cam.place[1] / GRID_SPACE));
        endY = Math.min(this.size[1], Math.ceil((-cam.place[1] + cam.size[1]) / GRID_SPACE));

        for (let column = startX; column < endX; column++) {
            for (let row = startY; row < endY; row++) {
                const cell = this.map[column][row];
                cell.place = [
                    cell.startPlace[0] + cam.place[0],
                    cell.startPlace[1] + cam.place[1],
                ];

                cell.draw();
            }
        }
    }

    search(x, y) {
        return this.quadTree.query([x, y]);
    }

    plant(x, y) {
        const plot = this.search(x, y);
        if (!plot) return;
        // Adicione sua lógica de plantio aqui
    }
}


export const grid = new Grid([32, 32]);