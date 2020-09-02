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
    { file: 'cjs/index.js', format: 'cjs' },
    { file: 'esm/index.js', format: 'es' }
  ]
}
