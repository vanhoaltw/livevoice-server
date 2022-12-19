import BaseModel from './Base'

class Topic extends BaseModel {
  id!: number
  title: string
  slug: string

  constructor() {
    super()
  }

  static tableName: string = 'topic'

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 50 },
        slug: { type: 'string', minLength: 1, maxLength: 100 },
      },
    }
  }
}

export default Topic
