export interface UploadResult {
    storageKey: string;
    fileUrl: string;
    fileName: string;
    mimeType: string;
    size: number;
}

export interface StorageProvider {
    save(
        file: Express.Multer.File,
        folder: string
    ): Promise<UploadResult>;

    delete(
        storageKey: string
    ): Promise<void>;
}