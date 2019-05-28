import {Entity, TableNameSeperatorType} from 'jbean'

@Entity(TableNameSeperatorType.underline)
export default class UserTelephone {
  uid: string = undefined
  phonenumber: number = undefined
}