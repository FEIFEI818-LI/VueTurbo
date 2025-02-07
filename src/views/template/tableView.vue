<template>
    <table-list :columns="titleList" :data="dataList" showBorder>
        <template #slotDate="{ titleItem }">
            <div class="user-info">
                <span class="ellipsis">{{ titleItem.title }}</span>
            </div>
        </template>
    </table-list>
</template>

<script setup lang="ts">
import Mock from "mockjs";
import tableList from "@/components/table/index.vue";
// 设置数据
function setData(len, obj) {
    return Array.from({ length: len }).map((item) => {
        return Mock.mock(obj);
    });
}

const titleList = [
    {
        title: "日期",
        width: 100,
        key: "date",
        ellipsis: true,
        fixed: "left",
        slotHeader: "slotDate",
    },
    {
        title: "姓名",
        width: 95,
        key: "name",
        sort: 2,
        fieldName: 1,
        align: "right",
        commaSplice: true,
        // formatter
    },
    {
        title: "年龄",
        width: 95,
        key: "age",
        sort: 2,
        fieldName: 1,
        align: "right",
        commaSplice: true,
    },
    {
        title: "公司",
        width: 95,
        key: "company",
        sort: 2,
        fieldName: 1,
        align: "right",
        commaSplice: true,
    },
    {
        title: "岗位",
        width: 95,
        key: "work",
        sort: 2,
        fieldName: 1,
        align: "right",
        commaSplice: true,
    },
    {
        title: "城市",
        width: 130,
        key: "city",
        align: "right",
        commaSplice: true,
        sort: 0,
        fieldName: 3,
        ellipsis: true,
    },
];
const dataObj = {
    date: "@date",
    name: "@cname",
    age: "@integer(24, 65)",
    company: '@pick(["阿里", "腾讯", "字节"])',
    work: '@pick(["产品", "运营", "ui", "前端", "后端", "测试", "运维"])',
    city: "@city()",
};
const dataList = setData(Mock.mock("@natural(15, 25)"), dataObj);
</script>
