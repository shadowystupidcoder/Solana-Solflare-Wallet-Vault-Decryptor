import { pbkdf2 } from 'crypto';
import nacl from "tweetnacl"
import bs58 from 'bs58';

// To find your encrypted Solflare password on Windows navigate to:
// ~\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Local Storage\leveldb\
// or:
// ~\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb\
// and control + f for: "Xxpass" in all of the .ldb files (open in a an editor or notepad++). The string you find here will be the encrypted password, ie:
// dF3bGD8iqVcrJJQpS6fEsVgg9iKeNHGCCEhK2C2cGYRm2dx8xeFU1wKbkBsCWdefaz82KeyfbBf8Pfkpm4C56cc6

// Example data where Solflare encrypted password was found:
// 635311b071e66706d71745c58616fa161356d7074767141584852020e527676"]>¶lastactivity☺$\☺1713308907402>↕♥mmaccounts☺☺\☺[]@
// Xxpass☺%\☺dF3bGD8iqVcrJJQpS6fEsVgg9iKeNHGCCEhK2C2cGYRm2dx8xeFU1wKbkBsCWdefaz82KeyfbBf8Pfkpm4C56cc6► whatsnew☺

// Solflare does this a bit different than Phantom. They seem to encrypt your password with some method I'm not entirely sure but then you need to
// use this encryped string as the password to derive the encryption key to open the vault box, using the encrypted data's salt along with the Solflare encrypted
// password to derive the boxes encryption key. Then you take the vault data's nonce, along with the returned key from the previous step. There is no salt or nonce
// for the Solflare encrypted password that I could find. Find any raw Data and format it the same as you would (good guides on this already):

// {"encrypted":"9K5j1E3QpmF7UY3v1UKrARko7qPV7TyamuGoQ.....", "kdf":"pbkdf2","nonce":"ANmAvaghvjbc2P29nbbQBiG51aJUjQfdV",
// "salt":"8gKXzUD5TpgsUrC8Q6ngbP"}

// then decrypt as follows, Solflare uses 100,000 iterations instead of 10,000:

const password = "dF3bGD8iqVcrJJQpS6fEsVgg9iKeNHGCCEhK2C2cGYRm2dx8xeFU1wKbkBsCWdefaz82KeyfbBf8Pfkpm4C56cc6"
const data = {
  "encrypted": "9K5j1E3QpmF7UY3v1UKrARko7qPV7TyamuGoQ.....",
  "kdf": "pbkdf2",
  "nonce": "ANmAvaghvjbc2P29nbbQBiG51aJUjQfdV",
  "salt": "8gKXzUD5TpgsUrC8Q6ngbP"
}
const salt = bs58.decode(data.salt);
const nonce = bs58.decode(data.nonce);
const encrypted = bs58.decode(data.encrypted);
const key = await deriveEncryptionKey(password, salt);
const plaintext = nacl.secretbox.open(encrypted, nonce, key);
let decoded = null
try
{
  decoded = Buffer.from(plaintext).toString();
}
catch
{
  console.log("invalid vault data")
}
if (!decoded)
{
  console.log("incorrect vault password")
}
if (decoded)
{
  const parsed = JSON.parse(decoded)
  console.log(parsed)
}


async function deriveEncryptionKey(password, salt)
{
  try
  {
    return new Promise((resolve, reject) => pbkdf2(
      password, salt, 100000, 32, "sha256",
      (err, key) => (err ? reject(err) : resolve(key))))
  }
  catch
  {}
}
