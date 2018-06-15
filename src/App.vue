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
@import './style/iconfont.css';
</style>
