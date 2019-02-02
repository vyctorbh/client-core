"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_utils_1 = require("@sensenet/client-utils");
const ConstantContent_1 = require("../Repository/ConstantContent");
const LoginState_1 = require("./LoginState");
/**
 * Default authentication service that bypasses the authentication process
 */
class BypassAuthentication {
    constructor() {
        /**
         * The current state of the authentication
         */
        this.state = new client_utils_1.ObservableValue(LoginState_1.LoginState.Unknown);
        /**
         * Current user observable property - Will publish the Visitor user for BypassAuthentication
         */
        this.currentUser = new client_utils_1.ObservableValue(ConstantContent_1.ConstantContent.VISITOR_USER);
    }
    /**
     * Checks for update if neccessary. For BypassAuthentication always resolves immedietly with false
     */
    checkForUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    /**
     * Login method - not available for BypassAuthentication
     * @param username
     * @param password
     */
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not allowed when authentication is bypassed.");
        });
    }
    /**
     * logout method - not available for BypassAuthentication
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not allowed when authentication is bypassed.");
        });
    }
    /**
     * Disposes the service
     */
    dispose() {
        /** */
    }
}
exports.BypassAuthentication = BypassAuthentication;
//# sourceMappingURL=BypassAuthentication.js.map