import { StorageProvider } from "./storage.interface";

export class StorageService {
    constructor(
        private readonly provider: StorageProvider
    ) {}

    async saveFile(
    file: Express.Multer.File,
    folder: string
){
    return this.provider.save(
        file,
        folder
    );
}

    async uploadDocument(
        file: Express.Multer.File
    ) {
        return this.provider.save(
            file,
            "documents"
        );
    }

    async uploadQuotation(
        file: Express.Multer.File
    ) {
        return this.provider.save(
            file,
            "quotations"
        );
    }

    async deleteFile(storageKey: string) {
    return this.provider.delete(storageKey);
}
}