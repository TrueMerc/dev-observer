import {Strings} from "./Strings";
import {makeObservable, observable} from "mobx";

export class User {

    id = 0;
    login = '';
    firstName = '';
    lastName = '';
    patronymic = '';
    email = '';
    isAdministrator = false;

    constructor(json) {
        makeObservable(this, {
            id: observable,
            login: observable,
            lastName: observable,
            firstName: observable,
            patronymic: observable,
            email: observable,
            isAdministrator: observable
        });
        this.id = json.id;
        this.login = json.login;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.patronymic = json.patronymic;
        this.email = json.email;
        this.isAdministrator = json.isAdministrator;
    }

    lastNameWithInitials() {
        console.log(this);
        return this.lastName
        + (Strings.isNonEmptyString(this.firstName) ? (` ${this.firstName.at(0)}.` ) : '')
        + (Strings.isNonEmptyString(this.patronymic) ? (` ${this.patronymic.at(0)}.`) : '');
    }
}