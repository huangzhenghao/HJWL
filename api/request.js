const BaseUrl = 'http://47.103.130.131:8080/';
const request = ({url,method,data})=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url,
            method,
            timeout:1000000000,
            header: {
                "content-type": "application/json"
            },
            data,
            success (data) {
                resolve(data);
            },
            fail(err){
                console.log(err);
                reject(err);
            }
        });
    });
}

// 登录
export function jsonLoginApi(params){
    return request({
        url: BaseUrl + 'Interface/JsonLoginService.svc/JsonLogin',
        method:'POST',
        data:params,
    });
}

// 待签收单列表
export function JsonGetDeliOrderHeadDsApi(params){
    return request({
        url: BaseUrl + 'Interface/JsonDeliveryOrderService.svc/JsonGetDeliveryOrderHeadDs',
        method:'POST',
        data:params,
    });
}