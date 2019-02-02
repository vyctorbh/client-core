"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_utils_1 = require("@sensenet/client-utils");
const BypassAuthentication_1 = require("../Authentication/BypassAuthentication");
const SchemaStore_1 = require("../Schemas/SchemaStore");
const ConstantContent_1 = require("./ConstantContent");
const ODataUrlBuilder_1 = require("./ODataUrlBuilder");
const RepositoryConfiguration_1 = require("./RepositoryConfiguration");
const Security_1 = require("./Security");
const Versioning_1 = require("./Versioning");
/**
 * Type guard to check if an error is extended with a response and a parsed body
 * @param e The error to check
 */
exports.isExtendedError = (e) => {
    return e.response ? true : false;
};
/**
 * Class that can be used as a main entry point to manipulate a sensenet content repository
 */
class Repository {
    constructor(config, fetchMethod = window && window.fetch && window.fetch.bind(window), schemas = new SchemaStore_1.SchemaStore()) {
        this.fetchMethod = fetchMethod;
        this.schemas = schemas;
        /**
         * Authentication service associated with the repository object
         */
        this.authentication = new BypassAuthentication_1.BypassAuthentication();
        /**
         * Shortcut for security- and permission-related custom actions
         */
        this.security = new Security_1.Security(this);
        /**
         * Shortcut for versioning related custom actions
         */
        this.versioning = new Versioning_1.Versioning(this);
        this.configuration = new RepositoryConfiguration_1.RepositoryConfiguration(config);
        this.schemas.setSchemas(this.configuration.schemas);
    }
    /**
     * Disposes the Repository object
     */
    dispose() {
        this.authentication.dispose();
    }
    /**
     * Async method that will be resolved when the Repository is ready to make HTTP calls
     */
    awaitReadyState() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.authentication.checkForUpdate(),
            ]);
        });
    }
    /**
     * Wrapper for a native window.fetch method. The repository's readyState will be awaited and credentials will be included by default
     * @param {RequestInfo} input The RequestInfo object
     * @param {RequestInit} init Optional init parameters
     */
    fetch(info, init, awaitReadyState = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (awaitReadyState) {
                yield this.awaitReadyState();
            }
            return yield this.fetchMethod(info, init || {
                credentials: "include",
            });
        });
    }
    /**
     * Gets a more meaningful error object from a specific response
     * @param response The Response object to extract the message
     */
    getErrorFromResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            let msgFromBody = "";
            let body = {};
            try {
                body = yield response.json();
                msgFromBody = body.error.message.value;
            }
            catch (error) {
                /** */
            }
            const error = new Error(msgFromBody || response.statusText);
            error.body = body;
            error.response = response;
            return error;
        });
    }
    /**
     * Loads a content from the content repository. If used with a fully qualified content path,
     * it will be transformed to an item path.
     * @param options Options for the Load request
     */
    load(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentPath = client_utils_1.PathHelper.getContentUrl(options.idOrPath);
            const params = ODataUrlBuilder_1.ODataUrlBuilder.buildUrlParamString(this.configuration, options.oDataOptions);
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, contentPath);
            const response = yield this.fetch(`${path}?${params}`, {
                credentials: "include",
                method: "GET",
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    /**
     * Loads a content collection from the repository
     * @param options Options for the Load request
     */
    loadCollection(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = ODataUrlBuilder_1.ODataUrlBuilder.buildUrlParamString(this.configuration, options.oDataOptions);
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, options.path);
            const response = yield this.fetch(`${path}?${params}`, {
                credentials: "include",
                method: "GET",
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    /**
     * Posts a new content to the content repository
     * @param options Post request Options
     */
    post(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, options.parentPath);
            const params = ODataUrlBuilder_1.ODataUrlBuilder.buildUrlParamString(this.configuration, options.oDataOptions);
            const postBody = Object.assign({}, options.content);
            postBody.__ContentType = options.contentType;
            postBody.__ContentTemplate = options.contentTemplate;
            const response = yield this.fetch(`${path}?${params}`, {
                credentials: "include",
                method: "POST",
                body: JSON.stringify(postBody),
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    /**
     * Updates an existing content in the repository using OData Patch
     * @param options Options for the Patch request
     */
    patch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentPath = client_utils_1.PathHelper.getContentUrl(options.idOrPath);
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, contentPath);
            const params = ODataUrlBuilder_1.ODataUrlBuilder.buildUrlParamString(this.configuration, options.oDataOptions);
            const response = yield this.fetch(`${path}?${params}`, {
                credentials: "include",
                method: "PATCH",
                body: JSON.stringify(options.content),
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    /**
     * Updates an existing content in the repository using OData Put
     * @param options Options for the Put request
     */
    put(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentPath = client_utils_1.PathHelper.getContentUrl(options.idOrPath);
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, contentPath);
            const params = ODataUrlBuilder_1.ODataUrlBuilder.buildUrlParamString(this.configuration, options.oDataOptions);
            const response = yield this.fetch(`${path}?${params}`, {
                credentials: "include",
                method: "PUT",
                body: JSON.stringify(options.content),
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    createArray(param) {
        if (!(param instanceof Array)) {
            return [param];
        }
        return param;
    }
    /**
     * Deletes a content or a content collection from the Repository
     * @param options Options for the Delete request
     */
    delete(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.executeAction({
                idOrPath: ConstantContent_1.ConstantContent.PORTAL_ROOT.Path,
                method: "POST",
                name: "DeleteBatch",
                body: {
                    paths: this.createArray(options.idOrPath),
                    permanent: options.permanent,
                },
            });
        });
    }
    /**
     * Moves a content or content collection to a specified location
     * @param options Options for the Move request
     */
    move(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.executeAction({
                idOrPath: ConstantContent_1.ConstantContent.PORTAL_ROOT.Path,
                method: "POST",
                name: "MoveBatch",
                body: {
                    paths: this.createArray(options.idOrPath),
                    targetPath: options.targetPath,
                },
            });
        });
    }
    /**
     * Copies a content or content collection to a specified location
     * @param options Options for the Copy request
     */
    copy(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.executeAction({
                idOrPath: ConstantContent_1.ConstantContent.PORTAL_ROOT.Path,
                method: "POST",
                name: "CopyBatch",
                body: {
                    paths: this.createArray(options.idOrPath),
                    targetPath: options.targetPath,
                },
            });
        });
    }
    /**
     * Retrieves a list of content actions for a specified content
     * @param options Options for fetching the Custom Actions
     */
    getActions(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextPath = client_utils_1.PathHelper.getContentUrl(options.idOrPath);
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, contextPath, "Actions");
            const response = yield this.fetch(`${path}${options.scenario ? `?scenario=${options.scenario}` : ""}`, {
                credentials: "include",
                method: "GET",
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    /**
     * Executes a specified custom OData action
     * @param options Options for the Custom Action
     */
    executeAction(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextPath = client_utils_1.PathHelper.getContentUrl(options.idOrPath);
            const params = ODataUrlBuilder_1.ODataUrlBuilder.buildUrlParamString(this.configuration, options.oDataOptions);
            const path = client_utils_1.PathHelper.joinPaths(this.configuration.repositoryUrl, this.configuration.oDataToken, contextPath, options.name);
            const response = yield this.fetch(`${path}?${params}`, {
                credentials: "include",
                method: options.method,
                body: JSON.stringify(options.body),
            });
            if (!response.ok) {
                throw (yield this.getErrorFromResponse(response));
            }
            return yield response.json();
        });
    }
    /**
     * Reloads the content schemas from the sensenet backend
     * @returns {Promise<void>} A promise that will be resolved / rejected based on the action success
     */
    reloadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            const schemas = yield this.executeAction({
                idOrPath: "Root",
                name: "GetSchema",
                method: "GET",
                body: undefined,
            });
            this.schemas.setSchemas(schemas);
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map