export const formatDate = (time=Date.now()) =>{
        const t = new Date(time)
        let Y = t.getFullYear()
        let M = t.getMonth() +1
        M = M < 10 ? '0'+M : M
        let D = t.getDate()
        D = D <10 ? '0' + D : D
        let h = t.getHours()
        h = h < 10 ? '0' + h : h
        let m = t.getMinutes()
        m = m < 10 ? '0' + m : m 
        let s = t.getSeconds()
        s = s <10 ? '0' + s : s            
        
        return `${Y}-${M}-${D}  ${h}:${m}:${s}`  
}