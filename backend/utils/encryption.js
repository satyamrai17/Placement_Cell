//encryption.js
import bcrypt from 'bcrypt';
export const hashing ={
    SALT:10,
    passwordHash(plainPassword){
        return bcrypt.hashSync(plainPassword, this.SALT);
    },
    matchPassword(data, hash){
        return bcrypt.compareSync(data, hash);
    }
}