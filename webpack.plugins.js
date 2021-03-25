const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [new ForkTsCheckerWebpackPlugin()];

// https://ankitbko.github.io/2019/08/electron-forge-with-react-and-typescript/
// module.exports = [
//   new ForkTsCheckerWebpackPlugin({
//     async: false
//   })
// ];
