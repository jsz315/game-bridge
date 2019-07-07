import {httpGet, httpPost} from './request'
/**
 * 获取url中特定字符串的值
 * @param {*} name 字符串key
 * @param {*} path 默认为页面链接地址，也可自己传某段string
 */
const getParamUrl = (name, path = window.location.href) => {
    const result =
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [
          undefined,
          ''
        ])[1].replace(/\+/g, '%20')
      ) || null;
    return result ? result : '';
  };

  const createUUID = (n) => {
    let list = [];
    for(let i = 0; i < n; i++){
        let n = Math.floor(Math.random() * 10);
        list.push(n);
    }
    return list.join("");
  }


  const hpGet = (url, param, callback)=>{
    httpGet(url, param).then(res=>{
        callback(res);
    })
  }

  const hpPost = (url, param, callback)=>{
    httpPost(url, param).then(res=>{
        callback(res);
    })
  }

  window.GAME = {
      tool: {
        getParamUrl: getParamUrl,
        hpGet: hpGet,
        hpPost: hpPost,
        createUUID: createUUID
      }
  }