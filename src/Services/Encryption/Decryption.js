async function decrypt(encryptedData, iv) {
    try {
        // Convert the key from hex to an ArrayBuffer
        const keyBuffer = new Uint8Array(process.env.REACT_APP_ENCRYPTION_KEY.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Import the key
        const key = await crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-CBC' },
            false,
            ['decrypt']
        );

        // Convert IV from hex to an ArrayBuffer
        const ivBuffer = new Uint8Array(iv.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Convert encrypted data from hex to an ArrayBuffer
        const encryptedBuffer = new Uint8Array(encryptedData.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Decrypt the data
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-CBC', iv: ivBuffer },
            key,
            encryptedBuffer
        );

        // Convert decrypted ArrayBuffer to a string
        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    } catch (error) {
        console.error('Decryption error:', error.message);
        throw error;
    }
}
