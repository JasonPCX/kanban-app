import { randomBytes, pbkdf2 } from "crypto";

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const BYTE_TO_STRING_ENCODING = "hex"; // base64

export function generateHashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);

    pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      const hash = derivedKey.toString(BYTE_TO_STRING_ENCODING);

      resolve(`${salt}:${ITERATIONS}:${hash}`);
    });
  });
}

export function verifyPassword(persistedPassword, passwordAttempt) {
  const [salt, iterationsStr, hash] = persistedPassword.split(":");
  const iterations = parseInt(iterationsStr)
  return new Promise((resolve, reject) => {
    pbkdf2(passwordAttempt, salt, iterations, PASSWORD_LENGTH, DIGEST, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(hash === derivedKey.toString(BYTE_TO_STRING_ENCODING));
    });
  });
}
