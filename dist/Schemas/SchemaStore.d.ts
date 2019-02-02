import { Schema } from "@sensenet/default-content-types";
/**
 * Class that stores schema information
 */
export declare class SchemaStore {
    private schemas;
    private byNameSchemaCache;
    /**
     * Updates the schema information in the store and inv
     */
    setSchemas(newSchemas: Schema[]): void;
    /**
     * Returns the Content Type Schema for the provided Content Type;
     * @param type {string} The name of the Content Type;
     * @returns {Schemas.Schema}
     * ```ts
     * var genericContentSchema = SenseNet.Content.getSchema(Content);
     * ```
     */
    getSchema<TType>(currentType: {
        new (...args: any[]): TType;
    }): Schema;
    private mergeFieldSettings;
    /**
     * Returns the Content Type Schema for the provided content type name
     * @param {string} contentTypeName The name of the content type
     */
    getSchemaByName(contentTypeName: string): Schema;
}
