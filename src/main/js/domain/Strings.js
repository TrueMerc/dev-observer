export class Strings {

    static isEmpty(string) {
       return (string === undefined) || (string === null) || this.isEmptyString(string);
    }

    static isEmptyString(string) {
        return typeof string === 'string' && string.length === 0;
    }

    static isNonEmptyString(string) {
        return typeof string === 'string' && string.length > 0;
    }
}