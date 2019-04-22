import { Autowired, Service } from 'jbean'
import UserRepository from './repository/UserRepository'
import UserEntity from './entity/user'

@Service('userService0')
export default class UserService {

  @Autowired
  private userRepository: UserRepository

  constructor () {
  }

  public async hello () {
    let res1 = this.userRepository.helloMongo()
    let res2 = this.userRepository.helloRedis()
    return Promise.all([res1, res2])
  }

  public async getUser (condition: object) {
    return this.userRepository.getUser(condition)
  }

  public async createUser (user: UserEntity) {
    return this.userRepository.createUser(user)
  }

  public async deleteUser (condition: object) {
    return this.userRepository.deleteUser(condition)
  }

  public async updateUser (user: UserEntity, condition: object) {
    return this.userRepository.updateUser(user, condition)
  }

  public async getUsers (condition: object) {
    return this.userRepository.getUsers(condition)
  }

}