import { Service, Autowired } from 'qk-web';
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
    console.log(res);
    return 'hello userService';
  }

}

