export default `
    type RoomMessage {
        id: String
        text: String
        sender: User
        room: Room
    }

    input RoomMessageInput {
        text: String
    }
  
    extend type Mutation {
        sendMessage( roomId: Int!, input: RoomMessageInput): RoomMessage
    }

    extend type Subscription {
        messageAdded(roomId: Int!): RoomMessage
    }
`
