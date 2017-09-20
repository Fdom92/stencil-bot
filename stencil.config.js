exports.config = {
  bundles: [
    { components: ['stencil-bot', 'ion-bubble'] }
  ],
  collections: [
    { name: '@stencil/router' },
    { name: '@ionic/core' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
