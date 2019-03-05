import { Repository, Autowired } from 'jweb';
<%_ datasource.forEach(function(ds) {
  ds = ds.charAt(0).toUpperCase() + ds.slice(1);
_%>
import <%- ds -%>Dao from 'jweb-<%- ds -%>';
<%_ }); _%>

@Repository
export default class UserRepository {

<%_ datasource.forEach(function(ds) {
  var ds1 = ds.charAt(0).toUpperCase() + ds.slice(1);
_%>
  @Autowired('<%- ds -%>.primary')
  private <%- ds -%>: <%- ds1 -%>Dao;

<%_ }); _%>

  constructor () {
    console.log('new userRepository');
  }

  public async hello () {
    return new Promise((resolve, reject) => {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
      let client = this.mysql.getClient();
      client.query("use tp5", function(err, ret) {});
      client.query("select * from User limit 10", function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
        console.log(res);
      });
<%_ } _%>
    });
  }

  public async helloMongo () {
<%_ if(datasource.indexOf('mongo') >= 0) { _%>
    let dbName = 'test';
    let client = this.mongo.getClient();
    const db = client.db(dbName);
    const col = db.collection('user');
    return col.find({}).toArray();
<%_ } _%>
  }

  public async helloRedis () {
    return new Promise((resolve, reject) => {
<%_ if(datasource.indexOf('redis') >= 0) { _%>
      let client = this.redis.getClient();
      client.get('test', (err, val) => {
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      });
<%_ } _%>
    });
  }

}

