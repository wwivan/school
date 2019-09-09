App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  // 声明全局数据

  userInfo: null,
  value: null,
  baseUrl: "http://49.235.80.78:8082/faceapi/api",
  // 声明全局方法
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);
      // 调用用户授权 API
      my.getAuthCode({
        scopes: ['auth_user'],
        success: authcode => {
          console.info(authcode);
          // 调用获取用户信息 API
          my.getAuthUserInfo({
            success: res => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
  //封裝getStorage方法
  getStore(key1) {
    return new Promise((resolve, reject) => {
      my.getStorage({
        key: key1,
        success: res => {
          // 调用获取用户信息 API
          this.storage = res.data
          resolve(this.storage)
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
  //

  schoolList(phoneNo, identityNo, nickName) {
    my.request({
      url: this.baseUrl + "/face/getIdentity",
      method: 'POST',
      data: {
        "resquestParam": {
          "appId": "11111",
          "identityNo": identityNo,
          "parentTel": phoneNo,
          "parentName": nickName
        },
        "sysParam": {

        }
      },
      dataType: 'json',
      success: function(res) {
        console.info(res)
        my.setStorage({
          key: 'schoolList',
          data: {
            schoolList: res.data
          },
          // success: function() {
          //   my.alert({ content: '登陸成功' });
          // }
        });
        // my.alert({ content: 'success' });
      },
      fail: function(res) {
        my.alert({ content: 'fail' });
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({ content: 'complete' });
      }
    })
  },
  //人脸采集
  getFace() {
    return new Promise((resolve, reject) => {
      const bizId = (new Date().getTime()).toString();
      my.ap.faceVerify({
        // retCodeSub:'344344',
        // zimId:'eeea',
        // faceRetCode:'eeeeeawwe',
        
        bizId, // 业务流水号，商户自行生成，需要保证唯一性，不超过64位
        bizType: '2', // 业务场景参数，1 代表人脸采集  
        // useBackCamera: true, // 是否使用后置摄像头，true为使用后置摄像头；不设置时，默认使用前置摄像头
        success: (res) => {
          my.alert({
            content: JSON.stringify(res),
          });
        },
        fail: (res) => {
          my.alert({
            content: JSON.stringify(res),
          });
        }
      });
    })
  },

  // getFace() {
  //   alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do", "app_id", "your private_key", "json", "GBK", "alipay_public_key", "RSA2");
  //   request = new ZolozIdentificationUserWebQueryRequest();
  //   request.setBizContent("{" +
  //     "\"biz_id\":\"5456897876546767654\"," +
  //     "\"zim_id\":\"731be7f204a962b0486a9b64ea3050ae\"," +
  //     "\"extern_param\":\"{\\\"bizType\\\":\\\"1\\\"}\"" +
  //     "}");
  //   response = alipayClient.execute(request);
  //   if (response.isSuccess()) {
  //     System.out.println("调用成功");
  //     console.info(response)
  //   } else {
  //     System.out.println("调用失败");
  //   }

  // },
  //学生合老师
  confirm(userType, schoolId, nickName, identityNo) {
    my.request({
      url: this.baseUrl + "/face/determination",
      method: 'POST',
      data: {
        "resquestParam": {
          "identity": userType,
          "schoolId": schoolId,
          "name": nickName,
          "identityNo": identityNo
        },
        "sysParam": {

        }
      },
      dataType: 'json',
      success: function(res) {
        console.info(res)
        my.setStorage({
          key: 'determination',
          data: {
            determination: res.data
          },
          success: function() {
            my.alert({ content: '录入成功' });
          }
        });
        // my.alert({ content: 'success' });
      },
      fail: function(res) {
        my.alert({ content: 'fail' });
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({ content: 'complete' });
      }
    })
  },
  //家长
  confirmPar(userType, schoolId, nickName, childId, childName, parTel) {
    my.request({
      url: this.baseUrl + "/face/determination",
      method: 'POST',
      data: {
        "resquestParam": {
          "identity": userType,
          "schoolId": schoolId,
          "name": childName,
          "identityNo": childId,
          "parentTel": parTel,
          "parentName": nickName
        },
        "sysParam": {

        }
      },
      dataType: 'json',
      success: function(res) {
        console.info(res)
        my.setStorage({
          key: 'determination',
          data: {
            determination: res.data
          },
          success: function() {
            my.alert({ content: '录入成功' });
          }
        });
        // my.alert({ content: 'success' });
      },
      fail: function(res) {
        my.alert({ content: 'fail' });
      },
      complete: function(res) {
        // my.hideLoading();
        // my.alert({ content: 'complete' });
      }
    })
  }

});
