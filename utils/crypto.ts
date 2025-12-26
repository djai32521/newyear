export const SECRET_SALT = "NewYear2026_Horse";

export const obfuscate = (text: string): string => {
    const xor = text.split('').map((char, i) =>
        char.charCodeAt(0) ^ SECRET_SALT.charCodeAt(i % SECRET_SALT.length)
    );
    return btoa(String.fromCharCode(...xor));
};

export const deobfuscate = (encoded: string): string => {
    try {
        const text = atob(encoded);
        const result = text.split('').map((char, i) =>
            String.fromCharCode(char.charCodeAt(0) ^ SECRET_SALT.charCodeAt(i % SECRET_SALT.length))
        ).join('');
        return result;
    } catch (e) {
        console.error("Failed to deobfuscate key", e);
        return "";
    }
};
