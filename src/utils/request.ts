import axios from "axios";
import { Message } from "view-ui-plus";
function err_function(error: any,isError: boolean) {
  /** 错误请求的处理*/
  let message = "",
  errorCode = 0;
  if (error.message && error.message === "cancel") return message ;
  if (!error.response) {
    errorCode = 500;
    message = "错误码：500 ， 错误信息：后台服务无响应,请检查网络是否可用"
  } else {
    const data = error.response.data;
    if (data && data instanceof Object) {
      message = data.message;
      errorCode = data.error;
    } else {
      message = data || "接口数据异常";
      errorCode = error.response.status;
    }
  }
  if(!isError) return;
  Message.error({
    content: "错误码：" + errorCode + "，错误信息：" + message,
    duration: 20,
    closable: true,
  });
  return message
}
const instance = axios.create({
  withCredentials: true,
});
interface messageConfig {
  isError?: boolean,
  isMsg?: boolean,
  message?: string
}
let messageObj:messageConfig = {
  isError: true,
  isMsg: false,
  message: ''
};

/** request拦截器*/
instance.interceptors.request.use(
  (options:any) => {
    if (typeof options === "string") {
      options = { url: options, method: "GET" };
    }
    const {
      query,
      isMsg = false,
      isError = true,
      message,
      ...config
    } = options;
    messageObj = {
      isMsg,
      isError,
      message,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/** 返回数据拦截*/

instance.interceptors.response.use(
  (res):any => {
    const { isMsg, message } = messageObj;
    if (isMsg) {
      Message.success({
        content: message,
        duration: 3,
        showClose: true,
      });
    }
    return { data: res.data || {}, code: 1, status: res.status };
  },
  (error) => {
   const {isError = true} = messageObj
   const errMessage =  err_function(error,isError);
    return Promise.resolve({
      data: null,
      code: 0,
      errMessage,
      response: error.response,
    });
  }
);

const request = (config: any) =>{
  return instance(config)
}

export default request;
