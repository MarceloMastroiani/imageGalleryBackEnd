import * as bcrypt from 'bcrypt';

//Funcion para hashear la contraseña
export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
