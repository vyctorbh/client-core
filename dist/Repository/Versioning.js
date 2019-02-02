"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathHelper_1 = require("@sensenet/client-utils/dist/PathHelper");
/**
 * Class that contains shortcuts for versioning-related custom content actions
 */
class Versioning {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Returns a collection of content versions
     * @param {number | string} idOrPath The unique identifier or full path of the original content
     * @param {IODataParams<T> | undefined} oDataOptions optional OData options
     * @returns {Promise<IODataCollectionResponse<T>>} A promise that will be resolved with the versions
     */
    getVersions(idOrPath, oDataOptions) {
        return this.repository.loadCollection({
            path: PathHelper_1.PathHelper.joinPaths(PathHelper_1.PathHelper.getContentUrl(idOrPath), "Versions"),
            oDataOptions,
        });
    }
    /**
     * Checks out the content item to the current user
     * @param {number | string} idOrPath The unique identifier or full path of the content to check out
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the checked out version of the content item
     */
    checkOut(idOrPath, oDataOptions) {
        return this.repository.executeAction({
            name: "Checkout",
            idOrPath,
            method: "POST",
            body: undefined,
            oDataOptions,
        });
    }
    /**
     * Checks in the content item
     * @param {number | string} idOrPath The unique identifier or full path of the content to check in
     * @param {string} checkInComments Optional comments for the check in operation
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the new checked in version of the content item
     */
    checkIn(idOrPath, checkInComments = "", oDataOptions) {
        return this.repository.executeAction({
            name: "CheckIn",
            idOrPath,
            method: "POST",
            body: {
                checkInComments,
            },
            oDataOptions,
        });
    }
    /**
     * Performs an undo check out operation on a content item
     * @param {number | string} idOrPath The unique identifier or full path of the content
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the previous checked in version of the content item
     */
    undoCheckOut(idOrPath, oDataOptions) {
        return this.repository.executeAction({
            name: "UndoCheckOut",
            idOrPath,
            method: "POST",
            body: undefined,
            oDataOptions,
        });
    }
    /**
     * Performs a force undo check out operation on a content item
     * @param {number | string} idOrPath The unique identifier or full path of the content
     * @param {IODataParams<T>} oDataOptions Optional OData options
     * @returns {Promise<T>} A promise that will be resolved with the previous checked in version of the content item
     */
    forceUndoCheckOut(idOrPath, oDataOptions) {
        return this.repository.executeAction({
            name: "ForceUndoCheckout",
            idOrPath,
            method: "POST",
            body: undefined,
            oDataOptions,
        });
    }
    /**
     * Performs an approve operation on a content
     * @param idOrPath The unique identifier or full path of the content to approve
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    approve(idOrPath, oDataOptions) {
        return this.repository.executeAction({
            name: "Approve",
            idOrPath,
            method: "POST",
            body: undefined,
            oDataOptions,
        });
    }
    /**
     * Performs a reject operation on a content
     * @param idOrPath The unique identifier or full path of the content
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    reject(idOrPath, rejectReason = "", oDataOptions) {
        return this.repository.executeAction({
            name: "Reject",
            idOrPath,
            method: "POST",
            body: {
                rejectReason,
            },
            oDataOptions,
        });
    }
    /**
     * Performs a Publish operation on a content
     * @param idOrPath The unique identifier or full path of the content to publish
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    publish(idOrPath, oDataOptions) {
        return this.repository.executeAction({
            name: "Publish",
            idOrPath,
            method: "POST",
            body: undefined,
            oDataOptions,
        });
    }
    /**
     * Performs a reject operation on a content
     * @param idOrPath The unique identifier or full path of the content
     * @param oDataOptions Optional OData options
     * @returns {Promise<IODataResponse<T>>} A promise that will be resolved when the operation finished
     */
    restoreVersion(idOrPath, version = "", oDataOptions) {
        return this.repository.executeAction({
            name: "RestoreVersion",
            idOrPath,
            method: "POST",
            body: {
                version,
            },
            oDataOptions,
        });
    }
    /**
     * Lets administrators take over the lock of a checked out document from anotheruser.
     * A new locker user can be provided using the 'user' parameter (user path or id as string).
     * If left empty, the current user will take the lock.
     * @param {number | string} idOrPath The locked content's identifier or full path
     * @param {number | string | undefined} userIdOrPath Path or id of the new locker user. Will be the current user, if not provided
     * @returns {Promise<void>} A promise that will be resolved when the operation finished.
     */
    takeLockOver(idOrPath, userIdOrPath) {
        return this.repository.executeAction({
            name: "TakeLockOver",
            idOrPath,
            method: "POST",
            body: {
                user: userIdOrPath || null,
            },
        });
    }
}
exports.Versioning = Versioning;
//# sourceMappingURL=Versioning.js.map