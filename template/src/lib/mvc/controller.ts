import * as Path from 'path'
import Template from './template'
import { EXT_KEY, LAYOUT_DIR_KEY, METHOD_KEY, TPL_DIR_KEY } from '../annos/controller'

export default abstract class Controller {

  private tpl: Template

  private initTemplate (): void {
    if ( !this.tpl) {
      this.tpl = new Template()
    }
  }

  protected template (name: string, fileName: string, data?: object, options?: object): void {
    this.initTemplate()
    if (!Path.isAbsolute(fileName)) {
      fileName = this[TPL_DIR_KEY] + fileName
    }
    this.tpl.assignFile(name, fileName, data, options)
  }

  protected templateValue (name: string, value: any): void {
    this.initTemplate()
    this.tpl.assign(name, value)
  }

  protected templateValues (data: object): void {
    this.initTemplate()
    this.tpl.assigns(data)
  }

  // TODO: return Promise<string>
  protected show (fileName: string, contentKey?: string, withoutDefaultLayoutDir?: boolean): string {
    this.initTemplate()
    if ( !withoutDefaultLayoutDir ) {
      fileName = this[LAYOUT_DIR_KEY] + fileName + '.' + this[EXT_KEY]
    }
    if ( !contentKey ) {
      contentKey = 'content'
    }
    let tplFileName = this[TPL_DIR_KEY] + this[METHOD_KEY] + '.' + this[EXT_KEY]
    this.template(contentKey, tplFileName, null, {
      filename: this[TPL_DIR_KEY]
    })
    return this.tpl.render(fileName, null, {
      filename: this[LAYOUT_DIR_KEY]
    })
  }

}
