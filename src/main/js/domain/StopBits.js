export class StopBits {
    static ONE = { name: "1", value: 1 };
    static ONE_POINT_FIVE = { name: "1.5", value: 2 };
    static TWO = { name: "2", value: 3 };

    static values() {
        return [this.ONE, this.ONE_POINT_FIVE, this.TWO];
    }
}