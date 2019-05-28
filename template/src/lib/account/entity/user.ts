import { Type, Entity, Id } from 'jbean'
import { Between, Regex, Required, Min, Max, Size, ValidationScene, Email } from '../../'

const REGISTER_SCENE1: string = 'register1'
const MODIFY_SCENE2: string = 'modify'

@Entity
export default class User {

  @Id
  @ValidationScene(REGISTER_SCENE1, MODIFY_SCENE2)
  @Required("uid是必填的参数")
  public uid = undefined

  @Required
  @ValidationScene(REGISTER_SCENE1)
  @Email
  @Size(2, 30, 'name的长度应该位于$min-$max之间')
  public name = undefined

  @Type('number')
  @ValidationScene(MODIFY_SCENE2)
  @Required("age is required")
  @Between(18, 20, 'error exist $field : $min $val')
  public age = undefined

  public static getTableNames (conditions, supportMulti: boolean, entity: any): string | string[] {
    console.log(conditions, '--------------')
    if (!supportMulti) {
      return 'user'
    }
    // return 'user'
    return ['user_1', 'user_2']
  }

}