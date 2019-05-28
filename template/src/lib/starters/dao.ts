import Application from '../application'
import { BeanFactory } from 'jbean'

export default async function daoInit (application: Application) {
  const configNS: string = application.configNS
  const applicationConfigs = application.applicationConfigs
  if ( !applicationConfigs ||
      !applicationConfigs[configNS] ||
      !applicationConfigs[configNS].data ) {
    return
  }

  const dataConfigs = applicationConfigs[configNS].data
  let dbKeys = Object.keys(dataConfigs)

  for (let i0 = 0; i0 < dbKeys.length; i0++) {
    let db = dbKeys[i0]
    let dataConfig = dataConfigs[db]
    if ( !Array.isArray(dataConfig) ) {
      dataConfig = [dataConfig]
    }
    if (!dataConfig[0].dao) {
      throw new Error(db + '.dao is required.')
    }
    let daoPath = dataConfig[0].dao
    let dao = require(daoPath)
    if (dao.default) {
      dao = dao.default
    }
    let i = 0
    for (let j = 0; j < dataConfig.length; j++) {
      let config = dataConfig[j]
      let beanName = db + '.' + ( config.bean ? config.bean : 'db' + i )
      if ( !config.bean ) {
        i++
      }
      let daoIns = new dao(config)
      if ( typeof config.autoconnect === 'undefined' || config.autoconnect) {
        if (daoIns.connect) {
          await daoIns.connect()
        }
      }
      BeanFactory.addBean(beanName, daoIns, true)
    }
  }
}