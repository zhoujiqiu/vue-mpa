export default (router) => router.map({
  '/': {
    name: 'list',
    component: function (resolve) {
      require(['./list'], resolve)
    }
  },
  '/id/:id': {
    name: 'detail',
    component: function (resolve) {
      require(['./detail'], resolve)
    }
  }
})
