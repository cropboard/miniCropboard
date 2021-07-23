import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // fetch secrets

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

interface userData {
    email: string
    id: string
}

function createToken({email, id}: userData): string {
    let token: string = jwt.sign({email: email, id: id}, SECRET_KEY as string, { expiresIn: "10", issuer: "miniCropboard" });
    return token;
}

