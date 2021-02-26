// index.js
// 获取应用实例
const app = getApp()
import {jsonLoginApi} from '../../api/request'
Page({
  data: {
    loading:false,
    formData: {
      userid:'',
      pwd:'',
    },
    toptipsConfig:{
      msg:'',
      type:'',
      show:false
    },
    rules: [{
        name: 'radio',
        rules: {required: true, message: '单选列表是必选项'},
    }, {
        name: 'checkbox',
        rules: {required: true, message: '多选列表是必选项'},
    }, {
        name: 'qq',
        rules: {required: true, message: 'qq必填'},
    }, {
        name: 'mobile',
        rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
    }, {
        name: 'vcode',
        rules: {required: true, message: '验证码必填'},
    }, {
        name: 'idcard',
        rules: {required: true, message: 'idcard必填'},
    }]
  },
  login(){
    let params = {
      ...this.data.formData
    };
    if(!params.userid || !params.pwd){
      this.setData({toptipsConfig:{
        msg:'用户名或密码不能为空！',
        type:'error',
        show:true
      }});
      return;
    }
    this.setData({loading:true});
    jsonLoginApi(params).then(data=>{
      this.setData({loading:false});
      let {JsonLoginResult} = data.data || {};
      console.log('===>>>',JsonLoginResult);
      if(JsonLoginResult.loginstatus === 'OK'){
        this.setData({toptipsConfig:{
          msg:'登录成功！',
          type:'success',
          show:true
        }});
        // 存储登录信息
        wx.setStorageSync('JsonLoginResult',JSON.stringify(JsonLoginResult));
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/goodsReceiptList/goodsReceiptList'
          })
        },2000);
      }else{
        this.setData({toptipsConfig:{
          msg:'请检查用户名或密码是否输入正确！',
          type:'error',
          show:true
        }});
      }
    });
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset;
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  onLoad() {
    try {
      let value = wx.getStorageSync('JsonLoginResult'),
      JsonLoginResult = JSON.parse(value);
      if (value && JsonLoginResult && JsonLoginResult.loginstatus === 'OK') {
        wx.redirectTo({
          url: '/pages/goodsReceiptList/goodsReceiptList'
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
})
