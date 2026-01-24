
/** 
 * The sprite sheet manager, it can make animations and manager that.
 * 
 * metodes:
 * - draw(ctx, coords, size)
 */
export class SprSheet{
    /**
     * create a sprite sheet element
     * @param {[x:number, y:number]} coords - the sprite initial coordenates in sprite sheet
     * @param {[width:number, height:number]} size - The sprite size
     * @param {string} src - the sprite sheet image path
     */
    constructor(coords, size, src){
        this.coords = coords
        this.size = size
        this.src = src

        this.img = new Image();
        this.img.src = src;
        this.isLoaded = false;

        this.sprSheet_coords = [this.coords[0] * this.size[0], this.coords[1] * this.size[1]]

        this.img.onload = () => {
            this.isLoaded = true;

            this.sprSheet_size = [this.img.naturalWidth, this.img.naturalHeight]
        };
    }

    /**
     * move the sprite to the new coords in the sprite sheet
     * 
     * @param {[x:number, y:number]} coords - new sprite coords in the sprite sheet
     */
    goTo(coords){
        this.coords = coords
        this.sprSheet_coords = [this.coords[0] * this.size[0], this.coords[1] * this.size[1]]
    }

    /**
     * draw the sprite in canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - the canvas context
     * @param {[x:number, y:number]} coords - the object coordenates in canvas
     * @param {[width:number, height:number]} size - The object size in canvas
     */
    draw(ctx, coords, size){
        if (!this.isLoaded) return;

        ctx.drawImage(
            this.img,                   // 1. A imagem original (Sheet)
            this.sprSheet_coords[0],    // 2. X de início do corte na Sheet
            this.sprSheet_coords[1],    // 3. Y de início do corte na Sheet
            this.size[0],               // 4. Largura do corte na Sheet
            this.size[1],               // 5. Altura do corte na Sheet
            coords[0],                  // 6. X onde será desenhado no Canvas
            coords[1],                  // 7. Y onde será desenhado no Canvas
            size[0],                    // 8. Largura do desenho no Canvas
            size[1]                     // 9. Altura do desenho no Canvas
        );
    }
}