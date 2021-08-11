const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {  
    context: __dirname,  
    entry: "./src/app.js",  
    output: {  
        path: __dirname + "/dist",  
        filename: "sendEmailBundle.js",  
    },  
    watch: true,  
    module: {  
        rules: [{  
            test: /\.js$/,  
            exclude: /(node_modules)/,  
            use: {  
                loader: 'babel-loader',  
                options: {  
                    presets: ['@babel/preset-env', '@babel/preset-react']  
                }  
            }  
        }]  
    },
    plugins: [
        new NodePolyfillPlugin()
    ]  
}