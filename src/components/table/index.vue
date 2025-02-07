<template>
    <div class="table-block">
        <div class="table-block-list" ref="tableRef">
            <div
                v-for="item in unref(columnArr)"
                :key="item.fixed"
                class="table-block-list-content"
                :class="[item.shadow && `content-${item.fixed}`]"
                :style="{
                    width: item.width,
                }"
            >
                <tableTitle
                    v-if="showTitle"
                    v-bind="$attrs"
                    :columns="item.titleList"
                    :rowWidth="item.colWidth"
                    :fixedCol="item.fixed"
                    :isXScroll="isXScroll"
                    :id="item.fixed === 'center' ? rowTitleId : ''"
                    @scroll="(e) => onscrollHandler(e, rowListId)"
                >
                    <template
                        v-for="ite in item.headerSlots"
                        #[ite.slotHeader]="{ titleItem }"
                    >
                        <slot :name="ite.slotHeader" :titleItem="titleItem">
                        </slot>
                    </template>
                </tableTitle>
                <list
                    v-if="showList && data.length > 0"
                    v-bind="$attrs"
                    :columns="item.titleList"
                    :data="data"
                    :rowWidth="item.colWidth"
                    :fixedCol="item.fixed"
                    :isXScroll="isXScroll"
                    :id="item.fixed === 'center' ? rowListId : ''"
                    @scroll="(e) => onscrollHandler(e, rowTitleId)"
                >
                </list>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    reactive,
    computed,
    unref,
    onMounted,
    nextTick,
    useSlots,
} from "vue";
import tableTitle from "./title.vue";
import list from "./list.vue";

const props = defineProps({
    // 展示的列
    columns: {
        type: Array,
        default: () => [],
    },
    // 源数据
    data: {
        type: Array,
        default: () => [],
    },
    // 是否显示标题头
    showTitle: {
        type: Boolean,
        default: true,
    },
    // 是否显示列表数据
    showList: {
        type: Boolean,
        default: true,
    },
});
// 设置一个屏幕默认宽度
const defaultConst = reactive({
    viewWidth: 360,
});
// 获取屏幕宽度
function getViewWidth(dom: HTMLElement): any {
    if (!dom.value) {
        return defaultConst.viewWidth;
    }
    const tableBlockStyle = window.getComputedStyle(dom.value);
    const width = +tableBlockStyle.width.replace("px", "");
    const paddingLeft = +tableBlockStyle.paddingLeft.replace("px", "");
    const paddingRight = +tableBlockStyle.paddingRight.replace("px", "");
    const widthSum = width - paddingLeft - paddingRight;
    return !Number.isNaN(widthSum) ? widthSum : defaultConst.viewWidth;
}

const tableRef = ref(null);
onMounted(() => {
    nextTick(() => {
        // 获取屏幕宽度
        defaultConst.viewWidth = getViewWidth(tableRef);
    });
});

const fixedWidthDefault = ref(70); // 单元格默认宽度

// 获取列宽和
function getColWidth(arr: Array, defaultWidth: any): any {
    return +arr
        .reduce((pre, cur) => {
            pre += cur.width ? +cur.width : defaultWidth;
            return pre;
        }, 0)
        .toFixed(2);
}

// 计算表格每一行宽度
const rowWidth = computed(() => {
    return props.columns.reduce((pre, cur) => {
        pre += cur.width ? +cur.width : fixedWidthDefault;
        return pre;
    }, 0);
});
// x轴宽度超出屏幕宽度
const isXScroll = computed(() => {
    return rowWidth.value - defaultConst.viewWidth > 0;
});

const rowTitleId = ref(`rowTitle${Math.ceil(Math.random() * 10 ** 10)}`);
const rowListId = ref(`rowList${Math.ceil(Math.random() * 10 ** 10)}`);
// title和list同步滚动
const onscrollHandler = function (e: HTMLElement, id: any) {
    const dom = document.querySelector(`#${id}`);
    if (dom) {
        dom.scrollLeft = e?.target?.scrollLeft;
    }
};

const slots = useSlots();
// 获取title 插槽
function getHeaderSlots(arr: Array) {
    return arr.filter((item) => item.slotHeader && slots[item.slotHeader]);
}

// 渲染的列包括左侧固定列，中间列，右侧固定列
const fixedArr = ["left", "center", "right"];

// 最终遍历的数据
const columnArr = computed(() => {
    const obj = fixedArr.reduce((pre, key) => {
        pre[key] = [];
        return pre;
    }, {});
    props.columns.forEach((item, index) => {
        // fixed 值为 String
        if (item.fixed === "left" || item.fixed === "right") {
            obj[item.fixed].push(item);
        } else {
            obj.center.push(item);
        }
    });
    // 分别计算左侧固定列，中间列，右侧固定列宽度，
    const wt = fixedArr.reduce((pre, key) => {
        pre[key] = getColWidth(obj[key], fixedWidthDefault.value);
        return pre;
    }, {});
    const arr = [];
    Object.keys(obj).forEach((key) => {
        if (obj[key].length > 0) {
            arr.push({
                titleList: obj[key], // 左中右每一列数据
                fixed: key,
                colWidth: wt[key], // 列宽度
                // 中间可视区宽度需动态计算
                width: ["left", "right"].includes(key)
                    ? `${wt[key]}px`
                    : `calc(100% - ${wt.left + wt.right}px)`,
                headerSlots: getHeaderSlots(obj[key]),
                shadow: key !== "center" ? isXScroll : false,
            });
        }
    });
    // 最后一列添加类名，添加类名是为了设置边框样式
    const obje = arr[arr.length - 1];
    const setLastCol = function (colArr: Array) {
        colArr.forEach((item, index) => {
            if (colArr.length - 1 === index) {
                item.isLastCol = true;
            }
        });
    };
    if (obje) {
        setLastCol(obje.titleList);
    }
    return arr;
});
</script>

<style lang="less" scoped>
.table-block {
    width: 100%;
    max-width: 100%;
    .table-block-list {
        width: 100%;
        max-width: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: flex-start;
        &-content {
            position: relative;
            &.content-left::before,
            &.content-right::before {
                content: "";
                position: absolute;
                width: 8px;
                height: 100%;
                top: 0;
                bottom: 0;
                right: -7px;
                background: linear-gradient(
                    270deg,
                    rgba(255, 255, 255, 0) 0%,
                    #f1f1f1 100%
                );
                z-index: 80;
            }
            &.content-right::before {
                left: -1px;
            }
        }
    }
}
</style>
