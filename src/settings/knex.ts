import Knex from 'knex'
import { Model } from 'objection'
import knexFile from '../../knexfile'
const environment = process.env.ENVIRONMENT || 'development'
console.log({ environment })
const knex = Knex(knexFile[environment])

Model.knex(knex)

export default knex
