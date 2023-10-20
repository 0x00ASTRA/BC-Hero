interface IToken {
    name: string;
    ticker: string;
    address: string;
    balance: number;
    image?: URL;
    metadata?: {};
}

class Token implements IToken {
    public name: string;
    public ticker: string;
    public address: string;
    public balance: number;
    public image?: URL | undefined;
    public metadata?: {} | undefined;

    constructor(name: string, ticker: string, address: string, balance: number, image?: URL, metadata?: {}) {
        this.name = name;
        this.ticker = ticker;
        this.address = address;
        this.balance = balance;
        this.image = image;
        this.metadata = metadata;
    }
    
}

export default Token;

export { IToken }