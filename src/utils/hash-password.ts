import * as bcrypt from 'bcryptjs';
import { HASH_SALT } from 'src/constants/constant';

const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(HASH_SALT);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (inputPassword: string, bdPassword: string): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, bdPassword);
};

export { encryptPassword, comparePassword };
