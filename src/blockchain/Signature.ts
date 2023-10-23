interface ISignature {
    signer: string;
    signature: string;
    data: string;
    nonce: number;
}

// An object that can be securely passed without fear of tamper
class Signature implements ISignature {
    public signer: string;
    public signature: string;
    public data: string;
    public nonce: number = 0;
    private secret: string = 'SECRET';

    constructor(
        signer: string,
        signature:  string,
        data: string,
        secret: string,
    ) {
        this.signer = signer;
        this.signature = signature;
        this.data = data;
        this.secret = secret;
    }
}