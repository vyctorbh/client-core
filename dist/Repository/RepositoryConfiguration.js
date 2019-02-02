"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_content_types_1 = require("@sensenet/default-content-types");
/**
 * Class that contains basic configuration for a sensenet Repository
 */
class RepositoryConfiguration {
    constructor(config) {
        /**
         * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
         */
        this.repositoryUrl = RepositoryConfiguration.DEFAULT_BASE_URL;
        /**
         * The service token for the OData Endpoint
         */
        this.oDataToken = RepositoryConfiguration.DEFAULT_SERVICE_TOKEN;
        /**
         * This string describes how long the user sessions should be persisted.
         */
        this.sessionLifetime = "session";
        /**
         * This parameter describes what fields should be included in the OData $select statements by default
         */
        this.defaultSelect = ["DisplayName", "Description", "Icon"];
        /**
         * This parameter describes what fields should always be included in the OData $select statements
         */
        this.requiredSelect = ["Id", "Path", "Name", "Type"];
        /**
         * This field sets the default OData $metadata value
         */
        this.defaultMetadata = "no";
        /**
         * This field sets the default OData inline count value
         */
        this.defaultInlineCount = "allpages";
        /**
         * This field describes what fields should be expanded on every OData request by default
         */
        this.defaultExpand = undefined;
        /**
         * This field sets up a default OData $top parameter
         */
        this.defaultTop = 10000;
        /**
         * Chunk size for chunked uploads, must be equal to BinaryChunkSize setting at the backend
         */
        this.chunkSize = 10485760; // 10 mb
        /**
         * An array of schemas
         */
        this.schemas = default_content_types_1.SchemaStore.map((s) => s);
        config && Object.assign(this, config);
    }
    /**
     * The default base URL, returns window.location if available
     */
    static get DEFAULT_BASE_URL() {
        if (typeof window !== "undefined") {
            return (window && window.location && window.location.origin) || "";
        }
        return "";
    }
}
/**
 * The default Sense/Net OData Service token (odata.svc)
 */
RepositoryConfiguration.DEFAULT_SERVICE_TOKEN = "odata.svc";
exports.RepositoryConfiguration = RepositoryConfiguration;
//# sourceMappingURL=RepositoryConfiguration.js.map