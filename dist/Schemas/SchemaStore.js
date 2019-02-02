"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_content_types_1 = require("@sensenet/default-content-types");
/**
 * Class that stores schema information
 */
class SchemaStore {
    constructor() {
        this.schemas = [];
        this.byNameSchemaCache = new Map();
    }
    /**
     * Updates the schema information in the store and inv
     */
    setSchemas(newSchemas) {
        this.schemas = newSchemas;
        this.byNameSchemaCache = new Map();
    }
    /**
     * Returns the Content Type Schema for the provided Content Type;
     * @param type {string} The name of the Content Type;
     * @returns {Schemas.Schema}
     * ```ts
     * var genericContentSchema = SenseNet.Content.getSchema(Content);
     * ```
     */
    getSchema(currentType) {
        return this.getSchemaByName(currentType.name);
    }
    mergeFieldSettings(currentFieldSettings, parentFieldSettings) {
        const currentFieldSettingsMap = new Map();
        currentFieldSettings.forEach((s) => currentFieldSettingsMap.set(s.Name, s));
        const parentFieldSettingsMap = new Map();
        parentFieldSettings.forEach((s) => parentFieldSettingsMap.set(s.Name, s));
        const keys = new Set([...currentFieldSettingsMap.keys(), ...parentFieldSettingsMap.keys()]);
        return Array.from(keys).map((key) => {
            return Object.assign({}, parentFieldSettingsMap.get(key), currentFieldSettingsMap.get(key));
        });
    }
    /**
     * Returns the Content Type Schema for the provided content type name
     * @param {string} contentTypeName The name of the content type
     */
    getSchemaByName(contentTypeName) {
        if (this.byNameSchemaCache.has(contentTypeName)) {
            return Object.assign({}, this.byNameSchemaCache.get(contentTypeName));
        }
        let schema = this.schemas.find((s) => s.ContentTypeName === contentTypeName);
        if (!schema) {
            return this.getSchema(default_content_types_1.GenericContent);
        }
        schema = Object.assign({}, schema);
        const parentSchema = schema.ParentTypeName && this.getSchemaByName(schema.ParentTypeName);
        if (parentSchema) {
            schema.FieldSettings = this.mergeFieldSettings(schema.FieldSettings, parentSchema.FieldSettings);
        }
        this.byNameSchemaCache.set(contentTypeName, schema);
        return Object.assign({}, schema);
    }
}
exports.SchemaStore = SchemaStore;
//# sourceMappingURL=SchemaStore.js.map