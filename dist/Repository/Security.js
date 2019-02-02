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
/**
 * Class that contains shortcuts for security-related custom content actions
 */
class Security {
    constructor(repository) {
        this.repository = repository;
        /**
         * Sets permission inheritance on the requested content.
         * @param {string | number} idOrPath A content id or path
         * @param {Inheritance} inheritance inheritance: break or unbreak
         * @returns {Promise<IPermissionResponseModel>} A promise with a response model
         */
        this.setPermissionInheritance = (idOrPath, inheritance) => this.repository.executeAction({
            name: "SetPermissions",
            idOrPath,
            method: "POST",
            body: {
                r: inheritance,
            },
        });
        /**
         * Sets permissions on the requested content.
         * You can add or remove permissions for one ore more users or groups using this action.
         * @param {string | number} idOrPath A content id or path
         * @param {PermissionRequestBody} permissionRequestBody inheritance: break or unbreak
         * @returns {Promise<IPermissionResponseModel>} A promise with a response model
         */
        this.setPermissions = (idOrPath, permissionRequestBody) => this.repository.executeAction({
            name: "SetPermissions",
            idOrPath,
            method: "POST",
            body: {
                r: permissionRequestBody,
            },
        });
        /**
         * Gets all permissions for the requested content.
         * Required permissions to call this action: See permissions.
         * @param {string | number} contentIdOrPath The path or id for the content
         * @returns {Promise<IPermissionResponseModel>} A promise with the permission response
         */
        this.getAllPermissions = (contentIdOrPath) => this.repository.executeAction({
            idOrPath: contentIdOrPath,
            name: "GetPermissions",
            method: "GET",
            body: undefined,
        });
        /**
         * Gets all permissions for the requested content.
         * Required permissions to call this action: See permissions.
         * @param {string | number} contentIdOrPath The path or id for the content
         * @returns {Promise<IPermissionResponseModel>} A promise with the permission response
         */
        this.getPermissionsForIdentity = (contentIdOrPath, identityPath) => this.repository.executeAction({
            idOrPath: contentIdOrPath,
            name: "GetPermissions",
            method: "GET",
            body: {
                identity: identityPath,
            },
        });
        /**
         * Identity list that contains every users/groups/organizational units
         * that have any permission setting (according to permission level)
         * in the subtree of the context content.
         * @param {IGetRelatedIdentities<TIdentityType>} options Options object for the method call
         * @returns {Promise<IODataCollectionResponse<TIdentityType>>} A promise that will be resolved with a collection of related identities
         */
        this.getRelatedIdentities = (options) => this.repository.executeAction({
            name: "GetRelatedIdentities",
            idOrPath: options.contentIdOrPath,
            method: "POST",
            body: {
                level: options.level,
                kind: options.kind,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * Permission list of the selected identity with the count of related content. 0 indicates that this permission has no related content so the GUI does not have to display it as a tree node
         * @param {IGetRelatedPermissionsOptions<TMemberType>} options options for the method call
         * @returns {Promise<IODataCollectionResponse<TMemberType>>} A promise with the related users / groups
         */
        this.getRelatedPermissions = (options) => this.repository.executeAction({
            name: "GetRelatedPermissions",
            idOrPath: options.contentIdOrPath,
            method: "POST",
            body: {
                level: options.level,
                explicitOnly: options.explicitOnly,
                member: options.memberPath,
                includedTypes: options.includedTypes,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * Content list that have explicite/effective permission setting for the selected user in the current subtree.
         * @param {IGetRelatedItemsOptions<TItem>} options Options for the method call
         * @returns {Promise<>} A promise with the content list
         */
        this.getRelatedItems = (options) => this.repository.executeAction({
            name: "GetRelatedItems",
            idOrPath: options.contentIdOrPath,
            method: "POST",
            body: {
                level: options.level,
                explicitOnly: options.explicitOnly,
                member: options.member,
                permissions: options.permissions,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * This structure is designed for getting tree of content that are permitted or denied for groups/organizational units
         * in the selected subtree. The result content are not in a paged list: they are organized in a tree.
         * @param {IGetRelatedItentitiesByPermission} options Options for the method call.
         * @returns {Promise} Returns an RxJS observable that you can subscribe of in your code.
         */
        this.getRelatedIdentitiesByPermissions = (options) => this.repository.executeAction({
            name: "GetRelatedIdentitiesByPermissions",
            idOrPath: options.contentIdOrPath,
            method: "POST",
            body: {
                level: options.level,
                kind: options.kind,
                permissions: options.permissions,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * This structure is designed for getting tree of content that are permitted or denied for groups/organizational units
         * in the selected subtree. The result content are not in a paged list: they are organized in a tree.
         * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
         */
        this.getRelatedItemsOneLevel = (options) => this.repository.executeAction({
            name: "GetRelatedItemsOneLevel",
            idOrPath: options.contentIdOrPath,
            method: "POST",
            body: {
                level: options.level,
                member: options.member,
                permissions: options.permissions,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * Returns a content collection that represents users who have enough permissions to a requested resource.
         * The permissions effect on the user and through direct or indirect group membership
         * too. The function parameter is a permission name list that must contain at least one item.
         * @param {IGetAllowedUsersOptions} options An options object for the method call
         * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
         */
        this.getAllowedUsers = (options) => this.repository.executeAction({
            idOrPath: options.contentIdOrPath,
            name: "GetAllowedUsers",
            method: "POST",
            body: {
                permissions: options.permissions,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * Returns a content collection that represents groups where the given user or group is member directly or indirectly.
         * This function can be used only on a resource content that is
         * Group or User or any inherited type. If the value of the "directOnly" parameter is false, all indirect members are listed.
         * @param {IGetParentGroupsOptions} options Options for the Method call
         * @returns {Promise} A promise with the response
         */
        this.getParentGroups = (options) => this.repository.executeAction({
            name: "GetParentGroups",
            idOrPath: options.contentIdOrPath,
            method: "POST",
            body: {
                directOnly: options.directOnly,
            },
            oDataOptions: options.oDataOptions,
        });
        /**
         * Administrators can add new members to a group using this action.
         * The list of new members can be provided using the 'contentIds' parameter (list of user or group ids).
         * @param {string | number} contentIdOrPath A Path or Id to the content to check
         * @param  {number[]} contentIds List of the member ids.
         * @returns {Promise} A Promise with the response object
         */
        this.addMembers = (contentIdOrPath, contentIds) => this.repository.executeAction({
            name: "AddMembers",
            idOrPath: contentIdOrPath,
            method: "POST",
            body: {
                contentIds,
            },
        });
        /**
         * Administrators can remove members from a group using this action.
         * The list of removable members can be provided using the 'contentIds' parameter (list of user or group ids).
         * @param {string | number} contentIdOrPath A Path or Id to the content to check
         * @param {number[]}  contentIds List of the member ids.
         * @returns {Promise} Returns an RxJS observable that you can subscribe of in your code.
         */
        this.removeMembers = (contentIdOrPath, contentIds) => this.repository.executeAction({
            name: "RemoveMembers",
            idOrPath: contentIdOrPath,
            method: "POST",
            body: {
                contentIds,
            },
        });
    }
    /**
     * Gets if the given user has the specified permissions for the requested content.
     *
     * Required permissions to call this action: See permissions.
     * @param {string[]} permissions list of permission names (e.g. Open, Save)
     * @param {string} user path of the user (or the current user, if not provided)
     * @returns {Promise<boolean>} A promise with the response value
     */
    hasPermission(contentIdOrPath, permissions, identityPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = `permissions=${permissions.join(",")}`;
            if (identityPath) {
                params += `&identity=${identityPath}`;
            }
            const path = client_utils_1.PathHelper.joinPaths(this.repository.configuration.repositoryUrl, this.repository.configuration.oDataToken, client_utils_1.PathHelper.getContentUrl(contentIdOrPath));
            const response = yield this.repository.fetch(`${path}/HasPermission?${params}`);
            if (response.ok) {
                return (yield response.text()) === "true" || false;
            }
            else {
                throw (yield this.repository.getErrorFromResponse(response));
            }
        });
    }
}
exports.Security = Security;
//# sourceMappingURL=Security.js.map