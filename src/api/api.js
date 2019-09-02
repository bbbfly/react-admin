import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
const base = ''
//全局请求拦截器 
axios.interceptors.request.use((config) => {
    const { method , data } = config
    if ( method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config
})
// 全局响应拦截器
axios.interceptors.response.use( res => {
    return res.data
},err => {
    message.error(err.message)
    return new Promise(()=>{})
})

export const reqLogin = (username,password) => {
    return axios({
                url: base + '/login',
                method:'POST',
                data:{
                    username,
                    password
                }
           })
}

