import { Change, diffChars, diffCss, diffJson, diffLines, diffSentences, diffTrimmedLines, diffWords, diffWordsWithSpace, LinesOptions, PatchOptions } from 'diff'

export type DiffStyle = 'diffLines'|'diffChars'|'diffWords'|'diffWordsWithSpace'|'diffTrimmedLines'|'diffSentences'|'diffCss'|'diffJson'
export type SimpleDiffFun = (oldStr: string, newStr: string, options?: LinesOptions|undefined) => Change[]
export type OnePathDiffFun = (fileName: string, oldStr: string, newStr: string, oldHeader?: string | undefined, newHeader?: string | undefined, options?: PatchOptions | undefined) => string
export type TwoPathDiffFun = (oldFileName: string, newFileName: string, oldStr: string, newStr: string, oldHeader?: string | undefined, newHeader?: string | undefined, options?: PatchOptions | undefined) => string

export interface Code{
  line?: number
  sameAsRemove?: boolean|null
  value?: string| null
  added?: boolean
  removed?: boolean
}

export type TypeCodeRow = Code[]

export function diffFun (type: DiffStyle): SimpleDiffFun {
  if (type === 'diffChars') {
    return diffChars
  }
  if (type === 'diffWords') {
    return diffWords
  }
  if (type === 'diffWordsWithSpace') {
    return diffWordsWithSpace
  }
  if (type === 'diffTrimmedLines') {
    return diffTrimmedLines
  }
  if (type === 'diffSentences') {
    return diffSentences
  }
  if (type === 'diffCss') {
    return diffCss
  }
  if (type === 'diffJson') {
    return diffJson
  }
  return diffLines
}
