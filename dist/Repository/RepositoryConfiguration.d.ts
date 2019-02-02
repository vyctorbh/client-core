import { GenericContent, Schema } from "@sensenet/default-content-types";
import { ODataFieldParameter, ODataMetadataType } from "../Models/IODataParams";
/**
 * Class that contains basic configuration for a sensenet Repository
 */
export declare class RepositoryConfiguration {
    /**
     * The default base URL, returns window.location if available
     */
    static readonly DEFAULT_BASE_URL: string;
    /**
     * The default Sense/Net OData Service token (odata.svc)
     */
    static readonly DEFAULT_SERVICE_TOKEN: string;
    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    repositoryUrl: string;
    /**
     * The service token for the OData Endpoint
     */
    oDataToken: string;
    /**
     * This string describes how long the user sessions should be persisted.
     */
    sessionLifetime: "session" | "expiration";
    /**
     * This parameter describes what fields should be included in the OData $select statements by default
     */
    defaultSelect: ODataFieldParameter<GenericContent> | "all";
    /**
     * This parameter describes what fields should always be included in the OData $select statements
     */
    requiredSelect: ODataFieldParameter<GenericContent>;
    /**
     * This field sets the default OData $metadata value
     */
    defaultMetadata: ODataMetadataType;
    /**
     * This field sets the default OData inline count value
     */
    defaultInlineCount: "allpages" | "none";
    /**
     * This field describes what fields should be expanded on every OData request by default
     */
    defaultExpand: ODataFieldParameter<GenericContent> | undefined;
    /**
     * This field sets up a default OData $top parameter
     */
    defaultTop: number;
    /**
     * Chunk size for chunked uploads, must be equal to BinaryChunkSize setting at the backend
     */
    chunkSize: number;
    /**
     * An array of schemas
     */
    schemas: Schema[];
    constructor(config?: Partial<RepositoryConfiguration>);
}
