import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    // Add your custom rules here
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
