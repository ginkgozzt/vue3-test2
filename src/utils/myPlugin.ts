
import request from './request'
const myPlugin = {
  install(app: { provide: (arg0: string, arg1: any) => void; }) {
    // 配置此应用
    // app.config.globalProperties.request = request 
    app.provide('request',request) 
    console.log(app,'app');
    
  }
}
export default myPlugin