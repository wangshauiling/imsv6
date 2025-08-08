module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  ignore: [
    'node_modules/ims-fa-core/dist/ims-fa-core.umd.js',
    'node_modules/ims-fa-web/lib/ImsFaWeb.umd.min.js',
    'node_modules/ims-web/lib/ImsWeb.umd.min.js'
  ],
  overrides: [
    {
      test: /\.js$/,
      compact: false,
    },
  ],
}
