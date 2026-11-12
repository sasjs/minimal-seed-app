(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SASjs"] = factory();
	else
		root["SASjs"] = factory();
})(globalThis, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5748
(module) {

// The browser build has no process object, and code in the bundle reads it:
// readable-stream reads process.nextTick, util-deprecate reads process.env and
// the deprecation flags, and a bundled `asap` helper falls back to
// process.nextTick when queueMicrotask is missing. @sasjs/utils reads
// process.platform too, though it guards that read itself.
//
// This stub answers those reads. It replaces the Node stdlib polyfill tree the
// browser build used to bundle, which carried thousands of lines of shimmed
// Node internals in the package to answer a handful of property reads.
//
// `versions` stays empty on purpose: isNode() reads process.versions.node, so
// an empty object keeps the node-only code paths switched off in a browser.
module.exports = {
  env: {},
  platform: 'browser',
  argv: [],
  version: '',
  versions: {},
  pid: 0,
  cwd: () => '.',
  nextTick: (fn, ...args) => setTimeout(() => fn(...args), 0),
  noDeprecation: false,
  throwDeprecation: false,
  traceDeprecation: false,
  on: () => {},
  once: () => {},
  emit: () => {},
  removeListener: () => {},
  listeners: () => []
}


/***/ },

/***/ 9220
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeToken = exports.hasTokenExpired = exports.isRefreshTokenExpiring = exports.isAccessTokenExpiring = void 0;
const jwt_decode_1 = __webpack_require__(1278);
/**
 * Checks if the Access Token is expired or is expiring in 1 hour.  A default Access Token
 * lasts 12 hours. If the Access Token expires, the Refresh Token is used to fetch a new
 * Access Token. In the case that the Refresh Token is expired, 1 hour is enough to let
 * most jobs finish.
 * @param {string} token- token string that will be evaluated
 * @param {number} timeToLiveSeconds - the amount of time that the token has before it expires, defaults to 3600
 * @returns {boolean} a value indicating whether the token is about to expire
 */
function isAccessTokenExpiring(token, timeToLiveSeconds = 3600) {
    if (!token) {
        return true;
    }
    return isTokenExpiring(token, timeToLiveSeconds);
}
exports.isAccessTokenExpiring = isAccessTokenExpiring;
/**
 * Checks if the Refresh Token is expired or expiring in 30 secs. A default Refresh Token
 * lasts 30 days.  Once the Refresh Token expires, the user must re-authenticate (provide
 * credentials in a browser to obtain an authorisation code). 30 seconds is enough time
 * to make a request for a final Access Token.
 * @param {string} token- token string that will be evaluated
 * @param {number} timeToLiveSeconds - the amount of time that the token has before it expires, defaults to 30
 * @returns {boolean} a value indicating whether the token is about to expire
 */
function isRefreshTokenExpiring(token, timeToLiveSeconds = 30) {
    if (!token) {
        return true;
    }
    return isTokenExpiring(token, timeToLiveSeconds);
}
exports.isRefreshTokenExpiring = isRefreshTokenExpiring;
/**
 * Checks if the given token has expired.
 * @param {string} token- token string that will be evaluated
 * @returns {boolean} a value indicating whether the token has expired
 */
function hasTokenExpired(token) {
    if (!token) {
        return true;
    }
    return isTokenExpiring(token, 0);
}
exports.hasTokenExpired = hasTokenExpired;
function isTokenExpiring(token, timeToLiveSeconds) {
    let payload;
    try {
        payload = (0, jwt_decode_1.jwtDecode)(token);
    }
    catch (err) {
        // Only tolerate undecodable (opaque / non-JWT) tokens - anything else
        // is a genuine bug and should surface.
        if (!(err instanceof jwt_decode_1.InvalidTokenError))
            throw err;
        // Opaque tokens cannot be expiry-checked client-side.
        // Assume the token is usable and let the server reject it if expired.
        // Deliberately silent - this is routine (opaque tokens are the norm for
        // SAS Logon Manager) and must never appear in CLI output.
        return false;
    }
    // A JWT without an `exp` claim cannot be expiry-checked either.
    // Note: `== null` (not `!`) - exp of 0 is a real (long-expired) claim,
    // not a missing one.
    if (payload.exp == null)
        return false;
    const timeToLive = payload.exp - new Date().valueOf() / 1000;
    return timeToLive <= timeToLiveSeconds;
}
function decodeToken(token) {
    let payload;
    try {
        payload = (0, jwt_decode_1.jwtDecode)(token);
    }
    catch (err) {
        throw new Error('Invalid token supplied.');
    }
    return payload;
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=auth.js.map

/***/ },

/***/ 6072
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9220), exports);
//# sourceMappingURL=index.js.map

/***/ },

/***/ 3839
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prefixMessage = void 0;
const prefixMessage = (err, messagePrefix) => {
    if (typeof err === 'object') {
        if (err.hasOwnProperty('message')) {
            err.message = messagePrefix + err.message;
        }
        else {
            if (err.hasOwnProperty('body')) {
                if (typeof err.body === 'object') {
                    err.message = err.body.message
                        ? messagePrefix + err.body.message
                        : messagePrefix;
                }
                if (typeof err.body === 'string') {
                    let body;
                    try {
                        body = JSON.parse(err.body);
                    }
                    catch (error) {
                        err.message = messagePrefix;
                        return err;
                    }
                    body.message = body.message
                        ? messagePrefix + body.message
                        : messagePrefix;
                    err.body = body;
                    return err;
                }
            }
            else
                return Object.assign(Object.assign({}, err), { message: messagePrefix });
        }
    }
    if (typeof err === 'string')
        err = messagePrefix + err;
    return err;
};
exports.prefixMessage = prefixMessage;
//# sourceMappingURL=errorModifier.js.map

/***/ },

/***/ 6340
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3839), exports);
__exportStar(__webpack_require__(3823), exports);
//# sourceMappingURL=index.js.map

/***/ },

/***/ 3823
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerTypeError = void 0;
const types_1 = __webpack_require__(3631);
class ServerTypeError extends Error {
    constructor(validOptions = []) {
        validOptions = [...new Set(validOptions)];
        let options = validOptions.length
            ? validOptions.join(', ').trim()
            : [types_1.ServerType.SasViya, types_1.ServerType.Sas9, types_1.ServerType.Sasjs]
                .join(', ')
                .trim();
        options = options.replace(/,\s([^,]*)$/, ' and $1');
        super(`Invalid server type: valid option${validOptions.length !== 1 ? 's' : ''} ${validOptions.length !== 1 ? 'are' : 'is'} ${options}`);
        this.name = 'ServerTypeError';
        Object.setPrototypeOf(this, ServerTypeError.prototype);
    }
}
exports.ServerTypeError = ServerTypeError;
//# sourceMappingURL=serverTypeError.js.map

/***/ },

/***/ 3367
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.padWithNumber = void 0;
var number_1 = __webpack_require__(5011);
Object.defineProperty(exports, "padWithNumber", ({ enumerable: true, get: function () { return number_1.padWithNumber; } }));
var string_1 = __webpack_require__(6667);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return string_1.sanitizeSpecialChars; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return string_1.capitalizeFirstChar; } });
var regexp_1 = __webpack_require__(9931);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return regexp_1.newLine; } });
//# sourceMappingURL=index.js.map

/***/ },

/***/ 5011
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.padWithNumber = void 0;
const padWithNumber = (number, padWith = 0) => {
    if (number > 9)
        return number;
    return `${padWith}${number}`;
};
exports.padWithNumber = padWithNumber;
//# sourceMappingURL=number.js.map

/***/ },

/***/ 9931
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5748);

// Kept self-contained rather than importing isWindows from '../': that module
// imports path and is loaded from the package root, which pulls Logger into
// this module and breaks cli.spec.ts with an undefined Logger.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.newLine = void 0;
/**
 * The line ending to join formatted rows with.
 *
 * process may not exist - the formatter runs in browsers, to build request
 * bodies - so the platform is read defensively and a browser gets the unix
 * ending.
 */
const newLine = () => typeof process !== 'undefined' && process.platform === 'win32'
    ? '\\r\\n'
    : '\\n';
exports.newLine = newLine;
//# sourceMappingURL=regexp.js.map

/***/ },

/***/ 6667
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.capitalizeFirstChar = exports.sanitizeSpecialChars = void 0;
const sanitizeSpecialChars = (str) => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
exports.sanitizeSpecialChars = sanitizeSpecialChars;
const capitalizeFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.capitalizeFirstChar = capitalizeFirstChar;
//# sourceMappingURL=string.js.map

/***/ },

/***/ 3371
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.isSpecialMissing = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
const url_1 = __webpack_require__(2042);
const urlValidator = (value, errorMessage) => (0, url_1.isHttpUri)(value) || (0, url_1.isHttpsUri)(value) || value === '' || errorMessage;
__webpack_unused_export__ = urlValidator;
const confirmationValidator = (value) => value === true || value === false;
__webpack_unused_export__ = confirmationValidator;
const choiceValidator = (value, numberOfChoices, errorMessage) => (value > 0 && value <= numberOfChoices) || errorMessage;
__webpack_unused_export__ = choiceValidator;
// This regex will match special missing
// `a-z` or `_` or `.` or '.[a-z]'
const isSpecialMissing = (value) => {
    // This regex can't cover the case with `..` two dots, so if we receive it that is false special missing
    if (typeof value === 'string' && value.includes('..'))
        return false;
    const regex = new RegExp('^(\\.)?[a-z_.]{1}$', 'i');
    return regex.test(value);
};
exports.isSpecialMissing = isSpecialMissing;
//# sourceMappingURL=validators.js.map

/***/ },

/***/ 7247
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.generateTimestamp = exports.timestampToYYYYMMDDHHMMSS = __webpack_unused_export__ = void 0;
var timestamp_1 = __webpack_require__(5947);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return timestamp_1.convertSecondsToHms; } });
Object.defineProperty(exports, "timestampToYYYYMMDDHHMMSS", ({ enumerable: true, get: function () { return timestamp_1.timestampToYYYYMMDDHHMMSS; } }));
Object.defineProperty(exports, "generateTimestamp", ({ enumerable: true, get: function () { return timestamp_1.generateTimestamp; } }));
//# sourceMappingURL=index.js.map

/***/ },

/***/ 5947
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertSecondsToHms = exports.generateTimestamp = exports.timestampToYYYYMMDDHHMMSS = void 0;
const formatter_1 = __webpack_require__(3367);
const timestampToYYYYMMDDHHMMSS = (timestamp = Date.now()) => {
    const date = new Date(timestamp);
    return ([
        date.getFullYear(),
        (0, formatter_1.padWithNumber)(date.getMonth() + 1),
        (0, formatter_1.padWithNumber)(date.getDate())
    ].join('/') +
        ' ' +
        [
            (0, formatter_1.padWithNumber)(date.getHours()),
            (0, formatter_1.padWithNumber)(date.getMinutes()),
            (0, formatter_1.padWithNumber)(date.getSeconds())
        ].join(':'));
};
exports.timestampToYYYYMMDDHHMMSS = timestampToYYYYMMDDHHMMSS;
const generateTimestamp = (sep = '', sepIndex) => {
    const date = new Date();
    let timestamp = [
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    ];
    timestamp = timestamp.map((item) => (0, formatter_1.padWithNumber)(item));
    if (sepIndex && sep && sepIndex < timestamp.length && sepIndex >= 0) {
        timestamp.splice(sepIndex, 0, sep);
    }
    timestamp = timestamp.join(sepIndex ? '' : sep);
    return timestamp;
};
exports.generateTimestamp = generateTimestamp;
const convertSecondsToHms = (totalSeconds) => {
    if (!totalSeconds)
        return '0 second';
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    let result = '';
    if (hours > 0) {
        result = hours + ` hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        result += `${result ? ', ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    if (seconds > 0) {
        result += `${result ? ', ' : ''}${seconds} second${seconds > 1 ? 's' : ''}`;
    }
    return result;
};
exports.convertSecondsToHms = convertSecondsToHms;
//# sourceMappingURL=timestamp.js.map

/***/ },

/***/ 2917
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigTypes = void 0;
var ConfigTypes;
(function (ConfigTypes) {
    ConfigTypes["Build"] = "buildConfig";
    ConfigTypes["Service"] = "serviceConfig";
    ConfigTypes["Job"] = "jobConfig";
    ConfigTypes["Test"] = "testConfig";
    ConfigTypes["Doc"] = "docConfig";
    ConfigTypes["Deploy"] = "deployConfig";
    ConfigTypes["Stream"] = "streamConfig";
    ConfigTypes["Auth"] = "authConfig";
})(ConfigTypes = exports.ConfigTypes || (exports.ConfigTypes = {}));
//# sourceMappingURL=config.js.map

/***/ },

/***/ 1505
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=configuration.js.map

/***/ },

/***/ 7312
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=decodedToken.js.map

/***/ },

/***/ 5115
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=extraResponseAttributes.js.map

/***/ },

/***/ 2557
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineEndings = void 0;
var LineEndings;
(function (LineEndings) {
    LineEndings["CRLF"] = "\r\n";
    LineEndings["LF"] = "\n";
})(LineEndings = exports.LineEndings || (exports.LineEndings = {}));
//# sourceMappingURL=file.js.map

/***/ },

/***/ 5945
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberType = void 0;
var MemberType;
(function (MemberType) {
    MemberType["service"] = "service";
    MemberType["file"] = "file";
    MemberType["folder"] = "folder";
})(MemberType = exports.MemberType || (exports.MemberType = {}));
//# sourceMappingURL=fileTree.js.map

/***/ },

/***/ 5723
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=hash.js.map

/***/ },

/***/ 3023
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=httpsAgentOptions.js.map

/***/ },

/***/ 3631
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2917), exports);
__exportStar(__webpack_require__(1505), exports);
__exportStar(__webpack_require__(7312), exports);
__exportStar(__webpack_require__(5115), exports);
__exportStar(__webpack_require__(5945), exports);
__exportStar(__webpack_require__(5723), exports);
__exportStar(__webpack_require__(3023), exports);
__exportStar(__webpack_require__(7591), exports);
__exportStar(__webpack_require__(7747), exports);
__exportStar(__webpack_require__(4483), exports);
__exportStar(__webpack_require__(5028), exports);
__exportStar(__webpack_require__(756), exports);
__exportStar(__webpack_require__(7717), exports);
__exportStar(__webpack_require__(3182), exports);
__exportStar(__webpack_require__(2557), exports);
//# sourceMappingURL=index.js.map

/***/ },

/***/ 7591
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMacroVars = void 0;
const isMacroVars = (arg) => arg && typeof arg.macroVars === 'object' && !Array.isArray(arg.macroVars);
exports.isMacroVars = isMacroVars;
//# sourceMappingURL=macro.js.map

/***/ },

/***/ 7747
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=sasAuthResponse.js.map

/***/ },

/***/ 4483
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SASJsFileType = void 0;
var SASJsFileType;
(function (SASJsFileType) {
    SASJsFileType["service"] = "Service";
    SASJsFileType["job"] = "Job";
    SASJsFileType["test"] = "Test";
    SASJsFileType["file"] = "File"; // Should be used when file content is not considered as Service, Job or Test and is used as raw content
})(SASJsFileType = exports.SASJsFileType || (exports.SASJsFileType = {}));
//# sourceMappingURL=sasJsFileType.js.map

/***/ },

/***/ 5028
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=serverError.js.map

/***/ },

/***/ 756
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerType = void 0;
var ServerType;
(function (ServerType) {
    ServerType["SasViya"] = "SASVIYA";
    ServerType["Sas9"] = "SAS9";
    ServerType["Sasjs"] = "SASJS";
})(ServerType = exports.ServerType || (exports.ServerType = {}));
//# sourceMappingURL=serverType.js.map

/***/ },

/***/ 7717
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=servicePack.js.map

/***/ },

/***/ 3182
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Target = void 0;
const config_1 = __webpack_require__(2917);
const serverType_1 = __webpack_require__(756);
const targetValidators_1 = __webpack_require__(7473);
class Target {
    constructor(json, config = {}) {
        this._serverType = serverType_1.ServerType.SasViya;
        this.getConfig = (key, json) => {
            const config = this._config[key] || {};
            return Object.assign(Object.assign({}, config), json[key]);
        };
        try {
            if (!json) {
                throw new Error('Invalid target: Input JSON is null or undefined.');
            }
            this._config = config;
            this._name = (0, targetValidators_1.validateTargetName)(json.name);
            this._serverUrl = (0, targetValidators_1.validateServerUrl)(json.serverUrl);
            this._serverType = (0, targetValidators_1.validateServerType)(json.serverType);
            this._httpsAgentOptions = (0, targetValidators_1.validateHttpsAgentOptions)(json.httpsAgentOptions);
            this._appLoc = (0, targetValidators_1.validateAppLoc)(json.appLoc);
            this._contextName = (0, targetValidators_1.validateContextName)(json.contextName, this._serverType);
            this._serverName = (0, targetValidators_1.validateServerName)(json.serverName, this._serverType);
            this._syncFolder = (0, targetValidators_1.validateSyncFolder)(json.syncFolder);
            this._repositoryName = (0, targetValidators_1.validateRepositoryName)(json.repositoryName, this._serverType);
            if (json.docConfig) {
                this._docConfig = (0, targetValidators_1.validateDocConfig)(this.getConfig(config_1.ConfigTypes.Doc, json));
            }
            if (json.authConfig) {
                this._authConfig = (0, targetValidators_1.validateAuthConfig)(this.getConfig(config_1.ConfigTypes.Auth, json));
            }
            if (json.authConfigSas9) {
                this._authConfigSas9 = (0, targetValidators_1.validateAuthConfigSas9)(json.authConfigSas9);
            }
            if (json.buildConfig) {
                this._buildConfig = (0, targetValidators_1.validateBuildConfig)(this.getConfig(config_1.ConfigTypes.Build, json), this._name);
            }
            if (json.deployConfig) {
                this._deployConfig = (0, targetValidators_1.validateDeployConfig)(this.getConfig(config_1.ConfigTypes.Deploy, json));
            }
            // No else: a target that declares no deployConfig has none. Inserting a
            // default here put `deployConfig` into every saved sasjsconfig - see
            // sasjs/utils#221.
            if (json.serviceConfig) {
                this._serviceConfig = (0, targetValidators_1.validateServiceConfig)(this.getConfig(config_1.ConfigTypes.Service, json));
            }
            if (json.jobConfig) {
                this._jobConfig = (0, targetValidators_1.validateJobConfig)(this.getConfig(config_1.ConfigTypes.Job, json));
            }
            if (json.streamConfig) {
                this._streamConfig = (0, targetValidators_1.validateStreamConfig)(this.getConfig(config_1.ConfigTypes.Stream, json));
            }
            if (json.testConfig) {
                this._testConfig = (0, targetValidators_1.validateTestConfig)(this.getConfig(config_1.ConfigTypes.Test, json));
            }
            if (json.macroFolders && json.macroFolders.length) {
                this._macroFolders = json.macroFolders;
            }
            if (json.programFolders && json.programFolders.length) {
                this._programFolders = json.programFolders;
            }
            if (json.binaryFolders && json.binaryFolders.length) {
                this._binaryFolders = json.binaryFolders;
            }
            if (json.syncDirectories && json.syncDirectories.length) {
                this._syncDirectories = (0, targetValidators_1.validateSyncDirectories)(json.syncDirectories);
            }
            if (json.sasjsBuildFolder) {
                this._sasjsBuildFolder = (0, targetValidators_1.validateSasjsBuildFolder)(json.sasjsBuildFolder);
            }
            if (json.sasjsResultsFolder) {
                this._sasjsResultsFolder = (0, targetValidators_1.validateSasjsResultsFolder)(json.sasjsResultsFolder);
            }
        }
        catch (e) {
            throw new Error(`Error parsing target: ${e.message}`);
        }
    }
    get name() {
        return this._name;
    }
    get serverUrl() {
        return this._serverUrl;
    }
    get serverType() {
        return this._serverType;
    }
    get httpsAgentOptions() {
        return this._httpsAgentOptions;
    }
    get appLoc() {
        return this._appLoc;
    }
    get docConfig() {
        return this._docConfig;
    }
    get authConfig() {
        return this._authConfig;
    }
    get authConfigSas9() {
        return this._authConfigSas9;
    }
    get buildConfig() {
        return this._buildConfig;
    }
    get deployConfig() {
        return this._deployConfig;
    }
    get serviceConfig() {
        return this._serviceConfig;
    }
    get jobConfig() {
        return this._jobConfig;
    }
    get streamConfig() {
        return this._streamConfig;
    }
    get macroFolders() {
        return this._macroFolders;
    }
    get programFolders() {
        return this._programFolders;
    }
    get binaryFolders() {
        return this._binaryFolders;
    }
    get contextName() {
        return this._contextName;
    }
    get serverName() {
        return this._serverName;
    }
    get repositoryName() {
        return this._repositoryName;
    }
    get testConfig() {
        return this._testConfig;
    }
    get syncFolder() {
        return this._syncFolder;
    }
    get syncDirectories() {
        return this._syncDirectories;
    }
    get sasjsBuildFolder() {
        return this._sasjsBuildFolder;
    }
    get sasjsResultsFolder() {
        return this._sasjsResultsFolder;
    }
    toJson(withDefaults = false) {
        var _a, _b, _c;
        const json = {
            name: this.name,
            serverUrl: this.serverUrl,
            serverType: this.serverType,
            httpsAgentOptions: this.httpsAgentOptions,
            appLoc: this.appLoc,
            docConfig: this.docConfig,
            deployConfig: this.deployConfig
        };
        if ((_a = this.macroFolders) === null || _a === void 0 ? void 0 : _a.length)
            json.macroFolders = this.macroFolders;
        if ((_b = this.programFolders) === null || _b === void 0 ? void 0 : _b.length)
            json.programFolders = this.programFolders;
        if ((_c = this.binaryFolders) === null || _c === void 0 ? void 0 : _c.length)
            json.binaryFolders = this.binaryFolders;
        if (this.authConfig) {
            json.authConfig = this.authConfig;
        }
        if (this.authConfigSas9) {
            json.authConfigSas9 = this.authConfigSas9;
        }
        if (this.sasjsBuildFolder) {
            json.sasjsBuildFolder = this.sasjsBuildFolder;
        }
        else if (withDefaults) {
            json.sasjsBuildFolder = targetValidators_1.DEFAULT_SASJS_BUILD_FOLDER;
        }
        if (this.sasjsResultsFolder) {
            json.sasjsResultsFolder = this.sasjsResultsFolder;
        }
        else if (withDefaults) {
            json.sasjsResultsFolder = targetValidators_1.DEFAULT_SASJS_RESULTS_FOLDER;
        }
        if (this.syncDirectories) {
            json.syncDirectories = this.syncDirectories;
        }
        else if (withDefaults) {
            json.syncDirectories = [];
        }
        if (this.buildConfig) {
            json.buildConfig = this.buildConfig;
        }
        else if (withDefaults)
            json.buildConfig = {
                initProgram: '',
                termProgram: '',
                buildOutputFileName: `${this.name}.sas`,
                macroVars: {}
            };
        if (this.jobConfig) {
            json.jobConfig = this.jobConfig;
        }
        else if (withDefaults)
            json.jobConfig = {
                jobFolders: [],
                initProgram: '',
                termProgram: '',
                macroVars: {}
            };
        if (this.serviceConfig) {
            json.serviceConfig = this.serviceConfig;
        }
        else if (withDefaults)
            json.serviceConfig = {
                serviceFolders: [],
                initProgram: '',
                termProgram: '',
                macroVars: {}
            };
        if (this.streamConfig) {
            json.streamConfig = this.streamConfig;
        }
        else if (withDefaults)
            json.streamConfig = {
                streamWebFolder: '',
                streamWeb: false,
                webSourcePath: '',
                streamServiceName: '',
                assetPaths: []
            };
        if (this.testConfig) {
            json.testConfig = this.testConfig;
        }
        else if (withDefaults)
            json.testConfig = {
                initProgram: '',
                termProgram: '',
                macroVars: {},
                testSetUp: '',
                testTearDown: ''
            };
        if (this.serverType === serverType_1.ServerType.SasViya) {
            json.contextName = this.contextName;
        }
        else if (this.serverType === serverType_1.ServerType.Sas9) {
            json.serverName = this.serverName;
            json.repositoryName = this.repositoryName;
        }
        return json;
    }
}
exports.Target = Target;
//# sourceMappingURL=target.js.map

/***/ },

/***/ 7473
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.validateSasjsResultsFolder = exports.validateSasjsBuildFolder = exports.validateSyncDirectories = exports.validateRepositoryName = exports.validateSyncFolder = exports.validateServerName = exports.validateContextName = exports.validateStreamConfig = exports.validateDeployConfig = exports.validateJobConfig = exports.validateTestConfig = exports.validateServiceConfig = exports.validateBuildConfig = exports.validateAuthConfigSas9 = exports.validateAuthConfig = exports.validateDocConfig = exports.validateAppLoc = exports.validateHttpsAgentOptions = exports.validateServerUrl = exports.validateTargetName = exports.validateServerType = exports.DEFAULT_SASJS_RESULTS_FOLDER = exports.DEFAULT_SASJS_BUILD_FOLDER = void 0;
const url_1 = __webpack_require__(2042);
const _1 = __webpack_require__(3631);
const DEFAULT_CONTEXT_NAME = 'SAS Job Execution compute context';
const DEFAULT_SERVER_NAME = 'SASApp';
const DEFAULT_REPOSITORY_NAME = 'Foundation';
exports.DEFAULT_SASJS_BUILD_FOLDER = 'sasjsbuild';
exports.DEFAULT_SASJS_RESULTS_FOLDER = 'sasjsresults';
const validateServerType = (serverType) => {
    if (!serverType) {
        throw new Error('Invalid server type: `serverType` cannot be null or undefined.');
    }
    if (!(serverType === _1.ServerType.Sas9 ||
        serverType === _1.ServerType.SasViya ||
        serverType === _1.ServerType.Sasjs)) {
        throw new Error(`Invalid server type: Supported values for  \`serverType\` are ${_1.ServerType.SasViya}, ${_1.ServerType.Sas9} and ${_1.ServerType.Sasjs}.`);
    }
    return serverType;
};
exports.validateServerType = validateServerType;
const validateTargetName = (targetName) => {
    if (!targetName) {
        throw new Error('Invalid target name: `name` cannot be empty, null or undefined.');
    }
    if (targetName.trim().includes(' ')) {
        throw new Error('Invalid target name: `name` cannot include spaces.');
    }
    if (!/^[a-zA-Z0-9\-]+$/i.test(targetName)) {
        throw new Error('Invalid target name: `name` can only contain alphanumeric characters and dashes.');
    }
    return targetName;
};
exports.validateTargetName = validateTargetName;
const validateServerUrl = (serverUrl) => {
    if (serverUrl === null || serverUrl === undefined) {
        serverUrl = '';
    }
    if (serverUrl !== '' && !(0, url_1.isHttpUri)(serverUrl) && !(0, url_1.isHttpsUri)(serverUrl)) {
        throw new Error('Invalid server URL: `serverUrl` should either be an empty string or a valid URL of the form http(s)://your-server.com(:port).');
    }
    return serverUrl;
};
exports.validateServerUrl = validateServerUrl;
const validateHttpsAgentOptions = (httpsAgentOptions) => {
    if (!httpsAgentOptions)
        return;
    if (typeof httpsAgentOptions !== 'object') {
        throw new Error('Invalid value: `httpsAgentOptions` should either be an empty or an object of `HttpsAgentOptions`');
    }
    if (httpsAgentOptions.allowInsecureRequests === null ||
        httpsAgentOptions.allowInsecureRequests === undefined) {
        httpsAgentOptions.allowInsecureRequests = false;
    }
    else if (typeof httpsAgentOptions.allowInsecureRequests !== 'boolean') {
        throw new Error('Invalid value: `httpsAgentOptions.allowInsecureRequests` should either be an empty or a boolean');
    }
    if (typeof httpsAgentOptions.caPath !== 'string') {
        httpsAgentOptions.caPath = undefined;
    }
    if (typeof httpsAgentOptions.keyPath !== 'string') {
        httpsAgentOptions.keyPath = undefined;
    }
    if (typeof httpsAgentOptions.certPath !== 'string') {
        httpsAgentOptions.certPath = undefined;
    }
    return httpsAgentOptions;
};
exports.validateHttpsAgentOptions = validateHttpsAgentOptions;
const validateAppLoc = (appLoc) => {
    if (!appLoc) {
        throw new Error('Invalid app location: `appLoc` cannot be empty, null or undefined.');
    }
    if (!appLoc.startsWith('/')) {
        throw new Error('Invalid app location: `appLoc` must start with a `/`.');
    }
    return appLoc;
};
exports.validateAppLoc = validateAppLoc;
const validateDocConfig = (docConfig) => {
    if (!docConfig) {
        docConfig = {};
    }
    if (typeof docConfig.displayMacroCore !== 'boolean') {
        docConfig.displayMacroCore = undefined;
    }
    if (typeof docConfig.enableLineage !== 'boolean') {
        docConfig.enableLineage = undefined;
    }
    if (typeof docConfig.outDirectory !== 'string') {
        docConfig.outDirectory = undefined;
    }
    if (typeof docConfig.dataControllerUrl === 'string') {
        if (docConfig.dataControllerUrl !== '' &&
            !(0, url_1.isHttpUri)(docConfig.dataControllerUrl) &&
            !(0, url_1.isHttpsUri)(docConfig.dataControllerUrl)) {
            throw new Error('Invalid Data Controller Url: `dataControllerUrl` should either be an empty string or a valid URL of the form http(s)://your-server.com(:port).');
        }
    }
    else {
        docConfig.dataControllerUrl = undefined;
    }
    return docConfig;
};
exports.validateDocConfig = validateDocConfig;
const validateAuthConfig = (authConfig) => {
    if (!authConfig) {
        throw new Error('Invalid auth config: JSON cannot be null or undefined.');
    }
    return authConfig;
};
exports.validateAuthConfig = validateAuthConfig;
const validateAuthConfigSas9 = (authConfigSas9) => {
    if (!authConfigSas9) {
        throw new Error('Invalid auth config for sas9: JSON cannot be null or undefined.');
    }
    if (!authConfigSas9.userName || !authConfigSas9.password) {
        throw new Error('Invalid auth config for sas9: userName and password can not be empty');
    }
    return authConfigSas9;
};
exports.validateAuthConfigSas9 = validateAuthConfigSas9;
const validateBuildConfig = (buildConfig, defaultName) => {
    if (!buildConfig) {
        throw new Error('Invalid build config: JSON cannot be null or undefined.');
    }
    if (!buildConfig.buildOutputFileName) {
        buildConfig.buildOutputFileName = `${defaultName}.sas`;
    }
    if (!buildConfig.initProgram) {
        buildConfig.initProgram = '';
    }
    if (!buildConfig.termProgram) {
        buildConfig.termProgram = '';
    }
    if (!buildConfig.macroVars) {
        buildConfig.macroVars = {};
    }
    return buildConfig;
};
exports.validateBuildConfig = validateBuildConfig;
const validateServiceConfig = (serviceConfig) => {
    if (!serviceConfig) {
        throw new Error('Invalid service config: JSON cannot be null or undefined.');
    }
    if (!serviceConfig.initProgram) {
        serviceConfig.initProgram = '';
    }
    if (!serviceConfig.termProgram) {
        serviceConfig.termProgram = '';
    }
    if (!serviceConfig.serviceFolders) {
        serviceConfig.serviceFolders = [];
    }
    if (!serviceConfig.macroVars) {
        serviceConfig.macroVars = {};
    }
    return serviceConfig;
};
exports.validateServiceConfig = validateServiceConfig;
const validateTestConfig = (testConfig) => {
    if (!testConfig) {
        throw new Error('Invalid test config: JSON cannot be null or undefined.');
    }
    if (!testConfig.initProgram)
        testConfig.initProgram = '';
    if (!testConfig.termProgram)
        testConfig.termProgram = '';
    if (!testConfig.macroVars)
        testConfig.macroVars = {};
    if (!testConfig.testSetUp)
        testConfig.testSetUp = '';
    if (!testConfig.testTearDown)
        testConfig.testTearDown = '';
    return testConfig;
};
exports.validateTestConfig = validateTestConfig;
const validateJobConfig = (jobConfig) => {
    if (!jobConfig) {
        throw new Error('Invalid job config: JSON cannot be null or undefined.');
    }
    if (!jobConfig.initProgram) {
        jobConfig.initProgram = '';
    }
    if (!jobConfig.termProgram) {
        jobConfig.termProgram = '';
    }
    if (!jobConfig.jobFolders) {
        jobConfig.jobFolders = [];
    }
    if (!jobConfig.macroVars) {
        jobConfig.macroVars = {};
    }
    return jobConfig;
};
exports.validateJobConfig = validateJobConfig;
const validateDeployConfig = (deployConfig) => {
    if (!deployConfig) {
        throw new Error('Invalid deploy config: JSON cannot be null or undefined.');
    }
    deployConfig.deployServicePack = !!deployConfig.deployServicePack;
    if (!deployConfig.deployScripts) {
        deployConfig.deployScripts = [];
    }
    return deployConfig;
};
exports.validateDeployConfig = validateDeployConfig;
const validateStreamConfig = (streamConfig) => {
    if (!streamConfig) {
        throw new Error('Invalid stream config: JSON cannot be null or undefined.');
    }
    // Presence is optional - a target can build a browser app without ever
    // streaming from SAS - but a value that is present has to be a boolean.
    if (streamConfig.streamWeb !== undefined &&
        typeof streamConfig.streamWeb !== 'boolean') {
        throw new Error('Invalid stream config: `streamWeb` cannot be a non-boolean value.');
    }
    // `streamWebFolder` follows the same contract as `webSourcePath`: the schema
    // documents a default (web), which is applied when the key is absent, and a
    // value that is present but blank is rejected as a typo.
    if (streamConfig.streamWebFolder !== undefined &&
        streamConfig.streamWebFolder !== null &&
        !String(streamConfig.streamWebFolder).trim()) {
        throw new Error('Invalid stream config: `streamWebFolder` cannot be empty - omit it to use the default (web).');
    }
    if (streamConfig.streamWeb === true && streamConfig.streamWebFolder == null) {
        streamConfig.streamWebFolder = 'web';
    }
    if (streamConfig.mockWeb !== undefined &&
        typeof streamConfig.mockWeb !== 'boolean') {
        throw new Error('Invalid stream config: `mockWeb` cannot be a non-boolean value.');
    }
    if (streamConfig.mockWebFolder !== undefined &&
        typeof streamConfig.mockWebFolder !== 'string') {
        throw new Error('Invalid stream config: `mockWebFolder` cannot be a non-string value.');
    }
    // `webSourcePath` is optional: the schema documents `dist` as its default and
    // most projects build into ./dist or ./build, so it is filled in below when a
    // switch needs it. A value that is present but blank is a typo rather than a
    // decision to accept the default, so it is rejected - the schema's minLength
    // of 1 says the same thing.
    if (streamConfig.webSourcePath !== undefined &&
        streamConfig.webSourcePath !== null &&
        !String(streamConfig.webSourcePath).trim()) {
        throw new Error('Invalid stream config: `webSourcePath` cannot be empty - omit it to use the default (dist).');
    }
    // Both switches build from the same folder, so one default covers them.
    if ((streamConfig.streamWeb === true || streamConfig.mockWeb === true) &&
        streamConfig.webSourcePath == null) {
        streamConfig.webSourcePath = 'dist';
    }
    if (streamConfig.streamLogo && typeof streamConfig.streamLogo !== 'string') {
        streamConfig.streamLogo = undefined;
    }
    if (!streamConfig.assetPaths) {
        streamConfig.assetPaths = [];
    }
    if (!streamConfig.streamServiceName) {
        streamConfig.streamServiceName = 'clickme';
    }
    return streamConfig;
};
exports.validateStreamConfig = validateStreamConfig;
const validateContextName = (contextName, serverType) => {
    if (serverType === _1.ServerType.SasViya && !contextName) {
        return DEFAULT_CONTEXT_NAME;
    }
    return contextName;
};
exports.validateContextName = validateContextName;
const validateServerName = (serverName, serverType) => {
    if (serverType === _1.ServerType.Sas9 && !serverName) {
        return DEFAULT_SERVER_NAME;
    }
    return serverName;
};
exports.validateServerName = validateServerName;
const validateSyncFolder = (syncFolder) => {
    if (typeof syncFolder !== 'string') {
        return;
    }
    if (!syncFolder)
        return;
    return syncFolder;
};
exports.validateSyncFolder = validateSyncFolder;
const validateRepositoryName = (repositoryName, serverType) => {
    if (serverType === _1.ServerType.Sas9 && !repositoryName) {
        return DEFAULT_REPOSITORY_NAME;
    }
    return repositoryName;
};
exports.validateRepositoryName = validateRepositoryName;
const validateSyncDirectories = (syncDirectories) => {
    if (!syncDirectories) {
        throw new Error('Invalid syncDirectories config: JSON cannot be null or undefined.');
    }
    syncDirectories.forEach((obj) => {
        if (!obj.local || !obj.remote)
            throw new Error(`Invalid syncDirectory config: values of property 'local' and 'remote can not be empty or undefined`);
    });
    return syncDirectories;
};
exports.validateSyncDirectories = validateSyncDirectories;
const validateSasjsBuildFolder = (folderName) => {
    if (typeof folderName !== 'string') {
        throw new Error(`Invalid type of value (${typeof folderName}) is provided for property 'sasjsBuildFolder' in config. Required is string.`);
    }
    if (!folderName)
        return exports.DEFAULT_SASJS_BUILD_FOLDER;
    return folderName;
};
exports.validateSasjsBuildFolder = validateSasjsBuildFolder;
const validateSasjsResultsFolder = (folderName) => {
    if (typeof folderName !== 'string') {
        throw new Error(`Invalid type of value (${typeof folderName}) is provided for property 'sasjsResultsFolder' in config. Required is string.`);
    }
    if (!folderName)
        return exports.DEFAULT_SASJS_RESULTS_FOLDER;
    return folderName;
};
exports.validateSasjsResultsFolder = validateSasjsResultsFolder;
//# sourceMappingURL=targetValidators.js.map

/***/ },

/***/ 2042
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.isHttpsUri = exports.isHttpUri = __webpack_unused_export__ = void 0;
const urlOrigin = (str) => {
    if (str === '')
        return str;
    let origin;
    try {
        origin = new URL(str).origin;
    }
    catch (_) {
        throw new Error('Invalid URL.');
    }
    return origin;
};
__webpack_unused_export__ = urlOrigin;
const hasHttpProtocol = (str, protocol) => {
    try {
        const url = new URL(str);
        return url.protocol === protocol && !!url.hostname;
    }
    catch (_) {
        return false;
    }
};
// The parser strips ASCII tab, newline and carriage return before parsing, so
// `new URL('http://exa\tmple.com')` yields `http://example.com`. Those are
// illegal in a URL, and `valid-url` rejected them.
const hasControlChars = (str) => /[\u0000-\u001F\u007F]/.test(str);
/**
 * The literal prefix is checked as well as the parsed protocol, because the URL
 * parser normalises a backslash to a forward slash for special schemes:
 * `new URL('http:\\server')` yields `http://server`. `valid-url`, which these
 * replaced, required the literal prefix and so rejected such input.
 *
 * The prefix comparison is case-insensitive: the parser lowercases the scheme,
 * so `HTTP://example.com` is a usable URL, and `valid-url` compared the scheme
 * case-insensitively too. A backslash still fails, since it is not a slash in
 * either case.
 */
const isHttpUri = (str) => typeof str === 'string' &&
    !hasControlChars(str) &&
    str.toLowerCase().startsWith('http://') &&
    hasHttpProtocol(str, 'http:');
exports.isHttpUri = isHttpUri;
const isHttpsUri = (str) => typeof str === 'string' &&
    !hasControlChars(str) &&
    str.toLowerCase().startsWith('https://') &&
    hasHttpProtocol(str, 'https:');
exports.isHttpsUri = isHttpsUri;
//# sourceMappingURL=url.js.map

/***/ },

/***/ 2841
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });

/**
 * @param {import('axios').AxiosInstance} axios
 * @returns {import('axios').AxiosInstance}
 */
function noop(axios) {
  return axios;
}

exports.wrapper = noop;


/***/ },

/***/ 1894
(module) {

"use strict";


/* eslint-env browser */
module.exports = typeof self === 'object' ? self.FormData : window.FormData;


/***/ },

/***/ 3324
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  getDomain: () => (/* binding */ es6_getDomain),
  getDomainWithoutSuffix: () => (/* binding */ es6_getDomainWithoutSuffix),
  getFullDomain: () => (/* binding */ getFullDomain),
  getHostname: () => (/* binding */ getHostname),
  getPublicSuffix: () => (/* binding */ getPublicSuffix),
  getSubdomain: () => (/* binding */ es6_getSubdomain),
  parse: () => (/* binding */ parse)
});

;// ./node_modules/tldts-core/dist/es6/src/domain.js
/**
 * Check if `vhost` is a valid suffix of `hostname` (top-domain)
 *
 * It means that `vhost` needs to be a suffix of `hostname` and we then need to
 * make sure that: either they are equal, or the character preceding `vhost` in
 * `hostname` is a '.' (it should not be a partial label).
 *
 * * hostname = 'not.evil.com' and vhost = 'vil.com'      => not ok
 * * hostname = 'not.evil.com' and vhost = 'evil.com'     => ok
 * * hostname = 'not.evil.com' and vhost = 'not.evil.com' => ok
 */
function shareSameDomainSuffix(hostname, vhost) {
    if (hostname.endsWith(vhost)) {
        return (hostname.length === vhost.length ||
            hostname[hostname.length - vhost.length - 1] === '.');
    }
    return false;
}
/**
 * Given a hostname and its public suffix, extract the general domain.
 */
function extractDomainWithSuffix(hostname, publicSuffix) {
    // Locate the index of the last '.' in the part of the `hostname` preceding
    // the public suffix.
    //
    // examples:
    //   1. not.evil.co.uk  => evil.co.uk
    //         ^    ^
    //         |    | start of public suffix
    //         | index of the last dot
    //
    //   2. example.co.uk   => example.co.uk
    //     ^       ^
    //     |       | start of public suffix
    //     |
    //     | (-1) no dot found before the public suffix
    const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
    const lastDotBeforeSuffixIndex = hostname.lastIndexOf('.', publicSuffixIndex);
    // No '.' found, then `hostname` is the general domain (no sub-domain)
    if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
    }
    // Extract the part between the last '.'
    return hostname.slice(lastDotBeforeSuffixIndex + 1);
}
/**
 * Detects the domain based on rules and upon and a host string
 */
function getDomain(suffix, hostname, options) {
    // Check if `hostname` ends with a member of `validHosts`.
    if (options.validHosts !== null) {
        const validHosts = options.validHosts;
        for (const vhost of validHosts) {
            if ( /*@__INLINE__*/shareSameDomainSuffix(hostname, vhost)) {
                return vhost;
            }
        }
    }
    let numberOfLeadingDots = 0;
    if (hostname.startsWith('.')) {
        while (numberOfLeadingDots < hostname.length &&
            hostname[numberOfLeadingDots] === '.') {
            numberOfLeadingDots += 1;
        }
    }
    // If `hostname` is a valid public suffix, then there is no domain to return.
    // Since we already know that `getPublicSuffix` returns a suffix of `hostname`
    // there is no need to perform a string comparison and we only compare the
    // size.
    if (suffix.length === hostname.length - numberOfLeadingDots) {
        return null;
    }
    // To extract the general domain, we start by identifying the public suffix
    // (if any), then consider the domain to be the public suffix with one added
    // level of depth. (e.g.: if hostname is `not.evil.co.uk` and public suffix:
    // `co.uk`, then we take one more level: `evil`, giving the final result:
    // `evil.co.uk`).
    return /*@__INLINE__*/ extractDomainWithSuffix(hostname, suffix);
}
//# sourceMappingURL=domain.js.map
;// ./node_modules/tldts-core/dist/es6/src/domain-without-suffix.js
/**
 * Return the part of domain without suffix.
 *
 * Example: for domain 'foo.com', the result would be 'foo'.
 */
function getDomainWithoutSuffix(domain, suffix) {
    // Note: here `domain` and `suffix` cannot have the same length because in
    // this case we set `domain` to `null` instead. It is thus safe to assume
    // that `suffix` is shorter than `domain`.
    return domain.slice(0, -suffix.length - 1);
}
//# sourceMappingURL=domain-without-suffix.js.map
;// ./node_modules/tldts-core/dist/es6/src/extract-hostname.js
/**
 * Matches an ASCII tab (U+0009) or newline (U+000A / U+000D). The WHATWG URL
 * parser strips these before parsing; we only allocate a cleaned copy (and
 * re-parse) on the rare input that actually contains one.
 */
const CONTROL_CHARS = /[\t\n\r]/g;
// Set by `extractHostname` (a module-scope flag, read synchronously by
// `parseImpl` right after the call — same pattern as the reused RESULT object).
// `true` ONLY when extraction validated the returned host inline (a confirmed-
// valid, "simple" authority) so `parseImpl` can skip the separate
// `isValidHostname` pass. `false` in every other case (validation disabled, a
// complex authority — userinfo/port/brackets/trailing-dot/control — an invalid
// host, or a non-main return path); `parseImpl` then validates as usual. The
// fast path can only ever SKIP a redundant scan for hosts already known valid,
// never accept an invalid one.
let extractedHostnameValidated = false;
/**
 * True if char `code` is a valid hostname character. This is the per-char half
 * of `is-valid.ts`'s `isValidAscii` (a-z, 0-9, > U+007F) PLUS three additions:
 * A-Z (the host is lowercased before validation, so uppercase ≡ a valid
 * lowercase letter) and '-' / '_' (valid inside a label). KEEP IN SYNC with
 * `is-valid.ts`: these rules are deliberately duplicated to validate during
 * extraction, so any change to the accepted character set there must be
 * mirrored here (and vice-versa).
 */
function isValidHostnameChar(code) {
    return ((code >= 97 && code <= 122) || // a-z
        (code >= 48 && code <= 57) || // 0-9
        code > 127 || // non-ASCII (accepted, not punycode-checked)
        (code >= 65 && code <= 90) || // A-Z (becomes valid once lowercased)
        code === 45 || // '-'
        code === 95 // '_'
    );
}
/**
 * Classify scheme `url.slice(schemeStart, colonIndex)` as a WHATWG special
 * scheme without allocating a substring (case-insensitive via `| 32`).
 * Special schemes: ftp, file, http, https, ws, wss
 * (https://url.spec.whatwg.org/#special-scheme).
 *
 * @returns 0 = not special, 1 = special, 2 = file (its host sits only between
 *          "//" and the next slash).
 */
function getSpecialScheme(url, schemeStart, colonIndex) {
    const length = colonIndex - schemeStart;
    const c0 = url.charCodeAt(schemeStart) | 32;
    if (length === 2) {
        return c0 === 119 && (url.charCodeAt(schemeStart + 1) | 32) === 115 ? 1 : 0; // ws
    }
    else if (length === 3) {
        const c1 = url.charCodeAt(schemeStart + 1) | 32;
        const c2 = url.charCodeAt(schemeStart + 2) | 32;
        if (c0 === 119 && c1 === 115 && c2 === 115)
            return 1; // wss
        if (c0 === 102 && c1 === 116 && c2 === 112)
            return 1; // ftp
        return 0;
    }
    else if (length === 4) {
        const c1 = url.charCodeAt(schemeStart + 1) | 32;
        const c2 = url.charCodeAt(schemeStart + 2) | 32;
        const c3 = url.charCodeAt(schemeStart + 3) | 32;
        if (c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112)
            return 1; // http
        if (c0 === 102 && c1 === 105 && c2 === 108 && c3 === 101)
            return 2; // file
        return 0;
    }
    else if (length === 5) {
        return c0 === 104 &&
            (url.charCodeAt(schemeStart + 1) | 32) === 116 &&
            (url.charCodeAt(schemeStart + 2) | 32) === 116 &&
            (url.charCodeAt(schemeStart + 3) | 32) === 112 &&
            (url.charCodeAt(schemeStart + 4) | 32) === 115
            ? 1
            : 0; // https
    }
    return 0;
}
/**
 * Extract a hostname from `url`, matching a WHATWG URL parser's host-boundary
 * behaviour (https://url.spec.whatwg.org/#concept-basic-url-parser) for tldts'
 * scope. It deliberately does NOT normalise the host (no IDNA/punycode or IPv4
 * canonicalisation; IPv6 brackets are stripped, not compressed), strips trailing
 * dots, and stays lenient where a strict parser rejects (bare host:port,
 * out-of-range port, user@host) — all documented deviations.
 *
 * @param urlIsValidHostname - when true, `url` is already a valid hostname and is
 *   returned by the same reference (factory.ts skips re-validation on that
 *   identity), keeping the common path allocation-free.
 * @param validate - when true, validate the host inline during the authority
 *   scan and publish the verdict via `extractedHostnameValidated` so `parseImpl`
 *   can skip the redundant `isValidHostname` pass for simple authorities.
 */
function extractHostname(url, urlIsValidHostname, validate = false) {
    let start = 0;
    let end = url.length;
    let hasUpper = false;
    let isSpecial = false;
    extractedHostnameValidated = false;
    if (!urlIsValidHostname) {
        // Data URLs never carry a host (and may be huge — short-circuit them).
        if (url.startsWith('data:')) {
            return null;
        }
        // WHATWG step 1: trim leading/trailing C0 control or space (<= U+0020).
        // Tab/newline elsewhere are handled lazily below.
        while (start < url.length && url.charCodeAt(start) <= 32) {
            start += 1;
        }
        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
            end -= 1;
        }
        if (url.charCodeAt(start) === 47 /* '/' */ &&
            url.charCodeAt(start + 1) === 47 /* '/' */) {
            // Scheme-relative reference ("//host/path").
            start += 2;
        }
        else {
            const indexOfProtocol = url.indexOf(':/', start);
            if (indexOfProtocol !== -1) {
                // "scheme://…". Classify the scheme, then position `start` at the host.
                const special = getSpecialScheme(url, start, indexOfProtocol);
                if (special === 1) {
                    // Special scheme: skip the run of '/' and '\' after it
                    // (special-authority-(ignore-)slashes states; '\' acts as '/').
                    isSpecial = true;
                    start = indexOfProtocol + 2;
                    while (url.charCodeAt(start) === 47 /* '/' */ ||
                        url.charCodeAt(start) === 92 /* '\' */) {
                        start += 1;
                    }
                }
                else if (special === 2) {
                    // file: the host is only what sits between "//" and the next slash, so
                    // "file://h/x" => "h" but "file:///x" / "file:/x" => no host.
                    isSpecial = true;
                    start = indexOfProtocol + 1;
                    let slashes = 0;
                    while ((url.charCodeAt(start) === 47 || url.charCodeAt(start) === 92) &&
                        slashes < 2) {
                        start += 1;
                        slashes += 1;
                    }
                    if (slashes < 2) {
                        return null;
                    }
                }
                else {
                    // Unknown scheme: validate the WHATWG scheme grammar [A-Za-z0-9+.-];
                    // a control char means it was split by a tab/newline (strip + re-parse).
                    for (let i = start; i < indexOfProtocol; i += 1) {
                        const code = url.charCodeAt(i) | 32;
                        if (!((code >= 97 && code <= 122) || // [a, z]
                            (code >= 48 && code <= 57) || // [0, 9]
                            code === 46 || // '.'
                            code === 45 || // '-'
                            code === 43 // '+'
                        )) {
                            const raw = url.charCodeAt(i);
                            if (raw === 9 || raw === 10 || raw === 13) {
                                return extractHostname(url.replace(CONTROL_CHARS, ''), urlIsValidHostname, validate);
                            }
                            return null;
                        }
                    }
                    // A non-special scheme has an authority only after "//" (else it is an
                    // opaque path with no host). `indexOf(':/')` already gave the first '/'.
                    if (url.charCodeAt(indexOfProtocol + 2) === 47 /* '/' */) {
                        start = indexOfProtocol + 3;
                    }
                    else {
                        return null;
                    }
                }
            }
            else if (url.charCodeAt(start) !== 91 /* '[' */) {
                // Cold path: no scheme "://", and not a bare IPv6 literal (whose first
                // ':' would otherwise look like a scheme separator; "[…]" falls through
                // to the ipv6 handling below). May be a bare host, a host:port, a
                // user@host, a slash-less special scheme ("https:host"), or an opaque
                // URI ("mailto:", "tel:", "urn:…").
                let indexOfColon = -1;
                for (let i = start; i < end; i += 1) {
                    const code = url.charCodeAt(i);
                    if (code === 9 || code === 10 || code === 13) {
                        return extractHostname(url.replace(CONTROL_CHARS, ''), urlIsValidHostname, validate);
                    }
                    if (code === 58 /* ':' */) {
                        indexOfColon = i;
                        break;
                    }
                    if (code === 47 || code === 92 || code === 63 || code === 35) {
                        break;
                    }
                }
                if (indexOfColon !== -1) {
                    // An '@' before the next delimiter => the ':' is userinfo, not a
                    // scheme ("user:pass@host", "mailto:a@b"): keep the whole authority.
                    let hasIdentifier = false;
                    for (let i = indexOfColon + 1; i < end; i += 1) {
                        const code = url.charCodeAt(i);
                        if (code === 47 || code === 92 || code === 63 || code === 35) {
                            break;
                        }
                        if (code === 64 /* '@' */) {
                            hasIdentifier = true;
                            break;
                        }
                    }
                    if (!hasIdentifier) {
                        // All-digits after ':' => a bare "host:port" (tldts accepts
                        // hostnames too); keep `start` and let the port handling trim it.
                        let allDigits = true;
                        let i = indexOfColon + 1;
                        for (; i < end; i += 1) {
                            const code = url.charCodeAt(i);
                            if (code === 47 || code === 92 || code === 63 || code === 35) {
                                break;
                            }
                            if (code < 48 /* '0' */ || code > 57 /* '9' */) {
                                allDigits = false;
                                break;
                            }
                        }
                        if (i === indexOfColon + 1) {
                            allDigits = false; // nothing after ':' => not a port
                        }
                        if (!allDigits) {
                            const special = getSpecialScheme(url, start, indexOfColon);
                            if (special === 0) {
                                // No "://" anywhere on the cold path and not a special scheme.
                                // A second ':' before the host's end marks a bare, unbracketed
                                // IPv6 literal ("2a01:e35::1"): fall through and let the host
                                // loop + isIp classify it. Without one this is an opaque path
                                // with no host ("mailto:x", "foo:bar").
                                let isBareIpv6 = false;
                                for (let j = indexOfColon + 1; j < end; j += 1) {
                                    const code = url.charCodeAt(j);
                                    if (code === 47 ||
                                        code === 92 ||
                                        code === 63 ||
                                        code === 35) {
                                        break;
                                    }
                                    if (code === 58 /* ':' */) {
                                        isBareIpv6 = true;
                                        break;
                                    }
                                }
                                if (!isBareIpv6) {
                                    return null;
                                }
                            }
                            else {
                                isSpecial = true;
                                start = indexOfColon + 1;
                                if (special === 2) {
                                    // file (e.g. "file:\\host"): host only between "//" and next slash.
                                    let slashes = 0;
                                    while ((url.charCodeAt(start) === 47 ||
                                        url.charCodeAt(start) === 92) &&
                                        slashes < 2) {
                                        start += 1;
                                        slashes += 1;
                                    }
                                    if (slashes < 2) {
                                        return null;
                                    }
                                }
                                else {
                                    while (url.charCodeAt(start) === 47 ||
                                        url.charCodeAt(start) === 92) {
                                        start += 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // Find the host's end: first '/', '?' or '#' (and '\' for special URLs,
        // which WHATWG treats like '/'). Track the last '@', ']' and ':' for
        // userinfo, ipv6 and port, plus the first ':' of the host (reset at each
        // '@') to tell a bare IPv6 (>= 2 colons) from a host:port (exactly one);
        // flag uppercase and a stray tab/newline. The loop is split on `code < 64`
        // so common host characters take fewer comparisons.
        //
        // When `validate`, also accumulate `is-valid.ts`'s checks over the scanned
        // run so a simple authority's host can be validated in this single pass.
        // `vValid` only stays meaningful for a "simple" authority (no userinfo, port,
        // brackets, control or trailing dot); those cases clear it / are rejected by
        // the guard below, falling back to `isValidHostname`.
        let indexOfIdentifier = -1;
        let indexOfClosingBracket = -1;
        let indexOfPort = -1;
        let indexOfFirstColon = -1;
        let hasControl = false;
        let vValid = validate; // seeded true when validating; cleared on the first invalid char
        let vLastDot = start - 1; // mirrors is-valid.ts `lastDotIndex = -1` at host start
        let vLastCode = -1;
        if (validate && start < end) {
            // First-char rule: must be a valid host char, '.', or '_' (NOT '-').
            const c0 = url.charCodeAt(start);
            if (
            // Keep these parens: they scope /*@__INLINE__*/ for terser.
            // prettier-ignore
            !(
            /*@__INLINE__*/ (isValidHostnameChar(c0) ||
                c0 === 46 /* '.' */ ||
                c0 === 95 /* '_' */)) ||
                c0 === 45 /* '-' (isValidHostnameChar allows it mid-label, not first) */) {
                vValid = false;
            }
        }
        for (let i = start; i < end; i += 1) {
            const code = url.charCodeAt(i);
            if (code < 64) {
                if (code === 47 || code === 35 || code === 63) {
                    end = i;
                    break;
                }
                else if (code === 58 /* ':' */) {
                    if (indexOfFirstColon === -1) {
                        indexOfFirstColon = i;
                    }
                    indexOfPort = i;
                }
                else if (code === 9 || code === 10 || code === 13) {
                    hasControl = true;
                }
                else if (validate) {
                    if (code === 46 /* '.' */) {
                        if (i - vLastDot > 64 || vLastCode === 46 || vLastCode === 45) {
                            vValid = false;
                        }
                        vLastDot = i;
                    }
                    else if (code < 48 || code > 57) {
                        // < 64 and not a delimiter/dot/digit => only '-' (45) is a valid
                        // host char here; everything else (space, %, !, etc.) is invalid.
                        // A '-' must also not START a label (the byte right after a '.') —
                        // mirrors is-valid.ts; the first label is covered by the first-char
                        // rule above. (RFC 1034 §3.5 / RFC 1035 §2.3.1 LDH.)
                        if (code !== 45 || vLastCode === 46 /* label-leading '-' */) {
                            vValid = false;
                        }
                    }
                }
            }
            else if (isSpecial && code === 92 /* '\' */) {
                end = i;
                break;
            }
            else if (code === 64 /* '@' */) {
                indexOfIdentifier = i;
                indexOfFirstColon = -1; // colons before '@' are userinfo, not the host
            }
            else if (code === 93 /* ']' */) {
                indexOfClosingBracket = i;
            }
            else if (code >= 65 && code <= 90) {
                hasUpper = true;
            }
            else if (validate && !( /*@__INLINE__*/isValidHostnameChar(code))) {
                // >= 64, not '@'/']'/upper: valid only if a-z, '_', or non-ASCII.
                vValid = false;
            }
            if (validate) {
                vLastCode = code;
            }
        }
        // A tab/newline inside the authority: strip everything and re-parse (rare).
        if (hasControl) {
            return extractHostname(url.replace(CONTROL_CHARS, ''), urlIsValidHostname, validate);
        }
        // Skip userinfo. '>= start' so an empty userinfo ("http://@host") works too.
        if (indexOfIdentifier !== -1 &&
            indexOfIdentifier >= start &&
            indexOfIdentifier < end) {
            start = indexOfIdentifier + 1;
        }
        if (url.charCodeAt(start) === 91 /* '[' */) {
            // ipv6 address: return what is between the brackets, or null if unclosed.
            if (indexOfClosingBracket !== -1) {
                return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
            }
            return null;
        }
        else if (indexOfPort !== -1 &&
            indexOfPort > start &&
            indexOfPort < end &&
            // A host:port has exactly one ':' in the host (so its first ':' is its
            // last); a bare, unbracketed IPv6 literal ("2a01:e35::1") has >= 2, so
            // its first ':' precedes the last. Only the former has a ':port' to trim.
            indexOfFirstColon === indexOfPort) {
            end = indexOfPort; // trim ':port'
        }
        // Empty authority ("http://", "file:///path", "//"); only reachable here via
        // extraction — a bare valid hostname never lands here.
        if (start >= end) {
            return null;
        }
        // Publish the inline-validation verdict — but only for a "simple" authority,
        // where the scanned run equals the final host: no userinfo skip, no port
        // trim, no brackets, no trailing dot (trimmed below), and length within RFC
        // limits. Anything else leaves it `false` so `parseImpl` re-validates.
        //
        // Every clause below is load-bearing for CORRECTNESS, not just speed: the
        // loop accumulates `vValid` over the whole scanned run (it does not stop at
        // ':' or '@', so any port/userinfo bytes are included), so the verdict is
        // only sound when that run equals the final host. Do not drop a clause as
        // "redundant" — e.g. without `indexOfPort === -1`, `host:8080` would be
        // wrongly accepted.
        if (validate &&
            vValid &&
            indexOfIdentifier === -1 &&
            indexOfPort === -1 &&
            indexOfClosingBracket === -1 &&
            url.charCodeAt(end - 1) !== 46 /* no trailing dot */ &&
            end - start <= 255 && // total length
            end - vLastDot - 1 <= 63 && // last label length
            vLastCode !== 45 /* last char not '-' */) {
            extractedHostnameValidated = true;
        }
    }
    // Trim trailing dots
    while (end > start + 1 && url.charCodeAt(end - 1) === 46 /* '.' */) {
        end -= 1;
    }
    const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
    if (hasUpper) {
        return hostname.toLowerCase();
    }
    return hostname;
}
//# sourceMappingURL=extract-hostname.js.map
;// ./node_modules/tldts-core/dist/es6/src/is-ip.js
/**
 * Check if a hostname is an IP. You should be aware that this only works
 * because `hostname` is already garanteed to be a valid hostname!
 */
function isProbablyIpv4(hostname) {
    // Cannot be shorted than 1.1.1.1
    if (hostname.length < 7) {
        return false;
    }
    // Cannot be longer than: 255.255.255.255
    if (hostname.length > 15) {
        return false;
    }
    let numberOfDots = 0;
    for (let i = 0; i < hostname.length; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */) {
            numberOfDots += 1;
        }
        else if (code < 48 /* '0' */ || code > 57 /* '9' */) {
            return false;
        }
    }
    return (numberOfDots === 3 &&
        hostname.charCodeAt(0) !== 46 /* '.' */ &&
        hostname.charCodeAt(hostname.length - 1) !== 46 /* '.' */);
}
/**
 * Similar to isProbablyIpv4.
 */
function isProbablyIpv6(hostname) {
    if (hostname.length < 3) {
        return false;
    }
    let start = hostname.startsWith('[') ? 1 : 0;
    let end = hostname.length;
    if (hostname[end - 1] === ']') {
        end -= 1;
    }
    // We only consider the maximum size of a normal IPV6. Note that this will
    // fail on so-called "IPv4 mapped IPv6 addresses" but this is a corner-case
    // and a proper validation library should be used for these.
    if (end - start > 39) {
        return false;
    }
    let hasColon = false;
    for (; start < end; start += 1) {
        const code = hostname.charCodeAt(start);
        if (code === 58 /* ':' */) {
            hasColon = true;
        }
        else if (!((code >= 48 && code <= 57) || // 0-9
            (code >= 97 && code <= 102) || // a-f
            (code >= 65 && code <= 70) // A-F (RFC 4291 §2.2: an IPv6 hextet is hex digits only)
        )) {
            return false;
        }
    }
    return hasColon;
}
/**
 * Check if `hostname` is *probably* a valid ip addr (either ipv6 or ipv4).
 * This *will not* work on any string. We need `hostname` to be a valid
 * hostname.
 */
function isIp(hostname) {
    return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
}
//# sourceMappingURL=is-ip.js.map
;// ./node_modules/tldts-core/dist/es6/src/is-special-use.js
/**
 * Special-use domain names from the IANA "Special-Use Domain Names" registry:
 * the authoritative list, created by RFC 6761 and maintained as new RFCs add to
 * it: https://www.iana.org/assignments/special-use-domain-names/
 * Snapshot: 2026-05-24. (RFC 6761 is not obsoleted; draft-hoffman-rfc6761bis
 * proposes to retire its prose but keep this registry, so the registry is the
 * source of truth; re-sync this list against it.)
 *
 * These names never correspond to a public registration, yet neither
 * `isIcann` nor `isPrivate` marks one as special-use: most are absent from the
 * Public Suffix List (so `a.test` looks like a registrable domain), and the
 * few that are listed (`onion`, `home.arpa`) appear there as ordinary ICANN
 * suffixes. `isSpecialUse` is the single signal that covers them all.
 *
 * Per the registry and RFC 6761 ("and any names falling within these domains"),
 * the designation covers each listed name AND all of its sub-domains. DNS labels
 * are case-insensitive (RFC 4343); `hostname` is expected to be already
 * lower-cased and trailing-dot-stripped, as produced by `extractHostname`, the
 * same normalization the Public-Suffix-List lookup relies on.
 *
 * Two groups of registry entries are intentionally excluded: the numeric
 * reverse-DNS delegation zones (`10.in-addr.arpa`, the `*.ip6.arpa` ranges, …),
 * which are reverse-DNS PTR zones rather than hostnames and whose parents
 * (`in-addr.arpa`/`ip6.arpa`) are already in the Public Suffix List; and the
 * deprecated `eap-noob.arpa` entry.
 */
const SPECIAL_USE_DOMAINS = [
    'test', // RFC 6761
    'localhost', // RFC 6761
    'invalid', // RFC 6761
    'example', // RFC 6761
    'example.com', // RFC 6761
    'example.net', // RFC 6761
    'example.org', // RFC 6761
    'local', // RFC 6762 (mDNS)
    'onion', // RFC 7686 (Tor)
    'alt', // RFC 9476
    'home.arpa', // RFC 8375
    'ipv4only.arpa', // RFC 8880
    'resolver.arpa', // RFC 9462
    'service.arpa', // RFC 9665
    '6tisch.arpa', // RFC 9031
    'eap.arpa', // RFC 9965
];
/**
 * Return `true` if `hostname` is, or is a sub-domain of, a special-use domain
 * (see the registry note above). Expects an already-normalized `hostname`.
 */
function isSpecialUse(hostname) {
    for (const name of SPECIAL_USE_DOMAINS) {
        // Match on a label boundary: `hostname` is either exactly `name` or ends
        // with `.name` (so `latest` is not matched by `test`, nor `myexample.com`
        // by `example.com`).
        if (hostname.endsWith(name) &&
            (hostname.length === name.length ||
                hostname.charCodeAt(hostname.length - name.length - 1) === 46) /* '.' */) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=is-special-use.js.map
;// ./node_modules/tldts-core/dist/es6/src/is-valid.js
/**
 * Implements fast shallow verification of hostnames. This does not perform a
 * struct check on the content of labels (classes of Unicode characters, etc.)
 * but instead check that the structure is valid (number of labels, length of
 * labels, etc.).
 *
 * If you need stricter validation, consider using an external library.
 */
// KEEP IN SYNC with `extract-hostname.ts` `isValidHostnameChar` + its inline
// scan/verdict, which duplicate these structural rules to validate during
// extraction (a perf fusion). That copy additionally accepts A-Z (the host is
// not yet lowercased there) and folds in '-' / '_'. Any change to the accepted
// character set or the label/length rules here must be mirrored there.
function isValidAscii(code) {
    return ((code >= 97 && code <= 122) || (code >= 48 && code <= 57) || code > 127);
}
/**
 * Check if a hostname string is valid. It's usually a preliminary check before
 * trying to use getDomain or anything else.
 *
 * Beware: it does not check if the TLD exists.
 */
/* harmony default export */ function is_valid(hostname) {
    if (hostname.length > 255) {
        return false;
    }
    if (hostname.length === 0) {
        return false;
    }
    if (
    /*@__INLINE__*/ !isValidAscii(hostname.charCodeAt(0)) &&
        hostname.charCodeAt(0) !== 46 && // '.' (dot)
        hostname.charCodeAt(0) !== 95 // '_' (underscore)
    ) {
        return false;
    }
    // Validate hostname according to RFC
    let lastDotIndex = -1;
    let lastCharCode = -1;
    const len = hostname.length;
    for (let i = 0; i < len; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */) {
            if (
            // Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 ||
                // Check that previous character was not already a '.'
                lastCharCode === 46 ||
                // Check that the previous label does not end with '-' (RFC 1035 §2.3.1 LDH).
                // '_' is intentionally NOT restricted: DNS allows any octet (RFC 2181 §11) and
                // WHATWG URL does not treat '_' as a forbidden host code point.
                lastCharCode === 45) {
                return false;
            }
            lastDotIndex = i;
        }
        else if (
        // A forbidden character in the label...
        // Keep these parens: they scope /*@__INLINE__*/ for terser.
        // prettier-ignore
        !( /*@__INLINE__*/(isValidAscii(code) || code === 45 || code === 95)) ||
            // ...or a '-' starting a label (the byte right after a '.'). A label must
            // not begin with a hyphen (RFC 1034 §3.5 / RFC 1035 §2.3.1 LDH, as amended
            // by RFC 1123 §2.1; cf. UTS #46 CheckHyphens). The first label is covered by
            // the leading-character guard above; mirrors the trailing-'-' rule below.
            (code === 45 && lastCharCode === 46)) {
            return false;
        }
        lastCharCode = code;
    }
    return (
    // Check that last label is shorter than 63 chars
    len - lastDotIndex - 1 <= 63 &&
        // Check that the last character is an allowed trailing label character.
        // Since we already checked that the char is a valid hostname character,
        // we only need to check that it's different from '-'.
        lastCharCode !== 45);
}
//# sourceMappingURL=is-valid.js.map
;// ./node_modules/tldts-core/dist/es6/src/options.js
function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, detectSpecialUse = false, extractHostname = true, mixedInputs = true, validHosts = null, validateHostname = true, }) {
    return {
        allowIcannDomains,
        allowPrivateDomains,
        detectIp,
        detectSpecialUse,
        extractHostname,
        mixedInputs,
        validHosts,
        validateHostname,
    };
}
const DEFAULT_OPTIONS = /*@__INLINE__*/ setDefaultsImpl({});
function setDefaults(options) {
    if (options === undefined) {
        return DEFAULT_OPTIONS;
    }
    return /*@__INLINE__*/ setDefaultsImpl(options);
}
//# sourceMappingURL=options.js.map
;// ./node_modules/tldts-core/dist/es6/src/subdomain.js
/**
 * Returns the subdomain of a hostname string
 */
function getSubdomain(hostname, domain) {
    // If `hostname` and `domain` are the same, then there is no sub-domain
    if (domain.length === hostname.length) {
        return '';
    }
    return hostname.slice(0, -domain.length - 1);
}
//# sourceMappingURL=subdomain.js.map
;// ./node_modules/tldts-core/dist/es6/src/factory.js
/**
 * Implement a factory allowing to plug different implementations of suffix
 * lookup (e.g.: using a trie or the packed hashes datastructures). This is used
 * and exposed in `tldts.ts` and `tldts-experimental.ts` bundle entrypoints.
 */








function getEmptyResult() {
    return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        isSpecialUse: null,
        publicSuffix: null,
        subdomain: null,
    };
}
function resetResult(result) {
    result.domain = null;
    result.domainWithoutSuffix = null;
    result.hostname = null;
    result.isIcann = null;
    result.isIp = null;
    result.isPrivate = null;
    result.isSpecialUse = null;
    result.publicSuffix = null;
    result.subdomain = null;
}
function parseImpl(url, step, suffixLookup, partialOptions, result) {
    const options = /*@__INLINE__*/ setDefaults(partialOptions);
    // Very fast approximate check to make sure `url` is a string. This is needed
    // because the library will not necessarily be used in a typed setup and
    // values of arbitrary types might be given as argument.
    if (typeof url !== 'string') {
        return result;
    }
    // Extract hostname from `url` only if needed. This can be made optional
    // using `options.extractHostname`. This option will typically be used
    // whenever we are sure the inputs to `parse` are already hostnames and not
    // arbitrary URLs.
    //
    // `mixedInput` allows to specify if we expect a mix of URLs and hostnames
    // as input. If only hostnames are expected then `extractHostname` can be
    // set to `false` to speed-up parsing. If only URLs are expected then
    // `mixedInputs` can be set to `false`. The `mixedInputs` is only a hint
    // and will not change the behavior of the library.
    // Whether `url` itself was already a valid hostname (only computed on the
    // mixedInputs path). Lets us skip the post-extraction validation below when
    // extractHostname returned `url` unchanged (same reference).
    let urlIsValid = false;
    if (!options.extractHostname) {
        result.hostname = url;
    }
    else if (options.mixedInputs) {
        urlIsValid = is_valid(url);
        result.hostname = extractHostname(url, urlIsValid, options.validateHostname);
    }
    else {
        result.hostname = extractHostname(url, false, options.validateHostname);
    }
    // Check if `hostname` is a valid ip address
    if (options.detectIp && result.hostname !== null) {
        result.isIp = isIp(result.hostname);
        if (result.isIp) {
            return result;
        }
    }
    // Perform hostname validation if enabled. If hostname is not valid, no need to
    // go further as there will be no valid domain or sub-domain. This validation
    // is applied before any early returns to ensure consistent behavior across
    // all API methods including getHostname().
    if (options.validateHostname &&
        options.extractHostname &&
        result.hostname !== null &&
        // Skip the re-scan when `url` was already validated and extractHostname
        // returned it unchanged (same reference => identical string, still valid).
        !(urlIsValid && result.hostname === url) &&
        // Skip the re-scan when extractHostname already validated the host inline
        // (a confirmed-valid simple authority — see extract-hostname.ts).
        !extractedHostnameValidated &&
        !is_valid(result.hostname)) {
        result.hostname = null;
        return result;
    }
    if (step === 0 /* FLAG.HOSTNAME */ || result.hostname === null) {
        return result;
    }
    // Flag special-use domains, only when opted in (`detectSpecialUse`) and only
    // for the full `parse()` result (FLAG.ALL). Computed here, before the
    // public-suffix/domain early-returns below, so single-label names like
    // `localhost` (which have no registrable domain) are still flagged.
    if (step === 5 /* FLAG.ALL */ && options.detectSpecialUse) {
        result.isSpecialUse = isSpecialUse(result.hostname);
    }
    // Extract public suffix
    suffixLookup(result.hostname, options, result);
    if (step === 2 /* FLAG.PUBLIC_SUFFIX */ || result.publicSuffix === null) {
        return result;
    }
    // Extract domain
    result.domain = getDomain(result.publicSuffix, result.hostname, options);
    if (step === 3 /* FLAG.DOMAIN */ || result.domain === null) {
        return result;
    }
    // Extract subdomain
    result.subdomain = getSubdomain(result.hostname, result.domain);
    if (step === 4 /* FLAG.SUB_DOMAIN */) {
        return result;
    }
    // Extract domain without suffix
    result.domainWithoutSuffix = getDomainWithoutSuffix(result.domain, result.publicSuffix);
    return result;
}
//# sourceMappingURL=factory.js.map
;// ./node_modules/tldts-core/dist/es6/src/lookup/fast-path.js
/* harmony default export */ function fast_path(hostname, options, out) {
    // Fast path for very popular suffixes; this allows to by-pass lookup
    // completely as well as any extra allocation or string manipulation.
    if (!options.allowPrivateDomains && hostname.length > 3) {
        const last = hostname.length - 1;
        const c3 = hostname.charCodeAt(last);
        const c2 = hostname.charCodeAt(last - 1);
        const c1 = hostname.charCodeAt(last - 2);
        const c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 /* 'm' */ &&
            c2 === 111 /* 'o' */ &&
            c1 === 99 /* 'c' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'com';
            return true;
        }
        else if (c3 === 103 /* 'g' */ &&
            c2 === 114 /* 'r' */ &&
            c1 === 111 /* 'o' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'org';
            return true;
        }
        else if (c3 === 117 /* 'u' */ &&
            c2 === 100 /* 'd' */ &&
            c1 === 101 /* 'e' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'edu';
            return true;
        }
        else if (c3 === 118 /* 'v' */ &&
            c2 === 111 /* 'o' */ &&
            c1 === 103 /* 'g' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'gov';
            return true;
        }
        else if (c3 === 116 /* 't' */ &&
            c2 === 101 /* 'e' */ &&
            c1 === 110 /* 'n' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'net';
            return true;
        }
        else if (c3 === 101 /* 'e' */ &&
            c2 === 100 /* 'd' */ &&
            c1 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'de';
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=fast-path.js.map
;// ./node_modules/tldts-core/dist/es6/index.js



//# sourceMappingURL=index.js.map
;// ./node_modules/tldts/dist/es6/src/data/trie.js
// Auto-generated flat public-suffix trie. Do not edit.
const nodeFlags = /*#__PURE__*/ new Uint8Array([1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 0, 2, 2, 0, 2, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 2, 2, 0, 0, 0, 2, 0, 1, 1, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
const edgeStart = /*#__PURE__*/ new Uint16Array([0, 0, 0, 10, 11, 18, 106, 111, 117, 124, 130, 136, 145, 146, 147, 148, 149, 150, 151, 153, 154, 155, 157, 159, 228, 241, 243, 244, 245, 260, 267, 268, 271, 272, 273, 276, 278, 297, 298, 300, 309, 314, 331, 332, 335, 336, 338, 340, 376, 377, 379, 382, 383, 387, 389, 393, 396, 428, 431, 444, 445, 453, 454, 456, 466, 480, 481, 482, 483, 492, 493, 530, 535, 551, 571, 577, 619, 620, 647, 674, 675, 823, 829, 832, 833, 834, 839, 844, 853, 875, 876, 877, 878, 879, 880, 881, 899, 901, 902, 905, 907, 908, 910, 912, 927, 942, 947, 948, 950, 951, 952, 953, 954, 956, 959, 964, 965, 966, 968, 969, 972, 975, 976, 977, 990, 992, 1004, 1015, 1023, 1025, 1065, 1068, 1072, 1073, 1075, 1078, 1089, 1091, 1101, 1103, 1109, 1111, 1112, 1114, 1117, 1118, 1119, 1172, 1174, 1176, 1196, 1197, 1198, 1199, 1201, 1212, 1243, 1254, 1255, 1268, 1278, 1287, 1295, 1296, 1301, 1315, 1326, 1338, 1350, 1364, 1365, 1376, 1410, 1411, 1412, 1428, 1444, 1456, 1529, 1530, 1532, 1533, 1569, 1588, 1589, 1590, 1591, 1592, 1595, 1599, 1602, 1604, 1638, 1639, 1647, 1648, 1649, 1650, 1651, 1652, 1654, 1656, 1658, 1659, 1663, 1664, 1665, 1667, 1669, 1670, 1672, 1673, 1674, 1685, 1687, 1688, 1692, 1693, 1696, 1703, 1704, 1709, 1713, 1714, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1731, 1732, 1733, 2193, 2196, 2197, 2199, 2206, 2213, 2223, 2227, 2238, 2239, 2240, 2252, 2253, 2255, 2257, 2258, 2265, 2266, 2268, 2269, 2271, 2272, 2273, 2274, 2275, 2349, 2351, 2372, 2373, 2374, 2376, 2378, 2379, 2430, 2431, 2433, 2440, 2446, 2456, 2466, 2519, 2520, 2521, 2531, 2545, 2546, 2549, 2556, 2557, 2565, 2567, 2568, 2569, 2570, 2581, 2582, 2583, 2585, 2586, 2587, 2596, 2608, 2614, 2646, 2650, 2652, 2653, 2655, 2656, 2667, 2668, 2670, 2678, 2685, 2691, 2696, 2697, 2703, 2706, 2712, 2719, 2720, 2727, 2735, 2736, 2737, 2775, 2781, 2796, 2797, 2802, 2820, 2851, 2869, 2871, 2874, 2882, 2884, 2891, 2943, 2967, 2968, 2969, 2970, 2971, 2972, 2973, 2980, 2981, 2982, 2983, 2984, 2985, 2987, 2988, 2992, 3072, 3085, 3086, 3523, 3527, 3541, 3593, 3621, 3643, 3701, 3723, 3738, 3801, 3852, 3890, 3926, 3951, 4093, 4139, 4190, 4209, 4243, 4258, 4278, 4308, 4339, 4362, 4393, 4423, 4455, 4482, 4557, 4579, 4617, 4627, 4661, 4680, 4706, 4748, 4798, 4824, 4893, 4894, 4896, 4919, 4942, 4978, 5009, 5026, 5083, 5096, 5120, 5149, 5151, 5185, 5201, 5229, 5534, 5543, 5552, 5559, 5576, 5580, 5586, 5625, 5627, 5634, 5641, 5650, 5657, 5658, 5659, 5671, 5674, 5689, 5690, 5699, 5700, 5709, 5718, 5724, 5726, 5727, 5728, 5765, 5766, 5768, 5776, 5783, 5796, 5800, 5802, 5803, 5809, 5816, 5830, 5840, 5845, 5853, 5861, 5867, 5868, 5872, 5874, 5875, 5887, 5959, 5960, 5961, 5962, 5964, 5965, 5968, 5970, 5973, 5977, 5978, 5979, 5985, 5986, 5987, 5989, 5991, 5993, 5994, 5995, 5998, 6000, 6003, 6004, 6006, 6204, 6211, 6212, 6213, 6223, 6228, 6245, 6259, 6268, 6269, 6270, 6274, 6275, 6277, 6279, 6285, 6286, 6289, 6290, 6292, 6293, 6294, 7194, 7197, 7201, 7219, 7228, 7231, 7238, 7239, 7241, 7242, 7243, 7245, 7297, 7298, 7301, 7302, 7419, 7420, 7431, 7442, 7449, 7452, 7461, 7462, 7463, 7478, 7533, 7725, 7727, 7728, 7730, 7735, 7748, 7763, 7770, 7779, 7782, 7785, 7792, 7800, 7804, 7805, 7806, 7820, 7824, 7833, 7834, 7835, 7839, 7874, 7875, 7893, 7900, 7908, 7909, 7914, 7922, 7966, 7967, 7973, 7976, 7988, 7993, 7994, 7996, 7998, 8033, 8034, 8040, 8047, 8048, 8057, 8066, 8081, 8085, 8086, 8138, 8139, 8144, 8145, 8148, 8150, 8151, 8152, 8161, 8175, 8183, 8197, 8209, 8210, 8212, 8214, 8236, 8247, 8253, 8254, 8266, 8278, 8365, 8377, 8385, 8388, 8394, 8419, 8422, 8423, 8424, 8425, 8427, 8430, 8433, 8444, 8446, 8448, 8476, 8551, 8558, 8562, 8563, 8572, 8594, 8595, 8600, 8601, 8680, 8682, 8684, 8693, 8697, 8703, 8709, 8715, 8725, 8730, 8731, 8749, 8760, 8765, 8770, 8780, 8786, 8790, 8796, 8802, 10410, 10411, 10412, 10419, 10421]);
const edgeLength = /*#__PURE__*/ new Uint8Array([3, 3, 3, 3, 3, 3, 3, 3, 5, 8, 8, 2, 2, 3, 3, 3, 3, 3, 8, 5, 5, 5, 5, 5, 3, 3, 5, 5, 9, 12, 19, 8, 19, 8, 11, 9, 9, 8, 7, 7, 6, 8, 9, 16, 10, 7, 7, 11, 8, 6, 6, 9, 7, 11, 7, 14, 4, 4, 4, 4, 4, 4, 10, 7, 6, 6, 6, 6, 10, 10, 6, 10, 10, 22, 11, 9, 10, 10, 10, 9, 10, 8, 7, 7, 7, 8, 21, 13, 11, 11, 9, 10, 9, 13, 10, 8, 8, 9, 12, 9, 7, 10, 7, 7, 13, 7, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 6, 3, 3, 3, 3, 3, 3, 2, 5, 3, 3, 3, 7, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 7, 8, 5, 2, 2, 7, 2, 2, 1, 4, 1, 11, 9, 9, 5, 5, 8, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 5, 11, 9, 9, 13, 7, 14, 7, 6, 6, 6, 7, 6, 6, 6, 6, 6, 6, 10, 7, 11, 9, 4, 4, 4, 4, 4, 6, 6, 6, 6, 13, 6, 8, 7, 10, 9, 9, 7, 9, 8, 9, 8, 7, 10, 6, 9, 8, 10, 10, 7, 8, 1, 9, 10, 12, 12, 12, 10, 9, 9, 10, 10, 9, 9, 1, 1, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 4, 3, 3, 3, 7, 4, 4, 4, 3, 3, 6, 7, 3, 4, 1, 2, 2, 2, 6, 1, 2, 2, 2, 2, 2, 12, 5, 3, 8, 9, 13, 4, 4, 13, 9, 9, 11, 7, 3, 12, 9, 2, 2, 2, 3, 3, 3, 3, 3, 8, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 7, 10, 15, 15, 7, 15, 20, 15, 9, 10, 10, 12, 14, 14, 14, 12, 12, 12, 12, 12, 14, 14, 10, 10, 10, 10, 14, 9, 9, 9, 9, 10, 14, 14, 14, 13, 13, 14, 9, 9, 9, 9, 9, 9, 7, 8, 6, 8, 8, 6, 8, 13, 8, 8, 6, 13, 8, 11, 13, 8, 6, 13, 8, 6, 9, 10, 10, 12, 14, 14, 14, 12, 12, 12, 12, 14, 14, 10, 10, 10, 10, 9, 9, 9, 10, 14, 14, 11, 13, 13, 9, 9, 9, 9, 9, 9, 2, 6, 9, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 2, 3, 3, 3, 3, 3, 3, 7, 7, 2, 3, 2, 2, 5, 3, 3, 3, 3, 3, 3, 4, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 5, 7, 4, 2, 2, 12, 8, 10, 8, 10, 7, 18, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 3, 3, 3, 5, 5, 3, 8, 8, 6, 8, 6, 6, 4, 6, 7, 7, 7, 10, 11, 2, 5, 5, 3, 3, 3, 3, 3, 3, 5, 5, 6, 11, 10, 7, 7, 7, 4, 4, 4, 2, 3, 3, 3, 3, 3, 2, 2, 7, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 11, 7, 6, 9, 6, 6, 8, 10, 8, 6, 8, 13, 4, 4, 4, 4, 4, 10, 8, 11, 8, 8, 8, 10, 10, 7, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 10, 13, 7, 8, 7, 11, 8, 8, 6, 9, 8, 8, 6, 6, 6, 8, 8, 6, 6, 6, 6, 6, 9, 7, 6, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 9, 7, 8, 10, 8, 8, 2, 3, 3, 3, 3, 3, 2, 8, 9, 9, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 9, 2, 2, 3, 3, 3, 3, 3, 3, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 5, 5, 3, 5, 4, 2, 3, 2, 4, 3, 9, 2, 2, 2, 2, 2, 5, 5, 3, 8, 8, 13, 6, 10, 9, 4, 7, 9, 11, 2, 3, 7, 3, 3, 4, 1, 3, 4, 2, 9, 3, 3, 12, 5, 3, 7, 10, 10, 7, 4, 4, 6, 14, 7, 9, 7, 13, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 8, 15, 4, 4, 2, 3, 3, 3, 7, 4, 9, 9, 2, 3, 3, 3, 5, 3, 2, 2, 7, 2, 7, 6, 6, 7, 2, 4, 2, 2, 2, 2, 2, 2, 8, 8, 8, 9, 5, 2, 3, 3, 3, 3, 3, 3, 10, 7, 4, 4, 4, 4, 3, 4, 2, 3, 3, 3, 3, 3, 10, 7, 4, 4, 4, 4, 2, 3, 3, 3, 3, 10, 7, 4, 4, 4, 4, 3, 9, 6, 6, 6, 9, 13, 9, 2, 2, 2, 8, 7, 9, 5, 3, 3, 3, 5, 5, 13, 12, 9, 10, 7, 8, 7, 6, 8, 6, 11, 12, 7, 10, 4, 4, 7, 8, 11, 6, 7, 9, 8, 7, 10, 8, 9, 15, 7, 8, 5, 4, 7, 2, 3, 3, 3, 2, 14, 10, 2, 14, 10, 2, 14, 3, 9, 13, 13, 10, 14, 16, 17, 11, 2, 14, 2, 14, 3, 9, 13, 10, 14, 16, 17, 11, 14, 10, 14, 2, 7, 3, 10, 7, 14, 10, 2, 14, 10, 9, 9, 17, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 10, 10, 10, 12, 9, 4, 10, 10, 11, 8, 8, 8, 7, 9, 5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 8, 4, 4, 4, 4, 4, 4, 6, 16, 3, 3, 14, 3, 14, 2, 14, 9, 13, 10, 10, 14, 16, 17, 11, 6, 9, 10, 10, 12, 14, 14, 14, 12, 12, 12, 12, 14, 14, 10, 10, 10, 10, 14, 9, 9, 9, 10, 14, 14, 14, 9, 9, 9, 9, 9, 9, 2, 14, 9, 13, 10, 10, 14, 16, 17, 11, 6, 14, 2, 14, 9, 17, 13, 10, 10, 14, 17, 16, 17, 11, 6, 2, 14, 9, 13, 10, 14, 17, 16, 17, 11, 2, 14, 9, 13, 10, 14, 16, 17, 11, 2, 14, 9, 13, 10, 17, 16, 11, 17, 2, 14, 10, 19, 7, 2, 14, 9, 13, 10, 19, 10, 7, 14, 17, 16, 17, 11, 6, 2, 14, 9, 13, 10, 19, 7, 14, 16, 17, 11, 2, 14, 9, 13, 10, 10, 14, 17, 16, 17, 11, 6, 2, 14, 9, 13, 10, 10, 14, 17, 16, 17, 11, 6, 2, 14, 9, 13, 17, 13, 10, 10, 14, 17, 16, 17, 11, 6, 3, 2, 14, 9, 13, 10, 10, 14, 16, 17, 11, 6, 9, 10, 12, 14, 14, 14, 12, 12, 12, 12, 12, 14, 14, 14, 10, 10, 10, 14, 9, 9, 9, 9, 14, 14, 14, 13, 13, 14, 9, 9, 9, 9, 9, 9, 4, 11, 2, 14, 9, 13, 17, 13, 10, 19, 10, 7, 14, 17, 16, 17, 11, 6, 2, 14, 9, 13, 17, 13, 10, 19, 10, 7, 14, 17, 16, 17, 11, 6, 2, 14, 9, 13, 10, 19, 7, 14, 17, 16, 17, 11, 2, 9, 10, 10, 7, 17, 3, 3, 12, 12, 16, 15, 15, 12, 14, 14, 14, 20, 20, 13, 12, 12, 12, 12, 12, 12, 20, 25, 14, 14, 12, 12, 10, 10, 10, 10, 14, 9, 9, 9, 25, 4, 9, 17, 10, 7, 14, 16, 21, 13, 13, 14, 20, 14, 13, 17, 24, 9, 12, 13, 25, 13, 21, 20, 17, 9, 9, 9, 9, 9, 9, 12, 17, 4, 4, 9, 9, 9, 10, 10, 12, 14, 14, 14, 12, 12, 12, 12, 12, 14, 14, 10, 10, 10, 10, 14, 9, 9, 9, 9, 10, 14, 14, 14, 13, 13, 14, 9, 9, 9, 9, 9, 9, 9, 10, 14, 12, 12, 14, 14, 10, 9, 9, 9, 10, 14, 14, 14, 9, 9, 9, 9, 2, 1, 5, 8, 7, 11, 11, 1, 3, 3, 3, 5, 3, 3, 4, 8, 9, 10, 10, 12, 14, 14, 14, 12, 12, 12, 12, 14, 14, 10, 10, 10, 10, 14, 9, 9, 9, 10, 14, 14, 14, 13, 13, 14, 9, 9, 9, 9, 9, 9, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 2, 2, 6, 7, 6, 2, 3, 2, 3, 6, 2, 7, 6, 10, 7, 4, 9, 12, 6, 14, 4, 12, 7, 2, 2, 1, 2, 7, 6, 4, 4, 4, 6, 8, 8, 7, 2, 2, 13, 2, 2, 2, 2, 6, 2, 8, 12, 2, 7, 7, 6, 8, 10, 12, 2, 2, 2, 3, 3, 13, 2, 2, 3, 3, 6, 7, 6, 4, 5, 6, 3, 3, 3, 3, 4, 16, 8, 5, 4, 3, 3, 3, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 12, 7, 7, 13, 9, 10, 17, 12, 8, 9, 7, 17, 17, 8, 5, 12, 10, 13, 14, 5, 5, 5, 13, 5, 5, 5, 3, 3, 3, 5, 16, 5, 5, 5, 5, 7, 12, 14, 8, 12, 8, 10, 12, 9, 11, 7, 9, 7, 10, 7, 13, 9, 7, 12, 8, 17, 7, 7, 16, 10, 13, 13, 8, 10, 10, 14, 17, 7, 16, 16, 15, 8, 10, 10, 12, 17, 17, 7, 17, 14, 7, 10, 17, 8, 7, 7, 7, 8, 15, 15, 7, 14, 10, 10, 10, 11, 11, 7, 7, 13, 8, 10, 7, 16, 7, 8, 7, 14, 17, 12, 10, 11, 21, 8, 9, 7, 13, 9, 8, 6, 13, 6, 12, 7, 6, 13, 10, 10, 10, 8, 18, 9, 17, 13, 10, 12, 6, 13, 6, 11, 8, 13, 10, 13, 18, 13, 11, 13, 8, 16, 7, 10, 8, 16, 12, 10, 8, 8, 14, 11, 8, 15, 8, 8, 7, 7, 12, 7, 8, 9, 14, 15, 8, 9, 10, 9, 15, 7, 8, 8, 12, 13, 9, 10, 15, 13, 7, 10, 10, 20, 7, 6, 9, 6, 6, 14, 11, 14, 11, 12, 9, 10, 16, 16, 12, 7, 11, 28, 8, 11, 10, 7, 21, 8, 7, 9, 4, 4, 4, 17, 7, 8, 6, 9, 6, 6, 13, 6, 6, 6, 6, 18, 20, 14, 8, 11, 12, 9, 10, 13, 15, 15, 19, 8, 9, 12, 7, 10, 16, 12, 9, 9, 9, 14, 12, 11, 10, 9, 12, 11, 18, 9, 9, 9, 10, 7, 7, 16, 8, 9, 7, 13, 12, 10, 14, 18, 7, 8, 11, 7, 7, 8, 8, 13, 7, 7, 7, 11, 15, 13, 11, 7, 8, 15, 11, 7, 8, 18, 14, 13, 18, 15, 10, 12, 12, 9, 7, 11, 11, 8, 7, 10, 8, 14, 12, 10, 18, 7, 10, 9, 7, 8, 13, 10, 14, 10, 8, 8, 23, 7, 7, 11, 12, 12, 17, 7, 7, 11, 11, 17, 16, 16, 7, 8, 11, 14, 14, 8, 10, 7, 7, 16, 16, 13, 9, 11, 9, 15, 15, 11, 11, 7, 7, 14, 7, 9, 7, 7, 16, 10, 13, 10, 11, 14, 7, 11, 10, 11, 7, 11, 10, 11, 15, 11, 15, 10, 12, 10, 14, 13, 11, 11, 12, 13, 10, 7, 13, 10, 16, 12, 21, 15, 9, 10, 10, 7, 11, 14, 17, 7, 7, 8, 11, 13, 12, 8, 15, 14, 14, 8, 17, 12, 10, 10, 7, 9, 11, 7, 10, 7, 11, 18, 7, 11, 7, 12, 11, 8, 8, 14, 12, 7, 8, 15, 3, 7, 7, 5, 2, 9, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 5, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 5, 11, 6, 4, 7, 10, 7, 7, 11, 1, 10, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 7, 3, 5, 6, 3, 3, 5, 2, 2, 5, 3, 4, 13, 11, 3, 3, 6, 3, 5, 14, 2, 2, 3, 8, 2, 2, 12, 5, 18, 5, 3, 3, 3, 16, 5, 5, 5, 10, 7, 13, 12, 13, 9, 12, 14, 19, 9, 9, 21, 9, 9, 10, 6, 9, 6, 15, 10, 6, 12, 8, 6, 10, 15, 4, 4, 6, 6, 9, 9, 12, 16, 14, 23, 7, 7, 7, 14, 9, 7, 7, 11, 14, 10, 7, 10, 10, 10, 12, 6, 11, 10, 13, 11, 15, 11, 7, 12, 10, 3, 7, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 3, 7, 1, 5, 2, 2, 2, 5, 5, 5, 5, 3, 3, 3, 3, 3, 5, 5, 10, 9, 11, 8, 7, 12, 8, 9, 7, 6, 13, 11, 6, 13, 7, 9, 9, 4, 4, 4, 4, 4, 6, 10, 7, 8, 13, 8, 8, 9, 14, 7, 8, 10, 7, 7, 7, 9, 6, 9, 7, 2, 12, 5, 3, 3, 13, 4, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 2, 2, 5, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 1, 7, 6, 4, 12, 3, 3, 3, 3, 3, 8, 7, 3, 3, 3, 3, 3, 3, 4, 4, 11, 15, 14, 2, 8, 3, 5, 5, 8, 10, 8, 6, 4, 7, 17, 7, 4, 5, 2, 6, 3, 2, 2, 12, 5, 5, 3, 15, 13, 8, 11, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 3, 3, 3, 3, 4, 18, 2, 12, 5, 3, 3, 3, 3, 3, 5, 16, 8, 8, 9, 6, 6, 4, 4, 4, 4, 31, 6, 6, 10, 11, 21, 10, 9, 7, 10, 7, 7, 2, 4, 4, 4, 4, 6, 5, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 2, 2, 2, 5, 3, 3, 3, 7, 7, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 8, 2, 3, 3, 3, 3, 3, 5, 9, 11, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 5, 10, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 11, 10, 10, 10, 10, 10, 11, 10, 11, 10, 11, 10, 9, 9, 11, 3, 3, 3, 3, 3, 3, 5, 3, 7, 8, 8, 7, 6, 6, 11, 4, 4, 4, 7, 8, 9, 9, 2, 3, 7, 4, 4, 2, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 5, 5, 5, 5, 5, 3, 3, 5, 5, 5, 7, 7, 6, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 8, 8, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 6, 9, 12, 3, 7, 10, 7, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 8, 8, 6, 6, 8, 6, 7, 4, 4, 4, 4, 4, 4, 6, 7, 5, 5, 20, 19, 8, 10, 9, 7, 10, 6, 8, 11, 6, 6, 6, 6, 13, 12, 8, 6, 7, 14, 11, 9, 2, 5, 3, 6, 2, 3, 2, 2, 2, 2, 2, 2, 2, 5, 4, 3, 7, 6, 4, 7, 4, 3, 6, 4, 7, 2, 7, 7, 7, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 9, 10, 10, 11, 7, 8, 20, 7, 8, 9, 8, 12, 6, 6, 6, 8, 9, 8, 12, 6, 6, 8, 13, 10, 12, 6, 6, 7, 7, 9, 6, 4, 4, 4, 4, 4, 4, 10, 6, 6, 6, 7, 14, 11, 10, 7, 8, 10, 8, 11, 14, 11, 11, 9, 7, 9, 8, 11, 9, 17, 10, 9, 2, 2, 2, 9, 3, 3, 3, 3, 15, 14, 9, 5, 5, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 12, 22, 19, 17, 18, 18, 19, 21, 7, 16, 16, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 7, 16, 11, 11, 7, 7, 7, 7, 17, 7, 8, 12, 15, 9, 19, 7, 19, 8, 21, 11, 12, 19, 14, 22, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 16, 16, 19, 24, 12, 7, 14, 7, 12, 7, 8, 10, 10, 13, 7, 12, 12, 7, 7, 10, 18, 15, 12, 16, 7, 14, 12, 17, 10, 16, 17, 12, 17, 25, 7, 7, 7, 13, 6, 9, 6, 9, 18, 6, 6, 11, 20, 10, 6, 6, 6, 6, 6, 6, 17, 6, 6, 6, 15, 6, 6, 6, 6, 6, 8, 14, 11, 12, 11, 15, 13, 19, 17, 21, 7, 18, 8, 13, 13, 8, 12, 8, 6, 6, 13, 6, 15, 15, 16, 6, 6, 16, 6, 6, 6, 14, 6, 18, 6, 6, 6, 17, 18, 9, 13, 15, 8, 19, 8, 15, 15, 18, 14, 16, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 11, 10, 11, 6, 21, 23, 12, 17, 12, 11, 14, 13, 22, 15, 15, 11, 12, 14, 12, 7, 12, 8, 12, 14, 12, 18, 10, 8, 16, 19, 17, 12, 14, 15, 8, 19, 17, 12, 13, 13, 15, 18, 13, 23, 24, 23, 21, 17, 24, 8, 21, 8, 14, 14, 16, 20, 14, 8, 8, 15, 20, 8, 19, 21, 9, 8, 13, 12, 13, 15, 11, 8, 11, 9, 9, 8, 11, 8, 21, 14, 21, 15, 15, 13, 7, 19, 7, 7, 7, 7, 7, 7, 16, 12, 17, 18, 7, 7, 11, 11, 7, 9, 9, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 10, 10, 7, 9, 7, 7, 7, 6, 8, 6, 6, 6, 6, 6, 6, 6, 7, 6, 8, 6, 6, 9, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 8, 9, 8, 7, 8, 7, 8, 10, 7, 5, 5, 5, 5, 5, 5, 3, 9, 7, 7, 8, 6, 6, 6, 6, 6, 6, 6, 6, 9, 6, 6, 9, 11, 13, 7, 8, 9, 9, 5, 5, 5, 7, 8, 6, 6, 6, 6, 6, 6, 6, 7, 8, 9, 7, 10, 9, 10, 7, 8, 5, 5, 5, 5, 5, 5, 7, 7, 9, 8, 7, 7, 6, 6, 6, 6, 6, 6, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 10, 4, 4, 4, 4, 8, 7, 7, 10, 10, 9, 8, 8, 15, 9, 8, 8, 8, 8, 8, 9, 10, 9, 10, 7, 8, 13, 5, 5, 5, 5, 5, 3, 3, 7, 7, 8, 6, 6, 6, 4, 4, 11, 9, 7, 8, 9, 10, 7, 5, 5, 5, 5, 5, 3, 3, 7, 6, 6, 13, 7, 9, 8, 7, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 7, 8, 7, 8, 13, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 6, 6, 6, 6, 7, 6, 7, 6, 6, 9, 7, 4, 4, 4, 4, 4, 4, 4, 7, 8, 7, 8, 9, 8, 8, 8, 7, 10, 7, 8, 5, 5, 5, 5, 5, 5, 5, 5, 3, 7, 7, 7, 7, 9, 7, 10, 9, 6, 6, 6, 6, 6, 8, 8, 6, 6, 6, 7, 6, 6, 6, 9, 9, 4, 4, 13, 7, 10, 9, 9, 12, 7, 8, 8, 10, 8, 8, 8, 8, 8, 8, 5, 5, 5, 5, 3, 7, 7, 11, 7, 9, 8, 8, 6, 6, 10, 6, 8, 8, 8, 6, 7, 6, 6, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 8, 8, 16, 8, 9, 8, 7, 5, 5, 5, 5, 5, 3, 3, 7, 7, 7, 10, 15, 8, 9, 8, 9, 9, 6, 6, 6, 6, 6, 6, 7, 4, 8, 7, 8, 8, 7, 8, 11, 8, 5, 5, 5, 5, 5, 3, 7, 7, 6, 11, 16, 7, 6, 4, 4, 4, 4, 9, 9, 8, 8, 8, 13, 12, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 7, 8, 8, 9, 13, 7, 7, 7, 9, 8, 8, 9, 12, 7, 12, 7, 12, 8, 7, 10, 12, 9, 9, 6, 6, 8, 8, 6, 6, 6, 6, 6, 6, 6, 9, 8, 9, 11, 8, 6, 6, 6, 6, 6, 12, 7, 6, 6, 6, 9, 7, 7, 6, 6, 6, 6, 6, 11, 9, 6, 6, 6, 6, 6, 7, 9, 4, 4, 4, 4, 4, 4, 4, 4, 9, 9, 9, 9, 7, 7, 7, 7, 7, 11, 7, 7, 8, 8, 8, 8, 8, 8, 9, 8, 9, 9, 7, 7, 11, 11, 7, 12, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 8, 13, 12, 8, 8, 8, 8, 7, 7, 7, 9, 5, 5, 5, 5, 5, 5, 5, 3, 3, 7, 7, 11, 7, 8, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 11, 6, 7, 9, 4, 4, 4, 4, 4, 4, 9, 9, 8, 9, 8, 8, 8, 7, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 11, 7, 7, 7, 9, 6, 6, 11, 8, 10, 6, 6, 6, 12, 8, 8, 7, 6, 6, 8, 7, 4, 4, 4, 4, 4, 4, 4, 4, 9, 10, 9, 9, 8, 10, 9, 11, 8, 5, 5, 5, 7, 6, 6, 8, 7, 4, 4, 4, 4, 8, 7, 7, 8, 7, 8, 8, 5, 5, 5, 5, 7, 7, 8, 8, 8, 6, 6, 6, 6, 6, 10, 8, 9, 13, 6, 7, 6, 6, 8, 7, 8, 4, 4, 4, 4, 11, 8, 8, 8, 10, 5, 5, 8, 7, 8, 13, 8, 7, 6, 8, 6, 9, 7, 8, 7, 5, 5, 5, 5, 5, 5, 3, 3, 7, 8, 9, 6, 4, 8, 10, 10, 8, 12, 9, 13, 2, 7, 5, 5, 5, 5, 5, 7, 7, 10, 6, 6, 6, 6, 6, 6, 6, 8, 4, 4, 9, 8, 8, 8, 14, 8, 8, 8, 9, 8, 5, 5, 5, 5, 5, 3, 3, 9, 6, 6, 6, 6, 10, 12, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 11, 8, 7, 8, 8, 8, 5, 5, 3, 3, 3, 3, 7, 7, 6, 8, 6, 8, 11, 7, 6, 6, 6, 7, 4, 8, 11, 9, 10, 5, 5, 5, 3, 3, 3, 7, 7, 8, 9, 8, 15, 9, 6, 6, 6, 6, 6, 6, 11, 11, 4, 4, 4, 4, 4, 7, 9, 9, 10, 8, 7, 5, 5, 5, 5, 5, 5, 3, 3, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 7, 4, 4, 4, 4, 4, 9, 9, 8, 8, 10, 13, 5, 5, 5, 3, 17, 7, 7, 7, 7, 7, 8, 6, 8, 13, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 9, 10, 8, 8, 8, 5, 5, 5, 5, 3, 7, 7, 7, 8, 8, 6, 6, 6, 8, 8, 8, 9, 10, 8, 4, 8, 10, 9, 8, 8, 8, 9, 13, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 7, 8, 9, 9, 7, 7, 7, 10, 9, 9, 8, 9, 8, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 12, 6, 6, 6, 6, 6, 6, 6, 6, 6, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 11, 8, 8, 9, 9, 10, 8, 9, 7, 7, 5, 5, 5, 5, 5, 5, 3, 7, 8, 7, 6, 6, 8, 6, 6, 10, 4, 7, 8, 9, 12, 8, 7, 7, 5, 5, 5, 5, 5, 5, 3, 3, 7, 14, 7, 9, 8, 8, 6, 6, 8, 12, 12, 6, 6, 7, 7, 10, 4, 4, 4, 4, 4, 9, 9, 14, 9, 13, 8, 7, 5, 5, 5, 6, 6, 6, 7, 4, 8, 7, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 7, 7, 7, 8, 6, 6, 6, 6, 6, 6, 12, 6, 6, 6, 6, 4, 4, 9, 9, 8, 8, 11, 7, 7, 7, 5, 5, 5, 3, 9, 8, 6, 6, 7, 4, 4, 4, 4, 4, 4, 8, 8, 11, 5, 5, 5, 7, 7, 7, 9, 6, 6, 6, 6, 6, 6, 9, 8, 4, 4, 4, 4, 7, 12, 9, 8, 8, 8, 7, 10, 10, 5, 5, 5, 5, 5, 5, 5, 3, 11, 14, 8, 7, 8, 8, 6, 6, 6, 6, 6, 8, 7, 6, 6, 6, 7, 6, 8, 9, 4, 4, 4, 7, 8, 9, 7, 9, 7, 7, 9, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 3, 9, 7, 7, 12, 14, 8, 6, 6, 12, 11, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 15, 7, 4, 4, 4, 16, 9, 9, 9, 8, 9, 9, 9, 9, 9, 8, 8, 8, 13, 11, 8, 5, 5, 5, 5, 3, 7, 6, 6, 8, 8, 8, 6, 6, 7, 10, 7, 4, 4, 4, 4, 9, 7, 8, 7, 7, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 7, 7, 7, 9, 6, 6, 6, 6, 6, 8, 8, 7, 7, 9, 6, 6, 6, 7, 6, 6, 6, 6, 6, 15, 4, 4, 4, 4, 4, 8, 8, 7, 8, 12, 9, 8, 8, 8, 8, 8, 9, 8, 8, 10, 8, 8, 8, 8, 16, 9, 10, 2, 5, 5, 5, 5, 5, 5, 5, 9, 7, 6, 8, 9, 4, 4, 4, 4, 4, 7, 8, 8, 8, 9, 8, 11, 10, 5, 5, 5, 5, 3, 7, 8, 6, 6, 6, 6, 6, 8, 6, 6, 6, 6, 4, 12, 10, 12, 7, 7, 7, 7, 7, 7, 7, 5, 5, 5, 5, 3, 3, 7, 7, 10, 8, 9, 7, 6, 10, 7, 6, 6, 4, 4, 8, 9, 7, 9, 9, 9, 9, 8, 8, 8, 8, 10, 5, 5, 5, 5, 5, 5, 8, 7, 6, 6, 6, 10, 6, 7, 10, 7, 4, 4, 4, 4, 4, 4, 4, 12, 9, 10, 7, 7, 10, 8, 10, 5, 12, 9, 6, 6, 6, 6, 6, 7, 6, 4, 4, 4, 10, 9, 9, 8, 7, 7, 5, 5, 5, 5, 5, 5, 3, 3, 13, 7, 7, 9, 7, 7, 7, 8, 9, 9, 7, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 13, 9, 15, 15, 4, 4, 4, 4, 4, 10, 10, 9, 8, 9, 8, 8, 9, 7, 8, 7, 8, 5, 5, 7, 6, 6, 6, 4, 4, 4, 7, 8, 11, 8, 5, 5, 5, 5, 5, 5, 5, 7, 6, 6, 6, 6, 6, 6, 9, 11, 10, 7, 4, 4, 4, 9, 8, 8, 5, 5, 5, 5, 5, 9, 9, 6, 6, 6, 6, 6, 6, 6, 9, 9, 4, 4, 4, 4, 8, 8, 8, 9, 9, 8, 8, 8, 13, 2, 4, 2, 7, 5, 5, 5, 5, 5, 5, 9, 9, 6, 6, 6, 6, 10, 8, 8, 8, 6, 6, 6, 4, 4, 9, 8, 10, 8, 9, 8, 8, 8, 9, 8, 8, 5, 3, 3, 3, 11, 6, 6, 6, 7, 6, 6, 6, 4, 4, 9, 8, 5, 5, 5, 5, 5, 3, 11, 8, 6, 6, 6, 6, 6, 9, 7, 4, 4, 14, 10, 9, 8, 12, 8, 8, 8, 11, 15, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 11, 11, 10, 10, 7, 7, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 7, 11, 7, 7, 11, 11, 7, 8, 9, 10, 7, 7, 9, 9, 9, 9, 7, 7, 10, 8, 13, 8, 8, 8, 8, 11, 10, 6, 6, 8, 10, 11, 14, 14, 6, 6, 6, 6, 6, 6, 9, 11, 7, 7, 6, 8, 12, 11, 11, 6, 6, 10, 6, 6, 6, 6, 6, 10, 7, 7, 6, 6, 11, 6, 6, 6, 11, 8, 9, 7, 6, 10, 11, 9, 10, 11, 7, 11, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 6, 6, 8, 9, 10, 9, 6, 6, 6, 10, 6, 6, 6, 6, 11, 10, 11, 10, 9, 8, 7, 7, 7, 7, 11, 14, 8, 10, 9, 9, 8, 8, 7, 11, 8, 8, 8, 11, 11, 10, 10, 9, 10, 8, 11, 10, 8, 11, 9, 12, 8, 10, 8, 11, 8, 9, 9, 11, 11, 10, 11, 13, 8, 7, 8, 8, 9, 7, 8, 8, 8, 8, 7, 8, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 3, 3, 3, 3, 3, 3, 3, 3, 8, 6, 4, 4, 4, 11, 7, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 3, 3, 3, 3, 8, 7, 7, 8, 8, 4, 8, 7, 7, 7, 9, 7, 8, 9, 8, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 2, 3, 3, 3, 3, 3, 3, 4, 5, 5, 3, 3, 8, 8, 6, 9, 4, 4, 10, 7, 3, 3, 3, 2, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 10, 2, 3, 3, 3, 3, 3, 3, 3, 4, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 5, 2, 4, 2, 6, 2, 2, 9, 5, 5, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 9, 8, 7, 9, 6, 6, 11, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 7, 7, 11, 8, 8, 6, 5, 11, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 2, 3, 3, 3, 3, 3, 3, 6, 4, 4, 4, 4, 3, 3, 3, 3, 5, 7, 2, 3, 3, 3, 3, 3, 8, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 4, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 6, 3, 3, 8, 10, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 8, 9, 10, 7, 7, 1, 14, 18, 13, 18, 13, 10, 10, 16, 13, 18, 16, 13, 16, 18, 13, 22, 16, 16, 16, 14, 21, 16, 9, 14, 16, 9, 9, 14, 10, 10, 14, 12, 14, 19, 12, 11, 18, 13, 17, 15, 15, 15, 15, 16, 14, 13, 19, 18, 15, 19, 18, 12, 18, 12, 11, 20, 14, 15, 10, 17, 17, 16, 19, 20, 21, 15, 13, 16, 15, 15, 15, 1, 1, 3, 8, 7, 7, 8, 8, 8, 1, 6, 1, 1, 6, 3, 3, 4, 7, 3, 3, 5, 5, 4, 4, 4, 4, 4, 2, 7, 7, 8, 12, 3, 4, 5, 1, 3, 4, 4, 10, 4, 3, 3, 3, 8, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 9, 20, 7, 5, 5, 5, 9, 13, 5, 5, 5, 5, 5, 3, 3, 3, 16, 5, 5, 5, 13, 7, 8, 8, 11, 8, 7, 9, 7, 11, 12, 9, 9, 8, 8, 11, 10, 14, 7, 12, 10, 11, 13, 7, 9, 11, 17, 17, 14, 13, 7, 8, 7, 10, 10, 7, 16, 13, 7, 8, 17, 12, 9, 8, 6, 7, 10, 6, 6, 12, 6, 8, 10, 8, 8, 8, 6, 8, 6, 14, 6, 6, 6, 13, 6, 10, 6, 6, 7, 14, 8, 6, 6, 10, 11, 10, 9, 9, 7, 7, 6, 6, 6, 9, 9, 7, 9, 10, 9, 13, 12, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 6, 8, 8, 6, 8, 9, 10, 9, 7, 10, 10, 8, 7, 8, 7, 10, 12, 9, 8, 15, 8, 7, 8, 8, 7, 7, 15, 13, 7, 10, 9, 14, 18, 16, 7, 24, 7, 8, 10, 11, 16, 8, 14, 7, 9, 9, 9, 13, 19, 14, 15, 14, 11, 7, 13, 9, 10, 7, 13, 9, 10, 11, 12, 8, 9, 2, 3, 5, 8, 7, 4, 4, 15, 10, 5, 3, 3, 3, 3, 3, 5, 4, 4, 4, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 12, 5, 3, 8, 10, 15, 6, 7, 2, 3, 2, 5, 5, 12, 2, 5, 5, 5, 5, 2, 2, 5, 5, 12, 9, 5, 2, 2, 9, 5, 5, 12, 12, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 12, 5, 8, 8, 9, 5, 5, 5, 8, 19, 7, 16, 15, 14, 9, 9, 9, 9, 7, 11, 11, 11, 7, 14, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 15, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 14, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 15, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 9, 12, 9, 9, 12, 12, 12, 15, 7, 11, 7, 14, 11, 18, 13, 8, 18, 15, 18, 12, 14, 12, 8, 8, 8, 8, 9, 9, 9, 12, 7, 10, 10, 8, 8, 12, 12, 12, 7, 12, 12, 9, 7, 7, 7, 7, 7, 8, 15, 12, 9, 10, 10, 7, 10, 10, 13, 11, 10, 9, 22, 11, 9, 8, 8, 8, 8, 8, 13, 18, 13, 9, 15, 19, 9, 7, 7, 10, 7, 7, 7, 11, 8, 13, 17, 7, 7, 10, 10, 10, 7, 20, 16, 7, 7, 7, 7, 7, 7, 11, 21, 12, 12, 13, 11, 14, 16, 8, 8, 13, 11, 7, 7, 13, 7, 7, 14, 15, 15, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 13, 10, 18, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 8, 8, 12, 12, 11, 11, 8, 12, 9, 9, 9, 13, 13, 9, 9, 9, 9, 9, 9, 6, 10, 12, 6, 6, 6, 6, 17, 11, 7, 7, 7, 7, 14, 14, 12, 6, 7, 7, 6, 6, 15, 10, 13, 10, 6, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 13, 9, 9, 15, 13, 6, 12, 12, 6, 19, 11, 10, 7, 7, 16, 8, 19, 17, 9, 9, 9, 9, 9, 6, 6, 6, 10, 8, 16, 8, 6, 6, 9, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 8, 6, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 6, 6, 6, 6, 20, 6, 9, 6, 14, 9, 9, 9, 6, 9, 8, 8, 12, 9, 8, 8, 8, 8, 7, 8, 12, 7, 8, 8, 8, 6, 8, 6, 6, 6, 6, 6, 6, 6, 9, 8, 8, 6, 6, 13, 9, 12, 13, 12, 14, 13, 12, 11, 11, 6, 8, 8, 8, 6, 13, 12, 11, 11, 12, 6, 11, 12, 11, 13, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 15, 6, 6, 6, 6, 6, 6, 6, 13, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 6, 18, 6, 12, 13, 13, 13, 9, 10, 15, 9, 12, 6, 6, 6, 6, 6, 6, 6, 6, 9, 15, 10, 9, 10, 13, 9, 19, 8, 18, 17, 10, 10, 8, 8, 6, 6, 6, 6, 6, 6, 10, 14, 8, 16, 16, 9, 8, 15, 8, 8, 10, 12, 14, 7, 7, 8, 8, 7, 7, 7, 7, 8, 13, 13, 11, 9, 9, 9, 12, 10, 17, 8, 11, 9, 7, 7, 14, 8, 14, 14, 7, 7, 7, 7, 7, 7, 14, 7, 7, 7, 7, 7, 10, 10, 8, 14, 7, 7, 7, 7, 8, 8, 8, 8, 8, 17, 9, 7, 15, 7, 8, 12, 7, 9, 14, 7, 7, 7, 9, 13, 8, 14, 7, 16, 18, 13, 15, 14, 12, 13, 10, 15, 9, 7, 7, 7, 10, 13, 15, 15, 9, 9, 9, 9, 19, 11, 7, 11, 11, 13, 8, 8, 8, 8, 7, 12, 19, 17, 9, 9, 13, 7, 7, 7, 9, 7, 7, 7, 12, 13, 15, 10, 8, 8, 14, 15, 12, 13, 13, 8, 12, 14, 7, 11, 7, 14, 15, 13, 12, 8, 8, 8, 8, 11, 13, 15, 15, 8, 13, 12, 8, 8, 8, 13, 10, 16, 14, 11, 8, 8, 12, 12, 9, 15, 15, 12, 12, 13, 8, 8, 9, 12, 13, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 12, 11, 7, 14, 7, 13, 13, 13, 12, 18, 16, 7, 12, 11, 10, 10, 15, 9, 9, 9, 21, 7, 7, 7, 11, 16, 8, 8, 11, 11, 7, 7, 7, 7, 7, 19, 7, 7, 7, 7, 7, 7, 7, 7, 7, 12, 8, 9, 12, 14, 11, 9, 9, 9, 22, 12, 3, 3, 4, 8, 8, 15, 4, 2, 2, 5, 5, 3, 3, 3, 3, 3, 3, 6, 6, 4, 4, 4, 12, 7, 10, 2, 3, 3, 3, 3, 3, 3, 3, 6, 7, 3, 7, 5, 14, 4, 4, 7, 8, 10, 4, 1, 3, 3, 6, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 2, 2, 5, 3, 4, 2, 2, 2, 2, 2, 2, 11, 5, 5, 5, 11, 5, 5, 3, 5, 5, 5, 5, 11, 14, 13, 9, 11, 9, 12, 8, 11, 11, 8, 11, 16, 9, 9, 7, 10, 9, 12, 8, 15, 6, 7, 6, 6, 13, 10, 8, 11, 8, 6, 6, 6, 12, 16, 6, 11, 7, 8, 9, 18, 6, 6, 9, 4, 4, 6, 13, 6, 6, 6, 6, 8, 8, 9, 16, 7, 7, 14, 7, 8, 8, 8, 7, 7, 7, 7, 7, 7, 15, 13, 7, 10, 7, 7, 10, 12, 16, 15, 7, 9, 9, 14, 11, 11, 10, 9, 10, 8, 12, 7, 8, 7, 7, 10, 12, 7, 12, 8, 7, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 5, 5, 5, 10, 4, 8, 7, 10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 7, 4, 5, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 8, 2, 2, 2, 8, 12, 7, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 7, 11, 9, 8, 8, 8, 7, 8, 9, 7, 7, 9, 7, 7, 7, 10, 7, 7, 10, 9, 10, 6, 6, 6, 6, 6, 6, 15, 7, 8, 9, 9, 8, 6, 6, 10, 9, 6, 8, 13, 9, 7, 6, 6, 6, 6, 6, 6, 12, 6, 6, 7, 6, 7, 6, 6, 6, 10, 10, 7, 6, 6, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 14, 6, 6, 7, 7, 9, 6, 6, 6, 6, 9, 9, 8, 9, 10, 9, 8, 9, 12, 7, 7, 7, 8, 7, 10, 12, 11, 9, 10, 7, 7, 7, 9, 10, 10, 8, 12, 9, 7, 7, 9, 8, 8, 8, 10, 7, 7, 8, 9, 9, 7, 7, 7, 8, 2, 4, 6, 3, 4, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 8, 6, 4, 7, 3, 3, 3, 3, 3, 3, 3, 12, 3, 3, 3, 3, 3, 3, 4, 4, 2, 3, 5, 3, 4, 7, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 6, 4, 3, 4, 2, 2, 2, 5, 3, 3, 3, 3, 3, 5, 4, 4, 4, 4, 7, 6, 8, 9, 2, 2, 2, 2, 3, 3, 3, 5, 7, 2, 3, 3, 8, 7, 7, 2, 2, 8, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 8, 8, 7, 7, 6, 10, 6, 9, 7, 11, 4, 6, 8, 8, 7, 8, 4, 5, 5, 5, 5, 3, 3, 11, 8, 9, 6, 6, 8, 7, 4, 4, 7, 8, 7, 2, 2, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 7, 2, 2, 5, 3, 3, 2, 3, 3, 3, 3, 3, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 12, 5, 5, 3, 3, 3, 5, 10, 12, 6, 15, 4, 6, 6, 7, 14, 9, 3, 3, 3, 3, 3, 8, 2, 2, 3, 5, 5, 3, 3, 3, 3, 3, 3, 8, 8, 8, 7, 5, 8, 4, 6, 11, 2, 2, 7, 3, 3, 2, 9, 8, 5, 5, 3, 3, 3, 5, 5, 7, 7, 6, 6, 10, 6, 8, 6, 8, 9, 7, 4, 4, 4, 4, 7, 6, 6, 7, 7, 10, 9, 8, 11, 8, 3, 3, 3, 3, 3, 4, 4, 2, 3, 3, 3, 3, 3, 7, 6, 2, 5, 6, 7, 6, 4, 8, 9, 11, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 5, 3, 3, 3, 3, 3, 9, 9, 6, 4, 8, 7, 7, 5, 9, 8, 6, 2, 8, 7, 8, 5, 5, 5, 5, 5, 3, 3, 3, 16, 8, 7, 7, 7, 8, 7, 7, 7, 7, 9, 6, 9, 6, 10, 7, 7, 7, 6, 10, 8, 9, 11, 11, 8, 4, 4, 10, 8, 8, 6, 9, 6, 11, 8, 8, 8, 15, 7, 8, 9, 5, 3, 3, 3, 3, 3, 5, 2, 2, 3, 8, 9, 10, 3, 2, 2, 2, 2, 2, 2, 3, 6, 4, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 2, 3, 3, 3, 3, 3, 3, 3, 11, 5, 3, 3, 3, 3, 3, 3, 3, 3, 6, 7, 4, 4, 2, 3, 3, 3, 3, 3, 3, 3, 3, 12, 7, 4, 12, 4, 6, 5, 4, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 11, 10, 6, 4, 6, 10, 8, 3, 3, 3, 3, 3, 3, 3, 3, 5, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 5, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 7, 8, 8, 7, 13, 12, 10, 10, 8, 8, 7, 7, 9, 12, 11, 6, 6, 8, 8, 9, 7, 7, 7, 10, 15, 10, 4, 4, 4, 4, 4, 11, 8, 8, 9, 7, 9, 14, 14, 12, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 12, 5, 5, 5, 11, 10, 7, 9, 3, 8, 7, 3, 15, 13, 11, 4, 4, 2, 2, 2, 19, 7, 5, 5, 3, 3, 3, 3, 3, 3, 3, 5, 22, 18, 6, 14, 17, 4, 4, 19, 16, 18, 2, 3, 3, 7, 2, 3, 2, 3, 3, 6, 4, 2, 3, 3, 2, 5, 3, 3, 3, 3, 3, 3, 3, 9, 9, 2, 3, 2, 2, 2, 3, 3, 3, 5, 7, 14, 7, 7, 12, 9, 13, 6, 11, 6, 10, 9, 7, 7, 8, 12, 12, 8, 8, 8, 10, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 8, 10, 7, 8, 11, 8, 12, 9, 4, 14, 7, 7, 9, 13, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 1, 2, 2, 3, 3, 3, 3, 3, 3, 5, 2, 2, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 4, 4, 4, 3, 2, 3, 3, 3, 3, 5, 2, 2, 2, 2, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 12, 9, 8, 8, 9, 8, 6, 17, 6, 6, 6, 8, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 4, 4, 8, 8, 9, 9, 9, 7, 7, 7, 7, 7, 7, 7, 9, 9, 9, 7, 8, 8, 8, 10, 7, 13, 10, 8, 9, 3, 3, 5, 13, 3, 3, 3, 3, 3, 7, 7, 6, 6, 10, 13, 11, 11, 8, 8, 9, 8, 9, 9, 10, 10, 10, 11, 10, 10, 13, 13, 16, 15, 11, 12, 9, 9, 10, 9, 11, 10, 9, 9, 14, 7, 8, 3, 10, 7, 7, 3, 2, 2, 2, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 7, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 11, 6, 7, 4, 6, 2, 2, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 6, 4, 4, 2, 2, 2, 3, 3, 3, 3, 4, 4, 6, 6, 6, 6, 5, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 11, 6, 10, 9, 12, 7, 7, 11, 14, 9, 7, 12, 3, 3, 7, 12, 11, 12, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 5, 5, 5, 5, 5, 5, 5, 5, 11, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 10, 3, 3, 3, 11, 3, 5, 9, 11, 8, 12, 14, 9, 7, 8, 7, 7, 11, 11, 7, 7, 10, 9, 8, 10, 9, 7, 7, 7, 7, 7, 7, 8, 8, 7, 11, 8, 8, 8, 7, 7, 10, 8, 7, 13, 12, 7, 17, 10, 8, 8, 11, 7, 11, 11, 14, 7, 11, 7, 8, 6, 9, 20, 8, 7, 9, 16, 7, 10, 6, 11, 10, 8, 9, 7, 16, 11, 11, 9, 8, 9, 8, 8, 8, 11, 8, 15, 8, 8, 9, 7, 8, 8, 11, 10, 7, 5, 7, 10, 10, 15, 7, 7, 7, 8, 7, 8, 8, 10, 11, 10, 10, 10, 11, 11, 7, 8, 6, 8, 8, 8, 10, 6, 8, 6, 6, 7, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16, 6, 15, 6, 7, 11, 11, 7, 9, 10, 11, 13, 10, 6, 16, 8, 10, 12, 11, 6, 6, 6, 6, 6, 6, 6, 10, 6, 10, 7, 7, 7, 11, 7, 11, 6, 6, 6, 6, 6, 6, 17, 7, 7, 6, 6, 12, 22, 6, 6, 6, 6, 6, 8, 6, 6, 6, 6, 7, 6, 6, 5, 6, 6, 8, 11, 6, 9, 14, 11, 9, 11, 7, 7, 8, 6, 6, 6, 8, 10, 9, 6, 6, 6, 6, 9, 7, 6, 6, 6, 6, 6, 15, 6, 4, 4, 4, 6, 4, 17, 8, 11, 6, 6, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 6, 10, 6, 10, 6, 6, 6, 6, 12, 8, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 6, 6, 6, 6, 18, 6, 6, 6, 8, 9, 10, 7, 8, 9, 10, 11, 7, 13, 6, 8, 8, 6, 6, 14, 7, 7, 7, 7, 10, 7, 14, 9, 6, 6, 9, 15, 9, 7, 14, 6, 11, 14, 13, 7, 12, 8, 7, 7, 7, 7, 7, 12, 7, 10, 9, 16, 6, 8, 6, 5, 17, 6, 8, 10, 4, 6, 4, 10, 15, 17, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 4, 4, 11, 7, 4, 4, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 19, 17, 6, 10, 11, 6, 6, 6, 6, 18, 6, 6, 11, 4, 4, 4, 5, 6, 6, 6, 9, 5, 6, 4, 6, 6, 4, 6, 6, 6, 6, 10, 6, 6, 4, 6, 6, 10, 6, 10, 6, 6, 6, 6, 11, 6, 6, 10, 6, 6, 8, 6, 6, 6, 8, 6, 11, 4, 11, 9, 10, 9, 11, 4, 8, 4, 11, 12, 7, 9, 8, 6, 7, 7, 8, 12, 12, 11, 13, 10, 11, 7, 7, 7, 9, 7, 11, 10, 7, 7, 7, 16, 11, 10, 11, 17, 9, 9, 8, 8, 7, 7, 7, 9, 7, 7, 7, 14, 7, 13, 9, 11, 10, 14, 10, 10, 12, 11, 10, 7, 10, 5, 14, 8, 8, 8, 9, 7, 8, 7, 7, 9, 8, 7, 8, 7, 7, 7, 7, 7, 7, 7, 11, 8, 10, 8, 7, 8, 14, 11, 8, 9, 9, 9, 8, 24, 10, 10, 12, 7, 7, 15, 11, 8, 8, 12, 11, 8, 9, 9, 7, 8, 9, 10, 11, 10, 11, 7, 12, 7, 7, 11, 9, 8, 14, 13, 12, 8, 11, 10, 8, 8, 7, 7, 14, 9, 10, 8, 9, 11, 7, 14, 8, 8, 13, 8, 8, 12, 7, 10, 14, 14, 11, 9, 10, 9, 9, 7, 7, 11, 11, 13, 9, 13, 5, 5, 5, 7, 9, 5, 11, 12, 14, 8, 7, 7, 11, 10, 9, 7, 8, 8, 7, 10, 11, 11, 5, 5, 7, 5, 5, 5, 7, 7, 15, 7, 7, 8, 7, 15, 12, 12, 10, 7, 8, 7, 11, 7, 7, 7, 23, 11, 8, 8, 11, 10, 7, 8, 11, 7, 19, 7, 7, 6, 9, 9, 9, 11, 3, 4, 7, 8, 6, 6, 4, 10, 8, 2, 2]);
const edgeChild = /*#__PURE__*/ new Uint16Array([0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 12, 1, 1, 1, 1, 1, 17, 1, 1, 1, 12, 1, 12, 1, 12, 13, 1, 1, 1, 1, 12, 1, 12, 1, 1, 1, 1, 1, 14, 21, 1, 1, 1, 1, 1, 1, 1, 19, 12, 1, 1, 1, 1, 1, 1, 1, 1, 20, 1, 1, 1, 16, 18, 1, 1, 15, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 22, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 24, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 12, 12, 12, 12, 1, 32, 0, 0, 0, 1, 1, 1, 1, 35, 34, 1, 1, 1, 1, 1, 33, 1, 1, 1, 1, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 39, 40, 0, 0, 0, 0, 12, 1, 1, 1, 12, 1, 1, 1, 43, 45, 45, 45, 43, 45, 43, 43, 44, 45, 43, 45, 43, 43, 43, 43, 43, 43, 45, 43, 43, 44, 43, 43, 43, 43, 45, 46, 46, 44, 45, 43, 43, 43, 43, 43, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 49, 51, 49, 49, 49, 51, 49, 50, 49, 52, 49, 50, 50, 49, 49, 49, 50, 52, 50, 52, 49, 50, 50, 12, 54, 54, 53, 55, 50, 52, 49, 49, 47, 48, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 59, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 66, 67, 12, 1, 1, 65, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 12, 1, 1, 1, 1, 89, 1, 91, 1, 1, 1, 1, 1, 1, 1, 1, 94, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 97, 97, 1, 1, 12, 1, 100, 1, 1, 1, 1, 1, 1, 1, 98, 1, 99, 1, 101, 1, 1, 1, 1, 1, 102, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 110, 111, 1, 1, 1, 1, 1, 1, 113, 113, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 121, 122, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 122, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 122, 1, 1, 1, 1, 1, 1, 1, 1, 1, 126, 123, 125, 120, 1, 124, 1, 1, 114, 1, 1, 1, 1, 117, 1, 127, 1, 1, 1, 1, 1, 1, 119, 1, 108, 1, 109, 1, 12, 128, 106, 112, 1, 1, 1, 1, 1, 107, 115, 1, 12, 12, 12, 118, 116, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 12, 12, 1, 1, 1, 1, 1, 12, 134, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 136, 1, 1, 1, 1, 1, 1, 1, 1, 137, 138, 12, 12, 135, 133, 45, 45, 140, 49, 49, 139, 142, 141, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 143, 0, 0, 0, 0, 1, 0, 144, 132, 1, 0, 1, 1, 12, 12, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 148, 147, 20, 1, 1, 12, 12, 1, 20, 12, 12, 1, 1, 1, 1, 1, 134, 1, 1, 152, 1, 1, 1, 1, 153, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 1, 136, 1, 1, 152, 1, 1, 1, 1, 153, 1, 1, 1, 134, 1, 1, 1, 152, 1, 157, 1, 1, 1, 153, 1, 1, 134, 1, 1, 1, 157, 1, 1, 1, 1, 1, 134, 1, 1, 1, 1, 1, 1, 1, 1, 134, 1, 1, 157, 1, 1, 157, 1, 1, 1, 1, 1, 1, 1, 163, 1, 1, 1, 152, 1, 1, 157, 1, 1, 1, 153, 1, 1, 163, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 136, 1, 1, 152, 1, 157, 1, 1, 1, 153, 1, 1, 134, 1, 1, 152, 1, 157, 1, 1, 1, 153, 1, 1, 134, 1, 1, 1, 1, 152, 1, 157, 1, 1, 1, 153, 1, 1, 1, 134, 1, 1, 152, 1, 1, 1, 1, 169, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 172, 1, 1, 163, 1, 1, 1, 1, 1, 152, 1, 1, 157, 1, 1, 1, 153, 1, 1, 163, 1, 1, 1, 1, 1, 152, 1, 1, 157, 1, 1, 1, 153, 1, 1, 163, 1, 1, 1, 1, 1, 157, 1, 1, 1, 1, 167, 159, 159, 12, 1, 12, 171, 1, 1, 1, 1, 1, 160, 160, 160, 154, 1, 1, 1, 158, 160, 164, 170, 1, 1, 1, 1, 158, 158, 1, 1, 156, 154, 167, 158, 162, 175, 166, 175, 1, 1, 173, 1, 166, 155, 158, 1, 1, 1, 1, 158, 1, 161, 1, 1, 1, 12, 1, 176, 1, 165, 1, 1, 1, 165, 164, 168, 174, 156, 167, 1, 1, 1, 1, 1, 1, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 179, 178, 178, 179, 178, 178, 178, 178, 180, 180, 178, 178, 179, 178, 179, 178, 178, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 182, 12, 1, 12, 12, 12, 12, 1, 12, 12, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 195, 1, 197, 198, 196, 195, 195, 1, 1, 201, 1, 202, 200, 1, 12, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 213, 195, 195, 195, 195, 213, 1, 1, 1, 1, 216, 217, 215, 1, 1, 1, 1, 1, 1, 219, 219, 1, 1, 1, 219, 219, 221, 222, 220, 1, 224, 1, 1, 1, 1, 12, 230, 231, 232, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 199, 203, 1, 1, 1, 1, 151, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 227, 1, 1, 1, 194, 1, 1, 1, 1, 238, 1, 1, 235, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 185, 210, 1, 1, 1, 206, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 192, 1, 1, 1, 1, 1, 1, 1, 211, 1, 1, 1, 1, 226, 1, 1, 1, 1, 177, 1, 214, 1, 209, 1, 1, 1, 212, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 190, 1, 12, 1, 1, 12, 1, 1, 1, 1, 193, 1, 1, 1, 208, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 239, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 225, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 184, 12, 1, 1, 1, 187, 12, 1, 1, 1, 1, 1, 1, 1, 229, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 186, 1, 1, 1, 1, 1, 1, 1, 234, 1, 1, 1, 191, 1, 1, 1, 207, 1, 12, 1, 223, 204, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 211, 1, 1, 1, 1, 189, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 181, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 205, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 236, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 237, 1, 1, 12, 1, 1, 1, 1, 188, 1, 1, 1, 205, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 228, 1, 1, 1, 1, 183, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 218, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 233, 1, 1, 12, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 249, 0, 0, 0, 0, 0, 250, 0, 0, 0, 0, 0, 0, 1, 12, 1, 1, 1, 254, 1, 1, 1, 0, 255, 252, 253, 1, 1, 1, 1, 1, 1, 260, 1, 262, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 258, 1, 1, 1, 1, 1, 264, 1, 1, 12, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 263, 1, 1, 1, 12, 1, 1, 1, 1, 259, 1, 1, 1, 257, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 261, 1, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 12, 1, 1, 1, 12, 1, 1, 270, 13, 1, 1, 1, 12, 12, 267, 268, 1, 1, 1, 1, 269, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 271, 1, 1, 12, 16, 1, 1, 1, 1, 1, 1, 272, 1, 1, 1, 12, 12, 1, 1, 1, 1, 1, 1, 272, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 281, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 285, 285, 1, 0, 0, 0, 0, 0, 1, 12, 0, 0, 0, 0, 0, 0, 0, 0, 178, 1, 290, 291, 1, 12, 1, 1, 1, 1, 12, 293, 1, 1, 292, 1, 1, 295, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 299, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 12, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 12, 0, 310, 0, 0, 311, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 59, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 335, 0, 0, 0, 0, 0, 0, 0, 0, 0, 337, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 353, 353, 354, 353, 0, 205, 1, 1, 13, 349, 1, 347, 0, 0, 0, 0, 0, 0, 0, 350, 1, 1, 355, 1, 235, 1, 1, 1, 1, 348, 1, 345, 1, 351, 1, 343, 1, 352, 1, 344, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 12, 346, 346, 1, 1, 1, 194, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 12, 1, 1, 1, 1, 342, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 358, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 295, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 398, 398, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 366, 377, 1, 1, 365, 400, 1, 371, 1, 1, 363, 395, 1, 1, 381, 362, 367, 1, 1, 1, 374, 405, 383, 1, 1, 1, 1, 1, 1, 384, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 393, 397, 0, 0, 79, 1, 1, 0, 391, 368, 404, 369, 372, 379, 1, 394, 0, 1, 0, 79, 388, 386, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 407, 1, 1, 378, 1, 79, 1, 0, 1, 1, 1, 410, 1, 0, 0, 79, 385, 0, 1, 364, 1, 1, 1, 0, 1, 1, 387, 1, 0, 1, 1, 1, 0, 1, 412, 375, 1, 1, 0, 1, 0, 0, 403, 0, 1, 1, 1, 79, 396, 1, 1, 392, 389, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 370, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 402, 0, 79, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 406, 1, 1, 1, 0, 0, 409, 0, 0, 0, 1, 382, 1, 0, 79, 408, 1, 0, 0, 0, 0, 411, 1, 1, 0, 0, 1, 0, 1, 0, 380, 0, 376, 0, 1, 1, 1, 0, 1, 1, 0, 399, 373, 401, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 12, 1, 1, 1, 12, 427, 427, 1, 1, 12, 12, 1, 427, 1, 1, 12, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 439, 1, 1, 0, 1, 1, 1, 1, 235, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 457, 457, 1, 1, 0, 0, 343, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 470, 1, 469, 1, 1, 1, 1, 1, 1, 1, 1, 1, 474, 1, 12, 12, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 482, 1, 1, 1, 484, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 481, 1, 476, 1, 1, 1, 1, 463, 1, 1, 1, 1, 1, 1, 1, 1, 477, 12, 1, 1, 1, 1, 483, 1, 1, 1, 478, 472, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 343, 1, 460, 1, 1, 12, 480, 1, 1, 343, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 465, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 483, 1, 1, 1, 1, 343, 1, 479, 1, 1, 1, 473, 467, 1, 1, 1, 1, 1, 468, 1, 485, 471, 1, 1, 1, 1, 1, 466, 1, 1, 1, 1, 1, 1, 1, 1, 1, 461, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 475, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 464, 1, 1, 1, 1, 1, 462, 1, 249, 486, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 12, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 492, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 12, 1, 67, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 496, 0, 496, 496, 496, 496, 496, 496, 496, 0, 496, 496, 496, 496, 496, 1, 496, 496, 496, 0, 496, 496, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 501, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 505, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 498, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 499, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 507, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 496, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 504, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 497, 0, 0, 508, 503, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 502, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 496, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 497, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 496, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 506, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 518, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 229, 229, 1, 522, 1, 1, 1, 521, 1, 1, 1, 1, 517, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 519, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 523, 1, 1, 520, 1, 1, 1, 1, 1, 1, 1, 1, 398, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 524, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 535, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 12, 1, 537, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 59, 1, 1, 12, 12, 12, 12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 556, 1, 1, 1, 1, 1, 1, 1, 557, 1, 1, 1, 1, 1, 1, 1, 555, 1, 1, 12, 1, 1, 559, 268, 1, 1, 12, 12, 1, 1, 12, 1, 12, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 563, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 569, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 132, 1, 12, 574, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 107, 1, 1, 12, 1, 1, 1, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 579, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 144, 1, 1, 1, 257, 1, 1, 12, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 604, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 249, 1, 354, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 609, 1, 1, 1, 1, 0, 611, 0, 79, 0, 610, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 12, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 618, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 613, 613, 0, 617, 615, 613, 613, 613, 613, 613, 619, 613, 613, 623, 613, 613, 613, 613, 613, 613, 613, 613, 613, 613, 620, 617, 613, 613, 617, 613, 613, 613, 613, 613, 613, 613, 613, 613, 613, 613, 613, 613, 615, 613, 613, 613, 613, 613, 621, 613, 613, 613, 613, 613, 613, 0, 0, 0, 1, 622, 1, 1, 1, 1, 616, 1, 1, 1, 1, 1, 614, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 12, 627, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 12, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 12, 1, 1, 12, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 64, 307, 333, 438, 565, 0, 4, 68, 265, 283, 309, 334, 360, 414, 440, 0, 529, 549, 566, 629, 9, 0, 60, 88, 424, 436, 456, 607, 0, 527, 548, 562, 644, 0, 30, 6, 0, 491, 530, 634, 592, 70, 0, 7, 312, 284, 415, 493, 443, 568, 79, 630, 0, 608, 336, 445, 495, 9, 105, 315, 536, 6, 30, 0, 338, 79, 417, 79, 513, 10, 6, 131, 277, 302, 0, 645, 539, 0, 595, 0, 63, 6, 6, 280, 95, 2, 459, 425, 437, 628, 0, 6, 0, 6, 313, 103, 6, 593, 531, 570, 0, 494, 416, 300, 314, 8, 71, 104, 631, 573, 418, 339, 327, 446, 146, 74, 317, 577, 540, 633, 596, 361, 356, 509, 6, 75, 149, 11, 0, 278, 552, 578, 597, 544, 582, 602, 643, 36, 6, 289, 322, 359, 331, 247, 30, 558, 585, 247, 41, 245, 294, 323, 332, 433, 450, 511, 301, 0, 73, 594, 0, 430, 444, 326, 79, 276, 79, 0, 612, 576, 534, 319, 448, 79, 419, 413, 0, 0, 0, 9, 587, 603, 246, 0, 451, 434, 561, 546, 605, 647, 85, 247, 42, 324, 422, 452, 601, 0, 541, 320, 303, 79, 244, 80, 28, 416, 30, 6, 420, 357, 330, 636, 624, 554, 581, 543, 0, 287, 81, 30, 432, 449, 0, 30, 453, 0, 248, 625, 547, 9, 435, 454, 247, 277, 86, 251, 626, 606, 589, 512, 455, 423, 279, 256, 87, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 652, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 441, 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 129, 0, 0, 84, 580, 0, 0, 0, 0, 0, 0, 0, 27, 0, 583, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 441, 0, 0, 0, 0, 533, 0, 286, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 321, 0, 0, 0, 0, 0, 0, 0, 649, 0, 0, 0, 0, 0, 648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 421, 0, 0, 0, 514, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 0, 0, 0, 525, 0, 0, 0, 0, 0, 0, 431, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 545, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 526, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 298, 308, 0, 0, 0, 0, 0, 560, 304, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 542, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 487, 0, 0, 0, 341, 0, 0, 0, 0, 0, 0, 282, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 600, 0, 0, 0, 0, 632, 551, 0, 0, 0, 0, 273, 0, 0, 0, 0, 0, 0, 489, 0, 0, 510, 0, 0, 0, 0, 0, 61, 0, 0, 0, 296, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 275, 0, 0, 0, 0, 0, 306, 642, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 651, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 0, 305, 0, 0, 0, 0, 0, 0, 599, 0, 0, 0, 0, 0, 0, 553, 0, 0, 0, 0, 0, 0, 0, 0, 0, 598, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 242, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 0, 532, 0, 0, 0, 0, 0, 586, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 516, 0, 515, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 288, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 488, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 316, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 567, 0, 0, 0, 0, 0, 0, 0, 0, 325, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 266, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 0, 638, 0, 0, 584, 0, 0, 0, 0, 0, 0, 0, 0, 0, 274, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 641, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 550, 0, 0, 0, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 528, 0, 646, 0, 0, 458, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 429, 0, 0, 0, 575, 0, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 29, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 318, 0, 0, 0, 243, 0, 0, 0, 0, 0, 0, 590, 0, 0, 0, 0, 130, 0, 0, 0, 0, 0, 591, 0, 0, 0, 0, 0, 0, 0, 441, 447, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 426, 0, 340, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 328, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 564, 0, 0, 0, 442, 0, 0, 428, 0, 0, 0, 0, 0, 0, 635, 0, 0, 0, 571, 0, 0, 90, 0, 572, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 538, 490, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 297, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 441, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 640, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 639, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 650, 0, 0, 0, 0, 0, 588, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 329, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 637, 0, 0, 241, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 655, 655, 655, 655, 655, 655, 655, 654, 656]);
const labelText = "orgmilcomschnetedugovdrrformsfeedbackofficialaccoorgmilschnetgovmagazinemediaunioncargopilotgroupcaarespressworksaerodromeworkinggroupair-traffic-controlaircraftaccident-preventioneducatormarketplaceambulanceinsurancecateringairportrepbodyenginesoftwaremodellingair-surveillanceconsultingchartertrainermaintenanceservicesdesignflightskydivingfreightassociationstudentgroundhandlingdgcafuelclubtaxicrewshowballooningexpresstraderbrokerauthoragentsairtrafficjournalistsafetyconsultantmicrolightaccident-investigationparachutingequipmentproductionfederationrecreationscientistnavigationengineertradingglidingleasingresearchpassenger-associationentertainmentparaglidinghangglidingaerobaticrotorcraftemergencycertificationgovernmentaeroclubexchangelogisticschampionshiphomebuiltcouncilconferencecontrolairlinecivilaviationjournalorgcomnetedugovcoorgcomnomnetobjofforgcomnetuwukiloappsframerorgmilcomnetedugovcoradioorgcomnetcommuneedogpbcoitgvorgedugov*spreviewfrontendrelayononstagingupid*mtls*privatelinktypedreamdeveloperbravemochawindsurfaivenmirenupsunwnextbegetngrokclerkwale2bwebcsbrunputerflutterflowspawnbaseshiptodaymagicpatternsnetlifyondigitaloceanrailwayhostedclaudehasurabotdashretoolvercelgithubluyanigadgetreplitcloudflaretelebitedgecomputeevervaultexponyatnoopencrpplxzeaburwasmerframerzeropsrocketpreviewconvexmedusajsspritesonherculeseasypanelstreamlitglideossnowflakemesserliloginlinehackclubcodepennorthflankbase44corespeedleapcellngrok-freeclerkstagelovableon-fleek*us-west-3ap-south-2us-central-2us-central-1eu-central-1ap-south-1us-west-2us-east-2eu-north-1ap-north-1us-west-1us-east-1*rcloudintsegorgmilcomgobbetnetintedugovturmusicasenasamutualcoopip6uriurnin-addre164homeirisgovdixdaemoncloudnssthwien*inexexkunden4accogvormymyspreadshop4lima2ixortsinfofuturecmsfuturehosting12hpprivfuturemailinglima-cityfunkfeuer123webseitednshomemelmyspreadshopcloudletswasantqldvicactnswtascatholicwasaqldvictasidwasantozqldorgcomvicasnactnetedugovnswtasconfcomairflowlambda-urltransfer-webapptransfer-webappairflowtransfer-webapptransfer-webapp-fipstransfer-webappeu-west-3ap-south-2eu-south-2eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3eu-central-1mx-central-1me-central-1ca-central-1il-central-1ap-northeast-1ap-southeast-1me-south-1af-south-1eu-south-1ap-south-1ap-southeast-7us-west-2eu-west-2ap-east-2us-east-2eu-north-1ap-southeast-2ap-northeast-2ap-southeast-5us-gov-west-1us-gov-east-1ap-southeast-6ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1privatenotebookstudiolabelingnotebookstudionotebooknotebook-fipslabelingnotebookstudionotebook-fipsnotebookstudio-fipsnotebook-fipsnotebookstudionotebook-fipsnotebookstudioeu-west-3ap-south-2eu-south-2eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3eu-central-1me-central-1ca-central-1il-central-1ap-northeast-1ap-southeast-1me-south-1af-south-1eu-south-1ap-south-1us-west-2eu-west-2us-east-2eu-north-1ap-southeast-2ap-northeast-2experimentsus-gov-west-1us-gov-east-1ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1onrepostsagemakercopporgmilcompronetintedugovbiznameinfoshoprsorgmilcomnetedugovbrendlyresolvenzauscotvstoreorgcomnetedugovbizinfoidacaicoittvorgmilcomschnetedugovinfocloudezproxysiteacmymyspreadshopkuleuvenwebhostingtransurl123websitecloudnsinterhostsolutionsddns5476103298edgfacbmlonihkjutwvqpsryxzbarsycoororgcomedumyftpno-iporxcloud-ipfor-somemmafanfor-morewebhopselfipjozidyndnscloudnsdscloudfor-thefor-betteractivetrailcoeconorestooteorgcomeconeteduassurmoneyafricaarchitectesrestaurantloisirstourismavocatsinfoagrounivcoorgcomnetedugoviatvdeportesaludtksatorgmilcomwebgobnetinteducienciaboliviarevistacooperativaempresanombreindustriamusicapatriamedicinademocraciapoliticapuebloindigenaplurinacionalarteblogwikiinfoagrotransportenoticiasprofesionalacademiaeconomiaecologiamovimientotecnologianaturalsimplesitecepesebamapadfmgalampbacscpirngorotomtrjspaprrprrsesmscepesebamapadfmgalampbacscpirngorotomtrjspaprrprrsesms*biaamfmtcmptvfeirasampajampanatalbelemananiradiog12medindfndbmdtrdthepoaggfjdfdefinfenflegsegongengcngorgzlgslglogppgmillelqslcimcomnomadmjabimbbibbsbabcrectecsjcetcpscpvhudieticriapipsiecnbiorioecogeoteoodoproatoartfstmatvetdetbetnetcntnotfotgrueduajuespappreptmpemparqsrvadvdevgovntrturagrjorfarjusmusdesvixxyzcozfozslzbhzmaringasantamariacampinagrandegoianiasorocabafloripasaobernardocuritibaboavistarecifeaparecidasaogoncasalvadorcuiabamorenamacapalondrinacontagemsocialfortalmaceioleilaoosascoriobranconiteroi9guacutcheblogflogvlogwikitaxicoopmanauspalmascaxiasjoinvillebaruericampinassantoandreribeiraoriopretoweorgcomnetedugovv0windsurfshiptodaycloudsitecoaccoorgnetgovofmilcomgovmediatechzacoorgcomnetedugsjgovmydnspenfnlabnbmbgcbcqconcontnuyksknsmyspreadshopno-ipawdevboxbarsyonidatemfuinabusavinstanceseceuguukussryzespawncsxcloud-ipmyphotosfantasyleaguetwmailcleverappsscrappingccwucloudnsftpaccessgame-serverccgovobjectsrmalpgcust*svcalp1aeappenginermalpgmyspreadshop4lima2ixsquare7cloudscale123websitefirenet12hpflowgotdnslinkyard-cloudcloudnslima-citydnskingobjectstorageedaccogoorusorgcomnetinteduaéroportxn--aroport-byaassogouvcomilgobgovcloudnses-1eu-west-1us-east-1euvipit1eurarubait1s3lbwebsites3websiteru-spbru-mskelasticcsrunstnukukcaukusnl-ams-1fr-par-1fr-par-2functionsnodess3ddlwhmrdbfnck8sifrs3-websitecockpitscblmgdbdtwhkafkpubprivs3ddlwhmrdbk8sifrs3-websitecockpitscblmgdbdtwhkafks3ddlrdbk8sifrs3-websitecockpitscblmgdbdtwhkafkk8sscalebookpl-wawfr-parnl-amsbaremetalsmartlabelinginstancesdechk2kuleuvenlaravelvoorloperurownoxazapscwhstgrvaporonline-serverobservablehqelementorantagonistreclaimjoteluluencowaydiademjelasticmatlabmagentositetrendhostingaxarnetjenv-arubajelejoteravendbemergenttrafficplexconvexkeliwebserveboltbegetcdnstaticson-rancherprimetelonstackitunison-servicesdnshomelinkyardbarsyjelecloudnscocomnetgovmycn-northwest-1cn-north-1s3s3-accesspoints3-websites3s3-accesspointrdsdualstacks3-deprecatedemrappui-prods3-websiteemrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apis3s3-accesspoints3s3-accesspointrdsdualstackemrappui-prods3-websiteemrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apicn-northwest-1cn-north-1cn-northwest-1ebcomputeelbcn-north-1airflowcn-northwest-1cn-north-1oncn-northwest-1cn-north-1amazonawssagemakeramazonwebservicesdirectasgdsdhehahljlnmhbacscahqhshhihnlnynsnmofjbjzjxjtjhkcqtwgsjssxnxjxgxxzgz網絡网络公司orgmilcomnetedugovxn--55qx5dcanva-appsxn--io0a7iquickconnectcanvasitekhsjxn--od0algcanva-codemyqnapcloudsrvrlessclustersrealtimestorageleadpagescarrdcrdorgmilcomnomnetedugovhidnssupabaserdpareplmypiumsoxmitotaplpagesfirewalledreplitowodevwebview-assetsvfswebview-assetss3s3-accesspointdualstackemrappui-prods3-websiteaws-cloud9emrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apicloud9eu-west-3ap-south-2eu-south-2eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3eu-central-1me-central-1ca-central-1il-central-1ap-northeast-1ap-southeast-1me-south-1af-south-1eu-south-1ap-south-1ap-southeast-7us-west-2eu-west-2us-east-2eu-north-1ap-southeast-2ap-northeast-2ap-southeast-5ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1s3s3-accesspointdualstackemrappui-prods3-websiteaws-cloud9emrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apicloud9consent-portals3s3-accesspointdualstackanalytics-gatewayemrappui-prods3-websiteaws-cloud9emrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9s3s3-accesspointdualstackemrappui-prods3-websiteemrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apis3s3-accesspointdualstackemrappui-prods3-websiteemrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apis3s3-accesspointdualstacks3-deprecateds3-websitebedrock-agentcores3-object-lambdaexecute-apibedrock-agentcores3s3-accesspoints3-websites3-accesspoint-fipss3-fipss3s3-accesspointdualstackemrappui-prods3-websites3-accesspoint-fipsaws-cloud9s3-fipsemrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9s3s3-accesspointdualstackemrappui-prods3-websites3-accesspoint-fipss3-fipsemrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apis3s3-accesspointdualstackemrappui-prods3-websiteaws-cloud9emrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9s3s3-accesspointdualstackemrappui-prods3-websiteaws-cloud9emrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9s3s3-accesspointdualstacks3-deprecatedanalytics-gatewayemrappui-prods3-websiteaws-cloud9emrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9vfss3s3-accesspointdualstackemrappui-prods3-websiteaws-cloud9emrstudio-prods3-object-lambdaemrnotebooks-prodexecute-apicloud9eu-west-3ap-south-2eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3eu-central-1mx-central-1me-central-1ca-central-1il-central-1ap-northeast-1us-northeast-1ap-southeast-1me-south-1af-south-1ap-south-1ap-southeast-7us-west-2eu-west-2ap-east-2us-east-2ap-southeast-2ap-northeast-2ap-southeast-5us-gov-west-1us-gov-east-1ap-southeast-6ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1mrapaccesspoints3s3-accesspointdualstacks3-deprecatedanalytics-gatewayemrappui-prods3-websites3-accesspoint-fipsaws-cloud9s3-fipsemrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9s3s3-accesspointdualstacks3-deprecatedanalytics-gatewayemrappui-prods3-websites3-accesspoint-fipsaws-cloud9s3-fipsemrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apicloud9s3s3-accesspointdualstackemrappui-prods3-websites3-accesspoint-fipss3-fipsemrstudio-prodbedrock-agentcores3-object-lambdaemrnotebooks-prodexecute-apis3eu-west-3ap-south-2eu-south-2computes3-ap-northeast-2elbrdss3-ap-east-1s3-sa-east-1s3-us-gov-west-1s3-eu-central-1s3-ca-central-1eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3s3-website-us-west-2s3-website-eu-west-1s3-external-1eu-central-1me-central-1ca-central-1il-central-1s3-us-west-1s3-eu-west-1s3-website-sa-east-1s3-website-ap-southeast-2ap-northeast-1ap-southeast-1s3-us-west-2s3-eu-west-2me-south-1af-south-1eu-south-1ap-south-1ap-southeast-7us-west-2eu-west-2us-east-2s3-website-ap-southeast-1s3-1s3-globals3-ap-northeast-3eu-north-1airflowap-southeast-2s3-us-gov-east-1s3-fips-us-gov-east-1s3-me-south-1s3-ap-south-1ap-northeast-2s3-website-us-west-1ap-southeast-5s3-eu-north-1s3-ap-southeast-1s3-website-us-gov-west-1compute-1s3-eu-west-3us-gov-west-1s3-website-ap-northeast-1us-gov-east-1s3-fips-us-gov-west-1s3-website-us-east-1s3-ap-southeast-2ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1s3-us-east-2s3-ap-northeast-1authauthauth-fipsauth-fipseu-west-3ap-south-2eu-south-2eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3eu-central-1mx-central-1me-central-1ca-central-1il-central-1ap-northeast-1ap-southeast-1me-south-1af-south-1eu-south-1ap-south-1ap-southeast-7us-west-2eu-west-2ap-east-2us-east-2eu-north-1ap-southeast-2ap-northeast-2ap-southeast-5us-gov-west-1us-gov-east-1ap-southeast-6ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1eu-west-3eu-south-2ap-southeast-3eu-central-1ca-central-1ap-northeast-1ap-southeast-1ap-south-1us-west-2eu-west-2us-east-2eu-north-1ap-southeast-2ap-northeast-2ap-southeast-5eu-west-1us-east-1ap-east-1sa-east-1csrframeservicesbuilderstg-builderdev-builder*ociocpocsazuregcpawsdemoinstanceeu-west-3ap-south-2eu-south-2eu-central-2ap-southeast-3ap-southeast-4ap-northeast-3eu-central-1me-central-1ca-central-1il-central-1ap-northeast-1ap-southeast-1me-south-1af-south-1eu-south-1ap-south-1ap-southeast-7us-west-2eu-west-2us-east-2eu-north-1ap-southeast-2ap-northeast-2ap-southeast-5us-gov-west-1us-gov-east-1ap-southeast-6ca-west-1us-west-1eu-west-1us-east-1ap-east-1sa-east-1previeweu-4us-4us-1eu-1us-2eu-2us-3eu-3appss3-websitekrkrobjectprivateobjectkrkrskrkrsobjectkrprivateobjectkr-privatecomputepaasrag-cloudrag-cloud-chjcloudjcloud-ver-jpcdemonodebalancermembersipeuxvsoncillaocelotonzayalilynxsphinxfentigercustomercaracalsgkrobjectstoragedesgkrusobjectkrkr-naverkr-naver-devkrprivatewebsiteobjectkr-naverkr-privatekr-naver-devjpjpkrjp4jp5s3-website-jpjpkrjp4jp5objectprivateobjecto365cloudstaticxendevapp001testcode-builder-stgplatformmediasiteprojedrydpagesjsx0desazacncoitrueu4uhkukgrbrushatenadiarymyspreadshopfrom-flfrom-wvwebspace-hosttheworkpchatenablogcursorusercontentservesarcasmapplinzisakuratanwixsitefin-ncloudstoragegov-ncloudstorageappchizigiizeis-into-carsdnsiskinkyadobeaemcloudis-a-therapistpgfogmyvncdojinis-an-actress1kappfldrvkozowqa2jpnmexprgmrfirewall-gatewaydynnscafjsfbsbxooguyfrom-gawoltlab-demois-a-anarchistwiardwebteaches-yogadattowebtb-hostinglive-websiteservegamegotpantheonfrom-nhsubsc-payfrom-ohvipsinaappfrom-cadyndns-officehomelinuxfrom-mahercules-appservebbsstreakusercontentfrom-okfrom-wyfastly-terrariumis-a-llamaqualyhqportalserveexchangeon-vaporvivenushopciscofreakgrayjayleaguesmetaaiusercontentfrom-iais-a-libertariansaves-the-whalestaveusercontentyolasiteoperaunitepoint2thisis-a-catererclaudeusercontentlinodeusercontentfrom-vagithubusercontentsells-for-lesshosteurcanva-appsplaystation-cloudddnsfreefrom-pafrom-prfrom-waddnskingoutsystemscloudhotelwithflightmydattois-a-nascarfanmydbserverminiserverdamnserverservehumouris-a-playerfrom-nvfrom-nmemergentagentgentappsamplifyappfrom-kyis-an-accountantnfshostserveircfrom-akpythonanywherestackhero-networkpostman-echolikescandydyndns-mailobservableusercontentserveftpfreeboxosfrom-utcdn77-storageamazonawsneat-urlnclouddyndns-serverlinodeis-a-teacherfrom-vtgleezemythic-beastsus1-pleniteu1-plenitla1-plenitpaywhirlservecounterstrikejdevcloudhealth-carereformis-into-animegoogleapisis-a-painterafricaisa-hockeynutatmetais-an-actora2hostedis-a-democratdatadetectest-le-patrondigitaloceanspacesis-a-designeris-a-hunterlinodeobjectstemp-dnsissmarterthanyoufrom-arsimplesiteevennodetownnews-stagingis-a-liberalgooglecodejelasticservemp3qualyhqpartnerdyndns-free1cooldnsest-a-la-masiondrayddnsdynuddnsfrom-orfrom-miis-a-bloggerfrom-himydobisscanvacodeis-an-engineerest-a-la-maisonupsunappdevinappswafflecellmyasustorwpenginepoweredfrom-ctservep2psame-appmyshopblocksthingdustdatalikes-piediscordsezis-with-thebandlpusercontentis-leetshopitsite3utilitiesis-a-personaltrainersinaappladeskis-a-cheflogoipselfipbase44-sandboxnospamproxyalibabacloudcsmesswithdnsauthgearappsiamallamawithgooglelutrausercontentmochausercontentframercanvasmytabitdyndns-homew-credentialless-staticblitzcpserverdiscordsaysis-a-nurseappspotatlassian-isolated-3premotewdfrom-mtwixstudiocode0emm180rmyactivedirectoryawsappsmytuleapdnsabrpolyspaceqbuserrenderbuiltwithdarkboutirgotdnsabrdnsdopaascanva-hosted-embedawsglobalacceleratorhomesecuritypcmyiphostditchyouripclever-clouddyndns-ipon-aptibleis-a-musicianhosted-by-filessecuritytacticsappspaceusercontenthomeunixstrapiappsame-previewcf-ipfsmycloudnaselasticbeanstalkis-certifieddontexistkasserverik-serverdrive-platformatlassian-3pfirebaseappncpstorageherokuappawsapprunnerbarsycenteris-a-cubicle-slaveservehttpmyshopifyis-a-guruquicksytessiiitesorsitesmagicpatternsappis-a-cpameteorappfrom-wiis-a-rockstarbumbleshrimpdattolocaldatabricksappsreadthedocs-hostedfrom-rifamilydsdyndns-picsplesknsbplaceddnsaliasdynaliasdyndns-remotedoomdnsip-ddnsblogdnsis-a-doctorroutingthecloudamazoncognitobarsyonlinedsmynasddnsgurucloudflare-ipfsdeus-canvasfrom-idsmushcdnpagespeedmobilizerdyndns-at-homeunusualpersonhosted-by-previderis-a-republicandyn-o-saurstreamlitappworkisboringonthewificprapidqualifioappis-uberleetis-slickgetmyipwpdevcloudtypeformdyndns-at-workgentlentapismynascloudw-corp-staticblitzfrom-ingeekgalaxyservebeerfrom-mdonrenderspace-to-rentaivencloudappspacehostedwafaicloudcodespotblogspotatlassian-3p-us-gov-modfrom-ndfrom-msis-a-techieis-a-studentcustomer-ociis-a-photographerdurumisfrom-ksmassivegriddyndns-wikiis-an-entertaineris-a-hard-workermysecuritycamerafrom-mnrackmazedyndns-blogis-a-bulls-fanwritesthisblogfreemyipsimple-urlfrom-sdreservdauthgear-stagingest-mon-blogueuris-into-gamesrice-labsxtooldevicesakurawebis-an-anarchistoraclecloudappsdyndns-worksells-for-urhcloudfrom-dcfastvps-serverwpmucdnis-a-geekscrysecfrom-txis-into-cartoonsmodelscapetrycloudflarelocaltonetstreak-linkbalena-devicesfrom-njforgeblocksfreebox-oswebadorsitefrom-ncdoesntexisthobby-sitestreaklinkshomesecuritymacownprovidertuleap-partnersdattorelaywphostedmailservequakeis-a-socialistservehalflifepivohostingdynuhostingquipelementsw-staticblitzdyndns-webfrom-deproject-studyaliases121is-not-certifiedhercules-devis-a-financialadvisoramazonlightsailservepicsis-a-greenloseyouripfrom-ilwithyoutubemwcloudnonprodwiredbladehostingdnsdojofrom-tnpixolinomyqnapcloudncloudstorageis-an-artisthostedpiis-a-landscaperauiusercontentoaiusercontenton-forgeis-a-conservativedreamhostersnet-freaksapps-1and1is-goneencoreapifastly-edgefrom-nesalesforcefrom-scdeployagentoraclegovcloudappsfrom-alis-a-lawyercechirevultrobjectsstufftoreadisa-geekddnsgeeklovableprojecttry-snowplowfrom-moblogsyteis-a-bookkeepernogmyforumravendbmyboxdeelementoredsaacficogoorinforgcomgobnatneteduidstoreorgcomnetintedudevnomepublorgcomneteduathgovtestscalculatorspaynowinfoquizzesresearchedcloudnsfunnelsassessmentsjscaleforcetmacltdorgmilcompronetgovbizpresseklogesrsccloudcustomfltusrcloude4corealmgovmunicontentproxy9metacentrumdyndyndyndnsdynpagespages-researchitionoccustomercomymyspreadshopipv64diskussionsbereich4limacomrub2ixfirewall-gatewayddnssspdnsbarsykeymachinesquare7myhome-serverspeedpartnercommunity-proschuldockxenonconnectgünstigliefernbwcloud-os-instancedyndnssecmy-routerxn--gnstigliefern-wobin-butterl-o-g-i-nisteingeekin-dslin-berlinin-brbfuettertdasnetzleitungsenin-vpnlcube-serverdyn-ip24logoipdyn-berlinruhr-uni-bochum12hpgoipsrvdnsfruskygit-repossvn-reposinternet-dnsgünstigbestellenhome-webserverxn--gnstigbestellen-zvbbplacedheimdnscosidnswebspaceconfiglima-citydyndns1istmeinvirtualuserschulplattformmy-gatewayddnsseclebtimnetztest-iservmein-iservvirtual-userhome64iservschuletaifun-dnstraeumtgeradeschulserverdynamisches-dns123webseitednshomehs-heilbronndnsupdaterbssgraphicdwadpdwdaepeweaawapaafpfwfabwbpbacwcpcciwebuserapiobjects*teamst3r2lpbravepanelngrokiservstglclcrmerpflypagesbarsyvivenushoplocalcertlocalplayerbearbloggatewaydeno-stagingis-not-ais-a-goodbotdashvercelmocha-sandboxplatter-appreplitgithubpreviewworkersinbrowserevervaultis-ahrsndenoxmitmodxmyaddrstorageapipayloadgrebedocruncontainersstgstagelclstageloginlineis-a-fullstackcodepenleapcellngrok-freeis-coolstoragewebharemediatechlibp2pdiscourseimaginecomyspreadshopstoreregbiz123hjemmesidefirmcoorgcomnetedugovsldorgmilcomwebgobartnetedugovtmorgpolcomsocartnetedugovassoagrondiscoodontk12medcuegyecpaabgengorgmilgalsaltulcomadmesmgobpubdocmonfindgnriouioproartlatvetnetfotedulojgovntrturibrbarxxxofficialbasechefprofmktgpsictechinfoarqtcontdentrrpppsiqgit-pagesritmedfieorgcomlibprieduaipgovriikmeactvsportorgmilcomscieunnetedugovnameinfopintouchtawktotawkmyspreadshoporgcomnomgobedu123miwebcomputeorgcomnetedugovbiznameinfocognito-idptransfer-webappeusc-de-east-1onjelasticnxaspdnsbarsydirectwpdeuxfleurstransurldogadoprvwcloudnsamazonwebservicesdnshomeuserpartycokoobinmkmfidymyspreadshopalandkapsiikixn--hkkinen-5wacloudplatformhäkkinen123kotisivuidacorgmilcompronetedugovbiznameinforadioorgcomneteduuserexperts-comptablestmmyspreadshopgretaprdcomnomynhccifbxoshuissier-justicenotairesaeroportfreeboxoson-webavocatassoportgouvkdnschirurgiens-dentistes-en-franceavouesfbx-os123sitewebveterinairechirurgiens-dentistespharmacienchambagrimedecinfreebox-osdediboxgoupilemszicpyicpvicppleysheezypagesedugovcnpyorgcomcybllcpvtnetedugovtnxonlineschooldaemond6atcopanelorgnetplybotdashstackitkaasorgmilcomnetedugovbizmodltdorgcomedugovcoorgcomneteduappwriteacorgcomnetedugovcloudtranslateusercontentorgcomnetedumobiassoorgcomnetedugovbarsysimplesitediscourseindorgmilcomgobneteduorgcomwebnetedugovguaminfonxhra教育敎育網絡网絡组織組織网络網络组织組织公司政府個人个人箇人ltdorgcomincneteduidvgovxn--uc0ay4axn--55qx5dxn--mk0axixn--io0a7ixn--uc0atvxn--zf0avxxn--lcvr32dxn--od0algxn--wcvs22dxn--gmqw5axn--od0aq3bxn--mxtq1mxn--ciqpnxn--tn0agxn--gmq050iorgmilcomgobneteduiservwp2tempurlmircloudfreesitewpmudevmyfastgadgetcloudaccessjelehalfboltfastvpsemergenteasypanelopencraftizcombrendlynamefromrtpersoadultmedorgpolrelcomproartnetedufirminfoassoshopcoopgouvtmcomediahotelforumvideosportorgsexagrargameslakaseroticaerotikatozsdereklamcasino2000filmsuliinfoboltshopprivnewsszexcityutazasjogaszkonyveloingatlaneacaicogoormyᬩᬮᬶmilwebschnetkopbizzonedesaponpesxn--9tfkymyspreadshopgovmytabittabitorderravpageaccok12idforgnetgovmuniltdplcaccotttvorgcomnetmeca6g5gpgamubacaicniocoukuptverdruscsdelhiindorgmilcomwebnicfingenpronetintedugovresbizbiharbarsyinternetbusinessschooltravelsupabasealumnigujaratfirminfoaeropostbankcoopindevscloudnsno-ipbarsybarrell-of-knowledgebarrel-of-knowledgensupdategroks-thisdnsupdatefor-ourknowsitalldvrcammittwalddynamic-dnsv-infowebhopselfipdyndnshere-for-moreilovecollegemayfirstforumzcloudnsmittwaldservertypo3servergroks-theeusekd1cdndyndnsidrawsainaueuapjpusstagemocksysdevicesclientcustreservdcustdevdisrecprodtestingcobeebyteutwenteboxfusebravepstmndedynngrokorgmilcomnomnetedugovqcxqzzbarsythingdustmo-siemensrb-hostingfh-muenstergitbookbluebitecloudbeesusercontentnodeartkiloappsforgerockdarklangresinstagingapigeebubbleb-datascryptedhypernodedappnodepantheonsitegitlabgithubkeeneticvirtualservercleverappshostyhostingon-rioedugitticketstelebitwixstudioon-k3sicp0icp12038jeleqotolairbubbleappsmyaddrstolosmyrdbxwebflowdrive-platformbeagleboardhasura-applolipopdefinimavaporcloudmusicianwebflowtestazurecontainerresindevicereadthedocsloginlineeditorxmoonscalesandcatsbasicserverwebthingsbrowsersafetymarkbeebyteappbitbucketidaccovistablogorgschnetgovxn--mgba3a4f16axn--mgba3a4fraarvanedgeايرانایرانjclaspeziapdudcefegelemeperetevebacanatavaparasabgagfgogrgpgalclblimfmrmcbmbvbfclcmcvcrcpcchlimifibicivipirisimncnbnanenrnpntnnolomobocoaogorosopotoptvtatctbtmtltotpusulunutpspapaqsvpvvvtvavvrtrsrprgrfrcrbrarorkrvstsssbscsmsispzczbzbozen-suedtirolmyspreadshopxn--bulsan-sdtirol-nsbxn--valledaoste-ebbtrentinoaltoadigetrentin-sued-tirolxn--forlcesena-c8axn--forl-cesena-fcbxn--bozen-sdtirol-2obtriestetrentinsuedtiroltrentino-s-tirollecceudineaostesienaparmaluccapaviagenoapaduaaostamonzaabruzzoternirietiturinmilanbozenlaziofermoleccocuneonuoropratola-speziavdataaligfvgpugmolcalcamlomumbsicpmnvenvaoedugovabrsarmaremrbastoslazibxosfirenzetrentinosüdtirolval-d-aostavalle-aostamessinacremonaravennatoscanatrentin-suedtirolbolognacalabriaurbinopesarofriuli-v-giuliaogliastraxn--valle-aoste-ebblaquilaandriatranibarlettasyncloudxn--valle-d-aoste-ehbaostavalleyvalled-aostatrentino-alto-adigevallee-d-aostexn--balsan-sdtirol-nsbpistoiasicilialucaniacataniaiserniaperugiabresciaveneziagorizialiguriaimperiabulsan-suedtirolbalsan-suedtirolbarlettatraniandriaxn--trentino-sdtirol-szbforlì-cesenatuscanyvallée-d-aostemantovavallée-aostecasertapiemontevalleaostaval-daostafriulivgiuliatrevisoforli-cesenavalléedaosteferrarapescaravald-aostatrentino-altoadigefriuli-vegiuliavallee-aostecarboniaiglesiastarantomediocampidanovalleedaostetrentinosud-tirolcampobassotrentinsüd-tiroltrentinosüd-tirolmonzabrianzatrentino-südtirolxn--trentino-sd-tirol-c3bpotenzacosenzavicenzaemiliaromagnavenicefrosinonemarchepordenonetrentinosued-tirolvaresemolisevalléeaostefriuli-veneziagiuliabasilicatalatinaanconasavonaveronamodenabiellabolzano-altoadigepugliafoggiaumbriatrentino-stirolgenovapadovamateranovararagusapiacenzatrentinostirolvalleeaostetempio-olbiasudsardegnatrentinsudtirolmassa-carrarafriuliveneziagiuliatrentinosuedtirolandria-barletta-tranitrapanixn--cesenaforl-i8amaceratacaltanissettaascoli-picenobrindisicarraramassacagliaririmininapolivibo-valentiachietibulsan-sudtirolbalsan-sudtiroltrentino-a-adigebulsanbalsaniglesiascarboniamilanotorinoteramodell-ogliastraarezzotrentinoalto-adigerovigotrentovenetoiglesias-carboniatrentino-sud-tirolaltoadigereggio-emiliareggio-calabriasardegnatranibarlettaandriapiedmontxn--sdtirol-n2amedio-campidanotrentino-süd-tirolfriuli-vgiuliafriuli-ve-giuliaromeennaromapisa32-b16-b64-blodiastibarineencomonaplesforlicesenailiadboxosalessandriasicilytrani-barletta-andriaxn--trentin-sdtirol-7vbpesarourbinotrentinsued-tirolcesena-forliforlìcesenaemilia-romagnamonzaebrianzaxn--trentinsdtirol-nsbtrentinos-tiroltrentinsüdtirolvalledaostaolbia-tempiocampidanomediovibovalentiasassarivalle-daostalombardysud-sardegnafriulivegiuliareggioemiliamonzaedellabrianzaalto-adigevercellitrentin-sudtiroltraniandriabarlettatrentino-sudtirolascolipicenobozen-südtirolfriulive-giuliaflorencexn--cesena-forl-mcbcarbonia-iglesiasaosta-valleycarrara-massadellogliastratrentinoa-adigexn--valleaoste-e7apesaro-urbinoxn--trentinosdtirol-7vbxn--trentin-sd-tirol-rzbxn--trentinsd-tirol-6vbtrani-andria-barlettatrentin-süd-tirolxn--trentinosd-tirol-rzbgrossetomonza-e-della-brianzasüdtirolreggiocalabriatrentinoaadigetrentin-südtirolverbano-cusio-ossolafriuliv-giuliaverbaniacampaniatrentino-aadigefriulivenezia-giuliasardiniaandriabarlettatranibarletta-trani-andriacatanzarooristanourbino-pesarocesena-forlìvalle-d-aostacampidano-medio123homepagesiracusatempioolbiasuedtirollombardiaavellinocesenaforlìtrentinofriuli-venezia-giuliabozen-sudtirolandria-trani-barlettabulsan-südtirolbalsan-südtirolmonza-brianzabolzanotrentino-sued-tirolbellunosalernolivornocrotonesondriodnshometrentinsud-tirolmassacarraratrentin-sud-tiroltrentino-suedtirolviterbobergamocesenaforliolbiatempiopalermobeneventoagrigentoofcoorgnetfmaitvphdengorgmilcomschnetedugovperagrikanieasukehandachitatokaiaisaikonanoharuamaobuhigashiuraowariasahiinuyamatobishimaiwakurashitarainazawatoyonegamagorimihamatoyotataharakariyayatomioguchikomakimiyoshinishiotokonamekiyosuchiryutoyohashiokazakiisshikikasugaikotakiratoeianjotogofusosetohazutsushimashinshirotakahamanisshinshikatsuhekinantoyokawaichinomiyatoyoakeodateogataakitaikawakyowahonjoogayurihonjonoshirokamiokakatagamimitanegojomeyokotekosakadaisenkazunonikahohonjyomoriyoshimisatohappoukamikoanihachirogatahigashinarusesembokufujisatokitaakitaitayanagiowanitakkomutsutsurutahirosakigonoheoirasetowadamisawanohejiaomorishingohiranairokunohehashikamitsugarushichinohehachinohenakadomarisannohekuroishisakaeisumiasahiotakiinzaiabikomatsudoyachiyomutsuzawakujukuriomigawakashiwatoganemihamanaritasakuranagaramobarahanamigawachoshishiroichoseikozakishisuikatorimidorichonankyonanfuttsuonjukufunabashinagareyamanodasosatakochuotohnoshourayasukimitsuyokaichibayotsukaidosodegauratateyamakamagayayokoshibahikariyachimatakatsuuratomisatokisarazukamogawaichikawanarashinoichinomiyashimofusaminamibososhirakoichiharaoamishirasatoikatahonaiainansaijoseiyoiyoozuuwajimaniihamanamikatamasakiuchikokihokutobetoonshikokuchuomatsuyamaimabarikamijimakumakogenyawatahamamatsunosabaeikedaobamasakaifukuiohionotsurugamihamawakasaminamiechizeneiheijikatsuyamatakahamaechizensoedaukihaomutaokawanishiogoribuzenonojosueumiokiotochikugosasagurisaigawamizumakishinyoshitomikurumekurateyamadakasuganakamamiyamanogatatakatahakataiizukakawaratagawakasuyaashiyainatsukimunakataminamitsuikishonaikurogifukuchikeisenhigashimiyakoshinguyukuhashiokagakiyamekogaongausuikahotohochuotoyotsumiyawakadazaifuhisayamatachiaraiyanagawanakagawahirokawachikujochikushinochikuhochikuzennamieotamaokumashowateneiiwakikoorinangoononishigoshimogoomotegomishimafukushimaasakawakagamiishishirakawaiitatefutabahiratayugawahanawakitakatakawamatakunimiyabukibandaihigashihironoyamatomiharuyamatsuriaizubangedatesomaaizuwakamatsuyanaizuaizumisatonishiaizuizumizakikitashiobarataishinkaneyamakoriyamainawashirotanagurafurudonosamegawasukagawaishikawatamakawaikedaogakitaruiginanenahashimahichisonakatsugawaibigawashirakawamizunamiminokamomitakekawauesekigaharatomikasakahogikitagatayamagatatajimianpachimotosuyaotsukakamigaharahidakanisekitokigujominogodoyorogifukasamatsutakayamawanouchihigashishirakawakasaharashimonitatsumagoichiyodakannakanrashowameiwakiryuotaoratomiokafujiokaitakuranaganoharahigashiagatsumatakasakishibukawaminakamikatashinatsukiyonokawabanumataannakaoizumimidorishintoisesakiuenoyoshiokakusatsutakayamanakanojonanmokutamamuratatebayashimaebashiotakekaitadaiwahongofuchukuietajimashobaramiharahatsukaichihigashihiroshimamiyoshikumanokurenakasakaseraseranishiasaminamifukuyamashinichionomichiosakikamijimajinsekikogentakeharaotobenanaeikedatohmaozoraobiraabirakyowaeniwataikibibaisharirebunerimohiroooketootarupippunishiokoppechitosefurubirahakodateshiranukakitahiroshimakushiroobihironanporoiwamizawaniikappukunneppufukushimanakasatsunaitoyourakuromatsunaiakabirakamisunagawashibechaurakawakamifuranonakatombetsuasahikawashimokawakayabeokoppebiratoriabashirisaromaatsumanumatahidakabifukamukawamikasahorokanaitoyotomisarufutsuhigashikawaishikarikitamiyoichiesashiiwanaitomariminamifuranoakkeshifuranotoyakoyakumootoineppushikaoishiraoinemuronayorohaboroashorobihororishirifujiutashinaihokutotakasuebetsuurausuassabukikonaishimamakinaiedatetoyabieinikiesanuryuoumuteshikagarikubetsuashibetsukimobetsuaibetsutobetsusobetsuembetsushimizuchippubetsurishirihokuryuhoronobeshintokutsubetsushibetsuhonbetsumombetsutsukigatakuriyamakoshimizushiriuchikutchanmurorannoboribetsukamishihorowassamushinshinotsukembuchiwakkanaikamoenaikiyosatotakinoueshikabesunagawafukagawanakagawatakikawakamikawahigashikagurahamatonbetsumatsumaemoseushirankoshishakotanimakanemashikeotofuketomakomaisandatambaitamiawajikasaiasagoshisoonoakoyashirotoyookaminamiawajiinagawafukusakitakasagokamigorikasugaharimayokawaashiyahimejiakashitaishiaogakisannantakinosumototakarazukanishinomiyashingugoshikinishiwakiyokatakaaioimikisayoyabukawanishiamagasakisasayamashinonsenkakogawaichikawakamikawatatsunotsukubaiwamaogawaasahisakaitokaioaraiitakobandodaigosuifuinaamikasumigaurakashimaomitamayachiyoshimodatetomobetoridehitachinakainashikisakuragawakasamayawaramoriyahitachiomiyanamegatayamagatahitachikamisuushikutakahagiibarakitonekoganakasowayukimihojosomitoryugasakishimotsumafujishirotsuchiurachikuseihitachiotashirosatotamatsukuriuchiharashikahakuinanaotsubatawajimakahokukawakitatsurugikaganominotosuzuuchinadakomatsuanamizunakanotohakusannonoichikanazawaiwateshiwafudaikawaimoriokaofunatohanamakikuzumakikitakamininohekunoheyamadayahabasumitaichinosekitanohatahiraizumirikuzentakatajobojiotsuchihironomiyakoiwaizumikarumaiichinohenodakujitonooshushizukuishifujisawamizusawakamaishikanegasakimannoutazukotohiraayagawazentsujihigashikagawauchinomikanonjisanukimarugamemitoyotakamatsutadotsunaoshimatonoshoakuneamamiizumihiokiyusuikinkoisasookouyamanakatanekagoshimakanoyaisenkawanabeminamitanemakurazakitarumizunishinoomotematsumotosatsumasendaioimatsudaayaseebinamiurazushinakaiodawaraiseharasagamiharahakoneaikawakaiseiatsugitsukuihadanoyamatoyamakitazamaoisochigasakininomiyayokosukakamakuraminamiashigarafujisawasamukawakiyokawahiratsukayugawaraokawaumajikochitsunootoyoakiinonishitosayasudahidakamiharasakawaniyodogawahigashitsunokagamigeiseisusakiotsukinaharisukumomurototosakamiochitoyotosashimizumotoyamanankokunakamurakitagawayusuharaogunichoyoukiasoutoozugyokutoamakusamifunetakamoriyamagaminamataminamiogunikikuchisumotoyamatonagasumashikiaraokumamotokamiamakusanishiharayatsushiroayabeseikasakyoideineujinakagyokameokakyotangokyotanabekyotambaminamiyamashiroyamashinatanabeyawatawazukaminaminantanmiyazuhigashiyamafukuchiyamakitamukokamojoyokizumaizuruujitawaraoyamazakinagaokakyokumiyamakawagoeinabeshimameiwaasahitaikiudonoisetsukisosakikuwanamihamamiyamasuzukatamakimisuginabarikumanokomonominamiisewataraitobakiwatakikihotadomatsusakayokkaichikameyamaureshinoishinomakishichikashukuohirataiwaosakizaohigashimatsushimashikamaiwanumashibataogawaraonagawakawasakiseminemarumoriminamisanrikukakudamuratawakuyatomiyanatoriwataritagajomisatotomekamirifushiroishimatsushimayamamotoshiogamafurukawahyugaebinotsunosaitoayakushimanobeokakitauramiyazakitakazakigokaseshiibamimatashintomikunitomikitakatakobayashikawaminamitakaharukijotakanabemiyakonojonishimeranichinankitagawakadogawamorotsukakisofukushimaminamimakisakaeobuseikedaogawamiasaokayaasahiotakiotarichinoinaomichikumakomaganechikuhokukaruizawayasuokaooshikaikusakaminamiaikitogakushimatsukawakawakamitateshinatakamorikitaaikishiojirimiyadahakubaiizunaiijimaiiyamamiyotasuzakayasakatoguraookuwanagawaminowahirayayamagataminamiminowafujimiomachisakakitakaginaganonakanosakuhokomoronagisoshinanomachiwadauedaiidaharasuwatomiachiaokianankisosakunozawaonsenagematsutakayamashimosuwamatsumotoyamanouchinakagawamochizukiazuminotatsunoobamaomuraseihiunzenosetofutsuikichijiwanagasakiisahayahasamisaikaikawatanasasebohiradokuchinotsugototogitsutsushimashimabarashinkamigotomatsuurayamazoekashibaikomakawaitenrioyodosangokoryoudaojiikarugayamatokoriyamatenkawakatsuragikurotakikawakamimiyakemitsuetakatorikamikitayamayamatotakadahegurishinjokanmakisakuraitawaramotogoseoudanarasoniandokawanishishimoichihigashiyoshinokashiharashimokitayamanosegawayoshinomintsivorytopazsakuragehirnsumomoaseinetopalmail-boxmokurenyoitamuikaojiyagosensanjoaganomyokoseiroagaomishibataniigatanagaokamurakamiuonumayuzawakariwatagamitainaitsunanminamiuonumatochioyahikojoetsuseiroukamosadoizumozakitokamachiitoigawasekikawakashiwazakitsubamemitsukekokonoesaikiusukibeppuusahimeshimakunisakihasamataketatsukumihitaoitahijikusuyufukujukamitsuebungoonobungotakadaibaraniimibizentsuyamaokayamakasaokahayashimayakagemaniwaakaiwamisakishinjotamanotakahashikibichuowakesojanagishookumenannishiawakurakurashikiasakuchisetouchikagaminosatoshotomigusukunakagusukuyaeseizenaurumaiheyaaguniogiminanjokinminamidaitokitanakagusukuyonaguniokinawaishigakikunigamiurasoekadenataramahiraraginozataketomishimojizamamitonakiitomanhigashimotobuyonabarugushikamionnanahanagohaebarukumejimakitadaitonakijinnishiharayomitanginowantokashikiishikawaikedasuitaminohizuminishisakaikananabenodaitoosakasayamayaokishiwadatadaokakaizukatondabayashichihayaakasakakumatorikadomasayamahigashiosakashijonawatehirakatataishimisakitajirihannansennankatanotoyonominatosettsuhigashiyodogawaibarakinosekitachuohigashisumiyoshifujiiderakashiwaraizumiotsutoyonakamatsubaramoriguchiizumisanoshimamototakatsukineyagawahabikinotakaishikawachinaganoyoshinogarikamiminearitaouchiimarihizenogikashimaariakekiyamafukudomikitagatakitahataomachigenkaikanzakinishiaritakyuragisagataratosutakushiroishikaratsuhamatamakouhokukawagoeyoshidasatteogoseirumaasakaurawaogawaniizaomiyayoriiotakishikihonjooganohannohanyuinasaitamaokegawaarakawayoshikawayokozehasudasayamahidakafukayachichibuiwatsukiryokamiyoshimikamiizumifujimiwarabiranzanmiyoshiminanoyashiosakadosugitomisatohigashichichibutodasokakukiyonokazoshiraokakasukabekounosukawajimatsurugashimamiyashirokitamotohatoyamamoroyamahatogayakumagayakawaguchinagatorokamisatomatsubushinamegawatokigawakamikawafujiminohigashimatsuyamakoshigayatokorozawas3isk01isk02ryuohkoseikonanaishorittotakashimamaibarahikonetorahimenishiazaikokagamokotoyasuotsukusatsunagahamamoriyamatoyosatotakatsukinotogawaomihachimanhigashiomiakagiunnanizumogotsuamayatsukakakinokimatsuehamadamasudahikawahikimiokuizumoyasugiyakumomisatotamayuohdahigashiizumookinoshimanishinoshimatsuwanoshimaneshimadafujiedayoshidashimodagotembaiwataatamikosaiyaizuitoizumishimahaibaramakinoharaomaezakikawanehonkannamisusonohigashiizufukuroinumazukawazufujiaraishizuokahamamatsushimizuizunokunimatsuzakimorimachiminamiizunishiizukikugawakakegawafujikawafujinomiyaujiietsugaoyamayaitaohiranikkoashikagakuroisokanumasakurashioyakarasuyamamotegiichikaikaminokawatochigihagamokanogisanobatonasumibunasushiobaranishikatautsunomiyaiwafunemashikoshimotsukeohtawaratakanezawaitanokomatsushimatokushimaichibaminamiaizumiwajikikainanmiyoshinarutomimamugiananmatsushigesanagochishishikuinakagawamachidachiyodakomaefussainagitaitochofufuchuomeotahigashiyamatotoshimaokutamaaogashimakodairaedogawaarakawahachiojishinagawatachikawashibuyasuginamihinodekiyosesumidaoshimanerimamitakahamuraadachinakanomizuhobunkyomegurominatokoganeihigashikurumekokubunjihigashimurayamamusashimurayamatamakitahinochuokotokatsushikakouzushimaogasawaraakishimakunitachishinjukusetagayamusashinohachijoitabashiakirunohinoharachizunanbukotouramisasawakasayonagokogehinoyazutottorinichinansakaiminatokawaharaoyabetairainamiasahinantoimizufuchutakaokakurobeyamadajohanatoyamatonaminyuzenfunahashinakaniikawanamerikawaunazukitogahimiuozufukumitsutateyamakamiichiiwadearidayuasainamitaijikatsuragiaridagawatanabemihamahidakakainankiminomisatoshingushirahamakamitondayurakozakoyagobokitayamawakayamakudoyamahashimotokushimotokozagawahirogawakinokawanachikatsuurarsuseroeoishidasagaeoguniasahinagaitendonanyoobanazawanishikawasakataohkuratozawamikawamamurogawayamagatafunagatatakahatashonaishinjokahokuiideyuzakawanishitsuruokakaminoyamayamanobeshiratakamurayamanakayamakaneyamahigashineyonezawasakegawamitouubeyuuabushimonosekitabuseoshimatoyotaiwakunihikarishunannagatohagihofukudamatsutokuyamashowadoshitsurunanbukoshukaiminami-alpsnirasakikosugeotsukioshinohokutominobuyamanashifuefukichuokofuichikawamisatoyamanakakonakamichitabayamanishikatsuranarusawafujikawahayakawafujiyoshidafujikawaguchikouenohara長野京都岐阜大阪三重群馬千葉滋賀佐賀奈良adednelgaccogogror秋田愛知高知埼玉沖縄栃木熊本岩手青森山梨新潟島根鳥取長崎香川宮城石川大分宮崎茨城山口兵庫山形徳島広島福島福岡岡山富山静岡愛媛福井東京xn--4it168dhatenadiaryxn--vgu402ckawaiishophatenablogcocottenamaste北海道penneehimeiwateversestabachibashigagonnagunmapermahaccaakitaosakauh-ohblushkochiaichifukuikuroncapooitigohyogotokyokyotopunyuthickcheap0t00g00j0mie2-ddaapyawjg0amfemsubxiiboomoobutchueekpgwrgrherskrboyrdyupperunderflierchipsmydnsheavyangryhippygirlyrulez神奈川鹿児島和歌山bambinaxn--nit225kokayamasaitamaxn--k7yn95exn--1lqs03nsapporoparasitelolipopmcxn--efvn9sniigatafukuokatokushimafukushimahiroshimakagoshimafakefurokinawaxn--8pvr4ucoolblogxn--0trq7p7nnkawasakinagasakimiyazakichilloutxn--8ltr62kxn--klty5xpeeweezombiecutegirlxn--rny31hxn--uuwu58axn--ntso0iqx3axn--djrs72d6uytoyamanikitanyantakagawamimozanagoyaboyfriendxn--2m4a15egreaterchowderegoismyamagatafashionstorexn--elqq16hxn--pssu33lsendaimiyagixn--rht27zpecoriaomorisaloonwatsonvivianxn--djty4knobushipigboatnaganopinokoxn--f6qx53asadistvelvetsecretxn--5js045dchicappayamanashiibarakidigickgirlfriendxn--1lqs71dmongolianxn--c3s14mxn--qqqt11mtochigixn--5rtq34kparallelo0o0mondkobesagabonadecaoitanarafoolkilldecimainhiholomosblokilociaoundopupugifutankcrapflopnooroopsmodsholyjeezstripperpepperbittershizuokaxn--rht3dkitakyushureadymadeicurusversusmatrixxn--rht61ehungryfloppygloomycrankyhandcraftedlittlestarxn--klt787dxn--kltx9awhitesnowsunnydaytottorilovepoptheshopbuyshopxn--5rtp49cxn--d5qv7z876cwebaccelxn--kbrq7oxn--4pvxsxn--1ctwolovesickkumamotocatfoodxn--tor131oyokohamawakayamatonkotsuxn--ehqz56nxn--uist22hxn--6btw5axn--kltp7dyamaguchifrenchkisspussycatxn--4it797kxn--uisz3gbabybluexn--zbx025dnetgamersxn--7t0a264ckanagawaxn--6orx2rishikawaxn--ntsq17ghalfmoonschoolbusjellybeanxn--mkru45iusercontentlolitapunkxn--32vp30hsakurastoragehokkaidoshimanecandypopbabymilksupersaleweblikeraindropbackdropwebsozaikikirarahateblodaynightmeneacsccogoormobiinfoaeusxxorgmilcomnetedugovorgcomnetedugovbizinfotmprdorgmilcomnomedugovassnotairespresseassocoopgouvveterinairemedecinpharmaciensorgnetedugovtraorgcomedurepgovmeneperekgacscaiiocogoitoresmshsseoulbusanulsandaeguc01milvkimmvchungnamjeonnamjeonbukeliv-dnsgyeonggijejueliv-cdnincheondaejeongangwongyeongbukgwangjuchungbukgyeongnameliv-apicoeduindorgcomembnetedugovorgmilcomnetedugovjcloudorgcomnetintedugovperbnrinfocooyorgcomnetedugovethipfscanvamypepethw3sstorachakeeneticjoinmcinbrowserdwebcyonnftstoragemyfritzaemewphlxachotelltdorgcomwebsocschngonetintedugrpgovassnomgacsccoorgnetedugovbizinfo123websiteidorgmilcomasnnetedugovconfidmedorgcomplcschnetedugovaccoorgnetgovpresstmassoirseproxaccosoundcasthoptocraftvp4c66orgnetedugovitsmcdirmyboxbarsyedgestacksynologylogintoopencloudnohostwebhopdiskstationi234tcp4hoocgroknoipprivmydsddnsdnsforlohmustransipdscloudfilegear-sgbrasiliafilegearframerbarsybarsyonlinecoprdorgmilcomnomedugovinforgcomnetedugovnameacprorgcomartnetedugovpresseinfoassoinstgouvorgnycedugovbarsydscloudjuorgcomnetedugovminisiteaccoororgcomnetgovorgmilcompronetintedugovbizmuseumnameinfoaerocoopaccoorgcomnetintedugovbizcooporgcomgobneteduorgmilcomnetedugovbiznameaccoorgmilneteduadvgovcoorgcomnetaltgovforgotherhiskeeneticispmanagernomassoprod5476132eastasiacentraluswesteuropewestus2eastus2pnortheurope-01newzealandnorth-01southindia-01southcentralus2-01norwaywest-01eastus2-01westus2-01australiaeast-01italynorth-01israelnorthwest-01swedencentral-01westeurope-01centraluseuap-01taiwannorthwest-01uaecentral-01northcentralusstage-01israelcentral-01mexicocentral-01canadacentral-01austriaeast-01germanywestcentral-01francecentral-01ukwest-01denmarkeast-01polandcentral-01eastus-01westus-01swedensouth-01eastus3-01westus3-01brazilsouth-01centralus-01francesouth-01australiacentral-01westindia-01uaenorth-01jioindiacentral-01canadaeast-01belgiumcentral-01spaincentral-01koreacentral-01chilecentral-01qatarcentral-01westcentralus-01eastus2euap-01norwayeast-01southafricanorth-01brazilsoutheast-01germanynorth-01switzerlandnorth-01switzerlandwest-01japanwest-01southafricawest-01japaneast-01eastasia-01indiasouthcentral-01taiwannorth-01centralindia-01uksouth-01southcentralus-01northcentralus-01eastasiastage-01indonesiacentral-01australiacentral2-01australiasoutheast-01malaysiawest-01koreasouth-01southeastasia-01southeastus5-01northeastus5-01jioindiawest-01rucdnwest1-usfra1-desandboxjls-sto1jls-sto3jls-sto2aglobalabglobalsslmapprodfreetlsmapvpslon-1lon-2ny-1fr-1sg-1ny-2paassnwebpaashostingjelasticnordeste-idcsocuserpagescwebfileblobservicebuscoreatlricnjsjelasticwebsitestoragesezagbinruhuukjptsmyspreadshopmynetnameakamaiorigin-stagingfrom-coipv64dynv6cdn77serveblogadobeaemcloudhicamsprytdnsupno-ipownipde5ovhicpfirewall-gatewaysytesmypsxbarsyusgovcloudapimyamazemyradwebakamaihdsaveincloudfastlylbfrom-lasubsc-paysquare7in-the-bandblackbaudcdnhomelinuxoninfernoctfcloudservebbsdns-dynamiccloudfrontakamai-stagingipifonyham-radio-opsenseeringclickrisingcommunity-profrom-nylocalcertgrafana-devedgesuite-stagingcloudflareanycasteating-organicatlassian-devmydattofeste-iplocaltotorprojectknx-serveredgekeycloudflareglobalcloudyclustercasacamserveftpakamaized-stagingakamaiorigindns-cloudmyeffectboomlabotdashbuyshousestwmailhetemlazure-mobilein-dslthruhereredirectmedynuddnsbouncemesupabaseluyanicloudappakamaicloudfunctionsdebiannhlfanpgafanstatic-accessin-vpnmysynologymafeloappudohomeftptrafficmanagersiteleafseidatmemsetcloudflarecloudaccesskeyword-onazure-apiis-a-chefdoes-itgets-itwebhopselfiphomeipkicks-assedgesuitewindowsserver-ontunnelmolemydissentscrapper-sitecloudflarecnuni5srcfggffiobbzabchrsndenodynuopikddnsvpndnsakadnselastxkinghostvps-hostfastlyhomeunixazureedgeshopselectdontexistmyfritzcloudjiffyalwaysdatasells-itsquaresbroke-itazurefddattolocalat-band-campmeinforumfamilydsazurestaticappsdefinimabplaceddnsaliasdynaliasnow-dnsblogdnsroutingthecloudendofinternetdsmynasakamaiedgemymediapcadobeio-staticakamaiedge-stagingakamaihd-stagingddns-ipprivatizehealthinsurancelive-onkrellianschokokeksmassivegridmysecuritycamerarackmazeserveminecraftfrom-azis-a-geekakamaizedmoonscaleoffice-on-theusgovtrafficmanageradobeioruntimeedgekey-stagingreserve-onlinechannelsdvrdnsdojousgovcloudappcdn77-sslapps-1and1podzoneazurewebsitesdynathomescaleforceyandexcloudvusercontentisa-geekcdn-edgescoaemalcesappwriteazimuthtlonarvobuiltwithrocketnoticeablestorecomwebrecnetperotherfirminfoartslgdloncogoiltdorgmilcolcomplcschgenngonetedugovbiznamefirmmobiacincoorgmilcomnomwebgobnetintedubizinfocomyspreadshopdemongovtransurl123websitehosting-clusterkhplaycistrongsnesosvalervålerxn--vler-qoaossandeheroysandeherøybøboheroyherøyxn--hery-iraxn--b-5gavalerbøboxn--b-5gasandesandexn--hery-iraxn--vler-qoavålerhåreålaahavaofsfvfhlolnlalrlhmfmtmahcostntbuåstrmreigersundmyspreadshopgálsáeidsvolltingvollgildeskalflorøvadsøvardøvanylvenxn--bhccavuotna-k7astrandaxn--kvnangen-k0axn--sknland-fxaxn--mosjen-eyarakkestadhyllestadnannestadvevelstadvaapstenordre-landsondre-landsøndre-landtjieltexn--vrggt-xqadsør-aurdalsor-aurdalheradstordmoldefordeførdeseljefedjeryggehemnexn--krehamn-dxasognegranesøgnebrynetjomevallebykletokkegiskedovretjømehobølvoldasaudatolgasømnaviknadønnasomnadonnatranafrananesnaraumasmolatrænafrænalesjasmølaørstaorstahitrafloraaukraloppafrøyarissasnasahalsagalsaromsaraisaráisafroyasnåsagronghobolfjelltydalårdalardalaskimharamkraanghkekråanghkesorumbarumhurumbærumsørummodumsálátbálátfrognbjugnvåganvagangulenskienløtenlotenstrynvefsnxn--merker-kuaskaunsveiobømlobomloskjåkvardoflorovadsosalatbalatsálatklæbuklabuselbubarduulvikskjakklepprisørxn--nttery-byaeflåeidflahofmilgolholsellomskifetvikdepvgsfhsaskerrisorhamarasnesåsnesrørosrorosxn--slat-5namasoynaroyvaroyluroydyroyaskoyradoyandoyrodoymeloyradøyandøyrødøymeløyaskøylurøydyrøymåsøyværøynærøyhoylandethøylandetdivtasvuodnalørenskoglorenskognesoddtangenxn--tjme-hraxn--smla-hraxn--stjrdal-s1aunjargalillehammerunjárgaxn--hamary-fyadavvenjargaxn--bearalvhki-y4a123hjemmesidegjerdrumxn--brnnysund-m8acxn--tnsberg-q1axn--mlatvuopmi-s4axn--snsa-roaxn--skierv-utaxn--brum-voatysfjordkvafjordeidfjordkvæfjordsongdalenmjondalenmjøndalenxn--gls-elackragerogáŋgaviikagangaviikasørreisasorreisasør-varangersor-varangerxn--risr-iraskiervaxn--frna-woaxn--trna-woakvinesdalleksvikleirvikrøyrvikroyrviksvelvikvenneslaevje-og-hornnessandnessjøenmarnardalvindafjordsandefjordenebakksnillfjordullensvangxn--trany-yuabrønnøysundnamsskoganaustevollxn--stjrdalshalsen-sqbnord-aurdalnord-frontrøgstadtrogstadgrimstadflakstadgjerstadxn--sandy-yuaxn--leagaviika-52bnore-og-uvdalvegarsheixn--rlingen-mxaxn--ggaviika-8ya47hvegårsheikarlsoykvitsoymasfjordenhamaroyinderoyosteroydavvenjárgasauheradguovdageaidnuxn--vre-eiker-k8abronnoysiellakkrødsheradkrodsheradkvinnheradbrønnøyxn--mtta-vrjjat-k7afxn--lrenskog-54akvitsøyvárggátkarlsøyosterøyinderøyhamarøybronnoysundxn--aurskog-hland-jnbbahccavuotnabáhccavuotnagiehtavuoatnastor-elvdalmidtre-gauldalxn--gildeskl-g0akarasjokevenassixn--bievt-0qaxn--yer-znalebesbynessebyxn--hbmer-xqamalselvmålselvxn--unjrga-rtamøre-og-romsdalmore-og-romsdalhareidmelandørlandorlandstrandålgårdsolundalgardafjordåfjorddielddanuorrikautokeinoxn--stre-toten-zcbskodjeaejriestangeliernebamblestokkefauskesnåasesnaasekongsvingerlangevagberlevagxn--flor-jrahattfjelldalostre-totenøstre-totenvestfoldxn--mely-iraálaheadjualaheadjunordreisaxn--troms-zuaxn--lgrd-poacporsangerflatangerstavangerleikangerbremangersamnangergieldakarasjohkaxn--rdy-0nabfrostautsirasnoasatromsaxn--sr-aurdal-l8aflekkefjordjølsterjolsteraremarkhedmarknååmesjevuemienaamesjevuemiexn--vard-jrarollagmeråkermerakerorskogørskogxn--bdddj-mrabdákŋoluoktaxn--osyro-wuaaknoluoktatrysilskjervøymandaljondalbindalrindalmeldalsuldalorkdalsigdalalvdallærdalhurdalsirdalverdallerdallardaloppdalåseralaseralhadselkragerødivttasvuotnaoverhallasteinkjerxn--hnefoss-q1askedsmokorsettromsøxn--dyry-iravestre-totenmuseumxn--sandnessjen-ogbrahkkeravjufylkesbiblbájddarbajddarxn--laheadju-7yarennesøyxn--koluokta-7ya57hxn--hgebostad-g3aleirfjordstorfjordbalsfjordbåtsfjordbatsfjordmuosátbievátloabátkárášjohkanøtterøyxn--mjndalen-64anordkappláhppilahppialstahaugsiljanverranrøykenroykenhaldenlyngenbergenhortenhønefosshonefosstroandinbeiarnvarggatosoyroosøyrotromsoidrettmuosatbievatruovatloabatvoagattynsetnessetxn--indery-fyaskánitskanitraholtråholtxn--ystre-slidre-ujbandebusarpsborgbearduxn--karlsy-fyahordalandjorpelandjørpelanddeatnuringsakersør-odalsor-odalxn--slt-elabringerikeaudnedalnittedalnissedalhemsedalslattumsurnadalxn--blt-elabelverumstjørdalnaustdalhjartdalgjøvikfyresdalhasviknarviklarvikgjovikmalvikgamviklenvikporsgrunnstjordalengerdaldrobakdrøbakxn--msy-ula0hvestvagoyxn--vgan-qoaxn--ryken-vuaxn--lten-graxn--stfold-9xaxn--hpmir-xqaxn--lury-iramálatvuopmimalatvuopmitysværkirkenesbirkenesmoskenesbáidárxn--fjord-lraxn--rdal-poabahcavuotnabáhcavuotnaxn--frde-gralindåsbearalvahkixn--hobl-iraráhkkerávjuxn--loabt-0qavågåáltábodøsundlundraderådeetnetimeholeauregrueoddavagavegaranatanaarnasolasulaaltalekafusavangbergkvamåmliamlibokntinnroangranosenoslobodorøstroststatåmotamotivguprivøyeroyerliermossvossxn--nvuotna-hwalusterlunnermarkerhábmerhabmerhvalerfjalerxn--rholt-mratysvarbaidarfitjargaularhápmirhapmirmelhusfosnesøksnesoksnestysneshemnesevenesflesbergeidsbergtonsbergtønsberglindasxn--sndre-land-0cbnamsosxn--srum-graøystre-slidreoystre-slidrevestre-slidretrondheimbalestrandxn--langevg-jxaaustrheimxn--skjk-soavagsoyaveroysandoykarmoyfinnoytranoyvestbytranbysykkylvenxn--hyanger-q1aspjelkavikandasuoloxn--fl-ziaxn--drbak-wuastathellexn--sr-varanger-ggbtelemarkxn--bhcavuotna-s4axn--porsgu-sta26fčáhcesuolocahcesuoloakrehamnåkrehamnsandøykarmøyfinnøytranøyvågsøyaverøynamdalseidxn--lesund-huabadaddjaxn--vegrshei-c0axn--btsfjord-9zagildeskålporsanguxn--trgstad-r1anávuotnanavuotnahammerfestxn--sgne-graxn--brnny-wuacibestadharstadnarviikaevenáššivestnesgjemnessandnesagdenesrennesoyxn--avery-yuaxn--tysvr-vrabearalváhkikongsbergspydebergrandabergxn--andy-iradavvesiidaxn--krdsherad-m8aporsáŋgufredrikstadbjerkreimringeburennebuaurskog-holandnotteroyxn--vgsy-qoa0jxn--rmskog-byaskierváivelandbyglandfrolandaurlandforsandxn--bjddar-ptamidsundålesundalesundfetsundfarsundovre-eikerøvre-eikerakershusxn--moreke-juasørfoldøstfoldostfoldsorfoldhøyangerhoyangerlevangerorkangertanangerxn--vestvgy-ixa6olillesandulsteinxn--rennesy-v1agranvinskjervoyxn--klbu-woalavagisxn--h-2faxn--ryrvik-byakafjordkåfjordseljordfolkebiblxn--gjvik-wuajevnakerxn--kfjord-iuabudejjuxn--kranghke-b0axn--davvenjrga-y4axn--rland-uuaxn--ldingen-q1axn--mlselv-iuaxn--rady-iraxn--linds-prabrumunddalxn--ygarden-p1amo-i-ranaeidskogrømskogromskoghjelmelandxn--finny-yuaxn--sr-odal-q1axn--skjervy-v1aballangenkvanangenkvænangengratangenxn--hmmrfeasta-s4acvossevangensuohkanxn--rde-ulaxn--mli-tlaxn--ksnes-uuanordlandskanlandskånlandsortlandfuoiskuxn--rros-graxn--hcesuolo-7ya35bxn--eveni-0qa01gagaivuotnagáivuotnaxn--seral-lradrammenmodalenmosjoenjan-mayentorskensteigengloppenxn--snes-poamatta-varjjatxn--sr-fron-q1aomasvuotnajessheimbådåddjåxn--krager-gyaxn--kvfjord-nxaxn--asky-iraxn--snase-nraxn--bidr-5nacholtålenxn--vads-jraxn--jlster-byamosjøenxn--rst-0nastavernxn--ostery-fyaxn--oppegrd-ixaxn--sknit-yqaxn--risa-5naoppegårdskiptvetrendalenholtalenxn--mot-tlaxn--lhppi-xqaxn--holtlen-hxaxn--srreisa-q1akopervikxn--muost-0qaxn--bmlo-grahokksundkvalsundegersundxn--karmy-yuaullensakerxn--hylandet-54axn--kvitsy-fyaxn--bod-2nalangevågberlevågkristiansandxn--rsta-frahornindalstjørdalshalsenstjordalshalsensandnessjoenhámmárfeastaxn--lrdal-srasør-fronsor-fronnord-odalkristiansundmátta-várjjatvestvågøynesoddennotoddenbuskerudøygardenoygardensalangenlavangenralingenrælingenlodingenlødingenleaŋgaviikalaakesvuemieleangaviikauenorgexn--srfold-byaaskvollxn--rskog-uuaxn--nry-yla5gxn--vry-yla5ghammarfeastaxn--rhkkervju-01afxn--givuotna-8yakommunekrokstadelvanedre-eikerhagebostadhægebostadxn--berlevg-jxakviteseidxn--s-1faxn--l-1faxn--nmesjevuemie-tcbafuosskomoårekemoarekexn--lt-liacxn--jrpeland-54asvalbardoppegardholmestrandtvedestrandsogndalsokndalarendalsunndalfolldalxn--krjohka-hwab49jlyngdaletnedalnorddalsaltdalgausdalskedsmovaksdalgjesdalstordalxn--frya-hraaarbortedrangedalxn--smna-graaurskog-hølandxn--vg-yiabtjeldsundhaugesundlindesnesxn--mre-og-romsdal-qqbxn--dnna-gradyntmpheremerseineshacknetenterprisecloudmineaccomaorimāoriorgmilcriiwigennetschoolhealthkiwigovtgeekxn--mori-qsacloudnsparliamentcomedorgcompronetedugovmuseumwebsitekinservicebarsywebsitebuildereerobookheimdnsleapcelleero-stagetechcrscsslorigingohomecdbedeeeiemesecabgngilnlalplchfisiincnnoroptatitmtltruauhulumkdkukskjplvtrgrfrkrhrusesismycynzcznetinteduassoososcloudstgbetaaezaeuhkusjshatenadiarycdn77hoptozaptois-a-knightmyftpno-ipjpnddnssdpdnsspdnsbarsysweetpepperis-a-bruinsfanis-very-sweetservegameis-a-soxfanhomelinuxcdn77-secureservebbsmisconfusedwebredirectblogsitefreedesktopcouchpotatofriestoolforgeaccesscamis-lostreadmyblogsmall-webfedorapeopleserveftpis-a-celticsfanmywirepotagertwmailin-dslsellsyourhomeread-booksfreeddnscable-modemis-savednflfanufcfanmlbfanstuff-4-saleendoftheinternetin-vpnmy-firewallhomeftpis-localis-a-chefboldlygoingnowherewebhopselfipkicks-assroxatunkcamdvrfedoraprojectgotdnsdvrdnsdyndnspubtlspimientahomeunixdontexistfedorainfracloudwmflabsfspagesbmoattachmentsteckidsfamilydsdnsaliasdynaliasnow-dnscloudnsdoomdnsduckdnsblogdnshomednsroutingthecloudendofinternetdsmynasip-dynamicpoivronhttpbinmyfirewallis-very-evilmysecuritycamerais-a-linux-userwmcloudis-a-geektuxfamilyis-a-candidatedoesntexistis-very-badhobby-sitegame-hostaltervistais-foundis-a-patsfandnsdojohepforgepodzonedynservcollegefanis-very-goodfrom-meis-very-niceisa-geeknerdpolacmedsldingorgcomnomgobabonetedupleskaemhlxmyboxrockyprvcydeuxfleurspdnscodebergheyflowstatichostorgmilcomnomgobneteduorgcomeduiorgmilcomngonetedugovcloudns1337ngrokacorggogfamcomwebgobnetedugokgopgkpgovgosbizpasaugumicsopozpapuwmwsrprusiskwpspkppspkmpspokeoiawsawifoumsdnskokwpmuppuppsppiwwiwoowuzswkzoschrzpisdnwzmiuwwitdpssewsseumigugimoirmpinbwinbwiihupporzgwgriwupowwskrwioswuozstarostwokonsulattmpccopruszkowmyspreadshopostrodakartuzyopolegminamediaustkazgorajgoraolawailawalomzawloclradombytomjaworznotargilubinkoninzagantorunkutnokepnonakloczestsopotsanokturekplockslasksklepzarowlukowmedaidgdaorgmilrelcomnomatmgsmartneteduelkgovwawsossexbiztgorysejnytychypomorzeboleslawiechomesklepsdscloudunicloudzakopanelegnicarawa-mazbydgoszczswidnikkrasnikwloclawekbielawamragowograjeworealestatebeskidykaszubymalopolskaprzeworskswiebodzinlecznadfirmaszkolawarmiagdyniamiastakazimierz-dolnymalborkswidnicadlugolekaostrolekapodlasieelblagtravelsimplesitezachpomormielecszczecinnieruchomosciwalbrzychlezajsklublinbedzinpoznanwielunmielnooleckostarachowicedkontopowiatwroclawrybniksuwalkileborkslupskgdanskostrowwlkptarnobrzegtourismwegrowkrakowglogowyou2pilanysamailwrocinfoagroautobeepshoppriviqhslapypiszlodzcfolksecommerce-shopmazurypulawyskoczowrzeszowpomorskiezgierzkaliszolkuszlowiczostrowiecsosnowiecmazowszewodzislawbialowiezazgorzeleckatowicepabianicejelenia-gorawolominkarpaczsieradznowarudaczeladzkonskowolaskierniewiceswinoujscieturystykabieszczadycieszynketrzynolsztynbialystokbabia-goraprochowicewarszawastalowa-wolapolkowicegorlicegliwiceponiatowalimanowalubartowaugustowkobierzyceopocznognieznoszczytnokolobrzegshoparenapodhalebielskoklodzkostargardatwithplayitownnamecoorgnetedugovacorgcomproestnetedugovbiznameislaprofinforechtngrokmedaaaacacpaenglawjurbarbarsykeeneticavocatacctcloudnsorgcomsecplonetedugov123paginaweborgcomnetintedugovnomepublidkinbarsygovx443cloudnsorgmilcomnetedugovcooporgmilcomschnetedugovnamecomcannetlibassoaemclantmcontstoreorgcomnomrecwwwbarsyfirminfoshopartsstackitmyddnswebspacelima-cityacincooxorgedugovbarsybrendlyhbvpsvpsspectrumlandinghostingacppmordoviamcprecbgorgmilcomspbnetintedumsknovgovbirrasmcdirmytismircloudvladimirnalchikadygeyamarinepyatigorskmyjinobashkiriaeurodirvladikavkazna4ugroznykustanaikalmykiacldmaildagestaniranbuildcloudcanvaliaravalwixdevelopmentappwritemigrationneedleverceldatabasestackitcodereplravendbonporterlovableaccoorgmilnetgovcoopmedorgcompubschnetedugovservicemecomygovorggovtvmedorgcomnetedugovinfoedgfacbmlonihkutwpsryxzbdtmacfhppmyspreadshopbrandpartiorgcomfhvpress123minsidaitcouldbeworlanbibkommunalforbundfhskiopsyskomvuxkomforbnaturbruksgymnloginlineorgcomnetedugovenscaledeuusentsurgebotdaorgmilcomnetgovnowteleporthashbangplatformlovablebarsyshopwarebasehoplixbarsyonlinemsf5gitpagewawamscofigma-govcaffeinefigmacanvasoltstscwputerbarsysupportchatgptsquareomniweopensocialcpanelplaycodenotionnovecorewpsquaredpreviewjelecyonbyensrhtfastvpspieboxconvexjouwwebheyflowplatformshloginlinemadethissourcecraftclouderaorgorgcomartedugouvunivmeorgcomnetedugovsurveysstatichfheiyuxs4allprojectmyfastubervibehostapp-ionosdeployagentmecoorgcomschnetedugovbizcncostoreorgmilcomneteduembaixadaconsuladokiraranohoprincipesaotomeheliohobarsystorebaseshopwaresellfyaiabkhaziavologdamordoviapenzalenugsochinavoiexnetspbmsknovnorth-kazakhstanashgabadkareliaarmeniageorgiavladimirnalchikivanovobukharaadygeyakhakassiakalugakrasnodarjambylaktyubinsktroitskbryanskobninskkurganazerbaijanpokrovskbashkiriatselinogradvladikavkazmurmansktulatuvamangyshlaktashkentchimkentgroznykaragandatermezarkhangelskkustanaikalmykiabalashoveast-kazakhstankaracoldagestantogliattibarsyredorgcomgobedumirenaccoorgjelasticdiscoursecleverappsschacmiincogoornetonlineshopcogoorgmilcomwebnicnetintedugovbiznametestcoorgmilcomnomnetedugovorangecloudpersoindorgcomfinnatnetgovensmincomtourismintlinfox0611oyaorgmilcomnetedugovquickconnectvpnplusnettprequalifymeaddrmyaddrntdllwadlnctvavdrk12orgmilpolbeltelcomwebgennetedutskkepgovbbsbiznameinfocoorgmilcompronetedugovbiznameinfobetter-thanworse-thansakurafromdyndnson-the-webmymailerorgmilurlcomneteduidvgovmydnsgameclubebizmeneacsccogotvorhotelmilmobiinfovodteiflgplkmsmsbcckhincndnvncoztltmkckppzpdprvcvkvlvcrkrkscxuzchernovtsyrivneyaltaodesavolynrovnolutskltdinforgcomnetedugovbizvinnicazhitomirternopilpoltavakropyvnytskyizaporizhzhiasevastopolsebastopoluzhgoroduzhhorodkharkovkharkivvinnytsiakhmelnytskyizaporizhzhecrimeaodessazhytomyrnikolaevcherkassydonetskluganskluhanskkirovogradivano-frankivskchernivtsikrymkievkyivlvivsumyzakarpattiamykolaivcherkasychernigovkhersonchernihivdnipropetrovskdnepropetrovskkhmelnitskiyneacsccogoorusorgmilcomedugovmyspreadshopadimono-ipbarsybarsyonlinelayershiftnh-servretrosnubapicampaignservicelugaffinitylotteryweeklylotteryraffleentrygluglugsmeaccoindependent-inquestnimsitecopropymntltdorgplcschnetgovnhsbarsyindependent-commissionindependent-reviewpolicepublic-inquiryindependent-panelconnhospindependent-inquiryroyal-commissionoraclegovcloudappscck12libaws-govccphxcclibpvtparochchtrcck12libcceatonk12coglibtecgendstmusann-arborwashtenawcck12glghcck12sealibforksolympiabainbridge-islkeyporthoquiamyarrow-pointcentraliaport-townsendsequimport-ludlowrentonsilverdalebremertonredmondsheltonbellevueport-orchardport-angeleskingstonchehalisaberdeengig-harborseattlepoulsboidmdndsddemenegacalamaiavawapailalflnmdcncscohnhmihiviwiriinmntnmocoutvtctmtgunjokakwvnvprarorasmskstxwynykyazisadninsnngosrvis-bymircloudservernamepointtoenscaledland-4-salefreeddnsstuff-4-saleazure-apinoipdatabricksappscloudnsgolffanheliohostazurewebsitesgvorgmilcomgubneteducoorgcomnetd0egvorgmilcomnetedugovmydnsiacostoree12orgmilcomnomwebgobbibrectecnetintedugovraremprendefirminfoartseducok12orgcomnethidnsidacaiiosonlahanamhanoicamauhueorgcompronetintedugovbizbacninhtayninhhoabinhnamdinhtravinhhaiphongvinhlonghaiduongquangnamquangtrithuathienhuequangninhbacgianghaugiangquangbinhsoctrangbentrethanhphohochiminhdanangkontumhatinhkhanhhoathanhhoahealthgialailaocaiyenbaibackanngheanlonganphuyenphuthocanthodaklakdongnainameinfovinhphucdongthapkiengiangtiengiangquangngailaichaulangsonlamdongdaknonghagiangangiangcaobangbinhduongninhthuanbinhthuanbaclieuthaibinhninhbinhbinhdinhtuyenquanghungyenbaria-vungtauthainguyendienbienbinhphuocschbizputerimagine-proxyorgcomnetedugovcloud66advisormypetsdyndnsxn--8dbq2axn--4dbgdty6cxn--5dbhl8dxn--hebda8bxn--80auxn--d1atxn--c1avgxn--o1acxn--o1achxn--90azhxn--55qx5dxn--uc0atvxn--od0algxn--wcvs22dxn--gmqw5axn--mxtq1mxn--12c1fe0brxn--h3cuzk1dixn--12co0c3b4evaxn--12cfi8ixb8lxn--o3cyx2axn--m3ch0j3axn--j1adpxn--90amcxn--90a1afxn--h1ahnxn--j1ael8bxn--h1alizxn--c1avgxn--j1aefxn--80aaa0cvacxn--41acaffeineexeopentunnelbotdashtelebitorgtmaccoagricorgmilnomwebnicngonetaltedugovlawnisschoolgrondaraccoorgmilcomschnetedugovbizinfoprg1-zeropstritonstackitlimazeropsaccoorgmilgovяспборгкоммскбизмирсамаракрымсочиакодпроргобрупрצהלממשלישובאקדמיהองค์กรธุรกิจรัฐบาลศึกษาทหารเน็ต教育網絡組織公司政府個人닷넷한국澳门新闻澳門联通家電嘉里招聘通販닷컴삼성コムგეбгрфеюadcdbdgdidmdsdtdaebedeeegeiejekemenepereseveyegabacalamanauavapaqasazacfbfafgfnfpfwftfbgcgagggegkgngmgsgpgvgtgugilmlnlalclglplsltlhmimjmkmmmomambmcmdmfmgmzmpmsmtmgbbblbsbecccacnclcmcvctcscmhkhghchbhthphshlinikifigiaibicivisikninhnmncnbngnsnpnvntnjoionomobocoaofodorosotoptstttytatbtetgtithtmtltrusuvuaucueuguhulumunufjdjbjtjsjlkmkhkfkdkcktkukskpkgpmpnpkpjpgqaqmqiqsvtvcvbvmvlvrwpwtwzwbwcwawgwkwmwtrsrprgrfrercrbrarnrmrlrkrirhrwsusrssspsgsesbsaslsmsissxmxaxcxuypysylymykygybycyuztzsznzmzkzdzczbzazελευ世界台灣购物公益点看臺灣网络書籍在线网站手机机构大拿游戏信息台湾谷歌慈善商标香港中国餐厅网址中國商城食品微博政务移动集团公司八卦商店健康网店政府时尚佛山中信娱乐广东企业homedepotengineeringاماراتrepublicankuokgroupversicherungchannelcitadelxn--pgbs0dhxn--b4w605ferdstatebankwebsitexn--mgb9awbf亚马逊淡马锡alibabaxn--ngbc5azdxn--mgbbh1axn--45br5cyltoshibabuildworldcloudtradeguideplacespacedancemoviephoneprimesmilebiblestyleappleazurestoreskypegripexn--l1accdrivelottehorsehouseleasechasereisestadahondaomegaaetnaamicaninjanokiamediadeltavodkaedekaosakapizzaslingemailgmailtirolshelltmallfinallegaltotalhotelamfamforumrehabmusicciticricohcoachwatchboschearthfaithirishmiamiarchidubaiguccipraxiみんなストアセールcanonsalononionnikonepsonkoelngreensevencrownikanoradioaudioweiboglobopromogalloyahoociscorodeovideomangobingotokyovolvolottokyotophotosmartsportquesttrusthyattjetztadultcymrubaidutushuxn--kprw13dubankclickblackmerckgroupsharpcheapnowtvxn--h2brj9cקוםհայоргсрбмонкомбелмкдқазрусукрمصرقطرعربكومdadcfdmedwedredphdthdbidpidkrdmsdltdiceonewmeglemoerwecfageacbanbambaaaammakianraspacpaaxawtfbcgaegongingaigvigorgdogdhlmilrilonlaolloluoljllcalgalnflafltelsrlfrllplkimibmcamcombommomifmabbjcbscbwebcabnabtabmlbpubabcbbcnecincpncllcstcwtcpwcnyckfhbzhovhmoiskiobisbitcifyituipinvinwinxincbnbcnmanfangdnmenrenkpnmtnyunrunfununobiojioriohbogmofooboooooacoecoceongoproartistottnttbbtcateatlatvetpetbetnethktmitfitintjothotgotdotbotprueduicujnjyouinknhktdkappsapgapmapdnptopgopllpjmpzipvipripesqtrvdtvitvdevmovgovhivnrwlawsewnewbmwwownowhowdvrftrmtrsfrbarcartvscrseusawsupsubssbsadsddsldssasbmsmlsxxxboxfoxgmxtjxsextaxbuyflydiysoyjoyskypaydaygayxyzanzbizwebersenerpokerlameractortatarsolarລາວคอมไทยtourslocusnexuslexusgiftsbeatsboatspartspressglassswissकॉमनेटtiresgivescodeshomesgamestunesshoescardswalesloansvegastoolsdealsautosparisファッションworkssucksrocksxeroxforexfedexpartylillymoneystudyrugbytoraytoday中文网xn--unup4y天主教飞利浦新加坡enterprises我爱你嘉里大酒店christmasxn--fct429kholdingsxn--8y0a063axn--mgbx4cd0ablifestyleabogadoallstatenetbankكاثوليكxn--s9brj9cxn--gk3at1ebestbuycharityxn--55qx5dmicrosoftpropertybasketballhomegoodscorsicajewelrygallerygrocerysurgerycountrybrusselsverisignferreroxn--czr694bhdfcbankcommbanksoftbankپاكستانپاکستانnextdirectالسعوديهالعليانxn--h2brj9c8cxn--80adxhksshikshaxn--mgbai9azgqp6jcuisinellabarclayscatholicxn--kpry57dcompanyxn--xhq521bblackfridayxn--mgba3a3ejtsandvikxn--d1acj3bacademydownloadمليسياxn--j1amhxn--w4r85el8fhu5dnraipirangaathletaxn--fhbeixn--mgbqly7cvafrzuerichxn--c2br7gஇலங்கைcontractorsxn--io0a7igraphicsinsurancetemasekxn--xkc2al3hye2amotorcyclesphotographydirectoryplumbingxn--vhquvclothingtrainingcleaningwilliamhilllightingxn--mgba3a4f16ashoppingcateringeducationokinawapicturesventuresproductionsxn--9et52uwalmartഭാരതംsupportrealestatecapitalonexn--nqv7fs00emaauspostfloristdentistxn--qxamgodaddybradescobargainsmitsubishikerryhotelsxn--9dbq2axn--3pxu8kimmobilienxn--fjq720axn--mgbtx2bholidaymckinseymadridbusinessbuildershelsinkixn--4gbrimмоскваالسعودیةcoffeedegreelacaixapartnersalsaceofficeabbvievoyageorangegeorgeonlinechromemobilekindlegoogleoraclecircleschulesecureinsurexn--mgba7c0bbn0aestatexn--mgbc0a9azcgcruisehangoutxn--vuq861bxn--42c2d9arexrothfirestoneuniversityxn--nnx388alifeinsuranceextraspaceонлайнvermögensberatersoftwarexn--fiqs8sxn--mgbab2bdxn--w4rs40ltiendaभारतम्africatoyotaotsukasakuracameracreditcardnagoyaconsultingnetworktheatermonsterprogressivepioneerxn--55qw42gracingdatingvotingvikinglivinggivingxn--bck1b9a5dre4cbrotherweatherjoburgفلسطينlplfinancialxn--clchc0ea0b2g2a9gcdfutbolschoolsocialglobaldentalwoodsidechanelairtelmatteltravelrealtorwebcamstreamభారత్unicomalstomxn--nodexn--6frz82gmuseumfurniturexn--rvc1e0am3exn--mix891faccenturexn--11b4c3dismailineustardiscountquebeccomsecclinicservicesxn--y9a3aqxn--c1avgswatchchurchsearchالاردنmarketingcontacthealthmonashshoujisanofitaipeiamericanexpresssuzukiアマゾンクラウドポイントbhartiグーグルxn--mgberp4a5d4armemorialxn--1qqw23alondonmormoninstitutevisionbostonnortoncouponmaisonamazonvirginberlindesigndurbanolayannissananquanxihuanhitachikaufengardenreisenbayerntechnologydatsunxn--90a3aclatinocasinostudiophysioxn--ngbe9e0apharmacytattootaobaoaramcoexpertreportabbottdirectselectimamatfairwindspictettargetmarketintuittravelersinsurancecreditdupontryukyusuppliesxn--tckwebnpparibasschmidtmerckmsdyodobashirestaurantbridgestonecricketxn--fpcrj9c3dbostikbroadwayattorneylefrakemerckxn--fiq228c5hscareersfarmerswinnersflowersxn--wgbh1cguitarsxn--54b7fta0ccxn--p1acfmakeupgalluplandroverxn--kcrx77d1x4agoldpointbauhausxn--mgbayh7gpahiphopplaystationxn--mgba3a4fraxn--eckvdtc9dhyundaixn--gckr3f0fistanbulticketsmarketsflightschintaireviewsxn--3e0b707ewindowsxn--fiqz9sfinancialxn--fzys8d69uvgmابوظبيdiscoverreviewবাংলাxn--5su34j936bgsgmoscowobserverapartmentsдетиارامكوсайтeurovisionxn--i1b6b1a6a2exn--xkc2dl3a5ee0hتونسموقعبارتڀارتشبكةعمانبيتكعراقreadkredbondlandbandfundfoodprodgoldfordtubecafesafelifeggeeieeefreefagepagegugezonewinememenamegamesaleablebikenikelikecarecbreherefiresaveloveliveblueartedatesitevotecaseluxebofamodaltdaasdatiaayogasinavanashiaasiajavabbvatevavivadatazaraarpacasavisasncfprofmaifsurfgolfdvagsongbingpingwangkpmggoogblogpohlfailcooldellcalldeallidlsarlfilmteamroomfarmimdbarabclubhdfcicbchsbcgmbhrichtechfishdishcashminiernikddiaudiwikimobitaxicitikiwidesiqponskinloanakdnwienopenporncerntownimmolimoolloinfonicofidolegosaxozeroaerovivoautovotomotofastbestresthostpostnextlgbtchatseatgiftmeetdietreitmintrentgentspotscotguruitausohumenucyoubanklinkpinkdclktalksilkbookseekworkrsvpaarpjeepshopcoophelpcamppccwshowbeerstarruhrflirweirhaircarsparsjprshausplusnewstipstoysjobskidsfanspicsdocsxboxamexsexynavycitysonyarmyallybabyplaydeliverybuzzgbizlamborghiniphilipsලංකාಭಾರತfitnessexpresslanxesspfizercenterwalterlawyersoccercareerkosherbrokerlockerdealerdoctorauthorxn--mgbqly7c0a67fbcvermögensberatungjaguarxn--pssy2uxn--hxt814eflickrrepairrogersairbusxn--mgbai9a5eva00beventsyachtsxn--t60b56aভাৰতভারতभारतभारोतviajeshermeshughesxn--j1aefसंगठनvillasଭାରତclaimshotelsભારતzapposphotosjuegoscondostatamotorsgratistennisਭਾਰਤtkmaxxtjmaxxschaeffleryandexxn--80aswgrealtysafetybeautyluxuryxn--3ds443gsupplyfamilyxn--o3cw4hhockeysydneyxn--90aenissayalipayenergycomputeragencyxn--rovu88b電訊盈科xn--gecrj9cstatefarmaccountantaquarelleolayangroup香格里拉xn--p1ai组织机构xn--1ck2e1bxn--mgbt3dhdschwarzموريتانياabudhabinowruzkomatsufujitsuhospitalxn--80asehdbxn--mgbtf8flxn--j6w193gxn--yfro4i67oprudentialxn--flw351ecruisescoursesrecipesxn--e1a4cferrarixn--ses554gxn--wgbl6awatchesstaplessinglesxn--mgbcpq6gpa1axn--otu796dpropertiescreditunionxn--mgbah1a3hjkrdstockholmhisamitsuالسعوديةstcgroupdomainsoriginscouponsbloombergclubmedfroganslimitedxn--80aqecdr1aexposedinternationalequipmentbarclaycardxn--q7ce6axn--mgbi4ecexpprotectionassociatesconstructionxn--cck2b3bxn--45q11candroidfoundationישראלxn--mgbca7dzdocliniqueboutiqueengineerxn--qxa6asystemsfirmdalefashionauctionxn--nqv7finfinitirentalsreliancetradingweddingfishinghostinggentingbookingcookingxn--3hcrj9cgraingerxn--czrs0tdemocratsamsungyokohamaxn--h2breg3evexn--nyqy26alundbeckmelbournevacationssolutionsfrontierxn--vermgensberatung-pwbmanagementxn--cg4bkixn--mgb2ddeslincolnhamburgsandvikcoromantblockbusterairforcebarefootxn--4dbrk0ceinvestmentsfeedbackcommunityxn--ngbrxالبحرينdiamondsamsterdamhealthcareredumbrellaxn--mxtq1mxn--2scrj9cagakhanxn--mgbpl2fhкатоликcaravanசிங்கப்பூர்richardlimortgageamericanfamilyxn--fzc2c9e2cscholarshipssaarlandxn--imr513nvlaanderensamsclubgoodyearkitchenஇந்தியாweatherchannelallfinanzxn--kput3iالسعودیۃxn--90aisxn--efvy88hالجزائرxn--mgbaam7a8hexchangejpmorganxn--tiq49xqyjfidelitysecurityxn--mk1bu44cwanggouxn--fiq64bxn--6qq986b3xlxn--mgbbh1a71exn--80ao21amarshallsxn--5tzm5gtravelerspanasoniclatrobeyoutubeaccountantsxn--rhqv96gxn--cckwcxetdanalyticsxn--ygbi2ammxبازاربھارتسوريةorganicfreseniusسورياxn--9krt00axn--qcka1pmcxn--jlq480n2rgdeloittesciencefinancexn--jvr189mxn--30rr7yhomesensehotmailbaseballfootballleclercboehringerxn--q9jyb4cxn--mix082fاليمنهمراهpolitieسودانايرانایرانnetflixyamaxunxn--lgbbat1ad8jcollegestoragecapetowncolognekerrypropertiesxn--mgbgu82axn--ogbpf8flxn--czru2dwhoswhociprianilasallexn--g2xx48cforsalebanamexaudiblexn--vermgensberater-ctbxn--zfr164bericssonvanguardxn--45brj9cindustriestheatremarriottxn--3bst00mcomparexn--mgberp4a5d4a87gcapitaldigitalالمغربbarcelonashangrilaxn--d1alfcalvinkleinwwwcitysapporokawasakinagoyasendaikobekitakyushuyokohamackjp";
const rulesRoot = 653;
const exceptionsRoot = 657;
//# sourceMappingURL=trie.js.map
;// ./node_modules/tldts/dist/es6/src/suffix-trie.js
// NOTE: kept (intentionally) near-identical to packages/tldts-icann/src/suffix-trie.ts.
// They are separate copies rather than a shared helper because the lookup is
// only fast when the typed arrays are module-scope monomorphic globals —
// closing over them (a shared factory) measured ~20% slower. The ICANN build
// also specializes (constant mask, no isIcann/isPrivate). Keep the two in sync.


// `edgeOffset` (where each label starts in `labelText`), `edgeHash` (djb2 of
// each label) and `wildcardEdge` (each node's '*' edge, or -1) are derived once
// at load instead of being shipped: the bundle then carries only the
// compressible `labelText` + structure, while the lookup binary-searches
// integer hashes. The cost is a single ~1ms pass at first import — cheaper than
// the object trie it replaces. Kept at module scope (not captured in a closure)
// so V8 treats the typed arrays as fast monomorphic globals.
const numberOfNodes = nodeFlags.length;
const numberOfEdges = edgeLength.length;
const edgeOffset = new Uint32Array(numberOfEdges);
const edgeHash = new Uint32Array(numberOfEdges);
const wildcardEdge = new Int32Array(numberOfNodes).fill(-1);
for (let node = 0, offset = 0; node < numberOfNodes; node += 1) {
    for (let edge = edgeStart[node]; edge < edgeStart[node + 1]; edge += 1) {
        edgeOffset[edge] = offset;
        const end = offset + edgeLength[edge];
        let hash = 5381;
        for (let i = end - 1; i >= offset; i -= 1) {
            hash = (hash * 33) ^ labelText.charCodeAt(i);
        }
        edgeHash[edge] = hash >>> 0;
        if (edgeLength[edge] === 1 &&
            labelText.charCodeAt(offset) === 42 /* '*' */) {
            wildcardEdge[node] = edge;
        }
        offset = end;
    }
}
// Result of the last `walk`, kept in module scope to avoid allocating a match
// object. Safe because lookups are synchronous and read right after `walk`.
let matchNode = -1;
let matchStart = 0;
let matchEnd = 0;
/**
 * True if edge `edge`'s label equals `hostname[start, start + length)`.
 */
function labelEquals(edge, hostname, start, length) {
    if (edgeLength[edge] !== length) {
        return false;
    }
    const offset = edgeOffset[edge];
    for (let i = 0; i < length; i += 1) {
        if (labelText.charCodeAt(offset + i) !== hostname.charCodeAt(start + i)) {
            return false;
        }
    }
    return true;
}
/**
 * Find the child edge of `node` whose label is `hostname[start, start + length)`.
 * Edges are sorted by hash, so binary-search the hash then verify the label
 * (scanning the rare run of equal hashes). Returns the edge index or -1.
 */
function findEdge(node, hash, hostname, start, length) {
    let lo = edgeStart[node];
    let hi = edgeStart[node + 1];
    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        const value = edgeHash[mid];
        if (value < hash) {
            lo = mid + 1;
        }
        else if (value > hash) {
            hi = mid;
        }
        else {
            for (let e = mid; e >= lo && edgeHash[e] === hash; e -= 1) {
                if (labelEquals(e, hostname, start, length))
                    return e;
            }
            for (let e = mid + 1; e < hi && edgeHash[e] === hash; e += 1) {
                if (labelEquals(e, hostname, start, length))
                    return e;
            }
            return -1;
        }
    }
    return -1;
}
/**
 * Walk `hostname`'s labels right-to-left from `root`, recording the deepest
 * node whose flag passes `allowedMask` (with the label boundaries of that match
 * in `matchStart`/`matchEnd`). Returns whether any match was found.
 */
function walk(hostname, root, allowedMask) {
    let node = root;
    let end = hostname.length;
    let hash = 5381;
    matchNode = -1;
    for (let i = hostname.length - 1; i >= 0; i -= 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */) {
            const start = i + 1;
            let edge = findEdge(node, hash >>> 0, hostname, start, end - start);
            if (edge === -1) {
                edge = wildcardEdge[node];
            }
            if (edge === -1) {
                return matchNode !== -1;
            }
            node = edgeChild[edge];
            if ((nodeFlags[node] & allowedMask) !== 0) {
                matchNode = node;
                matchStart = start;
                matchEnd = end;
            }
            end = i;
            hash = 5381;
        }
        else {
            hash = (hash * 33) ^ code;
        }
    }
    // Left-most label: hostname[0, end). Same find/descend/record as the loop —
    // duplicated rather than folded into the loop (via `i >= -1`) because that
    // extra per-character branch measured slightly slower on the hot path.
    let edge = findEdge(node, hash >>> 0, hostname, 0, end);
    if (edge === -1) {
        edge = wildcardEdge[node];
    }
    if (edge !== -1) {
        node = edgeChild[edge];
        if ((nodeFlags[node] & allowedMask) !== 0) {
            matchNode = node;
            matchStart = 0;
            matchEnd = end;
        }
    }
    return matchNode !== -1;
}
/**
 * Check if `hostname` has a valid public suffix in the trie.
 */
function suffixLookup(hostname, options, out) {
    if (fast_path(hostname, options, out)) {
        return;
    }
    const allowedMask = (options.allowPrivateDomains ? 2 /* RULE_TYPE.PRIVATE */ : 0) |
        (options.allowIcannDomains ? 1 /* RULE_TYPE.ICANN */ : 0);
    // Exceptions have priority and strip their own left-most label (e.g. the
    // rule '!www.ck' makes the suffix of 'www.ck' be 'ck').
    if (walk(hostname, (/* inlined export .exceptionsRoot */657), allowedMask)) {
        out.isIcann = (nodeFlags[matchNode] & 1 /* RULE_TYPE.ICANN */) !== 0;
        out.isPrivate = (nodeFlags[matchNode] & 2 /* RULE_TYPE.PRIVATE */) !== 0;
        out.publicSuffix = hostname.slice(matchEnd + 1);
        return;
    }
    if (walk(hostname, (/* inlined export .rulesRoot */653), allowedMask)) {
        out.isIcann = (nodeFlags[matchNode] & 1 /* RULE_TYPE.ICANN */) !== 0;
        out.isPrivate = (nodeFlags[matchNode] & 2 /* RULE_TYPE.PRIVATE */) !== 0;
        out.publicSuffix = hostname.slice(matchStart);
        return;
    }
    // No match: the prevailing '*' rule makes the right-most label the suffix.
    out.isIcann = false;
    out.isPrivate = false;
    const lastDot = hostname.lastIndexOf('.');
    out.publicSuffix = lastDot === -1 ? hostname : hostname.slice(lastDot + 1);
}
//# sourceMappingURL=suffix-trie.js.map
;// ./node_modules/tldts/dist/es6/index.js


// For all methods but 'parse', it does not make sense to allocate an object
// every single time to only return the value of a specific attribute. To avoid
// this un-necessary allocation, we use a global object which is re-used.
const RESULT = getEmptyResult();
function parse(url, options) {
    return parseImpl(url, 5 /* FLAG.ALL */, suffixLookup, options, getEmptyResult());
}
function getHostname(url, options) {
    /*@__INLINE__*/ resetResult(RESULT);
    return parseImpl(url, 0 /* FLAG.HOSTNAME */, suffixLookup, options, RESULT).hostname;
}
function getPublicSuffix(url, options) {
    /*@__INLINE__*/ resetResult(RESULT);
    return parseImpl(url, 2 /* FLAG.PUBLIC_SUFFIX */, suffixLookup, options, RESULT)
        .publicSuffix;
}
function es6_getDomain(url, options) {
    /*@__INLINE__*/ resetResult(RESULT);
    return parseImpl(url, 3 /* FLAG.DOMAIN */, suffixLookup, options, RESULT).domain;
}
function getFullDomain(url, options) {
    /*@__INLINE__*/ resetResult(RESULT);
    const result = parseImpl(url, 3 /* FLAG.DOMAIN */, suffixLookup, options, RESULT);
    // The hostname *is* the full domain (subdomain + domain) whenever a
    // registrable domain exists; gate on `domain` so non-registrable inputs
    // (IPs, suffix-less or invalid hostnames) return `null` like `getDomain`.
    return result.domain === null ? null : result.hostname;
}
function es6_getSubdomain(url, options) {
    /*@__INLINE__*/ resetResult(RESULT);
    return parseImpl(url, 4 /* FLAG.SUB_DOMAIN */, suffixLookup, options, RESULT)
        .subdomain;
}
function es6_getDomainWithoutSuffix(url, options) {
    /*@__INLINE__*/ resetResult(RESULT);
    return parseImpl(url, 5 /* FLAG.ALL */, suffixLookup, options, RESULT)
        .domainWithoutSuffix;
}
//# sourceMappingURL=index.js.map

/***/ },

/***/ 5372
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContextManager = void 0;
const utils_1 = __webpack_require__(9266);
const error_1 = __webpack_require__(6340);
class ContextManager {
    get getDefaultComputeContexts() {
        return this.defaultComputeContexts;
    }
    get getDefaultLauncherContexts() {
        return this.defaultLauncherContexts;
    }
    constructor(serverUrl, requestClient) {
        this.serverUrl = serverUrl;
        this.requestClient = requestClient;
        this.defaultComputeContexts = [
            'CAS Formats service compute context',
            'Data Mining compute context',
            'Import 9 service compute context',
            'SAS Job Execution compute context',
            'SAS Model Manager compute context',
            'SAS Studio compute context',
            'SAS Visual Forecasting compute context'
        ];
        this.defaultLauncherContexts = [
            'CAS Formats service launcher context',
            'Data Mining launcher context',
            'Import 9 service launcher context',
            'Job Flow Execution launcher context',
            'SAS Job Execution launcher context',
            'SAS Model Manager launcher context',
            'SAS Studio launcher context',
            'SAS Visual Forecasting launcher context'
        ];
        if (serverUrl)
            (0, utils_1.isUrl)(serverUrl);
    }
    getComputeContexts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result: contexts } = yield this.requestClient
                .get(`${this.serverUrl}/compute/contexts?limit=10000`, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting compute contexts. ');
            });
            const contextsList = contexts && contexts.items ? contexts.items : [];
            return contextsList.map((context) => ({
                createdBy: context.createdBy,
                id: context.id,
                name: context.name,
                version: context.version,
                attributes: {}
            }));
        });
    }
    getLauncherContexts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result: contexts } = yield this.requestClient
                .get(`${this.serverUrl}/launcher/contexts?limit=10000`, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting launcher contexts. ');
            });
            const contextsList = contexts && contexts.items ? contexts.items : [];
            return contextsList.map((context) => ({
                createdBy: context.createdBy,
                id: context.id,
                name: context.name,
                version: context.version,
                attributes: {}
            }));
        });
    }
    createComputeContext(contextName, launchContextName, sharedAccountId, autoExecLines, accessToken, authorizedUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateContextName(contextName);
            this.isDefaultContext(contextName, this.defaultComputeContexts, `Compute context '${contextName}' already exists.`);
            const existingComputeContexts = yield this.getComputeContexts(accessToken);
            if (existingComputeContexts.find((context) => context.name === contextName)) {
                throw new Error(`Compute context '${contextName}' already exists.`);
            }
            if (launchContextName) {
                if (!this.defaultLauncherContexts.includes(launchContextName)) {
                    const launcherContexts = yield this.getLauncherContexts(accessToken);
                    if (!launcherContexts.find((context) => context.name === launchContextName)) {
                        const description = `The launcher context for ${launchContextName}`;
                        const launchType = 'direct';
                        const newLauncherContext = yield this.createLauncherContext(launchContextName, description, launchType, accessToken).catch((err) => {
                            throw new Error(`Error while creating launcher context. ${err}`);
                        });
                        if (newLauncherContext && newLauncherContext.name) {
                            launchContextName = newLauncherContext.name;
                        }
                        else {
                            throw new Error('Error while creating launcher context.');
                        }
                    }
                }
            }
            const headers = {
                'Content-Type': 'application/json'
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            let attributes = { reuseServerProcesses: true };
            if (sharedAccountId)
                attributes = Object.assign(Object.assign({}, attributes), { runServerAs: sharedAccountId });
            const requestBody = {
                name: contextName,
                launchContext: {
                    contextName: launchContextName || ''
                },
                attributes
            };
            if (authorizedUsers && authorizedUsers.length) {
                requestBody['authorizedUsers'] = authorizedUsers;
            }
            else {
                requestBody['authorizeAllAuthenticatedUsers'] = true;
            }
            if (autoExecLines) {
                requestBody.environment = { autoExecLines };
            }
            const { result: context } = yield this.requestClient
                .post(`${this.serverUrl}/compute/contexts`, requestBody, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while creating compute context. ');
            });
            return context;
        });
    }
    createLauncherContext(contextName_1, description_1) {
        return __awaiter(this, arguments, void 0, function* (contextName, description, launchType = 'direct', accessToken) {
            if (!contextName) {
                throw new Error('Context name is required.');
            }
            this.isDefaultContext(contextName, this.defaultLauncherContexts, `Launcher context '${contextName}' already exists.`);
            const existingLauncherContexts = yield this.getLauncherContexts(accessToken);
            if (existingLauncherContexts.find((context) => context.name === contextName)) {
                throw new Error(`Launcher context '${contextName}' already exists.`);
            }
            const headers = {
                'Content-Type': 'application/json'
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            const requestBody = {
                name: contextName,
                description: description,
                launchType
            };
            const { result: context } = yield this.requestClient
                .post(`${this.serverUrl}/launcher/contexts`, requestBody, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while creating launcher context. ');
            });
            return context;
        });
    }
    editComputeContext(contextName, editedContext, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateContextName(contextName);
            this.isDefaultContext(contextName, this.defaultComputeContexts, 'Editing default SAS compute contexts is not allowed.', true);
            let originalContext;
            originalContext = yield this.getComputeContextByName(contextName, accessToken);
            // Try to find context by id, when context name has been changed.
            if (!originalContext) {
                originalContext = yield this.getComputeContextById(editedContext.id, accessToken);
            }
            const { result: context, etag } = yield this.requestClient
                .get(`${this.serverUrl}/compute/contexts/${originalContext.id}`, accessToken)
                .catch((err) => {
                if (err && err.status === 404) {
                    throw new Error(`The context '${contextName}' was not found on this server.`);
                }
                throw err;
            });
            // An If-Match header with the value of the last ETag for the context
            // is required to be able to update it
            // https://developer.sas.com/apis/rest/Compute/#update-a-context-definition
            return yield this.requestClient.put(`/compute/contexts/${context.id}`, Object.assign(Object.assign(Object.assign({}, context), editedContext), { attributes: Object.assign(Object.assign({}, context.attributes), editedContext.attributes) }), accessToken, { 'If-Match': etag });
        });
    }
    getComputeContextByName(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result: contexts } = yield this.requestClient
                .get(`${this.serverUrl}/compute/contexts?filter=eq(name, "${contextName}")`, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting compute context by name. ');
            });
            if (!contexts || !(contexts.items && contexts.items.length)) {
                throw new Error(`The context '${contextName}' was not found at '${this.serverUrl}'.`);
            }
            return contexts.items[0];
        });
    }
    getComputeContextById(contextId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result: context } = yield this.requestClient
                .get(`${this.serverUrl}/compute/contexts/${contextId}`, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting compute context by id. ');
            });
            return context;
        });
    }
    getExecutableContexts(executeScript, authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result: contexts } = yield this.requestClient
                .get(`${this.serverUrl}/compute/contexts?limit=10000`, authConfig === null || authConfig === void 0 ? void 0 : authConfig.access_token)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while fetching compute contexts.');
            });
            const contextsList = contexts.items || [];
            const executableContexts = [];
            const promises = contextsList.map((context) => {
                const linesOfCode = ['%put &=sysuserid;'];
                return () => executeScript(`test-${context.name}`, linesOfCode, context.name, authConfig, null, false, true, true).catch((err) => err);
            });
            let results = [];
            for (const promise of promises)
                results.push(yield promise());
            results.forEach((result, index) => {
                if (result && result.log) {
                    try {
                        const resultParsed = result.log;
                        let sysUserId = '';
                        const sysUserIdLog = resultParsed
                            .split('\n')
                            .find((line) => line.startsWith('SYSUSERID='));
                        if (sysUserIdLog) {
                            sysUserId = sysUserIdLog.replace('SYSUSERID=', '');
                            executableContexts.push({
                                createdBy: contextsList[index].createdBy,
                                id: contextsList[index].id,
                                name: contextsList[index].name,
                                version: contextsList[index].version,
                                attributes: {
                                    sysUserId
                                }
                            });
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                }
            });
            return executableContexts;
        });
    }
    deleteComputeContext(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateContextName(contextName);
            this.isDefaultContext(contextName, this.defaultComputeContexts, 'Deleting default SAS compute contexts is not allowed.', true);
            const headers = {
                'Content-Type': 'application/json'
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            const context = yield this.getComputeContextByName(contextName, accessToken);
            return yield this.requestClient.delete(`${this.serverUrl}/compute/contexts/${context.id}`, accessToken);
        });
    }
    // TODO: implement editLauncherContext method
    // TODO: implement deleteLauncherContext method
    validateContextName(name) {
        if (!name)
            throw new Error('Context name is required.');
    }
    isDefaultContext(context, defaultContexts = this.defaultComputeContexts, errorMessage = '', listDefaults = false) {
        if (defaultContexts.includes(context)) {
            throw new Error(`${errorMessage}${listDefaults
                ? '\nDefault contexts:' +
                    defaultContexts.map((context, i) => `\n${i + 1}. ${context}`)
                : ''}`);
        }
    }
}
exports.ContextManager = ContextManager;


/***/ },

/***/ 2831
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SAS9ApiClient = void 0;
const time_1 = __webpack_require__(7247);
const form_data_1 = __importDefault(__webpack_require__(1894));
const Sas9RequestClient_1 = __webpack_require__(576);
const utils_1 = __webpack_require__(9266);
/**
 * A client for interfacing with the SAS9 REST API.
 *
 */
class SAS9ApiClient {
    constructor(serverUrl, jobsPath, httpsAgentOptions) {
        this.serverUrl = serverUrl;
        this.jobsPath = jobsPath;
        if (serverUrl)
            (0, utils_1.isUrl)(serverUrl);
        this.requestClient = new Sas9RequestClient_1.Sas9RequestClient(serverUrl, httpsAgentOptions);
    }
    /**
     * Returns an object containing server URL.
     */
    getConfig() {
        return {
            serverUrl: this.serverUrl
        };
    }
    /**
     * Updates server URL which is not null.
     * @param serverUrl - URL of the server to be set.
     */
    setConfig(serverUrl) {
        if (serverUrl)
            this.serverUrl = serverUrl;
    }
    /**
     * Executes code on a SAS9 server.
     * @param linesOfCode - an array of code lines to execute.
     * @param userName - the user name to log into the current SAS server. Deprecated with the SAS 9 username / password login - see the "SAS 9 credentials" note in the README.
     * @param password - the password to log into the current SAS server. Deprecated with the SAS 9 username / password login - see the "SAS 9 credentials" note in the README.
     */
    executeScript(linesOfCode, userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requestClient.login(userName, password, this.jobsPath);
            // This piece of code forces a webout to prevent Stored Process Errors.
            const forceOutputCode = [
                'data _null_;',
                'file _webout;',
                `put 'Executed sasjs run';`,
                'run;'
            ];
            const formData = generateFileUploadForm([...linesOfCode, ...forceOutputCode].join('\n'));
            const codeInjectorPath = `/User Folders/${userName}/My Folder/sasjs/runner`;
            const contentType = 'multipart/form-data; boundary=' + formData.getBoundary();
            const contentLength = formData.getLengthSync();
            const headers = {
                'cache-control': 'no-cache',
                Accept: '*/*',
                'Content-Type': contentType,
                'Content-Length': contentLength,
                Connection: 'keep-alive'
            };
            const storedProcessUrl = `${this.jobsPath}/?${'_program=' + codeInjectorPath + '&_debug=log'}`;
            const response = yield this.requestClient.post(storedProcessUrl, formData, undefined, contentType, headers);
            return response.result;
        });
    }
}
exports.SAS9ApiClient = SAS9ApiClient;
const generateFileUploadForm = (data) => {
    const formData = new form_data_1.default();
    const filename = `sasjs-execute-sas9-${(0, time_1.generateTimestamp)('')}.sas`;
    formData.append(filename, data, {
        filename,
        contentType: 'text/plain'
    });
    return formData;
};


/***/ },

/***/ 2015
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SASViyaApiClient = void 0;
const utils_1 = __webpack_require__(9266);
const form_data_1 = __importDefault(__webpack_require__(1894));
const errors_1 = __webpack_require__(7388);
const SessionManager_1 = __webpack_require__(8697);
const ContextManager_1 = __webpack_require__(5372);
const types_1 = __webpack_require__(3631);
const isAuthorizeFormRequired_1 = __webpack_require__(7607);
const error_1 = __webpack_require__(6340);
const pollJobState_1 = __webpack_require__(1514);
const getTokens_1 = __webpack_require__(9609);
const uploadTables_1 = __webpack_require__(8563);
const executeOnComputeApi_1 = __webpack_require__(3722);
const getAccessTokenForViya_1 = __webpack_require__(1674);
const refreshTokensForViya_1 = __webpack_require__(5747);
const host_1 = __webpack_require__(5334);
/**
 * A client for interfacing with the SAS Viya REST API.
 *
 */
class SASViyaApiClient {
    constructor(serverUrl, rootFolderName, contextName, requestClient) {
        this.serverUrl = serverUrl;
        this.rootFolderName = rootFolderName;
        this.contextName = contextName;
        this.requestClient = requestClient;
        this._debug = false;
        this.sessionManager = new SessionManager_1.SessionManager(this.serverUrl, this.contextName, this.requestClient);
        this.contextManager = new ContextManager_1.ContextManager(this.serverUrl, this.requestClient);
        this.folderMap = new Map();
        this.fileExtensionMap = new Map();
        this.boolExtensionMap = false; // required in case the map has zero entries
        if (serverUrl)
            (0, utils_1.isUrl)(serverUrl);
    }
    // after an attempt to populate it.
    /**
     * A helper method used to call appendRequest method of RequestClient
     * @param response - response from sasjs request
     * @param program - name of program
     * @param debug - a boolean that indicates whether debug was enabled or not
     */
    appendRequest(response, program, debug) {
        this.requestClient.appendRequest(response, program, debug);
    }
    get debug() {
        return this._debug;
    }
    set debug(value) {
        this._debug = value;
        if (this.sessionManager) {
            this.sessionManager.debug = value;
        }
    }
    /**
     * Returns a list of jobs in the currently set root folder.
     */
    getJobsInFolder(folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = (0, utils_1.isRelativePath)(folderPath)
                ? `${this.rootFolderName}/${folderPath}`
                : folderPath;
            if (this.folderMap.get(path)) {
                return this.folderMap.get(path);
            }
            yield this.populateFolderMap(path);
            return this.folderMap.get(path);
        });
    }
    /**
     * Returns an object containing the server URL and root folder name.
     */
    getConfig() {
        return {
            serverUrl: this.serverUrl,
            rootFolderName: this.rootFolderName
        };
    }
    /**
     * Updates server URL and root folder name, if it was not set.
     * @param serverUrl - the URL of the server.
     * @param rootFolderName - the name for root folder.
     */
    setConfig(serverUrl, rootFolderName) {
        if (serverUrl)
            this.serverUrl = serverUrl;
        if (rootFolderName)
            this.rootFolderName = rootFolderName;
    }
    /**
     * Returns all available compute contexts on this server.
     * @param accessToken - an access token for an authorized user.
     */
    getComputeContexts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.getComputeContexts(accessToken);
        });
    }
    /**
     * Returns default(system) compute contexts.
     */
    getDefaultComputeContexts() {
        return this.contextManager.getDefaultComputeContexts;
    }
    /**
     * Returns all available launcher contexts on this server.
     * @param accessToken - an access token for an authorized user.
     */
    getLauncherContexts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.getLauncherContexts(accessToken);
        });
    }
    /**
     * Returns all compute contexts on this server that the user has access to.
     * @param authConfig - an access token, refresh token, client and secret for an authorized user.
     */
    getExecutableContexts(authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const bindedExecuteScript = this.executeScript.bind(this);
            return yield this.contextManager.getExecutableContexts(bindedExecuteScript, authConfig);
        });
    }
    /**
     * Creates a session on the given context.
     * @param contextName - the name of the context to create a session on.
     * @param accessToken - an access token for an authorized user.
     */
    createSession(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json'
            };
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            const { result: contexts } = yield this.requestClient.get(`/compute/contexts?limit=10000`, accessToken);
            const executionContext = contexts.items && contexts.items.length
                ? contexts.items.find((c) => c.name === contextName)
                : null;
            if (!executionContext) {
                throw new Error(`Execution context ${contextName} not found.`);
            }
            const { result: createdSession } = yield this.requestClient.post(`/compute/contexts/${executionContext.id}/sessions`, {}, accessToken);
            return createdSession;
        });
    }
    /**
     * Creates a compute context on the given server.
     * @param contextName - the name of the context to be created.
     * @param launchContextName - the name of the launcher context used by the compute service.
     * @param sharedAccountId - the ID of the account to run the servers for this context.
     * @param autoExecLines - the lines of code to execute during session initialization.
     * @param accessToken - an access token for an authorized user.
     * @param authorizedUsers - an optional list of authorized user IDs.
     */
    createComputeContext(contextName, launchContextName, sharedAccountId, autoExecLines, accessToken, authorizedUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.createComputeContext(contextName, launchContextName, sharedAccountId, autoExecLines, accessToken, authorizedUsers);
        });
    }
    /**
     * Creates a launcher context on the given server.
     * @param contextName - the name of the context to be created.
     * @param description - the description of the context to be created.
     * @param launchType - launch type of the context to be created.
     * @param accessToken - an access token for an authorized user.
     */
    createLauncherContext(contextName_1, description_1) {
        return __awaiter(this, arguments, void 0, function* (contextName, description, launchType = 'direct', accessToken) {
            return yield this.contextManager.createLauncherContext(contextName, description, launchType, accessToken);
        });
    }
    /**
     * Updates a compute context on the given server.
     * @param contextName - the original name of the context to be updated.
     * @param editedContext - an object with the properties to be updated.
     * @param accessToken - an access token for an authorized user.
     */
    editComputeContext(contextName, editedContext, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.editComputeContext(contextName, editedContext, accessToken);
        });
    }
    /**
     * Deletes a compute context on the given server.
     * @param contextName - the name of the context to be deleted.
     * @param accessToken - an access token for an authorized user.
     */
    deleteComputeContext(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.deleteComputeContext(contextName, accessToken);
        });
    }
    /**
     * Executes code on the current SAS Viya server.
     * @param jobPath - the path to the file being submitted for execution.
     * @param linesOfCode - an array of code lines to execute.
     * @param contextName - the context to execute the code in.
     * @param authConfig - an object containing an access token, refresh token, client ID and secret.
     * @param data - execution data.
     * @param debug - when set to true, the log will be returned.
     * @param expectWebout - when set to true, the automatic _webout fileref will be checked for content, and that content returned. This fileref is used when the Job contains a SASjs web request (as opposed to executing arbitrary SAS code).
     * @param waitForResult - when set to true, function will return the session
     * @param pollOptions - an object that represents poll interval(milliseconds) and maximum amount of attempts. Object example: { maxPollCount: 24 * 60 * 60, pollInterval: 1000 }. More information available at src/api/viya/pollJobState.ts.
     * @param printPid - a boolean that indicates whether the function should print (PID) of the started job.
     * @param variables - an object that represents macro variables.
     * @param onTokensRefreshed - optional callback invoked with the rotated token pair after a successful internal refresh, so consumers that persist tokens can store the new pair.
     */
    executeScript(jobPath_1, linesOfCode_1, contextName_1, authConfig_1) {
        return __awaiter(this, arguments, void 0, function* (jobPath, linesOfCode, contextName, authConfig, data = null, debug = false, expectWebout = false, waitForResult = true, pollOptions, printPid = false, variables, onTokensRefreshed) {
            return (0, executeOnComputeApi_1.executeOnComputeApi)(this.requestClient, this.sessionManager, this.rootFolderName, jobPath, linesOfCode, contextName, authConfig, data, debug, expectWebout, waitForResult, pollOptions, printPid, variables, onTokensRefreshed);
        });
    }
    /**
     * Fetches the file content for a file in the specified folder.
     *
     * @param folderPath - the full path to the folder containing the file. eg: /Public/folder1/folder2
     * @param fileName - the name of the file in the `folderPath`
     * @param accessToken - an access token for authorizing the request
     */
    getFileContent(folderPath, fileName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileUri = yield this.getFileUri(folderPath, fileName, accessToken).catch((err) => {
                throw (0, error_1.prefixMessage)(err, `Error while getting file URI for: ${fileName} in folder: ${folderPath}. `);
            });
            return yield this.requestClient
                .get(`${this.serverUrl}${fileUri}/content`, accessToken)
                .then((res) => res.result);
        });
    }
    /**
     * Updates the file content for a file in the specified folder.
     *
     * @param folderPath - the full path to the folder containing the file. eg: /Public/folder1/folder2
     * @param fileName - the name of the file in the `folderPath`
     * @param content - the new content to be written to the file
     * @param accessToken - an access token for authorizing the request
     */
    updateFileContent(folderPath, fileName, content, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileUri = yield this.getFileUri(folderPath, fileName, accessToken).catch((err) => {
                throw (0, error_1.prefixMessage)(err, `Error while getting file URI for: ${fileName} in folder: ${folderPath}. `);
            });
            // Fetch the file resource details to get the Etag and content type
            const { result: originalFileResource, etag } = yield this.requestClient.get(`${this.serverUrl}${fileUri}`, accessToken);
            if (!originalFileResource || !etag)
                throw new Error(`File ${fileName} does not have an ETag, or request failed.`);
            return yield this.requestClient
                .put(`${this.serverUrl}${fileUri}/content`, content, accessToken, {
                'If-Match': etag,
                'Content-Type': originalFileResource.contentType
            })
                .then((res) => res.result);
        });
    }
    /**
     * Fetches a folder. Path to the folder is required.
     * @param folderPath - the absolute path to the folder.
     * @param accessToken - an access token for authorizing the request.
     */
    getFolder(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestClient
                .get(`/folders/folders/@item?path=${folderPath}`, accessToken)
                .then((res) => res.result);
        });
    }
    /**
     * Creates a file. Path to or URI of the parent folder is required.
     * @param fileName - the name of the new file.
     * @param contentBuffer - the content of the new file in Buffer.
     * @param parentFolderPath - the full path to the parent folder.  If not
     *  provided, the parentFolderUri must be provided.
     * @param parentFolderUri - the URI (eg /folders/folders/UUID) of the parent
     *  folder. If not provided, the parentFolderPath must be provided.
     * @param accessToken - an access token for authorizing the request.
     */
    createFile(fileName, contentBuffer, parentFolderPath, parentFolderUri, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!parentFolderPath && !parentFolderUri) {
                throw new Error('Path or URI of the parent folder is required.');
            }
            if (!parentFolderUri && parentFolderPath) {
                parentFolderUri = yield this.getFolderUri(parentFolderPath, accessToken);
            }
            const headers = {
                Accept: 'application/vnd.sas.file+json',
                'Content-Disposition': `filename="${fileName}";`
            };
            const formData = new form_data_1.default();
            formData.append('file', contentBuffer, fileName);
            /** Query Viya for file metadata based on extension type. */
            // typeDefName - Viya accepts this property during the file creation
            let typeDefName = undefined;
            // Additional properties are supplied by a patch.
            let filePatch = undefined;
            // The patching process requires properties related to the file-extension
            const fileExtension = (_a = fileName
                .split('.')
                .pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (fileExtension) {
                if (!this.boolExtensionMap) {
                    // Populate the file extension map
                    // 1. Get Viya's response to this api call
                    const typesQueryUrl = `/types/types?limit=999999`;
                    const response = (yield this.requestClient.get(typesQueryUrl, accessToken)).result;
                    // 2. Filter the returned items that have file extensions into a map
                    //    using forEach as an item may relate to multiple file extensions.
                    response.items
                        .filter((e) => e.extensions)
                        .forEach((e) => {
                        var _a;
                        (_a = e.extensions) === null || _a === void 0 ? void 0 : _a.forEach((ext) => {
                            this.fileExtensionMap.set(ext, {
                                // `name` becomes the typeDefName value at file creation time.
                                // `name` is ignored here if it is not populated in the map, or
                                // has a blank/empty value.
                                typeDefName: e.name
                                    ? e.name.trim().length
                                        ? e.name.trim()
                                        : undefined
                                    : undefined,
                                properties: e.properties
                            });
                        });
                    });
                    // 3. Toggle the flag to avoid repeating this step
                    this.boolExtensionMap = true;
                }
                // Query the map for the current file extension
                const fileExtInfo = this.fileExtensionMap.get(fileExtension);
                if (fileExtInfo) {
                    // If the extension was found in the map, record the typeDefName and
                    // create a patch if a properties object was returned.
                    typeDefName = fileExtInfo.typeDefName;
                    if (fileExtInfo.properties)
                        filePatch = { name: fileName, properties: fileExtInfo.properties };
                }
            }
            // Create the file
            const createFileResponse = yield this.requestClient.post(`/files/files?parentFolderUri=${parentFolderUri}&typeDefName=${typeDefName !== null && typeDefName !== void 0 ? typeDefName : 'file'}#rawUpload`, formData, accessToken, 'multipart/form-data; boundary=' + formData._boundary, headers);
            // If a patch was created...
            if (filePatch) {
                try {
                    const patchHeaders = {
                        Accept: 'application/json',
                        'If-Match': '*'
                    };
                    // Get the URI of the newly created file
                    const fileUri = createFileResponse.result.links.filter((e) => e.method == 'PATCH' && e.rel == 'patch')[0].uri;
                    // and apply the patch
                    return (yield this.requestClient.patch(`${fileUri}`, filePatch, accessToken, patchHeaders)).result;
                }
                catch (e) {
                    throw new Error(`Error patching file ${fileName}.\n${e.message}`);
                }
            }
            return createFileResponse.result;
        });
    }
    /**
     * Creates a folder. Path to or URI of the parent folder is required.
     * @param folderName - the name of the new folder.
     * @param parentFolderPath - the full path to the parent folder.  If not
     *  provided, the parentFolderUri must be provided.
     * @param parentFolderUri - the URI (eg /folders/folders/UUID) of the parent
     *  folder. If not provided, the parentFolderPath must be provided.
     * @param accessToken - an access token for authorizing the request.
     * @param isForced - flag that indicates if target folder already exists, it and all subfolders have to be deleted.
     */
    createFolder(folderName, parentFolderPath, parentFolderUri, accessToken, isForced) {
        return __awaiter(this, void 0, void 0, function* () {
            const logger = (0, host_1.getLogger)();
            if (!parentFolderPath && !parentFolderUri) {
                throw new Error('Path or URI of the parent folder is required.');
            }
            if (!parentFolderUri && parentFolderPath) {
                parentFolderUri = yield this.getFolderUri(parentFolderPath, accessToken);
                if (!parentFolderUri) {
                    logger.info(`Parent folder at path '${parentFolderPath}' is not present.`);
                    const newParentFolderPath = parentFolderPath.substring(0, parentFolderPath.lastIndexOf('/'));
                    const newFolderName = `${parentFolderPath.split('/').pop()}`;
                    if (newParentFolderPath === '') {
                        throw new errors_1.RootFolderNotFoundError(parentFolderPath, this.serverUrl, accessToken);
                    }
                    logger.info(`Creating parent folder:\n'${newFolderName}' in '${newParentFolderPath}'`);
                    const parentFolder = yield this.createFolder(newFolderName, newParentFolderPath, undefined, accessToken);
                    logger.info(`Parent folder '${newFolderName}' has been successfully created.`);
                    parentFolderUri = `/folders/folders/${parentFolder.id}`;
                }
                else if (isForced) {
                    const folderPath = parentFolderPath + '/' + folderName;
                    const folderUri = yield this.getFolderUri(folderPath, accessToken);
                    if (folderUri) {
                        yield this.deleteFolder(parentFolderPath + '/' + folderName, accessToken);
                    }
                }
            }
            const { result: createFolderResponse } = yield this.requestClient
                .post(`/folders/folders?parentFolderUri=${parentFolderUri}`, {
                name: folderName,
                type: 'folder'
            }, accessToken)
                .catch((err) => {
                const { message, response } = err;
                if (message && response && response.data && response.data.message) {
                    const { status } = response;
                    const { message: responseMessage } = response.data;
                    const messages = [message, responseMessage].map((mes) => /\.$/.test(mes) ? mes : `${mes}.`);
                    if (!isForced && status === 409) {
                        messages.push(`To override, please set "isForced" to "true".`);
                    }
                    const errMessage = messages.join(' ');
                    throw errMessage;
                }
                throw err;
            });
            // update folder map with newly created folder.
            yield this.populateFolderMap(`${parentFolderPath}/${folderName}`, accessToken);
            return createFolderResponse;
        });
    }
    /**
     * Creates a Job in the specified folder (or folder uri).
     * @param parentFolderPath - the location of the new job.
     * @param parentFolderUri - the URI location of the new job. The function is a
     * little faster if the folder URI is supplied instead of the path.
     * @param jobName - the name of the new job to be created.
     * @param code - the SAS code for the new job.
     */
    createJobDefinition(jobName, code, parentFolderPath, parentFolderUri, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!parentFolderPath && !parentFolderUri) {
                throw new Error(`Path to or URI of the parent folder is required.`);
            }
            if (!parentFolderUri && parentFolderPath) {
                parentFolderUri = yield this.getFolderUri(parentFolderPath, accessToken);
            }
            return yield this.requestClient.post(`${this.serverUrl}/jobDefinitions/definitions?parentFolderUri=${parentFolderUri}`, {
                name: jobName,
                parameters: [
                    {
                        name: '_addjesbeginendmacros',
                        type: 'CHARACTER',
                        defaultValue: 'false'
                    }
                ],
                type: 'Compute',
                code
            }, accessToken);
        });
    }
    /**
     * Performs a login redirect and returns an auth code for the given client.
     * @param clientId - the client ID to authenticate with.
     */
    getAuthCode(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUrl = `${this.serverUrl}/SASLogon/oauth/authorize?client_id=${clientId}&response_type=code`;
            const authCode = yield this.requestClient
                .get(authUrl, undefined, 'text/plain')
                .then((response) => response.result)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                let code = '';
                if ((0, isAuthorizeFormRequired_1.isAuthorizeFormRequired)(response)) {
                    const formResponse = yield this.requestClient.authorize(response);
                    const responseBody = formResponse
                        .split('<body>')[1]
                        .split('</body>')[0];
                    const bodyElement = document.createElement('div');
                    bodyElement.innerHTML = responseBody;
                    code = bodyElement.querySelector('.infobox h4').innerText;
                    return code;
                }
                else {
                    const responseBody = response.split('<body>')[1].split('</body>')[0];
                    const bodyElement = document.createElement('div');
                    bodyElement.innerHTML = responseBody;
                    if (bodyElement) {
                        code = bodyElement.querySelector('.infobox h4').innerText;
                    }
                    return code;
                }
            }))
                .catch(() => null);
            return authCode;
        });
    }
    /**
     * Exchanges the auth code for an access token for the given client.
     * @param clientId - the client ID to authenticate with.
     * @param clientSecret - the client secret to authenticate with.
     * @param authCode - the auth code received from the server.
     */
    getAccessToken(clientId, clientSecret, authCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getAccessTokenForViya_1.getAccessTokenForViya)(this.requestClient, clientId, clientSecret, authCode);
        });
    }
    /**
     * Exchanges the refresh token for an access token for the given client.
     * This method can only be used by Node.
     * @param clientId - the client ID to authenticate with.
     * @param clientSecret - the client secret to authenticate with.
     * @param refreshToken - the refresh token received from the server.
     */
    refreshTokens(clientId, clientSecret, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, refreshTokensForViya_1.refreshTokensForViya)(this.requestClient, clientId, clientSecret, refreshToken);
        });
    }
    /**
     * Deletes the client representing the supplied ID.
     * @param clientId - the client ID to authenticate with.
     * @param accessToken - an access token for authorizing the request.
     */
    deleteClient(clientId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.serverUrl + `/oauth/clients/${clientId}`;
            const headers = {};
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            const deleteResponse = yield this.requestClient.delete(url, accessToken);
            return deleteResponse.result;
        });
    }
    /**
     * Executes a job via the SAS Viya Compute API.
     * @param sasJob - the relative path to the job.
     * @param contextName - the name of the context where the job is to be executed.
     * @param debug - sets the _debug flag in the job arguments.
     * @param data - any data to be passed in as input to the job.
     * @param accessToken - an optional access token for an authorized user.
     * @param waitForResult - a boolean indicating if the function should wait for a result.
     * @param expectWebout - a boolean indicating whether to expect a _webout response.
     * @param pollOptions - an object that represents poll interval(milliseconds) and maximum amount of attempts. Object example: { maxPollCount: 24 * 60 * 60, pollInterval: 1000 }. More information available at src/api/viya/pollJobState.ts.
     * @param printPid - a boolean that indicates whether the function should print (PID) of the started job.
     * @param variables - an object that represents macro variables.
     */
    executeComputeJob(sasJob_1, contextName_1, debug_1, data_1, authConfig_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, contextName, debug, data, authConfig, waitForResult = true, expectWebout = false, pollOptions, printPid = false, variables, onTokensRefreshed) {
            let access_token = (authConfig || {}).access_token;
            if (authConfig) {
                ;
                ({ access_token } = yield (0, getTokens_1.getTokens)(this.requestClient, authConfig, types_1.ServerType.SasViya, onTokensRefreshed));
            }
            if ((0, utils_1.isRelativePath)(sasJob) && !this.rootFolderName) {
                throw new Error('Relative paths cannot be used without specifying a root folder name');
            }
            const folderPathParts = sasJob.split('/');
            const jobName = folderPathParts.pop();
            const folderPath = folderPathParts.join('/');
            const fullFolderPath = (0, utils_1.isRelativePath)(sasJob)
                ? `${this.rootFolderName}/${folderPath}`
                : folderPath;
            yield this.populateFolderMap(fullFolderPath, access_token).catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while populating folder map. ');
            });
            const jobFolder = this.folderMap.get(fullFolderPath);
            if (!jobFolder) {
                throw new Error(`The folder '${fullFolderPath}' was not found on '${this.serverUrl}'`);
            }
            const jobToExecute = jobFolder === null || jobFolder === void 0 ? void 0 : jobFolder.find((item) => item.name === jobName);
            if (!jobToExecute) {
                throw new Error(`Job was not found.`);
            }
            let code = jobToExecute === null || jobToExecute === void 0 ? void 0 : jobToExecute.code;
            if (!code) {
                const jobDefinitionLink = jobToExecute === null || jobToExecute === void 0 ? void 0 : jobToExecute.links.find((l) => l.rel === 'getResource');
                if (!jobDefinitionLink) {
                    throw new Error(`URI of job definition was not found.`);
                }
                const { result: jobDefinition } = yield this.requestClient
                    .get(`${this.serverUrl}${jobDefinitionLink.href}`, access_token)
                    .catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while getting job definition. ');
                });
                code = jobDefinition.code;
                // Adds code to existing job definition
                jobToExecute.code = code;
            }
            if (!code)
                code = '';
            const linesToExecute = code.replace(/\r\n/g, '\n').split('\n');
            return yield this.executeScript(sasJob, linesToExecute, contextName, authConfig, data, debug, expectWebout, waitForResult, pollOptions, printPid, variables, onTokensRefreshed);
        });
    }
    /**
     * Executes a job via the SAS Viya Job Execution API
     * @param sasJob - the relative or absolute path to the job.
     * @param contextName - the name of the context where the job is to be executed.
     * @param debug - sets the _debug flag in the job arguments.
     * @param data - any data to be passed in as input to the job.
     * @param accessToken - an optional access token for an authorized user.
     * @param onTokensRefreshed - optional callback invoked with the rotated token pair after a successful internal refresh, so consumers that persist tokens can store the new pair.
     */
    executeJob(sasJob, contextName, debug, data, authConfig, onTokensRefreshed) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            let access_token = (authConfig || {}).access_token;
            if (authConfig) {
                ;
                ({ access_token } = yield (0, getTokens_1.getTokens)(this.requestClient, authConfig, types_1.ServerType.SasViya, onTokensRefreshed));
            }
            if ((0, utils_1.isRelativePath)(sasJob) && !this.rootFolderName) {
                throw new Error('Relative paths cannot be used without specifying a root folder name.');
            }
            const folderPathParts = sasJob.split('/');
            const jobName = folderPathParts.pop();
            const folderPath = folderPathParts.join('/');
            const fullFolderPath = (0, utils_1.isRelativePath)(sasJob)
                ? `${this.rootFolderName}/${folderPath}`
                : folderPath;
            yield this.populateFolderMap(fullFolderPath, access_token);
            const jobFolder = this.folderMap.get(fullFolderPath);
            if (!jobFolder) {
                throw new Error(`The folder '${fullFolderPath}' was not found on '${this.serverUrl}'.`);
            }
            const jobToExecute = jobFolder === null || jobFolder === void 0 ? void 0 : jobFolder.find((item) => item.name === jobName);
            let files = [];
            if (data && Object.keys(data).length) {
                files = yield this.uploadTables(data, access_token);
            }
            if (!jobToExecute)
                throw new Error(`Job was not found.`);
            const jobDefinitionLink = (_a = jobToExecute === null || jobToExecute === void 0 ? void 0 : jobToExecute.links.find((l) => l.rel === 'getResource')) === null || _a === void 0 ? void 0 : _a.href;
            const { result: jobDefinition } = yield this.requestClient.get(`${this.serverUrl}${jobDefinitionLink}`, access_token);
            const jobArguments = {
                _contextName: contextName,
                _program: `${fullFolderPath}/${jobName}`,
                _webin_file_count: files.length,
                _OMITJSONLISTING: true,
                _OMITJSONLOG: true,
                _omitSessionResults: false,
                _OMITTEXTLISTING: true,
                _OMITTEXTLOG: true
            };
            if (debug) {
                jobArguments['_OMITTEXTLOG'] = 'false';
                jobArguments['_omitSessionResults'] = 'false';
                jobArguments['_DEBUG'] = 131;
            }
            files.forEach((fileInfo, index) => {
                jobArguments[`_webin_fileuri${index + 1}`] =
                    `/files/files/${fileInfo.file.id}`;
                jobArguments[`_webin_name${index + 1}`] = fileInfo.tableName;
            });
            // Viya JES requires arguments to be Map<String,String>; coerce booleans/numbers.
            const stringifiedArguments = {};
            for (const k of Object.keys(jobArguments)) {
                stringifiedArguments[k] = String(jobArguments[k]);
            }
            const postJobRequestBody = {
                name: `exec-${jobName}`,
                description: 'Powered by SASjs',
                jobDefinition,
                arguments: stringifiedArguments
            };
            const { result: postedJob } = yield this.requestClient.post(`${this.serverUrl}/jobExecution/jobs?_action=wait`, postJobRequestBody, access_token);
            const jobStatus = yield this.pollJobState(postedJob, authConfig, undefined, onTokensRefreshed).catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while polling job status. ');
            });
            const { result: currentJob } = yield this.requestClient.get(`${this.serverUrl}/jobExecution/jobs/${postedJob.id}`, access_token);
            let jobResult;
            let log;
            const resultLink = currentJob.results['_webout.json'];
            const logLink = currentJob.links.find((l) => l.rel === 'log');
            if (resultLink) {
                jobResult = yield this.requestClient.get(`${this.serverUrl}${resultLink}/content`, access_token, 'text/plain');
            }
            if (debug && logLink) {
                log = yield this.requestClient
                    .get(`${this.serverUrl}${logLink.href}/content`, access_token)
                    .then((res) => res.result.items.map((i) => i.line).join('\n'));
            }
            if (jobStatus === 'failed') {
                throw new errors_1.JobExecutionError((_b = currentJob.error) === null || _b === void 0 ? void 0 : _b.errorCode, (_c = currentJob.error) === null || _c === void 0 ? void 0 : _c.message, log);
            }
            const executionResult = {
                result: jobResult === null || jobResult === void 0 ? void 0 : jobResult.result,
                log
            };
            const { error } = currentJob;
            if (error)
                executionResult.error = error;
            return executionResult;
        });
    }
    populateFolderMap(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = (0, utils_1.isRelativePath)(folderPath)
                ? `${this.rootFolderName}/${folderPath}`
                : folderPath;
            if (this.folderMap.get(path)) {
                return;
            }
            const url = '/folders/folders/@item?path=' + path;
            const { result: folder } = yield this.requestClient
                .get(`${url}`, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting folder. ');
            });
            if (!folder) {
                throw new Error(`The path ${path} does not exist on ${this.serverUrl}`);
            }
            const { result: members } = yield this.requestClient
                .get(`/folders/folders/${folder.id}/members?limit=${folder.memberCount < 500 ? 500 : folder.memberCount}`, // this is a fix for https://github.com/sasjs/adapter/issues/669
            accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting members. ');
            });
            const itemsAtRoot = members.items;
            this.folderMap.set(path, itemsAtRoot);
        });
    }
    pollJobState(postedJob, authConfig, pollOptions, onTokensRefreshed) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, pollJobState_1.pollJobState)(this.requestClient, postedJob, this.debug, authConfig, pollOptions, undefined, onTokensRefreshed);
        });
    }
    uploadTables(data, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, uploadTables_1.uploadTables)(this.requestClient, data, accessToken);
        });
    }
    getFolderDetails(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = (0, utils_1.isUri)(folderPath)
                ? folderPath
                : `/folders/folders/@item?path=${folderPath}`;
            const { result: folder } = yield this.requestClient
                .get(`${this.serverUrl}${url}`, accessToken)
                .catch((err) => {
                if (err instanceof errors_1.CertificateError)
                    throw err;
                return { result: null };
            });
            if (!folder)
                return undefined;
            return folder;
        });
    }
    getFolderUri(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderDetails = yield this.getFolderDetails(folderPath, accessToken);
            if (!folderDetails)
                return undefined;
            return `/folders/folders/${folderDetails.id}`;
        });
    }
    getFileUri(folderPath, fileName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const folderMembers = yield this.listFolder(folderPath, accessToken, 1000, {
                returnDetails: true
            }).catch((err) => {
                throw (0, error_1.prefixMessage)(err, `Error while listing folder: ${folderPath}. `);
            });
            if (!folderMembers || !folderMembers.length)
                throw new Error(`No members found in folder: ${folderPath}`);
            const fileUri = (_a = folderMembers.find((member) => member.name === fileName)) === null || _a === void 0 ? void 0 : _a.uri;
            if (!fileUri)
                throw new Error(`File ${fileName} not found in folder: ${folderPath}`);
            return fileUri;
        });
    }
    getRecycleBinUri(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = '/folders/folders/@myRecycleBin';
            const { result: folder } = yield this.requestClient
                .get(`${this.serverUrl}${url}`, accessToken)
                .catch((err) => {
                if (err instanceof errors_1.CertificateError)
                    throw err;
                return { result: null };
            });
            if (!folder)
                return undefined;
            return `/folders/folders/${folder.id}`;
        });
    }
    /**
     * Returns a JSON representation of a compute context.
     * @example: { "createdBy": "admin", "links": [...], "id": "ID", "version": 2, "name": "context1" }
     * @param contextName - the name of the context to return.
     * @param accessToken - an access token for an authorized user.
     */
    getComputeContextByName(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.getComputeContextByName(contextName, accessToken);
        });
    }
    /**
     * Returns a JSON representation of a compute context.
     * @param contextId - an id of the context to return.
     * @param accessToken - an access token for an authorized user.
     */
    getComputeContextById(contextId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.contextManager.getComputeContextById(contextId, accessToken);
        });
    }
    /**
     * Lists children folders/files for given Viya folder.
     * @param sourceFolder - the full path (eg `/Public/example/myFolder`) or URI of the source folder listed. Providing URI instead of path will save one extra request.
     * @param accessToken - an access token for authorizing the request.
     * @param {Object} [options] - Additional options.
     * @param {boolean} [options.returnDetails=false] - when set to true, the function will return an array of objects with member details, otherwise it will return an array of member names.
     */
    listFolder(sourceFolder_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (sourceFolder, accessToken, limit = 20, options) {
            // checks if 'sourceFolder' is already a URI
            const sourceFolderUri = (0, utils_1.isUri)(sourceFolder)
                ? sourceFolder
                : yield this.getFolderUri(sourceFolder, accessToken);
            const { result: members } = yield this.requestClient.get(`${this.serverUrl}${sourceFolderUri}/members?limit=${limit}`, accessToken);
            let membersToReturn = [];
            if (members && members.items) {
                // If returnDetails is true, return full member details
                if (options === null || options === void 0 ? void 0 : options.returnDetails) {
                    membersToReturn = members.items;
                }
                else {
                    // If returnDetails is false, return only member names
                    membersToReturn = members.items.map((item) => item.name);
                }
            }
            // Return members without Etag
            return membersToReturn;
        });
    }
    /**
     * Moves Viya folder to a new location.  The folder may be renamed at the same time.
     * @param sourceFolder - the full path (eg `/Public/example/myFolder`) or URI of the source folder to be moved. Providing URI instead of path will save one extra request.
     * @param targetParentFolder - the full path or URI of the _parent_ folder to which the `sourceFolder` will be moved (eg `/Public/newDestination`). To move a folder, a user has to have write permissions in targetParentFolder. Providing URI instead of the path will save one extra request.
     * @param targetFolderName - the name of the "moved" folder.  If left blank, the original folder name will be used (eg `myFolder` in `/Public/newDestination/myFolder` for the example above).  Optional field.
     * @param accessToken - an access token for authorizing the request.
     */
    moveFolder(sourceFolder, targetParentFolder, targetFolderName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // If target path is an existing folder, than keep source folder name, othervise rename it with given target folder name
            const sourceFolderName = sourceFolder.split('/').pop();
            const targetFolderDetails = yield this.getFolderDetails(targetParentFolder, accessToken);
            if (!targetFolderDetails) {
                let targetParentFolderArr = targetParentFolder.split('/');
                targetParentFolderArr.splice(targetParentFolderArr.length - 1, 1);
                targetParentFolder = targetParentFolderArr.join('/');
            }
            else {
                targetFolderName = sourceFolderName;
            }
            // checks if 'sourceFolder' is already an URI
            const sourceFolderUri = yield this.getFolderUri(sourceFolder, accessToken);
            // checks if 'targetParentFolder' is already a URI
            const targetParentFolderUri = yield this.getFolderUri(targetParentFolder, accessToken);
            if (!sourceFolderUri) {
                return undefined;
            }
            const sourceFolderId = sourceFolderUri === null || sourceFolderUri === void 0 ? void 0 : sourceFolderUri.split('/').pop();
            const { result: folder } = yield this.requestClient
                .patch(`${this.serverUrl}${sourceFolderUri}`, {
                id: sourceFolderId,
                name: targetFolderName,
                parentFolderUri: targetParentFolderUri
            }, accessToken)
                .catch((err) => {
                if (err.code && err.code === 'ENOTFOUND') {
                    const notFoundError = {
                        body: {
                            message: `Folder '${sourceFolder
                                .split('/')
                                .pop()}' was not found.`
                        }
                    };
                    throw notFoundError;
                }
                throw err;
            });
            if (!folder)
                return undefined;
            return folder;
        });
    }
    /**
     * For performance (and in case of accidental error) the `deleteFolder` function does not actually delete the folder (and all its content and subfolder content). Instead the folder is simply moved to the recycle bin. Deletion time will be added to the folder name.
     * @param folderPath - the full path (eg `/Public/example/deleteThis`) of the folder to be deleted.
     * @param accessToken - an access token for authorizing the request.
     */
    deleteFolder(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const recycleBinUri = yield this.getRecycleBinUri(accessToken);
            const folderName = folderPath.split('/').pop() || '';
            const date = new Date();
            const timeMark = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            const deletedFolderName = folderName + ' ' + timeMark;
            const movedFolder = yield this.moveFolder(folderPath, recycleBinUri, deletedFolderName, accessToken);
            return movedFolder;
        });
    }
}
exports.SASViyaApiClient = SASViyaApiClient;


/***/ },

/***/ 9810
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(9266);
const types_1 = __webpack_require__(3574);
const SASViyaApiClient_1 = __webpack_require__(2015);
const SAS9ApiClient_1 = __webpack_require__(2831);
const SASjsApiClient_1 = __webpack_require__(5803);
const apiBasePath_1 = __webpack_require__(6838);
const auth_1 = __webpack_require__(4879);
const types_2 = __webpack_require__(3631);
const RequestClient_1 = __webpack_require__(8816);
const SasjsRequestClient_1 = __webpack_require__(7560);
const job_execution_1 = __webpack_require__(1391);
const defaultConfig = {
    serverUrl: '',
    // The one name the adapter needs for SASjs Server: the mount its routes sit
    // under. The stored-program endpoint under it is appended in the callers.
    pathSASJS: apiBasePath_1.DEFAULT_PATH_SASJS,
    pathSAS9: '/SASStoredProcess/do',
    pathSASViya: '/SASJobExecution',
    appLoc: '/Public/seedapp',
    serverType: types_2.ServerType.SasViya,
    debug: false,
    contextName: 'SAS Job Execution compute context',
    useComputeApi: null,
    loginMechanism: types_1.LoginMechanism.Default
};
/**
 * SASjs is a JavaScript adapter for SAS.
 *
 */
class SASjs {
    constructor(config) {
        this.sasjsConfig = new types_1.SASjsConfig();
        this.jobsPath = '';
        this.sasViyaApiClient = null;
        this.sas9ApiClient = null;
        this.sasJSApiClient = null;
        /** The mount the cached client was built for, so a change rebuilds it. */
        this.sasJSApiBasePath = null;
        this.fileUploader = null;
        this.authManager = null;
        this.requestClient = null;
        this.webJobExecutor = null;
        this.sasjsJobExecutor = null;
        this.computeJobExecutor = null;
        this.jesJobExecutor = null;
        this.sas9JobExecutor = null;
        this.resendWaitingRequests = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            yield ((_a = this.webJobExecutor) === null || _a === void 0 ? void 0 : _a.resendWaitingRequests());
            yield ((_b = this.computeJobExecutor) === null || _b === void 0 ? void 0 : _b.resendWaitingRequests());
            yield ((_c = this.jesJobExecutor) === null || _c === void 0 ? void 0 : _c.resendWaitingRequests());
            yield ((_d = this.fileUploader) === null || _d === void 0 ? void 0 : _d.resendWaitingRequests());
            yield ((_e = this.sasjsJobExecutor) === null || _e === void 0 ? void 0 : _e.resendWaitingRequests());
        });
        /**
         * Sets verbose mode.
         * @param verboseMode - value of the verbose mode, can be true, false or bleached(without extra colors).
         */
        this.setVerboseMode = (verboseMode) => {
            var _a;
            (_a = this.requestClient) === null || _a === void 0 ? void 0 : _a.setVerboseMode(verboseMode);
        };
        this.sasjsConfig = Object.assign(Object.assign({}, defaultConfig), config);
        this.setupConfiguration();
    }
    getCsrfToken(type = 'general') {
        var _a;
        return (_a = this.requestClient) === null || _a === void 0 ? void 0 : _a.getCsrfToken(type);
    }
    /**
     * Executes code on a SAS server.
     * @param linesOfCode - lines of code to run.
     * @param fileName - (required for server type sas viya) name of the file to run. It will be converted to path to the file being submitted for execution.
     * @param contextName - (required for server type sas viya) context name on which code will be run on the server.
     * @param runTime - (required for server type sasjs) a string to represent runTime for code execution.
     * @param authConfig - (optional) a valid client, secret, refresh and access tokens that are authorised to execute scripts.
     * @param authConfigSas9 - (required for server type sas9) a valid username and password that are authorised to execute scripts. Deprecated: the credentials are appended to the `_program` query string, which SAS 9 only accepts when the platform is configured to allow URL credentials. See the "SAS 9 credentials" note in the README.
     * @param debug - (optional) if true, global debug config will be overriden
     * @param onTokensRefreshed - (optional, SAS Viya only) callback invoked with the rotated token pair after a successful internal refresh, so consumers that persist tokens can store the new pair.
     */
    executeScript(_a) {
        return __awaiter(this, arguments, void 0, function* ({ linesOfCode, fileName, contextName, runTime, authConfig, authConfigSas9, debug, onTokensRefreshed }) {
            var _b, _c;
            this.isMethodSupported('executeScript', [
                types_2.ServerType.Sas9,
                types_2.ServerType.Sasjs,
                types_2.ServerType.SasViya
            ]);
            if (this.sasjsConfig.serverType === types_2.ServerType.Sas9) {
                if (!authConfigSas9)
                    throw new Error('Auth config for sas9 is not provided');
                return yield ((_b = this.sas9ApiClient) === null || _b === void 0 ? void 0 : _b.executeScript(linesOfCode, authConfigSas9.userName, authConfigSas9.password));
            }
            if (this.sasjsConfig.serverType === types_2.ServerType.Sasjs) {
                return yield ((_c = this.sasJSApiClient) === null || _c === void 0 ? void 0 : _c.executeScript(linesOfCode.join('\n'), runTime, authConfig));
            }
            if (this.sasjsConfig.serverType === types_2.ServerType.SasViya) {
                contextName = contextName || this.sasjsConfig.contextName;
                if (!contextName) {
                    throw new Error('Context name is undefined. Please set a `contextName` in your SASjs or override config.');
                }
                if (!fileName) {
                    throw new Error('File name is required in case of SAS VIYA. Please provide a `fileName`.');
                }
                return yield this.sasViyaApiClient.executeScript(fileName, linesOfCode, contextName, authConfig, null, debug ? debug : this.sasjsConfig.debug, false, true, undefined, false, undefined, onTokensRefreshed);
            }
        });
    }
    /**
     * Executes job on SASJS server.
     * @param query - an object containing job path and debug level.
     * @param appLoc - an application path.
     * @param authConfig - an object for authentication.
     * @returns a promise that resolves into job execution result and log.
     */
    executeJob(query, appLoc, authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.isMethodSupported('executeScript', [types_2.ServerType.Sasjs]);
            return yield ((_a = this.sasJSApiClient) === null || _a === void 0 ? void 0 : _a.executeJob(query, appLoc, authConfig));
        });
    }
    /**
     * Gets compute contexts.
     * @param accessToken - an access token for an authorised user.
     */
    getComputeContexts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getComputeContexts', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getComputeContexts(accessToken);
        });
    }
    /**
     * Gets launcher contexts.
     * @param accessToken - an access token for an authorised user.
     */
    getLauncherContexts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getLauncherContexts', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getLauncherContexts(accessToken);
        });
    }
    /**
     * Gets default(system) launcher contexts.
     */
    getDefaultComputeContexts() {
        this.isMethodSupported('getDefaultComputeContexts', [types_2.ServerType.SasViya]);
        return this.sasViyaApiClient.getDefaultComputeContexts();
    }
    /**
     * Gets executable compute contexts.
     * @param authConfig - an access token, refresh token, client and secret for an authorised user.
     */
    getExecutableContexts(authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getExecutableContexts', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getExecutableContexts(authConfig);
        });
    }
    /**
     * Creates a compute context on the given server.
     * @param contextName - the name of the context to be created.
     * @param launchContextName - the name of the launcher context used by the compute service.
     * @param sharedAccountId - the ID of the account to run the servers for this context as.
     * @param autoExecLines - the lines of code to execute during session initialization.
     * @param accessToken - an access token for an authorised user.
     * @param authorisedUsers - an optional list of authorised user IDs.
     */
    createComputeContext(contextName, launchContextName, sharedAccountId, autoExecLines, accessToken, authorisedUsers) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('createComputeContext', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.createComputeContext(contextName, launchContextName, sharedAccountId, autoExecLines, accessToken, authorisedUsers);
        });
    }
    /**
     * Creates a launcher context on the given server.
     * @param contextName - the name of the context to be created.
     * @param description - the description of the context to be created.
     * @param launchType - launch type of the context to be created.
     * @param accessToken - an access token for an authorised user.
     */
    createLauncherContext(contextName, description, launchType, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('createLauncherContext', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.createLauncherContext(contextName, description, launchType, accessToken);
        });
    }
    /**
     * Updates a compute context on the given server.
     * @param contextName - the original name of the context to be deleted.
     * @param editedContext - an object with the properties to be updated.
     * @param accessToken - an access token for an authorised user.
     */
    editComputeContext(contextName, editedContext, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('editComputeContext', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.editComputeContext(contextName, editedContext, accessToken);
        });
    }
    /**
     * Deletes a compute context on the given server.
     * @param contextName - the name of the context to be deleted.
     * @param accessToken - an access token for an authorised user.
     */
    deleteComputeContext(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('deleteComputeContext', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.deleteComputeContext(contextName, accessToken);
        });
    }
    /**
     * Returns a JSON representation of a compute context.
     * @example: { "createdBy": "admin", "links": [...], "id": "ID", "version": 2, "name": "context1" }
     * @param contextName - the name of the context to return.
     * @param accessToken - an access token for an authorised user.
     */
    getComputeContextByName(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getComputeContextByName', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getComputeContextByName(contextName, accessToken);
        });
    }
    /**
     * Returns a JSON representation of a compute context.
     * @param contextId - an id of the context to return.
     * @param accessToken - an access token for an authorised user.
     */
    getComputeContextById(contextId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getComputeContextById', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getComputeContextById(contextId, accessToken);
        });
    }
    createSession(contextName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('createSession', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.createSession(contextName, accessToken);
        });
    }
    /**
     * Creates a folder in the logical SAS folder tree
     * @param folderName - name of the folder to be created.
     * @param parentFolderPath - the full path (eg `/Public/example/myFolder`) of the parent folder.
     * @param parentFolderUri - the URI of the parent folder.
     * @param accessToken - the access token to authorizing the request.
     * @param sasApiClient - a client for interfacing with SAS API.
     * @param isForced - flag that indicates if target folder already exists, it and all subfolders have to be deleted. Applicable for SAS VIYA only.
     */
    createFolder(folderName, parentFolderPath, parentFolderUri, accessToken, sasApiClient, isForced) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sasApiClient) {
                return yield sasApiClient.createFolder(folderName, parentFolderPath, parentFolderUri, accessToken, isForced);
            }
            return yield this.sasViyaApiClient.createFolder(folderName, parentFolderPath, parentFolderUri, accessToken, isForced);
        });
    }
    /**
     * Creates a file in the logical SAS folder tree
     * @param fileName - name of the file to be created.
     * @param content - content of the file to be created.
     * @param parentFolderPath - the full path (eg `/Public/example/myFolder`) of the parent folder.
     * @param parentFolderUri - the URI of the parent folder.
     * @param accessToken - the access token to authorizing the request.
     * @param sasApiClient - a client for interfacing with SAS API.
     */
    createFile(fileName, content, parentFolderPath, parentFolderUri, accessToken, sasApiClient) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sasApiClient)
                return yield sasApiClient.createFile(fileName, content, parentFolderPath, parentFolderUri, accessToken);
            return yield this.sasViyaApiClient.createFile(fileName, content, parentFolderPath, parentFolderUri, accessToken);
        });
    }
    /**
     * Fetches the file content for a file in the specified folder.
     *
     * @param folderPath - the full path to the folder containing the file. eg: /Public/folder1/folder2
     * @param fileName - the name of the file in the `folderPath`
     * @param accessToken - an access token for authorizing the request
     */
    getFileContent(folderPath, fileName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getFileContent', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getFileContent(folderPath, fileName, accessToken);
        });
    }
    /**
     * Updates the file content for a file in the specified folder.
     *
     * @param folderPath - the full path to the folder containing the file. eg: /Public/folder1/folder2
     * @param fileName - the name of the file in the `folderPath`
     * @param content - the new content to be written to the file
     * @param accessToken - an access token for authorizing the request
     */
    updateFileContent(folderPath, fileName, content, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('updateFileContent', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.updateFileContent(folderPath, fileName, content, accessToken);
        });
    }
    /**
     * Fetches a folder from the SAS file system.
     * @param folderPath - path of the folder to be fetched.
     * @param accessToken - the access token to authorize the request.
     */
    getFolder(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getFolder', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getFolder(folderPath, accessToken);
        });
    }
    /**
     * For performance (and in case of accidental error) the `deleteFolder` function does not actually delete the folder (and all its content and subfolder content). Instead the folder is simply moved to the recycle bin. Deletion time will be added to the folder name.
     * @param folderPath - the full path (eg `/Public/example/deleteThis`) of the folder to be deleted.
     * @param accessToken - an access token for authorizing the request.
     */
    deleteFolder(folderPath, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.isMethodSupported('deleteFolder', [types_2.ServerType.SasViya]);
            return yield ((_a = this.sasViyaApiClient) === null || _a === void 0 ? void 0 : _a.deleteFolder(folderPath, accessToken));
        });
    }
    /**
     * Lists children folders for given Viya folder.
     * @param sourceFolder - the full path (eg `/Public/example/myFolder`) or URI of the source folder listed. Providing URI instead of path will save one extra request.
     * @param accessToken - an access token for authorizing the request.
     * @param returnDetails - when set to true, the function will return an array of objects with member details, otherwise it will return an array of member names.
     */
    listFolder(sourceFolder_1, accessToken_1, limit_1) {
        return __awaiter(this, arguments, void 0, function* (sourceFolder, accessToken, limit, returnDetails = false) {
            var _a;
            this.isMethodSupported('listFolder', [types_2.ServerType.SasViya]);
            return yield ((_a = this.sasViyaApiClient) === null || _a === void 0 ? void 0 : _a.listFolder(sourceFolder, accessToken, limit, {
                returnDetails
            }));
        });
    }
    /**
     * Moves folder to a new location.  The folder may be renamed at the same time.
     * @param sourceFolder - the full path (eg `/Public/example/myFolder`) or URI of the source folder to be moved. Providing URI instead of path will save one extra request.
     * @param targetParentFolder - the full path or URI of the _parent_ folder to which the `sourceFolder` will be moved (eg `/Public/newDestination`). To move a folder, a user has to have write permissions in targetParentFolder. Providing URI instead of path will save one extra request.
     * @param targetFolderName - the name of the "moved" folder.  If left blank, the original folder name will be used (eg `myFolder` in `/Public/newDestination/myFolder` for the example above).  Optional field.
     * @param accessToken - an access token for authorizing the request.
     */
    moveFolder(sourceFolder, targetParentFolder, targetFolderName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.isMethodSupported('moveFolder', [types_2.ServerType.SasViya]);
            return yield ((_a = this.sasViyaApiClient) === null || _a === void 0 ? void 0 : _a.moveFolder(sourceFolder, targetParentFolder, targetFolderName, accessToken));
        });
    }
    createJobDefinition(jobName, code, parentFolderPath, parentFolderUri, accessToken, sasApiClient) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('createJobDefinition', [types_2.ServerType.SasViya]);
            if (sasApiClient)
                return yield sasApiClient.createJobDefinition(jobName, code, parentFolderPath, parentFolderUri, accessToken);
            return yield this.sasViyaApiClient.createJobDefinition(jobName, code, parentFolderPath, parentFolderUri, accessToken);
        });
    }
    getAuthCode(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getAuthCode', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.getAuthCode(clientId);
        });
    }
    /**
     * Exchanges the auth code for an access token for the given client.
     * @param clientId - the client ID to authenticate with.
     * @param clientSecret - the client secret to authenticate with.
     * @param authCode - the auth code received from the server.
     */
    getAccessToken(clientId, clientSecret, authCode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('getAccessToken', [
                types_2.ServerType.SasViya,
                types_2.ServerType.Sasjs
            ]);
            if (this.sasjsConfig.serverType === types_2.ServerType.Sasjs)
                return yield this.sasJSApiClient.getAccessToken(clientId, authCode);
            return yield this.sasViyaApiClient.getAccessToken(clientId, clientSecret, authCode);
        });
    }
    /**
     * Exchanges the refresh token for an access token for the given client.
     * @param clientId - the client ID to authenticate with.
     * @param clientSecret - the client secret to authenticate with.
     * @param refreshToken - the refresh token received from the server.
     */
    refreshTokens(clientId, clientSecret, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('refreshTokens', [
                types_2.ServerType.SasViya,
                types_2.ServerType.Sasjs
            ]);
            if (this.sasjsConfig.serverType === types_2.ServerType.Sasjs)
                return yield this.sasJSApiClient.refreshTokens(refreshToken);
            return yield this.sasViyaApiClient.refreshTokens(clientId, clientSecret, refreshToken);
        });
    }
    deleteClient(clientId, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMethodSupported('deleteClient', [types_2.ServerType.SasViya]);
            return yield this.sasViyaApiClient.deleteClient(clientId, accessToken);
        });
    }
    /**
     * Returns the current SASjs configuration.
     *
     */
    getSasjsConfig() {
        return this.sasjsConfig;
    }
    /**
     * Returns the username of the user currently logged in.
     *
     */
    getUserName() {
        return this.authManager.userName;
    }
    /**
     * Sets the SASjs configuration.
     * @param config - SASjs configuration.
     */
    setSASjsConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sasjsConfig = Object.assign(Object.assign({}, this.sasjsConfig), config);
            this.setupConfiguration();
        });
    }
    /**
     * The mount every SASjs Server route sits under, normalised.
     *
     * This is the read side of `pathSASJS`, and the only place the value is
     * interpreted: one leading slash, no trailing one (`/api/` and ` api/ ` are
     * both `/api`), a value carrying the stored-program endpoint
     * (`/api/stp/execute`) is read as the mount it names, and absent or empty
     * means `/SASjsApi`. A root mount is `/` - a proxy that puts the API at the
     * origin - and a caller concatenating onto it contributes `''` for that
     * case rather than the value verbatim, because `${serverUrl}/` + `/stp/...`
     * is a doubled slash and a different URL to a proxy.
     *
     * A Viya or SAS 9 project has no such mount: neither server type reads
     * `pathSASJS`, so this answers the default `/SASjsApi` for them.
     *
     * Public so a consumer that composes a URL by hand - `<mount>/stp/execute`
     * for a `?_program=` link, or a route it builds for the drive and info
     * endpoints - asks the adapter instead of re-implementing the normalisation
     * or deep-importing the `apiBasePath` module. Note that
     * `getSasjsConfig().pathSASJS` is not this value: it reads back as configured,
     * or `/SASjsApi` when it was never set (the constructor's default), so a
     * caller cannot tell a defaulted value from one configured as `/SASjsApi`
     * there - this accessor is the answer to what the mount is.
     */
    getApiBasePath() {
        // Only a SASjs Server project has this mount; a Viya or SAS 9 project never
        // reads the value.
        if (this.sasjsConfig.serverType !== types_2.ServerType.Sasjs)
            return apiBasePath_1.DEFAULT_API_BASE_PATH;
        return (0, apiBasePath_1.apiBaseFromPathSASJS)(this.sasjsConfig.pathSASJS);
    }
    /**
     * Sets the debug state. Turning this on will enable additional logging in the adapter.
     * @param value - boolean indicating debug state (on/off).
     */
    setDebugState(value) {
        this.sasjsConfig.debug = value;
        if (this.sasViyaApiClient) {
            this.sasViyaApiClient.debug = value;
        }
    }
    /**
     * Checks whether a session is active, or login is required.
     * @returns - a promise which resolves with an object containing two values - a boolean `isLoggedIn`, and a string `userName`.
     */
    checkSession() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authManager.checkSession();
        });
    }
    /**
     * Logs into the SAS server with the supplied credentials.
     * @param username - a string representing the username.
     * @param password - a string representing the password.
     * @param clientId - a string representing the client ID.
     */
    logIn(username_1, password_1, clientId_1) {
        return __awaiter(this, arguments, void 0, function* (username, password, clientId, options = {}) {
            if (this.sasjsConfig.loginMechanism === types_1.LoginMechanism.Default) {
                if (!username || !password)
                    throw new Error('A username and password are required when using the default login mechanism.');
                return this.authManager.logIn(username, password);
            }
            if (typeof window === typeof undefined) {
                throw new Error('The redirected login mechanism is only available for use in the browser.');
            }
            return this.authManager.redirectedLogIn(options);
        });
    }
    /**
     * Logs out of the configured SAS server.
     */
    logOut() {
        return this.authManager.logOut();
    }
    /**
     * Uploads a file to the given service.
     * @param sasJob - the path to the SAS program (ultimately resolves to
     *  the SAS `_program` parameter to run a Job Definition or SAS 9 Stored
     *  Process). Is prepended at runtime with the value of `appLoc`.
     * @param files - array of files to be uploaded, including File object and file name.
     * @param params - request URL parameters.
     * @param config - provide any changes to the config here, for instance to
     * enable/disable `debug`. Any change provided will override the global config,
     * for that particular function call.
     * @param loginRequiredCallback - a function that is called if the
     * user is not logged in (eg to display a login form). The request will be
     * resubmitted after successful login.
     */
    uploadFile(sasJob_1, files_1, params_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, files, params, config = {}, loginRequiredCallback) {
            config = Object.assign(Object.assign({}, this.sasjsConfig), config);
            const data = { files, params };
            return yield this.fileUploader.execute(sasJob, data, config, loginRequiredCallback);
        });
    }
    /**
     * Makes a request to program specified in `SASjob` (could be a Viya Job, a
     * SAS 9 Stored Process, or a SASjs Server Stored Program). The response
     * object will always contain table names in lowercase, and column names in
     * uppercase. Values are returned formatted by default, unformatted
     * values can be configured as an option in the `%webout` macro.
     *
     * @param sasJob - the path to the SAS program (ultimately resolves to
     *  the SAS `_program` parameter to run a Job Definition or SAS 9 Stored
     *  Process). Is prepended at runtime with the value of `appLoc`.
     * @param data - a JSON object containing one or more tables to be sent to
     * SAS.  For an example of the table structure, see the project README. This
     * value can be `null` if no inputs are required.
     * @param config - provide any changes to the config here, for instance to
     * enable/disable `debug`. Any change provided will override the global config,
     * for that particular function call.
     * @param loginRequiredCallback - a function that is called if the
     * user is not logged in (eg to display a login form). The request will be
     * resubmitted after successful login.
     * When using a `loginRequiredCallback`, the call to the request will look, for example, like so:
     * `await request(sasJobPath, data, config, () => setIsLoggedIn(false))`
     * If you are not passing in any data and configuration, it will look like so:
     * `await request(sasJobPath, {}, {}, () => setIsLoggedIn(false))`
     * @param extraResponseAttributes - a array of predefined values that are used
     * to provide extra attributes (same names as those values) to be added in response
     * Supported values are declared in ExtraResponseAttributes type.
     */
    request(sasJob_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, data, config = {}, loginRequiredCallback, authConfig, extraResponseAttributes = []) {
            config = Object.assign(Object.assign({}, this.sasjsConfig), config);
            const validationResult = (0, utils_1.validateInput)(data);
            // status is true if the data passes validation checks above
            if (validationResult.status) {
                if (config.serverType === types_2.ServerType.Sasjs) {
                    return yield this.sasjsJobExecutor.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes);
                }
                else if (config.serverType === types_2.ServerType.SasViya &&
                    config.useComputeApi !== undefined &&
                    config.useComputeApi !== null) {
                    if (config.useComputeApi) {
                        return yield this.computeJobExecutor.execute(sasJob, data, config, loginRequiredCallback, authConfig);
                    }
                    else {
                        if (!config.contextName)
                            config = Object.assign(Object.assign({}, config), { contextName: 'SAS Job Execution compute context' });
                        return yield this.jesJobExecutor.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes);
                    }
                }
                else if (config.serverType === types_2.ServerType.Sas9 &&
                    config.username &&
                    config.password) {
                    return yield this.sas9JobExecutor.execute(sasJob, data, config);
                }
                else {
                    return yield this.webJobExecutor.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes);
                }
            }
            else {
                return Promise.reject(new types_1.ErrorResponse(validationResult.msg));
            }
        });
    }
    /**
     * Creates the folders and services at the given location `appLoc` on the given server `serverUrl`.
     * @param serviceJson - the JSON specifying the folders and services to be created.
     * @param appLoc - the base folder in which to create the new folders and
     * services.  If not provided, is taken from SASjsConfig.
     * @param serverUrl - the server on which to deploy the folders and services.
     * If not provided, is taken from SASjsConfig.
     * @param accessToken - an optional access token to be passed in when
     * using this function from the command line.
     * @param isForced - flag that indicates if target folder already exists, it and all subfolders have to be deleted.
     */
    deployServicePack(serviceJson_1, appLoc_1, serverUrl_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (serviceJson, appLoc, serverUrl, accessToken, isForced = false) {
            this.isMethodSupported('deployServicePack', [types_2.ServerType.SasViya]);
            let sasApiClient = null;
            if (serverUrl || appLoc) {
                if (!serverUrl)
                    serverUrl = this.sasjsConfig.serverUrl;
                if (!appLoc)
                    appLoc = this.sasjsConfig.appLoc;
                if (this.sasjsConfig.serverType === types_2.ServerType.SasViya) {
                    sasApiClient = new SASViyaApiClient_1.SASViyaApiClient(serverUrl, appLoc, this.sasjsConfig.contextName, this.requestClient);
                    sasApiClient.debug = this.sasjsConfig.debug;
                }
                else if (this.sasjsConfig.serverType === types_2.ServerType.Sas9) {
                    sasApiClient = new SAS9ApiClient_1.SAS9ApiClient(serverUrl, this.jobsPath, this.sasjsConfig.httpsAgentOptions);
                }
            }
            else {
                let sasClientConfig = null;
                if (this.sasjsConfig.serverType === types_2.ServerType.SasViya) {
                    sasClientConfig = this.sasViyaApiClient.getConfig();
                }
                else if (this.sasjsConfig.serverType === types_2.ServerType.Sas9) {
                    sasClientConfig = this.sas9ApiClient.getConfig();
                }
                serverUrl = sasClientConfig.serverUrl;
                appLoc = sasClientConfig.rootFolderName;
            }
            // members of type 'folder' should be processed first
            if (serviceJson.members[0].members) {
                serviceJson.members[0].members.sort((member) => member.type === 'folder' ? -1 : 1);
            }
            const members = serviceJson.members;
            yield this.createFoldersAndServices(appLoc, members, accessToken, sasApiClient, isForced);
        });
    }
    /**
     * Kicks off execution of the given job via the compute API.
     * @returns an object representing the compute session created for the given job.
     * @param sasJob - the path to the SAS program (ultimately resolves to
     *  the SAS `_program` parameter to run a Job Definition or SAS 9 Stored
     *  Process). Is prepended at runtime with the value of `appLoc`.
     * @param data - a JSON object containing one or more tables to be sent to
     * SAS. Can be `null` if no inputs required.
     * @param config - provide any changes to the config here, for instance to
     * enable/disable `debug`. Any change provided will override the global config,
     * for that particular function call.
     * @param authConfig - a valid client, secret, refresh and access tokens that are authorised to execute compute jobs.
     * The access token is not required when the user is authenticated via the browser.
     * @param waitForResult - a boolean that indicates whether the function needs to wait for execution to complete.
     * @param pollOptions - an object that represents poll interval(milliseconds) and maximum amount of attempts. Object example: { maxPollCount: 24 * 60 * 60, pollInterval: 1000 }. More information available at src/api/viya/pollJobState.ts.
     * @param printPid - a boolean that indicates whether the function should print (PID) of the started job.
     * @param variables - an object that represents macro variables.
     * @param verboseMode - boolean or a string equal to 'bleached' to enable verbose mode (log every HTTP response).
     * @param onTokensRefreshed - (optional, SAS Viya only) callback invoked with the rotated token pair after a successful internal refresh, so consumers that persist tokens can store the new pair.
     */
    startComputeJob(sasJob_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, data, config = {}, authConfig, waitForResult, pollOptions, printPid = false, variables, verboseMode, onTokensRefreshed) {
            var _a, _b, _c, _d, _e;
            config = Object.assign(Object.assign({}, this.sasjsConfig), config);
            this.isMethodSupported('startComputeJob', [
                types_2.ServerType.SasViya,
                types_2.ServerType.Sasjs
            ]);
            if (verboseMode) {
                (_a = this.requestClient) === null || _a === void 0 ? void 0 : _a.setVerboseMode(verboseMode);
                (_b = this.requestClient) === null || _b === void 0 ? void 0 : _b.enableVerboseMode();
            }
            else if (verboseMode === false)
                (_c = this.requestClient) === null || _c === void 0 ? void 0 : _c.disableVerboseMode();
            // A SASjs Server has no compute contexts and no job definitions: the program
            // is a file in the drive, triggered by path. The result carries the same
            // `links` a Viya compute job does, so polling and log retrieval are shared.
            if (this.sasjsConfig.serverType === types_2.ServerType.Sasjs)
                return (_d = this.sasJSApiClient) === null || _d === void 0 ? void 0 : _d.startComputeJob(sasJob, data, config, authConfig, !!waitForResult, pollOptions, printPid, variables, onTokensRefreshed);
            if (!config.contextName) {
                throw new Error('Context name is undefined. Please set a `contextName` in your SASjs or override config.');
            }
            return (_e = this.sasViyaApiClient) === null || _e === void 0 ? void 0 : _e.executeComputeJob(sasJob, config.contextName, config.debug, data, authConfig, !!waitForResult, false, pollOptions, printPid, variables, onTokensRefreshed);
        });
    }
    /**
     * Fetches content of the log file
     * @param logUrl - url of the log file.
     * @param accessToken - an access token for an authorised user.
     */
    fetchLogFileContent(logUrl, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestClient.get(logUrl, accessToken).then((res) => {
                if (!res)
                    return Promise.reject(new types_1.ErrorResponse('Error while fetching log. Response was not provided.'));
                try {
                    const result = JSON.stringify(res.result);
                    return result;
                }
                catch (err) {
                    return Promise.reject(new types_1.ErrorResponse('Error while fetching log. The result is not valid.', err));
                }
            });
        });
    }
    /**
     * this method returns an array of SASjsRequest
     * @returns SASjsRequest[]
     */
    getSasRequests() {
        const requests = [...this.requestClient.getRequests()];
        const sortedRequests = requests.sort(utils_1.compareTimestamps);
        return sortedRequests;
    }
    clearSasRequests() {
        this.requestClient.clearRequests();
    }
    setupConfiguration() {
        if (this.sasjsConfig.serverUrl === undefined ||
            this.sasjsConfig.serverUrl === '') {
            if (typeof location !== 'undefined') {
                let url = `${location.protocol}//${location.hostname}`;
                if (location.port)
                    url = `${url}:${location.port}`;
                this.sasjsConfig.serverUrl = url;
            }
            else {
                this.sasjsConfig.serverUrl = '';
            }
        }
        if (this.sasjsConfig.serverUrl.slice(-1) === '/') {
            this.sasjsConfig.serverUrl = this.sasjsConfig.serverUrl.slice(0, -1);
        }
        if (!this.requestClient) {
            const RequestClientClass = this.sasjsConfig.serverType === types_2.ServerType.Sasjs
                ? SasjsRequestClient_1.SasjsRequestClient
                : RequestClient_1.RequestClient;
            this.requestClient = new RequestClientClass(this.sasjsConfig.serverUrl, this.sasjsConfig.httpsAgentOptions, this.sasjsConfig.requestHistoryLimit, this.sasjsConfig.verbose);
        }
        else {
            this.requestClient.setConfig(this.sasjsConfig.serverUrl, this.sasjsConfig.httpsAgentOptions);
        }
        // A path the executors append `?_program=` to. Viya and SAS 9 name that
        // endpoint outright, so their value is used as it stands; `pathSASJS` names
        // the mount, and the endpoint under it is hard-coded here so a caller cannot
        // point the two at different places.
        const apiBasePath = this.getApiBasePath();
        this.jobsPath =
            this.sasjsConfig.serverType === types_2.ServerType.SasViya
                ? this.sasjsConfig.pathSASViya
                : this.sasjsConfig.serverType === types_2.ServerType.Sas9
                    ? this.sasjsConfig.pathSAS9
                    : // a root mount would otherwise compose '//stp/execute'
                        `${(0, apiBasePath_1.apiBasePrefix)(apiBasePath)}${apiBasePath_1.STP_EXECUTE_SUFFIX}`;
        this.authManager = new auth_1.AuthManager(this.sasjsConfig.serverUrl, this.sasjsConfig.serverType, this.requestClient, this.resendWaitingRequests, apiBasePath);
        if (this.sasjsConfig.serverType === types_2.ServerType.SasViya) {
            if (this.sasViyaApiClient) {
                this.sasViyaApiClient.setConfig(this.sasjsConfig.serverUrl, this.sasjsConfig.appLoc);
            }
            else {
                this.sasViyaApiClient = new SASViyaApiClient_1.SASViyaApiClient(this.sasjsConfig.serverUrl, this.sasjsConfig.appLoc, this.sasjsConfig.contextName, this.requestClient);
            }
            this.sasViyaApiClient.debug = this.sasjsConfig.debug;
        }
        if (this.sasjsConfig.serverType === types_2.ServerType.Sas9) {
            if (this.sas9ApiClient) {
                this.sas9ApiClient.setConfig(this.sasjsConfig.serverUrl);
            }
            else {
                this.sas9ApiClient = new SAS9ApiClient_1.SAS9ApiClient(this.sasjsConfig.serverUrl, this.jobsPath, this.sasjsConfig.httpsAgentOptions);
            }
        }
        if (this.sasjsConfig.serverType === types_2.ServerType.Sasjs) {
            if (!this.sasJSApiClient || this.sasJSApiBasePath !== apiBasePath) {
                this.sasJSApiClient = new SASjsApiClient_1.SASjsApiClient(this.requestClient, apiBasePath);
                this.sasJSApiBasePath = apiBasePath;
            }
        }
        this.fileUploader = new job_execution_1.FileUploader(this.sasjsConfig.serverUrl, this.sasjsConfig.serverType, this.jobsPath, this.requestClient);
        this.webJobExecutor = new job_execution_1.WebJobExecutor(this.sasjsConfig.serverUrl, this.sasjsConfig.serverType, this.jobsPath, this.requestClient, this.sasViyaApiClient);
        this.sasjsJobExecutor = new job_execution_1.SasjsJobExecutor(this.sasjsConfig.serverUrl, this.jobsPath, this.requestClient);
        this.sas9JobExecutor = new job_execution_1.Sas9JobExecutor(this.sasjsConfig.serverUrl, this.sasjsConfig.serverType, this.jobsPath, this.requestClient, this.sasjsConfig.httpsAgentOptions);
        this.computeJobExecutor = new job_execution_1.ComputeJobExecutor(this.sasjsConfig.serverUrl, this.sasViyaApiClient);
        this.jesJobExecutor = new job_execution_1.JesJobExecutor(this.sasjsConfig.serverUrl, this.sasViyaApiClient);
    }
    createFoldersAndServices(parentFolder, membersJson, accessToken, sasApiClient, isForced) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, utils_1.asyncForEach)(membersJson, (member) => __awaiter(this, void 0, void 0, function* () {
                switch (member.type) {
                    case 'folder':
                        yield this.createFolder(member.name, parentFolder, undefined, accessToken, sasApiClient, isForced);
                        break;
                    case 'file':
                        yield this.createFile(member.name, member.code, parentFolder, undefined, accessToken, sasApiClient);
                        break;
                    case 'service':
                        yield this.createJobDefinition(member.name, member.code, parentFolder, undefined, accessToken, sasApiClient);
                        break;
                    default:
                        throw new Error(`Unidentified member '${member.name}' provided.`);
                }
                if (member.type === 'folder' && member.members && member.members.length)
                    yield this.createFoldersAndServices(`${parentFolder}/${member.name}`, member.members, accessToken, sasApiClient, isForced);
            }));
        });
    }
    isMethodSupported(method, serverTypes) {
        if (!this.sasjsConfig.serverType ||
            !serverTypes.includes(this.sasjsConfig.serverType)) {
            throw new Error(`Method '${method}' is only supported on ${serverTypes.join(', ')} servers.`);
        }
    }
    /**
     * Enables verbose mode that will log a summary of every HTTP response.
     * @param successCallBack - function that should be triggered on every HTTP response with the status 2**.
     * @param errorCallBack - function that should be triggered on every HTTP response with the status different from 2**.
     */
    enableVerboseMode(successCallBack, errorCallBack) {
        var _a;
        (_a = this.requestClient) === null || _a === void 0 ? void 0 : _a.enableVerboseMode(successCallBack, errorCallBack);
    }
    /**
     * Turns off verbose mode to log every HTTP response.
     */
    disableVerboseMode() {
        var _a;
        (_a = this.requestClient) === null || _a === void 0 ? void 0 : _a.disableVerboseMode();
    }
    /**
     * Create a tables class containing one or more tables to be sent to
     * SAS.
     * @param table - initial table data
     * @param macroName - macro name
     * @returns Tables class
     */
    Tables(table, macroName) {
        return new types_1.Tables(table, macroName);
    }
}
exports["default"] = SASjs;


/***/ },

/***/ 5803
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SASjsApiClient = exports.readSasjsState = void 0;
const form_data_1 = __importDefault(__webpack_require__(1894));
const types_1 = __webpack_require__(3631);
const error_1 = __webpack_require__(6340);
const pollJobState_1 = __webpack_require__(1514);
const errors_1 = __webpack_require__(7388);
const getAccessTokenForSasjs_1 = __webpack_require__(9239);
const refreshTokensForSasjs_1 = __webpack_require__(6725);
const getTokens_1 = __webpack_require__(9609);
const isNode_1 = __webpack_require__(6308);
const apiBasePath_1 = __webpack_require__(6838);
/**
 * How SASjs Server reports the state of a triggered program.
 *
 * Two differences from Viya, both its own to know: the body is JSON with a
 * `state` member (`{ "state": "running" }`) rather than plain text, and
 * `initialising` - a session that exists before the program has started - has
 * no Viya equivalent and is not a terminal state.
 */
const readSasjsState = (body) => {
    const state = typeof body === 'string' ? body.trim() : body === null || body === void 0 ? void 0 : body.state;
    if (state === 'initialising')
        return pollJobState_1.JobState.Pending;
    return (state !== null && state !== void 0 ? state : '');
};
exports.readSasjsState = readSasjsState;
class SASjsApiClient {
    constructor(requestClient, apiBasePath = apiBasePath_1.DEFAULT_API_BASE_PATH) {
        this.requestClient = requestClient;
        this.apiBase = (0, apiBasePath_1.normaliseApiBasePath)(apiBasePath);
        // sliced, not replaced with /^\/+/ - normalise already left at most one
        this.apiPath = this.apiBase.startsWith('/')
            ? this.apiBase.slice(1)
            : this.apiBase;
    }
    getAccessTokenForRequest(authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authConfig) {
                const { access_token } = yield (0, getTokens_1.getTokens)(this.requestClient, authConfig, types_1.ServerType.Sasjs, undefined, this.apiBase);
                return access_token;
            }
        });
    }
    /**
     * Creates the folders and services at the given location `appLoc` on the given server `serverUrl`.
     * @param dataJson - the JSON specifying the folders and files to be created, can also includes
     * appLoc, streamServiceName, streamWebFolder, streamLogo
     * @param appLoc - the base folder in which to create the new folders and services.
     * @param authConfig - (optional) a valid client, secret, refresh and access tokens that are authorised to execute compute jobs.
     */
    deploy(dataJson, appLoc, authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = yield this.getAccessTokenForRequest(authConfig);
            dataJson.appLoc = dataJson.appLoc || appLoc;
            const { result } = yield this.requestClient.post(`${this.apiPath}/drive/deploy`, dataJson, access_token, undefined, {}, { maxContentLength: Infinity, maxBodyLength: Infinity });
            return Promise.resolve(result);
        });
    }
    /**
     * Creates/updates files within SASjs drive using uploaded json compressed file.
     * This method can only be used by Node.
     * @param zipFilePath - Compressed file path; file should only contain one JSON file and
     * should have same name as of compressed file e.g. deploy.JSON should be compressed to deploy.JSON.zip
     * Any other file or JSON file in zipped will be ignored!
     * @param authConfig - (optional) a valid client, secret, refresh and access tokens that are authorised to execute compute jobs.
     */
    deployZipFile(zipFilePath, authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, isNode_1.isNode)()) {
                throw new Error(`Method 'deployZipFile' can only be used by Node.`);
            }
            const { createReadStream } = __webpack_require__(1179);
            const access_token = yield this.getAccessTokenForRequest(authConfig);
            const file = yield createReadStream(zipFilePath);
            const formData = new form_data_1.default();
            formData.append('file', file);
            const contentType = `multipart/form-data; boundary=${formData.getBoundary()}`;
            const { result } = yield this.requestClient.post(`${this.apiPath}/drive/deploy/upload`, formData, access_token, contentType, {}, { maxContentLength: Infinity, maxBodyLength: Infinity });
            return Promise.resolve(result);
        });
    }
    executeJob(query, appLoc, authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = authConfig ? authConfig.access_token : undefined;
            let _program;
            if (query._program.startsWith('/')) {
                _program = query._program;
            }
            else
                _program = `${appLoc}/${query._program}`;
            const response = yield this.requestClient.post(`${this.apiPath}/stp/execute`, Object.assign(Object.assign({ _debug: 131 }, query), { _program }), access_token);
            return { result: response.result, log: response.log };
        });
    }
    /**
     * Executes code on a SASJS server.
     * @param code - a string of code to execute.
     * @param runTime - a string to representing runTime for code execution
     * @param authConfig - an object for authentication.
     */
    executeScript(code_1) {
        return __awaiter(this, arguments, void 0, function* (code, runTime = 'sas', authConfig) {
            const access_token = yield this.getAccessTokenForRequest(authConfig);
            const executionResult = { log: '' };
            yield this.requestClient
                .post(`${this.apiPath}/code/execute`, { code, runTime }, access_token)
                .then((res) => {
                const { log, printOutput, result: webout } = res;
                executionResult.log = log;
                if (printOutput)
                    executionResult.printOutput = printOutput;
                if (webout)
                    executionResult.webout = webout;
            })
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while sending POST request to execute code. ');
            });
            return executionResult;
        });
    }
    /**
     * Exchanges the auth code for an access token for the given client.
     * @param clientId - the client ID to authenticate with.
     * @param authCode - the auth code received from the server.
     */
    getAccessToken(clientId, authCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, getAccessTokenForSasjs_1.getAccessTokenForSasjs)(this.requestClient, clientId, authCode, this.apiBase);
        });
    }
    /**
     * Starts a stored program and returns the job it runs in.
     *
     * The result is the shape a Viya compute job has - an id and `links` with
     * `state` and `log` relations - because that is what `pollJobState`,
     * `fetchLogFileContent` and everything written against them already follow.
     * A caller therefore does not need to know which of the two servers it is
     * talking to.
     *
     * @param sasJob - the path of the program, relative to `appLoc` unless it starts with `/`.
     * @param data - values passed to the program as macro variables.
     * @param config - the SASjs config for this call; `debug` turns on `_debug`.
     * @param authConfig - an access token, or the tokens to mint one from.
     * @param waitForResult - poll until the program finishes before resolving.
     * @param pollOptions - poll interval and maximum attempts, see `pollJobState`.
     * @param printPid - include the OS process id in the job, while it is running.
     * @param variables - macro variables, merged with `data`.
     * @param onTokensRefreshed - called with the rotated token pair after a refresh.
     */
    startComputeJob(sasJob_1, data_1, config_1, authConfig_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, data, config, authConfig, waitForResult = true, pollOptions, printPid = false, variables, onTokensRefreshed) {
            var _a, _b, _c;
            const access_token = yield this.getAccessTokenForRequest(authConfig);
            const _program = sasJob.startsWith('/')
                ? sasJob
                : `${(_a = config.appLoc) !== null && _a !== void 0 ? _a : ''}/${sasJob}`;
            // Every query parameter becomes a macro variable, the same way the
            // synchronous execute endpoint builds them. `_program` and `_debug` are
            // reserved: they are set below from the arguments, so a payload or a macro
            // variable set that happens to carry either key cannot redirect the call to
            // a different program.
            const query = new URLSearchParams();
            const reserved = new Set(['_program', '_debug']);
            for (const [key, value] of Object.entries(Object.assign(Object.assign({}, (data !== null && data !== void 0 ? data : {})), (variables !== null && variables !== void 0 ? variables : {}))))
                if (!reserved.has(key) && value !== undefined && value !== null)
                    query.set(key, String(value));
            query.set('_program', _program);
            if (config.debug)
                query.set('_debug', '131');
            const { result } = yield this.requestClient
                .post(`${this.apiPath}/stp/trigger?${query.toString()}`, {}, access_token)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while triggering the program. ');
            });
            // The trigger answers 200 with a failure body when the program cannot be
            // found or the runtime refuses it, so a missing session id is the only
            // signal that the call did not start anything. Without this the caller gets
            // links built from `undefined` and the failure surfaces later as a 404 on a
            // state URL.
            if (!(result === null || result === void 0 ? void 0 : result.sessionId))
                throw new Error(`Error while triggering the program. ${(_c = (_b = result === null || result === void 0 ? void 0 : result.error) !== null && _b !== void 0 ? _b : result === null || result === void 0 ? void 0 : result.message) !== null && _c !== void 0 ? _c : 'No session id was returned.'}`);
            // absolute paths, as Viya job links are: a caller composes `${serverUrl}${href}`
            // to fetch a log, so a relative href turns into `https://hostsasjsapi/...`
            const links = [
                {
                    rel: 'state',
                    href: `${(0, apiBasePath_1.apiBasePrefix)(this.apiBase)}/session/${result.sessionId}/state`,
                    method: 'GET'
                },
                {
                    rel: 'log',
                    href: `${(0, apiBasePath_1.apiBasePrefix)(this.apiBase)}/session/${result.sessionId}/log`,
                    method: 'GET'
                },
                {
                    rel: 'self',
                    href: `${(0, apiBasePath_1.apiBasePrefix)(this.apiBase)}/session/${result.sessionId}`,
                    method: 'GET'
                }
            ];
            const job = Object.assign({ id: result.sessionId, links }, (printPid && result.pid !== undefined ? { pid: result.pid } : {}));
            if (!waitForResult)
                return { job, log: '' };
            const state = yield (0, pollJobState_1.pollJobState)(this.requestClient, job, !!config.debug, authConfig, pollOptions, undefined, onTokensRefreshed, types_1.ServerType.Sasjs, exports.readSasjsState);
            const { result: log } = yield this.requestClient
                .get(`${this.apiPath}/session/${result.sessionId}/log`, access_token, 'text/plain')
                .catch(() => ({ result: '' }));
            const finished = Object.assign(Object.assign({}, job), { state });
            if (state === pollJobState_1.JobState.Failed || state === pollJobState_1.JobState.Error)
                throw new errors_1.ComputeJobExecutionError(finished, log !== null && log !== void 0 ? log : '');
            return { job: finished, log: log !== null && log !== void 0 ? log : '' };
        });
    }
    /**
     * Exchanges the refresh token for an access token.
     * @param refreshToken - the refresh token received from the server.
     */
    refreshTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, refreshTokensForSasjs_1.refreshTokensForSasjs)(this.requestClient, refreshToken, this.apiBase);
        });
    }
}
exports.SASjsApiClient = SASjsApiClient;


/***/ },

/***/ 8697
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionManager = void 0;
const types_1 = __webpack_require__(3574);
const errors_1 = __webpack_require__(7388);
const utils_1 = __webpack_require__(9266);
const error_1 = __webpack_require__(6340);
const host_1 = __webpack_require__(5334);
const MAX_SESSION_COUNT = 1;
class SessionManager {
    constructor(serverUrl, contextName, requestClient) {
        this.serverUrl = serverUrl;
        this.contextName = contextName;
        this.requestClient = requestClient;
        this.loggedErrors = [];
        this.sessionStateLinkError = 'Error while getting session state link. ';
        // INFO: session pool
        this.sessions = [];
        this.currentContext = null;
        this.settingContext = false;
        this._debug = false;
        this.printedSessionState = {
            printed: false,
            state: types_1.SessionState.NoState
        };
        if (serverUrl)
            (0, utils_1.isUrl)(serverUrl);
    }
    get debug() {
        return this._debug;
    }
    set debug(value) {
        this._debug = value;
    }
    /**
     * Checks if session is valid. Session is considered valid if time since it's creation is less than 'sessionInactiveTimeout' attribute.
     * @param session - session object.
     * @returns - boolean indicating if session is valid.
     */
    isSessionValid(session) {
        if (!session)
            return false;
        const secondsSinceSessionCreation = (new Date().getTime() - new Date(session.creationTimeStamp).getTime()) /
            1000;
        if (!session.attributes ||
            secondsSinceSessionCreation >= session.attributes.sessionInactiveTimeout) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Removes session from pool of hot sessions.
     * @param session - session object.
     * @returns - void.
     */
    removeSessionFromPool(session) {
        this.sessions = this.sessions.filter((ses) => ses.id !== session.id);
    }
    /**
     * Filters session pool to keep only valid sessions.
     * @param session - session object.
     * @returns - void.
     */
    removeExpiredSessions() {
        this.sessions = this.sessions.filter((session) => this.isSessionValid(session));
    }
    /**
     * Throws set of errors as a single error.
     * @param errors - array of errors or string.
     * @param prefix - an optional final error prefix.
     * @returns - never.
     */
    throwErrors(errors, prefix) {
        throw prefix
            ? (0, error_1.prefixMessage)(new Error(errors.join('. ')), prefix)
            : new Error(errors
                .map((err) => err.message ? err.message : err)
                .join('. '));
    }
    /**
     * Returns session.
     * If there is a hot session available, it will be returned immediately and an asynchronous request to create new hot session will be submitted.
     * If there is no available session, 2 session creation requests will be submitted. The session is returned once it is created and ready.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves with a session.
     */
    getSession(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            let isErrorThrown = false;
            const throwIfError = () => {
                if (errors.length && !isErrorThrown) {
                    isErrorThrown = true;
                    this.throwErrors(errors);
                }
            };
            this.removeExpiredSessions();
            if (this.sessions.length) {
                const session = this.sessions[0];
                this.removeSessionFromPool(session);
                this.createSessions(accessToken).catch((err) => {
                    errors.push(err);
                });
                this.createAndWaitForSession(accessToken).catch((err) => {
                    errors.push(err);
                });
                throwIfError();
                return session;
            }
            else {
                this.createSessions(accessToken).catch((err) => {
                    errors.push(err);
                });
                yield this.createAndWaitForSession(accessToken).catch((err) => {
                    errors.push(err);
                });
                this.removeExpiredSessions();
                const session = this.sessions.pop();
                this.removeSessionFromPool(session);
                throwIfError();
                return session;
            }
        });
    }
    /**
     * Returns error message based on the response from SAS API.
     * @param err - an optional access token.
     * @param accessToken - an optional access token.
     * @returns - an error message.
     */
    getErrorMessage(err, url, method) {
        return (`${method} request to ${url} failed with status code ${err.response.status || 'unknown'}. ` + err.response.data.message || '');
    }
    /**
     * Deletes session.
     * @param id - a session id.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves when session is deleted.
     */
    clearSession(id, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/compute/sessions/${id}`;
            return yield this.requestClient
                .delete(url, accessToken)
                .then(() => {
                this.sessions = this.sessions.filter((s) => s.id !== id);
            })
                .catch((err) => {
                throw (0, error_1.prefixMessage)(this.getErrorMessage(err, url, 'DELETE'), 'Error while deleting session. ');
            });
        });
    }
    /**
     * Creates sessions in amount equal to MAX_SESSION_COUNT.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves when required amount of sessions is created.
     */
    createSessions(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            if (!this.sessions.length) {
                yield (0, utils_1.asyncForEach)(new Array(MAX_SESSION_COUNT), () => __awaiter(this, void 0, void 0, function* () {
                    yield this.createAndWaitForSession(accessToken).catch((err) => {
                        errors.push(err);
                    });
                }));
            }
            if (errors.length) {
                this.throwErrors(errors, 'Error while creating session. ');
            }
        });
    }
    /**
     * Waits for the current context to be set.
     * @returns - a promise which resolves when current context is set.
     */
    waitForCurrentContext() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const timer = setInterval(() => {
                    if (this.currentContext) {
                        this.settingContext = false;
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
    /**
     * Creates and waits for session to be ready.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves with a session.
     */
    createAndWaitForSession(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.currentContext) {
                if (!this.settingContext) {
                    yield this.setCurrentContext(accessToken);
                }
                else {
                    yield this.waitForCurrentContext();
                }
            }
            const url = `${this.serverUrl}/compute/contexts/${this.currentContext.id}/sessions`;
            const { result: createdSession, etag } = yield this.requestClient
                .post(url, {}, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(this.getErrorMessage(err, url, 'POST'), `Error while creating session. `);
            });
            // Add response etag to Session object.
            createdSession.etag = etag;
            // Get session state link.
            const stateLink = createdSession.links.find((link) => link.rel === 'state');
            // Throw error if session state link is not present.
            if (!stateLink)
                throw this.sessionStateLinkError;
            // Add session state link to Session object.
            createdSession.stateUrl = stateLink.href;
            yield this.waitForSession(createdSession, etag, accessToken);
            this.sessions.push(createdSession);
            return createdSession;
        });
    }
    /**
     * Sets current context.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves when current context is set.
     */
    setCurrentContext(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.currentContext) {
                const url = `${this.serverUrl}/compute/contexts?limit=10000`;
                this.settingContext = true;
                const { result: contexts } = yield this.requestClient
                    .get(url, accessToken)
                    .catch((err) => {
                    throw (0, error_1.prefixMessage)(this.getErrorMessage(err, url, 'GET'), `Error while getting list of contexts. `);
                });
                const contextsList = contexts && contexts.items && contexts.items.length
                    ? contexts.items
                    : [];
                const currentContext = contextsList.find((c) => c.name === this.contextName);
                if (!currentContext) {
                    throw new Error(`The context '${this.contextName}' was not found on the server ${this.serverUrl}.`);
                }
                this.currentContext = currentContext;
                Promise.resolve();
            }
        });
    }
    /**
     * Waits for session to be ready.
     * @param session - a session object.
     * @param etag - an etag that can be a string or null.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves with a session state.
     */
    waitForSession(session, etag, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let { state: sessionState } = session;
            const { stateUrl } = session;
            const logger = (0, host_1.getLogger)();
            if (sessionState === types_1.SessionState.Pending ||
                sessionState === types_1.SessionState.Running ||
                sessionState === types_1.SessionState.NoState) {
                if (stateUrl) {
                    if (this.debug && !this.printedSessionState.printed) {
                        logger.info(`Polling: ${this.serverUrl + stateUrl}`);
                        this.printedSessionState.printed = true;
                    }
                    const url = `${this.serverUrl}${stateUrl}?wait=30`;
                    const { result: state, responseStatus: responseStatus } = yield this.getSessionState(url, etag, accessToken).catch((err) => {
                        throw (0, error_1.prefixMessage)(err, 'Error while waiting for session. ');
                    });
                    sessionState = state.trim();
                    if (this.debug && this.printedSessionState.state !== sessionState) {
                        logger.info(`Current session state is '${sessionState}'`);
                        this.printedSessionState.state = sessionState;
                        this.printedSessionState.printed = false;
                    }
                    if (!sessionState) {
                        const stateError = new errors_1.NoSessionStateError(responseStatus, this.serverUrl + stateUrl, (_a = session.links.find((l) => l.rel === 'log')) === null || _a === void 0 ? void 0 : _a.href);
                        if (!this.loggedErrors.find((err) => err.serverResponseStatus === stateError.serverResponseStatus)) {
                            this.loggedErrors.push(stateError);
                            logger.info(stateError.message);
                        }
                        return yield this.waitForSession(session, etag, accessToken);
                    }
                    this.loggedErrors = [];
                    return sessionState;
                }
                else {
                    throw this.sessionStateLinkError;
                }
            }
            else {
                this.loggedErrors = [];
                return sessionState;
            }
        });
    }
    /**
     * Gets session state.
     * @param url - a URL to get session state.
     * @param etag - an etag string.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves with a result string and response status.
     */
    getSessionState(url, etag, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.requestClient
                .get(url, accessToken, 'text/plain', { 'If-None-Match': etag })
                .then((res) => ({
                result: res.result,
                responseStatus: res.status
            }))
                .catch((err) => {
                throw (0, error_1.prefixMessage)(this.getErrorMessage(err, url, 'GET'), 'Error while getting session state. ');
            });
        });
    }
    /**
     * Gets variable.
     * @param sessionId - a session id.
     * @param variable - a variable string.
     * @param accessToken - an optional access token.
     * @returns - a promise which resolves with a result that confirms to SessionVariable interface, etag string and status code.
     */
    getVariable(sessionId, variable, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.serverUrl}/compute/sessions/${sessionId}/variables/${variable}`;
            return yield this.requestClient
                .get(url, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(this.getErrorMessage(err, url, 'GET'), `Error while fetching session variable '${variable}'. `);
            });
        });
    }
}
exports.SessionManager = SessionManager;


/***/ },

/***/ 3722
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.executeOnComputeApi = executeOnComputeApi;
const time_1 = __webpack_require__(7247);
const types_1 = __webpack_require__(3631);
const error_1 = __webpack_require__(6340);
const __1 = __webpack_require__(8156);
const getTokens_1 = __webpack_require__(9609);
const utils_1 = __webpack_require__(9266);
const formatDataForRequest_1 = __webpack_require__(3407);
const pollJobState_1 = __webpack_require__(1514);
const uploadTables_1 = __webpack_require__(8563);
const host_1 = __webpack_require__(5334);
/**
 * Executes SAS program on the current SAS Viya server using Compute API.
 * @param jobPath - the path to the file being submitted for execution.
 * @param linesOfCode - an array of code lines to execute.
 * @param contextName - the context to execute the code in.
 * @param authConfig - an object containing an access token, refresh token, client ID and secret.
 * @param data - execution data.
 * @param debug - when set to true, the log will be returned.
 * @param expectWebout - when set to true, the automatic _webout fileref will be checked for content, and that content returned. This fileref is used when the Job contains a SASjs web request (as opposed to executing arbitrary SAS code).
 * @param waitForResult - when set to true, function will return the session
 * @param pollOptions - an object that represents poll interval(milliseconds) and maximum amount of attempts. Object example: { maxPollCount: 24 * 60 * 60, pollInterval: 1000 }. More information available at src/api/viya/pollJobState.ts.
 * @param printPid - a boolean that indicates whether the function should print (PID) of the started job.
 * @param variables - an object that represents macro variables.
 * @param onTokensRefreshed - optional callback invoked with the rotated token pair after a successful internal refresh, so consumers that persist tokens can store the new pair.
 */
function executeOnComputeApi(requestClient_1, sessionManager_1, rootFolderName_1, jobPath_1, linesOfCode_1, contextName_1, authConfig_1) {
    return __awaiter(this, arguments, void 0, function* (requestClient, sessionManager, rootFolderName, jobPath, linesOfCode, contextName, authConfig, data = null, debug = false, expectWebout = false, waitForResult = true, pollOptions, printPid = false, variables, onTokensRefreshed) {
        var _a, _b;
        let access_token = (authConfig || {}).access_token;
        if (authConfig) {
            ;
            ({ access_token } = yield (0, getTokens_1.getTokens)(requestClient, authConfig, types_1.ServerType.SasViya, onTokensRefreshed));
        }
        const logger = (0, host_1.getLogger)();
        try {
            let executionSessionId;
            const session = yield sessionManager
                .getSession(access_token)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting session. ');
            });
            executionSessionId = session.id;
            if (printPid) {
                const { result: jobIdVariable } = yield sessionManager
                    .getVariable(executionSessionId, 'SYSJOBID', access_token)
                    .catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while getting session variable. ');
                });
                if (jobIdVariable && jobIdVariable.value) {
                    const relativeJobPath = rootFolderName
                        ? jobPath.split(rootFolderName).join('').replace(/^\//, '')
                        : jobPath;
                    const logger = (0, host_1.getLogger)();
                    logger.info(`Triggering '${relativeJobPath}' with PID ${jobIdVariable.value} at ${(0, time_1.timestampToYYYYMMDDHHMMSS)()}`);
                }
            }
            let fileName;
            if ((0, utils_1.isRelativePath)(jobPath)) {
                fileName = `exec-${jobPath.includes('/') ? jobPath.split('/')[1] : jobPath}`;
            }
            else {
                const jobPathParts = jobPath.split('/');
                fileName = jobPathParts.pop();
            }
            let jobVariables = {
                SYS_JES_JOB_URI: '',
                _program: (0, utils_1.isRelativePath)(jobPath)
                    ? rootFolderName + '/' + jobPath
                    : jobPath
            };
            if (variables)
                jobVariables = Object.assign(Object.assign({}, jobVariables), variables);
            if (debug)
                jobVariables = Object.assign(Object.assign({}, jobVariables), { _DEBUG: 131 });
            let files = [];
            if (data) {
                if (JSON.stringify(data).includes(';')) {
                    files = yield (0, uploadTables_1.uploadTables)(requestClient, data, access_token).catch((err) => {
                        throw (0, error_1.prefixMessage)(err, 'Error while uploading tables. ');
                    });
                    jobVariables['_webin_file_count'] = files.length;
                    files.forEach((fileInfo, index) => {
                        jobVariables[`_webin_fileuri${index + 1}`] =
                            `/files/files/${fileInfo.file.id}`;
                        jobVariables[`_webin_name${index + 1}`] = fileInfo.tableName;
                    });
                }
                else {
                    jobVariables = Object.assign(Object.assign({}, jobVariables), (0, formatDataForRequest_1.formatDataForRequest)(data));
                }
            }
            // Execute job in session
            const jobRequestBody = {
                name: fileName || 'Default Job Name',
                description: 'Powered by SASjs',
                code: linesOfCode,
                variables: jobVariables,
                version: 2
            };
            const { result: postedJob, etag } = yield requestClient
                .post(`/compute/sessions/${executionSessionId}/jobs`, jobRequestBody, access_token)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while posting job. ');
            });
            if (!waitForResult)
                return session;
            if (debug) {
                logger.info(`Job has been submitted for '${fileName}'.`);
                logger.info(`You can monitor the job progress at '${requestClient.getBaseUrl()}${postedJob.links.find((l) => l.rel === 'state').href}'.`);
            }
            const jobStatus = yield (0, pollJobState_1.pollJobState)(requestClient, postedJob, debug, authConfig, pollOptions, {
                session,
                sessionManager
            }, onTokensRefreshed).catch((err) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const error = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data;
                const result = /err=[0-9]*,/.exec(error);
                const errorCode = '5113';
                if (((_b = result === null || result === void 0 ? void 0 : result[0]) === null || _b === void 0 ? void 0 : _b.slice(4, -1)) === errorCode) {
                    const logCount = 1000000;
                    const sessionLogUrl = postedJob.links.find((l) => l.rel === 'up').href + '/log';
                    err.log = yield (0, utils_1.fetchLogByChunks)(requestClient, access_token, sessionLogUrl, logCount);
                }
                throw (0, error_1.prefixMessage)(err, 'Error while polling job status. ');
            }));
            if (authConfig) {
                ;
                ({ access_token } = yield (0, getTokens_1.getTokens)(requestClient, authConfig, types_1.ServerType.SasViya, onTokensRefreshed));
            }
            const { result: currentJob } = yield requestClient
                .get(`/compute/sessions/${executionSessionId}/jobs/${postedJob.id}`, access_token)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while getting job. ');
            });
            let jobResult;
            let log = '';
            const logLink = currentJob.links.find((l) => l.rel === 'log');
            if (debug && logLink) {
                const logUrl = `${logLink.href}/content`;
                const logCount = (_b = (_a = currentJob.logStatistics) === null || _a === void 0 ? void 0 : _a.lineCount) !== null && _b !== void 0 ? _b : 1000000;
                log = yield (0, utils_1.fetchLogByChunks)(requestClient, access_token, logUrl, logCount);
            }
            if (jobStatus === pollJobState_1.JobState.Failed || jobStatus === pollJobState_1.JobState.Error) {
                throw new __1.ComputeJobExecutionError(currentJob, log);
            }
            if (!expectWebout)
                return { job: currentJob, log };
            const resultLink = `/compute/sessions/${executionSessionId}/filerefs/_webout/content`;
            jobResult = yield requestClient
                .get(resultLink, access_token, 'text/plain')
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (e instanceof __1.NotFoundError) {
                    if (logLink) {
                        const logUrl = `${logLink.href}/content`;
                        const logCount = (_b = (_a = currentJob.logStatistics) === null || _a === void 0 ? void 0 : _a.lineCount) !== null && _b !== void 0 ? _b : 1000000;
                        log = yield (0, utils_1.fetchLogByChunks)(requestClient, access_token, logUrl, logCount);
                        return Promise.reject({
                            status: 500,
                            log
                        });
                    }
                }
                return {
                    result: JSON.stringify(e)
                };
            }));
            yield sessionManager
                .clearSession(executionSessionId, access_token)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while clearing session. ');
            });
            return { result: jobResult === null || jobResult === void 0 ? void 0 : jobResult.result, log };
        }
        catch (e) {
            const error = e;
            if (error.status === 404) {
                return executeOnComputeApi(requestClient, sessionManager, rootFolderName, jobPath, linesOfCode, contextName, authConfig, data, debug, false, true);
            }
            else {
                throw (0, error_1.prefixMessage)(e, 'Error while executing script. ');
            }
        }
    });
}


/***/ },

/***/ 2573
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFileStream = void 0;
const time_1 = __webpack_require__(7247);
const host_1 = __webpack_require__(5334);
const getFileStream = (job, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    // Node only, so required rather than imported: a static import of
    // @sasjs/utils/file drags its csvFile module (and @fast-csv, and the stream
    // shim that needs) into the browser bundle.
    const { createWriteStream, isFolder } = __webpack_require__(9278);
    const logPath = filePath || (0, host_1.getCwd)();
    const isFolderPath = yield isFolder(logPath);
    if (isFolderPath) {
        const logFileName = `${job.name || 'job'}-${(0, time_1.generateTimestamp)()}.log`;
        const path = __webpack_require__(9416);
        const logFilePath = path.join(filePath || (0, host_1.getCwd)(), logFileName);
        return yield createWriteStream(logFilePath);
    }
    else {
        return yield createWriteStream(logPath);
    }
});
exports.getFileStream = getFileStream;


/***/ },

/***/ 1514
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doPoll = exports.JobState = exports.readViyaState = void 0;
exports.pollJobState = pollJobState;
const types_1 = __webpack_require__(3631);
const getTokens_1 = __webpack_require__(9609);
const errors_1 = __webpack_require__(7388);
const types_2 = __webpack_require__(3574);
const utils_1 = __webpack_require__(9266);
const host_1 = __webpack_require__(5334);
/**
 * The Viya compute API answers the state link with plain text: the state name,
 * padded with a newline.
 */
const readViyaState = (body) => String(body !== null && body !== void 0 ? body : '').trim();
exports.readViyaState = readViyaState;
var JobState;
(function (JobState) {
    JobState["Completed"] = "completed";
    JobState["Running"] = "running";
    JobState["Pending"] = "pending";
    JobState["Unavailable"] = "unavailable";
    JobState["NoState"] = "";
    JobState["Failed"] = "failed";
    JobState["Error"] = "error";
})(JobState || (exports.JobState = JobState = {}));
/**
 * Polls a job that carries `links`, following the one with `rel === 'state'`
 * until it stops being running, pending or unavailable.
 *
 * The shape it follows is the Viya compute API's - that is where the `state`
 * link, the `?_action=wait` query and the parent-session health check come from
 * - but the shape itself is now a contract two servers answer: SASjs Server
 * returns the same links for a triggered program, so the same poll loop drives
 * both. What differs between them is how the state body is read, and that is a
 * `StateReader` the caller supplies rather than something this module decides.
 *
 * Polls job status using default or provided poll options.
 * @param requestClient - the pre-configured HTTP request client.
 * @param postedJob - the relative or absolute path to the job.
 * @param debug - sets the _debug flag in the job arguments.
 * @param authConfig - an access token, refresh token, client and secret for an authorized user.
 * @param pollOptions - an object containing maxPollCount, pollInterval, streamLog and logFolderPath. It will override the first default poll options in poll strategy if provided.
 * Example pollOptions:
 * {
 *    maxPollCount: 200,
 *    pollInterval: 300,
 *    streamLog: true, // optional, equals to false by default.
 *    pollStrategy?: // optional array of poll options that should be applied after 'maxPollCount' of the provided poll options is reached. If not provided the default (see example below) poll strategy will be used.
 * }
 * Example pollStrategy (values used from default poll strategy):
 * [
 *    { maxPollCount: 200, pollInterval: 300 }, // approximately ~2 mins (including time to get response (~300ms))
 *    { maxPollCount: 300, pollInterval: 3000 }, // approximately ~5.5 mins (including time to get response (~300ms))
 *    { maxPollCount: 500, pollInterval: 30000 }, // approximately ~50.5 mins (including time to get response (~300ms))
 *    { maxPollCount: 3400, pollInterval: 60000 } // approximately ~3015 mins (~125 hours) (including time to get response (~300ms))
 * ]
 * @param jobSessionManager - job session object containing session object and an instance of Session Manager. Job session object is used to periodically (every 10th job state poll) check parent session state.
 * @returns - a promise which resolves with a job state
 */
function pollJobState(requestClient_1, postedJob_1, debug_1, authConfig_1, pollOptions_1, jobSessionManager_1, onTokensRefreshed_1) {
    return __awaiter(this, arguments, void 0, function* (requestClient, postedJob, debug, authConfig, pollOptions, jobSessionManager, onTokensRefreshed, serverType = types_1.ServerType.SasViya, readState = exports.readViyaState) {
        const logger = (0, host_1.getLogger)();
        const streamLog = (pollOptions === null || pollOptions === void 0 ? void 0 : pollOptions.streamLog) || false;
        const defaultPollStrategy = [
            { maxPollCount: 200, pollInterval: 300 },
            { maxPollCount: 300, pollInterval: 3000 },
            { maxPollCount: 500, pollInterval: 30000 },
            { maxPollCount: 3400, pollInterval: 60000 }
        ];
        let pollStrategy;
        if (pollOptions !== undefined) {
            pollStrategy = [pollOptions];
            let { pollStrategy: providedPollStrategy } = pollOptions;
            if (providedPollStrategy !== undefined) {
                validatePollStrategies(providedPollStrategy);
                // INFO: sort by 'maxPollCount'
                providedPollStrategy = providedPollStrategy.sort((strategyA, strategyB) => strategyA.maxPollCount - strategyB.maxPollCount);
                pollStrategy = [...pollStrategy, ...providedPollStrategy];
            }
            else {
                pollStrategy = [...pollStrategy, ...defaultPollStrategy];
            }
        }
        else {
            pollStrategy = defaultPollStrategy;
        }
        let defaultPollOptions = pollStrategy.splice(0, 1)[0];
        pollOptions = Object.assign(Object.assign({}, defaultPollOptions), (pollOptions || {}));
        const stateLink = postedJob.links.find((l) => l.rel === 'state');
        if (!stateLink) {
            throw new Error(`Job state link was not found.`);
        }
        let currentState = yield getJobState(requestClient, postedJob, JobState.NoState, debug, authConfig, serverType, readState).catch((err) => {
            logger.error(`Error fetching job state from ${stateLink.href}. Starting poll, assuming job to be running.`, err);
            return JobState.Unavailable;
        });
        let pollCount = 0;
        if (currentState === JobState.Completed) {
            return Promise.resolve(currentState);
        }
        let logFileStream;
        if (streamLog && (0, utils_1.isNode)()) {
            const { getFileStream } = __webpack_require__(2573);
            logFileStream = yield getFileStream(postedJob, pollOptions.logFolderPath);
        }
        let result = yield (0, exports.doPoll)(requestClient, postedJob, currentState, debug, pollCount, pollOptions, authConfig, streamLog, logFileStream, jobSessionManager, onTokensRefreshed, serverType, readState);
        currentState = result.state;
        pollCount = result.pollCount;
        if (!needsRetry(currentState) ||
            (pollCount >= pollOptions.maxPollCount && !pollStrategy.length)) {
            return currentState;
        }
        // INFO: If we get to this point, this is a long-running job that needs longer polling.
        // We will resume polling with a bigger interval according to the next polling strategy
        while (pollStrategy.length && needsRetry(currentState)) {
            defaultPollOptions = pollStrategy.splice(0, 1)[0];
            if (pollOptions) {
                defaultPollOptions.logFolderPath = pollOptions.logFolderPath;
            }
            result = yield (0, exports.doPoll)(requestClient, postedJob, currentState, debug, pollCount, defaultPollOptions, authConfig, streamLog, logFileStream, jobSessionManager, onTokensRefreshed, serverType, readState);
            currentState = result.state;
            pollCount = result.pollCount;
        }
        if (logFileStream)
            logFileStream.end();
        return currentState;
    });
}
const getJobState = (requestClient_1, job_1, currentState_1, debug_1, authConfig_1, ...args_1) => __awaiter(void 0, [requestClient_1, job_1, currentState_1, debug_1, authConfig_1, ...args_1], void 0, function* (requestClient, job, currentState, debug, authConfig, serverType = types_1.ServerType.SasViya, readState = exports.readViyaState, onTokensRefreshed) {
    const stateLink = job.links.find((l) => l.rel === 'state');
    if (needsRetry(currentState)) {
        let tokens;
        if (authConfig)
            tokens = yield (0, getTokens_1.getTokens)(requestClient, authConfig, serverType, onTokensRefreshed);
        const { result: jobState } = yield requestClient
            .get(`${stateLink.href}?_action=wait&wait=300`, tokens === null || tokens === void 0 ? void 0 : tokens.access_token, 'text/plain', {}, debug)
            .catch((err) => {
            throw new errors_1.JobStatePollError(job.id, err);
        });
        return readState(jobState);
    }
    else {
        return currentState;
    }
});
const needsRetry = (state) => state === JobState.Running ||
    state === JobState.NoState ||
    state === JobState.Pending ||
    state === JobState.Unavailable;
/**
 * Polls job state.
 * @param requestClient - the pre-configured HTTP request client.
 * @param postedJob - the relative or absolute path to the job.
 * @param currentState - current job state.
 * @param debug - sets the _debug flag in the job arguments.
 * @param pollCount - current poll count.
 * @param pollOptions - an object containing maxPollCount, pollInterval, streamLog and logFolderPath.
 * @param authConfig - an access token, refresh token, client and secret for an authorized user.
 * @param streamLog - indicates if job log should be streamed.
 * @param logStream - job log stream.
 * @param jobSessionManager - job session object containing session object and an instance of Session Manager. Job session object is used to periodically (every 10th job state poll) check parent session state. Session state is considered healthy if it is equal to 'running' or 'idle'.
 * @returns - a promise which resolves with a job state
 */
const doPoll = (requestClient_1, postedJob_1, currentState_1, debug_1, pollCount_1, pollOptions_1, authConfig_1, streamLog_1, logStream_1, jobSessionManager_1, onTokensRefreshed_1, ...args_1) => __awaiter(void 0, [requestClient_1, postedJob_1, currentState_1, debug_1, pollCount_1, pollOptions_1, authConfig_1, streamLog_1, logStream_1, jobSessionManager_1, onTokensRefreshed_1, ...args_1], void 0, function* (requestClient, postedJob, currentState, debug, pollCount, pollOptions, authConfig, streamLog, logStream, jobSessionManager, onTokensRefreshed, serverType = types_1.ServerType.SasViya, readState = exports.readViyaState) {
    var _a, _b;
    const { maxPollCount, pollInterval } = pollOptions;
    const logger = (0, host_1.getLogger)();
    const stateLink = postedJob.links.find((l) => l.rel === 'state');
    let maxErrorCount = 5;
    let errorCount = 0;
    let state = currentState;
    let printedState = JobState.NoState;
    let startLogLine = 0;
    while (needsRetry(state) && pollCount <= maxPollCount) {
        // Check parent session state on every 10th job state poll.
        if (jobSessionManager && pollCount && pollCount % 10 === 0 && authConfig) {
            const { session, sessionManager } = jobSessionManager;
            const { stateUrl, etag, id: sessionId } = session;
            const { access_token } = authConfig;
            const { id: jobId } = postedJob;
            // Get session state.
            const { result: sessionState, responseStatus } = yield sessionManager['getSessionState'](stateUrl, etag, access_token).catch((err) => {
                // Handle error while getting session state.
                throw new errors_1.JobStatePollError(jobId, err);
            });
            // Checks if session state is equal to 'running' or 'idle'.
            const isSessionStatesHealthy = (state) => [types_2.SessionState.Running, types_2.SessionState.Idle].includes(state);
            // Clear parent session and throw an error if session state is not
            // 'running', 'idle' or response status is not 200.
            if (!isSessionStatesHealthy(sessionState) || responseStatus !== 200) {
                sessionManager.clearSession(sessionId, access_token);
                const sessionError = isSessionStatesHealthy(sessionState)
                    ? `Session response status is not 200. Session response status is ${responseStatus}.`
                    : `Session state of the job is not 'running' or 'idle'. Session state is '${sessionState}'`;
                throw new errors_1.JobStatePollError(jobId, new Error(sessionError));
            }
        }
        state = yield getJobState(requestClient, postedJob, state, debug, authConfig, serverType, readState, onTokensRefreshed).catch((err) => {
            errorCount++;
            if (pollCount >= maxPollCount || errorCount >= maxErrorCount) {
                throw err;
            }
            logger.error(`Error fetching job state from ${stateLink.href}. Resuming poll, assuming job to be running.`, err);
            return JobState.Unavailable;
        });
        pollCount++;
        const jobHref = postedJob.links.find((l) => l.rel === 'self').href;
        if (streamLog) {
            const { result: job } = yield requestClient.get(jobHref, authConfig === null || authConfig === void 0 ? void 0 : authConfig.access_token);
            const endLogLine = (_b = (_a = job.logStatistics) === null || _a === void 0 ? void 0 : _a.lineCount) !== null && _b !== void 0 ? _b : 1000000;
            const { saveLog } = (0, utils_1.isNode)() ? __webpack_require__(5098) : { saveLog: null };
            if (saveLog) {
                yield saveLog(postedJob, requestClient, startLogLine, endLogLine, logStream, authConfig === null || authConfig === void 0 ? void 0 : authConfig.access_token);
            }
            startLogLine += endLogLine;
        }
        if (debug && printedState !== state) {
            logger.info(`Polling: ${requestClient.getBaseUrl() + jobHref}/state`);
            logger.info(`Current job state: ${state}`);
            printedState = state;
        }
        if (state !== JobState.Unavailable && errorCount > 0) {
            errorCount = 0;
        }
        if (state !== JobState.Completed) {
            yield (0, utils_1.delay)(pollInterval);
        }
    }
    return { state, pollCount };
});
exports.doPoll = doPoll;
const validatePollStrategies = (strategy) => {
    const throwError = (message, pollOptions) => {
        throw new Error(`Poll strategies are not valid.${message ? ` ${message}` : ''}${pollOptions
            ? ` Invalid poll strategy: \n${JSON.stringify(pollOptions, null, 2)}`
            : ''}`);
    };
    strategy.forEach((pollOptions, i) => {
        const { maxPollCount, pollInterval } = pollOptions;
        if (maxPollCount < 1) {
            throwError(`'maxPollCount' has to be greater than 0.`, pollOptions);
        }
        else if (i !== 0) {
            const previousPollOptions = strategy[i - 1];
            if (maxPollCount <= previousPollOptions.maxPollCount) {
                throwError(`'maxPollCount' has to be greater than 'maxPollCount' in previous poll strategy.`, pollOptions);
            }
        }
        else if (pollInterval < 1) {
            throwError(`'pollInterval' has to be greater than 0.`, pollOptions);
        }
    });
};


/***/ },

/***/ 5098
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveLog = saveLog;
const utils_1 = __webpack_require__(9266);
const writeStream_1 = __webpack_require__(1248);
const host_1 = __webpack_require__(5334);
/**
 * Appends logs to a supplied write stream.
 * This is useful for getting quick feedback on longer running jobs.
 * @param job - the job to fetch logs for
 * @param requestClient - the pre-configured HTTP request client
 * @param startLine - the line at which to start fetching the log
 * @param endLine - the line at which to stop fetching the log
 * @param logFileStream - the write stream to which the log is appended
 * @accessToken - an optional access token for authentication/authorization
 * The access token is not required when fetching logs from the browser.
 */
function saveLog(job, requestClient, startLine, endLine, logFileStream, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accessToken) {
            throw new Error(`Logs for job ${job.id} cannot be fetched without a valid access token.`);
        }
        if (!logFileStream) {
            throw new Error(`Logs for job ${job.id} cannot be written without a valid write stream.`);
        }
        const logger = (0, host_1.getLogger)();
        const jobLogUrl = job.links.find((l) => l.rel === 'log');
        if (!jobLogUrl) {
            throw new Error(`Log URL for job ${job.id} was not found.`);
        }
        const log = yield (0, utils_1.fetchLog)(requestClient, accessToken, `${jobLogUrl.href}/content`, startLine, endLine);
        logger.info(`Writing logs to ${logFileStream.path}`);
        yield (0, writeStream_1.writeStream)(logFileStream, log || '');
    });
}


/***/ },

/***/ 8563
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uploadTables = uploadTables;
const error_1 = __webpack_require__(6340);
const convertToCsv_1 = __webpack_require__(4786);
/**
 * Uploads tables to SAS as specially formatted CSVs.
 * This is more compact than JSON, and easier to read within SAS.
 * @param requestClient - the pre-configured HTTP request client
 * @param data - the JSON representation of the data to be uploaded
 * @param accessToken - an optional access token for authentication/authorization
 * The access token is not required when uploading tables from the browser.
 */
function uploadTables(requestClient, data, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadedFiles = [];
        for (const tableName in data) {
            // $tablename keys carry only column-format metadata for the matching
            // tablename payload; they must not be uploaded as separate files.
            if ((0, convertToCsv_1.isFormatsTable)(tableName))
                continue;
            const csv = (0, convertToCsv_1.convertToCSV)(data, tableName);
            if (csv === 'ERROR: LARGE STRING LENGTH') {
                throw new Error('The max length of a string value in SASjs is 32765 characters.');
            }
            const uploadResponse = yield requestClient
                .uploadFile(`/files/files#rawUpload`, csv, accessToken)
                .catch((err) => {
                throw (0, error_1.prefixMessage)(err, 'Error while uploading file. ');
            });
            uploadedFiles.push({ tableName, file: uploadResponse.result });
        }
        return uploadedFiles;
    });
}


/***/ },

/***/ 1248
(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.writeStream = void 0;
const writeStream = (stream, content) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        stream.write(content + '\n', (err) => {
            if (err) {
                reject(err); // Reject on write error
            }
            else {
                resolve(true); // Resolve on successful write
            }
        });
    });
});
exports.writeStream = writeStream;


/***/ },

/***/ 6838
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.apiBaseFromPathSASJS = exports.apiBasePrefix = exports.normaliseApiBasePath = exports.DEFAULT_API_BASE_PATH = exports.STP_EXECUTE_SUFFIX = exports.DEFAULT_PATH_SASJS = void 0;
/**
 * Where the SASjs Server API is mounted.
 *
 * This is the one name the adapter needs for a SASjs Server, and it is the same
 * kind of value as `pathSASViya` - a single path that says where this server
 * type's endpoints live. Servers from the release that introduced the short
 * paths answer `/api` as well, and a project may prefer that spelling for what
 * it shows in a URL, a log or a network panel.
 */
exports.DEFAULT_PATH_SASJS = '/SASjsApi';
/** The stored-program endpoint under that mount. Hard-coded, not configurable. */
exports.STP_EXECUTE_SUFFIX = '/stp/execute';
/** The mount used by the URL builders when no config reaches them. */
exports.DEFAULT_API_BASE_PATH = exports.DEFAULT_PATH_SASJS;
/**
 * A base path the URL builders can concatenate with confidence: one leading
 * slash, no trailing one. `SASjsApi`, `/SASjsApi/` and ` /SASjsApi ` all mean
 * the same mount, and a trailing slash here would double up in every path.
 */
const normaliseApiBasePath = (path) => {
    const raw = (path || '').trim();
    // Absent and empty mean the default. A value of only slashes is the root
    // mount, and is a real deployment - a proxy that puts the API at the origin -
    // so the two are separated before the runs are stripped, or both would fold
    // into the default.
    if (!raw)
        return exports.DEFAULT_PATH_SASJS;
    // Scanned rather than matched with /^\/+|\/+$/ : a run of slashes makes that
    // pattern backtrack, which is the kind of input a config value can carry by
    // accident, and CodeQL flags it.
    let first = 0;
    while (first < raw.length && raw.charAt(first) === '/')
        first++;
    let last = raw.length;
    while (last > first && raw.charAt(last - 1) === '/')
        last--;
    const middle = raw.slice(first, last);
    return middle ? `/${middle}` : '/';
};
exports.normaliseApiBasePath = normaliseApiBasePath;
/**
 * The mount as callers concatenate it.
 *
 * A root mount contributes nothing, so a URL built as
 * `${serverUrl}${apiBasePrefix(base)}/session` is `https://host/session` rather
 * than `https://host//session`. Every place that composes a path by hand uses
 * this, because a doubled slash is a different URL to a proxy.
 */
const apiBasePrefix = (base) => (0, exports.normaliseApiBasePath)(base) === '/' ? '' : (0, exports.normaliseApiBasePath)(base);
exports.apiBasePrefix = apiBasePrefix;
/**
 * The mount, read from `pathSASJS`.
 *
 * `pathSASJS` names the mount itself (`/SASjsApi`, `/api`); the stored-program
 * endpoint under it is `/stp/execute` and is appended by the code that calls it,
 * so there is one place a stub path can be got wrong instead of a config value
 * that has to agree with it.
 *
 * A value carrying the endpoint - `/api/stp/execute` - is accepted and read as
 * the mount it names, because that spelling appears in earlier documentation and
 * in bookmarks, and the two mean the same server.
 */
const apiBaseFromPathSASJS = (pathSASJS) => {
    const base = (0, exports.normaliseApiBasePath)(pathSASJS);
    if (base.endsWith(exports.STP_EXECUTE_SUFFIX))
        return base.slice(0, -exports.STP_EXECUTE_SUFFIX.length) || '/';
    return base;
};
exports.apiBaseFromPathSASJS = apiBaseFromPathSASJS;


/***/ },

/***/ 7710
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthManager = void 0;
const types_1 = __webpack_require__(3631);
const errors_1 = __webpack_require__(7388);
const utils_1 = __webpack_require__(9266);
const extractUserLongNameSas9_1 = __webpack_require__(8548);
const openWebPage_1 = __webpack_require__(2894);
const verifySas9Login_1 = __webpack_require__(4257);
const verifySasViyaLogin_1 = __webpack_require__(5009);
const _1 = __webpack_require__(4879);
const host_1 = __webpack_require__(5334);
const apiBasePath_1 = __webpack_require__(6838);
class AuthManager {
    constructor(serverUrl, serverType, requestClient, loginCallback, apiBasePath = apiBasePath_1.DEFAULT_API_BASE_PATH) {
        this.serverUrl = serverUrl;
        this.serverType = serverType;
        this.requestClient = requestClient;
        this.loginCallback = loginCallback;
        this.userName = '';
        this.userLongName = '';
        this.redirectedLoginUrl = `/SASLogon`; //SAS 9 M8 no longer redirects from `/SASLogon/home` to the login page. `/SASLogon` seems to be stable enough across SAS versions
        this.extractUserName = (response) => {
            switch (this.serverType) {
                case types_1.ServerType.SasViya:
                    return response === null || response === void 0 ? void 0 : response.id;
                case types_1.ServerType.Sas9:
                    return '';
                case types_1.ServerType.Sasjs:
                    return response === null || response === void 0 ? void 0 : response.username;
                default:
                    console.error('Server Type not found in extractUserName function');
                    return '';
            }
        };
        this.extractUserLongName = (response) => {
            switch (this.serverType) {
                case types_1.ServerType.SasViya:
                    return response === null || response === void 0 ? void 0 : response.name;
                case types_1.ServerType.Sas9:
                    return (0, extractUserLongNameSas9_1.extractUserLongNameSas9)(response);
                case types_1.ServerType.Sasjs:
                    return response === null || response === void 0 ? void 0 : response.displayName;
                default:
                    console.error('Server Type not found in extractUserName function');
                    return '';
            }
        };
        this.setLoginUrl = (matches) => {
            let parsedURL = matches[1].replace(/\?.*/, '');
            if (parsedURL[0] === '/') {
                parsedURL = parsedURL.substr(1);
                const tempLoginLink = this.serverUrl
                    ? `${this.serverUrl}/${parsedURL}`
                    : `${parsedURL}`;
                const loginUrl = tempLoginLink;
                this.loginUrl =
                    this.serverType === types_1.ServerType.SasViya
                        ? tempLoginLink
                        : loginUrl.replace('/SASLogon/login.do', '/SASLogon/login');
            }
        };
        this.apiBase = (0, apiBasePath_1.normaliseApiBasePath)(apiBasePath);
        this.loginUrl = `/SASLogon/login`;
        this.logoutUrl =
            this.serverType === types_1.ServerType.Sas9
                ? '/SASLogon/logout?'
                : this.serverType === types_1.ServerType.SasViya
                    ? '/SASLogon/logout.do?'
                    : '/SASLogon/logout';
        this.redirectedLoginUrl = this.serverUrl + this.redirectedLoginUrl;
    }
    /**
     * Opens Pop up window to SAS Login screen.
     * And checks if user has finished login process.
     */
    redirectedLogIn(_a) {
        return __awaiter(this, arguments, void 0, function* ({ onLoggedOut }) {
            const { isLoggedIn: isLoggedInAlready, userName: currentSessionUserName, userLongName: currentSessionUserLongName } = yield this.fetchUserName();
            if (isLoggedInAlready) {
                const logger = (0, host_1.getLogger)();
                logger.log('login was not attempted as a valid session already exists');
                yield this.loginCallback();
                return {
                    isLoggedIn: true,
                    userName: currentSessionUserName,
                    userLongName: currentSessionUserLongName
                };
            }
            const loginPopup = yield (0, openWebPage_1.openWebPage)(this.redirectedLoginUrl, 'SASLogon', {
                width: 500,
                height: 600
            }, onLoggedOut);
            if (!loginPopup) {
                return { isLoggedIn: false, userName: '', userLongName: '' };
            }
            const { isLoggedIn } = this.serverType === types_1.ServerType.SasViya
                ? yield (0, verifySasViyaLogin_1.verifySasViyaLogin)(loginPopup)
                : yield (0, verifySas9Login_1.verifySas9Login)(loginPopup);
            loginPopup.close();
            if (isLoggedIn) {
                if (this.serverType === types_1.ServerType.Sas9) {
                    yield this.performCASSecurityCheck();
                }
                const { userName, userLongName } = yield this.fetchUserName();
                yield this.loginCallback();
                return { isLoggedIn: true, userName, userLongName };
            }
            return { isLoggedIn: false, userName: '', userLongName: '' };
        });
    }
    /**
     * Logs into the SAS server with the supplied credentials.
     * @param username - a string representing the username.
     * @param password - a string representing the password.
     * @returns - a boolean `isLoggedin` and a string `username`
     */
    logIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginParams = {
                _service: 'default',
                username,
                password
            };
            this.userName = '';
            this.userLongName = '';
            let { isLoggedIn: isLoggedInAlready, loginForm, userLongName: currentSessionUserLongName } = yield this.checkSession();
            if (isLoggedInAlready) {
                const logger = (0, host_1.getLogger)();
                logger.log('login was not attempted as a valid session already exists');
                yield this.loginCallback();
                this.userName = loginParams.username;
                this.userLongName = currentSessionUserLongName;
                return {
                    isLoggedIn: true,
                    userName: this.userName,
                    userLongName: this.userLongName
                };
            }
            let loginResponse = yield this.sendLoginRequest(loginForm, loginParams);
            let isLoggedIn = (0, _1.isLogInSuccessHeaderPresent)(this.serverType, loginResponse);
            if (!isLoggedIn) {
                if (isCredentialsVerifyError(loginResponse)) {
                    const newLoginForm = yield this.getLoginForm(loginResponse);
                    loginResponse = yield this.sendLoginRequest(newLoginForm, loginParams);
                }
                // Sometimes due to redirection on SAS9 and SASViya we don't get the login response that says
                // You have signed in. Therefore, we have to make an extra request for checking session to
                // ensure either user is logged in or not.
                const res = yield this.checkSession();
                isLoggedIn = res.isLoggedIn;
                this.userLongName = res.userLongName;
            }
            if (isLoggedIn) {
                if (this.serverType === types_1.ServerType.Sas9) {
                    yield this.performCASSecurityCheck();
                }
                this.loginCallback();
                this.userName = loginParams.username;
            }
            return {
                isLoggedIn,
                userName: this.userName,
                userLongName: this.userLongName
            };
        });
    }
    performCASSecurityCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            const casAuthenticationUrl = `${this.serverUrl}/SASStoredProcess/j_spring_cas_security_check`;
            yield this.requestClient
                .get(`/SASLogon/login?service=${casAuthenticationUrl}`, undefined)
                .catch((err) => {
                // ignore if resource not found error
                if (!(err instanceof errors_1.NotFoundError))
                    throw err;
            });
        });
    }
    sendLoginRequest(loginForm, loginParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.serverType === types_1.ServerType.Sasjs) {
                const { username, password } = loginParams;
                const { result: loginResponse } = yield this.requestClient.post(this.loginUrl, { username, password }, undefined);
                return loginResponse;
            }
            for (const key in loginForm) {
                loginParams[key] = loginForm[key];
            }
            const loginParamsStr = (0, utils_1.serialize)(loginParams);
            const { result: loginResponse } = yield this.requestClient.post(this.loginUrl, loginParamsStr, undefined, 'text/plain', {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*'
            });
            return loginResponse;
        });
    }
    /**
     * Checks whether a session is active, or login is required.
     * @returns - a promise which resolves with an object containing three values
     *  - a boolean `isLoggedIn`
     *  - a string `userName`,
     *  - a string `userFullName` and
     *  - a form `loginForm` if not loggedIn.
     */
    checkSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const { isLoggedIn, userName, userLongName } = yield this.fetchUserName();
            let loginForm = null;
            if (!isLoggedIn) {
                //We will logout to make sure cookies are removed and login form is presented
                //Residue can happen in case of session expiration
                yield this.logOut();
                loginForm = yield this.getNewLoginForm();
            }
            return Promise.resolve({
                isLoggedIn,
                userName,
                userLongName,
                loginForm
            });
        });
    }
    getNewLoginForm() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.serverType === types_1.ServerType.Sasjs) {
                // server will be sending CSRF token in response,
                // need to save in cookie so that,
                // http client will use it automatically
                return this.requestClient.get('/', undefined).then(({ result }) => {
                    var _a;
                    const cookie = (_a = /<script>document.cookie = '(XSRF-TOKEN=.*; Max-Age=86400; SameSite=Strict; Path=\/;)'<\/script>/.exec(result)) === null || _a === void 0 ? void 0 : _a[1];
                    if (cookie)
                        document.cookie = cookie;
                });
            }
            const { result: formResponse } = yield this.requestClient.get(this.loginUrl.replace('/SASLogon/login.do', '/SASLogon/login'), undefined, 'text/plain');
            return yield this.getLoginForm(formResponse);
        });
    }
    fetchUserName() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.serverType === types_1.ServerType.SasViya
                ? `${this.serverUrl}/identities/users/@currentUser`
                : this.serverType === types_1.ServerType.Sas9
                    ? `${this.serverUrl}/SASStoredProcess`
                    : `${this.serverUrl}${(0, apiBasePath_1.apiBasePrefix)(this.apiBase)}/session`;
            const { result: loginResponse } = yield this.requestClient
                .get(url, undefined, 'text/plain')
                .catch((err) => {
                return { result: 'authErr' };
            });
            const isLoggedIn = loginResponse !== 'authErr';
            if (!isLoggedIn) {
                //We will logout to make sure cookies are removed and login form is presented
                //Residue can happen in case of session expiration
                yield this.logOut();
                return { isLoggedIn, userName: '', userLongName: '' };
            }
            return {
                isLoggedIn,
                userName: this.extractUserName(loginResponse),
                userLongName: this.extractUserLongName(loginResponse)
            };
        });
    }
    getLoginForm(response) {
        const pattern = /<form.+action="(.*(Logon|login)[^"]*).*>/;
        const matches = pattern.exec(response);
        const formInputs = {};
        if (matches && matches.length) {
            this.setLoginUrl(matches);
            response = response.replace(/<input/g, '\n<input');
            const inputs = response.match(/<input.*"hidden"[^>]*>/g);
            if (inputs) {
                inputs.forEach((inputStr) => {
                    const valueMatch = inputStr.match(/name="([^"]*)"\svalue="([^"]*)/);
                    if (valueMatch && valueMatch.length) {
                        formInputs[valueMatch[1]] = valueMatch[2];
                    }
                });
            }
        }
        return Object.keys(formInputs).length ? formInputs : null;
    }
    /**
     * Logs out of the configured SAS server.
     *
     */
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
            this.requestClient.resetInMemoryAuthState();
            return this.requestClient.get(this.logoutUrl, undefined).then(() => true);
        });
    }
}
exports.AuthManager = AuthManager;
const isCredentialsVerifyError = (response) => /An error occurred while the system was verifying your credentials. Please enter your credentials again./gm.test(response);


/***/ },

/***/ 9239
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAccessTokenForSasjs = getAccessTokenForSasjs;
const error_1 = __webpack_require__(6340);
const getTokenRequestErrorPrefix_1 = __webpack_require__(1087);
const types_1 = __webpack_require__(3631);
const apiBasePath_1 = __webpack_require__(6838);
/**
 * Exchanges the auth code for an access token for the given client.
 * @param requestClient - the pre-configured HTTP request client
 * @param clientId - the client ID to authenticate with.
 * @param authCode - the auth code received from the server.
 * @param apiBasePath - the path the API is mounted at, default `/SASjsApi`.
 */
function getAccessTokenForSasjs(requestClient_1, clientId_1, authCode_1) {
    return __awaiter(this, arguments, void 0, function* (requestClient, clientId, authCode, apiBasePath = apiBasePath_1.DEFAULT_API_BASE_PATH) {
        const url = `${(0, apiBasePath_1.apiBasePrefix)(apiBasePath)}/auth/token`;
        const data = {
            clientId,
            code: authCode
        };
        return yield requestClient
            .post(url, data, undefined)
            .then((res) => {
            const sasAuth = res.result;
            return {
                access_token: sasAuth.accessToken,
                refresh_token: sasAuth.refreshToken
            };
        })
            .catch((err) => {
            throw (0, error_1.prefixMessage)(err, (0, getTokenRequestErrorPrefix_1.getTokenRequestErrorPrefix)('fetching access token', 'getAccessTokenForSasjs', types_1.ServerType.Sasjs, url, data, clientId));
        });
    });
}


/***/ },

/***/ 1674
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAccessTokenForViya = getAccessTokenForViya;
const types_1 = __webpack_require__(3631);
const error_1 = __webpack_require__(6340);
const errors_1 = __webpack_require__(7388);
const getTokenRequestErrorPrefix_1 = __webpack_require__(1087);
/**
 * Exchange the auth code for access / refresh tokens for the given client / secret pair.
 * @param requestClient - the pre-configured HTTP request client.
 * @param clientId - the client ID to authenticate with.
 * @param clientSecret - the client secret to authenticate with.
 * @param authCode - the auth code received from the server.
 */
function getAccessTokenForViya(requestClient, clientId, clientSecret, authCode) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        if (typeof Buffer === 'undefined') {
            token = btoa(clientId + ':' + clientSecret);
        }
        else {
            token = Buffer.from(clientId + ':' + clientSecret).toString('base64');
        }
        const url = '/SASLogon/oauth/token';
        const headers = {
            Authorization: 'Basic ' + token,
            Accept: 'application/json'
        };
        const dataJson = new URLSearchParams({
            grant_type: 'authorization_code',
            code: authCode
        });
        const data = new URLSearchParams(dataJson);
        const authResponse = yield requestClient
            .post(url, data, undefined, 'application/x-www-form-urlencoded', headers)
            .then((res) => res.result)
            .catch((err) => {
            if (err instanceof errors_1.CertificateError)
                throw err;
            throw (0, error_1.prefixMessage)(err, (0, getTokenRequestErrorPrefix_1.getTokenRequestErrorPrefix)('fetching access token', 'getAccessTokenForViya', types_1.ServerType.SasViya, url, dataJson, headers, clientId, clientSecret));
        });
        return authResponse;
    });
}


/***/ },

/***/ 1087
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = exports.getTokenRequestErrorPrefix = void 0;
const types_1 = __webpack_require__(3631);
const getServerName = (server) => server === types_1.ServerType.SasViya ? 'Viya' : 'Sasjs';
const getResponseTitle = (server) => `Response from ${getServerName(server)} is below.`;
/**
 * Forms error prefix for requests related to token operations.
 * @param operation - string describing operation ('fetching access token' or 'refreshing tokens').
 * @param funcName - name of the function sent the request.
 * @param server - server type (SASVIYA or SASJS).
 * @param url - endpoint used to send the request.
 * @param data - request payload.
 * @param headers - request headers.
 * @param clientId - client ID to authenticate with.
 * @param clientSecret - client secret to authenticate with.
 * @returns - string containing request information. Example:
 * Error while fetching access token from /SASLogon/oauth/token
 * Thrown by the @sasjs/adapter getAccessTokenForViya function.
 * Payload:
 * {
 *   "grant_type": "authorization_code",
 *   "code": "example_code"
 * }
 * Headers:
 * {
 *   "Authorization": "Basic NEdMQXBwOjRHTEFwcDE=",
 *   "Accept": "application/json"
 * }
 * ClientId: exampleClientId
 * ClientSecret: exampleClientSecret
 *
 * Response from Viya is below.
 * Auth error: {
 *   "error": "invalid_token",
 *   "error_description": "No scopes were granted"
 * }
 */
const getTokenRequestErrorPrefix = (operation, funcName, server, url, data, headers, clientId, clientSecret) => {
    const stringify = (obj) => JSON.stringify(obj, null, 2);
    const lines = [
        `Error while ${operation} from ${url}`,
        `Thrown by the @sasjs/adapter ${funcName} function.`
    ];
    if (data) {
        lines.push('Payload:');
        lines.push(stringify(data));
    }
    if (headers) {
        lines.push('Headers:');
        lines.push(stringify(headers));
    }
    if (clientId)
        lines.push(`ClientId: ${clientId}`);
    if (clientSecret)
        lines.push(`ClientSecret: ${clientSecret}`);
    lines.push('');
    lines.push(`${getResponseTitle(server)}`);
    lines.push('');
    return lines.join(`\n`);
};
exports.getTokenRequestErrorPrefix = getTokenRequestErrorPrefix;
/**
 * Parse error prefix to get response payload.
 * @param prefix - error prefix generated by getTokenRequestErrorPrefix function.
 * @param server - server type (SASVIYA or SASJS).
 * @returns - response payload.
 */
const getTokenRequestErrorPrefixResponse = (prefix, server) => prefix.split(`${getResponseTitle(server)}\n`).pop();
__webpack_unused_export__ = getTokenRequestErrorPrefixResponse;


/***/ },

/***/ 9609
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTokens = getTokens;
const auth_1 = __webpack_require__(6072);
const types_1 = __webpack_require__(3631);
const refreshTokensForViya_1 = __webpack_require__(5747);
const refreshTokensForSasjs_1 = __webpack_require__(6725);
const host_1 = __webpack_require__(5334);
const apiBasePath_1 = __webpack_require__(6838);
/**
 * Returns the auth configuration, refreshing the tokens if necessary.
 * This function can only be used by Node, if a server type is SASVIYA.
 * @param requestClient - the pre-configured HTTP request client
 * @param authConfig - an object containing a client ID, secret, access token and refresh token
 * @param serverType - server type for which refreshing the tokens, defaults to SASVIYA
 * @param onTokensRefreshed - optional callback invoked with the rotated token
 * pair after a successful internal refresh.
 * @param apiBasePath - the path the SASjs API is mounted at, default `/SASjsApi`.
 * Only used for `ServerType.Sasjs`.
 */
function getTokens(requestClient_1, authConfig_1) {
    return __awaiter(this, arguments, void 0, function* (requestClient, authConfig, serverType = types_1.ServerType.SasViya, onTokensRefreshed, apiBasePath = apiBasePath_1.DEFAULT_API_BASE_PATH) {
        const logger = (0, host_1.getLogger)();
        // Note: client/secret are NOT mutated. The sas.cli public-client fallback
        // is applied only to the refresh call itself, so a caller that round-trips
        // the returned AuthConfig into persistent storage never ends up saving
        // fabricated CLIENT/SECRET values.
        let { access_token, refresh_token } = authConfig;
        const { client, secret } = authConfig;
        // Tokens are not always decodable JWTs - some servers issue opaque tokens.
        // jwt-decode throws InvalidTokenError for these; only in that case is the
        // token treated as still valid (the server is the authority on expiry and
        // will reject a genuinely expired token on use/refresh).
        // Use a 300 s (5 min) safety margin instead of the isAccessTokenExpiring
        // default of 3600 s (1 h).  Some Viya estates issue access tokens with a
        // 1-hour TTL; with the 3600 s default a brand-new 1 h token is immediately
        // considered "expiring", causing a redundant refresh even when the CLI has
        // already refreshed the token moments earlier.  300 s is short enough that a
        // fresh 1 h token (TTL ≈ 3600 ≫ 300) is NOT considered expiring, yet long
        // enough to let a single API call complete before the token actually expires.
        // Long-running jobs are protected because pollJobState calls getTokens on
        // every poll, so a token that does expire mid-job is refreshed in-place.
        let isAccessTokenExpiringSoon = false;
        try {
            isAccessTokenExpiringSoon = (0, auth_1.isAccessTokenExpiring)(access_token, 300);
        }
        catch (e) {
            if (e.name !== 'InvalidTokenError')
                throw e;
        }
        let isRefreshTokenExpired = false;
        try {
            isRefreshTokenExpired = (0, auth_1.hasTokenExpired)(refresh_token);
        }
        catch (e) {
            if (e.name !== 'InvalidTokenError')
                throw e;
        }
        let isRefreshTokenExpiringSoon = false;
        try {
            isRefreshTokenExpiringSoon = (0, auth_1.isRefreshTokenExpiring)(refresh_token);
        }
        catch (e) {
            if (e.name !== 'InvalidTokenError')
                throw e;
        }
        if (isAccessTokenExpiringSoon || isRefreshTokenExpiringSoon) {
            if (isRefreshTokenExpired) {
                const error = 'Unable to obtain new access token. Your refresh token has expired.';
                logger.error(error);
                throw new Error(error);
            }
            logger.info('Refreshing access and refresh tokens.');
            // Tokens minted without a registered OAuth client (e.g. via the
            // password grant against the built-in public client) can still be
            // refreshed using that same secret-less client. A configured client
            // with a missing secret is treated as a public client (empty secret).
            const tokens = serverType === types_1.ServerType.SasViya
                ? yield (0, refreshTokensForViya_1.refreshTokensForViya)(requestClient, client || 'sas.cli', secret || '', refresh_token)
                : yield (0, refreshTokensForSasjs_1.refreshTokensForSasjs)(requestClient, refresh_token, apiBasePath);
            ({ access_token, refresh_token } = tokens);
            // Viya refresh tokens are single-use/rotating. Callers throughout the
            // compute-execution chain (executeOnComputeApi, pollJobState's poll
            // loop, executeComputeJob -> executeJob, etc.) share this same
            // authConfig object by reference and call getTokens again later in the
            // same execution - update it in place so a later call in the same chain
            // refreshes with the token that was just issued, not the one that was
            // just consumed. client/secret are deliberately left untouched (see
            // note above).
            authConfig.access_token = access_token;
            authConfig.refresh_token = refresh_token;
            // A failing persistence handler must not turn a successful refresh into
            // an auth failure - log the error and return the fresh pair regardless.
            try {
                yield (onTokensRefreshed === null || onTokensRefreshed === void 0 ? void 0 : onTokensRefreshed({ access_token, refresh_token }));
            }
            catch (e) {
                logger.error('onTokensRefreshed handler failed:', e);
            }
        }
        return { access_token, refresh_token, client, secret };
    });
}


/***/ },

/***/ 4879
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7710), exports);
__exportStar(__webpack_require__(7607), exports);
__exportStar(__webpack_require__(2359), exports);
__exportStar(__webpack_require__(7847), exports);


/***/ },

/***/ 7607
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAuthorizeFormRequired = void 0;
const isAuthorizeFormRequired = (response) => {
    return /<form.+action="(.*Logon\/oauth\/authorize[^"]*).*>/gm.test(response);
};
exports.isAuthorizeFormRequired = isAuthorizeFormRequired;


/***/ },

/***/ 2359
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isLogInRequired = void 0;
const isLogInRequired = (response) => {
    const pattern = /<form.+action="(.*(Logon)|(login)[^"]*).*>/gm;
    const matches = pattern.test(response);
    return matches;
};
exports.isLogInRequired = isLogInRequired;


/***/ },

/***/ 7847
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isLogInSuccessHeaderPresent = exports.getExpectedLogInSuccessHeader = exports.loginSuccessHeaders = exports.defaultSuccessHeaderKey = void 0;
const types_1 = __webpack_require__(3631);
const utils_1 = __webpack_require__(9266);
const enLoginSuccessHeader = 'You have signed in.';
exports.defaultSuccessHeaderKey = 'default';
// The following headers provided by https://github.com/sasjs/adapter/issues/835#issuecomment-2177818601
exports.loginSuccessHeaders = {
    es: `Ya se ha iniciado la sesi\u00f3n.`,
    th: `\u0e04\u0e38\u0e13\u0e25\u0e07\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e02\u0e49\u0e32\u0e43\u0e0a\u0e49\u0e41\u0e25\u0e49\u0e27`,
    ja: `\u30b5\u30a4\u30f3\u30a4\u30f3\u3057\u307e\u3057\u305f\u3002`,
    nb: `Du har logget deg p\u00e5.`,
    sl: `Prijavili ste se.`,
    ar: `\u0644\u0642\u062f \u0642\u0645\u062a `,
    sk: `Prihl\u00e1sili ste sa.`,
    zh_HK: `\u60a8\u5df2\u767b\u5165\u3002`,
    zh_CN: `\u60a8\u5df2\u767b\u5f55\u3002`,
    it: `L'utente si \u00e8 connesso.`,
    sv: `Du har loggat in.`,
    he: `\u05e0\u05db\u05e0\u05e1\u05ea `,
    nl: `U hebt zich aangemeld.`,
    pl: `Zosta\u0142e\u015b zalogowany.`,
    ko: `\ub85c\uadf8\uc778\ud588\uc2b5\ub2c8\ub2e4.`,
    zh_TW: `\u60a8\u5df2\u767b\u5165\u3002`,
    tr: `Oturum a\u00e7t\u0131n\u0131z.`,
    iw: `\u05e0\u05db\u05e0\u05e1\u05ea `,
    fr: `Vous \u00eates connect\u00e9.`,
    uk: `\u0412\u0438 \u0432\u0432\u0456\u0439\u0448\u043b\u0438 \u0432 \u043e\u0431\u043b\u0456\u043a\u043e\u0432\u0438\u0439 \u0437\u0430\u043f\u0438\u0441.`,
    pt_BR: `Voc\u00ea se conectou.`,
    no: `Du har logget deg p\u00e5.`,
    cs: `Jste p\u0159ihl\u00e1\u0161eni.`,
    fi: `Olet kirjautunut sis\u00e4\u00e4n.`,
    ru: `\u0412\u044b \u0432\u044b\u043f\u043e\u043b\u043d\u0438\u043b\u0438 \u0432\u0445\u043e\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0443.`,
    el: `\u0388\u03c7\u03b5\u03c4\u03b5 \u03c3\u03c5\u03bd\u03b4\u03b5\u03b8\u03b5\u03af.`,
    hr: `Prijavili ste se.`,
    da: `Du er logget p\u00e5.`,
    de: `Sie sind jetzt angemeldet.`,
    sh: `Prijavljeni ste.`,
    pt: `Iniciou sess\u00e3o.`,
    hu: `Bejelentkezett.`,
    sr: `Prijavljeni ste.`,
    en: enLoginSuccessHeader,
    [exports.defaultSuccessHeaderKey]: enLoginSuccessHeader
};
/**
 * Provides expected login header based on language settings of the browser.
 * @returns - expected header as a string.
 */
const getExpectedLogInSuccessHeader = () => {
    // get default success header
    let successHeader = exports.loginSuccessHeaders[exports.defaultSuccessHeaderKey];
    // get user language based on language settings of the browser
    const userLang = (0, utils_1.getUserLanguage)();
    if (userLang) {
        // get success header on exact match of the language code
        let userLangSuccessHeader = exports.loginSuccessHeaders[userLang];
        // handle case when there is no exact match of the language code
        if (!userLangSuccessHeader) {
            // get all supported language codes
            const headerLanguages = Object.keys(exports.loginSuccessHeaders);
            // find language code on partial match
            const headerLanguage = headerLanguages.find((language) => new RegExp(language, 'i').test(userLang));
            // reassign success header if partial match was found
            if (headerLanguage) {
                successHeader = exports.loginSuccessHeaders[headerLanguage];
            }
        }
        else {
            successHeader = userLangSuccessHeader;
        }
    }
    return successHeader;
};
exports.getExpectedLogInSuccessHeader = getExpectedLogInSuccessHeader;
/**
 * Checks if Login success header is present in the response based on language settings of the browser.
 * @param serverType - server type.
 * @param response - response object.
 * @returns - boolean indicating if Login success header is present.
 */
const isLogInSuccessHeaderPresent = (serverType, response) => {
    if (serverType === types_1.ServerType.Sasjs)
        return response === null || response === void 0 ? void 0 : response.loggedIn;
    return new RegExp((0, exports.getExpectedLogInSuccessHeader)(), 'gm').test(response);
};
exports.isLogInSuccessHeaderPresent = isLogInSuccessHeaderPresent;


/***/ },

/***/ 2894
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openWebPage = openWebPage;
const loginPrompt_1 = __webpack_require__(2986);
const defaultWindowFeatures = { width: 500, height: 600 };
function openWebPage(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, windowName = '', WindowFeatures = defaultWindowFeatures, onLoggedOut) {
        const { width, height } = WindowFeatures;
        const left = screen.width / 2 - width / 2;
        const top = screen.height / 2 - height / 2;
        const loginPopup = window.open(url, windowName, `toolbar=0,location=0,menubar=0,width=${width},height=${height},left=${left},top=${top}`);
        if (!loginPopup) {
            const getUserAction = onLoggedOut !== null && onLoggedOut !== void 0 ? onLoggedOut : loginPrompt_1.openLoginPrompt;
            const doLogin = yield getUserAction();
            return doLogin
                ? window.open(url, windowName, `toolbar=0,location=0,menubar=0,width=${width},height=${height},left=${left},top=${top}`)
                : null;
        }
        return loginPopup;
    });
}


/***/ },

/***/ 6725
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refreshTokensForSasjs = refreshTokensForSasjs;
const error_1 = __webpack_require__(6340);
const getTokenRequestErrorPrefix_1 = __webpack_require__(1087);
const types_1 = __webpack_require__(3631);
const apiBasePath_1 = __webpack_require__(6838);
/**
 * Exchanges the refresh token for an access token for the given client.
 * @param requestClient - the pre-configured HTTP request client
 * @param refreshToken - the refresh token received from the server.
 * @param apiBasePath - the path the API is mounted at, default `/SASjsApi`.
 */
function refreshTokensForSasjs(requestClient_1, refreshToken_1) {
    return __awaiter(this, arguments, void 0, function* (requestClient, refreshToken, apiBasePath = apiBasePath_1.DEFAULT_API_BASE_PATH) {
        const url = `${(0, apiBasePath_1.apiBasePrefix)(apiBasePath)}/auth/refresh`;
        const headers = {
            Authorization: 'Bearer ' + refreshToken
        };
        const authResponse = yield requestClient
            .post(url, undefined, undefined, undefined, headers)
            .then((res) => {
            const sasAuth = res.result;
            return {
                access_token: sasAuth.accessToken,
                refresh_token: sasAuth.refreshToken
            };
        })
            .catch((err) => {
            throw (0, error_1.prefixMessage)(err, (0, getTokenRequestErrorPrefix_1.getTokenRequestErrorPrefix)('refreshing tokens', 'refreshTokensForSasjs', types_1.ServerType.Sasjs, url));
        });
        return authResponse;
    });
}


/***/ },

/***/ 5747
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refreshTokensForViya = refreshTokensForViya;
const types_1 = __webpack_require__(3631);
const error_1 = __webpack_require__(6340);
const form_data_1 = __importDefault(__webpack_require__(1894));
const utils_1 = __webpack_require__(9266);
const getTokenRequestErrorPrefix_1 = __webpack_require__(1087);
/**
 * Exchanges the refresh token for an access token for the given client.
 * This function can only be used by Node.
 * @param requestClient - the pre-configured HTTP request client
 * @param clientId - the client ID to authenticate with.
 * @param clientSecret - the client secret to authenticate with.
 * @param refreshToken - the refresh token received from the server.
 */
function refreshTokensForViya(requestClient, clientId, clientSecret, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.isNode)()) {
            throw new Error(`Method 'refreshTokensForViya' can only be used by Node.`);
        }
        const url = '/SASLogon/oauth/token';
        const token = typeof Buffer === 'undefined'
            ? btoa(clientId + ':' + clientSecret)
            : Buffer.from(clientId + ':' + clientSecret).toString('base64');
        const headers = {
            Authorization: 'Basic ' + token
        };
        const formData = new form_data_1.default();
        formData.append('grant_type', 'refresh_token');
        formData.append('refresh_token', refreshToken);
        const authResponse = yield requestClient
            .post(url, formData, undefined, 'multipart/form-data; boundary=' + formData._boundary, headers)
            .then((res) => res.result)
            .catch((err) => {
            throw (0, error_1.prefixMessage)(err, (0, getTokenRequestErrorPrefix_1.getTokenRequestErrorPrefix)('refreshing tokens', 'refreshTokensForViya', types_1.ServerType.SasViya, url, formData, headers, clientId, clientSecret));
        });
        return authResponse;
    });
}


/***/ },

/***/ 4257
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifySas9Login = verifySas9Login;
const utils_1 = __webpack_require__(9266);
const _1 = __webpack_require__(4879);
function verifySas9Login(loginPopup) {
    return __awaiter(this, void 0, void 0, function* () {
        let isLoggedIn = false;
        let startTime = new Date();
        let elapsedSeconds = 0;
        do {
            yield (0, utils_1.delay)(1000);
            if (loginPopup.closed)
                break;
            isLoggedIn =
                loginPopup.window.location.href.includes('SASLogon') &&
                    loginPopup.window.document.body.innerText.includes((0, _1.getExpectedLogInSuccessHeader)());
            elapsedSeconds = (new Date().valueOf() - startTime.valueOf()) / 1000;
        } while (!isLoggedIn && elapsedSeconds < 5 * 60);
        return { isLoggedIn };
    });
}


/***/ },

/***/ 5009
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isLoggedInSASVIYA = void 0;
exports.verifySasViyaLogin = verifySasViyaLogin;
const utils_1 = __webpack_require__(9266);
const _1 = __webpack_require__(4879);
function verifySasViyaLogin(loginPopup) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let isLoggedIn = false;
        let startTime = new Date();
        let elapsedSeconds = 0;
        do {
            yield (0, utils_1.delay)(1000);
            if (loginPopup.closed)
                break;
            isLoggedIn = (0, exports.isLoggedInSASVIYA)();
            elapsedSeconds = (new Date().valueOf() - startTime.valueOf()) / 1000;
        } while (!isLoggedIn && elapsedSeconds < 5 * 60);
        let isAuthorized = false;
        startTime = new Date();
        do {
            yield (0, utils_1.delay)(1000);
            if (loginPopup.closed)
                break;
            isAuthorized =
                loginPopup.window.location.href.includes('SASLogon') ||
                    ((_b = (_a = loginPopup.window.document.body) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.includes((0, _1.getExpectedLogInSuccessHeader)()));
            elapsedSeconds = (new Date().valueOf() - startTime.valueOf()) / 1000;
        } while (!isAuthorized && elapsedSeconds < 5 * 60);
        return { isLoggedIn: isLoggedIn && isAuthorized };
    });
}
const isLoggedInSASVIYA = () => document.cookie.includes('Current-User') && document.cookie.includes('userId');
exports.isLoggedInSASVIYA = isLoggedInSASVIYA;


/***/ },

/***/ 7673
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.generateFileUploadForm = void 0;
const convertToCsv_1 = __webpack_require__(4786);
const utils_1 = __webpack_require__(9266);
/**
 * One of the approaches SASjs takes to send tables-formatted JSON (see README)
 * to SAS is as multipart form data, where each table is provided as a specially
 * formatted CSV file.
 * @param formData Different objects are used depending on whether the adapter is
 *  running in the browser, or in the CLI
 * @param data Special, tables-formatted JSON (see README)
 * @returns Populated formData
 */
const generateFileUploadForm = (formData, data) => {
    for (const tableName in data) {
        if (!Array.isArray(data[tableName]))
            continue;
        const name = tableName;
        const csv = (0, convertToCsv_1.convertToCSV)(data, tableName);
        if (csv === 'ERROR: LARGE STRING LENGTH') {
            throw new Error('The max length of a string value in SASjs is 32765 characters.');
        }
        // INFO: unfortunately it is not possible to check if formData is instance of NodeFormData or FormData because it will return true for both
        if ((0, utils_1.isNode)()) {
            // INFO: environment is Node and formData is instance of NodeFormData
            ;
            formData.append(name, csv, {
                filename: `${name}.csv`,
                contentType: 'application/csv'
            });
        }
        else {
            // INFO: environment is Browser and formData is instance of FormData
            const file = new Blob([csv], {
                type: 'application/csv'
            });
            formData.append(name, file, `${name}.csv`);
        }
    }
    return formData;
};
exports.generateFileUploadForm = generateFileUploadForm;


/***/ },

/***/ 93
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.generateTableUploadForm = void 0;
const convertToCsv_1 = __webpack_require__(4786);
const splitChunks_1 = __webpack_require__(8720);
const generateTableUploadForm = (formData, data) => {
    const sasjsTables = [];
    const requestParams = {};
    let tableCounter = 0;
    for (const tableName in data) {
        if ((0, convertToCsv_1.isFormatsTable)(tableName) &&
            Object.keys(data).includes(tableName.replace(/^\$/, ''))) {
            continue;
        }
        tableCounter++;
        // Formats table should not be sent as part of 'sasjs_tables'
        if (!(0, convertToCsv_1.isFormatsTable)(tableName))
            sasjsTables.push(tableName);
        const csv = (0, convertToCsv_1.convertToCSV)(data, tableName);
        if (csv === 'ERROR: LARGE STRING LENGTH') {
            throw new Error('The max length of a string value in SASjs is 32765 characters.');
        }
        // if csv has length more then 16k, send in chunks
        if (csv.length > 16000) {
            const csvChunks = (0, splitChunks_1.splitChunks)(csv);
            // append chunks to form data with same key
            csvChunks.map((chunk) => {
                formData.append(`sasjs${tableCounter}data`, chunk);
            });
        }
        else {
            requestParams[`sasjs${tableCounter}data`] = csv;
        }
    }
    requestParams['sasjs_tables'] = sasjsTables.join(' ');
    return { formData, requestParams };
};
exports.generateTableUploadForm = generateTableUploadForm;


/***/ },

/***/ 8156
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const SASjs_1 = __importDefault(__webpack_require__(9810));
__exportStar(__webpack_require__(3574), exports);
__exportStar(__webpack_require__(7388), exports);
__exportStar(__webpack_require__(2015), exports);
__exportStar(__webpack_require__(2831), exports);
__exportStar(__webpack_require__(5803), exports);
__exportStar(__webpack_require__(7560), exports);
exports["default"] = SASjs_1.default;


/***/ },

/***/ 4126
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputeJobExecutor = void 0;
const types_1 = __webpack_require__(3631);
const errors_1 = __webpack_require__(7388);
const JobExecutor_1 = __webpack_require__(1101);
class ComputeJobExecutor extends JobExecutor_1.BaseJobExecutor {
    constructor(serverUrl, sasViyaApiClient) {
        super(serverUrl, types_1.ServerType.SasViya);
        this.sasViyaApiClient = sasViyaApiClient;
    }
    execute(sasJob, data, config, loginRequiredCallback, authConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginCallback = loginRequiredCallback || (() => Promise.resolve());
            const waitForResult = true;
            const expectWebout = true;
            const requestPromise = new Promise((resolve, reject) => {
                var _a;
                (_a = this.sasViyaApiClient) === null || _a === void 0 ? void 0 : _a.executeComputeJob(sasJob, config.contextName, config.debug, data, authConfig, waitForResult, expectWebout).then((response) => {
                    this.sasViyaApiClient.appendRequest(response, sasJob, config.debug);
                    resolve(response.result);
                }).catch((e) => __awaiter(this, void 0, void 0, function* () {
                    if (e instanceof errors_1.ComputeJobExecutionError) {
                        this.sasViyaApiClient.appendRequest(e, sasJob, config.debug);
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                    if (e instanceof errors_1.LoginRequiredError) {
                        this.appendWaitingRequest(() => {
                            return this.execute(sasJob, data, config, loginRequiredCallback).then((res) => {
                                resolve(res);
                            }, (err) => {
                                reject(err);
                            });
                        });
                        yield loginCallback();
                    }
                    else {
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                }));
            });
            return requestPromise;
        });
    }
}
exports.ComputeJobExecutor = ComputeJobExecutor;


/***/ },

/***/ 3871
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileUploader = void 0;
const utils_1 = __webpack_require__(9266);
const errors_1 = __webpack_require__(7388);
const types_1 = __webpack_require__(3631);
const JobExecutor_1 = __webpack_require__(1101);
class FileUploader extends JobExecutor_1.BaseJobExecutor {
    constructor(serverUrl, serverType, jobsPath, requestClient) {
        super(serverUrl, serverType);
        this.jobsPath = jobsPath;
        this.requestClient = requestClient;
    }
    execute(sasJob, data, config, loginRequiredCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const { files, params } = data;
            const loginCallback = loginRequiredCallback || (() => Promise.resolve());
            if (!(files === null || files === void 0 ? void 0 : files.length))
                throw new errors_1.ErrorResponse('At least one file must be provided.');
            if (!sasJob || sasJob === '')
                throw new errors_1.ErrorResponse('sasJob must be provided.');
            let paramsString = '';
            for (let param in params)
                if (params.hasOwnProperty(param))
                    paramsString += `&${param}=${params[param]}`;
            const program = config.appLoc
                ? config.appLoc.replace(/\/?$/, '/') + sasJob.replace(/^\//, '')
                : sasJob;
            const uploadUrl = `${this.jobsPath}/?${'_program=' + program}${paramsString}`;
            const formData = new FormData();
            for (let file of files) {
                formData.append('file', file.file, file.fileName);
            }
            const csrfToken = this.requestClient.getCsrfToken('file');
            if (csrfToken)
                formData.append('_csrf', csrfToken.value);
            if (config.debug)
                formData.append('_debug', '131');
            if (config.serverType === types_1.ServerType.SasViya && config.contextName)
                formData.append('_contextname', config.contextName);
            const headers = {
                'cache-control': 'no-cache',
                Accept: '*/*',
                'Content-Type': 'text/plain'
            };
            // currently only web approach is supported for file upload
            // therefore log is part of response with debug enabled and must be parsed
            const requestPromise = new Promise((resolve, reject) => {
                this.requestClient
                    .post(uploadUrl, formData, undefined, 'application/json', headers)
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    this.requestClient.appendRequest(res, sasJob, config.debug);
                    let jsonResponse = res.result;
                    if (config.debug) {
                        switch (this.serverType) {
                            case types_1.ServerType.SasViya:
                                jsonResponse = yield (0, utils_1.parseSasViyaDebugResponse)(res.result, this.requestClient, config.serverUrl);
                                break;
                            case types_1.ServerType.Sas9:
                                jsonResponse =
                                    typeof res.result === 'string'
                                        ? (0, utils_1.parseWeboutResponse)(res.result, uploadUrl)
                                        : res.result;
                                break;
                            case types_1.ServerType.Sasjs:
                                jsonResponse =
                                    typeof res.result === 'string'
                                        ? (0, utils_1.getValidJson)(res.result)
                                        : res.result;
                                break;
                        }
                    }
                    else {
                        jsonResponse =
                            typeof res.result === 'string'
                                ? (0, utils_1.getValidJson)(res.result)
                                : res.result;
                    }
                    resolve(jsonResponse);
                }))
                    .catch((e) => __awaiter(this, void 0, void 0, function* () {
                    if (e instanceof errors_1.JobExecutionError) {
                        this.requestClient.appendRequest(e, sasJob, config.debug);
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                    if (e instanceof errors_1.LoginRequiredError) {
                        this.appendWaitingRequest(() => {
                            return this.execute(sasJob, data, config, loginRequiredCallback).then((res) => {
                                resolve(res);
                            }, (err) => {
                                reject(err);
                            });
                        });
                        yield loginCallback();
                    }
                    else {
                        reject(new errors_1.ErrorResponse('File upload request failed.', e));
                    }
                }));
            });
            return requestPromise;
        });
    }
}
exports.FileUploader = FileUploader;


/***/ },

/***/ 1131
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JesJobExecutor = void 0;
const types_1 = __webpack_require__(3631);
const errors_1 = __webpack_require__(7388);
const JobExecutor_1 = __webpack_require__(1101);
const utils_1 = __webpack_require__(9266);
class JesJobExecutor extends JobExecutor_1.BaseJobExecutor {
    constructor(serverUrl, sasViyaApiClient) {
        super(serverUrl, types_1.ServerType.SasViya);
        this.sasViyaApiClient = sasViyaApiClient;
    }
    execute(sasJob_1, data_1, config_1, loginRequiredCallback_1, authConfig_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes = []) {
            const loginCallback = loginRequiredCallback || (() => Promise.resolve());
            const requestPromise = new Promise((resolve, reject) => {
                var _a;
                (_a = this.sasViyaApiClient) === null || _a === void 0 ? void 0 : _a.executeJob(sasJob, config.contextName, config.debug, data, authConfig).then((response) => {
                    this.sasViyaApiClient.appendRequest(response, sasJob, config.debug);
                    const responseObject = (0, utils_1.appendExtraResponseAttributes)(response, extraResponseAttributes);
                    resolve(responseObject);
                }).catch((e) => __awaiter(this, void 0, void 0, function* () {
                    if (e instanceof errors_1.JobExecutionError) {
                        this.sasViyaApiClient.appendRequest(e, sasJob, config.debug);
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                    if (e instanceof errors_1.LoginRequiredError) {
                        this.appendWaitingRequest(() => {
                            return this.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes).then((res) => {
                                resolve(res);
                            }, (err) => {
                                reject(err);
                            });
                        });
                        yield loginCallback();
                    }
                    else {
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                }));
            });
            return requestPromise;
        });
    }
}
exports.JesJobExecutor = JesJobExecutor;


/***/ },

/***/ 1101
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseJobExecutor = void 0;
const utils_1 = __webpack_require__(9266);
class BaseJobExecutor {
    constructor(serverUrl, serverType) {
        this.serverUrl = serverUrl;
        this.serverType = serverType;
        this.waitingRequests = [];
        this.resendWaitingRequests = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, utils_1.asyncForEach)(this.waitingRequests, (waitingRequest) => __awaiter(this, void 0, void 0, function* () {
                yield waitingRequest();
            }));
            this.waitingRequests = [];
            return;
        });
    }
    appendWaitingRequest(request) {
        this.waitingRequests.push(request);
    }
    getRequestParams(config) {
        const requestParams = {};
        if (config.debug) {
            requestParams['_omittextlog'] = 'false';
            requestParams['_omitSessionResults'] = 'false';
            requestParams['_debug'] = 131;
        }
        return requestParams;
    }
}
exports.BaseJobExecutor = BaseJobExecutor;


/***/ },

/***/ 4941
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sas9JobExecutor = void 0;
const form_data_1 = __importDefault(__webpack_require__(1894));
const errors_1 = __webpack_require__(7388);
const utils_1 = __webpack_require__(9266);
const JobExecutor_1 = __webpack_require__(1101);
const Sas9RequestClient_1 = __webpack_require__(576);
/**
 * Job executor for SAS9 servers for use in Node.js environments.
 * Initiates login with the provided username and password from the config
 * The cookies are stored in the request client and used in subsequent
 * job execution requests.
 *
 * The username and password are deprecated with the SAS 9 username / password
 * login: they are appended to the `_program` query string, which SAS 9 only
 * accepts when the platform is configured to allow URL credentials. See the
 * "SAS 9 credentials" note in the README.
 */
class Sas9JobExecutor extends JobExecutor_1.BaseJobExecutor {
    constructor(serverUrl, serverType, jobsPath, requestClient, httpsAgentOptions) {
        super(serverUrl, serverType);
        this.jobsPath = jobsPath;
        this.requestClient = requestClient;
        this.sas9RequestClient = new Sas9RequestClient_1.Sas9RequestClient(serverUrl, httpsAgentOptions);
    }
    execute(sasJob, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = (0, utils_1.isRelativePath)(sasJob)
                ? config.appLoc
                    ? config.appLoc.replace(/\/?$/, '/') + sasJob.replace(/^\//, '')
                    : sasJob
                : sasJob;
            let apiUrl = `${config.serverUrl}${this.jobsPath}?${'_program=' + program}`;
            apiUrl = `${apiUrl}${config.username && config.password
                ? '&_username=' + config.username + '&_password=' + config.password
                : ''}`;
            apiUrl = `${apiUrl}${config.debug ? '&_debug=131' : ''}`;
            let requestParams = Object.assign({}, this.getRequestParams(config));
            let formData = new form_data_1.default();
            if (data) {
                try {
                    formData = generateFileUploadForm(formData, data);
                }
                catch (e) {
                    return Promise.reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                }
            }
            else {
                data = '';
            }
            for (const key in requestParams) {
                if (requestParams.hasOwnProperty(key)) {
                    formData.append(key, requestParams[key]);
                }
            }
            yield this.sas9RequestClient.login(config.username, config.password, this.jobsPath);
            const contentType = data && Object.keys(data).length
                ? 'multipart/form-data; boundary=' + formData._boundary
                : 'text/plain';
            const requestPromise = new Promise((resolve, reject) => this.sas9RequestClient.post(apiUrl, formData, undefined, contentType, {
                Accept: '*/*',
                Connection: 'Keep-Alive'
            })
                .then((res) => {
                // appending response to requests array that will be used for requests history reference
                this.requestClient.appendRequest(res, sasJob, config.debug);
                resolve(res);
            })
                .catch((err) => {
                // by default error string is equal to actual error object
                let errString = err;
                // if error object contains non empty result attribute, set result to errString
                if (err.result && err.result !== '')
                    errString = err.result;
                // if there's no result but error message, set error message to errString
                else if (err.message)
                    errString = err.message;
                // appending error to requests array that will be used for requests history reference
                this.requestClient.appendRequest(errString, sasJob, config.debug);
                reject(new errors_1.ErrorResponse(err === null || err === void 0 ? void 0 : err.message, err));
            }));
            return requestPromise;
        });
    }
    getRequestParams(config) {
        const requestParams = {};
        if (config.debug) {
            requestParams['_debug'] = 131;
        }
        return requestParams;
    }
}
exports.Sas9JobExecutor = Sas9JobExecutor;
const generateFileUploadForm = (formData, data) => {
    for (const tableName in data) {
        const name = tableName;
        const csv = (0, utils_1.convertToCSV)(data, tableName);
        if (csv === 'ERROR: LARGE STRING LENGTH') {
            throw new Error('The max length of a string value in SASjs is 32765 characters.');
        }
        formData.append(name, csv, {
            filename: `${name}.csv`,
            contentType: 'application/csv'
        });
    }
    return formData;
};


/***/ },

/***/ 8995
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SasjsJobExecutor = void 0;
const form_data_1 = __importDefault(__webpack_require__(1894));
const types_1 = __webpack_require__(3631);
const errors_1 = __webpack_require__(7388);
const generateFileUploadForm_1 = __webpack_require__(7673);
const utils_1 = __webpack_require__(9266);
const utils_2 = __webpack_require__(9266);
const JobExecutor_1 = __webpack_require__(1101);
class SasjsJobExecutor extends JobExecutor_1.BaseJobExecutor {
    constructor(serverUrl, jobsPath, requestClient) {
        super(serverUrl, types_1.ServerType.Sasjs);
        this.jobsPath = jobsPath;
        this.requestClient = requestClient;
    }
    execute(sasJob_1, data_1, config_1, loginRequiredCallback_1, authConfig_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes = []) {
            const loginCallback = loginRequiredCallback;
            const program = (0, utils_2.isRelativePath)(sasJob) && config.appLoc
                ? config.appLoc.replace(/\/?$/, '/') + sasJob.replace(/^\//, '')
                : sasJob;
            let apiUrl = `${config.serverUrl}${this.jobsPath}/?${'_program=' + program}`;
            let requestParams = Object.assign({}, this.getRequestParams(config));
            /**
             * Use the available form data object (FormData in Browser, NodeFormData in
             *  Node)
             */
            let formData = (0, utils_1.getFormData)();
            if (data) {
                // file upload approach
                try {
                    formData = (0, generateFileUploadForm_1.generateFileUploadForm)(formData, data);
                }
                catch (e) {
                    return Promise.reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                }
            }
            for (const key in requestParams) {
                if (requestParams.hasOwnProperty(key)) {
                    formData.append(key, requestParams[key]);
                }
            }
            /* The NodeFormData object does not set the request header - so, set it */
            const contentType = formData instanceof form_data_1.default && typeof FormData === 'undefined'
                ? `multipart/form-data; boundary=${formData.getHeaders()['content-type']}`
                : 'multipart/form-data';
            const requestPromise = new Promise((resolve, reject) => {
                this.requestClient.post(apiUrl, formData, authConfig === null || authConfig === void 0 ? void 0 : authConfig.access_token, contentType)
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (Object.entries(res.result).length < 1) {
                        throw new errors_1.JobExecutionError(0, `No webout was returned by job ${program}.  Please check the SAS log for more info.`, res.log);
                    }
                    const { result } = res;
                    if (result && typeof result === 'string' && result.trim())
                        res.result = (0, utils_2.getValidJson)(result);
                    this.requestClient.appendRequest(res, sasJob, config.debug);
                    const responseObject = (0, utils_2.appendExtraResponseAttributes)(res, extraResponseAttributes);
                    resolve(responseObject);
                }))
                    .catch((e) => __awaiter(this, void 0, void 0, function* () {
                    if (e instanceof errors_1.JobExecutionError) {
                        this.requestClient.appendRequest(e, sasJob, config.debug);
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                    if (e instanceof errors_1.LoginRequiredError) {
                        if (!loginRequiredCallback) {
                            reject(new errors_1.ErrorResponse('Request is not authenticated. Make sure .env file exists with valid credentials.', e));
                        }
                        this.appendWaitingRequest(() => {
                            return this.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes).then((res) => {
                                resolve(res);
                            }, (err) => {
                                reject(err);
                            });
                        });
                        if (loginCallback)
                            yield loginCallback();
                    }
                    else
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                }));
            });
            return requestPromise;
        });
    }
}
exports.SasjsJobExecutor = SasjsJobExecutor;


/***/ },

/***/ 8067
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebJobExecutor = void 0;
const form_data_1 = __importDefault(__webpack_require__(1894));
const types_1 = __webpack_require__(3631);
const errors_1 = __webpack_require__(7388);
const generateFileUploadForm_1 = __webpack_require__(7673);
const generateTableUploadForm_1 = __webpack_require__(93);
const utils_1 = __webpack_require__(9266);
const JobExecutor_1 = __webpack_require__(1101);
class WebJobExecutor extends JobExecutor_1.BaseJobExecutor {
    constructor(serverUrl, serverType, jobsPath, requestClient, sasViyaApiClient) {
        super(serverUrl, serverType);
        this.jobsPath = jobsPath;
        this.requestClient = requestClient;
        this.sasViyaApiClient = sasViyaApiClient;
    }
    execute(sasJob_1, data_1, config_1, loginRequiredCallback_1, authConfig_1) {
        return __awaiter(this, arguments, void 0, function* (sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes = []) {
            var _a;
            const loginCallback = loginRequiredCallback;
            const program = (0, utils_1.isRelativePath)(sasJob)
                ? config.appLoc
                    ? config.appLoc.replace(/\/?$/, '/') + sasJob.replace(/^\//, '')
                    : sasJob
                : sasJob;
            let apiUrl = `${config.serverUrl}${this.jobsPath}/?${'_program=' + program}`;
            if (config.serverType === types_1.ServerType.SasViya) {
                let jobUri;
                try {
                    jobUri = yield this.getJobUri(program);
                }
                catch (e) {
                    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        if (e instanceof errors_1.LoginRequiredError) {
                            this.appendWaitingRequest(() => {
                                return this.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes).then((res) => {
                                    resolve(res);
                                }, (err) => {
                                    reject(err);
                                });
                            });
                            if (loginCallback)
                                yield loginCallback();
                        }
                        else {
                            reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                        }
                    }));
                }
                if (jobUri.length > 0) {
                    apiUrl += '&_job=' + jobUri;
                    /**
                     * Using both _job and _program parameters will cause a conflict in the JES web app, as it's not clear whether or not the server should make the extra fetch for the job uri.
                     * To handle this, we add the extra underscore and recreate the _program variable in the SAS side of the SASjs adapter so it remains available for backend developers.
                     */
                    apiUrl = apiUrl.replace('_program=', '__program=');
                }
                // Append context name to URL if provided and non-empty
                apiUrl += ((_a = config.contextName) === null || _a === void 0 ? void 0 : _a.trim())
                    ? `&_contextname=${encodeURIComponent(config.contextName)}`
                    : '';
                if (config.runAsTask === true) {
                    apiUrl += '&_executionTasks=true';
                }
            }
            let requestParams = Object.assign({}, this.getRequestParams(config));
            /**
             * Use the available form data object (FormData in Browser, NodeFormData in
             *  Node)
             */
            let formData = (0, utils_1.getFormData)();
            // FIXME(viya - SAS Track CS0409737): remove when Viya stops rejecting empty multipart on
            // _executionTasks=true. Dummy file keeps the body non-empty
            const hasExecutionTasksFlag = config.runAsTask === true;
            // Move debug params to URL for viya; viya seems to honor them more
            // reliably in the query string than the multipart body.
            if (hasExecutionTasksFlag &&
                config.debug &&
                config.serverType === types_1.ServerType.SasViya) {
                const debugKeys = ['_debug', '_omitSessionResults'];
                debugKeys.forEach((key) => {
                    if (requestParams[key] !== undefined) {
                        apiUrl += `&${key}=${encodeURIComponent(requestParams[key])}`;
                        delete requestParams[key];
                    }
                });
            }
            if (data) {
                const stringifiedData = JSON.stringify(data);
                if (config.serverType === types_1.ServerType.Sas9 ||
                    stringifiedData.length > 500000 ||
                    stringifiedData.includes(';')) {
                    // file upload approach
                    try {
                        formData = (0, generateFileUploadForm_1.generateFileUploadForm)(formData, data);
                    }
                    catch (e) {
                        return Promise.reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                }
                else {
                    // param based approach
                    try {
                        const { formData: newFormData, requestParams: params } = (0, generateTableUploadForm_1.generateTableUploadForm)(formData, data);
                        formData = newFormData;
                        requestParams = Object.assign(Object.assign({}, requestParams), params);
                        if (config.serverType === types_1.ServerType.SasViya &&
                            hasExecutionTasksFlag) {
                            addDummyFile(formData);
                        }
                    }
                    catch (e) {
                        return Promise.reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                }
            }
            else {
                if (config.serverType === types_1.ServerType.SasViya && hasExecutionTasksFlag) {
                    addDummyFile(formData);
                }
            }
            for (const key in requestParams) {
                if (requestParams.hasOwnProperty(key)) {
                    formData.append(key, requestParams[key]);
                }
            }
            /* The NodeFormData object does not set the request header - so, set it */
            const contentType = formData instanceof form_data_1.default && typeof FormData === 'undefined'
                ? `multipart/form-data; boundary=${formData.getHeaders()['content-type']}`
                : 'multipart/form-data';
            const requestPromise = new Promise((resolve, reject) => {
                this.requestClient.post(apiUrl, formData, authConfig === null || authConfig === void 0 ? void 0 : authConfig.access_token, contentType)
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    this.requestClient.appendRequest(res, sasJob, config.debug);
                    let jsonResponse = res.result;
                    if (config.debug) {
                        switch (this.serverType) {
                            case types_1.ServerType.SasViya:
                                // Route on the shape of the response itself. The JES web app
                                // returns the webout inline in a script-constructed Blob when
                                // it runs the job as a compute task, and as an iframe file URL
                                // otherwise - but the _debug value sent does not determine
                                // which: a _debug=128 request without _EXECUTIONTASKS gets the
                                // iframe form back. A result that is already an object has
                                // been parsed upstream, and parseSasViyaDebugResponse also
                                // falls back to blob extraction, so either parser copes with
                                // a response that mixes the two.
                                jsonResponse =
                                    typeof res.result !== 'string' || (0, utils_1.hasWeboutBlob)(res.result)
                                        ? yield (0, utils_1.parseSasViyaLogDebugResponse)(res.result)
                                        : yield (0, utils_1.parseSasViyaDebugResponse)(res.result, this.requestClient, this.serverUrl);
                                break;
                            case types_1.ServerType.Sas9:
                                jsonResponse =
                                    typeof res.result === 'string'
                                        ? (0, utils_1.parseWeboutResponse)(res.result, apiUrl)
                                        : res.result;
                                break;
                        }
                    }
                    const responseObject = (0, utils_1.appendExtraResponseAttributes)({ result: jsonResponse, log: res.log }, extraResponseAttributes);
                    resolve(responseObject);
                }))
                    .catch((e) => __awaiter(this, void 0, void 0, function* () {
                    if (e instanceof errors_1.JobExecutionError) {
                        this.requestClient.appendRequest(e, sasJob, config.debug);
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                    }
                    if (e instanceof errors_1.LoginRequiredError) {
                        if (!loginRequiredCallback) {
                            reject(new errors_1.ErrorResponse('Request is not authenticated. Make sure .env file exists with valid credentials.', e));
                        }
                        this.appendWaitingRequest(() => {
                            return this.execute(sasJob, data, config, loginRequiredCallback, authConfig, extraResponseAttributes).then((res) => {
                                resolve(res);
                            }, (err) => {
                                reject(err);
                            });
                        });
                        if (loginCallback)
                            yield loginCallback();
                    }
                    else
                        reject(new errors_1.ErrorResponse(e === null || e === void 0 ? void 0 : e.message, e));
                }));
            });
            return requestPromise;
        });
    }
    getRequestParams(config) {
        const requestParams = super.getRequestParams(config);
        // FIXME(viya - possible issue with default debug flags)
        // runAsTask on Viya: use _debug=128 (not 131) and omit _omittextlog
        if (config.debug &&
            config.serverType === types_1.ServerType.SasViya &&
            config.runAsTask === true) {
            requestParams['_debug'] = 128;
            delete requestParams['_omittextlog'];
        }
        return requestParams;
    }
    getJobUri(sasJob) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sasViyaApiClient)
                return '';
            let uri = '';
            // sasJob arrives with the appLoc already applied, so the folder is
            // everything before the last segment. Reading the first two segments only
            // would look up folder 'services' and job 'common' for a job like
            // services/common/configure.
            const folderPathParts = sasJob.split('/');
            const jobName = folderPathParts.pop() || '';
            const folderPath = folderPathParts.join('/');
            if (!jobName) {
                throw new Error('Job name is empty, null or undefined.');
            }
            const locJobs = yield this.sasViyaApiClient.getJobsInFolder(folderPath);
            if (locJobs) {
                const job = locJobs.find((el) => el.name === jobName && el.contentType === 'jobDefinition');
                if (job) {
                    uri = job.uri;
                }
            }
            return uri;
        });
    }
}
exports.WebJobExecutor = WebJobExecutor;
function addDummyFile(formData) {
    if ((0, utils_1.isNode)()) {
        ;
        formData.append('_sasjs_noop', '', {
            filename: '_sasjs_noop.txt',
            contentType: 'text/plain'
        });
    }
    else {
        ;
        formData.append('_sasjs_noop', new Blob([''], { type: 'text/plain' }), '_sasjs_noop.txt');
    }
}


/***/ },

/***/ 1391
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4126), exports);
__exportStar(__webpack_require__(3871), exports);
__exportStar(__webpack_require__(1131), exports);
__exportStar(__webpack_require__(1101), exports);
__exportStar(__webpack_require__(4941), exports);
__exportStar(__webpack_require__(8067), exports);
__exportStar(__webpack_require__(8995), exports);


/***/ },

/***/ 8816
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwIfError = exports.RequestClient = void 0;
const auth_1 = __webpack_require__(4879);
const errors_1 = __webpack_require__(7388);
const parseWeboutResponse_1 = __webpack_require__(7640);
const error_1 = __webpack_require__(6340);
const SAS9AuthError_1 = __webpack_require__(2079);
const utils_1 = __webpack_require__(9266);
const InvalidSASjsCsrfError_1 = __webpack_require__(4001);
const host_1 = __webpack_require__(5334);
const isNode_1 = __webpack_require__(6308);
class RequestClient {
    constructor(baseUrl, httpsAgentOptions, requestsLimit, verboseMode) {
        this.baseUrl = baseUrl;
        this.requests = [];
        this.requestsLimit = 10;
        this.verboseMode = false;
        this.csrfToken = { headerName: '', value: '' };
        this.isRecoveringFromNetworkError = false;
        /**
         * this method returns all requests, an array of SASjsRequest type
         * @returns SASjsRequest[]
         */
        this.getRequests = () => this.requests;
        /**
         * this method clears the requests array, i.e set to empty
         */
        this.clearRequests = () => {
            this.requests = [];
        };
        this.authorize = (response) => __awaiter(this, void 0, void 0, function* () {
            let authUrl = null;
            const params = {};
            const responseBody = response.split('<body>')[1].split('</body>')[0];
            const bodyElement = document.createElement('div');
            bodyElement.innerHTML = responseBody;
            const form = bodyElement.querySelector('#application_authorization');
            authUrl = form ? this.baseUrl + form.getAttribute('action') : null;
            const inputs = form === null || form === void 0 ? void 0 : form.querySelectorAll('input');
            for (const input of inputs) {
                if (input.name === 'user_oauth_approval') {
                    input.value = 'true';
                }
                params[input.name] = input.value;
            }
            const csrfTokenKey = Object.keys(params).find((k) => k === null || k === void 0 ? void 0 : k.toLowerCase().includes('csrf'));
            if (csrfTokenKey) {
                this.csrfToken.value = params[csrfTokenKey];
                this.csrfToken.headerName = this.csrfToken.headerName || 'x-csrf-token';
            }
            const formData = new FormData();
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    formData.append(key, params[key]);
                }
            }
            if (!authUrl) {
                throw new Error('Auth Form URL is null or undefined.');
            }
            return yield this.httpClient
                .post(authUrl, formData, {
                responseType: 'text',
                headers: { Accept: '*/*', 'Content-Type': 'text/plain' }
            })
                .then((res) => res.data)
                .catch((error) => {
                const logger = (0, host_1.getLogger)();
                logger.error(error);
            });
        });
        /**
         * Adds colors to the string.
         * If verboseMode is set to 'bleached', colors should be disabled
         * @param str - string to be prettified.
         * @returns - prettified string
         */
        this.prettifyString = (str) => (0, host_1.inspectValue)(str, this.verboseMode !== 'bleached');
        /**
         * Formats HTTP request/response body.
         * @param body - HTTP request/response body.
         * @returns - formatted string.
         */
        this.parseInterceptedBody = (body) => {
            if (!body)
                return '';
            let parsedBody;
            // Tries to parse body into JSON object.
            if (typeof body === 'string') {
                try {
                    parsedBody = JSON.parse(body);
                }
                catch (error) {
                    parsedBody = body;
                }
            }
            else {
                parsedBody = body;
            }
            const bodyLines = this.prettifyString(parsedBody).split('\n');
            // Leaves first 50 lines
            if (bodyLines.length > 51) {
                bodyLines.splice(50);
                bodyLines.push('...');
            }
            return bodyLines.join('\n');
        };
        this.handleAxiosResponse = (response) => {
            var _a, _b, _c;
            const { status, config, request, data } = response;
            const reqHeaders = (_a = request === null || request === void 0 ? void 0 : request._header) !== null && _a !== void 0 ? _a : 'Not provided\n';
            const rawHeaders = (_c = (_b = request === null || request === void 0 ? void 0 : request.res) === null || _b === void 0 ? void 0 : _b.rawHeaders) !== null && _c !== void 0 ? _c : ['Not provided'];
            const resHeaders = this.formatHeaders(rawHeaders);
            const parsedResBody = this.parseInterceptedBody(data);
            (0, host_1.getLogger)().info(`HTTP Request (first 50 lines):
${reqHeaders}${this.parseInterceptedBody(config.data)}

HTTP Response Code: ${this.prettifyString(status)}

HTTP Response (first 50 lines):
${resHeaders}${parsedResBody ? `\n\n${parsedResBody}` : ''}
`);
            return response;
        };
        this.handleAxiosError = (error) => {
            var _a, _b, _c, _d, _e;
            // Message indicating absent value.
            const noValueMessage = 'Not provided';
            const { response, request, config } = error;
            // Fallback request object that can be safely used to form request summary.
            // _header is not present in responses with status 1**
            // rawHeaders are not present in responses with status 1**
            let fallbackRequest = {
                _header: `${noValueMessage}\n`,
                res: { rawHeaders: [noValueMessage] }
            };
            if (request) {
                fallbackRequest = {
                    _header: (_c = (_a = request._header) !== null && _a !== void 0 ? _a : (_b = request._currentRequest) === null || _b === void 0 ? void 0 : _b._header) !== null && _c !== void 0 ? _c : noValueMessage,
                    res: { rawHeaders: (_e = (_d = request.res) === null || _d === void 0 ? void 0 : _d.rawHeaders) !== null && _e !== void 0 ? _e : [noValueMessage] }
                };
            }
            // Fallback response object that can be safely used to form response summary.
            let fallbackResponse = response || {
                status: noValueMessage,
                request: fallbackRequest,
                config: config || {
                    data: noValueMessage,
                    headers: {}
                },
                data: noValueMessage
            };
            const { status, request: req, data: resData } = fallbackResponse;
            const { _header: reqHeaders, res } = req;
            const resHeaders = this.formatHeaders(res.rawHeaders);
            const parsedResBody = this.parseInterceptedBody(resData);
            (0, host_1.getLogger)().info(`HTTP Request (first 50 lines):
${reqHeaders}${this.parseInterceptedBody(config === null || config === void 0 ? void 0 : config.data)}

HTTP Response Code: ${this.prettifyString(status)}

HTTP Response (first 50 lines):
${resHeaders}${parsedResBody ? `\n\n${parsedResBody}` : ''}
`);
            return error;
        };
        // Converts an array of strings into a single string with the following format:
        // <headerName>: <headerValue>
        this.formatHeaders = (rawHeaders) => {
            return rawHeaders.reduce((acc, value, i) => {
                if (i % 2 === 0) {
                    acc += `${i === 0 ? '' : '\n'}${value}`;
                }
                else {
                    acc += `: ${value}`;
                }
                return acc;
            }, '');
        };
        /**
         * Sets verbose mode.
         * @param verboseMode - value of the verbose mode, can be true, false or bleached(without extra colors).
         */
        this.setVerboseMode = (verboseMode) => {
            this.verboseMode = verboseMode;
            if (this.verboseMode)
                this.enableVerboseMode();
            else
                this.disableVerboseMode();
        };
        /**
         * Turns on verbose mode to log every HTTP response.
         * @param successCallBack - function that should be triggered on every HTTP response with the status 2**.
         * @param errorCallBack - function that should be triggered on every HTTP response with the status different from 2**.
         */
        this.enableVerboseMode = (successCallBack = this.handleAxiosResponse, errorCallBack = this.handleAxiosError) => {
            this.httpInterceptor = this.httpClient.interceptors.response.use(successCallBack, errorCallBack);
        };
        /**
         * Turns off verbose mode to log every HTTP response.
         */
        this.disableVerboseMode = () => {
            if (this.httpInterceptor) {
                this.httpClient.interceptors.response.eject(this.httpInterceptor);
            }
        };
        this.getHeaders = (accessToken, contentType) => {
            const headers = {};
            if (contentType !== 'application/x-www-form-urlencoded') {
                headers['Content-Type'] = contentType;
            }
            if (contentType === 'application/json') {
                headers.Accept = 'application/json';
            }
            else {
                headers.Accept = '*/*';
            }
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            if (this.csrfToken.headerName && this.csrfToken.value) {
                headers[this.csrfToken.headerName] = this.csrfToken.value;
            }
            return headers;
        };
        this.parseAndSetFileUploadCsrfToken = (response) => {
            const token = this.parseCsrfToken(response);
            if (token) {
                this.fileUploadCsrfToken = token;
            }
        };
        this.parseAndSetCsrfToken = (response) => {
            const token = this.parseCsrfToken(response);
            if (token) {
                this.csrfToken = token;
            }
        };
        this.parseCsrfToken = (response) => {
            var _a;
            const tokenHeader = (_a = response.headers['x-csrf-header']) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (tokenHeader) {
                const token = response.headers[tokenHeader];
                const csrfToken = {
                    headerName: tokenHeader,
                    value: token || ''
                };
                return csrfToken;
            }
        };
        this.handleError = (e_1, callback_1, ...args_1) => __awaiter(this, [e_1, callback_1, ...args_1], void 0, function* (e, callback, debug = false) {
            var _a;
            const response = e.response;
            if (e instanceof errors_1.AuthorizeError) {
                const res = yield this.httpClient
                    .get(e.confirmUrl, {
                    responseType: 'text',
                    headers: { 'Content-Type': 'text/plain', Accept: '*/*' }
                })
                    .catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while getting error confirmUrl. ');
                });
                if ((0, auth_1.isAuthorizeFormRequired)(res === null || res === void 0 ? void 0 : res.data)) {
                    yield this.authorize(res.data).catch((err) => {
                        throw (0, error_1.prefixMessage)(err, 'Error while authorizing request. ');
                    });
                }
                return yield callback().catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while executing callback in handleError. ');
                });
            }
            if (e instanceof errors_1.LoginRequiredError) {
                this.clearCsrfTokens();
                throw e;
            }
            if (e instanceof InvalidSASjsCsrfError_1.InvalidSASjsCsrfError) {
                // Fetching root and creating CSRF cookie
                yield this.httpClient
                    .get('/', {
                    withXSRFToken: true
                })
                    .then((response) => {
                    var _a;
                    const cookie = (_a = /<script>document.cookie = '(XSRF-TOKEN=.*; Max-Age=86400; SameSite=Strict; Path=\/;)'<\/script>/.exec(response.data)) === null || _a === void 0 ? void 0 : _a[1];
                    if (cookie)
                        document.cookie = cookie;
                })
                    .catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while re-fetching CSRF token.');
                });
                return yield callback().catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while executing callback in handleError. ');
                });
            }
            if ((response === null || response === void 0 ? void 0 : response.status) === 403 || (response === null || response === void 0 ? void 0 : response.status) === 449) {
                this.parseAndSetCsrfToken(response);
                if (this.csrfToken.headerName && this.csrfToken.value) {
                    return yield callback().catch((err) => {
                        throw (0, error_1.prefixMessage)(err, 'Error while executing callback in handleError. ');
                    });
                }
                throw e;
            }
            else if ((response === null || response === void 0 ? void 0 : response.status) === 404) {
                throw new errors_1.NotFoundError(response.config.url);
            }
            else if ((response === null || response === void 0 ? void 0 : response.status) === 502) {
                if (debug)
                    throw new errors_1.InternalServerError();
                else
                    return;
            }
            if (e.isAxiosError && e.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
                throw new errors_1.CertificateError(e.message);
            }
            if (e.isAxiosError &&
                !response &&
                e.code === 'ERR_NETWORK' &&
                !this.isRecoveringFromNetworkError) {
                // Opaque ERR_NETWORK usually means the server rejected stale credentials.
                // Wipe in-memory auth state, re-establish session via GET /,
                // then retry the original request.
                this.resetInMemoryAuthState();
                this.isRecoveringFromNetworkError = true;
                try {
                    // Re-establish session and CSRF cookie
                    const rootResponse = yield this.httpClient
                        .get('/', { withXSRFToken: true })
                        .catch((err) => err.response);
                    if (rootResponse === null || rootResponse === void 0 ? void 0 : rootResponse.data) {
                        const cookie = (_a = /<script>document.cookie = '(XSRF-TOKEN=.*; Max-Age=86400; SameSite=Strict; Path=\/;)'<\/script>/.exec(rootResponse.data)) === null || _a === void 0 ? void 0 : _a[1];
                        if (cookie && typeof document !== 'undefined') {
                            document.cookie = cookie;
                        }
                        this.parseAndSetCsrfToken(rootResponse);
                    }
                    return yield callback();
                }
                catch (_b) {
                    // Session could not be recovered — surface LoginRequiredError
                    throw new errors_1.LoginRequiredError();
                }
                finally {
                    this.isRecoveringFromNetworkError = false;
                }
            }
            if (e.message)
                throw e;
            else
                throw (0, error_1.prefixMessage)(e, 'Error while handling error. ');
        });
        this.createHttpClient(baseUrl, httpsAgentOptions);
        if (requestsLimit)
            this.requestsLimit = requestsLimit;
        if (verboseMode) {
            this.setVerboseMode(verboseMode);
            this.enableVerboseMode();
        }
    }
    setConfig(baseUrl, httpsAgentOptions) {
        this.createHttpClient(baseUrl, httpsAgentOptions);
    }
    saveLocalStorageToken(accessToken, refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
    getCsrfToken(type = 'general') {
        return type === 'file' ? this.fileUploadCsrfToken : this.csrfToken;
    }
    clearCsrfTokens() {
        this.csrfToken = { headerName: '', value: '' };
        this.fileUploadCsrfToken = { headerName: '', value: '' };
    }
    clearLocalStorageTokens() {
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
    }
    resetInMemoryAuthState() {
        this.clearCsrfTokens();
        if (typeof localStorage !== 'undefined') {
            this.clearLocalStorageTokens();
        }
        if (typeof document !== 'undefined') {
            this.clearAllCookies();
        }
    }
    clearAllCookies() {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const name = cookie.split('=')[0].trim();
            if (!name)
                continue;
            document.cookie = `${name}=; Max-Age=0; Path=/;`;
        }
    }
    getBaseUrl() {
        return this.httpClient.defaults.baseURL || '';
    }
    /**
     * this method appends the response from sasjs request to requests array
     * @param response - response from sasjs request
     * @param program - name of program
     * @param debug - a boolean that indicates whether debug was enabled or not
     */
    appendRequest(response, program, debug) {
        let sourceCode = '';
        let generatedCode = '';
        let sasWork = null;
        if (debug) {
            if (response === null || response === void 0 ? void 0 : response.log) {
                sourceCode = (0, utils_1.parseSourceCode)(response.log);
                generatedCode = (0, utils_1.parseGeneratedCode)(response.log);
                if (response === null || response === void 0 ? void 0 : response.result) {
                    sasWork = response.result.WORK;
                }
                else {
                    sasWork = response.log;
                }
            }
            else if (response === null || response === void 0 ? void 0 : response.result) {
                // We parse only if it's a string, otherwise it would throw error
                if (typeof response.result === 'string') {
                    sourceCode = (0, utils_1.parseSourceCode)(response.result);
                    generatedCode = (0, utils_1.parseGeneratedCode)(response.result);
                }
                sasWork = response.result.WORK;
            }
        }
        const stringifiedResult = typeof (response === null || response === void 0 ? void 0 : response.result) === 'string'
            ? response === null || response === void 0 ? void 0 : response.result
            : JSON.stringify(response === null || response === void 0 ? void 0 : response.result, null, 2);
        this.requests.push({
            logFile: (response === null || response === void 0 ? void 0 : response.log) || stringifiedResult || response,
            serviceLink: program,
            timestamp: new Date(),
            sourceCode,
            generatedCode,
            SASWORK: sasWork
        });
        if (this.requests.length > this.requestsLimit) {
            this.requests.splice(0, 1);
        }
    }
    get(url_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (url, accessToken, contentType = 'application/json', overrideHeaders = {}, debug = false) {
            const headers = Object.assign(Object.assign({}, this.getHeaders(accessToken, contentType)), overrideHeaders);
            const requestConfig = {
                headers,
                responseType: contentType === 'text/plain' ? 'text' : 'json',
                withXSRFToken: true
            };
            if (contentType === 'text/plain') {
                requestConfig.transformResponse = undefined;
            }
            return this.httpClient
                .get(url, requestConfig)
                .then((response) => {
                (0, exports.throwIfError)(response);
                return this.parseResponse(response);
            })
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                return yield this.handleError(e, () => this.get(url, accessToken, contentType, overrideHeaders).catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while executing handle error callback. ');
                }), debug);
            }));
        });
    }
    /**
     * @param contentType  Newer version of Axios is more strict so if you don't
     * set the contentType to `form data` while sending a FormData object
     * application/json will be used by default, axios won’t treat it as FormData.
     * Instead, it serializes data as JSON—resulting in a payload like
     * {"sometable":{}} and we lose the multipart/form-data formatting.
     */
    post(url_1, data_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, accessToken, contentType = 'application/json', overrideHeaders = {}, additionalSettings = {}) {
            const headers = Object.assign(Object.assign({}, this.getHeaders(accessToken, contentType)), overrideHeaders);
            return this.httpClient
                .post(url, data, Object.assign({ headers, withXSRFToken: true }, additionalSettings))
                .then((response) => {
                (0, exports.throwIfError)(response);
                return this.parseResponse(response);
            })
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                return yield this.handleError(e, () => this.post(url, data, accessToken, contentType, overrideHeaders));
            }));
        });
    }
    put(url_1, data_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, accessToken, overrideHeaders = {}) {
            const headers = Object.assign(Object.assign({}, this.getHeaders(accessToken, 'application/json')), overrideHeaders);
            return this.httpClient
                .put(url, data, { headers, withXSRFToken: true })
                .then((response) => {
                (0, exports.throwIfError)(response);
                return this.parseResponse(response);
            })
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                return yield this.handleError(e, () => this.put(url, data, accessToken, overrideHeaders));
            }));
        });
    }
    delete(url, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = this.getHeaders(accessToken, 'application/json');
            return this.httpClient
                .delete(url, { headers, withXSRFToken: true })
                .then((response) => {
                (0, exports.throwIfError)(response);
                return this.parseResponse(response);
            })
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                return yield this.handleError(e, () => this.delete(url, accessToken));
            }));
        });
    }
    patch(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, data = {}, accessToken, overrideHeaders = {}) {
            const headers = Object.assign(Object.assign({}, this.getHeaders(accessToken, 'application/json')), overrideHeaders);
            return this.httpClient
                .patch(url, data, { headers, withXSRFToken: true })
                .then((response) => {
                (0, exports.throwIfError)(response);
                return this.parseResponse(response);
            })
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                return yield this.handleError(e, () => this.patch(url, data, accessToken));
            }));
        });
    }
    uploadFile(url, content, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const headers = this.getHeaders(accessToken, 'application/json');
            if ((_a = this.fileUploadCsrfToken) === null || _a === void 0 ? void 0 : _a.value) {
                headers[this.fileUploadCsrfToken.headerName] =
                    this.fileUploadCsrfToken.value;
            }
            try {
                const response = yield this.httpClient.post(url, content, {
                    headers,
                    transformRequest: (requestBody) => requestBody
                });
                return {
                    result: response.data,
                    etag: response.headers['etag']
                };
            }
            catch (e) {
                const response = e.response;
                if ((response === null || response === void 0 ? void 0 : response.status) === 403 || (response === null || response === void 0 ? void 0 : response.status) === 449) {
                    this.parseAndSetFileUploadCsrfToken(response);
                    if (this.fileUploadCsrfToken) {
                        return this.uploadFile(url, content, accessToken);
                    }
                    throw e;
                }
                throw e;
            }
        });
    }
    parseResponse(response) {
        const etag = (response === null || response === void 0 ? void 0 : response.headers) ? response.headers['etag'] : '';
        let parsedResponse;
        let includeSAS9Log = false;
        try {
            if (typeof response.data === 'string') {
                parsedResponse = JSON.parse(response.data);
            }
            else {
                parsedResponse = response.data;
            }
        }
        catch (_a) {
            try {
                parsedResponse = JSON.parse((0, parseWeboutResponse_1.parseWeboutResponse)(response.data));
            }
            catch (_b) {
                parsedResponse = response.data;
            }
            includeSAS9Log = true;
        }
        let responseToReturn = {
            result: parsedResponse,
            etag,
            status: response.status
        };
        if (includeSAS9Log) {
            responseToReturn.log = response.data;
        }
        return responseToReturn;
    }
    createHttpClient(baseUrl, httpsAgentOptions) {
        // Node only: a browser has no https module, and axios uses XHR there.
        const httpsAgent = (0, isNode_1.isNode)() && httpsAgentOptions
            ? new ((__webpack_require__(9251).Agent))(httpsAgentOptions)
            : undefined;
        this.httpClient = (0, utils_1.createAxiosInstance)(baseUrl, httpsAgent);
        this.httpClient.defaults.validateStatus = (status) => {
            return status >= 200 && status <= 401;
        };
    }
}
exports.RequestClient = RequestClient;
const throwIfError = (response) => {
    var _a, _b, _c, _d, _e, _f, _g;
    switch (response.status) {
        case 400:
            if (typeof response.data === 'object' &&
                response.data.error === 'invalid_grant') {
                // In SASVIYA when trying to get access token, if auth code is wrong status code will be 400 so in such case we return login required error.
                throw new errors_1.LoginRequiredError(response.data);
            }
            if (typeof response.data === 'string' &&
                response.data.toLowerCase() === 'invalid csrf token!') {
                throw new InvalidSASjsCsrfError_1.InvalidSASjsCsrfError();
            }
            break;
        case 401:
            if (typeof response.data === 'object') {
                throw new errors_1.LoginRequiredError(response.data);
            }
            else {
                throw new errors_1.LoginRequiredError();
            }
    }
    if ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.entityID) === null || _b === void 0 ? void 0 : _b.includes('login')) {
        throw new errors_1.LoginRequiredError();
    }
    if (typeof response.data === 'string' &&
        (0, auth_1.isAuthorizeFormRequired)(response.data)) {
        throw new errors_1.AuthorizeError('Authorization required', response.request.responseURL);
    }
    if (typeof response.data === 'string' &&
        (0, auth_1.isLogInRequired)(response.data) &&
        !((_d = (_c = response.config) === null || _c === void 0 ? void 0 : _c.url) === null || _d === void 0 ? void 0 : _d.includes('/SASLogon/login'))) {
        throw new errors_1.LoginRequiredError();
    }
    if ((_e = response.data) === null || _e === void 0 ? void 0 : _e.auth_request) {
        const authorizeRequestUrl = response.request.responseURL;
        throw new errors_1.AuthorizeError(response.data.message, authorizeRequestUrl);
    }
    if ((_g = (_f = response.config) === null || _f === void 0 ? void 0 : _f.url) === null || _g === void 0 ? void 0 : _g.includes('sasAuthError')) {
        throw new SAS9AuthError_1.SAS9AuthError();
    }
    const error = parseError(response.data);
    if (error) {
        throw error;
    }
};
exports.throwIfError = throwIfError;
const parseError = (data) => {
    if (!data)
        return null;
    try {
        const responseJson = JSON.parse(data === null || data === void 0 ? void 0 : data.replace(/[\n\r]/g, ' '));
        if (responseJson.errorCode && responseJson.message) {
            return new errors_1.JobExecutionError(responseJson.errorCode, responseJson.message, data === null || data === void 0 ? void 0 : data.replace(/[\n\r]/g, ' '));
        }
    }
    catch (_) { }
    try {
        const hasError = data === null || data === void 0 ? void 0 : data.includes('{"errorCode');
        if (hasError) {
            const parts = data.split('{"errorCode');
            if (parts.length > 1) {
                const error = '{"errorCode' + parts[1].split('"}')[0] + '"}';
                const errorJson = JSON.parse(error.replace(/[\n\r]/g, ' '));
                return new errors_1.JobExecutionError(errorJson.errorCode, errorJson.message, data === null || data === void 0 ? void 0 : data.replace(/[\n\r]/g, '\n'));
            }
        }
    }
    catch (_) { }
    try {
        const hasError = !!(data === null || data === void 0 ? void 0 : data.match(/stored process not found: /i));
        if (hasError) {
            const parts = data.split(/stored process not found: /i);
            if (parts.length > 1) {
                const storedProcessPath = parts[1].split('<i>')[1].split('</i>')[0];
                const message = storedProcessPath.endsWith('runner')
                    ? `SASJS runner not found. Register the SASjs runner in SAS - the SAS code is in the SASjs CLI documentation, under Authentication / SASjs runner`
                    : `Stored process not found: ${storedProcessPath}`;
                return new errors_1.JobExecutionError(500, message, '');
            }
        }
    }
    catch (_) { }
    try {
        // There are some edge cases in which the SAS mp_abort macro
        // (https://core.sasjs.io/mp__abort_8sas.html) is unable to
        // provide a clean exit.  In this case the JSON response will
        // be wrapped in >>weboutBEGIN<< and >>weboutEND<< strings.
        // Therefore, if the first string exists, we won't throw an
        // error just yet (the parser may yet throw one instead)
        const hasError = !(data === null || data === void 0 ? void 0 : data.match(/>>weboutBEGIN<</)) &&
            !!(data === null || data === void 0 ? void 0 : data.match(/Stored Process Error/i)) &&
            !!(data === null || data === void 0 ? void 0 : data.match(/This request completed with errors./i));
        if (hasError) {
            const parts = data.split('<h2>SAS Log</h2>');
            if (parts.length > 1) {
                const log = parts[1].split('<pre>')[1].split('</pre>')[0];
                const message = `This request completed with errors.`;
                return new errors_1.JobExecutionError(500, message, log);
            }
        }
    }
    catch (_) { }
    return null;
};


/***/ },

/***/ 576
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sas9RequestClient = void 0;
const axios_cookiejar_support_1 = __webpack_require__(2841);
const tough = __importStar(__webpack_require__(4724));
const error_1 = __webpack_require__(6340);
const RequestClient_1 = __webpack_require__(8816);
const errors_1 = __webpack_require__(7388);
const host_1 = __webpack_require__(5334);
let hasWarnedAboutSas9Login = false;
/**
 * Warns once per process rather than per request: a job that runs repeatedly
 * through the SAS 9 credential path should not repeat this on every call, and
 * a single line is enough for the reader to find the README note.
 */
const warnDeprecatedSas9Login = () => {
    if (hasWarnedAboutSas9Login)
        return;
    hasWarnedAboutSas9Login = true;
    (0, host_1.getLogger)().warn('The SAS 9 username / password login is deprecated and will be removed in a future major version. It appends the credentials to the _program query string, which SAS 9 only accepts when the platform is configured to allow URL credentials.');
};
/**
 * Specific request client for SAS9 in Node.js environments.
 * Handles redirects and cookie management.
 */
/**
 * The cookie wrapper carries its jar on the request config, and axios types
 * `defaults` as a separate shape, so the property is named here rather than
 * relied on through the package's module augmentation.
 */
const jarredDefaults = (client) => client.defaults;
class Sas9RequestClient extends RequestClient_1.RequestClient {
    constructor(baseUrl, httpsAgentOptions) {
        super(baseUrl, httpsAgentOptions);
        this.httpClient.defaults.maxRedirects = 0;
        this.httpClient.defaults.validateStatus = (status) => status >= 200 && status < 303;
        if (axios_cookiejar_support_1.wrapper) {
            // the published signature is a union over axios's two declaration files,
            // which TypeScript resolves as distinct types here; the call is unchanged
            ;
            axios_cookiejar_support_1.wrapper(this.httpClient);
            jarredDefaults(this.httpClient).jar = new tough.CookieJar();
        }
    }
    resetInMemoryAuthState() {
        super.resetInMemoryAuthState();
        const jar = jarredDefaults(this.httpClient).jar;
        if (jar)
            jar.removeAllCookiesSync();
    }
    /**
     * Logs into SAS 9 by appending the credentials to a `_program` call.
     *
     * @deprecated The credentials travel in the query string, and SAS 9 only
     * accepts them when the platform is configured to allow URL credentials -
     * which is why this was never usable without a server-side change. There is
     * no drop-in replacement for the mechanism itself; it will be removed in a
     * future major version, so new work should not depend on it.
     */
    login(username, password, jobsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (username && password)
                warnDeprecatedSas9Login();
            const codeInjectorPath = `/User Folders/${username}/My Folder/sasjs/runner`;
            const jar = jarredDefaults(this.httpClient).jar;
            if (jar) {
                jar.removeAllCookies();
                yield this.get(`${jobsPath}?_program=${codeInjectorPath}&_username=${username}&_password=${password}`, undefined, 'text/plain');
            }
        });
    }
    /**
     * A 302 is followed by hand rather than by axios (maxRedirects is 0), and the
     * request carries the access token, so the token would otherwise travel to
     * whatever host the response names. Only a redirect to the origin of the
     * request is followed.
     *
     * Resolving against `url` and `baseUrl` is what makes the check hold for
     * every form a Location can take: a relative path or a protocol-relative
     * value resolves to the origin it was resolved against, and an absolute one
     * that leaves it is refused. The Location is passed through unchanged, so a
     * same-origin redirect behaves exactly as it did before.
     */
    assertSafeRedirect(location, url) {
        if (!location) {
            throw new errors_1.UnsafeRedirectError(url, 'the response carried no Location header');
        }
        const requested = new URL(url, this.baseUrl);
        const target = new URL(location, requested);
        if (target.origin !== requested.origin) {
            throw new errors_1.UnsafeRedirectError(url, `${target.origin} is not the origin of the request`, location);
        }
    }
    get(url_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (url, accessToken, contentType = 'application/json', overrideHeaders = {}, debug = false) {
            const headers = Object.assign(Object.assign({}, this.getHeaders(accessToken, contentType)), overrideHeaders);
            const requestConfig = {
                headers,
                responseType: contentType === 'text/plain' ? 'text' : 'json',
                withXSRFToken: true
            };
            if (contentType === 'text/plain') {
                requestConfig.transformResponse = undefined;
            }
            return this.httpClient
                .get(url, requestConfig)
                .then((response) => {
                if (response.status === 302) {
                    const location = response.headers['location'];
                    this.assertSafeRedirect(location, url);
                    return this.get(location, accessToken, contentType);
                }
                (0, RequestClient_1.throwIfError)(response);
                return this.parseResponse(response);
            })
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                if (e instanceof errors_1.JobExecutionError)
                    throw e;
                return yield this.handleError(e, () => this.get(url, accessToken, contentType, overrideHeaders).catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while executing handle error callback. ');
                }), debug).catch((err) => {
                    throw (0, error_1.prefixMessage)(err, 'Error while handling error. ');
                });
            }));
        });
    }
    post(url_1, data_1, accessToken_1) {
        return __awaiter(this, arguments, void 0, function* (url, data, accessToken, contentType = 'application/json', overrideHeaders = {}) {
            const headers = Object.assign(Object.assign({}, this.getHeaders(accessToken, contentType)), overrideHeaders);
            return this.httpClient
                .post(url, data, { headers, withXSRFToken: true })
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                if (response.status === 302) {
                    const location = response.headers['location'];
                    this.assertSafeRedirect(location, url);
                    return yield this.get(location, undefined, contentType, overrideHeaders);
                }
                (0, RequestClient_1.throwIfError)(response);
                return this.parseResponse(response);
            }))
                .catch((e) => __awaiter(this, void 0, void 0, function* () {
                return yield this.handleError(e, () => this.post(url, data, accessToken, contentType, overrideHeaders));
            }));
        });
    }
}
exports.Sas9RequestClient = Sas9RequestClient;


/***/ },

/***/ 7560
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SASJS_LOGS_SEPARATOR = exports.SasjsRequestClient = void 0;
const RequestClient_1 = __webpack_require__(8816);
/**
 * Specific request client for SASJS.
 * Append tokens in headers.
 */
class SasjsRequestClient extends RequestClient_1.RequestClient {
    constructor() {
        super(...arguments);
        this.getHeaders = (accessToken, contentType) => {
            var _a;
            const headers = {};
            if (contentType !== 'application/x-www-form-urlencoded')
                headers['Content-Type'] = contentType;
            headers.Accept = contentType === 'application/json' ? contentType : '*/*';
            if (!accessToken && typeof window !== 'undefined')
                accessToken = (_a = localStorage.getItem('accessToken')) !== null && _a !== void 0 ? _a : undefined;
            if (accessToken)
                headers.Authorization = `Bearer ${accessToken}`;
            return headers;
        };
    }
    parseResponse(response) {
        const etag = (response === null || response === void 0 ? void 0 : response.headers) ? response.headers['etag'] : '';
        let parsedResponse = {};
        let webout, log, printOutput;
        try {
            if (typeof response.data === 'string') {
                parsedResponse = JSON.parse(response.data);
            }
            else {
                parsedResponse = response.data;
            }
        }
        catch (_a) {
            if (response.data.includes(exports.SASJS_LOGS_SEPARATOR)) {
                const { data } = response;
                const splittedResponse = data.split(exports.SASJS_LOGS_SEPARATOR);
                webout = splittedResponse.splice(0, 1)[0];
                if (webout !== undefined)
                    parsedResponse = webout;
                // log can contain nested logs
                const logs = splittedResponse.splice(0, splittedResponse.length - 1);
                // tests if string ends with SASJS_LOGS_SEPARATOR
                const endingWithLogSepRegExp = new RegExp(`${exports.SASJS_LOGS_SEPARATOR}$`);
                // at this point splittedResponse can contain only one item
                const lastChunk = splittedResponse[0];
                if (lastChunk) {
                    // if the last chunk doesn't end with SASJS_LOGS_SEPARATOR, then it is a printOutput
                    // else the last chunk is part of the log and has to be joined
                    if (!endingWithLogSepRegExp.test(data))
                        printOutput = lastChunk;
                    else if (logs.length > 1)
                        logs.push(lastChunk);
                }
                // join logs into single log with SASJS_LOGS_SEPARATOR
                log = logs.join(exports.SASJS_LOGS_SEPARATOR);
            }
            else {
                parsedResponse = response.data;
            }
        }
        const returnResult = {
            result: parsedResponse,
            log: log || '',
            etag,
            status: response.status
        };
        if (printOutput)
            returnResult.printOutput = printOutput;
        return returnResult;
    }
}
exports.SasjsRequestClient = SasjsRequestClient;
exports.SASJS_LOGS_SEPARATOR = 'SASJS_LOGS_SEPARATOR_163ee17b6ff24f028928972d80a26784';


/***/ },

/***/ 5777
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 1353
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 3438
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 4006
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 8912
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 5873
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 2872
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 3632
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 6772
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 1751
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 6864
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 9556
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 4066
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginMechanism = exports.SASjsConfig = void 0;
/**
 * Specifies the configuration for the SASjs instance - eg where and how to
 * connect to SAS.
 */
class SASjsConfig {
    constructor() {
        /**
         * The location (including http protocol and port) of the SAS Server.
         * Can be omitted, eg if serving directly from the SAS Web Server or being
         * streamed.
         */
        this.serverUrl = '';
        /**
         * The mount the SASjs Server API answers on.
         *
         * Defaults to '/SASjsApi'; '/api' selects the short spelling sasjs/server also
         * serves. The stored-program endpoint is not configurable: it is
         * `<mount>/stp/execute`, appended by the callers, so this value names the mount
         * and nothing else.
         */
        this.pathSASJS = '';
        /**
         * The location of the Stored Process Web Application.  By default the adapter
         * will use '/SASStoredProcess/do' on SAS 9.
         */
        this.pathSAS9 = '';
        /**
         * The location of the Job Execution Web Application.  By default the adapter
         * will use '/SASJobExecution' on SAS Viya.
         */
        this.pathSASViya = '';
        /**
         * The appLoc is the parent folder under which the SAS services (STPs or Job
         * Execution Services) are stored.  We recommend that each app is stored in
         * a dedicated parent folder (the appLoc) and the services are grouped inside
         * subfolders within the appLoc - allowing functionality to be restricted
         * according to those groups at backend.
         * When using appLoc, the paths provided in the `request` function should be
         * _without_ a leading slash (/).
         */
        this.appLoc = '';
        /**
         * Can be `SAS9` or `SASVIYA`.
         */
        this.serverType = null;
        /**
         * Set to `true` to enable additional debugging.
         */
        this.debug = true;
        /**
         * Set to `true` to enable verbose mode that will log a summary of every HTTP response.
         */
        this.verbose = true;
        /**
         * The name of the compute context to use when calling the Viya services directly.
         * Example value: 'SAS Job Execution compute context'
         */
        this.contextName = '';
        /**
         * If it's `false` adapter will use the JES API as connection approach.  To enhance VIYA
         * performance, set to `true` and provide a `contextName` on which to run
         * the code.  When running on a named context, the code executes under the
         * user identity.  When running as a Job Execution service, the code runs
         * under the identity in the JES context.  If `useComputeApi` is `null` or `undefined`, the service will run as a Job, except
         * triggered using the APIs instead of the Job Execution Web Service broker.
         */
        this.useComputeApi = null;
        /**
         * Supported login mechanisms are - Redirected and Default
         */
        this.loginMechanism = LoginMechanism.Default;
        /**
         * Optional setting to configure request history limit. Increasing this limit
         * may affect browser performance, especially with debug (logs) enabled.
         */
        this.requestHistoryLimit = 10;
        /**
         * Optional setting. When `true`, the request runs as a Viya execution task —
         * appends `_executionTasks=true` to the request URL. Only applies to the Viya
         * web jobs path, i.e. when `serverType === SASVIYA` AND
         * `useComputeApi` is `null`/`undefined`. Has no effect when `useComputeApi`
         * is explicitly set to `true` or `false`.
         */
        this.runAsTask = false;
    }
}
exports.SASjsConfig = SASjsConfig;
var LoginMechanism;
(function (LoginMechanism) {
    LoginMechanism["Default"] = "Default";
    LoginMechanism["Redirected"] = "Redirected";
})(LoginMechanism || (exports.LoginMechanism = LoginMechanism = {}));


/***/ },

/***/ 5618
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionState = void 0;
var SessionState;
(function (SessionState) {
    SessionState["Completed"] = "completed";
    SessionState["Running"] = "running";
    SessionState["Pending"] = "pending";
    SessionState["Idle"] = "idle";
    SessionState["Unavailable"] = "unavailable";
    SessionState["NoState"] = "";
    SessionState["Failed"] = "failed";
    SessionState["Error"] = "error";
})(SessionState || (exports.SessionState = SessionState = {}));


/***/ },

/***/ 1473
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tables = void 0;
const errors_1 = __webpack_require__(7388);
class Tables {
    constructor(table, macroName) {
        this._tables = {};
        this.add(table, macroName);
    }
    add(table, macroName) {
        if (table && macroName) {
            if (!(table instanceof Array)) {
                throw new errors_1.ArgumentError('First argument must be array');
            }
            if (typeof macroName !== 'string') {
                throw new errors_1.ArgumentError('Second argument must be string');
            }
            if (!isNaN(Number(macroName[macroName.length - 1]))) {
                throw new errors_1.ArgumentError('Macro name cannot have number at the end');
            }
        }
        else {
            throw new errors_1.ArgumentError('Missing arguments');
        }
        this._tables[macroName] = table;
    }
}
exports.Tables = Tables;


/***/ },

/***/ 8143
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 8305
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 8707
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArgumentError = void 0;
class ArgumentError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'ArgumentError';
        Object.setPrototypeOf(this, ArgumentError.prototype);
    }
}
exports.ArgumentError = ArgumentError;


/***/ },

/***/ 8661
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizeError = void 0;
class AuthorizeError extends Error {
    constructor(message, confirmUrl) {
        super(message);
        this.message = message;
        this.confirmUrl = confirmUrl;
        this.name = 'AuthorizeError';
        Object.setPrototypeOf(this, AuthorizeError.prototype);
    }
}
exports.AuthorizeError = AuthorizeError;


/***/ },

/***/ 9241
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CertificateError = void 0;
// Named rather than linked: a URL literal in the shipped package is what the
// supply-chain scanners flag, and the reference is findable by its number.
const instructionsToFix = 'the sasjs/cli repository, issue #1181 - the comment on certificate handling has the workarounds';
class CertificateError extends Error {
    constructor(message) {
        super(`${message}\nFor further information on this issue see ${instructionsToFix}.\n`);
        this.name = 'CertificateError';
        Object.setPrototypeOf(this, CertificateError.prototype);
    }
}
exports.CertificateError = CertificateError;


/***/ },

/***/ 634
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputeJobExecutionError = void 0;
class ComputeJobExecutionError extends Error {
    constructor(job, log) {
        super('Error: Job execution failed');
        this.job = job;
        this.log = log;
        this.name = 'ComputeJobExecutionError';
        Object.setPrototypeOf(this, ComputeJobExecutionError.prototype);
    }
}
exports.ComputeJobExecutionError = ComputeJobExecutionError;


/***/ },

/***/ 4845
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor(message, details, raw) {
        let detailsString = details;
        if (typeof details !== 'object') {
            try {
                detailsString = JSON.parse(details);
            }
            catch (_a) {
                raw = details;
                detailsString = '';
            }
        }
        this.error = {
            message,
            details: detailsString,
            raw
        };
    }
}
exports.ErrorResponse = ErrorResponse;


/***/ },

/***/ 9068
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalServerError = void 0;
class InternalServerError extends Error {
    constructor() {
        super('Error: Internal server error.');
        this.name = 'InternalServerError';
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;


/***/ },

/***/ 2383
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidJsonError = void 0;
class InvalidJsonError extends Error {
    constructor() {
        super('Error: invalid Json string');
        this.name = 'InvalidJsonError';
        Object.setPrototypeOf(this, InvalidJsonError.prototype);
    }
}
exports.InvalidJsonError = InvalidJsonError;


/***/ },

/***/ 4001
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.InvalidSASjsCsrfError = void 0;
class InvalidSASjsCsrfError extends Error {
    constructor() {
        const message = 'Invalid CSRF token!';
        super(`Auth error: ${message}`);
        this.name = 'InvalidSASjsCsrfError';
        Object.setPrototypeOf(this, InvalidSASjsCsrfError.prototype);
    }
}
exports.InvalidSASjsCsrfError = InvalidSASjsCsrfError;


/***/ },

/***/ 7411
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobExecutionError = void 0;
class JobExecutionError extends Error {
    constructor(errorCode, errorMessage, result) {
        super(`Error Code ${errorCode}: ${errorMessage}`);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.result = result;
        this.name = 'JobExecutionError';
        Object.setPrototypeOf(this, JobExecutionError.prototype);
    }
}
exports.JobExecutionError = JobExecutionError;


/***/ },

/***/ 2909
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobStatePollError = void 0;
class JobStatePollError extends Error {
    constructor(id, originalError) {
        super(`Error while polling job state for job ${id}: ${originalError.message || originalError}`);
        this.originalError = originalError;
        this.name = 'JobStatePollError';
        Object.setPrototypeOf(this, JobStatePollError.prototype);
    }
}
exports.JobStatePollError = JobStatePollError;


/***/ },

/***/ 7236
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonParseArrayError = void 0;
class JsonParseArrayError extends Error {
    constructor() {
        super('Can not parse array object to json.');
        this.name = 'JsonParseArrayError';
        Object.setPrototypeOf(this, JsonParseArrayError.prototype);
    }
}
exports.JsonParseArrayError = JsonParseArrayError;


/***/ },

/***/ 3104
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginRequiredError = void 0;
class LoginRequiredError extends Error {
    constructor(details) {
        const message = details
            ? JSON.stringify(details, null, 2)
            : 'You must be logged in to access this resource';
        super(`Auth error: ${message}`);
        this.name = 'LoginRequiredError';
        Object.setPrototypeOf(this, LoginRequiredError.prototype);
    }
}
exports.LoginRequiredError = LoginRequiredError;


/***/ },

/***/ 1976
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoSessionStateError = void 0;
class NoSessionStateError extends Error {
    constructor(serverResponseStatus, sessionStateUrl, logUrl) {
        super(`Could not get session state. Server responded with ${serverResponseStatus} whilst checking state: ${sessionStateUrl}`);
        this.serverResponseStatus = serverResponseStatus;
        this.sessionStateUrl = sessionStateUrl;
        this.logUrl = logUrl;
        this.name = 'NoSessionStatus';
        Object.setPrototypeOf(this, NoSessionStateError.prototype);
    }
}
exports.NoSessionStateError = NoSessionStateError;


/***/ },

/***/ 7403
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(url) {
        super(`Error: Resource at ${url} was not found`);
        this.url = url;
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;


/***/ },

/***/ 5395
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RootFolderNotFoundError = void 0;
const auth_1 = __webpack_require__(6072);
class RootFolderNotFoundError extends Error {
    constructor(parentFolderPath, serverUrl, accessToken) {
        let message = `Root folder ${parentFolderPath} was not found.` +
            `\nPlease check ${serverUrl}/SASDrive.` +
            `\nIf the folder DOES exist then it is likely a permission problem.\n`;
        if (accessToken) {
            const decodedToken = (0, auth_1.decodeToken)(accessToken);
            let scope = decodedToken.scope;
            scope = scope.map((element) => '* ' + element);
            message +=
                `Your access token contains the following scopes:\n` + scope.join('\n');
        }
        super(message);
        this.name = 'RootFolderNotFoundError';
        Object.setPrototypeOf(this, RootFolderNotFoundError.prototype);
    }
}
exports.RootFolderNotFoundError = RootFolderNotFoundError;


/***/ },

/***/ 2079
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.SAS9AuthError = void 0;
class SAS9AuthError extends Error {
    constructor() {
        super('The credentials you provided cannot be authenticated. Please provide a valid set of credentials.');
        this.name = 'AuthorizeError';
        Object.setPrototypeOf(this, SAS9AuthError.prototype);
    }
}
exports.SAS9AuthError = SAS9AuthError;


/***/ },

/***/ 996
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnsafeRedirectError = void 0;
/**
 * Thrown when a 302 cannot be followed safely.
 *
 * The SAS 9 client follows a redirect by hand, and the request carries the
 * access token, so a Location pointing at another origin is how that token
 * would reach a third party. A response that names no Location at all is
 * refused for the same reason - there is nothing safe to follow, and following
 * the original url again would loop.
 */
class UnsafeRedirectError extends Error {
    constructor(requestedUrl, reason, location) {
        super(`Refusing to follow the redirect from ${requestedUrl}: ${reason}` +
            (location === undefined ? '' : ` (Location: ${location})`));
        this.requestedUrl = requestedUrl;
        this.reason = reason;
        this.location = location;
        this.name = 'UnsafeRedirectError';
        Object.setPrototypeOf(this, UnsafeRedirectError.prototype);
    }
}
exports.UnsafeRedirectError = UnsafeRedirectError;


/***/ },

/***/ 9997
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeboutResponseError = void 0;
class WeboutResponseError extends Error {
    constructor(url) {
        super(`Error: error while parsing response from ${url}`);
        this.url = url;
        this.name = 'WeboutResponseError';
        Object.setPrototypeOf(this, WeboutResponseError.prototype);
    }
}
exports.WeboutResponseError = WeboutResponseError;


/***/ },

/***/ 7388
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(8707), exports);
__exportStar(__webpack_require__(8661), exports);
__exportStar(__webpack_require__(9241), exports);
__exportStar(__webpack_require__(634), exports);
__exportStar(__webpack_require__(4845), exports);
__exportStar(__webpack_require__(9068), exports);
__exportStar(__webpack_require__(2383), exports);
__exportStar(__webpack_require__(7411), exports);
__exportStar(__webpack_require__(2909), exports);
__exportStar(__webpack_require__(7236), exports);
__exportStar(__webpack_require__(3104), exports);
__exportStar(__webpack_require__(1976), exports);
__exportStar(__webpack_require__(7403), exports);
__exportStar(__webpack_require__(5395), exports);
__exportStar(__webpack_require__(996), exports);
__exportStar(__webpack_require__(9997), exports);


/***/ },

/***/ 3574
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5777), exports);
__exportStar(__webpack_require__(1353), exports);
__exportStar(__webpack_require__(8912), exports);
__exportStar(__webpack_require__(4006), exports);
__exportStar(__webpack_require__(5873), exports);
__exportStar(__webpack_require__(2872), exports);
__exportStar(__webpack_require__(3632), exports);
__exportStar(__webpack_require__(6772), exports);
__exportStar(__webpack_require__(1751), exports);
__exportStar(__webpack_require__(4066), exports);
__exportStar(__webpack_require__(9556), exports);
__exportStar(__webpack_require__(5618), exports);
__exportStar(__webpack_require__(8143), exports);
__exportStar(__webpack_require__(6864), exports);
__exportStar(__webpack_require__(8305), exports);
__exportStar(__webpack_require__(3438), exports);
__exportStar(__webpack_require__(7388), exports);
__exportStar(__webpack_require__(1473), exports);


/***/ },

/***/ 3258
(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appendExtraResponseAttributes = appendExtraResponseAttributes;
function appendExtraResponseAttributes(response, extraResponseAttributes) {
    return __awaiter(this, void 0, void 0, function* () {
        let responseObject = {};
        if (extraResponseAttributes === null || extraResponseAttributes === void 0 ? void 0 : extraResponseAttributes.length) {
            const extraAttributes = extraResponseAttributes.reduce((map, obj) => ((map[obj] = response[obj]), map), {});
            responseObject = Object.assign({ result: response.result }, extraAttributes);
        }
        else
            responseObject = response.result;
        return responseObject;
    });
}


/***/ },

/***/ 2558
(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asyncForEach = asyncForEach;
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}


/***/ },

/***/ 9644
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compareTimestamps = void 0;
/**
 * Comparator for SASjs request timestamps.
 *
 */
const compareTimestamps = (a, b) => {
    return b.timestamp.getTime() - a.timestamp.getTime();
};
exports.compareTimestamps = compareTimestamps;


/***/ },

/***/ 4786
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFormatsTable = exports.convertToCSV = void 0;
const validators_1 = __webpack_require__(3371);
const error_1 = __webpack_require__(6340);
/**
 * Converts the given JSON object array to a CSV string.
 * @param data - the array of JSON objects to convert.
 */
const convertToCSV = (data, tableName) => {
    var _a;
    if (!data[tableName]) {
        const error = (0, error_1.prefixMessage)('No table provided to be converted to CSV.', 'Error while converting to CSV. ');
        if (typeof error === 'string')
            throw new Error(error);
        throw error;
    }
    const table = data[tableName];
    if (!Array.isArray(table))
        return '';
    let formats = (_a = data[`$${tableName}`]) === null || _a === void 0 ? void 0 : _a.formats;
    let headers = [];
    let csvTest;
    let invalidString = false;
    if (formats) {
        headers = Object.keys(formats).map((key) => `${key}:${formats[key]}`);
    }
    const headerFields = Object.keys(table[0]);
    headerFields.forEach((field) => {
        if (!formats || !Object.keys(formats).includes(field)) {
            let hasNullOrNumber = false;
            let hasSpecialMissingString = false;
            table.forEach((row) => {
                if (row[field] === null || typeof row[field] === 'number') {
                    hasNullOrNumber = true;
                }
                else if (typeof row[field] === 'string' &&
                    (0, validators_1.isSpecialMissing)(row[field])) {
                    hasSpecialMissingString = true;
                }
            });
            if (hasNullOrNumber && hasSpecialMissingString) {
                headers.push(`${field}:best.`);
                if (!formats)
                    formats = {};
                formats[field] = 'best.';
            }
            else {
                let firstFoundType = null;
                let hasMixedTypes = false;
                let rowNumError = -1;
                const longestValueForField = table
                    .map((row, index) => {
                    if (row[field] || row[field] === '') {
                        if (firstFoundType) {
                            let currentFieldType = row[field] === '' || typeof row[field] === 'string'
                                ? 'chars'
                                : 'number';
                            if (!hasMixedTypes) {
                                hasMixedTypes = currentFieldType !== firstFoundType;
                                rowNumError = hasMixedTypes ? index + 1 : -1;
                            }
                        }
                        else {
                            if (row[field] === '') {
                                firstFoundType = 'chars';
                            }
                            else {
                                firstFoundType =
                                    typeof row[field] === 'string' ? 'chars' : 'number';
                            }
                        }
                        let byteSize;
                        if (typeof row[field] === 'string') {
                            byteSize = getByteSize(row[field]);
                        }
                        return byteSize;
                    }
                })
                    .sort((a, b) => b - a)[0];
                if (longestValueForField && longestValueForField > 32765) {
                    invalidString = true;
                }
                if (hasMixedTypes) {
                    console.error(`Row (${rowNumError}), Column (${field}) has mixed types: ERROR`);
                }
                headers.push(`${field}:${firstFoundType === 'chars' ? '$char' : ''}${longestValueForField
                    ? longestValueForField
                    : firstFoundType === 'chars'
                        ? '1'
                        : 'best'}.`);
            }
        }
    });
    if (formats) {
        headers = headers.sort((a, b) => headerFields.indexOf(a.replace(/:.*/, '')) -
            headerFields.indexOf(b.replace(/:.*/, '')));
    }
    if (invalidString)
        return 'ERROR: LARGE STRING LENGTH';
    csvTest = table.map((row) => {
        const fields = Object.keys(row).map((fieldName, index) => {
            let value;
            const currentCell = row[fieldName];
            if (typeof currentCell === 'number')
                return currentCell;
            // stringify with replacer converts null values to empty strings
            value = currentCell === null ? '' : currentCell;
            if (formats && formats[fieldName] === 'best.') {
                if (value && !(0, validators_1.isSpecialMissing)(value)) {
                    throw new Error(`A Special missing value can only be a single character from 'A' to 'Z', '_', '.[a-z]', '._'`);
                }
                const dot = value.includes('.') ? '' : '.';
                return `${dot}${value.toLowerCase()}`;
            }
            // if there any present, it should have preceding (") for escaping
            value = value.replace(/"/g, `""`);
            // also wraps the value in double quotes
            value = `"${value}"`;
            if (value.substring(1, value.length - 1).search(/(\t|\n|\r|,|\'|\")/gm) < 0) {
                // Remove wrapping quotes for values that don't contain special characters
                value = value.substring(1, value.length - 1);
            }
            value = value.replace(/\r\n/gm, '\n');
            if (value === '' && headers[index].includes('best')) {
                value = '.';
            }
            return value;
        });
        return fields.join(',');
    });
    let finalCSV = headers.join(',').replace(/,/g, ' ') + '\r\n' + csvTest.join('\r\n');
    return finalCSV;
};
exports.convertToCSV = convertToCSV;
/**
 * Checks if table is table of formats (table name should start from '$' character).
 * @param tableName - table name.
 */
const isFormatsTable = (tableName) => /^\$.*/.test(tableName);
exports.isFormatsTable = isFormatsTable;
const getByteSize = (str) => {
    let byteSize = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff)
            byteSize++;
        else if (code > 0x7ff && code <= 0xffff)
            byteSize += 2;
        if (code >= 0xdc00 && code <= 0xdfff)
            i--; //trail surrogate
    }
    return byteSize;
};


/***/ },

/***/ 6535
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAxiosInstance = void 0;
const axios_1 = __importDefault(__webpack_require__(6425));
const createAxiosInstance = (baseURL, httpsAgent) => axios_1.default.create({ baseURL, httpsAgent });
exports.createAxiosInstance = createAxiosInstance;


/***/ },

/***/ 6889
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.delay = void 0;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.delay = delay;


/***/ },

/***/ 5286
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractWeboutBlob = exports.hasWeboutBlob = void 0;
const getValidJson_1 = __webpack_require__(5880);
const parseWeboutResponse_1 = __webpack_require__(7640);
// Matches the script-constructed Blob that the JES web app uses to inline the
// webout: `new Blob([`{...}`], {type: 'application/json'})`. The type is
// text/plain on abort and error paths, where the JSON is wrapped in
// weboutBEGIN/END markers. Quote style and whitespace vary between Viya
// releases, so both are tolerated here rather than in a second pattern.
const blobPattern = /new Blob\(\[`([\s\S]*?)`\],\s*\{\s*type:\s*['"](?:application\/json|text\/plain)['"]\s*\}/;
/**
 * True when the response inlines the webout in a script-constructed Blob,
 * which is the shape the compute task debug path returns. The iframe file URL
 * path does not, so callers use this to pick the matching parser.
 */
const hasWeboutBlob = (response) => blobPattern.test(response);
exports.hasWeboutBlob = hasWeboutBlob;
/**
 * Extracts and parses the webout JSON from a JES web app debug response that
 * inlines it via a script-constructed Blob - see blobPattern for the shapes
 * handled. Returns null (rather than throwing) if no such blob is present, so
 * callers can fall back to another extraction strategy first.
 */
const extractWeboutBlob = (response) => {
    const blobMatch = response.match(blobPattern);
    if (!blobMatch)
        return null;
    const blobContent = blobMatch[1];
    const stripped = blobContent.includes('>>weboutBEGIN<<')
        ? (0, parseWeboutResponse_1.parseWeboutResponse)(blobContent)
        : blobContent;
    return (0, getValidJson_1.getValidJson)(stripped);
};
exports.extractWeboutBlob = extractWeboutBlob;


/***/ },

/***/ 3193
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchLog = exports.fetchLogByChunks = void 0;
const error_1 = __webpack_require__(6340);
const host_1 = __webpack_require__(5334);
/**
 * Fetches content of the log file
 * @param {object} requestClient - client object of Request Client.
 * @param {string} accessToken - an access token for an authorized user.
 * @param {string} logUrl - url of the log file.
 * @param {number} logCount- total number of log lines in file.
 * @returns an string containing log lines.
 */
const fetchLogByChunks = (requestClient, accessToken, logUrl, logCount) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.fetchLog)(requestClient, accessToken, logUrl, 0, logCount);
});
exports.fetchLogByChunks = fetchLogByChunks;
/**
 * Fetches a section of the log file delineated by start and end lines
 * @param {object} requestClient - client object of Request Client.
 * @param {string} accessToken - an access token for an authorized user.
 * @param {string} logUrl - url of the log file.
 * @param {number} start - the line at which to start fetching the log.
 * @param {number} end - the line at which to stop fetching the log.
 * @returns an string containing log lines.
 */
const fetchLog = (requestClient, accessToken, logUrl, start, end) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = (0, host_1.getLogger)();
    let log = '';
    const loglimit = end < 10000 ? end : 10000;
    do {
        logger.info(`Fetching logs from line no: ${start + 1} to ${start + loglimit} of ${end}.`);
        const logChunkJson = yield requestClient
            .get(`${logUrl}?start=${start}&limit=${loglimit}`, accessToken)
            .then((res) => res.result)
            .catch((err) => {
            throw (0, error_1.prefixMessage)(err, 'Error while getting log. ');
        });
        if (logChunkJson.items.length === 0)
            break;
        const logChunk = logChunkJson.items.map((i) => i.line).join('\n');
        log += logChunk;
        start += loglimit;
    } while (start < end);
    return log;
});
exports.fetchLog = fetchLog;


/***/ },

/***/ 3407
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.formatDataForRequest = void 0;
const convertToCsv_1 = __webpack_require__(4786);
const splitChunks_1 = __webpack_require__(8720);
const formatDataForRequest = (data) => {
    const sasjsTables = [];
    let tableCounter = 0;
    const result = {};
    for (const tableName in data) {
        if ((0, convertToCsv_1.isFormatsTable)(tableName) &&
            Object.keys(data).includes(tableName.replace(/^\$/, ''))) {
            continue;
        }
        tableCounter++;
        // Formats table should not be sent as part of 'sasjs_tables'
        if (!(0, convertToCsv_1.isFormatsTable)(tableName))
            sasjsTables.push(tableName);
        const csv = (0, convertToCsv_1.convertToCSV)(data, tableName);
        if (csv === 'ERROR: LARGE STRING LENGTH') {
            throw new Error('The max length of a string value in SASjs is 32765 characters.');
        }
        // if csv has length more then 16k, send in chunks
        if (csv.length > 16000) {
            const csvChunks = (0, splitChunks_1.splitChunks)(csv);
            // append chunks to form data with same key
            result[`sasjs${tableCounter}data0`] = csvChunks.length;
            csvChunks.forEach((chunk, index) => {
                result[`sasjs${tableCounter}data${index + 1}`] = chunk;
            });
        }
        else {
            result[`sasjs${tableCounter}data`] = csv;
        }
    }
    result['sasjs_tables'] = sasjsTables.join(' ');
    return result;
};
exports.formatDataForRequest = formatDataForRequest;


/***/ },

/***/ 8292
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFormData = void 0;
const _1 = __webpack_require__(9266);
const form_data_1 = __importDefault(__webpack_require__(1894));
const getFormData = () => (0, _1.isNode)() ? new form_data_1.default() : new FormData();
exports.getFormData = getFormData;


/***/ },

/***/ 343
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserLanguage = void 0;
/**
 * Provides preferred language of the user.
 * @returns A string representing the preferred language of the user, usually the language of the browser UI. Examples of valid language codes include "en", "en-US", "fr", "fr-FR", "es-ES". More info available https://datatracker.ietf.org/doc/html/rfc5646
 */
const getUserLanguage = () => window.navigator.language || window.navigator.userLanguage;
exports.getUserLanguage = getUserLanguage;


/***/ },

/***/ 5880
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getValidJson = void 0;
const errors_1 = __webpack_require__(7388);
/**
 * if string passed then parse the string to json else if throw error for all other types unless it is not a valid json object.
 * @param str - string to check.
 */
const getValidJson = (str) => {
    try {
        if (str === null || str === undefined)
            throw new errors_1.InvalidJsonError();
        if (Array.isArray(str))
            throw new errors_1.JsonParseArrayError();
        if (typeof str === 'object')
            return str;
        if (str === '')
            return {};
        return JSON.parse(str);
    }
    catch (e) {
        if (e instanceof errors_1.JsonParseArrayError)
            throw e;
        throw new errors_1.InvalidJsonError();
    }
};
exports.getValidJson = getValidJson;


/***/ },

/***/ 5334
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;
/* provided dependency */ var process = __webpack_require__(5748);

__webpack_unused_export__ = ({ value: true });
exports.inspectValue = exports.getCwd = exports.getLogger = void 0;
const isNode_1 = __webpack_require__(6308);
/**
 * The logger a host attaches to `process`, or the console when there is none.
 *
 * The browser build injects a process stub into every module (webpack's
 * ProvidePlugin, browser-shims/process.js), so `process` is always defined and
 * `typeof process === 'undefined'` never distinguishes the environments.
 * `isNode()` reads `process.versions.node`, which the stub leaves undefined.
 * Every logger lookup goes through here so that the same source runs in both.
 */
const getLogger = () => (0, isNode_1.isNode)() ? process.logger || console : console;
exports.getLogger = getLogger;
/**
 * The working directory, or '.' where there is no node to ask - the browser
 * case. Only node paths call this, but the guard keeps the reference safe to
 * carry in a browser bundle.
 */
const getCwd = () => ((0, isNode_1.isNode)() ? process.cwd() : '.');
exports.getCwd = getCwd;
/**
 * Pretty-prints a value for verbose logging. Node's util.inspect gives the
 * coloured output the CLI displays. A browser has no util module - the browser
 * build maps `util` to nothing, see resolve.alias in webpack.config.js - so
 * JSON is the fallback there rather than a bundled shim.
 */
const inspectValue = (value, colors) => {
    if ((0, isNode_1.isNode)()) {
        const { inspect } = __webpack_require__(4460);
        return inspect(value, { colors });
    }
    return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
};
exports.inspectValue = inspectValue;


/***/ },

/***/ 9266
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3258), exports);
__exportStar(__webpack_require__(2558), exports);
__exportStar(__webpack_require__(9644), exports);
__exportStar(__webpack_require__(4786), exports);
__exportStar(__webpack_require__(6535), exports);
__exportStar(__webpack_require__(6889), exports);
__exportStar(__webpack_require__(5286), exports);
__exportStar(__webpack_require__(3193), exports);
__exportStar(__webpack_require__(5880), exports);
__exportStar(__webpack_require__(6308), exports);
__exportStar(__webpack_require__(8679), exports);
__exportStar(__webpack_require__(6580), exports);
__exportStar(__webpack_require__(5735), exports);
__exportStar(__webpack_require__(9689), exports);
__exportStar(__webpack_require__(3389), exports);
__exportStar(__webpack_require__(8325), exports);
__exportStar(__webpack_require__(3617), exports);
__exportStar(__webpack_require__(7288), exports);
__exportStar(__webpack_require__(6024), exports);
__exportStar(__webpack_require__(7640), exports);
__exportStar(__webpack_require__(8424), exports);
__exportStar(__webpack_require__(8720), exports);
__exportStar(__webpack_require__(8128), exports);
__exportStar(__webpack_require__(8292), exports);
__exportStar(__webpack_require__(343), exports);


/***/ },

/***/ 6308
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5748);

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNode = void 0;
const isNode = () => typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
exports.isNode = isNode;


/***/ },

/***/ 8679
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRelativePath = void 0;
const isRelativePath = (uri) => !!uri && !uri.startsWith('/');
exports.isRelativePath = isRelativePath;


/***/ },

/***/ 6580
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isUri = void 0;
/**
 * Checks if string is in URI format.
 * @param str - string to check.
 */
const isUri = (str) => /^\/folders\/folders\//.test(str);
exports.isUri = isUri;


/***/ },

/***/ 5735
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isUrl = void 0;
/**
 * Checks if string is in URL format.
 * @param str - string to check.
 */
const isUrl = (str) => {
    const supportedProtocols = ['http:', 'https:'];
    try {
        const url = new URL(str);
        if (!supportedProtocols.includes(url.protocol))
            return false;
    }
    catch (_) {
        return false;
    }
    return true;
};
exports.isUrl = isUrl;


/***/ },

/***/ 2986
(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openLoginPrompt = void 0;
var domIDs;
(function (domIDs) {
    domIDs["styles"] = "sasjsAdapterStyles";
    domIDs["overlay"] = "sasjsAdapterLoginPromptBG";
    domIDs["dialog"] = "sasjsAdapterLoginPrompt";
})(domIDs || (domIDs = {}));
const cssPrefix = 'sasjs-adapter';
const classes = {
    popUp: `${cssPrefix}popUp`,
    popUpBG: `${cssPrefix}popUpBG`
};
const openLoginPrompt = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const style = document.createElement('style');
        style.id = domIDs.styles;
        style.innerText = cssContent;
        const loginPromptBG = document.createElement('div');
        loginPromptBG.id = domIDs.overlay;
        loginPromptBG.classList.add(classes.popUpBG);
        const loginPrompt = document.createElement('div');
        loginPrompt.id = domIDs.dialog;
        loginPrompt.classList.add(classes.popUp);
        const title = document.createElement('h1');
        title.innerText = 'Session Expired!';
        loginPrompt.appendChild(title);
        const descHolder = document.createElement('div');
        const desc = document.createElement('span');
        desc.innerText = 'You need to relogin, click OK to login.';
        descHolder.appendChild(desc);
        loginPrompt.appendChild(descHolder);
        const buttonCancel = document.createElement('button');
        buttonCancel.classList.add('cancel');
        buttonCancel.innerText = 'Cancel';
        buttonCancel.onclick = () => {
            closeLoginPrompt();
            resolve(false);
        };
        loginPrompt.appendChild(buttonCancel);
        const buttonOk = document.createElement('button');
        buttonOk.classList.add('confirm');
        buttonOk.innerText = 'Ok';
        buttonOk.onclick = () => {
            closeLoginPrompt();
            resolve(true);
        };
        loginPrompt.appendChild(buttonOk);
        document.body.style.overflow = 'hidden';
        document.body.appendChild(style);
        document.body.appendChild(loginPromptBG);
        document.body.appendChild(loginPrompt);
    }));
};
exports.openLoginPrompt = openLoginPrompt;
const closeLoginPrompt = () => {
    Object.values(domIDs).forEach((id) => {
        var _a;
        const elem = document.getElementById(id);
        (_a = elem === null || elem === void 0 ? void 0 : elem.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(elem);
    });
    document.body.style.overflow = 'auto';
};
const cssContent = `
.${classes.popUpBG} ,
.${classes.popUp} {
  z-index: 10000;
}
.${classes.popUp} {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: block;
  position: fixed;
  top: 40%;
  left: 50%;
  padding: 0;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  color: #fff;
  border-style: none;
  z-index: 999;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  margin: 0;
  width: 100%;
  max-width: 300px;
  height: auto;
  max-height: 300px;
  transform: translate(-50%, -50%);
}
.${classes.popUp} > h1 {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 5px;
  min-height: 40px;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: transparent;
  border-style: none;
  border-width: 5px;
  border-color: black;
}
.${classes.popUp} > div {
  width: 100%;
  height: calc(100% -108px);
  margin: 0;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 5%;
  text-align: center;
  border-width: 1px;
  border-color: #ccc;
  border-style: none none solid none;
  overflow: auto;
}
.${classes.popUp} > div > span {
  display: table-cell;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 300px;
  height: 108px;
  vertical-align: middle;
  border-style: none;
}
.${classes.popUp} .cancel {
  float: left;
}
.${classes.popUp} .confirm {
  float: right;
}
.${classes.popUp} > button {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  margin: 0;
  padding: 10px;
  width: 50%;
  border: 1px none #ccc;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
  height: 50px;
  background: rgba(1, 1, 1, 0.2);
}
.${classes.popUp} > button:hover {
  background: rgba(0, 0, 0, 0.2);
}
.${classes.popUpBG} {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0.95;
  z-index: 50;
  background-image: radial-gradient(#0378cd, #012036);
}
`;


/***/ },

/***/ 9689
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.needsRetry = void 0;
const needsRetry = (responseText) => {
    return (!!responseText &&
        ((responseText.includes('"errorCode":403') &&
            responseText.includes('_csrf') &&
            responseText.includes('X-CSRF-TOKEN')) ||
            (responseText.includes('"status":403') &&
                responseText.includes('"error":"Forbidden"')) ||
            (responseText.includes('"status":449') &&
                responseText.includes('Authentication success, retry original request'))));
};
exports.needsRetry = needsRetry;


/***/ },

/***/ 3389
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseGeneratedCode = void 0;
const parseGeneratedCode = (log) => {
    const startsWith = 'MPRINT';
    const isGeneratedCodeLine = (line) => line.trim().startsWith(startsWith);
    const logLines = log.split('\n').filter(isGeneratedCodeLine);
    return logLines.join('\r\n');
};
exports.parseGeneratedCode = parseGeneratedCode;


/***/ },

/***/ 8325
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSasViyaLog = void 0;
const parseSasViyaLog = (logResponse) => {
    let log;
    try {
        log = logResponse.items
            ? logResponse.items.map((i) => i.line).join('\n')
            : JSON.stringify(logResponse);
    }
    catch (e) {
        console.error('An error has occurred while parsing the log response', e);
        log = logResponse;
    }
    return log;
};
exports.parseSasViyaLog = parseSasViyaLog;


/***/ },

/***/ 3617
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSourceCode = void 0;
const parseSourceCode = (log) => {
    const isSourceCodeLine = (line) => line.trim().substring(0, 10).trimStart().match(/^\d/);
    const logLines = log.split('\n').filter(isSourceCodeLine);
    return logLines.join('\r\n');
};
exports.parseSourceCode = parseSourceCode;


/***/ },

/***/ 7288
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSasViyaDebugResponse = void 0;
const utils_1 = __webpack_require__(9266);
const extractWeboutBlob_1 = __webpack_require__(5286);
/**
 * When querying a Viya job using the Web approach (as opposed to using the APIs) with _DEBUG enabled,
 * the first response contains the log with the content in an iframe. Therefore when debug is enabled,
 * and the serverType is VIYA, and useComputeApi is null (WEB), we call this function to extract the
 * (_webout) content from the iframe.
 * @param response - first response from viya job
 * @param requestClient
 * @param serverUrl
 * @returns
 */
const parseSasViyaDebugResponse = (response, requestClient, serverUrl) => __awaiter(void 0, void 0, void 0, function* () {
    // On viya 3.5, iframe is like <iframe style="width: 99%; height: 500px" src="..."></iframe>
    // On viya 4, iframe is like <iframe style="width: 99%; height: 500px; background-color:Canvas;" src=...></iframe>
    const iframeStart = response.split(/<iframe style="width: 99%; height: 500px" src="|<iframe style="width: 99%; height: 500px; background-color:Canvas;" src=/)[1];
    const jsonUrl = iframeStart
        ? iframeStart.split(/"><\/iframe>|><\/iframe>/)[0]
        : null;
    if (jsonUrl) {
        return requestClient
            .get(serverUrl + jsonUrl, undefined, 'text/plain')
            .then((res) => (0, utils_1.getValidJson)(res.result));
    }
    // Fallback: some Viya configurations inline the webout via a
    // script-constructed Blob instead of an iframe src URL, e.g. when the
    // _debug=128 format is served on a path expecting the older _debug=131
    // iframe-URL format.
    const blobResult = (0, extractWeboutBlob_1.extractWeboutBlob)(response);
    if (blobResult !== null)
        return blobResult;
    throw new Error('Unable to find webout content - no iframe URL and no inline blob.');
});
exports.parseSasViyaDebugResponse = parseSasViyaDebugResponse;


/***/ },

/***/ 6024
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseSasViyaLogDebugResponse = void 0;
const extractWeboutBlob_1 = __webpack_require__(5286);
/**
 * When querying a Viya job using the Web approach with _DEBUG=128 (used when
 * runAsTask is true), the webout JSON is inlined into the response via a
 * script-constructed Blob - see extractWeboutBlob for the exact shapes
 * handled. No follow-up request is needed — extract and parse the JSON
 * directly.
 */
const parseSasViyaLogDebugResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
    // If upstream already parsed the response as JSON (object), pass through.
    if (typeof response !== 'string') {
        return response;
    }
    const result = (0, extractWeboutBlob_1.extractWeboutBlob)(response);
    if (result === null) {
        throw new Error('Unable to find webout blob in debug log response.');
    }
    return result;
});
exports.parseSasViyaLogDebugResponse = parseSasViyaLogDebugResponse;


/***/ },

/***/ 7640
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseWeboutResponse = void 0;
const errors_1 = __webpack_require__(7388);
const parseWeboutResponse = (response, url) => {
    let sasResponse = '';
    if (response.includes('>>weboutBEGIN<<')) {
        try {
            sasResponse = response
                .split('>>weboutBEGIN<<')[1]
                .split('>>weboutEND<<')[0];
        }
        catch (e) {
            if (url)
                throw new errors_1.WeboutResponseError(url);
            sasResponse = '';
            console.error(e);
        }
    }
    return sasResponse;
};
exports.parseWeboutResponse = parseWeboutResponse;


/***/ },

/***/ 8548
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.extractUserLongNameSas9 = void 0;
/**
 * Dictionary should contain only languages in SAS where `logout` text
 * is represented with more then one word
 */
const dictionary = ['Log Off'];
/**
 * Extracts user full name assuming the first word after "title" means log off if not found otherwise in the dictionary
 * @param response SAS response content
 * @returns user full name
 */
const extractUserLongNameSas9 = (response) => {
    const regex = /"title":\s?".*?"/;
    const matched = response === null || response === void 0 ? void 0 : response.match(regex);
    let fullName = matched === null || matched === void 0 ? void 0 : matched[0].split(':')[1].trim();
    let breakIndex = fullName === null || fullName === void 0 ? void 0 : fullName.indexOf(' ');
    if (!fullName)
        return 'unknown';
    dictionary.map((logoutWord) => {
        const index = (fullName === null || fullName === void 0 ? void 0 : fullName.indexOf(logoutWord)) || -1;
        if (index > -1) {
            breakIndex = index + logoutWord.length;
        }
    });
    //Cut only name
    return fullName.slice(breakIndex, -1).trim();
};
exports.extractUserLongNameSas9 = extractUserLongNameSas9;


/***/ },

/***/ 8424
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serialize = void 0;
const serialize = (obj) => {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (obj[p] instanceof Array) {
                for (let i = 0, n = obj[p].length; i < n; i++) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p][i]));
                }
            }
            else {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
    }
    return str.join('&');
};
exports.serialize = serialize;


/***/ },

/***/ 8720
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitChunks = void 0;
const splitChunks = (content) => {
    const size = 16000;
    const numChunks = Math.ceil(content.length / size);
    const chunks = new Array(numChunks);
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = content.substr(o, size);
    }
    return chunks;
};
exports.splitChunks = splitChunks;


/***/ },

/***/ 8128
(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateInput = exports.INVALID_TABLE_STRUCTURE = exports.MORE_INFO = void 0;
exports.MORE_INFO = 'For more info see the SASjs adapter documentation, under Request / Response';
exports.INVALID_TABLE_STRUCTURE = `Parameter data contains invalid table structure. ${exports.MORE_INFO}`;
/**
 * This function validates the input data structure and table naming convention
 *
 * @param data A json object that contains one or more tables, it can also be null
 * @returns An object which contains two attributes: 1) status: boolean, 2) msg: string
 */
const validateInput = (data) => {
    if (data === null)
        return { status: true, msg: '' };
    if (getType(data) !== 'object') {
        return {
            status: false,
            msg: exports.INVALID_TABLE_STRUCTURE
        };
    }
    const isSasFormatsTable = (key) => key.match(/^\$.*/) && Object.keys(data).includes(key.replace(/^\$/, ''));
    for (const key in data) {
        if (!key.match(/^[a-zA-Z_]/) && !isSasFormatsTable(key)) {
            return {
                status: false,
                msg: 'First letter of table should be alphabet or underscore.'
            };
        }
        if (!key.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && !isSasFormatsTable(key)) {
            return { status: false, msg: 'Table name should be alphanumeric.' };
        }
        if (key.length > 32) {
            return {
                status: false,
                msg: 'Maximum length for table name could be 32 characters.'
            };
        }
        if (getType(data[key]) !== 'Array' && !isSasFormatsTable(key)) {
            return {
                status: false,
                msg: exports.INVALID_TABLE_STRUCTURE
            };
        }
        // ES6 is stricter so we had to include the check for the array
        if (Array.isArray(data[key])) {
            for (const item of data[key]) {
                if (getType(item) !== 'object') {
                    return {
                        status: false,
                        msg: `Table ${key} contains invalid structure. ${exports.MORE_INFO}`
                    };
                }
                else {
                    const attributes = Object.keys(item);
                    for (const attribute of attributes) {
                        if (item[attribute] === undefined) {
                            return {
                                status: false,
                                msg: `A row in table ${key} contains invalid value. Can't assign undefined to ${attribute}.`
                            };
                        }
                    }
                }
            }
        }
    }
    return { status: true, msg: '' };
};
exports.validateInput = validateInput;
/**
 * this function returns the type of variable
 *
 * @param data it could be anything, like string, array, object etc.
 * @returns a string which tells the type of input parameter
 */
const getType = (data) => {
    if (Array.isArray(data)) {
        return 'Array';
    }
    else {
        return typeof data;
    }
};


/***/ },

/***/ 9278
() {

/* (ignored) */

/***/ },

/***/ 9416
() {

/* (ignored) */

/***/ },

/***/ 9251
() {

/* (ignored) */

/***/ },

/***/ 4460
() {

/* (ignored) */

/***/ },

/***/ 1179
() {

/* (ignored) */

/***/ },

/***/ 6425
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(5748);
/*! Axios v1.20.0 Copyright (c) 2026 Matt Zabriskie and contributors */


/**
 * Create a bound version of a function with a specified `this` context
 *
 * @param {Function} fn - The function to bind
 * @param {*} thisArg - The value to be passed as the `this` parameter
 * @returns {Function} A new function that will call the original function with the specified `this` context
 */
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (
  ({ hasOwnProperty }) =>
  (obj, prop) =>
    hasOwnProperty.call(obj, prop)
)(Object.prototype);

const isUnsafeObjectKey = (prop) =>
  typeof prop === 'string' &&
  (prop === '__proto__' || prop === 'constructor' || prop === 'prototype');

/**
 * Determine whether an inherited object must be treated as a shared-prototype
 * boundary. Cross-realm Object.prototype objects cannot be distinguished
 * reliably from application-created null-prototype objects because their
 * properties are mutable, so all inherited terminal prototypes are excluded
 * as a fail-closed boundary. A null-prototype source still keeps its own
 * properties, as produced by mergeConfig and other safe materialization paths.
 *
 * @param {*} obj The object to inspect
 * @param {*} prototype The object's prototype
 * @param {boolean} source Whether obj is the original traversal source
 *
 * @returns {boolean} True when obj is a safe prototype traversal boundary
 */
const isPrototypeBoundary = (obj, prototype, source) =>
  obj === Object.prototype || (!source && prototype === null);

/**
 * Determine whether an object can retain its identity through code paths that
 * add, replace, and remove config properties without bypassing unsafe-key
 * filtering. Immutable objects, unsafe-key-bearing objects, and objects with
 * accessor or restricted data properties must be materialized instead.
 *
 * @param {*} obj The object to inspect
 *
 * @returns {boolean} True when every own property is safe and fully mutable
 */
const isSafeAndFullyMutable = (obj) => {
  if (!Object.isExtensible(obj)) {
    return false;
  }

  const props = Object.getOwnPropertyNames(obj);

  if (Object.getOwnPropertySymbols) {
    props.push(...Object.getOwnPropertySymbols(obj));
  }

  return props.every((prop) => {
    if (isUnsafeObjectKey(prop)) {
      return false;
    }

    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

    return !!descriptor && descriptor.configurable && descriptor.writable === true;
  });
};

/**
 * Walk the prototype chain (excluding the source realm's Object.prototype)
 * looking for an own `prop`. This distinguishes genuine own/inherited members
 * — including class accessors and template prototypes — from members injected
 * via Object.prototype pollution (e.g. `Object.prototype.username = '...'`),
 * which live on Object.prototype itself and are therefore never matched.
 *
 * @param {*} thing The value whose chain to inspect
 * @param {string|symbol} prop The property key to look for
 *
 * @returns {boolean} True when `prop` is owned below Object.prototype
 */
const hasOwnInPrototypeChain = (thing, prop) => {
  let obj = thing;
  const seen = [];

  while (obj != null) {
    if (seen.indexOf(obj) !== -1) {
      return false;
    }
    seen.push(obj);

    const prototype = getPrototypeOf(obj);

    if (isPrototypeBoundary(obj, prototype, obj === thing)) {
      return false;
    }

    if (hasOwnProperty(obj, prop)) {
      return true;
    }
    obj = prototype;
  }
  return false;
};

/**
 * Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
 * properties and members inherited from a non-Object.prototype source (a class
 * instance or template object) are honored; a value reachable only through a
 * polluted Object.prototype is ignored and `undefined` is returned.
 *
 * @param {*} obj The source object
 * @param {string|symbol} prop The property key to read
 *
 * @returns {*} The resolved value, or undefined when unsafe/absent
 */
const getSafeProp = (obj, prop) =>
  obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : undefined;

/**
 * Flatten an object and its application-defined prototype chain into a
 * null-prototype object. Members inherited only from the source realm's
 * Object.prototype are deliberately excluded, while class/template members
 * below that boundary are preserved.
 *
 * @param {*} thing The value to flatten
 *
 * @returns {*} A null-prototype copy, or the original value when it is already
 * structurally safe or is not an object
 */
const toSafeFlatObject = (thing) => {
  if (thing == null || (typeof thing !== 'object' && typeof thing !== 'function')) {
    return thing;
  }

  const sourcePrototype = getPrototypeOf(thing);

  if (sourcePrototype === null && isSafeAndFullyMutable(thing)) {
    return thing;
  }

  const result = Object.create(null);
  const merged = Object.create(null);
  const seen = [];
  let current = thing;

  while (current != null) {
    if (seen.indexOf(current) !== -1) {
      break;
    }

    seen.push(current);

    const prototype = current === thing ? sourcePrototype : getPrototypeOf(current);

    if (isPrototypeBoundary(current, prototype, current === thing)) {
      break;
    }

    const props = Object.getOwnPropertyNames(current);

    if (Object.getOwnPropertySymbols) {
      props.push(...Object.getOwnPropertySymbols(current));
    }

    for (const prop of props) {
      if (isUnsafeObjectKey(prop)) {
        continue;
      }

      if (!hasOwnProperty(merged, prop)) {
        result[prop] = thing[prop];
        merged[prop] = true;
      }
    }

    current = prototype;
  }

  return result;
};

const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};

const typeOfTest = (type) => (thing) => typeof thing === type;

/**
 * Determine if a value is a non-null object
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const { isArray } = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    isFunction$1(val.constructor.isBuffer) &&
    val.constructor.isBuffer(val)
  );
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction$1 = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = (thing) => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (!isObject(val)) {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (
    (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) &&
    // Treat safe own/inherited Symbol.toStringTag or Symbol.iterator members as
    // evidence the value is tagged/iterable, while ignoring members reachable
    // only through shared or terminal prototype boundaries.
    !hasOwnInPrototypeChain(val, toStringTag) &&
    !hasOwnInPrototypeChain(val, iterator)
  );
};

/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */
const isEmptyObject = (val) => {
  // Early return for non-objects or Buffers to prevent RangeError
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }

  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    // Fallback for any other objects that might cause RangeError with Object.keys()
    return false;
  }
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a React Native Blob
 * React Native "blob": an object with a `uri` attribute. Optionally, it can
 * also have a `name` and `type` attribute to specify filename and content type
 *
 * @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
 *
 * @param {*} value The value to test
 *
 * @returns {boolean} True if value is a React Native Blob, otherwise false
 */
const isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== 'undefined');
};

/**
 * Determine if environment is React Native
 * ReactNative `FormData` has a non-standard `getParts()` method
 *
 * @param {*} formData The formData to test
 *
 * @returns {boolean} True if environment is React Native, otherwise false
 */
const isReactNative = (formData) => formData && typeof formData.getParts !== 'undefined';

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a FileList, otherwise false
 */
const isFileList = kindOfTest('FileList');
const isSet = kindOfTest('Set');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function getGlobal() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof __webpack_require__.g !== 'undefined') return __webpack_require__.g;
  return {};
}

const G = getGlobal();
const FormDataCtor = typeof G.FormData !== 'undefined' ? G.FormData : undefined;

const isFormData = (thing) => {
  if (!thing) return false;
  if (FormDataCtor && thing instanceof FormDataCtor) return true;
  // Reject plain objects inheriting directly from Object.prototype so prototype-pollution gadgets can't spoof FormData.
  const proto = getPrototypeOf(thing);
  if (!proto || proto === Object.prototype) return false;
  if (!isFunction$1(thing.append)) return false;
  const kind = kindOf(thing);
  return (
    kind === 'formdata' ||
    // detect form-data instance
    (kind === 'object' && isFunction$1(thing.toString) && thing.toString() === '[object FormData]')
  );
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = [
  'ReadableStream',
  'Request',
  'Response',
  'Headers',
].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array<unknown>} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Buffer check
    if (isBuffer(obj)) {
      return;
    }

    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

/**
 * Finds a key in an object, case-insensitive, returning the actual key name.
 * Returns null if the object is a Buffer or if no match is found.
 *
 * @param {Object} obj - The object to search.
 * @param {string} key - The key to find (case-insensitive).
 * @returns {?string} The actual key name if found, otherwise null.
 */
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }

  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== 'undefined') return globalThis;
  return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : __webpack_require__.g;
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * const result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(...objs) {
  const { caseless, skipUndefined } = (isContextDefined(this) && this) || {};
  const result = {};
  const assignValue = (val, key) => {
    // Skip dangerous property names to prevent prototype pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return;
    }

    // findKey lowercases the key, so caseless lookup only applies to strings —
    // symbol keys are identity-matched.
    const targetKey = (caseless && typeof key === 'string' && findKey(result, key)) || key;
    // Read via own-prop only — a bare `result[targetKey]` walks the prototype
    // chain, so a polluted Object.prototype value could surface here and get
    // copied into the merged result.
    const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : undefined;
    if (isPlainObject(existing) && isPlainObject(val)) {
      result[targetKey] = merge(existing, val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = objs.length; i < l; i++) {
    const source = objs[i];
    if (!source || isBuffer(source)) {
      continue;
    }

    forEach(source, assignValue);

    if (typeof source !== 'object' || isArray(source)) {
      continue;
    }

    const symbols = Object.getOwnPropertySymbols(source);
    for (let j = 0; j < symbols.length; j++) {
      const symbol = symbols[j];
      if (propertyIsEnumerable.call(source, symbol)) {
        assignValue(source[symbol], symbol);
      }
    }
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction$1(val)) {
        Object.defineProperty(a, key, {
          // Null-proto descriptor so a polluted Object.prototype.get cannot
          // hijack defineProperty's accessor-vs-data resolution.
          __proto__: null,
          value: bind(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        Object.defineProperty(a, key, {
          __proto__: null,
          value: val,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, 'constructor', {
    __proto__: null,
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(constructor, 'super', {
    __proto__: null,
    value: superConstructor.prototype,
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = ((TypedArray) => {
  // eslint-disable-next-line func-names
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];

  const _iterator = generator.call(obj);

  let result;

  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};

const { propertyIsEnumerable } = Object.prototype;

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction$1(obj) && ['arguments', 'caller', 'callee'].includes(name)) {
      return false;
    }

    const value = obj[name];

    if (!isFunction$1(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};

/**
 * Converts an array or a delimited string into an object set with values as keys and true as values.
 * Useful for fast membership checks.
 *
 * @param {Array|string} arrayOrString - The array or string to convert.
 * @param {string} delimiter - The delimiter to use if input is a string.
 * @returns {Object} An object with keys from the array or string, values set to true.
 */
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite((value = +value)) ? value : defaultValue;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(
    thing &&
    isFunction$1(thing.append) &&
    thing[toStringTag] === 'FormData' &&
    thing[iterator]
  );
}

/**
 * Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Object} The JSON-compatible object.
 */
const toJSONObject = (obj) => {
  const visited = new WeakSet();

  const visit = (source) => {
    if (isObject(source)) {
      if (visited.has(source)) {
        return;
      }

      //Buffer check
      if (isBuffer(source)) {
        return source;
      }

      if (!('toJSON' in source)) {
        // add-on descent / delete-on-ascent: preserves path semantics, so DAG nodes serialise at every occurrence (see #7230).
        visited.add(source);

        let target;

        if (isSet(source)) {
          target = [];
          for (const value of source) {
            const reducedValue = visit(value);
            !isUndefined(reducedValue) && target.push(reducedValue);
          }
        } else {
          target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
        }

        visited.delete(source);

        return target;
      }
    }

    return source;
  };

  return visit(obj);
};

/**
 * Determines if a value is an async function.
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is an async function, otherwise false.
 */
const isAsyncFn = kindOfTest('AsyncFunction');

/**
 * Determines if a value is thenable (has then and catch methods).
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is thenable, otherwise false.
 */
const isThenable = (thing) =>
  thing &&
  (isObject(thing) || isFunction$1(thing)) &&
  isFunction$1(thing.then) &&
  isFunction$1(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

/**
 * Provides a cross-platform setImmediate implementation.
 * Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
 *
 * @param {boolean} setImmediateSupported - Whether setImmediate is supported.
 * @param {boolean} postMessageSupported - Whether postMessage is supported.
 * @returns {Function} A function to schedule a callback asynchronously.
 */
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported
    ? ((token, callbacks) => {
        _global.addEventListener(
          'message',
          ({ source, data }) => {
            if (source === _global && data === token) {
              callbacks.length && callbacks.shift()();
            }
          },
          false
        );

        return (cb) => {
          callbacks.push(cb);
          _global.postMessage(token, '*');
        };
      })(`axios@${Math.random()}`, [])
    : (cb) => setTimeout(cb);
})(typeof setImmediate === 'function', isFunction$1(_global.postMessage));

/**
 * Schedules a microtask or asynchronous callback as soon as possible.
 * Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
 *
 * @type {Function}
 */
const asap =
  typeof queueMicrotask !== 'undefined'
    ? queueMicrotask.bind(_global)
    : (typeof process !== 'undefined' && process.nextTick) || _setImmediate;

// *********************

const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);

/**
 * Determine if a value is iterable via an iterator that is NOT sourced solely
 * from a polluted Object.prototype. Use this instead of `isIterable` whenever
 * the iterable comes from untrusted input (e.g. user-supplied header sources),
 * so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
 * into an attacker-controlled entries iterator.
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value has a non-polluted iterator
 */
const isSafeIterable = (thing) =>
  thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);

var utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  hasOwnInPrototypeChain,
  getSafeProp,
  toSafeFlatObject,
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable,
  isSafeIterable,
};

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age',
  'authorization',
  'content-length',
  'content-type',
  'etag',
  'expires',
  'from',
  'host',
  'if-modified-since',
  'if-unmodified-since',
  'last-modified',
  'location',
  'max-forwards',
  'proxy-authorization',
  'referer',
  'retry-after',
  'user-agent',
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders &&
    rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      const hasKey = utils$1.hasOwnProp(parsed, key);

      if (!key || (hasKey && utils$1.hasOwnProp(ignoreDuplicateOf, key))) {
        return;
      }

      if (key === 'set-cookie') {
        if (hasKey) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = hasKey ? parsed[key] + ', ' + val : val;
      }
    });

  return parsed;
};

function trimSPorHTAB(str) {
  let start = 0;
  let end = str.length;

  while (start < end) {
    const code = str.charCodeAt(start);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    start += 1;
  }

  while (end > start) {
    const code = str.charCodeAt(end - 1);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    end -= 1;
  }

  return start === 0 && end === str.length ? str : str.slice(start, end);
}

// The control-code ranges are intentional: header sanitization strips C0/DEL bytes.
// eslint-disable-next-line no-control-regex
const INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp('[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+', 'g');
// eslint-disable-next-line no-control-regex
const INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp('[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+', 'g');

function sanitizeValue(value, invalidChars) {
  if (utils$1.isArray(value)) {
    return value.map((item) => sanitizeValue(item, invalidChars));
  }

  return trimSPorHTAB(String(value).replace(invalidChars, ''));
}

const sanitizeHeaderValue = (value) =>
  sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);

const sanitizeByteStringHeaderValue = (value) =>
  sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);

function toByteStringHeaderObject(headers) {
  const byteStringHeaders = Object.create(null);

  utils$1.forEach(headers.toJSON(), (value, header) => {
    byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
  });

  return byteStringHeaders;
}

const $internals$1 = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

function trimOWS(value) {
  let start = 0;
  let end = value.length;

  while (start < end) {
    const code = value.charCodeAt(start);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    start += 1;
  }

  while (end > start) {
    const code = value.charCodeAt(end - 1);

    if (code !== 0x09 && code !== 0x20) {
      break;
    }

    end -= 1;
  }

  return start === 0 && end === value.length ? value : value.slice(start, end);
}

function decodeQuotedString(value) {
  const last = value.length - 1;

  if (last < 1 || value.charCodeAt(0) !== 0x22 || value.charCodeAt(last) !== 0x22) {
    return value;
  }

  let decoded = '';

  for (let i = 1; i < last; i++) {
    const code = value.charCodeAt(i);

    if (code === 0x22) {
      return value;
    }

    if (code === 0x5c) {
      i += 1;

      if (i >= last) {
        return value;
      }
    }

    decoded += value[i];
  }

  return decoded;
}

function parseParameters(value) {
  const parameters = Object.create(null);
  const str = String(value);
  let start = 0;
  let quoted = false;
  let escaped = false;

  function parseParameter(end) {
    const part = trimOWS(str.slice(start, end));
    const equals = part.indexOf('=');

    if (equals < 1) {
      return;
    }

    const name = trimOWS(part.slice(0, equals));

    if (!parameterNameRE.test(name)) {
      return;
    }

    const normalizedName = name.toLowerCase();

    if (
      normalizedName === '__proto__' ||
      normalizedName === 'constructor' ||
      normalizedName === 'prototype'
    ) {
      return;
    }

    const parameterValue = trimOWS(part.slice(equals + 1));
    parameters[normalizedName] = decodeQuotedString(parameterValue);
  }

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);

    if (quoted) {
      if (escaped) {
        escaped = false;
      } else if (code === 0x5c) {
        escaped = true;
      } else if (code === 0x22) {
        quoted = false;
      }
    } else if (code === 0x22) {
      quoted = true;
    } else if (code === 0x2c || code === 0x3b) {
      parseParameter(i);
      start = i + 1;
    }
  }

  parseParameter(str.length);

  return parameters;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: function (arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true,
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        return;
      }

      const key = utils$1.findKey(self, lHeader);

      if (
        !key ||
        self[key] === undefined ||
        _rewrite === true ||
        (_rewrite === undefined && self[key] !== false)
      ) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isSafeIterable(header)) {
      let obj = Object.create(null),
        dest,
        key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw new TypeError('Object iterator must return a key-value pair');
        }

        key = entry[0];

        if (utils$1.hasOwnProp(obj, key)) {
          dest = obj[key];
          obj[key] = utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
        } else {
          obj[key] = entry[1];
        }
      }

      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(
        key &&
        this[key] !== undefined &&
        (!matcher || matchHeaderValue(this, this[key], key, matcher))
      );
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null &&
        value !== false &&
        (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON())
      .map(([header, value]) => header + ': ' + value)
      .join('\n');
  }

  getSetCookie() {
    const value = this.get('set-cookie');
    return utils$1.isArray(value) ? value : value == null || value === false ? [] : [value];
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static parseParameters(value) {
    return parseParameters(value);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals =
      (this[$internals$1] =
      this[$internals$1] =
        {
          accessors: {},
        });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    },
  };
});

utils$1.freezeMethods(AxiosHeaders);

const REDACTED = '[REDACTED ****]';

function hasOwnOrPrototypeToJSON(source) {
  if (utils$1.hasOwnProp(source, 'toJSON')) {
    return true;
  }

  let prototype = Object.getPrototypeOf(source);

  while (prototype && prototype !== Object.prototype) {
    if (utils$1.hasOwnProp(prototype, 'toJSON')) {
      return true;
    }

    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
}

// Build a plain-object snapshot of `config` and replace the value of any key
// (case-insensitive) listed in `redactKeys` with REDACTED. Walks through arrays
// and AxiosHeaders, and short-circuits on circular references.
function redactConfig(config, redactKeys) {
  const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
  const seen = [];

  const visit = (source) => {
    if (source === null || typeof source !== 'object') return source;
    if (utils$1.isBuffer(source)) return source;
    if (seen.indexOf(source) !== -1) return undefined;

    if (source instanceof AxiosHeaders) {
      source = source.toJSON();
    }

    seen.push(source);

    let result;
    if (utils$1.isArray(source)) {
      result = [];
      source.forEach((v, i) => {
        const reducedValue = visit(v);
        if (!utils$1.isUndefined(reducedValue)) {
          result[i] = reducedValue;
        }
      });
    } else {
      if (!utils$1.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
        seen.pop();
        return source;
      }

      result = Object.create(null);
      for (const [key, value] of Object.entries(source)) {
        const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
        if (!utils$1.isUndefined(reducedValue)) {
          result[key] = reducedValue;
        }
      }
    }

    seen.pop();
    return result;
  };

  return visit(config);
}

function stringifySafely$1(value) {
  try {
    return String(value);
  } catch (err) {
    return '';
  }
}

function aggregateErrorMessage(error) {
  const message = error.errors
    .map((entry) => {
      try {
        return entry && entry.message ? stringifySafely$1(entry.message) : stringifySafely$1(entry);
      } catch (err) {
        return '';
      }
    })
    .filter(Boolean)
    .join('; ');

  return message || error.name || 'AggregateError';
}

class AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    // `AggregateError` (thrown by Node on dual-stack/Happy-Eyeballs connection
    // failures) has an empty `message`; its detail lives in `errors[]`. Without
    // this, the wrapped error surfaces with a blank message (see #6721).
    let message = error.message;
    if (!message && utils$1.isArray(error.errors) && error.errors.length) {
      message = aggregateErrorMessage(error);
    }

    const axiosError = new AxiosError(message, code || error.code, config, request, response);
    // Match native `Error` `cause` semantics: non-enumerable. The wrapped
    // error often carries circular internals (sockets, requests, agents), so
    // an enumerable `cause` makes structured loggers (pino/winston) and any
    // own-property walk throw "Converting circular structure to JSON".
    // Regression from #6982; see #7205. `__proto__: null` mirrors the
    // `message` descriptor below (prototype-pollution-safe descriptor).
    Object.defineProperty(axiosError, 'cause', {
      __proto__: null,
      value: error,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    axiosError.name = error.name;

    // Preserve status from the original error if not already set from response
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }

    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code, config, request, response) {
    super(message);

    // Make message enumerable to maintain backward compatibility
    // The native Error constructor sets message as non-enumerable,
    // but axios < v1.13.3 had it as enumerable
    Object.defineProperty(this, 'message', {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: message,
      enumerable: true,
      writable: true,
      configurable: true,
    });

    this.name = 'AxiosError';
    this.isAxiosError = true;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }

  toJSON() {
    // Opt-in redaction: when the request config carries a `redact` array, the
    // value of any matching key (case-insensitive, at any depth) is replaced
    // with REDACTED in the serialized snapshot. Undefined or empty leaves the
    // existing serialization behavior unchanged.
    const config = this.config;
    const redactKeys = config && utils$1.hasOwnProp(config, 'redact') ? config.redact : undefined;
    const serializedConfig =
      utils$1.isArray(redactKeys) && redactKeys.length > 0
        ? redactConfig(config, redactKeys)
        : utils$1.toJSONObject(config);

    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: serializedConfig,
      code: this.code,
      status: this.status,
    };
  }
}

// This can be changed to static properties as soon as the parser options in .eslint.cjs are updated.
AxiosError.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
AxiosError.ERR_BAD_OPTION = 'ERR_BAD_OPTION';
AxiosError.ECONNABORTED = 'ECONNABORTED';
AxiosError.ETIMEDOUT = 'ETIMEDOUT';
AxiosError.ECONNREFUSED = 'ECONNREFUSED';
AxiosError.ERR_NETWORK = 'ERR_NETWORK';
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
AxiosError.ERR_DEPRECATED = 'ERR_DEPRECATED';
AxiosError.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
AxiosError.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
AxiosError.ERR_CANCELED = 'ERR_CANCELED';
AxiosError.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
AxiosError.ERR_INVALID_URL = 'ERR_INVALID_URL';
AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED';

// eslint-disable-next-line strict
var httpAdapter = null;

// Default nesting limit shared with the inverse transform (formDataToJSON) so
// the FormData <-> JSON round-trip stays symmetric.
const DEFAULT_FORM_DATA_MAX_DEPTH = 100;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path
    .concat(key)
    .map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    })
    .join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  const option = (name, fallback) => {
    const value = utils$1.getSafeProp(options, name);
    return utils$1.isUndefined(value) ? fallback : value;
  };

  const metaTokens = option('metaTokens', true);
  // eslint-disable-next-line no-use-before-define
  const visitor = option('visitor') || defaultVisitor;
  const dots = option('dots', false);
  const indexes = option('indexes', false);
  const _Blob = option('Blob') || (typeof Blob !== 'undefined' && Blob);
  const maxDepth = option('maxDepth', DEFAULT_FORM_DATA_MAX_DEPTH);
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  const stack = [];

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (utils$1.isBoolean(value)) {
      return value.toString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      if (useBlob && typeof _Blob === 'function') {
        return new _Blob([value]);
      }
      throw new AxiosError(
        'Blob is not supported. Use a Buffer instead.',
        AxiosError.ERR_NOT_SUPPORT
      );
    }

    return value;
  }

  function throwIfMaxDepthExceeded(depth) {
    if (depth > maxDepth) {
      throw new AxiosError(
        'Object is too deeply nested (' + depth + ' levels). Max depth: ' + maxDepth,
        AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
    }
  }

  function stringifyWithDepthLimit(value, depth) {
    if (maxDepth === Infinity) {
      return JSON.stringify(value);
    }

    const ancestors = [];

    return JSON.stringify(value, function limitDepth(_key, currentValue) {
      if (!utils$1.isObject(currentValue)) {
        return currentValue;
      }

      while (ancestors.length && ancestors[ancestors.length - 1] !== this) {
        ancestors.pop();
      }

      ancestors.push(currentValue);
      throwIfMaxDepthExceeded(depth + ancestors.length - 1);

      return currentValue;
    });
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = stringifyWithDepthLimit(value, 1);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value)))
      ) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) &&
            formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true
                ? renderKey([key], index, dots)
                : indexes === null
                  ? key
                  : key + '[]',
              convertValue(el)
            );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable,
  });

  function build(value, path, depth = 0) {
    if (utils$1.isUndefined(value)) return;

    throwIfMaxDepthExceeded(depth);

    if (stack.indexOf(value) !== -1) {
      throw new Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result =
        !(utils$1.isUndefined(el) || el === null) &&
        visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);

      if (result === true) {
        build(el, path ? path.concat(key) : [key], depth + 1);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder
    ? (value) => encoder.call(this, value, encode$1)
    : encode$1;

  return this._pairs
    .map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '')
    .join('&');
};

/**
 * It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
 * their plain counterparts (`:`, `$`, `,`, `+`).
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  url = url || '';

  const _options = utils$1.isFunction(options)
    ? {
        serialize: options,
      }
    : options;

  // Read serializer options pollution-safely: own properties and methods on a
  // class/template prototype are honored, but values injected onto a polluted
  // Object.prototype are ignored.
  const _encode = utils$1.getSafeProp(_options, 'encode') || encode;
  const serializeFn = utils$1.getSafeProp(_options, 'serialize');

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params)
      ? params.toString()
      : new AxiosURLSearchParams(params, _options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

const $internals = Symbol('internals');

// `handlers` is public and may be replaced with a nullish value by user code;
// `clear()` has always tolerated that. Treat it as an empty stack rather than
// dereferencing it.
function countHandlers(handlers) {
  return handlers ? handlers.length : 0;
}

function trimHandlers(handlers) {
  if (!handlers) {
    return;
  }

  while (handlers.length && handlers[handlers.length - 1] === null) {
    handlers.pop();
  }
}

function syncHandlerEntries(manager, internals) {
  const handlers = manager.handlers;
  const length = countHandlers(handlers);

  if (handlers !== internals.handlersRef) {
    internals.handlersRef = handlers;
    internals.handlerEntries.clear();
  } else if (length !== internals.handlersLength) {
    if (!length) {
      internals.handlerEntries.clear();
    } else {
      internals.handlerEntries.forEach(function removeStaleEntry(entry, id) {
        if (handlers[entry.index] !== entry.handler) {
          internals.handlerEntries.delete(id);
        }
      });
    }
  }

  internals.handlersLength = length;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
    this[$internals] = {
      handlersRef: this.handlers,
      handlersLength: this.handlers.length,
      handlerEntries: new Map(),
      iterationDepth: 0,
      nextId: 0,
    };
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    const handler = {
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    };
    const internals = this[$internals];

    if (this.handlers == null) {
      this.handlers = [];
    }

    syncHandlerEntries(this, internals);

    const id = internals.nextId++;

    this.handlers.push(handler);
    internals.handlerEntries.set(id, {
      handler,
      index: this.handlers.length - 1,
    });
    internals.handlersLength = this.handlers.length;

    return id;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    const internals = this[$internals];

    syncHandlerEntries(this, internals);

    const entry = internals.handlerEntries.get(id);

    if (entry) {
      internals.handlerEntries.delete(id);

      // Ignore IDs invalidated by clear or direct replacement of handlers.
      if (this.handlers[entry.index] !== entry.handler) {
        return;
      }

      this.handlers[entry.index] = null;

      // Do not reuse an index while forEach is walking its length snapshot.
      if (!internals.iterationDepth) {
        trimHandlers(this.handlers);
        internals.handlersLength = this.handlers.length;
      }
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
      syncHandlerEntries(this, this[$internals]);
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    const internals = this[$internals];

    syncHandlerEntries(this, internals);

    internals.iterationDepth++;

    try {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    } finally {
      if (!--internals.iterationDepth) {
        syncHandlerEntries(this, internals);
        trimHandlers(this.handlers);
        internals.handlersLength = countHandlers(this.handlers);
      }
    }
  }
}

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true,
  advertiseZstdAcceptEncoding: false,
  validateStatusUndefinedResolves: true,
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

var platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1,
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = (typeof navigator === 'object' && navigator) || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv =
  hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = (hasBrowserEnv && window.location.href) || 'http://localhost';

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasBrowserEnv: hasBrowserEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin: origin
});

var platform = {
  ...utils,
  ...platform$1,
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), {
    visitor: function (value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options,
  });
}

const MAX_DEPTH = DEFAULT_FORM_DATA_MAX_DEPTH;

function throwIfDepthExceeded(index) {
  if (index > MAX_DEPTH) {
    throw new AxiosError(
      'FormData field is too deeply nested (' + index + ' levels). Max depth: ' + MAX_DEPTH,
      AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED
    );
  }
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z] -> ['foo', 'x', 'y', 'z']
  // foo.x.y.z    -> ['foo', 'x', 'y', 'z']
  // A path is split on `.` and on `[...]` groups. A segment — whether written
  // in dot notation or captured inside brackets — may contain any character
  // except `.`, `[` and `]`, so a key like `user-name` or `user name` is kept
  // literal instead of being split (#5402). `.`, `[` and `]` keep their existing
  // meaning, e.g. `foo[bar.baz]` -> ['foo', 'bar', 'baz'] and `[]` is an array push.
  // Excluding `[` from the bracket group also makes the match fail fast at the
  // next `[`, so a malformed name cannot rescan to the end of the string from
  // every unmatched `[` — parsing stays linear in the length of the name.
  const path = [];
  const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
  let match;

  while ((match = pattern.exec(name)) !== null) {
    throwIfDepthExceeded(path.length);
    path.push(match[0] === '[]' ? '' : match[1] || match[0]);
  }

  return path;
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    throwIfDepthExceeded(index);

    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = utils$1.isArray(target[name])
          ? target[name].concat(value)
          : [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!utils$1.hasOwnProp(target, name) || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

const methodList = Object.freeze([
  'get',
  'delete',
  'head',
  'options',
  'post',
  'put',
  'patch',
  'purge',
  'link',
  'unlink',
  'query',
]);

const own = (obj, key) => (obj != null && utils$1.hasOwnProp(obj, key) ? obj[key] : undefined);

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {
  transitional: transitionalDefaults,

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = utils$1.isObject(data);

      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = utils$1.isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }

      if (
        utils$1.isArrayBuffer(data) ||
        utils$1.isBuffer(data) ||
        utils$1.isStream(data) ||
        utils$1.isFile(data) ||
        utils$1.isBlob(data) ||
        utils$1.isReadableStream(data)
      ) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        const formSerializer = own(this, 'formSerializer');
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, formSerializer).toString();
        }

        if (
          (isFileList = utils$1.isFileList(data)) ||
          contentType.indexOf('multipart/form-data') > -1
        ) {
          const env = own(this, 'env');
          const _FormData = env && env.FormData;

          return toFormData(
            isFileList ? { 'files[]': data } : data,
            _FormData && new _FormData(),
            formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    },
  ],

  transformResponse: [
    function transformResponse(data) {
      const transitional = own(this, 'transitional') || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const responseType = own(this, 'responseType');
      const JSONRequested = responseType === 'json';

      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }

      if (
        data &&
        utils$1.isString(data) &&
        ((forcedJSONParsing && !responseType) || JSONRequested)
      ) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;

        try {
          return JSON.parse(data, own(this, 'parseReviver'));
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, own(this, 'response'));
            }
            throw e;
          }
        }
      }

      return data;
    },
  ],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob,
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': undefined,
    },
  },
};

utils$1.forEach(methodList, (method) => {
  defaults.headers[method] = {};
});

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

class CanceledError extends AxiosError {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
    this.__CANCEL__ = true;
  }
}

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      response.status >= 400 && response.status < 500 ? AxiosError.ERR_BAD_REQUEST : AxiosError.ERR_BAD_RESPONSE,
      response.config,
      response.request,
      response
    ));
  }
}

const urlParserControlCharacters = /[\t\n\r]/g;

/**
 * Match WHATWG URL preprocessing before checking a URL's protocol.
 *
 * @param {string} url
 *
 * @returns {string}
 */
function normalizeURLForProtocolCheck(url) {
  if (typeof url !== 'string') {
    return url;
  }

  let start = 0;

  while (start < url.length && url.charCodeAt(start) <= 0x20) {
    start++;
  }

  return url.slice(start).replace(urlParserControlCharacters, '');
}

function parseProtocol(url) {
  const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
  return (match && match[1]) || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round((bytesCount * 1000) / passed) : undefined;
  };
}

/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Array<Function>}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };

  const flush = () => lastArgs && invoke(lastArgs);
  const flushWith = (...args) => invoke(args);

  return [throttled, flush, flushWith];
}

const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return throttle((e) => {
    if (!e || !utils$1.isNumber(e.loaded)) {
      return;
    }
    const rawLoaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
    const progressBytes = Math.max(0, loaded - bytesNotified);
    const rate = _speedometer(progressBytes);

    bytesNotified = Math.max(bytesNotified, loaded);

    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true,
    };

    listener(data);
  }, freq);
};

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [
    (loaded) =>
      throttled[0]({
        lengthComputable,
        total,
        loaded,
      }),
    throttled[1],
  ];
};

const asyncDecorator =
  (fn, scheduler = utils$1.asap) =>
  (...args) =>
    scheduler(() => fn(...args));

var isURLSameOrigin = platform.hasStandardBrowserEnv
  ? ((origin, isMSIE) => (url) => {
      url = new URL(url, platform.origin);

      return (
        origin.protocol === url.protocol &&
        origin.host === url.host &&
        (isMSIE || origin.port === url.port)
      );
    })(
      new URL(platform.origin),
      platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
    )
  : () => true;

var cookies = platform.hasStandardBrowserEnv
  ? // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === 'undefined') return;

        const cookie = [`${name}=${encodeURIComponent(value)}`];

        if (utils$1.isNumber(expires)) {
          cookie.push(`expires=${new Date(expires).toUTCString()}`);
        }
        if (utils$1.isString(path)) {
          cookie.push(`path=${path}`);
        }
        if (utils$1.isString(domain)) {
          cookie.push(`domain=${domain}`);
        }
        if (secure === true) {
          cookie.push('secure');
        }
        if (utils$1.isString(sameSite)) {
          cookie.push(`SameSite=${sameSite}`);
        }

        document.cookie = cookie.join('; ');
      },

      read(name) {
        if (typeof document === 'undefined') return null;
        // Match name=value by splitting on the semicolon separator instead of building a
        // RegExp from `name` — interpolating an unescaped string into a RegExp would let
        // metacharacters (e.g. `.+?` in an attacker-influenced cookie name) cause ReDoS or
        // match the wrong cookie. Browsers may serialize cookie pairs as either ";" or
        // "; ", so ignore optional whitespace before each cookie name.
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].replace(/^\s+/, '');
          const eq = cookie.indexOf('=');
          if (eq !== -1 && cookie.slice(0, eq) === name) {
            try {
              return decodeURIComponent(cookie.slice(eq + 1));
            } catch (e) {
              return cookie.slice(eq + 1);
            }
          }
        }
        return null;
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000, '/');
      },
    }
  : // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      remove() {},
    };

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  if (typeof url !== 'string') {
    return false;
  }

  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  if (!relativeURL) {
    return baseURL;
  }

  let end = baseURL.length;

  while (end > 0 && baseURL.charCodeAt(end - 1) === 47) {
    end--;
  }

  return baseURL.slice(0, end) + '/' + relativeURL.replace(/^\/+/, '');
}

const malformedHttpProtocol = /^https?:(?!\/\/)/i;

// Redact the parts of a URL that can carry secrets before it is embedded in an
// error message. AxiosError.toJSON() serializes `message` verbatim and errors
// are commonly logged, while the opt-in `config.redact` model only cleans
// config keys — it cannot reach the message. Redact only the genuinely
// sensitive substrings — userinfo (credentials), query parameter values and
// fragment contents — with the same REDACTED marker the config redaction uses,
// while keeping the scheme, host, path and parameter names so the offending
// request stays accurately identifiable.
function redactFragment(fragment) {
  if (!fragment) {
    return fragment;
  }

  return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = '') => {
    return `${separator}${parameterName}${REDACTED}`;
  });
}

function redactSensitiveURLParts(url) {
  const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${REDACTED}@`);
  const fragmentIndex = redactedURL.indexOf('#');
  const urlWithoutFragment =
    fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex);
  const redactedURLWithoutFragment = urlWithoutFragment.replace(
    /([?&][^=&#]*=)[^&#]*/g,
    `$1${REDACTED}`
  );

  if (fragmentIndex === -1) {
    return redactedURLWithoutFragment;
  }

  return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
}

function assertValidHttpProtocolURL(url, config) {
  if (typeof url === 'string') {
    const normalizedURL = normalizeURLForProtocolCheck(url);
    if (malformedHttpProtocol.test(normalizedURL)) {
      throw new AxiosError(
        `Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`,
        AxiosError.ERR_INVALID_URL,
        config
      );
    }
  }
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
  assertValidHttpProtocolURL(requestedURL, config);
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
    assertValidHttpProtocolURL(baseURL, config);
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

const headersToObject = (thing) => (thing instanceof AxiosHeaders ? { ...thing } : thing);

const ownEnumerableKeys = (thing) => {
  if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) {
    return Object.keys(thing).concat(
      Object.getOwnPropertySymbols(thing).filter(
        (symbol) => Object.getOwnPropertyDescriptor(thing, symbol).enumerable
      )
    );
  }
  return Object.keys(thing);
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config1 = config1 || {};
  config2 = config2 || {};

  // Use a null-prototype object so that downstream reads such as `config.auth`
  // or `config.baseURL` cannot inherit polluted values from Object.prototype.
  // `hasOwnProperty` is restored as a non-enumerable own slot to preserve
  // ergonomics for user code that relies on it.
  const config = Object.create(null);
  Object.defineProperty(config, 'hasOwnProperty', {
    // Null-proto descriptor so a polluted Object.prototype.get cannot turn
    // this data descriptor into an accessor descriptor on the way in.
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: false,
    writable: true,
    configurable: true,
  });

  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, prop, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  function getMergedTransitionalOption(prop) {
    const transitional2 = utils$1.hasOwnProp(config2, 'transitional')
      ? config2.transitional
      : undefined;

    if (!utils$1.isUndefined(transitional2)) {
      if (utils$1.isPlainObject(transitional2)) {
        if (utils$1.hasOwnProp(transitional2, prop)) {
          return transitional2[prop];
        }
      } else {
        return undefined;
      }
    }

    const transitional1 = utils$1.hasOwnProp(config1, 'transitional')
      ? config1.transitional
      : undefined;

    if (utils$1.isPlainObject(transitional1) && utils$1.hasOwnProp(transitional1, prop)) {
      return transitional1[prop];
    }

    return undefined;
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (utils$1.hasOwnProp(config2, prop)) {
      return getMergedValue(a, b);
    } else if (utils$1.hasOwnProp(config1, prop)) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutErrorMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    allowedSocketPaths: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) =>
      mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true),
  };

  utils$1.forEach(ownEnumerableKeys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') return;
    const merge = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const a = utils$1.hasOwnProp(config1, prop) ? config1[prop] : undefined;
    const b = utils$1.hasOwnProp(config2, prop) ? config2[prop] : undefined;
    const configValue = merge(a, b, prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  if (
    utils$1.hasOwnProp(config2, 'validateStatus') &&
    utils$1.isUndefined(config2.validateStatus) &&
    getMergedTransitionalOption('validateStatusUndefinedResolves') === false
  ) {
    if (utils$1.hasOwnProp(config1, 'validateStatus')) {
      config.validateStatus = getMergedValue(undefined, config1.validateStatus);
    } else {
      delete config.validateStatus;
    }
  }

  return config;
}

const FORM_DATA_CONTENT_HEADERS = ['content-type', 'content-length'];

/**
 * Apply the headers generated by a FormData implementation to the request headers,
 * honoring the `formDataHeaderPolicy` option: with 'content-only', copy only the
 * content-* headers; otherwise merge all of them.
 *
 * @param {AxiosHeaders} headers - the request headers to mutate
 * @param {Object | null | undefined} formHeaders - headers produced by the FormData implementation
 * @param {String} [policy] - the resolved `formDataHeaderPolicy` config value
 *
 * @returns {void}
 */
function setFormDataHeaders(headers, formHeaders, policy) {
  if (policy !== 'content-only') {
    headers.set(formHeaders);
    return;
  }

  Object.entries(formHeaders || {}).forEach(([key, val]) => {
    if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
      headers.set(key, val);
    }
  });
}

/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */
const encodeUTF8$1 = (str) =>
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

function resolveConfig(config) {
  const newConfig = mergeConfig({}, config);

  // Read only own properties to prevent prototype pollution gadgets
  // (e.g. Object.prototype.baseURL = 'https://evil.com').
  const own = (key) => (utils$1.hasOwnProp(newConfig, key) ? newConfig[key] : undefined);

  const data = own('data');
  let withXSRFToken = own('withXSRFToken');
  const xsrfHeaderName = own('xsrfHeaderName');
  const xsrfCookieName = own('xsrfCookieName');
  let headers = own('headers');
  const auth = own('auth');
  const baseURL = own('baseURL');
  const allowAbsoluteUrls = own('allowAbsoluteUrls');
  const url = own('url');

  newConfig.headers = headers = AxiosHeaders.from(headers);

  newConfig.url = buildURL(
    buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig),
    own('params'),
    own('paramsSerializer')
  );

  // HTTP basic authentication
  if (auth) {
    const username = utils$1.getSafeProp(auth, 'username') || '';
    const password = utils$1.getSafeProp(auth, 'password') || '';

    try {
      headers.set(
        'Authorization',
        'Basic ' + btoa(username + ':' + (password ? encodeUTF8$1(password) : ''))
      );
    } catch (e) {
      throw AxiosError.from(e, AxiosError.ERR_BAD_OPTION_VALUE, config);
    }
  }

  if (utils$1.isFormData(data)) {
    const getHeaders = utils$1.getSafeProp(data, 'getHeaders');

    if (
      platform.hasStandardBrowserEnv ||
      platform.hasStandardBrowserWebWorkerEnv ||
      utils$1.isReactNative(data)
    ) {
      headers.setContentType(undefined); // browser/web worker/RN handles it
    } else if (utils$1.isFunction(getHeaders)) {
      // Node.js FormData (like form-data package)
      setFormDataHeaders(headers, getHeaders.call(data), own('formDataHeaderPolicy'));
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (platform.hasStandardBrowserEnv) {
    if (utils$1.isFunction(withXSRFToken)) {
      withXSRFToken = withXSRFToken(newConfig);
    }

    // Strict boolean check — prevents proto-pollution gadgets (e.g. Object.prototype.withXSRFToken = 1)
    // and misconfigurations (e.g. "false") from short-circuiting the same-origin check and leaking
    // the XSRF token cross-origin.
    const shouldSendXSRF =
      withXSRFToken === true || (withXSRFToken == null && isURLSameOrigin(newConfig.url));

    if (shouldSendXSRF) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported &&
  function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload, flushDownloadWithEvent;

      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }

      let request = new XMLHttpRequest();

      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;

      function onloadend(event) {
        if (!request) {
          return;
        }

        // Status 0 means no response was received, which onerror and onabort normally
        // reject before this runs. Firefox 152 fires only readystatechange and loadend for
        // navigation-canceled requests (https://bugzilla.mozilla.org/show_bug.cgi?id=1505389),
        // leaving settle() to resolve them as an empty success. ECONNABORTED is the error
        // onabort raised on Firefox 151. Reads over file:, which some environments report as
        // status 0 on success, are excluded by the request URL's scheme after browser-style
        // preprocessing, by the page origin's scheme for relative URLs (which inherit it), or
        // by responseURL where implemented.
        if (
          request.status === 0 &&
          (parseProtocol(normalizeURLForProtocolCheck(_config.url)) ||
            parseProtocol(platform.origin)) !== 'file' &&
          !(request.responseURL && request.responseURL.startsWith('file:'))
        ) {
          reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));
          done();

          // Clean up request
          request = null;
          return;
        }

        // When loadend is still dispatching, flushing with it gives progress
        // listeners a final delivery whose event has a live target. The legacy
        // ready-state fallback has no event, so replay its pending progress.
        // A throwing listener must not block settlement; rethrow asynchronously,
        // matching how listener errors surface on the throttle timer path.
        try {
          if (event) {
            flushDownloadWithEvent && flushDownloadWithEvent(event);
          } else {
            flushDownload && flushDownload();
          }
        } catch (err) {
          setTimeout(() => {
            throw err;
          });
        }

        // A final progress callback can cancel the request synchronously.
        if (!request) {
          return;
        }

        // Prepare the response
        const responseHeaders = AxiosHeaders.from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData =
          !responseType || responseType === 'text' || responseType === 'json'
            ? request.responseText
            : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request,
        };

        settle(
          function _resolve(value) {
            resolve(value);
            done();
          },
          function _reject(err) {
            reject(err);
            done();
          },
          response
        );

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (
            request.status === 0 &&
            !(request.responseURL && request.responseURL.startsWith('file:'))
          ) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));
        done();

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError(event) {
        // Browsers deliver a ProgressEvent in XHR onerror
        // (message may be empty; when present, surface it)
        // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
        const msg = event && event.message ? event.message : 'Network Error';
        const err = new AxiosError(msg, AxiosError.ERR_NETWORK, config, request);
        // attach the underlying event for consumers who want details
        err.event = event || null;
        reject(err);
        done();
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout
          ? 'timeout of ' + _config.timeout + 'ms exceeded'
          : 'timeout exceeded';
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(
          new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          )
        );
        done();

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$1.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload, flushDownloadWithEvent] = progressEventReducer(
          onDownloadProgress,
          true
        );
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);

        request.upload.addEventListener('progress', uploadThrottled);

        request.upload.addEventListener('loadend', flushUpload);
      }

      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          done();
          request = null;
        };

        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted
            ? onCanceled()
            : _config.signal.addEventListener('abort', onCanceled);
        }
      }

      const protocol = parseProtocol(_config.url);

      if (protocol && !platform.protocols.includes(protocol)) {
        reject(
          new AxiosError(
            'Unsupported protocol ' + protocol + ':',
            AxiosError.ERR_BAD_REQUEST,
            config
          )
        );
        done();
        return;
      }

      // Send the request
      request.send(requestData || null);
    });
  };

const composeSignals = (signals, timeout) => {
  signals = signals ? signals.filter(Boolean) : [];

  if (!timeout && !signals.length) {
    return;
  }

  const controller = new AbortController();

  let aborted = false;

  const onabort = function (reason) {
    if (!aborted) {
      aborted = true;
      unsubscribe();
      const err = reason instanceof Error ? reason : this.reason;
      controller.abort(
        err instanceof AxiosError
          ? err
          : new CanceledError(err instanceof Error ? err.message : err)
      );
    }
  };

  let timer =
    timeout &&
    setTimeout(() => {
      timer = null;
      onabort(new AxiosError(`timeout of ${timeout}ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);

  const unsubscribe = () => {
    if (!signals) { return; }
    timer && clearTimeout(timer);
    timer = null;
    signals.forEach((signal) => {
      signal.unsubscribe
        ? signal.unsubscribe(onabort)
        : signal.removeEventListener('abort', onabort);
    });
    signals = null;
  };

  signals.forEach((signal) => {
    if (aborted) {
      return;
    }

    if (signal.aborted) {
      onabort.call(signal);
      return;
    }

    signal.addEventListener('abort', onabort, { once: true });
  });

  const { signal } = controller;

  signal.unsubscribe = () => utils$1.asap(unsubscribe);

  return signal;
};

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };

  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done, value } = await iterator.next();

          if (done) {
            _onFinish();
            controller.close();
            return;
          }

          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = (bytes += len);
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      },
    },
    {
      highWaterMark: 2,
    }
  );
};

/**
 * Estimate data: URL byte lengths *without* allocating large buffers.
 * - Fetch percent-decodes a base64 body before decoding it.
 * - Node's Buffer.from(body, 'base64') sizes its backing allocation from the
 *   raw body, including ignored characters and content after padding.
 * - Non-base64 data is percent-decoded and then encoded as UTF-8.
 */
const isHexDigit = (charCode) =>
  (charCode >= 48 && charCode <= 57) ||
  (charCode >= 65 && charCode <= 70) ||
  (charCode >= 97 && charCode <= 102);

const isPercentEncodedByte = (str, i, len) =>
  i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));

const hexValue = (charCode) => (charCode <= 57 ? charCode - 48 : (charCode & 0xdf) - 55);

const isBase64Char = (charCode) =>
  (charCode >= 65 && charCode <= 90) || // A-Z
  (charCode >= 97 && charCode <= 122) || // a-z
  (charCode >= 48 && charCode <= 57) || // 0-9
  charCode === 43 || // +
  charCode === 47 || // /
  charCode === 45 || // - (base64url)
  charCode === 95; // _ (base64url)

const isBase64Whitespace = (charCode) =>
  charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;

const base64Bytes = (significant) => {
  const groups = Math.floor(significant / 4);
  const remainder = significant % 4;
  return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
};

// Buffer.byteLength(body, 'base64') uses the raw string length as an allocation
// upper bound even when Buffer.from later ignores characters or stops at '='.
const estimateBase64BufferAllocation = (body) => {
  const len = body.length;
  let padding = 0;

  if (len > 0 && body.charCodeAt(len - 1) === 61 /* '=' */) {
    padding++;

    if (len > 1 && body.charCodeAt(len - 2) === 61 /* '=' */) {
      padding++;
    }
  }

  return Math.floor(((len - padding) * 3) / 4);
};

const estimatePercentDecodedBase64Bytes = (body) => {
  const len = body.length;
  let significant = 0;
  let padding = 0;
  let invalid = false;

  for (let i = 0; i < len; i++) {
    let code = body.charCodeAt(i);

    if (code === 37 /* '%' */ && isPercentEncodedByte(body, i, len)) {
      code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
      i += 2;
    }

    if (isBase64Whitespace(code)) {
      continue;
    }

    if (code === 61 /* '=' */) {
      padding++;
      continue;
    }

    if (!isBase64Char(code) || padding > 0) {
      invalid = true;
      continue;
    }

    significant++;
  }

  // Fetch rejects malformed forgiving-base64 input. Returning the raw-size
  // allocation bound keeps that invalid input from becoming a pre-check bypass.
  if (
    invalid ||
    padding > 2 ||
    (padding > 0 && (significant + padding) % 4 !== 0) ||
    significant % 4 === 1
  ) {
    return estimateBase64BufferAllocation(body);
  }

  return base64Bytes(significant);
};

const estimateDataURLBytes = (url, estimateBase64) => {
  if (!url || typeof url !== 'string') return 0;
  if (!url.startsWith('data:')) return 0;

  const comma = url.indexOf(',');
  if (comma < 0) return 0;

  const meta = url.slice(5, comma);
  const body = url.slice(comma + 1);
  const isBase64 = /;base64/i.test(meta);

  if (isBase64) {
    return estimateBase64(body);
  }

  // Compute UTF-8 byte length directly from UTF-16 code units without allocating
  // a byte buffer (TextEncoder.encode would defeat the DoS guard on large bodies).
  // Valid %XX triplets count as one decoded byte; this matches the bytes that
  // decodeURIComponent(body) would produce before Buffer re-encodes the string.
  let bytes = 0;
  for (let i = 0, len = body.length; i < len; i++) {
    const c = body.charCodeAt(i);
    if (c === 37 /* '%' */ && isPercentEncodedByte(body, i, len)) {
      bytes += 1;
      i += 2;
    } else if (c < 0x80) {
      bytes += 1;
    } else if (c < 0x800) {
      bytes += 2;
    } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < len) {
      const next = body.charCodeAt(i + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        bytes += 4;
        i++;
      } else {
        bytes += 3;
      }
    } else {
      bytes += 3;
    }
  }
  return bytes;
};

/**
 * Estimate the percent-decoded payload size used by Fetch data: URLs.
 *
 * @param {string} url
 * @returns {number}
 */
function estimateDataURLDecodedBytes(url) {
  // Fetch removes URL fragments before processing a data: URL.
  const fragmentIndex = typeof url === 'string' ? url.indexOf('#') : -1;

  return estimateDataURLBytes(
    fragmentIndex === -1 ? url : url.slice(0, fragmentIndex),
    estimatePercentDecodedBase64Bytes
  );
}

const VERSION = "1.20.0";

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const DEFAULT_REQUEST_OPTIONS = {
  cache: 'default',
  redirect: 'follow',
  referrer: 'about:client',
  referrerPolicy: '',
  mode: 'cors',
  integrity: '',
  keepalive: false,
  priority: 'auto',
  window: null,
};

const { isFunction } = utils$1;

/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */
const encodeUTF8 = (str) =>
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

// Node's WHATWG URL parser returns `username` and `password` percent-encoded.
// Decode before composing the `auth` option so credentials such as
// `my%40email.com:pass` are sent as `my@email.com:pass`. Falls back to the
// original value for malformed input so a bad encoding never throws.
const decodeURIComponentSafe = (value) => {
  if (!utils$1.isString(value)) {
    return value;
  }

  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};

const maybeWithAuthCredentials = (url) => {
  const protocolIndex = url.indexOf('://');
  let urlToCheck = url;
  if (protocolIndex !== -1) {
    urlToCheck = urlToCheck.slice(protocolIndex + 3);
  }
  return urlToCheck.includes('@') || urlToCheck.includes(':');
};

const factory = (env) => {
  const globalObject =
    utils$1.global !== undefined && utils$1.global !== null ? utils$1.global : globalThis;
  const { ReadableStream, TextEncoder } = globalObject;

  env = utils$1.merge.call(
    {
      skipUndefined: true,
    },
    {
      Request: globalObject.Request,
      Response: globalObject.Response,
    },
    env
  );

  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);

  if (!isFetchSupported) {
    return false;
  }

  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);

  const encodeText =
    isFetchSupported &&
    (typeof TextEncoder === 'function'
      ? (
          (encoder) => (str) =>
            encoder.encode(str)
        )(new TextEncoder())
      : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));

  const supportsRequestStream =
    isRequestSupported &&
    isReadableStreamSupported &&
    test(() => {
      let duplexAccessed = false;

      const request = new Request(platform.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          duplexAccessed = true;
          return 'half';
        },
      });

      const hasContentType = request.headers.has('Content-Type');

      if (request.body != null) {
        request.body.cancel();
      }

      return duplexAccessed && !hasContentType;
    });

  const supportsResponseStream =
    isResponseSupported &&
    isReadableStreamSupported &&
    test(() => utils$1.isReadableStream(new Response('').body));

  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body),
  };

  isFetchSupported &&
    (() => {
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((type) => {
        !resolvers[type] &&
          (resolvers[type] = (res, config) => {
            let method = res && res[type];

            if (method) {
              return method.call(res);
            }

            throw new AxiosError(
              `Response type '${type}' is not supported`,
              AxiosError.ERR_NOT_SUPPORT,
              config
            );
          });
      });
    })();

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if (utils$1.isBlob(body)) {
      return body.size;
    }

    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }

    if (utils$1.isURLSearchParams(body)) {
      body = body + '';
    }

    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions,
      maxContentLength,
      maxBodyLength,
      maxRedirects,
    } = resolveConfig(config);

    const hasMaxContentLength = utils$1.isNumber(maxContentLength) && maxContentLength > -1;
    const hasMaxBodyLength = utils$1.isNumber(maxBodyLength) && maxBodyLength > -1;
    const own = (key) => (utils$1.hasOwnProp(config, key) ? config[key] : undefined);

    let _fetch = envFetch || fetch;

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let composedSignal = composeSignals(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );

    let request = null;

    const unsubscribe =
      composedSignal &&
      composedSignal.unsubscribe &&
      (() => {
        composedSignal.unsubscribe();
      });

    let requestContentLength;

    // AxiosError we raise while the request body is being streamed. Captured
    // by identity so the catch block can surface it directly, regardless of
    // how the runtime wraps the resulting fetch rejection (undici exposes it
    // as `err.cause`; some browsers drop the original error entirely).
    let pendingBodyError = null;

    const maxBodyLengthError = () =>
      new AxiosError(
        'Request body larger than maxBodyLength limit',
        AxiosError.ERR_BAD_REQUEST,
        config,
        request
      );

    try {
      // HTTP basic authentication
      let auth = undefined;
      const configAuth = own('auth');

      if (configAuth) {
        const username = utils$1.getSafeProp(configAuth, 'username') || '';
        const password = utils$1.getSafeProp(configAuth, 'password') || '';
        auth = {
          username,
          password,
        };
      }

      if (maybeWithAuthCredentials(url)) {
        const parsedURL = new URL(url, platform.origin);

        if (!auth && (parsedURL.username || parsedURL.password)) {
          const urlUsername = decodeURIComponentSafe(parsedURL.username);
          const urlPassword = decodeURIComponentSafe(parsedURL.password);
          auth = {
            username: urlUsername,
            password: urlPassword,
          };
        }

        if (parsedURL.username || parsedURL.password) {
          parsedURL.username = '';
          parsedURL.password = '';
          url = parsedURL.href;
        }
      }

      if (auth) {
        headers.delete('authorization');
        headers.set(
          'Authorization',
          'Basic ' + btoa(encodeUTF8((auth.username || '') + ':' + (auth.password || '')))
        );
      }

      // Enforce maxContentLength for data: URLs up-front so we never materialize
      // an oversized payload. The HTTP adapter applies the same check (see http.js
      // "if (protocol === 'data:')" branch).
      if (hasMaxContentLength && typeof url === 'string' && url.startsWith('data:')) {
        const estimated = estimateDataURLDecodedBytes(url);
        if (estimated > maxContentLength) {
          throw new AxiosError(
            'maxContentLength size of ' + maxContentLength + ' exceeded',
            AxiosError.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }

      // Enforce maxBodyLength against known-size bodies before dispatch using
      // the body's *actual* size — never a caller-declared Content-Length,
      // which could under-report to slip an oversized body past the check.
      // Unknown-size streams return undefined here and are counted per-chunk
      // below as fetch consumes them.
      if (hasMaxBodyLength && method !== 'get' && method !== 'head') {
        const outboundLength = await getBodyLength(data);
        if (typeof outboundLength === 'number' && isFinite(outboundLength)) {
          requestContentLength = outboundLength;
          if (outboundLength > maxBodyLength) {
            throw maxBodyLengthError();
          }
        }
      }

      // A streamed body under maxBodyLength must be counted as fetch consumes
      // it; its size is never trusted from a caller-declared Content-Length.
      const mustEnforceStreamBody =
        hasMaxBodyLength && (utils$1.isReadableStream(data) || utils$1.isStream(data));

      const trackRequestStream = (stream, onProgress, flush) =>
        trackStream(
          stream,
          DEFAULT_CHUNK_SIZE,
          (loadedBytes) => {
            if (hasMaxBodyLength && loadedBytes > maxBodyLength) {
              throw (pendingBodyError = maxBodyLengthError());
            }
            onProgress && onProgress(loadedBytes);
          },
          flush
        );

      if (
        supportsRequestStream &&
        method !== 'get' &&
        method !== 'head' &&
        (onUploadProgress || mustEnforceStreamBody)
      ) {
        requestContentLength =
          requestContentLength == null
            ? await resolveBodyLength(headers, data)
            : requestContentLength;

        // A declared length of 0 is only trusted to skip the wrap when we are
        // not enforcing a stream limit (which must not rely on that header).
        if (requestContentLength !== 0 || mustEnforceStreamBody) {
          let _request = new Request(url, {
            method: 'POST',
            body: data,
            duplex: 'half',
          });

          let contentTypeHeader;

          if (
            utils$1.isFormData(data) &&
            (contentTypeHeader = _request.headers.get('content-type'))
          ) {
            headers.setContentType(contentTypeHeader);
          }

          if (_request.body) {
            const [onProgress, flush] =
              (onUploadProgress &&
                progressEventDecorator(
                  requestContentLength,
                  progressEventReducer(asyncDecorator(onUploadProgress))
                )) ||
              [];

            data = trackRequestStream(_request.body, onProgress, flush);
          }
        }
      } else if (
        mustEnforceStreamBody &&
        !isRequestSupported &&
        isReadableStreamSupported &&
        method !== 'get' &&
        method !== 'head'
      ) {
        data = trackRequestStream(data);
      } else if (
        mustEnforceStreamBody &&
        isRequestSupported &&
        !supportsRequestStream &&
        method !== 'get' &&
        method !== 'head'
      ) {
        throw new AxiosError(
          'Stream request bodies are not supported by the current fetch implementation',
          AxiosError.ERR_NOT_SUPPORT,
          config,
          request
        );
      }

      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = isRequestSupported && 'credentials' in Request.prototype;

      // If data is FormData and Content-Type is multipart/form-data without boundary,
      // delete it so fetch can set it correctly with the boundary
      if (utils$1.isFormData(data)) {
        const contentType = headers.getContentType();
        if (
          contentType &&
          /^multipart\/form-data/i.test(contentType) &&
          !/boundary=/i.test(contentType)
        ) {
          headers.delete('content-type');
        }
      }

      // Set User-Agent header if not already set (fetch defaults to 'node' in Node.js)
      headers.set('User-Agent', 'axios/' + VERSION, false);

      const safeFetchOptions =
        fetchOptions == null ? fetchOptions : Object.assign(Object.create(null), fetchOptions);

      if (safeFetchOptions) {
        // These options are owned by Axios and are already reflected in the
        // resolved Request passed to fetch.
        delete safeFetchOptions.body;
        delete safeFetchOptions.headers;
        delete safeFetchOptions.method;
        delete safeFetchOptions.signal;
        delete safeFetchOptions.duplex;
        delete safeFetchOptions.credentials;
      }

      const resolvedOptions = Object.assign(Object.create(null), safeFetchOptions, {
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: toByteStringHeaderObject(headers.normalize()),
        body: data,
        duplex: 'half',
        credentials: isCredentialsSupported ? withCredentials : undefined,
      });

      if (isRequestSupported) {
        utils$1.forEach(DEFAULT_REQUEST_OPTIONS, (value, key) => {
          if (resolvedOptions[key] === undefined) {
            resolvedOptions[key] = value;
          }
        });

        if (resolvedOptions.signal === undefined) {
          resolvedOptions.signal = null;
        }

        if (resolvedOptions.body === undefined) {
          resolvedOptions.body = null;
        }
      }

      if (maxRedirects === 0) {
        resolvedOptions.redirect = 'manual';

        if (safeFetchOptions) {
          safeFetchOptions.redirect = 'manual';
        }
      }

      request = isRequestSupported && new Request(url, resolvedOptions);

      let response = await (isRequestSupported
        ? _fetch(request, safeFetchOptions)
        : _fetch(url, resolvedOptions));

      const responseHeaders = AxiosHeaders.from(response.headers);

      // Cheap pre-check: if the server honestly declares a content-length that
      // already exceeds the cap, reject before we start streaming.
      if (hasMaxContentLength) {
        const declaredLength = utils$1.toFiniteNumber(responseHeaders.getContentLength());
        if (declaredLength != null && declaredLength > maxContentLength) {
          throw new AxiosError(
            'maxContentLength size of ' + maxContentLength + ' exceeded',
            AxiosError.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }

      const isStreamResponse =
        supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (
        supportsResponseStream &&
        response.body &&
        (onDownloadProgress || hasMaxContentLength || (isStreamResponse && unsubscribe))
      ) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach((prop) => {
          options[prop] = response[prop];
        });

        const responseContentLength = utils$1.toFiniteNumber(responseHeaders.getContentLength());

        const [onProgress, flush] =
          (onDownloadProgress &&
            progressEventDecorator(
              responseContentLength,
              progressEventReducer(asyncDecorator(onDownloadProgress), true)
            )) ||
          [];

        let bytesRead = 0;
        const onChunkProgress = (loadedBytes) => {
          if (hasMaxContentLength) {
            bytesRead = loadedBytes;
            if (bytesRead > maxContentLength) {
              throw new AxiosError(
                'maxContentLength size of ' + maxContentLength + ' exceeded',
                AxiosError.ERR_BAD_RESPONSE,
                config,
                request
              );
            }
          }
          onProgress && onProgress(loadedBytes);
        };

        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](
        response,
        config
      );

      // Fallback enforcement for environments without ReadableStream support
      // (legacy runtimes). Detect materialized size from typed output; skip
      // streams/Response passthrough since the user will read those themselves.
      if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
        let materializedSize;
        if (responseData != null) {
          if (typeof responseData.byteLength === 'number') {
            materializedSize = responseData.byteLength;
          } else if (typeof responseData.size === 'number') {
            materializedSize = responseData.size;
          } else if (typeof responseData === 'string') {
            materializedSize =
              typeof TextEncoder === 'function'
                ? new TextEncoder().encode(responseData).byteLength
                : responseData.length;
          }
        }
        if (typeof materializedSize === 'number' && materializedSize > maxContentLength) {
          throw new AxiosError(
            'maxContentLength size of ' + maxContentLength + ' exceeded',
            AxiosError.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }

      !isStreamResponse && unsubscribe && unsubscribe();

      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request,
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();

      // Safari can surface fetch aborts as a DOMException-like object whose
      // branded getters throw. Prefer our composed signal reason before reading
      // the caught error, preserving timeout vs cancellation semantics.
      if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError) {
        const canceledError = composedSignal.reason;
        canceledError.config = config;
        request && (canceledError.request = request);
        if (err !== canceledError) {
          // Non-enumerable to match native Error `cause` semantics so loggers
          // don't recurse into circular fetch internals (see #7205).
          Object.defineProperty(canceledError, 'cause', {
            __proto__: null,
            value: err,
            writable: true,
            enumerable: false,
            configurable: true,
          });
        }
        throw canceledError;
      }

      // Surface a maxBodyLength violation we raised while the request body was
      // being streamed. Matching by identity (rather than reading
      // `err.cause.isAxiosError`) keeps the error deterministic across runtimes
      // and avoids both prototype-pollution reads and mis-attributing a foreign
      // AxiosError that merely happened to land in `err.cause`.
      if (pendingBodyError) {
        request && !pendingBodyError.request && (pendingBodyError.request = request);
        throw pendingBodyError;
      }

      // Re-throw AxiosErrors we raised synchronously (data: URL / content-length
      // pre-checks, response size enforcement) without re-wrapping them.
      if (err instanceof AxiosError) {
        request && !err.request && (err.request = request);
        throw err;
      }

      if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
        const networkError = new AxiosError(
          'Network Error',
          AxiosError.ERR_NETWORK,
          config,
          request,
          err && err.response
        );
        // Non-enumerable to match native Error `cause` semantics so loggers
        // don't recurse into circular fetch internals (see #7205).
        Object.defineProperty(networkError, 'cause', {
          __proto__: null,
          value: err.cause || err,
          writable: true,
          enumerable: false,
          configurable: true,
        });
        throw networkError;
      }

      throw AxiosError.from(err, err && err.code, config, request, err && err.response);
    }
  };
};

const seedCache = new Map();

const getFetch = (config) => {
  let env = (config && config.env) || {};
  const { fetch, Request, Response } = env;
  const seeds = [Request, Response, fetch];

  let len = seeds.length,
    i = len,
    seed,
    target,
    map = seedCache;

  while (i--) {
    seed = seeds[i];
    target = map.get(seed);

    target === undefined && map.set(seed, (target = i ? new Map() : factory(env)));

    map = target;
  }

  return target;
};

getFetch();

/**
 * Known adapters mapping.
 * Provides environment-specific adapters for Axios:
 * - `http` for Node.js
 * - `xhr` for browsers
 * - `fetch` for fetch API-based requests
 *
 * @type {Object<string, Function|Object>}
 */
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch,
  },
};

// Assign adapter names for easier debugging and identification
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      // Null-proto descriptors so a polluted Object.prototype.get cannot turn
      // these data descriptors into accessor descriptors on the way in.
      Object.defineProperty(fn, 'name', { __proto__: null, value });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', { __proto__: null, value });
  }
});

/**
 * Render a rejection reason string for unknown or unsupported adapters
 *
 * @param {string} reason
 * @returns {string}
 */
const renderReason = (reason) => `- ${reason}`;

/**
 * Check if the adapter is resolved (function, null, or false)
 *
 * @param {Function|null|false} adapter
 * @returns {boolean}
 */
const isResolvedHandle = (adapter) =>
  utils$1.isFunction(adapter) || adapter === null || adapter === false;

/**
 * Get the first suitable adapter from the provided list.
 * Tries each adapter in order until a supported one is found.
 * Throws an AxiosError if no adapter is suitable.
 *
 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
 * @param {Object} config - Axios request configuration
 * @throws {AxiosError} If no suitable adapter is available
 * @returns {Function} The resolved adapter function
 */
function getAdapter(adapters, config) {
  adapters = utils$1.isArray(adapters) ? adapters : [adapters];

  const { length } = adapters;
  let nameOrAdapter;
  let adapter;

  const rejectedReasons = {};

  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters[i];
    let id;

    adapter = nameOrAdapter;

    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

      if (adapter === undefined) {
        throw new AxiosError(`Unknown adapter '${id}'`);
      }
    }

    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }

    rejectedReasons[id || '#' + i] = adapter;
  }

  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) =>
        `adapter ${id} ` +
        (state === false ? 'is not supported by the environment' : 'is not available in the build')
    );

    let s = length
      ? reasons.length > 1
        ? 'since :\n' + reasons.map(renderReason).join('\n')
        : ' ' + renderReason(reasons[0])
      : 'as no adapter specified';

    throw new AxiosError(
      `There is no suitable adapter to dispatch the request ` + s,
      AxiosError.ERR_NOT_SUPPORT
    );
  }

  return adapter;
}

/**
 * Exports Axios adapters and utility to resolve an adapter
 */
var adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter,

  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters,
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(_config) {
  // Interceptors may replace the merged config with an ordinary object. Flatten
  // it at the dispatch boundary so shared prototype members cannot become
  // request behavior, while preserving intentional template/class members.
  const config = utils$1.toSafeFlatObject(_config);

  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders.from(utils$1.getSafeProp(config, 'headers'));

  // Transform request data
  config.data = transformData.call(config, config.transformRequest);

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);

  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Expose the current response on config so that transformResponse can
      // attach it to any AxiosError it throws (e.g. on JSON parse failure).
      // We clean it up afterwards to avoid polluting the config object.
      config.response = response;
      try {
        response.data = transformData.call(config, config.transformResponse, response);
      } finally {
        delete config.response;
      }

      response.headers = AxiosHeaders.from(response.headers);

      return response;
    },
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          config.response = reason.response;
          try {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
          } finally {
            delete config.response;
          }
          reason.response.headers = AxiosHeaders.from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    }
  );
}

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return (
      '[Axios v' +
      VERSION +
      "] Transitional option '" +
      opt +
      "'" +
      desc +
      (message ? '. ' + message : '')
    );
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object' || options === null) {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    // Use hasOwnProperty so a polluted Object.prototype.<opt> cannot supply
    // a non-function validator and cause a TypeError.
    const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : undefined;
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError(
          'option ' + opt + ' must be ' + result,
          AxiosError.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1,
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        try {
          let dummy = {};

          Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

          const dummyStack = dummy.stack;
          let stack = '';

          // slice off the Error: ... line
          if (typeof dummyStack === 'string') {
            const firstNewlineIndex = dummyStack.indexOf('\n');

            stack = firstNewlineIndex === -1 ? '' : dummyStack.slice(firstNewlineIndex + 1);
          }

          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack) {
            const firstNewlineIndex = stack.indexOf('\n');
            const secondNewlineIndex =
              firstNewlineIndex === -1 ? -1 : stack.indexOf('\n', firstNewlineIndex + 1);
            const stackWithoutTwoTopLines =
              secondNewlineIndex === -1 ? '' : stack.slice(secondNewlineIndex + 1);

            if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
              err.stack += '\n' + stack;
            }
          }
        } catch (e) {
          // Ignore failures from custom stack hooks or un-writable stack properties.
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const { transitional, paramsSerializer, headers } = config;

    if (transitional !== undefined) {
      validator.assertOptions(
        transitional,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
          legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
          advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
          validateStatusUndefinedResolves: validators.transitional(validators.boolean),
        },
        false
      );
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer,
        };
      } else {
        validator.assertOptions(
          paramsSerializer,
          {
            encode: validators.function,
            serialize: validators.function,
          },
          true
        );
      }
    }

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }

    validator.assertOptions(
      config,
      {
        baseUrl: validators.spelling('baseURL'),
        withXsrfToken: validators.spelling('withXSRFToken'),
      },
      true
    );

    // Set config.method
    config.method = (
      utils$1.getSafeProp(config, 'method') ||
      utils$1.getSafeProp(this.defaults, 'method') ||
      'get'
    ).toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);

    headers &&
      utils$1.forEach(methodList.concat('common'), (method) => {
        delete headers[method];
      });

    config.headers = AxiosHeaders.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      const transitional = config.transitional || transitionalDefaults;
      const legacyInterceptorReqResOrdering =
        transitional && transitional.legacyInterceptorReqResOrdering;

      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
      } catch (error) {
        if (!onRejected) {
          promise = Promise.reject(error);
          break;
        }

        try {
          const rejectedResult = onRejected.call(this, error);

          if (utils$1.isThenable(rejectedResult)) {
            promise = Promise.resolve(rejectedResult).then(() =>
              dispatchRequest.call(this, newConfig)
            );
          }
        } catch (rejectedError) {
          promise = Promise.reject(rejectedError);
        }

        break;
      }
    }

    if (!promise) {
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        promise = Promise.reject(error);
      }
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(
      mergeConfig(config || {}, {
        method,
        url,
        data: config && utils$1.hasOwnProp(config, 'data') ? config.data : undefined,
      })
    );
  };
});

utils$1.forEach(['post', 'put', 'patch', 'query'], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          headers: isForm
            ? {
                'Content-Type': 'multipart/form-data',
              }
            : {},
          url,
          data,
        })
      );
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  // QUERY is a safe/idempotent read method; multipart form bodies don't fit
  // its semantics, so no queryForm shorthand is generated.
  if (method !== 'query') {
    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
  }
});

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then((cancel) => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = (onfulfilled) => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel,
    };
  }
}

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  const args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  /**
   * @deprecated Use `ContentTooLarge` instead.
   */
  PayloadTooLarge: 413,
  ContentTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  /**
   * @deprecated Use `UnprocessableContent` instead.
   */
  UnprocessableEntity: 422,
  UnprocessableContent: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerReturnsAnUnknownError: 520,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  if (HttpStatusCode[value] === undefined) {
    HttpStatusCode[value] = key;
  }
});

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios.prototype, context, { allOwnKeys: true });

  // Copy context to instance
  utils$1.extend(instance, context, null, { allOwnKeys: true });

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders;

axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode;

axios.default = axios;

module.exports = axios;


/***/ },

/***/ 1278
(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.jwtDecode = exports.InvalidTokenError = void 0;
class InvalidTokenError extends Error {
}
exports.InvalidTokenError = InvalidTokenError;
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("base64 string is not of the correct length");
    }
    try {
        return b64DecodeUnicode(output);
    }
    catch (err) {
        return atob(output);
    }
}
function jwtDecode(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    const pos = options.header === true ? 0 : 1;
    const part = token.split(".")[pos];
    if (typeof part !== "string") {
        throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
    }
    let decoded;
    try {
        decoded = base64UrlDecode(part);
    }
    catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    }
    try {
        return JSON.parse(decoded);
    }
    catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
    }
}
exports.jwtDecode = jwtDecode;


/***/ },

/***/ 4724
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/cookie/index.ts
var index_exports = {};
__export(index_exports, {
  Cookie: () => Cookie,
  CookieJar: () => CookieJar,
  MemoryCookieStore: () => MemoryCookieStore,
  ParameterError: () => ParameterError,
  PrefixSecurityEnum: () => PrefixSecurityEnum,
  Store: () => Store,
  canonicalDomain: () => canonicalDomain,
  cookieCompare: () => cookieCompare,
  defaultPath: () => defaultPath,
  domainMatch: () => domainMatch,
  formatDate: () => formatDate,
  fromJSON: () => fromJSON2,
  getPublicSuffix: () => getPublicSuffix,
  parse: () => parse2,
  parseDate: () => parseDate,
  pathMatch: () => pathMatch,
  permuteDomain: () => permuteDomain,
  permutePath: () => permutePath,
  version: () => version
});
module.exports = __toCommonJS(index_exports);

// lib/pathMatch.ts
function pathMatch(reqPath, cookiePath) {
  if (cookiePath === reqPath) {
    return true;
  }
  const idx = reqPath.indexOf(cookiePath);
  if (idx === 0) {
    if (cookiePath[cookiePath.length - 1] === "/") {
      return true;
    }
    if (reqPath.startsWith(cookiePath) && reqPath[cookiePath.length] === "/") {
      return true;
    }
  }
  return false;
}

// lib/getPublicSuffix.ts
var import_tldts = __webpack_require__(3324);
var SPECIAL_USE_DOMAINS = ["local", "example", "invalid", "localhost", "test"];
var SPECIAL_TREATMENT_DOMAINS = ["localhost", "invalid"];
var defaultGetPublicSuffixOptions = {
  allowSpecialUseDomain: false,
  ignoreError: false
};
function getPublicSuffix(domain, options = {}) {
  options = { ...defaultGetPublicSuffixOptions, ...options };
  const domainParts = domain.split(".");
  const topLevelDomain = domainParts[domainParts.length - 1];
  const allowSpecialUseDomain = !!options.allowSpecialUseDomain;
  const ignoreError = !!options.ignoreError;
  if (allowSpecialUseDomain && topLevelDomain !== void 0 && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
    if (domainParts.length > 1) {
      const secondLevelDomain = domainParts[domainParts.length - 2];
      return `${secondLevelDomain}.${topLevelDomain}`;
    } else if (SPECIAL_TREATMENT_DOMAINS.includes(topLevelDomain)) {
      return topLevelDomain;
    }
  }
  if (!ignoreError && topLevelDomain !== void 0 && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
    throw new Error(
      `Cookie has domain set to the public suffix "${topLevelDomain}" which is a special use domain. To allow this, configure your CookieJar with {allowSpecialUseDomain: true, rejectPublicSuffixes: false}.`
    );
  }
  const publicSuffix = (0, import_tldts.getDomain)(domain, {
    allowIcannDomains: true,
    allowPrivateDomains: true
  });
  if (publicSuffix) return publicSuffix;
}

// lib/permuteDomain.ts
function permuteDomain(domain, allowSpecialUseDomain) {
  const pubSuf = getPublicSuffix(domain, {
    allowSpecialUseDomain
  });
  if (!pubSuf) {
    return void 0;
  }
  if (pubSuf == domain) {
    return [domain];
  }
  if (domain.slice(-1) == ".") {
    domain = domain.slice(0, -1);
  }
  const prefix = domain.slice(0, -(pubSuf.length + 1));
  const parts = prefix.split(".").reverse();
  let cur = pubSuf;
  const permutations = [cur];
  while (parts.length) {
    const part = parts.shift();
    cur = `${part}.${cur}`;
    permutations.push(cur);
  }
  return permutations;
}

// lib/store.ts
var Store = class {
  constructor() {
    this.synchronous = false;
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  findCookie(_domain, _path, _key, _callback) {
    throw new Error("findCookie is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  findCookies(_domain, _path, _allowSpecialUseDomain = false, _callback) {
    throw new Error("findCookies is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  putCookie(_cookie, _callback) {
    throw new Error("putCookie is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  updateCookie(_oldCookie, _newCookie, _callback) {
    throw new Error("updateCookie is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  removeCookie(_domain, _path, _key, _callback) {
    throw new Error("removeCookie is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  removeCookies(_domain, _path, _callback) {
    throw new Error("removeCookies is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  removeAllCookies(_callback) {
    throw new Error("removeAllCookies is not implemented");
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  getAllCookies(_callback) {
    throw new Error(
      "getAllCookies is not implemented (therefore jar cannot be serialized)"
    );
  }
};

// lib/utils.ts
var objectToString = (obj) => Object.prototype.toString.call(obj);
var safeArrayToString = (arr, seenArrays) => {
  if (typeof arr.join !== "function") return objectToString(arr);
  seenArrays.add(arr);
  const mapped = arr.map(
    (val) => val === null || val === void 0 || seenArrays.has(val) ? "" : safeToStringImpl(val, seenArrays)
  );
  return mapped.join();
};
var safeToStringImpl = (val, seenArrays = /* @__PURE__ */ new WeakSet()) => {
  if (typeof val !== "object" || val === null) {
    return String(val);
  } else if (typeof val.toString === "function") {
    return Array.isArray(val) ? (
      // Arrays have a weird custom toString that we need to replicate
      safeArrayToString(val, seenArrays)
    ) : (
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      String(val)
    );
  } else {
    return objectToString(val);
  }
};
var safeToString = (val) => safeToStringImpl(val);
function createPromiseCallback(cb) {
  let callback;
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  if (typeof cb === "function") {
    callback = (err, result) => {
      try {
        if (err) cb(err);
        else cb(null, result);
      } catch (e) {
        reject(e instanceof Error ? e : new Error());
      }
    };
  } else {
    callback = (err, result) => {
      try {
        if (err) reject(err);
        else resolve(result);
      } catch (e) {
        reject(e instanceof Error ? e : new Error());
      }
    };
  }
  return {
    promise,
    callback,
    resolve: (value) => {
      callback(null, value);
      return promise;
    },
    reject: (error) => {
      callback(error);
      return promise;
    }
  };
}
function inOperator(k, o) {
  return k in o;
}

// lib/memstore.ts
var MemoryCookieStore = class extends Store {
  /**
   * Create a new {@link MemoryCookieStore}.
   */
  constructor() {
    super();
    this.synchronous = true;
    this.idx = /* @__PURE__ */ Object.create(null);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  findCookie(domain, path, key, callback) {
    const promiseCallback = createPromiseCallback(callback);
    if (domain == null || path == null || key == null) {
      return promiseCallback.resolve(void 0);
    }
    const result = this.idx[domain]?.[path]?.[key];
    return promiseCallback.resolve(result);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  findCookies(domain, path, allowSpecialUseDomain = false, callback) {
    if (typeof allowSpecialUseDomain === "function") {
      callback = allowSpecialUseDomain;
      allowSpecialUseDomain = true;
    }
    const results = [];
    const promiseCallback = createPromiseCallback(callback);
    if (!domain) {
      return promiseCallback.resolve([]);
    }
    let pathMatcher;
    if (!path) {
      pathMatcher = function matchAll(domainIndex) {
        for (const curPath in domainIndex) {
          const pathIndex = domainIndex[curPath];
          for (const key in pathIndex) {
            const value = pathIndex[key];
            if (value) {
              results.push(value);
            }
          }
        }
      };
    } else {
      pathMatcher = function matchRFC(domainIndex) {
        for (const cookiePath in domainIndex) {
          if (pathMatch(path, cookiePath)) {
            const pathIndex = domainIndex[cookiePath];
            for (const key in pathIndex) {
              const value = pathIndex[key];
              if (value) {
                results.push(value);
              }
            }
          }
        }
      };
    }
    const domains = permuteDomain(domain, allowSpecialUseDomain) || [domain];
    const idx = this.idx;
    domains.forEach((curDomain) => {
      const domainIndex = idx[curDomain];
      if (!domainIndex) {
        return;
      }
      pathMatcher(domainIndex);
    });
    return promiseCallback.resolve(results);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  putCookie(cookie, callback) {
    const promiseCallback = createPromiseCallback(callback);
    const { domain, path, key } = cookie;
    if (domain == null || path == null || key == null) {
      return promiseCallback.resolve(void 0);
    }
    const domainEntry = this.idx[domain] ?? /* @__PURE__ */ Object.create(null);
    this.idx[domain] = domainEntry;
    const pathEntry = domainEntry[path] ?? /* @__PURE__ */ Object.create(null);
    domainEntry[path] = pathEntry;
    pathEntry[key] = cookie;
    return promiseCallback.resolve(void 0);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  updateCookie(_oldCookie, newCookie, callback) {
    if (callback) this.putCookie(newCookie, callback);
    else return this.putCookie(newCookie);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  removeCookie(domain, path, key, callback) {
    const promiseCallback = createPromiseCallback(callback);
    delete this.idx[domain]?.[path]?.[key];
    return promiseCallback.resolve(void 0);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  removeCookies(domain, path, callback) {
    const promiseCallback = createPromiseCallback(callback);
    const domainEntry = this.idx[domain];
    if (domainEntry) {
      if (path) {
        delete domainEntry[path];
      } else {
        delete this.idx[domain];
      }
    }
    return promiseCallback.resolve(void 0);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  removeAllCookies(callback) {
    const promiseCallback = createPromiseCallback(callback);
    this.idx = /* @__PURE__ */ Object.create(null);
    return promiseCallback.resolve(void 0);
  }
  /**
   * @internal No doc because this is an overload that supports the implementation
   */
  getAllCookies(callback) {
    const promiseCallback = createPromiseCallback(callback);
    const cookies = [];
    const idx = this.idx;
    const domains = Object.keys(idx);
    domains.forEach((domain) => {
      const domainEntry = idx[domain] ?? {};
      const paths = Object.keys(domainEntry);
      paths.forEach((path) => {
        const pathEntry = domainEntry[path] ?? {};
        const keys = Object.keys(pathEntry);
        keys.forEach((key) => {
          const keyEntry = pathEntry[key];
          if (keyEntry != null) {
            cookies.push(keyEntry);
          }
        });
      });
    });
    cookies.sort((a, b) => {
      return (a.creationIndex || 0) - (b.creationIndex || 0);
    });
    return promiseCallback.resolve(cookies);
  }
};

// lib/validators.ts
function isNonEmptyString(data) {
  return isString(data) && data !== "";
}
function isEmptyString(data) {
  return data === "" || data instanceof String && data.toString() === "";
}
function isString(data) {
  return typeof data === "string" || data instanceof String;
}
function isObject(data) {
  return objectToString(data) === "[object Object]";
}
function validate(bool, cbOrMessage, message) {
  if (bool) return;
  const cb = typeof cbOrMessage === "function" ? cbOrMessage : void 0;
  let options = typeof cbOrMessage === "function" ? message : cbOrMessage;
  if (!isObject(options)) options = "[object Object]";
  const err = new ParameterError(safeToString(options));
  if (cb) cb(err);
  else throw err;
}
var ParameterError = class extends Error {
};

// lib/version.ts
var version = "6.0.2";

// lib/cookie/constants.ts
var PrefixSecurityEnum = {
  SILENT: "silent",
  STRICT: "strict",
  DISABLED: "unsafe-disabled"
};
Object.freeze(PrefixSecurityEnum);
var IP_V6_REGEX = `
\\[?(?:
(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|
(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|
(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|
(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|
(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:))
)(?:%[0-9a-zA-Z]{1,})?\\]?
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
var IP_V6_REGEX_OBJECT = new RegExp(`^${IP_V6_REGEX}$`);
var IP_V4_REGEX = `(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])`;
var IP_V4_REGEX_OBJECT = new RegExp(`^${IP_V4_REGEX}$`);

// lib/cookie/canonicalDomain.ts
function domainToASCII(domain) {
  return new URL(`http://${domain}`).hostname;
}
function canonicalDomain(domainName) {
  if (domainName == null) {
    return void 0;
  }
  let str = domainName.trim().replace(/^\./, "");
  if (IP_V6_REGEX_OBJECT.test(str)) {
    if (!str.startsWith("[")) {
      str = "[" + str;
    }
    if (!str.endsWith("]")) {
      str = str + "]";
    }
    return domainToASCII(str).slice(1, -1);
  }
  if (/[^\u0001-\u007f]/.test(str)) {
    return domainToASCII(str);
  }
  return str.toLowerCase();
}

// lib/cookie/formatDate.ts
function formatDate(date) {
  return date.toUTCString();
}

// lib/cookie/parseDate.ts
function parseDate(cookieDate) {
  if (!cookieDate) {
    return void 0;
  }
  const flags = {
    foundTime: void 0,
    foundDayOfMonth: void 0,
    foundMonth: void 0,
    foundYear: void 0
  };
  const dateTokens = cookieDate.split(DELIMITER).filter((token) => token.length > 0);
  for (const dateToken of dateTokens) {
    if (flags.foundTime === void 0) {
      const [, hours, minutes, seconds] = TIME.exec(dateToken) || [];
      if (hours != void 0 && minutes != void 0 && seconds != void 0) {
        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);
        const parsedSeconds = parseInt(seconds, 10);
        if (!isNaN(parsedHours) && !isNaN(parsedMinutes) && !isNaN(parsedSeconds)) {
          flags.foundTime = {
            hours: parsedHours,
            minutes: parsedMinutes,
            seconds: parsedSeconds
          };
          continue;
        }
      }
    }
    if (flags.foundDayOfMonth === void 0 && DAY_OF_MONTH.test(dateToken)) {
      const dayOfMonth = parseInt(dateToken, 10);
      if (!isNaN(dayOfMonth)) {
        flags.foundDayOfMonth = dayOfMonth;
        continue;
      }
    }
    if (flags.foundMonth === void 0 && MONTH.test(dateToken)) {
      const month = months.indexOf(dateToken.substring(0, 3).toLowerCase());
      if (month >= 0 && month <= 11) {
        flags.foundMonth = month;
        continue;
      }
    }
    if (flags.foundYear === void 0 && YEAR.test(dateToken)) {
      const parsedYear = parseInt(dateToken, 10);
      if (!isNaN(parsedYear)) {
        flags.foundYear = parsedYear;
        continue;
      }
    }
  }
  if (flags.foundYear !== void 0 && flags.foundYear >= 70 && flags.foundYear <= 99) {
    flags.foundYear += 1900;
  }
  if (flags.foundYear !== void 0 && flags.foundYear >= 0 && flags.foundYear <= 69) {
    flags.foundYear += 2e3;
  }
  if (flags.foundDayOfMonth === void 0 || flags.foundMonth === void 0 || flags.foundYear === void 0 || flags.foundTime === void 0) {
    return void 0;
  }
  if (flags.foundDayOfMonth < 1 || flags.foundDayOfMonth > 31) {
    return void 0;
  }
  if (flags.foundYear < 1601) {
    return void 0;
  }
  if (flags.foundTime.hours > 23) {
    return void 0;
  }
  if (flags.foundTime.minutes > 59) {
    return void 0;
  }
  if (flags.foundTime.seconds > 59) {
    return void 0;
  }
  const date = new Date(
    Date.UTC(
      flags.foundYear,
      flags.foundMonth,
      flags.foundDayOfMonth,
      flags.foundTime.hours,
      flags.foundTime.minutes,
      flags.foundTime.seconds
    )
  );
  if (date.getUTCFullYear() !== flags.foundYear || date.getUTCMonth() !== flags.foundMonth || date.getUTCDate() !== flags.foundDayOfMonth) {
    return void 0;
  }
  return date;
}
var months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];
var DELIMITER = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
var TIME = /^(\d{1,2}):(\d{1,2}):(\d{1,2})(?:[\x00-\x2F\x3A-\xFF][\x00-\xFF]*)?$/;
var DAY_OF_MONTH = /^[0-9]{1,2}(?:[\x00-\x2F\x3A-\xFF][\x00-\xFF]*)?$/;
var MONTH = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[\x00-\xFF]*$/i;
var YEAR = /^[\x30-\x39]{2,4}(?:[\x00-\x2F\x3A-\xFF][\x00-\xFF]*)?$/;

// lib/cookie/cookie.ts
var COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/;
var PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;
var CONTROL_CHARS = /[\x00-\x1F]/;
var TERMINATORS = ["\n", "\r", "\0"];
function trimTerminator(str) {
  if (isEmptyString(str)) return str;
  for (let t = 0; t < TERMINATORS.length; t++) {
    const terminator = TERMINATORS[t];
    const terminatorIdx = terminator ? str.indexOf(terminator) : -1;
    if (terminatorIdx !== -1) {
      str = str.slice(0, terminatorIdx);
    }
  }
  return str;
}
function parseCookiePair(cookiePair, looseMode) {
  cookiePair = trimTerminator(cookiePair);
  let firstEq = cookiePair.indexOf("=");
  if (looseMode) {
    if (firstEq === 0) {
      cookiePair = cookiePair.substring(1);
      firstEq = cookiePair.indexOf("=");
    }
  } else {
    if (firstEq <= 0) {
      return void 0;
    }
  }
  let cookieName, cookieValue;
  if (firstEq <= 0) {
    cookieName = "";
    cookieValue = cookiePair.trim();
  } else {
    cookieName = cookiePair.slice(0, firstEq).trim();
    cookieValue = cookiePair.slice(firstEq + 1).trim();
  }
  if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
    return void 0;
  }
  const c = new Cookie();
  c.key = cookieName;
  c.value = cookieValue;
  return c;
}
function parse(str, options) {
  if (isEmptyString(str) || !isString(str)) {
    return void 0;
  }
  str = str.trim();
  const firstSemi = str.indexOf(";");
  const cookiePair = firstSemi === -1 ? str : str.slice(0, firstSemi);
  const c = parseCookiePair(cookiePair, options?.loose ?? false);
  if (!c) {
    return void 0;
  }
  if (firstSemi === -1) {
    return c;
  }
  const unparsed = str.slice(firstSemi + 1).trim();
  if (unparsed.length === 0) {
    return c;
  }
  const cookie_avs = unparsed.split(";");
  while (cookie_avs.length) {
    const av = (cookie_avs.shift() ?? "").trim();
    if (av.length === 0) {
      continue;
    }
    const av_sep = av.indexOf("=");
    let av_key, av_value;
    if (av_sep === -1) {
      av_key = av;
      av_value = null;
    } else {
      av_key = av.slice(0, av_sep);
      av_value = av.slice(av_sep + 1);
    }
    av_key = av_key.trim().toLowerCase();
    if (av_value) {
      av_value = av_value.trim();
    }
    switch (av_key) {
      case "expires":
        if (av_value) {
          const exp = parseDate(av_value);
          if (exp) {
            c.expires = exp;
          }
        }
        break;
      case "max-age":
        if (av_value) {
          if (/^-?[0-9]+$/.test(av_value)) {
            const delta = parseInt(av_value, 10);
            c.setMaxAge(delta);
          }
        }
        break;
      case "domain":
        if (av_value) {
          const domain = av_value.trim().replace(/^\./, "");
          if (domain) {
            c.domain = domain.toLowerCase();
          }
        }
        break;
      case "path":
        c.path = av_value && av_value[0] === "/" ? av_value : null;
        break;
      case "secure":
        c.secure = true;
        break;
      case "httponly":
        c.httpOnly = true;
        break;
      case "samesite":
        switch (av_value ? av_value.toLowerCase() : "") {
          case "strict":
            c.sameSite = "strict";
            break;
          case "lax":
            c.sameSite = "lax";
            break;
          case "none":
            c.sameSite = "none";
            break;
          default:
            c.sameSite = void 0;
            break;
        }
        break;
      default:
        c.extensions = c.extensions || [];
        c.extensions.push(av);
        break;
    }
  }
  return c;
}
function fromJSON(str) {
  if (!str || isEmptyString(str)) {
    return void 0;
  }
  let obj;
  if (typeof str === "string") {
    try {
      obj = JSON.parse(str);
    } catch {
      return void 0;
    }
  } else {
    obj = str;
  }
  const c = new Cookie();
  Cookie.serializableProperties.forEach((prop) => {
    if (obj && typeof obj === "object" && inOperator(prop, obj)) {
      const val = obj[prop];
      if (val === void 0) {
        return;
      }
      if (inOperator(prop, cookieDefaults) && val === cookieDefaults[prop]) {
        return;
      }
      switch (prop) {
        case "key":
        case "value":
        case "sameSite":
          if (typeof val === "string") {
            c[prop] = val;
          }
          break;
        case "expires":
        case "creation":
        case "lastAccessed":
          if (typeof val === "number" || typeof val === "string" || val instanceof Date) {
            c[prop] = obj[prop] == "Infinity" ? "Infinity" : new Date(val);
          } else if (val === null) {
            c[prop] = null;
          }
          break;
        case "maxAge":
          if (typeof val === "number" || val === "Infinity" || val === "-Infinity") {
            c[prop] = val;
          }
          break;
        case "domain":
        case "path":
          if (typeof val === "string" || val === null) {
            c[prop] = val;
          }
          break;
        case "secure":
        case "httpOnly":
          if (typeof val === "boolean") {
            c[prop] = val;
          }
          break;
        case "extensions":
          if (Array.isArray(val) && val.every((item) => typeof item === "string")) {
            c[prop] = val;
          }
          break;
        case "hostOnly":
        case "pathIsDefault":
          if (typeof val === "boolean" || val === null) {
            c[prop] = val;
          }
          break;
      }
    }
  });
  return c;
}
var cookieDefaults = {
  // the order in which the RFC has them:
  key: "",
  value: "",
  expires: "Infinity",
  maxAge: null,
  domain: null,
  path: null,
  secure: false,
  httpOnly: false,
  extensions: null,
  // set by the CookieJar:
  hostOnly: null,
  pathIsDefault: null,
  creation: null,
  lastAccessed: null,
  sameSite: void 0
};
var _Cookie = class _Cookie {
  /**
   * Create a new Cookie instance.
   * @public
   * @param options - The attributes to set on the cookie
   */
  constructor(options = {}) {
    this.key = options.key ?? cookieDefaults.key;
    this.value = options.value ?? cookieDefaults.value;
    this.expires = options.expires ?? cookieDefaults.expires;
    this.maxAge = options.maxAge ?? cookieDefaults.maxAge;
    this.domain = options.domain ?? cookieDefaults.domain;
    this.path = options.path ?? cookieDefaults.path;
    this.secure = options.secure ?? cookieDefaults.secure;
    this.httpOnly = options.httpOnly ?? cookieDefaults.httpOnly;
    this.extensions = options.extensions ?? cookieDefaults.extensions;
    this.creation = options.creation ?? cookieDefaults.creation;
    this.hostOnly = options.hostOnly ?? cookieDefaults.hostOnly;
    this.pathIsDefault = options.pathIsDefault ?? cookieDefaults.pathIsDefault;
    this.lastAccessed = options.lastAccessed ?? cookieDefaults.lastAccessed;
    this.sameSite = options.sameSite ?? cookieDefaults.sameSite;
    this.creation = options.creation ?? /* @__PURE__ */ new Date();
    Object.defineProperty(this, "creationIndex", {
      configurable: false,
      enumerable: false,
      // important for assert.deepEqual checks
      writable: true,
      value: ++_Cookie.cookiesCreated
    });
    this.creationIndex = _Cookie.cookiesCreated;
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    const now = Date.now();
    const hostOnly = this.hostOnly != null ? this.hostOnly.toString() : "?";
    const createAge = this.creation && this.creation !== "Infinity" ? `${String(now - this.creation.getTime())}ms` : "?";
    const accessAge = this.lastAccessed && this.lastAccessed !== "Infinity" ? `${String(now - this.lastAccessed.getTime())}ms` : "?";
    return `Cookie="${this.toString()}; hostOnly=${hostOnly}; aAge=${accessAge}; cAge=${createAge}"`;
  }
  /**
   * For convenience in using `JSON.stringify(cookie)`. Returns a plain-old Object that can be JSON-serialized.
   *
   * @remarks
   * - Any `Date` properties (such as {@link Cookie.expires}, {@link Cookie.creation}, and {@link Cookie.lastAccessed}) are exported in ISO format (`Date.toISOString()`).
   *
   *  - Custom Cookie properties are discarded. In tough-cookie 1.x, since there was no {@link Cookie.toJSON} method explicitly defined, all enumerable properties were captured.
   *      If you want a property to be serialized, add the property name to {@link Cookie.serializableProperties}.
   */
  toJSON() {
    const obj = {};
    for (const prop of _Cookie.serializableProperties) {
      const val = this[prop];
      if (val === cookieDefaults[prop]) {
        continue;
      }
      switch (prop) {
        case "key":
        case "value":
        case "sameSite":
          if (typeof val === "string") {
            obj[prop] = val;
          }
          break;
        case "expires":
        case "creation":
        case "lastAccessed":
          if (typeof val === "number" || typeof val === "string" || val instanceof Date) {
            obj[prop] = val == "Infinity" ? "Infinity" : new Date(val).toISOString();
          } else if (val === null) {
            obj[prop] = null;
          }
          break;
        case "maxAge":
          if (typeof val === "number" || val === "Infinity" || val === "-Infinity") {
            obj[prop] = val;
          }
          break;
        case "domain":
        case "path":
          if (typeof val === "string" || val === null) {
            obj[prop] = val;
          }
          break;
        case "secure":
        case "httpOnly":
          if (typeof val === "boolean") {
            obj[prop] = val;
          }
          break;
        case "extensions":
          if (Array.isArray(val)) {
            obj[prop] = val;
          }
          break;
        case "hostOnly":
        case "pathIsDefault":
          if (typeof val === "boolean" || val === null) {
            obj[prop] = val;
          }
          break;
      }
    }
    return obj;
  }
  /**
   * Does a deep clone of this cookie, implemented exactly as `Cookie.fromJSON(cookie.toJSON())`.
   * @public
   */
  clone() {
    return fromJSON(this.toJSON());
  }
  /**
   * Validates cookie attributes for semantic correctness. Useful for "lint" checking any `Set-Cookie` headers you generate.
   * For now, it returns a boolean, but eventually could return a reason string.
   *
   * @remarks
   * Works for a few things, but is by no means comprehensive.
   *
   * @beta
   */
  validate() {
    if (!this.value || !COOKIE_OCTETS.test(this.value)) {
      return false;
    }
    if (this.expires != "Infinity" && !(this.expires instanceof Date) && !parseDate(this.expires)) {
      return false;
    }
    if (this.maxAge != null && this.maxAge !== "Infinity" && (this.maxAge === "-Infinity" || this.maxAge <= 0)) {
      return false;
    }
    if (this.path != null && !PATH_VALUE.test(this.path)) {
      return false;
    }
    const cdomain = this.cdomain();
    if (cdomain) {
      if (cdomain.match(/\.$/)) {
        return false;
      }
      const suffix = getPublicSuffix(cdomain);
      if (suffix == null) {
        return false;
      }
    }
    return true;
  }
  /**
   * Sets the 'Expires' attribute on a cookie.
   *
   * @remarks
   * When given a `string` value it will be parsed with {@link parseDate}. If the value can't be parsed as a cookie date
   * then the 'Expires' attribute will be set to `"Infinity"`.
   *
   * @param exp - the new value for the 'Expires' attribute of the cookie.
   */
  setExpires(exp) {
    if (exp instanceof Date) {
      this.expires = exp;
    } else {
      this.expires = parseDate(exp) || "Infinity";
    }
  }
  /**
   * Sets the 'Max-Age' attribute (in seconds) on a cookie.
   *
   * @remarks
   * Coerces `-Infinity` to `"-Infinity"` and `Infinity` to `"Infinity"` so it can be serialized to JSON.
   *
   * @param age - the new value for the 'Max-Age' attribute (in seconds).
   */
  setMaxAge(age) {
    if (age === Infinity) {
      this.maxAge = "Infinity";
    } else if (age === -Infinity) {
      this.maxAge = "-Infinity";
    } else {
      this.maxAge = age;
    }
  }
  /**
   * Encodes to a `Cookie` header value (specifically, the {@link Cookie.key} and {@link Cookie.value} properties joined with "=").
   * @public
   */
  cookieString() {
    const val = this.value || "";
    if (this.key) {
      return `${this.key}=${val}`;
    }
    return val;
  }
  /**
   * Encodes to a `Set-Cookie header` value.
   * @public
   */
  toString() {
    let str = this.cookieString();
    if (this.expires != "Infinity") {
      if (this.expires instanceof Date) {
        str += `; Expires=${formatDate(this.expires)}`;
      }
    }
    if (this.maxAge != null && this.maxAge != Infinity) {
      str += `; Max-Age=${String(this.maxAge)}`;
    }
    if (this.domain && !this.hostOnly) {
      str += `; Domain=${this.domain}`;
    }
    if (this.path) {
      str += `; Path=${this.path}`;
    }
    if (this.secure) {
      str += "; Secure";
    }
    if (this.httpOnly) {
      str += "; HttpOnly";
    }
    if (this.sameSite && this.sameSite !== "none") {
      if (this.sameSite.toLowerCase() === _Cookie.sameSiteCanonical.lax.toLowerCase()) {
        str += `; SameSite=${_Cookie.sameSiteCanonical.lax}`;
      } else if (this.sameSite.toLowerCase() === _Cookie.sameSiteCanonical.strict.toLowerCase()) {
        str += `; SameSite=${_Cookie.sameSiteCanonical.strict}`;
      } else {
        str += `; SameSite=${this.sameSite}`;
      }
    }
    if (this.extensions) {
      this.extensions.forEach((ext) => {
        str += `; ${ext}`;
      });
    }
    return str;
  }
  /**
   * Computes the TTL relative to now (milliseconds).
   *
   * @remarks
   * - `Infinity` is returned for cookies without an explicit expiry
   *
   * - `0` is returned if the cookie is expired.
   *
   * - Otherwise a time-to-live in milliseconds is returned.
   *
   * @param now - passing an explicit value is mostly used for testing purposes since this defaults to the `Date.now()`
   * @public
   */
  TTL(now = Date.now()) {
    if (this.maxAge != null && typeof this.maxAge === "number") {
      return this.maxAge <= 0 ? 0 : this.maxAge * 1e3;
    }
    const expires = this.expires;
    if (expires === "Infinity") {
      return Infinity;
    }
    return (expires?.getTime() ?? now) - (now || Date.now());
  }
  /**
   * Computes the absolute unix-epoch milliseconds that this cookie expires.
   *
   * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
   * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
   *
   * If Expires ({@link Cookie.expires}) is set, that's returned.
   *
   * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
   */
  expiryTime(now) {
    if (this.maxAge != null) {
      const relativeTo = now || this.lastAccessed || /* @__PURE__ */ new Date();
      const maxAge = typeof this.maxAge === "number" ? this.maxAge : -Infinity;
      const age = maxAge <= 0 ? -Infinity : maxAge * 1e3;
      if (relativeTo === "Infinity") {
        return Infinity;
      }
      return relativeTo.getTime() + age;
    }
    if (this.expires == "Infinity") {
      return Infinity;
    }
    return this.expires ? this.expires.getTime() : void 0;
  }
  /**
   * Similar to {@link Cookie.expiryTime}, computes the absolute unix-epoch milliseconds that this cookie expires and returns it as a Date.
   *
   * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
   * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
   *
   * If Expires ({@link Cookie.expires}) is set, that's returned.
   *
   * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
   */
  expiryDate(now) {
    const millisec = this.expiryTime(now);
    if (millisec == Infinity) {
      return /* @__PURE__ */ new Date(2147483647e3);
    } else if (millisec == -Infinity) {
      return /* @__PURE__ */ new Date(0);
    } else {
      return millisec == void 0 ? void 0 : new Date(millisec);
    }
  }
  /**
   * Indicates if the cookie has been persisted to a store or not.
   * @public
   */
  isPersistent() {
    return this.maxAge != null || this.expires != "Infinity";
  }
  /**
   * Calls {@link canonicalDomain} with the {@link Cookie.domain} property.
   * @public
   */
  canonicalizedDomain() {
    return canonicalDomain(this.domain);
  }
  /**
   * Alias for {@link Cookie.canonicalizedDomain}
   * @public
   */
  cdomain() {
    return canonicalDomain(this.domain);
  }
  /**
   * Parses a string into a Cookie object.
   *
   * @remarks
   * Note: when parsing a `Cookie` header it must be split by ';' before each Cookie string can be parsed.
   *
   * @example
   * ```
   * // parse a `Set-Cookie` header
   * const setCookieHeader = 'a=bcd; Expires=Tue, 18 Oct 2011 07:05:03 GMT'
   * const cookie = Cookie.parse(setCookieHeader)
   * cookie.key === 'a'
   * cookie.value === 'bcd'
   * cookie.expires === new Date(Date.parse('Tue, 18 Oct 2011 07:05:03 GMT'))
   * ```
   *
   * @example
   * ```
   * // parse a `Cookie` header
   * const cookieHeader = 'name=value; name2=value2; name3=value3'
   * const cookies = cookieHeader.split(';').map(Cookie.parse)
   * cookies[0].name === 'name'
   * cookies[0].value === 'value'
   * cookies[1].name === 'name2'
   * cookies[1].value === 'value2'
   * cookies[2].name === 'name3'
   * cookies[2].value === 'value3'
   * ```
   *
   * @param str - The `Set-Cookie` header or a Cookie string to parse.
   * @param options - Configures `strict` or `loose` mode for cookie parsing
   */
  static parse(str, options) {
    return parse(str, options);
  }
  /**
   * Does the reverse of {@link Cookie.toJSON}.
   *
   * @remarks
   * Any Date properties (such as .expires, .creation, and .lastAccessed) are parsed via Date.parse, not tough-cookie's parseDate, since ISO timestamps are being handled at this layer.
   *
   * @example
   * ```
   * const json = JSON.stringify({
   *   key: 'alpha',
   *   value: 'beta',
   *   domain: 'example.com',
   *   path: '/foo',
   *   expires: '2038-01-19T03:14:07.000Z',
   * })
   * const cookie = Cookie.fromJSON(json)
   * cookie.key === 'alpha'
   * cookie.value === 'beta'
   * cookie.domain === 'example.com'
   * cookie.path === '/foo'
   * cookie.expires === new Date(Date.parse('2038-01-19T03:14:07.000Z'))
   * ```
   *
   * @param str - An unparsed JSON string or a value that has already been parsed as JSON
   */
  static fromJSON(str) {
    return fromJSON(str);
  }
};
_Cookie.cookiesCreated = 0;
/**
 * @internal
 */
_Cookie.sameSiteLevel = {
  strict: 3,
  lax: 2,
  none: 1
};
/**
 * @internal
 */
_Cookie.sameSiteCanonical = {
  strict: "Strict",
  lax: "Lax"
};
/**
 * Cookie properties that will be serialized when using {@link Cookie.fromJSON} and {@link Cookie.toJSON}.
 * @public
 */
_Cookie.serializableProperties = [
  "key",
  "value",
  "expires",
  "maxAge",
  "domain",
  "path",
  "secure",
  "httpOnly",
  "extensions",
  "hostOnly",
  "pathIsDefault",
  "creation",
  "lastAccessed",
  "sameSite"
];
var Cookie = _Cookie;

// lib/cookie/cookieCompare.ts
var MAX_TIME = 2147483647e3;
function cookieCompare(a, b) {
  let cmp;
  const aPathLen = a.path ? a.path.length : 0;
  const bPathLen = b.path ? b.path.length : 0;
  cmp = bPathLen - aPathLen;
  if (cmp !== 0) {
    return cmp;
  }
  const aTime = a.creation && a.creation instanceof Date ? a.creation.getTime() : MAX_TIME;
  const bTime = b.creation && b.creation instanceof Date ? b.creation.getTime() : MAX_TIME;
  cmp = aTime - bTime;
  if (cmp !== 0) {
    return cmp;
  }
  cmp = (a.creationIndex || 0) - (b.creationIndex || 0);
  return cmp;
}

// lib/cookie/defaultPath.ts
function defaultPath(path) {
  if (!path || path.slice(0, 1) !== "/") {
    return "/";
  }
  if (path === "/") {
    return path;
  }
  const rightSlash = path.lastIndexOf("/");
  if (rightSlash === 0) {
    return "/";
  }
  return path.slice(0, rightSlash);
}

// lib/cookie/domainMatch.ts
var IP_REGEX_LOWERCASE = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|(?:[a-f\d]{1,4}:){1}(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:)))$)/;
function domainMatch(domain, cookieDomain, canonicalize) {
  if (domain == null || cookieDomain == null) {
    return void 0;
  }
  let _str;
  let _domStr;
  if (canonicalize !== false) {
    _str = canonicalDomain(domain);
    _domStr = canonicalDomain(cookieDomain);
  } else {
    _str = domain;
    _domStr = cookieDomain;
  }
  if (_str == null || _domStr == null) {
    return void 0;
  }
  if (_str == _domStr) {
    return true;
  }
  const idx = _str.lastIndexOf(_domStr);
  if (idx <= 0) {
    return false;
  }
  if (_str.length !== _domStr.length + idx) {
    return false;
  }
  if (_str.substring(idx - 1, idx) !== ".") {
    return false;
  }
  return !IP_REGEX_LOWERCASE.test(_str);
}

// lib/cookie/secureContext.ts
function isLoopbackV4(address) {
  const octets = address.split(".");
  return octets.length === 4 && octets[0] !== void 0 && parseInt(octets[0], 10) === 127;
}
function isLoopbackV6(address) {
  return address === "::1";
}
function isNormalizedLocalhostTLD(lowerHost) {
  return lowerHost.endsWith(".localhost");
}
function isLocalHostname(host) {
  const lowerHost = host.toLowerCase();
  return lowerHost === "localhost" || isNormalizedLocalhostTLD(lowerHost);
}
function hostNoBrackets(host) {
  if (host.length >= 2 && host.startsWith("[") && host.endsWith("]")) {
    return host.substring(1, host.length - 1);
  }
  return host;
}
function isPotentiallyTrustworthy(inputUrl, allowSecureOnLocal = true) {
  let url;
  if (typeof inputUrl === "string") {
    try {
      url = new URL(inputUrl);
    } catch {
      return false;
    }
  } else {
    url = inputUrl;
  }
  const scheme = url.protocol.replace(":", "").toLowerCase();
  const hostname = hostNoBrackets(url.hostname).replace(/\.+$/, "");
  if (scheme === "https" || scheme === "wss") {
    return true;
  }
  if (!allowSecureOnLocal) {
    return false;
  }
  if (IP_V4_REGEX_OBJECT.test(hostname)) {
    return isLoopbackV4(hostname);
  }
  if (IP_V6_REGEX_OBJECT.test(hostname)) {
    return isLoopbackV6(hostname);
  }
  return isLocalHostname(hostname);
}

// lib/cookie/cookieJar.ts
var defaultSetCookieOptions = {
  loose: false,
  sameSiteContext: void 0,
  ignoreError: false,
  http: true
};
var defaultGetCookieOptions = {
  http: true,
  expire: true,
  allPaths: false,
  sameSiteContext: void 0,
  sort: void 0
};
var SAME_SITE_CONTEXT_VAL_ERR = 'Invalid sameSiteContext option for getCookies(); expected one of "strict", "lax", or "none"';
function getCookieContext(url) {
  if (url && typeof url === "object" && "hostname" in url && typeof url.hostname === "string" && "pathname" in url && typeof url.pathname === "string" && "protocol" in url && typeof url.protocol === "string") {
    return {
      hostname: url.hostname,
      pathname: url.pathname,
      protocol: url.protocol
    };
  } else if (typeof url === "string") {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    try {
      pathname = decodeURI(pathname);
    } catch {
    }
    return {
      hostname: parsed.hostname,
      pathname,
      protocol: parsed.protocol
    };
  } else {
    throw new ParameterError("`url` argument is not a string or URL.");
  }
}
function checkSameSiteContext(value) {
  const context = value.toLowerCase();
  if (context === "none" || context === "lax" || context === "strict") {
    return context;
  } else {
    return void 0;
  }
}
function isSecurePrefixConditionMet(cookie) {
  const startsWithSecurePrefix = typeof cookie.key === "string" && cookie.key.startsWith("__Secure-");
  return !startsWithSecurePrefix || cookie.secure;
}
function isHostPrefixConditionMet(cookie) {
  const startsWithHostPrefix = typeof cookie.key === "string" && cookie.key.startsWith("__Host-");
  return !startsWithHostPrefix || Boolean(
    cookie.secure && cookie.hostOnly && cookie.path != null && cookie.path === "/"
  );
}
function getNormalizedPrefixSecurity(prefixSecurity) {
  const normalizedPrefixSecurity = prefixSecurity.toLowerCase();
  switch (normalizedPrefixSecurity) {
    case PrefixSecurityEnum.STRICT:
    case PrefixSecurityEnum.SILENT:
    case PrefixSecurityEnum.DISABLED:
      return normalizedPrefixSecurity;
    default:
      return PrefixSecurityEnum.SILENT;
  }
}
var CookieJar = class _CookieJar {
  /**
   * Creates a new `CookieJar` instance.
   *
   * @remarks
   * - If a custom store is not passed to the constructor, an in-memory store ({@link MemoryCookieStore} will be created and used.
   * - If a boolean value is passed as the `options` parameter, this is equivalent to passing `{ rejectPublicSuffixes: <value> }`
   *
   * @param store - a custom {@link Store} implementation (defaults to {@link MemoryCookieStore})
   * @param options - configures how cookies are processed by the cookie jar
   */
  constructor(store, options) {
    if (typeof options === "boolean") {
      options = { rejectPublicSuffixes: options };
    }
    this.rejectPublicSuffixes = options?.rejectPublicSuffixes ?? true;
    this.enableLooseMode = options?.looseMode ?? false;
    this.allowSpecialUseDomain = options?.allowSpecialUseDomain ?? true;
    this.allowSecureOnLocal = options?.allowSecureOnLocal ?? true;
    this.prefixSecurity = getNormalizedPrefixSecurity(
      options?.prefixSecurity ?? "silent"
    );
    this.store = store ?? new MemoryCookieStore();
  }
  callSync(fn) {
    if (!this.store.synchronous) {
      throw new Error(
        "CookieJar store is not synchronous; use async API instead."
      );
    }
    let syncErr = null;
    let syncResult = void 0;
    try {
      fn.call(this, (error, result) => {
        syncErr = error;
        syncResult = result;
      });
    } catch (err) {
      syncErr = err;
    }
    if (syncErr) throw syncErr;
    return syncResult;
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  setCookie(cookie, url, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = void 0;
    }
    const promiseCallback = createPromiseCallback(callback);
    const cb = promiseCallback.callback;
    let context;
    try {
      if (typeof url === "string") {
        validate(
          isNonEmptyString(url),
          callback,
          safeToString(options)
        );
      }
      context = getCookieContext(url);
      if (typeof url === "function") {
        return promiseCallback.reject(new Error("No URL was specified"));
      }
      if (typeof options === "function") {
        options = defaultSetCookieOptions;
      }
      validate(typeof cb === "function", cb);
      if (!isNonEmptyString(cookie) && !isObject(cookie) && cookie instanceof String && cookie.length == 0) {
        return promiseCallback.resolve(void 0);
      }
    } catch (err) {
      return promiseCallback.reject(err);
    }
    const host = canonicalDomain(context.hostname) ?? null;
    const loose = options?.loose || this.enableLooseMode;
    let sameSiteContext = null;
    if (options?.sameSiteContext) {
      sameSiteContext = checkSameSiteContext(options.sameSiteContext);
      if (!sameSiteContext) {
        return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
      }
    }
    if (typeof cookie === "string" || cookie instanceof String) {
      const parsedCookie = Cookie.parse(cookie.toString(), { loose });
      if (!parsedCookie) {
        const err = new Error("Cookie failed to parse");
        return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
      }
      cookie = parsedCookie;
    } else if (!(cookie instanceof Cookie)) {
      const err = new Error(
        "First argument to setCookie must be a Cookie object or string"
      );
      return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
    }
    const now = options?.now || /* @__PURE__ */ new Date();
    if (this.rejectPublicSuffixes && cookie.domain) {
      try {
        const cdomain = cookie.cdomain();
        const suffix = typeof cdomain === "string" ? getPublicSuffix(cdomain, {
          allowSpecialUseDomain: this.allowSpecialUseDomain,
          ignoreError: options?.ignoreError
        }) : null;
        if (suffix == null && !IP_V6_REGEX_OBJECT.test(cookie.domain)) {
          const err = new Error("Cookie has domain set to a public suffix");
          return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
        }
      } catch (err) {
        return options?.ignoreError ? promiseCallback.resolve(void 0) : (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          promiseCallback.reject(err)
        );
      }
    }
    if (cookie.domain) {
      if (!domainMatch(host ?? void 0, cookie.cdomain() ?? void 0, false)) {
        const err = new Error(
          `Cookie not in this host's domain. Cookie:${cookie.cdomain() ?? "null"} Request:${host ?? "null"}`
        );
        return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
      }
      if (cookie.hostOnly == null) {
        cookie.hostOnly = false;
      }
    } else {
      cookie.hostOnly = true;
      cookie.domain = host;
    }
    if (!cookie.path || cookie.path[0] !== "/") {
      cookie.path = defaultPath(context.pathname);
      cookie.pathIsDefault = true;
    }
    if (options?.http === false && cookie.httpOnly) {
      const err = new Error("Cookie is HttpOnly and this isn't an HTTP API");
      return options.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
    }
    if (cookie.sameSite !== "none" && cookie.sameSite !== void 0 && sameSiteContext) {
      if (sameSiteContext === "none") {
        const err = new Error(
          "Cookie is SameSite but this is a cross-origin request"
        );
        return options?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
      }
    }
    const ignoreErrorForPrefixSecurity = this.prefixSecurity === PrefixSecurityEnum.SILENT;
    const prefixSecurityDisabled = this.prefixSecurity === PrefixSecurityEnum.DISABLED;
    if (!prefixSecurityDisabled) {
      let errorFound = false;
      let errorMsg;
      if (!isSecurePrefixConditionMet(cookie)) {
        errorFound = true;
        errorMsg = "Cookie has __Secure prefix but Secure attribute is not set";
      } else if (!isHostPrefixConditionMet(cookie)) {
        errorFound = true;
        errorMsg = "Cookie has __Host prefix but either Secure or HostOnly attribute is not set or Path is not '/'";
      }
      if (errorFound) {
        return options?.ignoreError || ignoreErrorForPrefixSecurity ? promiseCallback.resolve(void 0) : promiseCallback.reject(new Error(errorMsg));
      }
    }
    const store = this.store;
    if (!store.updateCookie) {
      store.updateCookie = async function(_oldCookie, newCookie, cb2) {
        return this.putCookie(newCookie).then(
          () => cb2?.(null),
          (error) => cb2?.(error)
        );
      };
    }
    const withCookie = function withCookie2(err, oldCookie) {
      if (err) {
        cb(err);
        return;
      }
      const next = function(err2) {
        if (err2) {
          cb(err2);
        } else if (typeof cookie === "string") {
          cb(null, void 0);
        } else {
          cb(null, cookie);
        }
      };
      if (oldCookie) {
        if (options && "http" in options && options.http === false && oldCookie.httpOnly) {
          err = new Error("old Cookie is HttpOnly and this isn't an HTTP API");
          if (options.ignoreError) cb(null, void 0);
          else cb(err);
          return;
        }
        if (cookie instanceof Cookie) {
          cookie.creation = oldCookie.creation;
          cookie.creationIndex = oldCookie.creationIndex;
          cookie.lastAccessed = now;
          store.updateCookie(oldCookie, cookie, next);
        }
      } else {
        if (cookie instanceof Cookie) {
          cookie.creation = cookie.lastAccessed = now;
          store.putCookie(cookie, next);
        }
      }
    };
    store.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
    return promiseCallback.promise;
  }
  /**
   * Synchronously attempt to set the {@link Cookie} in the {@link CookieJar}.
   *
   * <strong>Note:</strong> Only works if the configured {@link Store} is also synchronous.
   *
   * @remarks
   * - If successfully persisted, the {@link Cookie} will have updated
   *     {@link Cookie.creation}, {@link Cookie.lastAccessed} and {@link Cookie.hostOnly}
   *     properties.
   *
   * - As per the RFC, the {@link Cookie.hostOnly} flag is set if there was no `Domain={value}`
   *     attribute on the cookie string. The {@link Cookie.domain} property is set to the
   *     fully-qualified hostname of `currentUrl` in this case. Matching this cookie requires an
   *     exact hostname match (not a {@link domainMatch} as per usual)
   *
   * @param cookie - The cookie object or cookie string to store. A string value will be parsed into a cookie using {@link Cookie.parse}.
   * @param url - The domain to store the cookie with.
   * @param options - Configuration settings to use when storing the cookie.
   * @public
   */
  setCookieSync(cookie, url, options) {
    const setCookieFn = options ? this.setCookie.bind(this, cookie, url, options) : this.setCookie.bind(this, cookie, url);
    return this.callSync(setCookieFn);
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  getCookies(url, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = defaultGetCookieOptions;
    } else if (options === void 0) {
      options = defaultGetCookieOptions;
    }
    const promiseCallback = createPromiseCallback(callback);
    const cb = promiseCallback.callback;
    let context;
    try {
      if (typeof url === "string") {
        validate(isNonEmptyString(url), cb, url);
      }
      context = getCookieContext(url);
      validate(
        isObject(options),
        cb,
        safeToString(options)
      );
      validate(typeof cb === "function", cb);
    } catch (parameterError) {
      return promiseCallback.reject(parameterError);
    }
    const host = canonicalDomain(context.hostname);
    const path = context.pathname || "/";
    const potentiallyTrustworthy = isPotentiallyTrustworthy(
      url,
      this.allowSecureOnLocal
    );
    let sameSiteLevel = 0;
    if (options.sameSiteContext) {
      const sameSiteContext = checkSameSiteContext(options.sameSiteContext);
      if (sameSiteContext == null) {
        return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
      }
      sameSiteLevel = Cookie.sameSiteLevel[sameSiteContext];
      if (!sameSiteLevel) {
        return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
      }
    }
    const http = options.http ?? true;
    const now = Date.now();
    const expireCheck = options.expire ?? true;
    const allPaths = options.allPaths ?? false;
    const store = this.store;
    function matchingCookie(c) {
      if (c.hostOnly) {
        if (c.domain != host) {
          return false;
        }
      } else {
        if (!domainMatch(host ?? void 0, c.domain ?? void 0, false)) {
          return false;
        }
      }
      if (!allPaths && typeof c.path === "string" && !pathMatch(path, c.path)) {
        return false;
      }
      if (c.secure && !potentiallyTrustworthy) {
        return false;
      }
      if (c.httpOnly && !http) {
        return false;
      }
      if (sameSiteLevel) {
        let cookieLevel;
        if (c.sameSite === "lax") {
          cookieLevel = Cookie.sameSiteLevel.lax;
        } else if (c.sameSite === "strict") {
          cookieLevel = Cookie.sameSiteLevel.strict;
        } else {
          cookieLevel = Cookie.sameSiteLevel.none;
        }
        if (cookieLevel > sameSiteLevel) {
          return false;
        }
      }
      const expiryTime = c.expiryTime();
      if (expireCheck && expiryTime != void 0 && expiryTime <= now) {
        store.removeCookie(c.domain, c.path, c.key, () => {
        });
        return false;
      }
      return true;
    }
    store.findCookies(
      host,
      allPaths ? null : path,
      this.allowSpecialUseDomain,
      (err, cookies) => {
        if (err) {
          cb(err);
          return;
        }
        if (cookies == null) {
          cb(null, []);
          return;
        }
        cookies = cookies.filter(matchingCookie);
        if ("sort" in options && options.sort !== false) {
          cookies = cookies.sort(cookieCompare);
        }
        const now2 = /* @__PURE__ */ new Date();
        for (const cookie of cookies) {
          cookie.lastAccessed = now2;
        }
        cb(null, cookies);
      }
    );
    return promiseCallback.promise;
  }
  /**
   * Synchronously retrieve the list of cookies that can be sent in a Cookie header for the
   * current URL.
   *
   * <strong>Note</strong>: Only works if the configured Store is also synchronous.
   *
   * @remarks
   * - The array of cookies returned will be sorted according to {@link cookieCompare}.
   *
   * - The {@link Cookie.lastAccessed} property will be updated on all returned cookies.
   *
   * @param url - The domain to store the cookie with.
   * @param options - Configuration settings to use when retrieving the cookies.
   */
  getCookiesSync(url, options) {
    return this.callSync(this.getCookies.bind(this, url, options)) ?? [];
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  getCookieString(url, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = void 0;
    }
    const promiseCallback = createPromiseCallback(callback);
    const next = function(err, cookies) {
      if (err) {
        promiseCallback.callback(err);
      } else {
        promiseCallback.callback(
          null,
          cookies?.sort(cookieCompare).map((c) => c.cookieString()).join("; ")
        );
      }
    };
    this.getCookies(url, options, next);
    return promiseCallback.promise;
  }
  /**
   * Synchronous version of `.getCookieString()`. Accepts the same options as `.getCookies()` but returns a string suitable for a
   * `Cookie` header rather than an Array.
   *
   * <strong>Note</strong>: Only works if the configured Store is also synchronous.
   *
   * @param url - The domain to store the cookie with.
   * @param options - Configuration settings to use when retrieving the cookies.
   */
  getCookieStringSync(url, options) {
    return this.callSync(
      options ? this.getCookieString.bind(this, url, options) : this.getCookieString.bind(this, url)
    ) ?? "";
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  getSetCookieStrings(url, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = void 0;
    }
    const promiseCallback = createPromiseCallback(
      callback
    );
    const next = function(err, cookies) {
      if (err) {
        promiseCallback.callback(err);
      } else {
        promiseCallback.callback(
          null,
          cookies?.map((c) => {
            return c.toString();
          })
        );
      }
    };
    this.getCookies(url, options, next);
    return promiseCallback.promise;
  }
  /**
   * Synchronous version of `.getSetCookieStrings()`. Returns an array of strings suitable for `Set-Cookie` headers.
   * Accepts the same options as `.getCookies()`.
   *
   * <strong>Note</strong>: Only works if the configured Store is also synchronous.
   *
   * @param url - The domain to store the cookie with.
   * @param options - Configuration settings to use when retrieving the cookies.
   */
  getSetCookieStringsSync(url, options = {}) {
    return this.callSync(this.getSetCookieStrings.bind(this, url, options)) ?? [];
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  serialize(callback) {
    const promiseCallback = createPromiseCallback(callback);
    let type = this.store.constructor.name;
    if (isObject(type)) {
      type = null;
    }
    const serialized = {
      // The version of tough-cookie that serialized this jar. Generally a good
      // practice since future versions can make data import decisions based on
      // known past behavior. When/if this matters, use `semver`.
      version: `tough-cookie@${version}`,
      // add the store type, to make humans happy:
      storeType: type,
      // CookieJar configuration:
      rejectPublicSuffixes: this.rejectPublicSuffixes,
      enableLooseMode: this.enableLooseMode,
      allowSpecialUseDomain: this.allowSpecialUseDomain,
      prefixSecurity: getNormalizedPrefixSecurity(this.prefixSecurity),
      // this gets filled from getAllCookies:
      cookies: []
    };
    if (typeof this.store.getAllCookies !== "function") {
      return promiseCallback.reject(
        new Error(
          "store does not support getAllCookies and cannot be serialized"
        )
      );
    }
    this.store.getAllCookies((err, cookies) => {
      if (err) {
        promiseCallback.callback(err);
        return;
      }
      if (cookies == null) {
        promiseCallback.callback(null, serialized);
        return;
      }
      serialized.cookies = cookies.map((cookie) => {
        const serializedCookie = cookie.toJSON();
        delete serializedCookie.creationIndex;
        return serializedCookie;
      });
      promiseCallback.callback(null, serialized);
    });
    return promiseCallback.promise;
  }
  /**
   * Serialize the CookieJar if the underlying store supports `.getAllCookies`.
   *
   * <strong>Note</strong>: Only works if the configured Store is also synchronous.
   */
  serializeSync() {
    return this.callSync((callback) => {
      this.serialize(callback);
    });
  }
  /**
   * Alias of {@link CookieJar.serializeSync}. Allows the cookie to be serialized
   * with `JSON.stringify(cookieJar)`.
   */
  toJSON() {
    return this.serializeSync();
  }
  /**
   * Use the class method CookieJar.deserialize instead of calling this directly
   * @internal
   */
  _importCookies(serialized, callback) {
    let cookies = void 0;
    if (serialized && typeof serialized === "object" && inOperator("cookies", serialized) && Array.isArray(serialized.cookies)) {
      cookies = serialized.cookies;
    }
    if (!cookies) {
      callback(new Error("serialized jar has no cookies array"), void 0);
      return;
    }
    cookies = cookies.slice();
    const putNext = (err) => {
      if (err) {
        callback(err, void 0);
        return;
      }
      if (Array.isArray(cookies)) {
        if (!cookies.length) {
          callback(err, this);
          return;
        }
        let cookie;
        try {
          cookie = Cookie.fromJSON(cookies.shift());
        } catch (e) {
          callback(e instanceof Error ? e : new Error(), void 0);
          return;
        }
        if (cookie === void 0) {
          putNext(null);
          return;
        }
        this.store.putCookie(cookie, putNext);
      }
    };
    putNext(null);
  }
  /**
   * @internal
   */
  _importCookiesSync(serialized) {
    this.callSync(this._importCookies.bind(this, serialized));
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  clone(newStore, callback) {
    if (typeof newStore === "function") {
      callback = newStore;
      newStore = void 0;
    }
    const promiseCallback = createPromiseCallback(callback);
    const cb = promiseCallback.callback;
    this.serialize((err, serialized) => {
      if (err) {
        return promiseCallback.reject(err);
      }
      return _CookieJar.deserialize(serialized ?? "", newStore, cb);
    });
    return promiseCallback.promise;
  }
  /**
   * @internal
   */
  _cloneSync(newStore) {
    const cloneFn = newStore && typeof newStore !== "function" ? this.clone.bind(this, newStore) : this.clone.bind(this);
    return this.callSync((callback) => {
      cloneFn(callback);
    });
  }
  /**
   * Produces a deep clone of this CookieJar. Modifications to the original do
   * not affect the clone, and vice versa.
   *
   * <strong>Note</strong>: Only works if both the configured Store and destination
   * Store are synchronous.
   *
   * @remarks
   * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
   *
   * - Transferring between store types is supported so long as the source
   *     implements `.getAllCookies()` and the destination implements `.putCookie()`.
   *
   * @param newStore - The target {@link Store} to clone cookies into.
   */
  cloneSync(newStore) {
    if (!newStore) {
      return this._cloneSync();
    }
    if (!newStore.synchronous) {
      throw new Error(
        "CookieJar clone destination store is not synchronous; use async API instead."
      );
    }
    return this._cloneSync(newStore);
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  removeAllCookies(callback) {
    const promiseCallback = createPromiseCallback(callback);
    const cb = promiseCallback.callback;
    const store = this.store;
    if (typeof store.removeAllCookies === "function" && store.removeAllCookies !== Store.prototype.removeAllCookies) {
      store.removeAllCookies(cb);
      return promiseCallback.promise;
    }
    store.getAllCookies((err, cookies) => {
      if (err) {
        cb(err);
        return;
      }
      if (!cookies) {
        cookies = [];
      }
      if (cookies.length === 0) {
        cb(null, void 0);
        return;
      }
      let completedCount = 0;
      const removeErrors = [];
      const removeCookieCb = function removeCookieCb2(removeErr) {
        if (removeErr) {
          removeErrors.push(removeErr);
        }
        completedCount++;
        if (completedCount === cookies.length) {
          if (removeErrors[0]) cb(removeErrors[0]);
          else cb(null, void 0);
          return;
        }
      };
      cookies.forEach((cookie) => {
        store.removeCookie(
          cookie.domain,
          cookie.path,
          cookie.key,
          removeCookieCb
        );
      });
    });
    return promiseCallback.promise;
  }
  /**
   * Removes all cookies from the CookieJar.
   *
   * <strong>Note</strong>: Only works if the configured Store is also synchronous.
   *
   * @remarks
   * - This is a new backwards-compatible feature of tough-cookie version 2.5,
   *     so not all Stores will implement it efficiently. For Stores that do not
   *     implement `removeAllCookies`, the fallback is to call `removeCookie` after
   *     `getAllCookies`.
   *
   * - If `getAllCookies` fails or isn't implemented in the Store, an error is returned.
   *
   * - If one or more of the `removeCookie` calls fail, only the first error is returned.
   */
  removeAllCookiesSync() {
    this.callSync((callback) => {
      this.removeAllCookies(callback);
    });
  }
  /**
   * @internal No doc because this is the overload implementation
   */
  static deserialize(strOrObj, store, callback) {
    if (typeof store === "function") {
      callback = store;
      store = void 0;
    }
    const promiseCallback = createPromiseCallback(callback);
    let serialized;
    if (typeof strOrObj === "string") {
      try {
        serialized = JSON.parse(strOrObj);
      } catch (e) {
        return promiseCallback.reject(e instanceof Error ? e : new Error());
      }
    } else {
      serialized = strOrObj;
    }
    const readSerializedProperty = (property) => {
      return serialized && typeof serialized === "object" && inOperator(property, serialized) ? serialized[property] : void 0;
    };
    const readSerializedBoolean = (property) => {
      const value = readSerializedProperty(property);
      return typeof value === "boolean" ? value : void 0;
    };
    const readSerializedString = (property) => {
      const value = readSerializedProperty(property);
      return typeof value === "string" ? value : void 0;
    };
    const jar = new _CookieJar(store, {
      rejectPublicSuffixes: readSerializedBoolean("rejectPublicSuffixes"),
      looseMode: readSerializedBoolean("enableLooseMode"),
      allowSpecialUseDomain: readSerializedBoolean("allowSpecialUseDomain"),
      prefixSecurity: getNormalizedPrefixSecurity(
        readSerializedString("prefixSecurity") ?? "silent"
      )
    });
    jar._importCookies(serialized, (err) => {
      if (err) {
        promiseCallback.callback(err);
        return;
      }
      promiseCallback.callback(null, jar);
    });
    return promiseCallback.promise;
  }
  /**
   * A new CookieJar is created and the serialized {@link Cookie} values are added to
   * the underlying store. Each {@link Cookie} is added via `store.putCookie(...)` in
   * the order in which they appear in the serialization.
   *
   * <strong>Note</strong>: Only works if the configured Store is also synchronous.
   *
   * @remarks
   * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
   *
   * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
   *
   * @param strOrObj - A JSON string or object representing the deserialized cookies.
   * @param store - The underlying store to persist the deserialized cookies into.
   */
  static deserializeSync(strOrObj, store) {
    const serialized = typeof strOrObj === "string" ? JSON.parse(strOrObj) : strOrObj;
    const readSerializedProperty = (property) => {
      return serialized && typeof serialized === "object" && inOperator(property, serialized) ? serialized[property] : void 0;
    };
    const readSerializedBoolean = (property) => {
      const value = readSerializedProperty(property);
      return typeof value === "boolean" ? value : void 0;
    };
    const readSerializedString = (property) => {
      const value = readSerializedProperty(property);
      return typeof value === "string" ? value : void 0;
    };
    const jar = new _CookieJar(store, {
      rejectPublicSuffixes: readSerializedBoolean("rejectPublicSuffixes"),
      looseMode: readSerializedBoolean("enableLooseMode"),
      allowSpecialUseDomain: readSerializedBoolean("allowSpecialUseDomain"),
      prefixSecurity: getNormalizedPrefixSecurity(
        readSerializedString("prefixSecurity") ?? "silent"
      )
    });
    if (!jar.store.synchronous) {
      throw new Error(
        "CookieJar store is not synchronous; use async API instead."
      );
    }
    jar._importCookiesSync(serialized);
    return jar;
  }
  /**
   * Alias of {@link CookieJar.deserializeSync}.
   *
   * @remarks
   * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
   *
   * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
   *
   * @param jsonString - A JSON string or object representing the deserialized cookies.
   * @param store - The underlying store to persist the deserialized cookies into.
   */
  static fromJSON(jsonString, store) {
    return _CookieJar.deserializeSync(jsonString, store);
  }
};

// lib/cookie/permutePath.ts
function permutePath(path) {
  if (path === "/") {
    return ["/"];
  }
  const permutations = [path];
  while (path.length > 1) {
    const lindex = path.lastIndexOf("/");
    if (lindex === 0) {
      break;
    }
    path = path.slice(0, lindex);
    permutations.push(path);
  }
  permutations.push("/");
  return permutations;
}

// lib/cookie/index.ts
function parse2(str, options) {
  return Cookie.parse(str, options);
}
function fromJSON2(str) {
  return Cookie.fromJSON(str);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
/*!
 * Copyright (c) 2015-2020, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
//# sourceMappingURL=index.cjs.map

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = globalThis;
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__(8156);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});