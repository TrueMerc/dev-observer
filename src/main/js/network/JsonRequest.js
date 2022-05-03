export class JsonRequest {
    constructor(url, method, mode = 'same-origin', credentials = 'same-origin') {
        this.url = url;
        this.method = method;
        this.mode = mode;
        this.credentials = credentials;
    }

    execute = async () => {
        await fetch(this.url, {
            method: this.method,
            mode: this.mode,
            credentials: this.credentials,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Can't retrieve a response from server. Response status: ${response.status}`);
            }
        });
    }
}