import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'bundle.browser.min.js',
      format: 'iife',
      name: 'GlanceJS',
      plugins: [terser()]
    },
    { file: 'bundle.cjs.js', format: 'cjs' },
    { file: 'bundle.js', format: 'es' }
  ]
}
