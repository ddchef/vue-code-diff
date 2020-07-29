<template>
  <div id="app">
    <div v-html="html" v-highlight></div>
  </div>
</template>

<script>
import {createPatch} from 'diff'
import * as Diff2Html from 'diff2html'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import 'diff2html/bundles/css/diff2html.min.css'
export default {
  name: 'code-diff',
  props: {
    oldString: {
      type: String,
      default: ''
    },
    newString: {
      type: String,
      default: ''
    },
    context: {
      type: Number,
      default: 5
    },
    outputFormat: {
      type: String,
      default: 'line-by-line'
    },
    drawFileList: {
      type: Boolean,
      defalut: false
    },
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false
    },
    diffStyle: {
      type: String,
      default: 'word'
    },
    fileName: {
      type: String,
      default: ''
    },
    isShowNoChange: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    highlight: function (el) {
      let blocks = el.querySelectorAll('code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  },
  computed: {
    html () {
      return this.createdHtml(this.oldString, this.newString, this.context, this.outputFormat, this.drawFileList, this.renderNothingWhenEmpty, this.fileName, this.isShowNoChange)
    }
  },
  methods: {
    createdHtml (oldString, newString, context, outputFormat, drawFileList, renderNothingWhenEmpty, fileName, isShowNoChange) {
      function hljs (html) {
        return html.replace(/<span class="d2h-code-line-ctn">(.+?)<\/span>/g, '<span class="d2h-code-line-ctn"><code>$1</code></span>')
      }
      if (isShowNoChange) {
        oldString = 'File Without Change\tOldString: ======================== \n' + oldString
        newString = 'File Without Change\tNewString: ======================== \n' + newString
      }
      let args = [fileName, oldString, newString, '', '', {context: context}]
      let dd = createPatch(...args)
      let outStr = Diff2Html.parse(dd, {
        inputFormat: 'diff',
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        matching: 'lines',
        renderNothingWhenEmpty: renderNothingWhenEmpty})
      let html = Diff2Html.html(outStr, {
        inputFormat: 'json',
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        matching: 'lines',
        renderNothingWhenEmpty: renderNothingWhenEmpty})
      return hljs(html)
    }
  }
}
</script>

<style>
.hljs{
  display: inline-block;
  padding: 0;
  background: transparent;
  vertical-align:middle
}
.d2h-file-header{
  display: none
}
</style>
