import { UploadType } from "./upload.types";

type UploadConfiguration = {
    maxSize: number;
    mimeTypes: string[];
};

export const UploadConfig: Record<UploadType, UploadConfiguration> = {
    [UploadType.IMAGE]: {
        maxSize: 10 * 1024 * 1024,
        mimeTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ],
    },

    [UploadType.DOCUMENT]: {
        maxSize: 20 * 1024 * 1024,
        mimeTypes: [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
    },

    [UploadType.ANY]: {
        maxSize: 25 * 1024 * 1024,
        mimeTypes: [],
    },
};