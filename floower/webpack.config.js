let { join } = require("path");
let extracttextwebpackplugin = require("extract-text-webpack-plugin");
let cleanwebpackplugin = require("clean-webpack-plugin");
let htmlwebpackplugin = require("html-webpack-plugin");
let data = require("./data/list.json");
module.exports = {
    entry: join(__dirname, "./src/js/index.js"),
    output: {
        path: join(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.(js|jsx)/,
            loader: "babel-loader",
            options: {
                "presets": ["@babel/preset-env"]
            }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|jpg|gif)/,
            loader: "url-loader",
            options: {
                limit: 4000,
                name: "./img/[name].[ext]"
            }
        }, {
            test: /\.(eot|svg|ttf|woff)/,
            loader: "file-loader",
            options: {
                name: "./fonts/[name].[ext]"
            }
        }, {
            test: /\.scss/,
            use: extracttextwebpackplugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
                // use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }]
    },
    plugins: [
        new extracttextwebpackplugin("style.css"),
        new cleanwebpackplugin(),
        new htmlwebpackplugin({
            template: "./src/index.html",
            inject: true
        })
    ],
    devServer: {
        port: 8282,
        open: true,
        host: "localhost",
        before(app) {
            app.get("/getData", (req, res) => {
                res.send({ code: 1, msg: "success", data: data })
            })
        }
    }
}