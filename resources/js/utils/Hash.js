
export default class Hash {

    constructor() {
        this.elements = [];
        this.count = 0;
        this.hash = [];
    }

    encode(id, payload) {
        this.hash[count] = id;
        return this.insert(payload);
    }

    insert(payload) {
        this.elements[count] = payload;
        return count++;
    }

    edit(hashid, payload){
        this.elements[hashid] = payload;
    }

    delete(hashid){
        this.elements[hashid] = null;
        this.hash[hashid] = null;
    }

    decode() {
        const len = hash.length;

        const db = [];
        const ne = [];

        for (let i = 0; i < this.elements.length; i++) {
            if(!this.elements[i]) continue;
            if (i < len) {
                db.push({
                    id: hash[i],
                    payload: elements[i]
                });
            }else{
                ne.push({
                    id: i,
                    payload: elements[i]
                });
            }
        }
        return [db, ne];
    }
}