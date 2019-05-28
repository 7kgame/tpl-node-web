import { Entity } from 'jweb'

@Entity
export default class User {

  public uid: string = undefined
  public name: string = undefined
  public age: number = undefined

}