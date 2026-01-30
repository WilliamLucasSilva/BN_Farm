import { GameObject } from "../../engine/GameObject.js";
import { SprSheet_Grass } from "../../spriteSheets/SprGrass.js";
import { mouse } from "../global.js";

const States = [
    [0, 0],
    [64, 0],
    [128, 0],
    [192, 0],
    [0, 64],
    [64, 64],
    [128, 64],
    [192, 64],
    [0, 128],
    [64, 128],
    [128, 128],
    [192, 128],
    [0, 192],
    [64, 192],
    [128, 192],
    [192, 192],
    [0, 256],
]


export class Grass extends GameObject{
    constructor(coords, gridId){
        super(coords, [64,64], {type: "worldObjet", active: true, visible: true})
        this.setSprSheet(SprSheet_Grass.sprSheet)
        this.plowValue = 0
        this.sprCoords = [0, 0]

        this.gridId = gridId
        this.state = 'grass'
    }

    draw(ctx){
        super.draw(ctx, this.sprCoords)

        /*
            // --- CÓDIGO DE DEBUG ---
        ctx.save(); // Salva o estado do contexto
        ctx.fillStyle = "white"; // Cor do texto
        ctx.strokeStyle = "black"; // Contorno para ler em tiles claros
        ctx.lineWidth = 3;
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Pega a posição central do GameObject
        // Assumindo que seu GameObject tem as propriedades x e y
        const centerX = this.coords[0] + this.size[0] / 2;
        const centerY = this.coords[1] + this.size[1] / 2;

        ctx.strokeText(this.plowValue, centerX, centerY);
        ctx.fillText(this.plowValue, centerX, centerY);
        ctx.restore(); // Restaura o contexto //
        */
    }


    plow(neighbors, isFirst = true){

        if((this.state == 'grass' && isFirst) || (this.state == 'plow' && !isFirst)){
            this.state = 'plow'

            this.plowValue = 1

            neighbors.forEach((e, i) => {
                let eGrass = e.object.get(0)
                if(eGrass.state == 'plow'){
                    this.plowValue += 2 ** i

                    if(isFirst){
                        eGrass.plow(e.neighbors, false)
                    }
                }
        })
        }else if(this.state == 'plow' && isFirst){
            this.state = 'grass'

            this.plowValue = 0

            neighbors.forEach((e) => {
                let eGrass = e.object.get(0)
                if(eGrass.state == 'plow'){

                    if(isFirst){
                        eGrass.plow(e.neighbors, false)
                    }
                }})
        }

        
        this.sprCoords = States[this.plowValue]
    }
}
