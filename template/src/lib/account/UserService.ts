import { Autowired, Service, BusinessException, Page } from 'jbean'
import UserDao from './repository/UserDao'
import UserEntity from './entity/user'
import UserRepository from './repository/UserRepository'

@Service
export default class UserService {

  @Autowired
  private userDao: UserDao

  @Autowired
  private userRepository: UserRepository

  constructor () {
  }

  public beforeCall () {
    console.log('userService beforeCall')
  }

  public async hello (user: UserEntity) {
    let d: UserEntity = await this.userRepository.find(user)
    console.log('userRepository.find ', d)
    let p: Page = await this.userRepository.searchByPage(null, 0, 2)
    console.log('userRepository.searchByPage', p)
    let res1 = this.userDao.hello(user)
    let res2 = this.userDao.helloMongo()
    let res3 = this.userDao.helloRedis()
    return Promise.all([res1, res2, res3])
  }

}

