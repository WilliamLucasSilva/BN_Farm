
/**
 * grid data structure
 * 
 * metodes:
 * 
 * -
 */
export class Grid{
    
    /**
     * create a grid data structure
     * 
     * @param {[width:number, height:number]} size - The grid size
     */
    constructor(size){
    this.size = size

    this.nodes = [];

    this._createNodes();

    this.forEachNode(        
        /**
         * @param {Node} node
         */
        (node, [x, y]) => {
        let up    = this.nodes[y - 1]?.[x] ?? null;
        let right = this.nodes[y]?.[x + 1] ?? null;
        let down  = this.nodes[y + 1]?.[x] ?? null;
        let left  = this.nodes[y]?.[x - 1] ?? null;

        node.setNeighbors([up, right, down, left])
    })

    }

    _createNodes() {

        for (let y = 0; y < this.size[1]; y++) {
        this.nodes[y] = [];

            for (let x = 0; x < this.size[0]; x++) {
                this.nodes[y][x] = new Node([x, y]);
            }
        }
    }

    /**
     * 
     * @param {[x:number, y:number]} coords 
     * @returns {Node}
     */
    search(coords){
        return this.nodes[coords[1]][coords[0]]
    }

    /**
     * Do the func in all nodes of the grid
     * 
     * @param {Function} callback 
     */
    forEachNode(callback, initCoords = [0, 0], finalCoords = [this.size[0], this.size[1]]){
        for (let y = initCoords[1]; y < finalCoords[1]; y++) {
            for (let x = initCoords[0]; x < finalCoords[0]; x++) {
                callback(this.nodes[y][x], [x, y])
            }
        }
    }

    /**
     * 
     * @param {[x:number, y:number]} coords 
     * @param {number} gap 
     */
    toGridCoord(coords, gap){
        let gx = Math.floor(coords[0] / gap);
        let gy = Math.floor(coords[1] / gap);

        // Garante que o índice esteja dentro do array nodes (0 até size-1)
        gx = Math.max(0, Math.min(gx, this.size[0] - 1));
        gy = Math.max(0, Math.min(gy, this.size[1] - 1));

        /** @type {[x:number, y:number]} */
        let newCoords = [gx, gy]

        return newCoords;
    }
}



export class Node{
    /**
     * create node of the grid data structure
     * 
     * @param {[x:number, y:number]} id - The grid index  
     */
    constructor(id){
        this.id = id
    }

    /**
     * reference a object
     * 
     * @param {*} obj - The reference from node to object 
     */
    setObject(obj){
        this.object = obj
    }

    /**
     * reference a neighbors
     * @param {Node[]} neighbors 
     */
    setNeighbors(neighbors){
        this.neighbors = neighbors
    }
}