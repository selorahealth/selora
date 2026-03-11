import { Ed25519Keypair } from '@iota/iota-sdk/keypairs/ed25519'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-cbc'

// must be 32 bytes
const ENCRYPTION_KEY = Buffer.from(process.env.WALLET_ENCRYPTION_KEY || '0000000000000000000000000000000000000000000000000000000000000000', 'hex')

// ── Encrypt seed/private key before storing ──
export function encryptSeed(seed: string): string {
    const iv = randomBytes(16)

    const cipher = createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)

    const encrypted = Buffer.concat([
        cipher.update(seed, 'utf8'),
        cipher.final(),
    ])

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

// ── Decrypt seed/private key ──
export function decryptSeed(encryptedSeed: string): string {
    const [ivHex, encryptedHex] = encryptedSeed.split(':')

    const iv = Buffer.from(ivHex, 'hex')
    const encrypted = Buffer.from(encryptedHex, 'hex')

    const decipher = createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ])

    return decrypted.toString('utf8')
}

// ── Create wallet ──
export function createWallet(): {
    address: string
    encryptedSeed: string
} {
    const keypair = new Ed25519Keypair()

    const address = keypair.toIotaAddress()

    // convert secret key to hex string
    const secretKey = Buffer.from(keypair.getSecretKey()).toString('hex')

    const encryptedSeed = encryptSeed(secretKey)

    return { address, encryptedSeed }
}

// ── Recreate keypair from encrypted seed ──
export function getKeypairFromEncryptedSeed(
    encryptedSeed: string
): Ed25519Keypair {
    const secretKeyHex = decryptSeed(encryptedSeed)

    const secretKey = Uint8Array.from(Buffer.from(secretKeyHex, 'hex'))

    return Ed25519Keypair.fromSecretKey(secretKey)
}