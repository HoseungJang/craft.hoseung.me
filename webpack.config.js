const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json").toString());
const assetPaths = fs.readdirSync("./public").filter((assetPath) => !assetPath.endsWith("index.html"));

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
    new CopyWebpackPlugin({
      patterns: assetPaths.map((assetPath) => ({ from: `./public/${assetPath}`, to: assetPath })),
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
