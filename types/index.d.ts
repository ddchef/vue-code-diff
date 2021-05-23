export interface CodeDiffInterface {
  oldString: string
  newString: string
  context: number
  outputFormat: 'side-by-side' | 'line-by-line'
  drawFileList: boolean
  renderNothingWhenEmpty: boolean
  diffStyle: 'word' | 'char'
  fileName: string
  isShowNoChange: boolean
}
