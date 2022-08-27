const path = require("path");
const pkg = require("./package.json");

const base = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "btgaddr.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "btgaddr",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};

module.exports = [
  Object.assign({}, base, {
    output: Object.assign({}, base.output, {
      filename: "btgaddrjs-" + pkg.version + ".js",
    }),
    optimization: {
      minimize: false,
    },
  }),
  Object.assign({}, base, {
    output: Object.assign({}, base.output, {
      filename: "btgaddrjs-" + pkg.version + ".min.js",
    }),
  }),
];
