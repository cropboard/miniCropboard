import * as bcrypt from "bcryptjs";

function hashPassword(password: string): string {
  const salt: string | number | undefined = bcrypt.genSaltSync(7);
  const hashedPassword: string = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

function isPassword(password: string, hashedPassword: string): boolean {
  /* Compares a given password against the hash */
  let isValid: boolean = bcrypt.compareSync(password, hashedPassword);
  return isValid;
}

/* console.log(hashPassword("test"));

console.log(isPassword("test", "$2a$07$cOUOdhxbWTCmG45UHHGlyOnwhKigkZ/1FJbkhEK2Vw/JvOkQDqx1q")); */

export { hashPassword, isPassword };
