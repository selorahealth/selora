// Web Crypto API utility for client-side encryption

async function deriveKey(secretStr: string, saltStr: string): Promise<CryptoKey> {
    const enc = new TextEncoder()
    const secret = enc.encode(secretStr)
    const salt = enc.encode(saltStr)

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        secret,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    )

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    )
}

// Encrypts a File into an encrypted Blob, prepending the 12-byte IV
export async function encryptFile(file: File, userId: string): Promise<Blob> {
    const key = await deriveKey(userId, 'selora-salt-2026')
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const arrayBuffer = await file.arrayBuffer()
    
    const encryptedContent = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        arrayBuffer
    )
    
    // Combine IV (12 bytes) + Encrypted Content
    const combined = new Uint8Array(12 + encryptedContent.byteLength)
    combined.set(iv, 0)
    combined.set(new Uint8Array(encryptedContent), 12)

    return new Blob([combined], { type: 'application/octet-stream' })
}

// Decrypts an ArrayBuffer back to original Blob
export async function decryptFile(combinedBuffer: ArrayBuffer, userId: string, mimeType: string): Promise<Blob> {
    const key = await deriveKey(userId, 'selora-salt-2026')
    
    // Extract IV (first 12 bytes) and encrypted content
    const combinedBytes = new Uint8Array(combinedBuffer)
    const iv = combinedBytes.slice(0, 12)
    const encryptedContent = combinedBytes.slice(12)
    
    const decryptedContent = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encryptedContent
    )
    
    return new Blob([decryptedContent], { type: mimeType })
}
