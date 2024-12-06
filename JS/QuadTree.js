let  GRID_SPACE = 64

export class QuadTree {
    constructor(bounds, capacity) {
        this.bounds = bounds; // [x, y, width, height]
        this.capacity = capacity; // Máximo de células por nó antes de subdividir
        this.cells = []
        this.divided = false;
    }

    subdivide() {
        const [x, y, w, h] = this.bounds;
        const hw = w / 2;
        const hh = h / 2;

        this.northeast = new QuadTree([x + hw, y, hw, hh], this.capacity);
        this.northwest = new QuadTree([x, y, hw, hh], this.capacity);
        this.southeast = new QuadTree([x + hw, y + hh, hw, hh], this.capacity);
        this.southwest = new QuadTree([x, y + hh, hw, hh], this.capacity);

        this.divided = true;
    }

    insert(cell) {
        const [x, y, w, h] = this.bounds;
        const [cx, cy] = cell.startPlace;

        // Verifica se a célula está dentro dos limites
        if (!(cx >= x && cx < x + w && cy >= y && cy < y + h)) {
            return false;
        }

        if (this.cells.length < this.capacity) {
            this.cells.push(cell);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            return (
                this.northeast.insert(cell) ||
                this.northwest.insert(cell) ||
                this.southeast.insert(cell) ||
                this.southwest.insert(cell)
            );
        }
    }

    query(point) {
        const [x, y, w, h] = this.bounds;
        const [px, py] = point;

        // Verifica se o ponto está fora dos limites
        if (!(px >= x && px < x + w && py >= y && py < y + h)) {
            return null;
        }

        // Verifica se o ponto corresponde a alguma célula no nó atual
        for (let cell of this.cells) {
            if (
                px > cell.place[0] &&
                px < cell.place[0] + GRID_SPACE &&
                py > cell.place[1] &&
                py < cell.place[1] + GRID_SPACE
            ) {
                return cell;
            }
        }

        // Repassa a busca para os filhos, se existir
        if (this.divided) {
            return (
                this.northeast.query(point) ||
                this.northwest.query(point) ||
                this.southeast.query(point) ||
                this.southwest.query(point)
            );
        }

        return null;
    }
}
