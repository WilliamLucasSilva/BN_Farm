import { ctx } from "../global.js";

export class Model {
    constructor(size, place, imgSrc, totalSprites = [1, 1], spritePlace = [0, 0]) {

        //grid info
        this.place = place

        //sprite info
        this.spriteSheet = {
            img: new Image(),
            totalSprites: totalSprites,
            spriteSize: [size[0] / totalSprites[0], size[1] / totalSprites[1]],
            place: spritePlace,
            realPlace: []
        }

        //load the image and keep it in load event
        this.spriteSheet.img.onload = () => {
            this.spriteSheet.realPlace = [
                this.spriteSheet.place[0] * this.spriteSheet.spriteSize[0],
                this.spriteSheet.place[1] * this.spriteSheet.spriteSize[1]
            ];
        };

        //set the img src
        this.spriteSheet.img.src = imgSrc;
    }

    draw() {
        if (this.spriteSheet.img.complete) {
            ctx.drawImage(
                this.spriteSheet.img, //spriteSheet
                this.spriteSheet.realPlace[0], this.spriteSheet.realPlace[1], //animation state
                this.spriteSheet.spriteSize[0], this.spriteSheet.spriteSize[1], //sprite size
                this.place[0], this.place[1], //model position
                this.spriteSheet.spriteSize[0], this.spriteSheet.spriteSize[1], //model size
            );
        }
    }
}
