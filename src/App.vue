<template>
    <router-view />
</template>

<script setup lang="ts">
import { newslist } from "@/api/cms";
import { getad } from "@/api/ad";

async function getData() {
    const ret = await newslist();

    console.log(ret.result, ret.succ, ret);

    const { result: adresult, msg: admsg } = await getad();

    console.log(adresult, admsg);
}

getData();
</script>

<style scoped lang="less">
</style>
