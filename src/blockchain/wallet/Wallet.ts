import Token from "./Token";
import { createHash } from 'crypto';
import { ec } from 'elliptic';

interface IWallet {
    name: string;
    address: string;
    tokens: Token[];
    generateKeys(): { publicKey: string, privateKey: string };
    exportKeys(): { publicKey: string, privateKey: string };
}

class Wallet implements IWallet {
    public name: string;
    public address: string;
    public publicKey: string;
    private privateKey: string;
    public tokens: Token[] = [];

    constructor(name: string = 'Wallet', privateKey?: string) {
        this.name = name;
        if (privateKey) { 
            this.privateKey = privateKey;
            // Generate address and public key from provided private key
            this.address = this.generateAddressFromPrivateKey(privateKey);
            const curve = new ec('secp256k1');
            this.publicKey = curve.keyFromPrivate(privateKey).getPublic('hex');
        } else {
            // If no private key provided, generate new keys
            const keys = this.generateKeys();
            this.publicKey = keys.publicKey;
            this.address = this.generateAddressFromPublicKey(this.publicKey);
            this.privateKey = keys.privateKey;
        }
    }

    generateKeys(): { publicKey: string, privateKey: string } {
        const curve = new ec('secp256k1');
        const keyPair = curve.genKeyPair();
        const publicKey = keyPair.getPublic('hex');
        const privateKey = keyPair.getPrivate('hex');
        return { publicKey, privateKey };
    }

    exportKeys(): { publicKey: string, privateKey: string } {
        return {
            publicKey: this.publicKey,
            privateKey: this.privateKey
        };
    }

    private generateAddressFromPublicKey(publicKey: string): string {
        return createHash('sha256').update(publicKey).digest('hex').substr(0, 16); // Take the first 64 bits (16 hex characters)
    }

    private generateAddressFromPrivateKey(privateKey: string): string {
        const curve = new ec('secp256k1');
        const publicKey = curve.keyFromPrivate(privateKey).getPublic('hex');
        return this.generateAddressFromPublicKey(publicKey);
    }
}
