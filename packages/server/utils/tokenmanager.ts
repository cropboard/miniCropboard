import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // fetch secrets

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

interface userData {
  email: string;
  id: string;
}

function createToken({ email, id }: userData): string {
  let token: string = jwt.sign({ email: email, id: id }, SECRET_KEY as string, {
    expiresIn: "30d",
    issuer: "miniCropboard",
  });
  return token;
}

function validateToken(token: string): any {
  try {
    let result: string | JwtPayload = jwt.verify(token, SECRET_KEY as string, {
      issuer: "miniCropboard",
    });
    return result;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw Error("TokenExpired");
    } else {
      throw Error("TokenInvalid");
    }
  }
}

/* // testing both functions
let token = createToken({email: "josias@josiasw.dev", id: "12345"});

console.log(token);

let decoded = validateToken(token);

console.log(decoded);
 */

export { createToken, validateToken };
