var Constants = {
    ENDPOINT: "https://api.dribbble.com/v1/",
    CLIENT_ID: "e8ea33c685941915ab725fcf1b32be8907e592338d5e49e536471a01e1e8c4db",
    ACCESS_TOKEN: "a60ea9eda72bbeeb112ea8afcc5ff9bcd01008b867592cbfac92e3c1f01d13be",
}

export {Constants}

export function buildUrl(path): string {
    return Constants.ENDPOINT + path;
}

export function appendAccessHeader(headers): string {
    if (headers) {
        headers.Authorization = "Bearer " + Constants.ACCESS_TOKEN;
    }
}

export function buildAccessHeader() {
    return {Authorization: "Bearer " + Constants.ACCESS_TOKEN}
}