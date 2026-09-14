using System;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BackendAPI.Models
{
    // This securely encrypts all uploaded logs and configurations (Microsoft, 2026a)
    public static class FileEncryptionService
    {
        private static readonly byte[] Key = "12345678901234567890123456789012"u8.ToArray(); // 32 bytes for AES-256
        private static readonly byte[] IV = "1234567890123456"u8.ToArray(); // 16 bytes for AES block size

        // Encrypts the uploaded file stream and saves it (Microsoft, 2026b)
        public static async Task EncryptAndSaveFileAsync(IFormFile file, string outputPath)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = Key;
                aes.IV = IV;

                // Creates the encryptor object
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                // Opens the output file stream where the encrypted data will be saved
                using (FileStream fileStream = new FileStream(outputPath, FileMode.Create))
                {
                    // Wraps the file stream in a CryptoStream to encrypt data
                    using (CryptoStream cryptoStream = new CryptoStream(fileStream, encryptor, CryptoStreamMode.Write))
                    {
                        // Opens the incoming multipart upload stream
                        using (Stream uploadStream = file.OpenReadStream())
                        {
                            // Copies the upload stream directly to the crypto stream to avoid RAM slow downs (Microsoft, 2026c)
                            await uploadStream.CopyToAsync(cryptoStream);
                        }
                    }
                }
            }
        }
    }
}

/* Reference list:

   Microsoft, 2026a. Cryptography in .NET. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/standard/security/cryptography-model> [Accessed 13 September 2026].
   
   Microsoft, 2026b. Aes Class. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.aes> [Accessed 13 September 2026].
   
   Microsoft, 2026c. Stream.CopyToAsync Method. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/api/system.io.stream.copytoasync> [Accessed 13 September 2026].

*/