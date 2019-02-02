import { IDisposable } from "@sensenet/client-utils";
import { IActionModel } from "@sensenet/default-content-types";
import { IAuthenticationService } from "../Authentication/IAuthenticationService";
import { IContent } from "../Models/IContent";
import { IODataBatchResponse } from "../Models/IODataBatchResponse";
import { IODataCollectionResponse } from "../Models/IODataCollectionResponse";
import { IODataResponse } from "../Models/IODataResponse";
import { IActionOptions, ICopyOptions, IDeleteOptions, IGetActionOptions, ILoadCollectionOptions, ILoadOptions, IMoveOptions, IPatchOptions, IPostOptions, IPutOptions } from "../Models/IRequestOptions";
import { SchemaStore } from "../Schemas/SchemaStore";
import { RepositoryConfiguration } from "./RepositoryConfiguration";
import { Security } from "./Security";
import { Versioning } from "./Versioning";
/**
 * Defines an extended error message instance that contains an original error instance, a response and a parsed JSON body from the response
 */
export declare type ExtendedError = Error & {
    body: any;
    response: Response;
};
/**
 * Type guard to check if an error is extended with a response and a parsed body
 * @param e The error to check
 */
export declare const isExtendedError: (e: Error) => e is ExtendedError;
/**
 * Class that can be used as a main entry point to manipulate a sensenet content repository
 */
export declare class Repository implements IDisposable {
    private fetchMethod;
    schemas: SchemaStore;
    /**
     * Disposes the Repository object
     */
    dispose(): void;
    /**
     * Authentication service associated with the repository object
     */
    authentication: IAuthenticationService;
    /**
     * The configuration for the Repository object
     */
    readonly configuration: RepositoryConfiguration;
    /**
     * Async method that will be resolved when the Repository is ready to make HTTP calls
     */
    awaitReadyState(): Promise<void>;
    /**
     * Wrapper for a native window.fetch method. The repository's readyState will be awaited and credentials will be included by default
     * @param {RequestInfo} input The RequestInfo object
     * @param {RequestInit} init Optional init parameters
     */
    fetch(info: RequestInfo, init?: RequestInit, awaitReadyState?: boolean): Promise<Response>;
    /**
     * Gets a more meaningful error object from a specific response
     * @param response The Response object to extract the message
     */
    getErrorFromResponse(response: Response): Promise<Error & {
        body: any;
        response: Response;
    }>;
    /**
     * Loads a content from the content repository. If used with a fully qualified content path,
     * it will be transformed to an item path.
     * @param options Options for the Load request
     */
    load<TContentType extends IContent>(options: ILoadOptions<TContentType>): Promise<IODataResponse<TContentType>>;
    /**
     * Loads a content collection from the repository
     * @param options Options for the Load request
     */
    loadCollection<TContentType extends IContent>(options: ILoadCollectionOptions<TContentType>): Promise<IODataCollectionResponse<TContentType>>;
    /**
     * Posts a new content to the content repository
     * @param options Post request Options
     */
    post<TContentType extends IContent>(options: IPostOptions<TContentType>): Promise<IODataResponse<TContentType>>;
    /**
     * Updates an existing content in the repository using OData Patch
     * @param options Options for the Patch request
     */
    patch<TContentType extends IContent>(options: IPatchOptions<TContentType>): Promise<IODataResponse<TContentType>>;
    /**
     * Updates an existing content in the repository using OData Put
     * @param options Options for the Put request
     */
    put<TContentType extends IContent>(options: IPutOptions<TContentType>): Promise<IODataResponse<TContentType>>;
    private createArray;
    /**
     * Deletes a content or a content collection from the Repository
     * @param options Options for the Delete request
     */
    delete(options: IDeleteOptions): Promise<IODataBatchResponse<IContent>>;
    /**
     * Moves a content or content collection to a specified location
     * @param options Options for the Move request
     */
    move(options: IMoveOptions): Promise<IODataBatchResponse<IContent>>;
    /**
     * Copies a content or content collection to a specified location
     * @param options Options for the Copy request
     */
    copy(options: ICopyOptions): Promise<IODataBatchResponse<IContent>>;
    /**
     * Retrieves a list of content actions for a specified content
     * @param options Options for fetching the Custom Actions
     */
    getActions(options: IGetActionOptions): Promise<{
        d: {
            Actions: IActionModel[];
        };
    }>;
    /**
     * Executes a specified custom OData action
     * @param options Options for the Custom Action
     */
    executeAction<TBodyType, TReturns>(options: IActionOptions<TBodyType, any>): Promise<TReturns>;
    /**
     * Shortcut for security- and permission-related custom actions
     */
    security: Security;
    /**
     * Shortcut for versioning related custom actions
     */
    versioning: Versioning;
    /**
     * Reloads the content schemas from the sensenet backend
     * @returns {Promise<void>} A promise that will be resolved / rejected based on the action success
     */
    reloadSchema(): Promise<void>;
    constructor(config?: Partial<RepositoryConfiguration>, fetchMethod?: GlobalFetch["fetch"], schemas?: SchemaStore);
}
