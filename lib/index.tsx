import { Change } from 'diff'
import { defineComponent, PropType } from 'vue'
import { TypeCodeRow, diffFun, DiffStyle, SimpleDiffFun } from './utils'
import CodeRow from './code-row'
import './index.less'

export default defineComponent({
  name: 'VueCodeDiff',
  props: {
    /** 旧字符串 */
    oldString: {
      type: String,
      required: true
    },
    /** 新字符串 */
    newString: {
      type: String,
      required: true
    },
    context: {
      type: Number,
      default: 9999
    },
    outputFormat: {
      type: String,
      default: 'split'
    },
    drawFileList: {
      type: Boolean,
      default: false
    },
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false
    },
    diffStyle: {
      type: String as PropType<DiffStyle>,
      default: 'diffLines'
    },
    fileName: {
      type: String,
      default: undefined
    },
    isShowNoChange: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    diffFun (): SimpleDiffFun {
      return diffFun(this.diffStyle)
    },
    diffResult (): Change[] {
      return this.diffFun(this.oldString, this.newString)
    },
    rows (): TypeCodeRow[] {
      const data: TypeCodeRow [] = []
      let addLine = 1; let removeLine = 1
      this.diffResult.reduce((pre: TypeCodeRow[], cur: Change) => {
        if (pre.length > 0 && cur.added === true) {
          const rows = cur.value.split('\n').filter(v => v !== '')
          rows.forEach((row, index) => {
            pre[index][1] = { line: addLine, value: row, added: true }
            addLine++
          })
          data.push(...pre)
          return []
        }
        if (pre.length === 0 && cur.added === true) {
          const rows = cur.value.split('\n').filter(v => v !== '')
          rows.forEach(row => {
            data.push([{ value: null }, { line: addLine, value: row, added: true }])
            addLine++
          })
          return pre
        }
        if (cur.added === undefined && cur.removed === undefined) {
          if (pre.length > 0) {
            data.push(...pre)
          }
          const rows = cur.value.split('\n').filter(v => v !== '')
          rows.forEach(row => {
            data.push([{ line: removeLine, value: row }, { line: addLine, value: row }])
            addLine++
            removeLine++
          })
          return []
        }
        if (cur.removed === true) {
          const rows = cur.value.split('\n').filter(v => v !== '')
          rows.forEach(row => {
            pre.push([{ line: removeLine, value: row, removed: true }, { value: null }])
            removeLine++
          })
        }
        return pre
      }, [])
      return data
    }
  },
  render () {
    console.log(this.rows)
    return (
      <div class="vue-code-diff">
        <table class="diff-table">
          <tbody>
            {this.rows.map(row => <CodeRow value={row} outputFormat={this.outputFormat}/>)}
          </tbody>
        </table>
      </div>
    )
  }
})
