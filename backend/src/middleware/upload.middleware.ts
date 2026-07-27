import multer from "multer";
import path from "path";
import fs from "fs";

import { UploadConfig } from "../upload/upload.config";
import { UploadType } from "../upload/upload.types";

const tempDirectory = path.join(
    process.cwd(),
    "uploads",
    "temp"
);

if (!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, tempDirectory);
    },

    filename: (_req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    },
});

export function createUploader(
    type: UploadType
) {
    const config = UploadConfig[type];
    return multer({

    storage,

    limits: {
        fileSize: config.maxSize,
    },

    fileFilter(req, file, cb) {

        if (
            config.mimeTypes.length &&
            !config.mimeTypes.includes(file.mimetype)
        ) {
            return cb(
                new Error("Unsupported file type.")
            );
        }

        cb(null, true);

    },
});
}