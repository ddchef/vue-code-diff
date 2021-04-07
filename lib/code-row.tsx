import { defineComponent, PropType } from 'vue'
import { Code, TypeCodeRow } from './utils'

export default defineComponent({
  name: 'CodeRow',
  props: {
    value: {
      type: Array as PropType<TypeCodeRow>,
      required: true
    },
    outputFormat: {
      type: String,
      required: true
    }
  },
  methods: {
    renderRow (code: Code, side: string) {
      if (code.removed === true) {
        return (
          <>
            <td class='row-num row-num-removed'>{code.line}</td>
            <td data-split-side="left" class='row-code row-code-removed'>
              <span class='row-code-inner' data-code-marker="-">{code.value}</span>
            </td>
          </>
        )
      }
      if (code.added === true) {
        return (
          <>
            <td class='row-num row-num-added'>{code.line}</td>
            <td data-split-side="right" class='row-code row-code-side row-code-added'>
              <span class='row-code-inner' data-code-marker="+">{code.value}</span>
            </td>
          </>
        )
      }
      if (code.value !== null) {
        return (
          <>
            <td class={{ 'row-num': true, 'row-code-side': side === 'right' }}>{code.line}</td>
            <td class='row-code'>
              <span class='row-code-inner' data-code-marker="  ">{code.value}</span>
            </td>
          </>
        )
      }
      return (
        <>
          <td class='row-num row-is-empty'></td>
          <td class='row-code row-is-empty'>
            <span class='row-code-inner is-empty' data-code-marker="  "></span>
          </td>
        </>
      )
    }
  },
  render () {
    return (
      <tr>
        {this.value.map((v, index) => {
          if (index === 0) {
            return this.renderRow(v, 'left')
          }
          if (this.outputFormat === 'split') {
            return this.renderRow(v, 'right')
          }
          return (<></>)
        })}
      </tr>
    )
  }
})
