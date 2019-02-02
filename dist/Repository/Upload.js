"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_utils_1 = require("@sensenet/client-utils");
const uuid_1 = require("uuid");
/**
 * Helper class for uploading content into the sensenet Repository
 */
class Upload {
    /**
     * Uploads a specified text as a binary file
     * @param {IUploadTextOptions} options The additional options
     */
    static textAsFile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadFileOptions = Object.assign({ file: new File([options.text], options.fileName) }, options);
            return yield this.file(uploadFileOptions);
        });
    }
    /**
     * Uploads a specified file into a sensenet Repository
     * @param {IUploadFileOptions} options The additional upload options
     */
    static file(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isChunkedUploadNeeded(options.file, options.repository)) {
                return yield this.uploadChunked(options);
            }
            return yield this.uploadNonChunked(options);
        });
    }
    /**
     * Returns if a chunked upload is needed for a specified file
     * @param {File} file The File object
     * @param {Repository} repo The sensenet Repository
     */
    static isChunkedUploadNeeded(file, repo) {
        return file.size >= repo.configuration.chunkSize;
    }
    static getUploadUrl(options) {
        return client_utils_1.PathHelper.joinPaths(options.repository.configuration.repositoryUrl, options.repository.configuration.oDataToken, client_utils_1.PathHelper.getContentUrl(options.parentPath), "upload");
    }
    static getFormDataFromOptions(options) {
        const formData = new FormData();
        formData.append("ChunkToken", "0*0*False*False");
        formData.append("FileName", options.file.name);
        formData.append("Overwrite", options.overwrite.toString());
        formData.append("PropertyName", options.binaryPropertyName.toString());
        formData.append("FileLength", options.file.size.toString());
        formData.append("ContentType", options.contentTypeName.toString());
        return formData;
    }
    static uploadNonChunked(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const guid = uuid_1.v1();
            options.progressObservable && options.progressObservable.setValue({
                guid,
                file: options.file,
                completed: false,
            });
            const formData = this.getFormDataFromOptions(options);
            formData.append(options.file.name, options.file);
            const response = yield options.repository.fetch(this.getUploadUrl(options), {
                credentials: "include",
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                const error = response.json();
                options.progressObservable && options.progressObservable.setValue({
                    guid,
                    file: options.file,
                    chunkCount: 1,
                    uploadedChunks: 1,
                    completed: true,
                    createdContent: options.progressObservable.getValue().createdContent,
                    error,
                });
                throw (yield options.repository.getErrorFromResponse(response));
            }
            const uploadResponse = yield response.json();
            options.progressObservable && options.progressObservable.setValue({
                guid,
                file: options.file,
                chunkCount: 1,
                uploadedChunks: 1,
                completed: true,
                createdContent: uploadResponse,
            });
            return uploadResponse;
        });
    }
    static uploadChunked(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const chunkCount = Math.floor(options.file.size / options.repository.configuration.chunkSize);
            const guid = uuid_1.v1();
            options.progressObservable && options.progressObservable.setValue({
                guid,
                file: options.file,
                completed: false,
                chunkCount,
                uploadedChunks: 0,
            });
            const uploadPath = this.getUploadUrl(options);
            /** initial chunk data and request */
            const formData = this.getFormDataFromOptions(options);
            formData.append(options.file.name, options.file.slice(0, options.repository.configuration.chunkSize));
            formData.append("UseChunk", "true");
            formData.append("create", "1");
            const initRequest = yield options.repository.fetch(uploadPath, {
                body: formData,
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Range": `bytes 0-${options.repository.configuration.chunkSize - 1}/${options.file.size}`,
                    "Content-Disposition": `attachment; filename="${options.file.name}"`,
                },
            });
            if (!initRequest.ok) {
                throw (yield options.repository.getErrorFromResponse(initRequest));
            }
            const chunkToken = yield initRequest.text();
            let lastResponseContent = {};
            /** */
            for (let i = 0; i <= chunkCount; i++) {
                const start = i * options.repository.configuration.chunkSize;
                let end = start + options.repository.configuration.chunkSize;
                end = end > options.file.size ? options.file.size : end;
                const chunkFormData = new FormData();
                const chunkData = options.file.slice(start, end);
                chunkFormData.append("FileLength", options.file.size.toString());
                chunkFormData.append("ChunkToken", chunkToken);
                chunkFormData.append(options.file.name, chunkData);
                const lastResponse = yield options.repository.fetch(uploadPath, {
                    body: chunkFormData,
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Range": `bytes ${start}-${end - 1}/${options.file.size}`,
                        "Content-Disposition": `attachment; filename="${options.file.name}"`,
                    },
                });
                if (lastResponse.ok) {
                    lastResponseContent = yield lastResponse.json();
                    options.progressObservable && options.progressObservable.setValue({
                        guid,
                        file: options.file,
                        chunkCount,
                        uploadedChunks: i,
                        completed: i === chunkCount,
                        createdContent: lastResponseContent,
                    });
                }
                else {
                    const error = yield lastResponse.json();
                    options.progressObservable && options.progressObservable.setValue({
                        guid,
                        file: options.file,
                        chunkCount,
                        uploadedChunks: i,
                        completed: i === chunkCount,
                        createdContent: lastResponseContent,
                        error,
                    });
                    throw (yield options.repository.getErrorFromResponse(lastResponse));
                }
            }
            return lastResponseContent;
        });
    }
    static webkitFileHandler(fileEntry, contentPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                fileEntry.file((f) => __awaiter(this, void 0, void 0, function* () {
                    yield this.file(Object.assign({ file: f }, options, { parentPath: contentPath }));
                    resolve();
                }), (err) => reject(err));
            });
        });
    }
    static webkitDirectoryHandler(directory, contentPath, options, readEntries = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield options.repository.post({
                content: {
                    Name: directory.name,
                },
                parentPath: contentPath,
                contentType: "Folder",
            });
            if (readEntries) {
                const dirReader = directory.createReader();
                yield new Promise((resolve, reject) => {
                    dirReader.readEntries((items) => __awaiter(this, void 0, void 0, function* () {
                        yield this.webkitItemListHandler(items, folder.d.Path, true, options);
                        resolve();
                    }), (err) => reject(err));
                });
            }
        });
    }
    static webkitItemListHandler(items, contentPath, createFolders, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:forin
            for (const item of items) {
                if (createFolders && item.isDirectory) {
                    yield this.webkitDirectoryHandler(item, contentPath, options);
                }
                if (item.isFile) {
                    yield this.webkitFileHandler(item, contentPath, options);
                }
            }
        });
    }
    /**
     * Uploads content from a specified Drop Event
     * @param { IUploadOptions } options Options for the Upload request
     */
    static fromDropEvent(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (window.webkitRequestFileSystem) {
                const entries = [].map.call(options.event.dataTransfer.items, (i) => i.webkitGetAsEntry());
                yield this.webkitItemListHandler(entries, options.parentPath, options.createFolders, options);
            }
            else {
                // Fallback for non-webkit browsers.
                [].forEach.call(options.event.dataTransfer.files, (f) => __awaiter(this, void 0, void 0, function* () {
                    if (f.type === "file") {
                        return yield Upload.file(Object.assign({ file: f }, options));
                    }
                }));
            }
        });
    }
    /**
     * Uploads files (and optionally creates the directory structure) from a file list
     * @param { IUploadFromFileListOptions } options Options for the Upload request
     */
    static fromFileList(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.createFolders) {
                const directories = new Set(Array.from(options.fileList).map((f) => client_utils_1.PathHelper.getParentPath(f.webkitRelativePath)));
                const directoriesBySegments = Array.from(directories).map((d) => client_utils_1.PathHelper.getSegments(d));
                const createdDirectories = new Set();
                for (const directory of directoriesBySegments) {
                    let currentPath = options.parentPath;
                    for (const segment of directory) {
                        const pathToCreate = client_utils_1.PathHelper.joinPaths(currentPath, segment);
                        if (!createdDirectories.has(pathToCreate)) {
                            yield this.webkitDirectoryHandler({ name: segment }, currentPath, options, false);
                        }
                        createdDirectories.add(pathToCreate);
                        currentPath = pathToCreate;
                    }
                }
                yield Promise.all(Array.from(options.fileList).map((file) => __awaiter(this, void 0, void 0, function* () {
                    yield this.file(Object.assign({}, options, { parentPath: client_utils_1.PathHelper.joinPaths(options.parentPath, client_utils_1.PathHelper.getParentPath(file.webkitRelativePath)), file }));
                })));
            }
            else {
                const { fileList, createFolders } = options, uploadOptions = __rest(options, ["fileList", "createFolders"]);
                for (const file of Array.from(options.fileList)) {
                    yield this.file(Object.assign({}, uploadOptions, { file }));
                }
            }
        });
    }
}
exports.Upload = Upload;
//# sourceMappingURL=Upload.js.map