import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const imageStorageInterceptor = {
    storage: diskStorage({
        destination: join(__dirname, '..', '..', 'static', 'images'),
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`;
            req.body.image = `/static/images/${filename}`;
            cb(null, filename);
        },
    }),
};
