const glob = require("glob"); // 处理文件路径用到，很有用
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 将打包后js自动引入html文件插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除打包文件工具
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css压缩去重
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cleanPath = [path.join(__dirname, "./dist")];
const pagePath = require("./pagePath");
// 多页面配置函数
const pagesSetting = () => {
  const entries = {};
  const htmlWebpackPlugins = [];
  const files = glob.sync(path.join(__dirname, "./src/pages/**/*.js"));
  files.forEach((file) => {
    const match = file.match(/\/pages\/(.*)\/(.*).js$/);
    const entry = match && match[1]; // 文件夹
    // 保存入口文件
    entries[entry] = file;
    const pageFiles = fs.readdirSync(path.resolve(file, ".."));
    const htmlFile = pageFiles.filter((file) => /\.html$/.test(file));
    if (htmlFile.length > 0) {
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `./src/pages/${entry}/${htmlFile[0]}`),
          filename: `pages/${entry}/${htmlFile[0]}`,
          chunks: [entry],
          inject: true, // 将js放在body底部
          minify: {
            collapseWhitespace: true, // 折叠标签空白
            minifyCSS: true,
            minifyJS: true,
          },
        })
      );
    } else {
      console.log(`${path.resolve(file, "..")}目录下无模板文件`);
    }
  });
  return {
    entries,
    htmlWebpackPlugins,
  };
};
const { entries, htmlWebpackPlugins } = pagesSetting();
module.exports = {
  mode: "development",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "pages/[name]/[name].[chunkhash:8].js",
  },
  module: {
    rules: [
      // {
      //     test: /\.js$/,
      //     exclude: /(node_modules|bower_components)/,
      //     use: {
      //         loader: 'babel-loader',
      //         options: {
      //             presets: ['@babel/preset-env']
      //         }
      //     }
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.(bmp|png|jpg|jpeg|ico|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 12, // 文件小于12kb，输出DataUrl
              outputPath: "assets/images", // 该路径相对于html输出路径
              publicPath: "../../assets/images",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(woff2?|woff|svg|eot|ttf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              limit: 1024 * 5,
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: cleanPath,
    }),
    new MiniCssExtractPlugin({
      filename: "pages/[name]/[name].[chunkhash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/fonts",
          to: "assets/fonts",
        },
        {
          from: "src/static",
          to: "static",
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  devServer: {
    host: "localhost",
    open: true,
    port: 8081,
    compress: true,
    historyApiFallback: {
      rewrites: pagePath,
    },
  },
};
