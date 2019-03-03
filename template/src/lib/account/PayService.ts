import { Service, Autowired } from 'qk-web';

@Service
export default class PayService {

  constructor () {
    console.log('new payService');
  }

  public hello (): string {
    return 'hello payService';
  }

}

