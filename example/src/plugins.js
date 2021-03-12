import {
  Form,
  Row,
  Col,
  FormItem,
  Input,
  Switch,
  InputNumber,
  Button,
  Checkbox
} from 'element-ui'

export default {
  install (Vue) {
    Vue.use(Form)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Switch)
    Vue.use(InputNumber)
    Vue.use(Button)
    Vue.use(Checkbox)
  }
}
