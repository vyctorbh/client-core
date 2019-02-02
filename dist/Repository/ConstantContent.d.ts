import { IContent } from "../Models/IContent";
/**
 * Constant content definitions for sensenet
 */
export declare class ConstantContent {
    /**
     * Defines a visitor user content
     */
    static VISITOR_USER: IContent & {
        DisplayName: any;
        Domain: any;
        LoginName: any;
    };
    /**
     * Defines a portal root content
     */
    static PORTAL_ROOT: IContent & {
        DisplayName: string;
    };
}
