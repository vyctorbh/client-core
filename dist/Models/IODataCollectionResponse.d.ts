/**
 * @module ODataApi
 */ /** */
/**
 * Generic Class that represents a basic OData Response structure
 */
export interface IODataCollectionResponse<T> {
    d: {
        results: T[];
        __count: number;
    };
}
