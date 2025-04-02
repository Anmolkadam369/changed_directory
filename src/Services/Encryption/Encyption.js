async function encrypt(text) {
    if (!text) {
        return { iv: '', encryptedData: '' };
    }

    const textToEncrypt = String(text);

    // Generate a random IV
    const iv = crypto.getRandomValues(new Uint8Array(16));

    // Convert the key from hex to an ArrayBuffer
    console.log("process.env.REACT_APP_ENCRYPTION_KEY",process.env.REACT_APP_PUBLIC_URL) 
    console.log("process.env.REACT_APP_ENCRYPTION_KEY",process.env.REACT_APP_ENCRYPTION_KEY)

    const keyBuffer = new Uint8Array(process.env.REACT_APP_ENCRYPTION_KEY.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Import the key
    const key = await crypto.subtle.importKey( 
        'raw',
        keyBuffer,
        { name: 'AES-CBC' },
        false,
        ['encrypt']
    );

    // Encode the text to encrypt
    const encoder = new TextEncoder();
    const data = encoder.encode(textToEncrypt);

    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        key,
        data
    );

    // Convert encrypted data and IV to hex string
    const encryptedHex = Array.from(new Uint8Array(encrypted)).map(byte => byte.toString(16).padStart(2, '0')).join('');
    const ivHex = Array.from(iv).map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log("{ iv: ivHex, encryptedData: encryptedHex };", { iv: ivHex, encryptedData: encryptedHex })
    return { iv: ivHex, encryptedData: encryptedHex };
}

export default encrypt;
