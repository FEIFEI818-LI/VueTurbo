<script lang="tsx">
import { type ExtractPropTypes, computed, defineComponent } from 'vue'
const listProps = {
  // 标题
  columns: {
    type: Array,
    default: []
  },
  // 数据
  data: {
    type: Array,
    default: () => []
  },
  // 列表渲染中key使用的字段，不传rowKey默认使用index
  rowKey: {
    type: String,
    default: ''
  },
  // 是否显示边框
  showBorder: {
    type: Boolean,
    default: false
  },
  // 是否显示底部边框
  borderBottom: {
    type: Boolean,
    default: true
  },
  rowWidth: {
    type: Number,
    default: 375
  },
  // 行高
  height: {
    type: [Number, String],
    default: 50 // 'auto' 默认 0.5rem
  },
  fixedCol: {
    type: String,
    default: 'center'
  },
  // 合并单元格方法
  mergeCellMethods: {
    type: Function,
    default: () => [1, 1]
  },
  // 单元格默认宽度
  fixedWidthDefault: {
    type: [Number, String],
    default: 70
  },
  // 固定在左侧的长度
  fixedLeftLength: {
    type: Number,
    default: 0
  },
  // 未固定的列长度
  centerColumnLength: {
    type: Number,
    default: 0
  }
}
export default defineComponent({
  props: listProps,
  setup(props, { slots, attrs, emit }) {
    // 自定义单元格展示内容
    const liCellSpan = (item: Object, v: Object, rowIndex: Number) => {
      let val = ![null, undefined, ''].includes(v[item.key]) ? v[item.key] : ''
      val = val ? val + (item.util || '') : ''
      return (
        <span
          class="li-cell-span"
          v-html={typeof item.formatter === 'function' ? item.formatter(h, v, item, rowIndex) : val || '-'}
        ></span>
      )
    }
    // 插槽
    const cellContent = (item: Object, v: Object, rowIndex: Number) => {
      const slotName = slots[item.key]
      return (
        <div
          class={['li-cell-content', { ellipsis: item.ellipsis }]}
          style={{
            'max-height': props.height === 'auto' ? 'auto' : props.height + 'px'
          }}
        >
         // 这里要先判断插槽是否存在
          {typeof slotName === 'function'
            ? slotName({
                item: v,
                titleItem: item
              })
            : liCellSpan(item, v, rowIndex)}
        </div>
      )
    }

    // 单元格样式
    const tdCell = (v: Object, rowIndex: Number) => {
      return props.columns.map((item, index, arr) => {
        let val = ![null, undefined, ''].includes(v[item.key]) ? v[item.key] : ''
        return (
          <td
            key={item.key}
            class={[
              'li-cell',
              item.key,
              { 'show-border': props.showBorder },
              { 'border-bottom': props.borderBottom },
              { 'column-last': item.isLastCol }
            ]}
            style={{
              'text-align': item.align || 'left'
            }}
            onClick={e => emit('handlerCellClick', v, item, e)}
          >
            {cellContent(item, v, index)}
          </td>
        )
      })
    }
    // 行样式
    const tableTbody = () => {
      return (
        <tbody class="table-tbody">
          {props.data.map((item, index) => {
            return (
              <tr
                key={props.rowKey in item ? item[props.rowKey] : index}
                style={{
                  height: props.height === 'auto' ? 'auto' : props.height + 'px'
                }}
                onClick={e => emit('handlerClick', item, index)}
              >
                {tdCell(item, index)}
              </tr>
            )
          })}
        </tbody>
      )
    }
    // 列样式
    const colgroups = () => {
      return (
        <colgroup>
          {props.columns.map((item, index) => {
            let colWidth = 100
            try {
              colWidth = (+item.width || props.fixedWidthDefault).toFixed(2)
            } catch (e) {}
            return (
              <col
                key={index}
                attrs={{
                  key: item.key
                }}
                style={{
                  width: props.fixedCol === 'center' && item.widthAuto ? 'auto' : colWidth + 'px'
                }}
              ></col>
            )
          })}
        </colgroup>
      )
    }
    return () => (
      <div class={['table-list', { 'table-list-scroll': props.fixedCol === 'center' }]}>
        <table
          style={{
            width: props.rowWidth + 'px'
          }}
        >
          {[colgroups(), tableTbody()]}
        </table>
      </div>
    )
  }
})
</script>
<style lang="less" scoped>
.table-title {
  max-width: 100%;
  &.fixed-top {
    position: sticky;
    left: 0;
    top: 88px;
    z-index: 70;
  }
  &-center {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      background: transparent;
    }
  }
  table {
    min-width: 100%;
    min-height: 30px;
    table-layout: fixed;
    background-color: #fff;
    // position: relative;
    .title-top-border::before {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #f1f1f1;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 80;
      transform: scale(1, 0.5);
    }

    th {
      background-color: #fff;
      position: relative;
      line-height: 1;
      vertical-align: inherit;
      img {
        width: 11px;
        height: 14px;
        margin-left: 4px;
        vertical-align: middle;
      }
      .table-title-cell {
        padding: 4px 8px;
        &-sort {
          display: flex;
          align-items: center;
          &-block {
            display: inline-block;
          }
        }
        &-span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      &.border-bottom::after {
        content: '';
        width: 100%;
        height: 1px;
        background-color: #f1f1f1;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        -webkit-transform: scale(1, 0.5);
        transform: scale(1, 0.5);
      }
      &.show-border::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        background-color: transparent;
        // border-top: 1px solid #F1F1F1;
        border-left: 1px solid #f1f1f1;
        border-bottom: 1px solid #f1f1f1;
        transform-origin: 0 0;
        transform: scale(0.5);
        box-sizing: border-box;
        pointer-events: none;
      }
      &.show-border.column-last::after {
        border-right: 1px solid #f1f1f1;
      }
    }
  }
}
</style>
