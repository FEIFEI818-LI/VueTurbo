<template>
  <router-view />
</template>

<script setup lang="ts">

import { newslist } from '@/api/cms';
import { getad } from '@/api/ad';


async function getData() {

  const ret = await newslist();

  console.log(ret.result, ret.succ, ret);

  const { result: adresult, msg: admsg } = await getad();

  console.log(adresult, admsg);

}

getData();

</script>

<style scoped lang="less">
.logo {
  height: 6em;
  padding: 1.5em;
  transition: filter 300ms;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
