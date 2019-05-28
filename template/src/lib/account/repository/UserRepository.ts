import { Repository } from 'jbean'
import { MysqlRepository } from 'jweb-mysql'
import User from '../entity/user'

@Repository
export default class UserRepository extends MysqlRepository<User> {

  public constructor () {
    super(User)
  }

}