import { IMetadata } from "./IMetadata";
/**
 * Generic Class that represents a basic OData Response structure
 */
export interface IODataResponse<T> {
    d: T & {
        __metadata?: IMetadata;
    };
}
