type S3Upload = {
    fileType: string;
    userInfo: string;
};
export declare const getUploadFileSignedURLFromS3: ({ fileType, userInfo }: S3Upload) => Promise<{
    uploadUrl: string;
    key: string;
}>;
export declare const getDownloadFileSignedURLFromS3: ({ key }: {
    key: string;
}) => Promise<string>;
export {};
