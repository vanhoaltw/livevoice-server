"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomType = exports.RoomStatus = exports.RoomMode = exports.ReactPostAction = exports.PostType = exports.PostStatus = exports.Gender = exports.FollowAction = exports.CacheControlScope = exports.AudienceRole = exports.AttachType = void 0;
var AttachType;
(function (AttachType) {
    AttachType["Album"] = "album";
    AttachType["Video"] = "video";
})(AttachType = exports.AttachType || (exports.AttachType = {}));
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
var FollowAction;
(function (FollowAction) {
    FollowAction["Follow"] = "follow";
    FollowAction["Unfollow"] = "unfollow";
})(FollowAction = exports.FollowAction || (exports.FollowAction = {}));
var Gender;
(function (Gender) {
    Gender["Boy"] = "boy";
    Gender["Girl"] = "girl";
})(Gender = exports.Gender || (exports.Gender = {}));
var PostStatus;
(function (PostStatus) {
    PostStatus["Private"] = "private";
    PostStatus["Public"] = "public";
    PostStatus["Social"] = "social";
})(PostStatus = exports.PostStatus || (exports.PostStatus = {}));
var PostType;
(function (PostType) {
    PostType["Album"] = "album";
    PostType["Video"] = "video";
})(PostType = exports.PostType || (exports.PostType = {}));
var ReactPostAction;
(function (ReactPostAction) {
    ReactPostAction["Like"] = "like";
    ReactPostAction["Unlike"] = "unlike";
})(ReactPostAction = exports.ReactPostAction || (exports.ReactPostAction = {}));
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