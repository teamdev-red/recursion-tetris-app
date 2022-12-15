const webpack = require("webpack");
const path = require("path");

const config = {
  // ビルドのエントリーポイント
  entry: "./src/index.ts",
  //ソースマップを有効にする
  devtool: "source-map",
  // ビルドされたJavaScriptファイルの出力先
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    //.ts(x)?$の正規表現にマッチするファイルを，ts-loaderというWebpackのプラグインを使用してコンパイルする
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      //pngファイルをfileloaderで読み込む
      {
        test: /\.(png|mp3)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/sounds",
        }
      },
      //.css$ という正規表現にマッチするファイルを、style-loader と css-loader という2つのWebpackのプラグインを使用して、CSSを適切な形に変換するように指定．
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // Webpackが自動的にインポートするモジュールのファイル拡張子
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = config;
