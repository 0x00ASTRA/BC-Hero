import Block from "./Block";
import Transaction from "./Transaction";
import { createHash } from 'crypto';

interface IBlockchain {
    chain: Block[];
    pendingTransactions: Transaction[];
    isValid: boolean;
    verifyChain(): boolean;
    addBlock(block: Block): boolean;
}

class Blockchain implements IBlockchain {
    public signature: string;
    public chain: Block[] = [];
    public pendingTransactions: Transaction[] = [];
    public isValid: boolean = true;
    public rewardAmount: number;
    public rewardToken: Enumerator

    constructor(signature: string) {
        this.signature = signature; // signature of the chain creator
        this.createGenesisBlock(this.signature);
        this.isValid = this.verifyChain();
    }

    private createGenesisBlock(signature: string): boolean {
        // Placeholder data for genesis block
        const timestamp = new Date().toISOString();
        const genesisBlock =  new Block(timestamp, 0, this.signature, 0);
        genesisBlock.isGenesis = true;
        const added = this.addBlock(genesisBlock);
        return added;
    }

    private calculateHash(block: Block): string {
        // Normally you'd hash block data such as previous hash, timestamp, transactions, etc.
        const data = block.previousHash + block.timestamp + JSON.stringify(block.transactions);
        return createHash('SHA256').update(data).digest('hex');
    }

    public verifyChain(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Verify block's hash
            if (currentBlock.hash !== this.calculateHash(currentBlock)) {
                return false;
            }

            // Verify previous hash
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    public addBlock(block: Block): boolean {
        block.previousHash = this.chain[this.chain.length - 1].hash;
        block.hash = this.calculateHash(block);

        this.chain.push(block);
        return true;
    }
}

export default Blockchain;

export { IBlockchain };
