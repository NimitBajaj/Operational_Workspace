import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import {
    StorageProvider,
    UploadResult,
} from "./storage.interface";

export class LocalStorageProvider implements StorageProvider {
    async save(
    file: Express.Multer.File,
    folder: string
): Promise<UploadResult> {
 const appUrl = process.env.APP_URL ?? "http://localhost:3000";
    const extension = path.extname(file.originalname);

    const fileName = `${randomUUID()}${extension}`;

    const targetFolder = path.join(
        process.cwd(),
        "uploads",
        folder
    );

    await fs.mkdir(targetFolder, {
        recursive: true,
    });

    const destination = path.join(
        targetFolder,
        fileName
    );

    await fs.rename(file.path, destination);

    const storageKey = `${folder}/${fileName}`;

    return {
        storageKey,
        fileUrl: `${appUrl}/uploads/${storageKey}`,
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
    };
}

    async delete(storageKey: string): Promise<void> {

    const filePath = path.join(
        process.cwd(),
        "uploads",
        storageKey
    );

    try {
        await fs.unlink(filePath);
    } catch {
        // Ignore if the file doesn't exist.
    }
}
}