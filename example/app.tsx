import { defineComponent, Ref, ref } from 'vue'
import DiffCode from '../lib/index'
import { oldStr, newStr } from './data'
import './index.less'
export default defineComponent({
  name: 'App',
  setup () {
    const oldString: Ref = ref<string>(oldStr)
    const newString: Ref = ref<string>(newStr)
    return {
      oldString,
      newString
    }
  },
  render () {
    return (<div>
      <textarea rows={10} v-model={this.oldString}></textarea>
      <textarea rows={10} v-model={this.newString}></textarea>
      <DiffCode oldString={this.oldString} newString={this.newString}/>
    </div>)
  }
})
