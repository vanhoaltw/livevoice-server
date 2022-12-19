export default `
    scalar Date
    scalar DateTime
    scalar JSON
    scalar JSONObject
    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
        inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`
