import { createHash } from 'crypto';
import { createVerify } from 'crypto';

interface IValidateTransaction {
    sender: string;
    recipient: string;
    amount: number;
    hash: string;
}

interface ITransaction {
    hash: string;
    sender: string;
    recipient: string;
    amount: number;
    confirmations: number;
    validatingPreviousTransactions: [IValidateTransaction, IValidateTransaction, IValidateTransaction];
    sign(signature: string, publicKey: string): boolean;
    validateSignature(publicKey: string): boolean;
}

class Transaction implements ITransaction {
    public hash: string;
    public sender: string;
    public recipient: string;
    public amount: number;
    private signature: string = '';
    public confirmations: number = 0;
    public validatingPreviousTransactions: [IValidateTransaction, IValidateTransaction, IValidateTransaction];

    constructor(sender: string, recipient: string, amount: number, validatingPreviousTransactions: [IValidateTransaction, IValidateTransaction, IValidateTransaction]) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.validatingPreviousTransactions = validatingPreviousTransactions;
        this.hash = this.calculateHash();
    }

    private calculateHash(): string {
        const data = this.sender + this.recipient + this.amount + this.signature + JSON.stringify(this.validatingPreviousTransactions);
        return createHash('SHA256').update(data).digest('hex');
    }

    public sign(signature: string, publicKey: string): boolean {
        this.signature = signature;
        return this.validateSignature(publicKey);
    }

    public validateSignature(publicKey: string): boolean {
        const verifier = createVerify('SHA256');
        verifier.update(this.hash);
        return verifier.verify(publicKey, this.signature, 'hex');
    }
}

export default Transaction;

export { ITransaction, IValidateTransaction }