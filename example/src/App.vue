<template>
  <div>
    <el-form
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="10">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="旧数据：">
              <el-input
                v-model="oldStr"
                type="textarea"
                :autosize="{minRows: 2, maxRows: 15}"
                placeholder="请输入旧数据"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新数据：">
              <el-input
                v-model="newStr"
                type="textarea"
                :autosize="{minRows: 2, maxRows: 15}"
                placeholder="请输入新数据"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="8">
          <el-form-item label="展示效果：">
            <el-switch
              v-model="fotmat"
              active-text="line-by-line"
              inactive-text="side-by-side"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="差异化范围：">
            <el-input-number
              v-model="context"
              placeholder=""
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="清除缓存：">
            <el-button
              type="text"
              @click="handleClearLocalStorage"
            >
              清除
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="展示对比文件列表">
            <el-switch
              v-model="drawFileList"
              @click="drawFileList = !drawFileList"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="noDiff不渲染">
            <el-switch
              v-model="renderNothingWhenEmpty"
              @click="renderNothingWhenEmpty = !renderNothingWhenEmpty"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="noDiff显示源代码">
            <el-switch
              v-model="isShowNoChange"
              @click="isShowNoChange = !isShowNoChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="差异级别">
            <el-button
              v-model="diffStyle"
              @click="diffStyle = diffStyle === 'char' ? 'word' : 'char'"
            >
              {{ diffStyle }}
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文件名">
            <el-input v-model="fileName" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <code-diff
      :old-string="oldStr"
      :new-string="newStr"
      :context="context"
      :output-format="outputFormat"
      :draw-file-list="drawFileList"
      :render-nothing-when-empty="renderNothingWhenEmpty"
      :diff-style="diffStyle"
      :file-name="fileName"
      :is-show-no-change="isShowNoChange"
    />
    <corners />
  </div>
</template>

<script>
import codeDiff from 'vue-code-diff'
import Corners from './corners'
export default {
  name: 'App',
  components: {
    codeDiff,
    Corners
  },
  data () {
    return {
      oldStr: '',
      newStr: '',
      fotmat: false,
      context: 10,
      diffStyle: 'word',
      fileName: '',
      isShowNoChange: true,
      drawFileList: true,
      renderNothingWhenEmpty: false
    }
  },
  computed: {
    outputFormat () {
      return this.fotmat ? 'line-by-line' : 'side-by-side'
    }
  },
  watch: {
    oldStr (v) {
      localStorage.setItem('oldStr', v)
    },
    newStr (v) {
      localStorage.setItem('newStr', v)
    }
  },
  created () {
    this.oldStr = localStorage.getItem('oldStr') || ''
    this.newStr = localStorage.getItem('newStr') || ''
  },
  methods: {
    handleClearLocalStorage () {
      this.newStr = ''
      this.oldStr = ''
      localStorage.setItem('newStr', '')
      localStorage.setItem('oldStr', '')
    }
  }
}
</script>
