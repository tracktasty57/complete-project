import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Use /tmp for Vercel or local uploads directory
const isVercel = process.env.VERCEL === '1';
const uploadDir = isVercel ? '/tmp' : 'uploads/';

if (!isVercel && !fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, uploadDir);
    },
    filename: function (req: any, file: any, cb: any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB limit
    }
});
