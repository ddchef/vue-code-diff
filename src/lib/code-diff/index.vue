<template>
  <div id="app">
    <div v-html="html" v-highlight></div>
  </div>
</template>

<script>
import {createPatch} from 'diff'
import {Diff2Html} from 'diff2html'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import 'diff2html/dist/diff2html.css'
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
  data () {
    return {
      html: ''
    }
  },
  computed: {
  },
  created () {
    let args = ['', this.oldString, this.newString, '', '', {context: this.context}]
    let dd = createPatch(...args)
    let outStr = Diff2Html.getJsonFromDiff(dd, {inputFormat: 'diff', outputFormat: 'side-by-side', showFiles: false, matching: 'lines'})
    let html = Diff2Html.getPrettyHtml(outStr, {inputFormat: 'json', outputFormat: 'side-by-side', showFiles: false, matching: 'lines'})
    this.html = this.hljs(html)
  },
  methods: {
    hljs (html) {
      html = html.replace(/<span class="d2h-code-line-ctn">(.+?)<\/span>/g, '<span class="d2h-code-line-ctn"><code>$1</code></span>')
      return html
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
