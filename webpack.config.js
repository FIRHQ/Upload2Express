const path = require("path");
module.exports = {
  mode: "production",
  entry: "./index.js",
  // devtool: false,
  // plugins: [new webpack.SourceMapDevToolPlugin({})],


  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "upload2express.js",
    libraryTarget: "umd",
    globalObject: "this",
    library: "Upload2Express"
  }
};
