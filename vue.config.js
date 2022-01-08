// vue.config.js
module.exports = {
  devServer: {
    public: `${process.env.C9_PID}.vfs.cloud9.us-west-2.amazonaws.com`,
    port: 8080,
    disableHostCheck: true,
  },
  pwa: {
    name: 'Criswell Software',
    short_name: 'Criswell',
    themeColor: '#D3D3D3',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    workboxOptions: {
            skipWaiting: true
    }
  },
};
