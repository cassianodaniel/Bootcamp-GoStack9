import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req,file,cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                //return cb(se não der erro, arquivo que estava em 16 bytes, pelo crypto, será escrito em hexadecimal + seu nome original de sua extensão)
                //(onde está null, é porque a função espera o erro ali, assim como na linha 10 -> cb (err));
                return cb(null, res.toString('hex') + extname(file.originalname));
            });
        },
    }),
};