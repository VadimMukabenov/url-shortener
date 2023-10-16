export function validateUrl(value) {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/i;

    return urlRegex.test(value);
}
