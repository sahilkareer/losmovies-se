// Custom encryption function
function encryptId(id) {
    // Split the ID into numeric and non-numeric parts
    const parts = id.split('-');
    const numericPart = parseInt(parts[0], 10);
    const nonNumericPart = parts[1];

    // Encrypt the numeric part using a custom transformation
    const encryptedNumber = (numericPart * 2) - 3;

    // Encrypt the non-numeric part by converting 'Y' to its ASCII code and adding a constant
    const encryptedNonNumericPart = nonNumericPart.charCodeAt(0) + 100;

    // Combine the encrypted number and encrypted non-numeric part without '-' separator
    return `${encryptedNumber}${encryptedNonNumericPart}`;
}


// Custom decryption function
function decryptId(encryptedId) {
    // Separate the encrypted ID into numeric and non-numeric parts
    const numericPart = parseInt(encryptedId.slice(0, -3), 10);
    const encryptedNonNumericPart = parseInt(encryptedId.slice(-3), 10);

    // Decrypt the numeric part using the reverse transformation
    const decryptedNumber = (numericPart + 3) / 2;

    // Decrypt the non-numeric part by converting the encrypted ASCII code back to 'Y'
    const decryptedNonNumericPart = String.fromCharCode(encryptedNonNumericPart - 100);

    // Combine the decrypted number and decrypted non-numeric part to reconstruct the original ID
    return `${decryptedNumber}-${decryptedNonNumericPart}`;
}

export { encryptId, decryptId };