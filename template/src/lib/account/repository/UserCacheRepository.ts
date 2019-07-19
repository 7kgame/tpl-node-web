import { Repository } from 'jbean'
import { RedisRepository, RedisClient } from 'jweb-redis'
import User from '../entity/user'

@Repository
export default class UserCacheRepository extends RedisRepository<User> {

  public constructor () {
    super(User)
  }

  public testMulti (): Promise<any> {
    return new Promise((res, rej) => {
      const client: RedisClient = this.getClient()
      client.multi().
        get('key1').
        set('key2', 'val2').
        exec((err, data) => {
          if (err) {
            rej(err)
          } else {
            console.log(data)
            res(data)
          }
        })
    })
  }

  public async getUser (uid: number|string) {
    let a = {
      name: 'jack',
      sex: 1
    }
    await this.set(uid, JSON.stringify(a))
    let user = await this.get(uid)
    console.log(user, '-------')

    user = await this.get(uid, JSON.parse)
    console.log(user, '---======----')
  }

}
