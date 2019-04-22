import { Autowired, Repository } from 'jbean'
<%_ datasource.forEach(function(ds) {
  var ds1 = ds.charAt(0).toUpperCase() + ds.slice(1)
_%>
import <%- ds1 -%>Dao from 'jweb-<%- ds -%>'
<%_ }); _%>
import UserEntity from '../entity/user'

@Repository
export default class UserRepository {

<%_ datasource.forEach(function(ds) {
  var ds1 = ds.charAt(0).toUpperCase() + ds.slice(1)
_%>
  @Autowired('<%- ds -%>.primary')
  private <%- ds -%>: <%- ds1 -%>Dao

<%_ }); _%>

  constructor () {
  }

  public async createUser (user: UserEntity) {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
    return this.mysql.insert(user)
<%_ } _%>
  }

  public async deleteUser (condition: any) {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
    return this.mysql.delete(UserEntity, condition)
<%_ } _%>
  }

  public async updateUser (user: UserEntity, condition: any) {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
    return this.mysql.update(user, condition)
<%_ } _%>
  }

  public async getUsers (condition: any) {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
    return this.mysql.select(UserEntity, condition)
<%_ } _%>
  }

  public async getUser (condition: object) {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
    return this.mysql.getEntity(UserEntity, condition)
<%_ } _%>
  }

  public async helloMongo () {
<%_ if(datasource.indexOf('mongo') >= 0) { _%>
    let dbName = 'test'
    let client = this.mongo.getClient()
    const db = client.db(dbName)
    const col = db.collection('user')
    return col.find({}).toArray()
<%_ } _%>
  }

  public async helloRedis () {
    return new Promise((resolve, reject) => {
<%_ if(datasource.indexOf('redis') >= 0) { _%>
      let client = this.redis.getClient()
      client.get('test', (err, val) => {
        if (err) {
          reject(err)
        } else {
          resolve(val)
        }
      })
<%_ } _%>
    })
  }

}

