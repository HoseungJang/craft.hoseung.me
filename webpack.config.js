const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json").toString());

const base = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js"],
    alias: Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
        key.replace("/*", ""),
        path.resolve(__dirname, value.replace("/*", "")),
      ])
    ),
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: true,
    }),
  ],
};

module.exports = (env) => {
  if (env.dev) {
    return {
      ...base,
      mode: "development",
      devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
      },
    };
  }

  return {
    ...base,
    mode: "production",
  };
};
