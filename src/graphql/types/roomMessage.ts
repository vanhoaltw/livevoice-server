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
  
    type Mutation {
        sendMessage( roomId: Int!, input: RoomMessageInput): RoomMessage
    }

    type Subscription {
        messageAdded(roomId: Int!): RoomMessage
    }
`
