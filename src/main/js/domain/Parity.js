// Constants which describes UART parity types according com.fazecast.jSerialComm class.
export class Parity {
    static NONE = { name: "None", value: 0 };
    static ODD = { name: "Odd", value: 1 };
    static EVEN = { name: "Even", value: 2 };
    static MARK = { name: "Mark", value: 3 };
    static SPACE = { name: "Space", value: 4 };

    static values() {
        return [this.NONE, this.ODD, this.EVEN, this.MARK, this.SPACE];
    }
}