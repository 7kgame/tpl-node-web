import * as FS from 'fs'
import * as ejs from 'ejs'
import { merge } from 'jbean'

export default class Template {

  private isDev: boolean = process.env.NODE_ENV === 'development'

  private static tpls = {}
  private data = {}

  public assign (name: string, value: any): void {
    this.data[name] = value
  }

  public assigns (data: object): void {
    if (!data) {
      return
    }
    Object.keys(data).forEach( name => {
      this.assign(name, data[name])
    })
  }

  public assignFile (name: string, fileName: string, data?: object, options?: object): void {
    data = data || {}
    merge(data, this.data)
    this.assign(name, this.render(fileName, data, options))
  }

  public render (fileName: string, data?: object, options?: object): string {
    const tpl = this.getTemplateFile(fileName)
    let html:string = ejs.render(tpl, data ? data : this.data, options)
    return html
  }

  private getTemplateFile (fileName: string): string {
    if ( this.isDev || !Template.tpls[fileName] ) {
      Template.tpls[fileName] = FS.readFileSync(fileName, 'utf8')
    }
    return Template.tpls[fileName]
  }

}
