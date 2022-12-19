import { Model } from 'objection'

class BaseModel extends Model {
  created?: Date
  updated?: Date

  $beforeInsert() {
    const currentTime = new Date()
    this.created = this.created || currentTime
    this.updated = currentTime
  }

  $beforeUpdate(): void {
    delete this.created
    this.updated = new Date()
  }
}

export default BaseModel
