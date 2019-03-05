import { Service, Autowired } from 'jweb';
import UserRepository from './repository/UserRepository';

@Service('userService0')
export default class UserService {

  @Autowired
  private userRepository: UserRepository;

  constructor () {
    console.log('new UserService');
  }
  public hello (): string {
    let res = this.userRepository.hello();
    let res = this.userRepository.helloRedis();
    let res = this.userRepository.helloMongo();
    console.log(res);
    return 'hello userService';
  }

}

