const path = require('path');
var glob = require("glob");

var files = glob.sync("./src/function/**/*.ts");
var entries = {};
files.forEach(file => {
  var matches = file.match(/\.*(\w+)\.ts$/);
  if (matches && matches[1] !== 'di') { // ignore DI files
    entries[matches[1]] = file;
  }
});

console.log('** Building the following entires...');
console.log(entries);

module.exports = {
  target: 'node',
  mode: 'production',
  entry: entries,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
            loader: "ts-loader",
            options: {
              projectReferences: true
            }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  optimization: {
    minimize: false, // Minimization breaks inversify
  },
};