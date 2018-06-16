# tradetest

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

用微信开发者工具打开当前目录进行查看

# 主要功能
1.首页可以上拉刷新，到底自动加载下一页商品，搜索功能，详细页面功能。
2.点击搜索进入搜索页面，通过vuex进行商品信息的管理，搜索筛选到的是根据vuex中的商品信息。利用storage记录搜索历史。
3.点击商品进入商品页面，通过查看单个产品详情接口获取到相关信息显示在页面上。
4.我的页面 点击授权显示头像和相关openId，控制台打印个人详细信息。

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
