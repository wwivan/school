// Page({
//   onLoad(query) {
//     // 页面加载
//     console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
//   },
//   onReady() {
//     // 页面加载完成
//   },
//   onShow() {
//     // 页面显示
//   },
//   onHide() {
//     // 页面隐藏
//   },
//   onUnload() {
//     // 页面被关闭
//   },
//   onTitleClick() {
//     // 标题被点击
//   },
//   onPullDownRefresh() {
//     // 页面被下拉
//   },
//   onReachBottom() {
//     // 页面被拉到底部
//   },
//   onShareAppMessage() {
//     // 返回自定义分享信息
//     return {
//       title: '校园通行一脸通',
//       desc: 'My App description',
//       path: 'pages/index/index',
//     };
//   },
// });
const app = getApp();

Page({
  // 声明页面数据
  data: {
    focus: true,
  },
  // bindButtonTap() {
  //   this.setData({
  //     focus: true,
  //   });
  // },
  telInput(e) {
    this.setData({
        phoneNo: e.detail.value,
    });
  },
  IdInput(e) {
    this.setData({
        identityNo: e.detail.value,
    });
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    // 获取用户信息并存储数据
    app.getUserInfo().then(
      user => this.setData({
        user
      }),
    );
  },
  // 监听生命周期回调 onShow
  onShow() {
    // 设置全局数据到当前页面数据
    this.setData({ todos: app.todos });
  },
  // 事件处理函数
  onTodoChanged(e) {
    // 修改全局数据
    const checkedTodos = e.detail.value;
    app.setTodos(app.todos.map(todo => ({
      ...todo,
      completed: checkedTodos.indexOf(todo.text) > -1,
    })));
    this.setData({ todos: app.todos });
  },
  // login(){
  //    my.request({
  //     url: 'http://49.235.80.78:8082/faceapi/api/face/getIdentity',
  //     method: 'POST',
  //     data: {
  //       "resquestParam": {
  //         "appId": "11111",
  //         "identityNo": "22222",
  //         "parentTel": "13399995555",
  //         "parentName": "张三"
  //       },
  //       "sysParam": {

  //       }
  //     },
  //     dataType: 'json',
  //     success: function(res) {
  //       console.info(res)
  //       my.alert({ content: 'success' });
  //     },
  //     fail: function(res) {
  //       my.alert({ content: 'fail' });
  //     },
  //     complete: function(res) {
  //       my.hideLoading();
  //       my.alert({ content: 'complete' });
  //     }
  //   })
  // },
  stuChoose() {
    // 进行页面跳转
    my.setStorage({
      key: 'userType',
      data: {
        userType: "student"
      },
      success: function() {
        my.alert({ content: '写入成功' });
      }
    });
    my.navigateTo({ url: "../userInfo/userInfo" });

  },
  parChoose() {
    // 进行页面跳转
    my.setStorage({
      key: 'userType',
      data: {
        userType: "parent"
      },
      success: function() {
        my.alert({ content: '写入成功' });
      }
    });
    my.navigateTo({ url: "../userInfo/userInfo" });
  },
  teacChoose() {
    // 进行页面跳转
    my.setStorage({
      key: 'userType',
      data: {
        userType: "teacher"
      },
      success: function() {
        my.alert({ content: '写入成功' });
      }
    });
    my.navigateTo({ url: "../userInfo/userInfo" });
  },
  login() {
    app.schoolList(this.data.phoneNo,this.data.identityNo,this.data.user.nickName)
    my.navigateTo({ url: "../main/main" });
  }
});
