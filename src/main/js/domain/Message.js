import dayjs from "dayjs";

export class Message {
    dateTimeFormat = 'YYYY-MM-DD hh:mm:ss'

    constructor(text, prefix) {
        this.text = `[${dayjs().format(this.dateTimeFormat)}] ${prefix ? prefix + ' ' : ''}${text}`;
    }

    toString() {
        return this.text;
    }
}