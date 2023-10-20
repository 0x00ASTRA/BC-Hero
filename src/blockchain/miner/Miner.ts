import Block from "../Block";
import Blockchain from "../Blockchain";

interface IMiner {
    name: string;
    address: string;
    id?: number;
    run(): void;
}

class Miner implements IMiner {
    public name: string;
    public id: number;
    public address: string;

    constructor(name: string, address: string, id?: number) {
        this.name = name;
        this.address = address;
        id ? this.id = id : 0;
    }
    
    run(): void {
        
    }
}
