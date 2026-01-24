/** 
 * The basic element of the game, can be extend for all other objects, it can have a multiple metodes.
 * 
 * It can have:
 * - SprSheet: draw and change the sprites
 */
export class GameObject {
    /**
     * create a basic element for the game
     * @param {[x:number, y:number]} coords - the object coordenates in canvas
     * @param {[width:number, height:number]} size - The object size in canvas
     * @param {{
     * type:string,
     * active:boolean,
     * visible:boolean }} stats - the basic states of the object
     */
    constructor(coords, size, stats) {
        this.coords = coords
        this.size = size
        this.stats = stats
        this.sprSheet_isEmpty = true
    }

    /**
     * Set a sprite sheet
     * @param {import("./SprSheet.js").SprSheet} sprSheet - a sprite sheet
     */
    setSprSheet(sprSheet){
        this.sprSheet_isEmpty = false
        this.sprSheet = sprSheet
    }
  
    /**
     * draw the sprite in canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - the canvas context
     */
    draw(ctx){
        if (!this.stats.visible) return;
        if (this.sprSheet_isEmpty) return;

        this.sprSheet.draw(ctx, this.coords, this.size)
    }
}
