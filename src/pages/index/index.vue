<template>
  <div>
    123
  </div>
</template>

<script>
import { get } from '@/util.js'
export default {
  async created () {
    let url = 'http://120.78.84.181/goods'
    const res = await get(url)
    console.log(res)
  }
}
</script>

<style scoped>
</style>