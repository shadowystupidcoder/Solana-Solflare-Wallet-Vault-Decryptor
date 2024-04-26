**Solana Solflare Wallet Vault Decryptor**  

To find your encrypted Solflare password on Windows navigate to:  

\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Local Storage\leveldb\  
\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb\  
...etc  

and control + f for: "Xxpass" in all of the .ldb files (open in a an editor or notepad++). The string you find here will be the encrypted password, ie:  

Example data where Solflare encrypted password was found:  
635311b071e66706d71745c58616fa161356d7074767141584852020e527676"]>¶lastactivity☺$\☺1713308907402>↕♥mmaccounts☺☺\☺[]@  
Xxpass☺%\☺**dF3bGD8iqVcrJJQpS6fEsVgg9iKeNHGCCEhK2C2cGYRm2dx8xeFU1wKbkBsCWdefaz82KeyfbBf8Pfkpm4C56cc6**►  


Solflare does this a bit different than Phantom. They seem to encrypt your password with some method I'm not entirely sure but then you need to use this encrypted string as the password to derive the encryption key to open the vault box, using the encrypted data's salt along with the Solflare encrypted password to derive the boxes encryption key. Then you take the vault data's nonce, along with the returned key from the previous step. There is no salt or nonce for the Solflare encrypted password that I could find. Find any raw Data and format it the same as you would (good guides on this already):

Then decrypt.  


Any questions add me on Discord.  


*To decrypt a Phantom vault - https://github.com/shadowystupidcoder/Solana-Phantom-Wallet-Vault-Decryptor*
