const app = getApp();

Page({
  // 声明页面数据
  data: {
    city: "无锡市",
  },
  // 监听生命周期回调 onLoad
  childName(e) {
    this.setData({
      childName: e.detail.value,
    });
  },
  childId(e) {
    this.setData({
      childId: e.detail.value,
    });
  },
  relationship(e) {
    this.setData({
      relationship: e.detail.value,
    });
  },
  parName(e) {
    this.setData({
      parName: e.detail.value,
    });
  },
  parTel(e) {
    this.setData({
      parTel: e.detail.value,
    });
  },
  identityNo(e) {
    this.setData({
      identityNo: e.detail.value,
    });
  },
  onLoad() {
    // 获取用户信息并存储数据
    app.getUserInfo().then(
      user => this.setData({
        user
      }),
    );
    // app.getStore().then(
    //   userType =>this.setData({
    //     userType
    //   })
    // );

    app.getStore('userType').then(
      userType => this.setData({
        userType: userType.userType
      })
    )

    app.getStore('school').then(
      school => this.setData({
        school: school.school
      })
    )
  },
  // 监听生命周期回调 onShow
  onShow() {
    // 设置全局数据到当前页面数据

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
  chooseSchool() {
    // 进行页面跳转
    my.navigateTo({ url: '../school/school' });
  },
  getFace() {
    app.getFace().then(
      
    )
  },
  confirm() {
    if (this.data.userType != '1') {
      app.confirm(this.data.userType, this.data.school.id, this.data.user.nickName, this.identityNo)
    } else {
      app.confirmPar(this.data.userType, this.data.school.id, this.data.user.nickName, this.data.childId, this.data.childName, this.data.parTel)
    }

  }
});