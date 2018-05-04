<template>
  <div>
    <code-diff :old-string="oldStr" :new-string="newStr" :context="10" />
  </div>
</template>

<script>
import codeDiff from './lib'
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
      newStr
    }
  }
}
</script>
