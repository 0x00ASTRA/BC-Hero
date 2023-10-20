import Transaction from './Transaction';
import { createHash } from 'crypto';
interface IBlock {
    /**
     * Indicates if the block is a genesis block. 
     * Set to 'true' explicitly for genesis blocks. 
     * For non-genesis blocks, this attribute is either 'null' or not set at all.
     */
    target: string;
    isGenesis?: true | null;
    previousHash: string | undefined; // hash of the previous block
    timestamp: string; // block timestamp in 'UDT|mm-dd-yyyy.hh:mm:ss.ms' format
    id: number; // block id in the chain
    /**
     * Nonce stands for "number only used once." In the context of blockchain mining, 
     * the nonce is incremented iteratively to change the hash of the block data 
     * until a hash with a specific number of leading zeros (or some other specific criteria) 
     * is found. This process ensures the proof-of-work for the mined block.
     */
    nonce: number;
    transactions: Transaction[]; // Array of transactions
    metadata: Record<string, any>; // json metadata
    signature: string; // Miner of the block's signature
    hash: string; // block hash
    mine(): string; // returns mined block hash
    addTransaction(transaction: Transaction): boolean; // returns true if the transaction was added to the block
}

export default class Block implements IBlock {
    target: string;
    isGenesis?: true | null;
    previousHash:string | undefined;
    timestamp: string;
    id: number;
    nonce: number;
    transactions: Transaction[];
    metadata: Record<string, any>;
    signature: string;
    hash: string;

    constructor(
        timestamp: string,
        id: number,
        signature: string,
        nonce: number,
        transactions: Transaction[] = [],
        metadata: Record<string, any> = {},
        isGenesis?: true | null,
        previousHash?: string,
        target?: string
    ) {
        this.target = target || '0xBLOCK';
        this.isGenesis = isGenesis || null;
        this.previousHash = (previousHash || isGenesis) ? this.target + '0'.repeat(256 - this.target.length) : previousHash;
        this.timestamp = timestamp;
        this.id = id;
        this.signature = signature;
        this.nonce = nonce;
        this.transactions = transactions;
        this.metadata = metadata;
    }

    private static calculateHash(data: string): string {
        return createHash('sha256').update(data).digest('hex');
    }

    mine(): string {
        // Define a target for mining. 
        const target = this.target;
        let data = this.id + this.timestamp + this.transactions.toString() + this.metadata + this.signature + this.previousHash;
    
        while (true) {
            const hashData = data + this.nonce;
            this.hash = Block.calculateHash(hashData);
    
            if (this.hash.substring(0, target.length) === target) {
                break;
            }
            this.nonce++;
        }
        return this.hash;
    }
    
    
    addTransaction(transaction: Transaction): boolean {
        // add the transaction to the array of transactions
        this.transactions.push(transaction);
        // if transaction exists in transactions return true
        return this.transactions.includes(transaction);
    }
}
