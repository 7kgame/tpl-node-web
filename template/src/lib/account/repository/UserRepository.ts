import { Repository, Autowired } from 'qk-web';
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

  public hello () {
<%_ if(datasource.indexOf('mysql') >= 0) { _%>
    let client = this.mysql.getClient();
    client.query("use tp5", function(err, ret) {});
    client.query("select * from User limit 10", function(err, res) {
      console.log(res);
    });
<%_ } _%>
  }

  public helloMongo () {
<%_ if(datasource.indexOf('mongo') >= 0) { _%>
    let dbName = 'test';
    let client = this.mongo.getClient();
    const db = client.db(dbName);
    const col = db.collection('user');
    col.find({}).toArray(function(err, items) {
      console.log(items);
      console.log('item', items.length);
    });
<%_ } _%>
  }

  public helloRedis () {
<%_ if(datasource.indexOf('redis') >= 0) { _%>
    let client = this.redis.getClient();
    client.get('test', (err, val) => {
      console.log('test: ', val);
    });
<%_ } _%>
  }

}

