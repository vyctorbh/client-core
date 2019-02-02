import { ObservableValue } from "@sensenet/client-utils";
import { User } from "@sensenet/default-content-types";
import { IAuthenticationService } from "./IAuthenticationService";
import { LoginState } from "./LoginState";
/**
 * Default authentication service that bypasses the authentication process
 */
export declare class BypassAuthentication implements IAuthenticationService {
    /**
     * The current state of the authentication
     */
    state: ObservableValue<LoginState>;
    /**
     * Checks for update if neccessary. For BypassAuthentication always resolves immedietly with false
     */
    checkForUpdate(): Promise<boolean>;
    /**
     * Login method - not available for BypassAuthentication
     * @param username
     * @param password
     */
    login(username: string, password: string): Promise<boolean>;
    /**
     * logout method - not available for BypassAuthentication
     */
    logout(): Promise<boolean>;
    /**
     * Current user observable property - Will publish the Visitor user for BypassAuthentication
     */
    currentUser: ObservableValue<User>;
    /**
     * Disposes the service
     */
    dispose(): void;
}
