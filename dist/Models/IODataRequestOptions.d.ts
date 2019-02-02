/**
 * @module ODataApi
 */ /** */
import { IODataParams } from "./IODataParams";
/**
 * Defines an options model for OData requests
 */
export interface IODataRequestOptions<T> {
    path: string;
    params?: IODataParams<T>;
    async?: boolean;
    type?: string;
    success?: () => void;
    error?: () => void;
    complete?: () => void;
}
