<script>
import config from './config'
import { get } from './util'
export default {
  async created () {
    // 调用API从本地缓存中获取数据
    let url = config.host + '/weapp/demo'
    const res = await get(url)
    console.log(res.data.data.msg)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
