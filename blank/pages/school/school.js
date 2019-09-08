const app = getApp();

Page({
  // 声明页面数据
  data: {
    city: "无锡市",
    schools: ["无锡光华小学", "锡师附小", "大桥小学"]
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    // 获取用户信息并存储数据
    app.getUserInfo().then(
      user => this.setData({
        user
      }),
    );
    app.getStore("schoolList").then(
      schoolList => this.setData({
        schoolList: schoolList.schoolList
      })
    )
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
  tddoChoose(e) {
    console.info(e)
    my.setStorage({
      key: 'school',
      data: {
        school: e.target.targetDataset.value
      },
      // success: function() {
      //   my.alert({ content: '录入成功' });
      // }
    });

    // 进行页面跳转
    my.navigateTo({ url: '../userInfo/userInfo' });
  },
});