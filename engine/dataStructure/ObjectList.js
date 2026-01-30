/**
 * Gerenciador de lista ordenada para objetos dentro de um Node.
 * Permite controle posicional (z-index/pilha).
 * * @template T - O tipo de objeto armazenado nesta lista
 */
export class ObjectList {
    constructor() {
        /** * @private
         * @type {T[]} 
         */
        this._items = [];
    }

    /**
     * Retorna a quantidade de itens na lista.
     * @returns {number}
     */
    get length() {
        return this._items.length;
    }

    /**
     * Adiciona um objeto em uma posição específica.
     * Se nenhum índice for passado, adiciona ao topo (final).
     * * @param {T} item - O objeto a ser adicionado
     * @param {number} [index] - A posição (padrão: topo da pilha)
     */
    add(item, index) {
        // Se undefined ou null, vai para o final
        const targetIndex = (index === undefined || index === null) ? this._items.length : index;
        this._items.splice(targetIndex, 0, item);
    }

    /**
     * Remove uma referência específica da lista.
     * * @param {T} item - O objeto a remover
     * @returns {T | null} O objeto removido ou null se não encontrado
     */
    remove(item) {
        const index = this.indexOf(item);
        if (index > -1) {
            return this._items.splice(index, 1)[0];
        }
        return null;
    }

    /**
     * Remove e retorna o objeto em um índice específico.
     * * @param {number} index 
     * @returns {T | undefined}
     */
    removeAt(index) {
        return this._items.splice(index, 1)[0];
    }

    /**
     * Encontra o índice de um objeto.
     * * @param {T} item 
     * @returns {number} O índice ou -1
     */
    indexOf(item) {
        return this._items.indexOf(item);
    }

    /**
     * Pega o objeto em um índice sem remover (Peek).
     * * @param {number} index 
     * @returns {T | undefined}
     */
    get(index) {
        return this._items[index];
    }

    /**
     * Retorna todos os itens como um array (para iteração).
     * @returns {T[]}
     */
    getAll() {
        return this._items;
    }

    forEach(func){
        this._items.forEach(func)
    }
}