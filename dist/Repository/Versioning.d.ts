import { IContent } from "../index";
import { IODataCollectionResponse } from "../Models/IODataCollectionResponse";
import { IODataParams } from "../Models/IODataParams";
import { IODataResponse } from "../Models/IODataResponse";
import { Repository } from "./Repository";
/**
 * Class that contains shortcuts for versioning-related custom content actions
 */
export declare class Versioning {
    private readonly repository;
    /**
     * Returns a collection of content versions
     * @param {number | string} idOrPath The unique identifier or full path of the original content
     * @param {IODataParams<T> | undefined} oDataOptions optional OData options
     * @returns {Promise<IODataCollectionResponse<T>>} A promise that will be resolved with the versions
     */
    getVersions<T extends IContent = IContent>(idOrPath: number | string, oDataOptions?: IODataParams<T>): Promise<IODataCollectionResponse<T>>;
    /**
     * Checks out the content item to the current user
     * @param {number | string} idOrPath The unique identifier or full path of the content to check out
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the checked out version of the content item
     */
    checkOut<T extends IContent = IContent>(idOrPath: number | string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Checks in the content item
     * @param {number | string} idOrPath The unique identifier or full path of the content to check in
     * @param {string} checkInComments Optional comments for the check in operation
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the new checked in version of the content item
     */
    checkIn<T extends IContent = IContent>(idOrPath: number | string, checkInComments?: string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Performs an undo check out operation on a content item
     * @param {number | string} idOrPath The unique identifier or full path of the content
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the previous checked in version of the content item
     */
    undoCheckOut<T extends IContent = IContent>(idOrPath: number | string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Performs a force undo check out operation on a content item
     * @param {number | string} idOrPath The unique identifier or full path of the content
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the previous checked in version of the content item
     */
    forceUndoCheckOut<T extends IContent = IContent>(idOrPath: number | string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Performs an approve operation on a content
     * @param idOrPath The unique identifier or full path of the content to approve
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    approve<T extends IContent = IContent>(idOrPath: number | string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Performs a reject operation on a content
     * @param idOrPath The unique identifier or full path of the content
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    reject<T extends IContent = IContent>(idOrPath: number | string, rejectReason?: string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Performs a Publish operation on a content
     * @param idOrPath The unique identifier or full path of the content to publish
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    publish<T extends IContent = IContent>(idOrPath: number | string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Performs a reject operation on a content
     * @param idOrPath The unique identifier or full path of the content
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    restoreVersion<T extends IContent = IContent>(idOrPath: number | string, version?: string, oDataOptions?: IODataParams<T>): Promise<IODataResponse<T>>;
    /**
     * Lets administrators take over the lock of a checked out document from anotheruser.
     * A new locker user can be provided using the 'user' parameter (user path or id as string).
     * If left empty, the current user will take the lock.
     * @param {number | string} idOrPath The locked content's identifier or full path
     * @param {number | string | undefined} userIdOrPath Path or id of the new locker user. Will be the current user, if not provided
     * @returns {Promise<void>} A promise that will be resolved when the operation finished.
     */
    takeLockOver(idOrPath: number | string, userIdOrPath?: number | string): Promise<void>;
    constructor(repository: Repository);
}
