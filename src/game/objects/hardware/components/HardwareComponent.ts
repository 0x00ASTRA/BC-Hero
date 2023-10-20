interface IHardwareComponent {
    name: string;
    manufacturer: string;
    description: string;
    isSuppliedPower: boolean;
    isActive: boolean;
    powerON(): boolean;
    powerOFF(): boolean;
}

class HardwareComponent implements IHardwareComponent {
    public name: string;
    public manufacturer: string;
    public description: string;
    public isSuppliedPower: boolean;
    public isActive: boolean;

    constructor(
        name: string,
        manufacturer: string,
        description: string,
        isSuppliedPower: boolean,
        isActive: boolean
    ) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.isSuppliedPower = isSuppliedPower;
        this.isActive = isActive;
    }

    powerON() {
        if (!this.isSuppliedPower) {
            return false;
        }
        this.isActive = true;
        return this.isActive;
    }

    powerOFF(): boolean {
        this.isActive = false;
        return this.isActive;
    }
}

export default HardwareComponent;

export { IHardwareComponent }