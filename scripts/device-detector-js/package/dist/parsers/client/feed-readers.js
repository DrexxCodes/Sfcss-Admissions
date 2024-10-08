"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feed_readers_json_1 = __importDefault(require("../../fixtures/regexes/client/feed_readers.json"));
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
class FeedReaderParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                type: "",
                name: "",
                version: "",
                url: ""
            };
            for (const feedReader of feed_readers_json_1.default) {
                const match = user_agent_1.userAgentParser(feedReader.regex, userAgent);
                if (!match)
                    continue;
                result.type = "feed reader";
                result.name = variable_replacement_1.variableReplacement(feedReader.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(feedReader.version, match), this.options.versionTruncation);
                result.url = feedReader.url;
                break;
            }
            return result;
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
}
exports.default = FeedReaderParser;
