import { Group, IdentityKind, Inheritance, PermissionLevel, PermissionRequestBody, User } from "@sensenet/default-content-types";
import { IContent, IPermissionEntry } from "../index";
import { IODataCollectionResponse } from "../Models/IODataCollectionResponse";
import { IODataParams } from "../Models/IODataParams";
import { IPermissionResponseModel } from "../Models/ISecurityModels";
import { Repository } from "./Repository";
/**
 * Options for getRelatedIdentities() call
 */
export interface IGetRelatedIdentities<TIdentityType> {
    /**
     * The id or path for the content to check
     */
    contentIdOrPath: (string | number);
    /**
     * The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     */
    level: PermissionLevel;
    /**
     * The value can be: All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits
     */
    kind: IdentityKind;
    /**
     * Additional OData options
     */
    oDataOptions?: IODataParams<TIdentityType>;
}
/**
 * Options for getRelatedPermissions() call
 */
export interface IGetRelatedPermissionsOptions<TMemberType> {
    /**
     * @param {string | number} contentIdOrPath The Id or Path to the Content to check
     * @param {string[]} includedTypes
     */
    contentIdOrPath: string | number;
    /**
     * The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     */
    level: PermissionLevel;
    /**
     * value "true" is required because "false" is not implemented yet.
     */
    explicitOnly: boolean;
    /**
     * Fully qualified path of the selected identity (e.g. /Root/IMS/BuiltIn/Portal/Visitor).
     */
    memberPath: string;
    /**
     * An item can increment the counters if its type or any ancestor type is found in the 'includedTypes'.
     * Null means filtering off. If the array is empty, there is no element that increases the counters.
     * This filter can reduce the execution speed dramatically so do not use if it is possible.
     */
    includedTypes?: string[];
    /**
     * Optional OData parameters
     */
    oDataOptions?: IODataParams<TMemberType>;
}
/**
 * Options for getRelatedItems() method call
 */
export interface IGetRelatedItemsOptions<TItem> {
    /**
     * Id or path for the content
     */
    contentIdOrPath: string | number;
    /**
     * The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     */
    level: PermissionLevel;
    /**
     * The value "true" is required because "false" is not implemented yet.
     */
    explicitOnly: boolean;
    /**
     * Fully qualified path of the selected identity (e.g. /Root/IMS/BuiltIn/Portal/Visitor).
     */
    member: string;
    /**
     * Related permission list. Item names are case sensitive.
     * In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     */
    permissions: string[];
    /**
     * Optional OData options
     */
    oDataOptions?: IODataParams<TItem>;
}
/**
 * Options for the getRelatedIdentitiesByPermissions() method call
 */
export interface IGetRelatedIdentitiesByPermissions<TIdentity> {
    /**
     * Id or path for the content
     */
    contentIdOrPath: number | string;
    /**
     * The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     */
    level: PermissionLevel;
    /**
     * The value can be: All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits
     */
    kind: IdentityKind;
    /**
     * related permission list. Item names are case sensitive. In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission type name (e.g. ["Open","Save","Custom02"]).
     */
    permissions: string[];
    /**
     * Optional OData Request options
     */
    oDataOptions?: IODataParams<TIdentity>;
}
/**
 * Options for IGetRelatedItemsOneLevel() method call
 */
export interface IGetRelatedItemsOneLevel<TItem> {
    /**
     * Full path or Id for the content
     */
    contentIdOrPath: number | string;
    /**
     * The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     */
    level: PermissionLevel;
    /**
     * Fully qualified path of the selected identity (e.g. /Root/IMS/BuiltIn/Portal/Visitor).
     */
    member: string;
    /**
     * related permission list. Item names are case sensitive.
     * In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     */
    permissions: string[];
    /**
     * Optional OData request options
     */
    oDataOptions?: IODataParams<TItem>;
}
/**
 * Options for getAllowedUsers() method call
 */
export interface IGetAllowedUsersOptions<TUser> {
    /**
     * contentIdOrPath The id or path to the content to check
     */
    contentIdOrPath: number | string;
    /**
     * Related permission list. Item names are case sensitive.
     * In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     */
    permissions: string[];
    /**
     * Optional OData parameters
     */
    oDataOptions?: IODataParams<TUser>;
}
/**
 * Parameter options for the getParentGroups() permission query
 */
export interface IGetParentGroupsOptions<T> {
    /**
     * contentIdOrPath The path or id of the content to check
     */
    contentIdOrPath: number | string;
    /**
     * directOnly If the value of the "directOnly" parameter is false, all indirect members are listed.
     */
    directOnly: boolean;
    /**
     * Optional OData options
     */
    oDataOptions?: IODataParams<T>;
}
/**
 * Class that contains shortcuts for security-related custom content actions
 */
export declare class Security {
    private readonly repository;
    constructor(repository: Repository);
    /**
     * Sets permission inheritance on the requested content.
     * @param {string | number} idOrPath A content id or path
     * @param {Inheritance} inheritance inheritance: break or unbreak
     * @returns {Promise<IPermissionResponseModel>} A promise with a response model
     */
    setPermissionInheritance: (idOrPath: string | number, inheritance: Inheritance) => Promise<void>;
    /**
     * Sets permissions on the requested content.
     * You can add or remove permissions for one ore more users or groups using this action.
     * @param {string | number} idOrPath A content id or path
     * @param {PermissionRequestBody} permissionRequestBody inheritance: break or unbreak
     * @returns {Promise<IPermissionResponseModel>} A promise with a response model
     */
    setPermissions: (idOrPath: string | number, permissionRequestBody: PermissionRequestBody) => Promise<void>;
    /**
     * Gets all permissions for the requested content.
     * Required permissions to call this action: See permissions.
     * @param {string | number} contentIdOrPath The path or id for the content
     * @returns {Promise<IPermissionResponseModel>} A promise with the permission response
     */
    getAllPermissions: (contentIdOrPath: string | number) => Promise<IPermissionResponseModel>;
    /**
     * Gets all permissions for the requested content.
     * Required permissions to call this action: See permissions.
     * @param {string | number} contentIdOrPath The path or id for the content
     * @returns {Promise<IPermissionResponseModel>} A promise with the permission response
     */
    getPermissionsForIdentity: (contentIdOrPath: string | number, identityPath: string) => Promise<IPermissionEntry>;
    /**
     * Gets if the given user has the specified permissions for the requested content.
     *
     * Required permissions to call this action: See permissions.
     * @param {string[]} permissions list of permission names (e.g. Open, Save)
     * @param {string} user path of the user (or the current user, if not provided)
     * @returns {Promise<boolean>} A promise with the response value
     */
    hasPermission(contentIdOrPath: string | number, permissions: Array<"See" | "Preview" | "PreviewWithoutWatermark" | "PreviewWithoutRedaction" | "Open" | "OpenMinor" | "Save" | "Publish" | "ForceCheckin" | "AddNew" | "Approve" | "Delete" | "RecallOldVersion" | "DeleteOldVersion" | "SeePermissions" | "SetPermissions" | "RunApplication" | "ManageListsAndWorkspaces" | "TakeOwnership" | "Custom01" | "Custom02" | "Custom03" | "Custom04" | "Custom05" | "Custom06" | "Custom07" | "Custom08" | "Custom09" | "Custom10" | "Custom11" | "Custom12" | "Custom13" | "Custom14" | "Custom15" | "Custom16" | "Custom17" | "Custom18" | "Custom19" | "Custom20" | "Custom21" | "Custom22" | "Custom23" | "Custom24" | "Custom25" | "Custom26" | "Custom27" | "Custom28" | "Custom29" | "Custom30" | "Custom31" | "Custom32">, identityPath?: string): Promise<boolean>;
    /**
     * Identity list that contains every users/groups/organizational units
     * that have any permission setting (according to permission level)
     * in the subtree of the context content.
     * @param {IGetRelatedIdentities<TIdentityType>} options Options object for the method call
     * @returns {Promise<IODataCollectionResponse<TIdentityType>>} A promise that will be resolved with a collection of related identities
     */
    getRelatedIdentities: <TIdentityType extends User | Group = User | Group>(options: IGetRelatedIdentities<TIdentityType>) => Promise<IODataCollectionResponse<TIdentityType>>;
    /**
     * Permission list of the selected identity with the count of related content. 0 indicates that this permission has no related content so the GUI does not have to display it as a tree node
     * @param {IGetRelatedPermissionsOptions<TMemberType>} options options for the method call
     * @returns {Promise<IODataCollectionResponse<TMemberType>>} A promise with the related users / groups
     */
    getRelatedPermissions: <TMemberType extends User | Group = User | Group>(options: IGetRelatedPermissionsOptions<TMemberType>) => Promise<IODataCollectionResponse<TMemberType>>;
    /**
     * Content list that have explicite/effective permission setting for the selected user in the current subtree.
     * @param {IGetRelatedItemsOptions<TItem>} options Options for the method call
     * @returns {Promise<>} A promise with the content list
     */
    getRelatedItems: <TItem extends IContent = IContent>(options: IGetRelatedItemsOptions<TItem>) => Promise<IODataCollectionResponse<TItem>>;
    /**
     * This structure is designed for getting tree of content that are permitted or denied for groups/organizational units
     * in the selected subtree. The result content are not in a paged list: they are organized in a tree.
     * @param {IGetRelatedItentitiesByPermission} options Options for the method call.
     * @returns {Promise} Returns an RxJS observable that you can subscribe of in your code.
     */
    getRelatedIdentitiesByPermissions: <TIdentity extends User | Group = User | Group>(options: IGetRelatedIdentitiesByPermissions<TIdentity>) => Promise<IODataCollectionResponse<TIdentity>>;
    /**
     * This structure is designed for getting tree of content that are permitted or denied for groups/organizational units
     * in the selected subtree. The result content are not in a paged list: they are organized in a tree.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     */
    getRelatedItemsOneLevel: <TItem extends IContent = IContent>(options: IGetRelatedItemsOneLevel<TItem>) => Promise<IODataCollectionResponse<TItem>>;
    /**
     * Returns a content collection that represents users who have enough permissions to a requested resource.
     * The permissions effect on the user and through direct or indirect group membership
     * too. The function parameter is a permission name list that must contain at least one item.
     * @param {IGetAllowedUsersOptions} options An options object for the method call
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     */
    getAllowedUsers: <TUser extends User = User>(options: IGetAllowedUsersOptions<TUser>) => Promise<IODataCollectionResponse<TUser>>;
    /**
     * Returns a content collection that represents groups where the given user or group is member directly or indirectly.
     * This function can be used only on a resource content that is
     * Group or User or any inherited type. If the value of the "directOnly" parameter is false, all indirect members are listed.
     * @param {IGetParentGroupsOptions} options Options for the Method call
     * @returns {Promise} A promise with the response
     */
    getParentGroups: <TGroup extends Group = Group>(options: IGetParentGroupsOptions<TGroup>) => Promise<IODataCollectionResponse<TGroup>>;
    /**
     * Administrators can add new members to a group using this action.
     * The list of new members can be provided using the 'contentIds' parameter (list of user or group ids).
     * @param {string | number} contentIdOrPath A Path or Id to the content to check
     * @param  {number[]} contentIds List of the member ids.
     * @returns {Promise} A Promise with the response object
     */
    addMembers: (contentIdOrPath: string | number, contentIds: number[]) => Promise<void>;
    /**
     * Administrators can remove members from a group using this action.
     * The list of removable members can be provided using the 'contentIds' parameter (list of user or group ids).
     * @param {string | number} contentIdOrPath A Path or Id to the content to check
     * @param {number[]}  contentIds List of the member ids.
     * @returns {Promise} Returns an RxJS observable that you can subscribe of in your code.
     */
    removeMembers: (contentIdOrPath: string | number, contentIds: number[]) => Promise<void>;
}
