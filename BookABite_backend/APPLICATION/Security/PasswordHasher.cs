using System.Security.Cryptography;

namespace APPLICATION.Security;

public static class PasswordHasher
{
    public static (byte[] Hash, byte[] Salt) HashPassword(byte[] passwordBytes)
    {
        byte[] salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        using (var sha256 = SHA256.Create())
        {
            byte[] saltedPassword = new byte[salt.Length + passwordBytes.Length];
            Array.Copy(salt, 0, saltedPassword, 0, salt.Length);
            Array.Copy(passwordBytes, 0, saltedPassword, salt.Length, passwordBytes.Length);

            byte[] hashBytes = sha256.ComputeHash(saltedPassword);
            return (hashBytes, salt);
        }
    }

    public static bool VerifyPassword(byte[] passwordBytes, byte[] storedHash, byte[] storedSalt)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] saltedPassword = new byte[storedSalt.Length + passwordBytes.Length];
            Array.Copy(storedSalt, 0, saltedPassword, 0, storedSalt.Length);
            Array.Copy(passwordBytes, 0, saltedPassword, storedSalt.Length, passwordBytes.Length);

            byte[] computedHash = sha256.ComputeHash(saltedPassword);

            return AreHashesEqual(computedHash, storedHash);
        }
    }

    private static bool AreHashesEqual(byte[] hash1, byte[] hash2)
    {
        if (hash1.Length != hash2.Length)
        {
            return false;
        }

        for (int i = 0; i < hash1.Length; i++)
        {
            if (hash1[i] != hash2[i])
            {
                return false;
            }
        }

        return true;
    }
}
