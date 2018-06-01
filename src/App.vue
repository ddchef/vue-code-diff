<template>
  <div>
    <el-form>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="旧数据：">
            <el-input v-model="oldStr" type="textarea" :autosize="{minRows: 2, maxRows: 15}" placeholder="请输入旧数据"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新数据：">
            <el-input v-model="newStr" type="textarea" :autosize="{minRows: 2, maxRows: 15}" placeholder="请输入新数据"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示效果：">
            <el-switch v-model="fotmat" active-text="line-by-line" inactive-text="side-by-side"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="差异化范围：">
            <el-input-number v-model="context" placeholder=""></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <code-diff :old-string="oldStr" :new-string="newStr" :context="context" :output-format="outputFormat" />
  </div>
</template>

<script>
import codeDiff from './lib/index.js'
import oldStr from './date/oldStr'
import newStr from './date/newStr'
export default {
  name: 'App',
  components: {
    codeDiff
  },
  data () {
    return {
      oldStr,
      newStr,
      fotmat: false,
      context: 5
    }
  },
  computed: {
    outputFormat () {
      return this.fotmat ? 'line-by-line' : 'side-by-side'
    }
  }
}
</script>
