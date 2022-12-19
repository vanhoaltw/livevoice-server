"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomType = exports.RoomStatus = exports.RoomMode = exports.Gender = exports.CacheControlScope = exports.AudienceRole = void 0;
var AudienceRole;
(function (AudienceRole) {
    AudienceRole["Audience"] = "audience";
    AudienceRole["Owner"] = "owner";
    AudienceRole["Speaker"] = "speaker";
})(AudienceRole = exports.AudienceRole || (exports.AudienceRole = {}));
var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Private"] = "PRIVATE";
    CacheControlScope["Public"] = "PUBLIC";
})(CacheControlScope = exports.CacheControlScope || (exports.CacheControlScope = {}));
var Gender;
(function (Gender) {
    Gender["Boy"] = "boy";
    Gender["Girl"] = "girl";
})(Gender = exports.Gender || (exports.Gender = {}));
var RoomMode;
(function (RoomMode) {
    RoomMode["ChaseImage"] = "chaseImage";
    RoomMode["Pairing"] = "pairing";
    RoomMode["Question"] = "question";
})(RoomMode = exports.RoomMode || (exports.RoomMode = {}));
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["Close"] = "close";
    RoomStatus["Live"] = "live";
    RoomStatus["Open"] = "open";
})(RoomStatus = exports.RoomStatus || (exports.RoomStatus = {}));
var RoomType;
(function (RoomType) {
    RoomType["Community"] = "community";
    RoomType["Private"] = "private";
    RoomType["Public"] = "public";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
//# sourceMappingURL=graphql.js.map