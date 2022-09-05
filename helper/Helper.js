export const errMsg = (msg) => {
    return JSON.stringify(msg) === '{}' ? msg.stack : msg;
}

export const lower = (str) => {
    return str.toLowerCase();
}