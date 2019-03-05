import { Service, Autowired } from 'jweb';

@Service
export default class PayService {

  constructor () {
    console.log('new payService');
  }

  public hello (): string {
    return 'hello payService';
  }

}

