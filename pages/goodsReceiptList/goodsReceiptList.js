// index.js
// 获取应用实例
const app = getApp()
import {JsonGetDeliOrderHeadDsApi} from '../../api/request'
Page({
  data: {
    loading: false,
    Getdoheadlist:[],
  },
  // 初始化列表
  initList(){
    let tel = '';
    try {
      let value = wx.getStorageSync('JsonLoginResult'),
      JsonLoginResult = JSON.parse(value);
      if (value && JsonLoginResult && JsonLoginResult.loginstatus === 'OK') {
        tel = JsonLoginResult.tel;
      }
    } catch (e) {console.log(e);}
    let params = {
      tel,
      donum:"",     //查询关键字
      status:"4"    //status： 4是待签收， 8是已签收
    };
    wx.showLoading({
      mask:true,
      title: '加载中',
    })
    JsonGetDeliOrderHeadDsApi(params).then(data=>{
      wx.hideLoading();
      if(data.statusCode === 200){
        let {JsonGetDeliveryOrderHeadDsResult:{Getdoheadlist}} = data.data || {};
        console.log('===>>>',Getdoheadlist);
        this.setData({Getdoheadlist:Getdoheadlist.slice(0,100)});
      }
    });
  },
  onLoad(){
    this.initList();
  },
})
