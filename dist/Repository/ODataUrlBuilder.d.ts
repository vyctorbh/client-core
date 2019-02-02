import { IODataParams } from "../Models/IODataParams";
import { RepositoryConfiguration } from "./RepositoryConfiguration";
/**
 * Helper class to build OData Urls
 */
export declare class ODataUrlBuilder {
    /**
     * List of a valid OData parameters
     */
    static readonly ODATA_PARAMS: string[];
    private static combineODataFieldParameters;
    /**
     * Method to build proper parameter string to OData requests based on the given repository configuration and option Object.
     *
     * Checks whether a given parameter is standard OData param or not and based on this information this params get the '$' sign.
     * @param {RepositoryConfiguration} config Represents the current Repository configuration for default select, expand, etc... options
     * @param {IODataOptions} options Represents an ODataOptions obejct based through the IODataOptions interface. Holds the possible url parameters as properties.
     * @returns {string} String with the url params in the correct format e.g. '$select=DisplayName,Index'&$top=2&metadata=no'.
     */
    static buildUrlParamString<T>(config: RepositoryConfiguration, options?: IODataParams<T>): string;
}
