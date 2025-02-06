
<template>
  <div>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    <a href="https://vitejs.dev" target="_blank">
      <img :src="$require('img/7.png')" />
    </a>
    <span>{{ $format.date(new Date(), "yyyy-MM-dd hh:mm:ss") }}</span>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less" src="@/assets/css/common.less"></style>
<style scoped lang="less" src="@/assets/css/hi.less"></style>
