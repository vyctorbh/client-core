import { IContent } from "../Models/IContent";
import { IUploadFileOptions, IUploadFromEventOptions, IUploadFromFileListOptions, IUploadTextOptions } from "../Models/IRequestOptions";
import { Repository } from "../Repository/Repository";
/**
 * Response model for Uploads
 */
export interface IUploadResponse {
    /**
     * Identifier for the uploaded content
     */
    Id: number;
    /**
     * Uploaded file lengthj
     */
    Length: number;
    /**
     * Content name
     */
    Name: string;
    /**
     * URL for thumbnail view
     */
    Thumbnail_url: string;
    /**
     * Created content type
     */
    Type: string;
    /**
     * Url for the created content
     */
    Url: string;
}
/**
 * Helper class for uploading content into the sensenet Repository
 */
export declare class Upload {
    /**
     * Uploads a specified text as a binary file
     * @param {IUploadTextOptions} options The additional options
     */
    static textAsFile<T extends IContent>(options: IUploadTextOptions<T>): Promise<IUploadResponse>;
    /**
     * Uploads a specified file into a sensenet Repository
     * @param {IUploadFileOptions} options The additional upload options
     */
    static file<T extends IContent>(options: IUploadFileOptions<T>): Promise<IUploadResponse>;
    /**
     * Returns if a chunked upload is needed for a specified file
     * @param {File} file The File object
     * @param {Repository} repo The sensenet Repository
     */
    static isChunkedUploadNeeded(file: File, repo: Repository): boolean;
    private static getUploadUrl;
    private static getFormDataFromOptions;
    private static uploadNonChunked;
    private static uploadChunked;
    private static webkitFileHandler;
    private static webkitDirectoryHandler;
    private static webkitItemListHandler;
    /**
     * Uploads content from a specified Drop Event
     * @param { IUploadOptions } options Options for the Upload request
     */
    static fromDropEvent<T extends IContent = IContent>(options: IUploadFromEventOptions<T>): Promise<void>;
    /**
     * Uploads files (and optionally creates the directory structure) from a file list
     * @param { IUploadFromFileListOptions } options Options for the Upload request
     */
    static fromFileList<T extends IContent = IContent>(options: IUploadFromFileListOptions<T>): Promise<void>;
}
