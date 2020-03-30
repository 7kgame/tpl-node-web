import { Autowired, Service, BusinessException, Page } from 'jbean'

import UserEntity from './entity/user'
<%_ if (datasource.indexOf('mysql') >= 0) { _%>
import UserRepository from './repository/UserRepository'
<%_ } _%>
<%_ if (datasource.indexOf('redis') >= 0) { _%>
import UserCacheRepository from './repository/UserCacheRepository'
<%_ } _%>

@Service
export default class UserService {

<%_ if (datasource.indexOf('mysql') >= 0) { _%>
  @Autowired
  private userRepository: UserRepository
<%_ } _%>

<%_ if (datasource.indexOf('redis') >= 0) { _%>
  @Autowired
  private userCacheRepository: UserCacheRepository
<%_ } _%>

  constructor () {
  }

  public beforeCall () {
    console.log('userService beforeCall')
  }

  public async hello (user: UserEntity) {
    let ret: Page<UserEntity> = null
<%_ if (datasource.indexOf('redis') >= 0) { _%>
    await this.userCacheRepository.getUser(123)
<%_ } _%>
<%_ if (datasource.indexOf('mysql') >= 0) { _%>
    let u: UserEntity = await this.userRepository.find(user)
    console.log(u)
    ret = await this.userRepository.searchByPage(null, 0, 2)
<%_ } _%>
    return ret
  }

}

