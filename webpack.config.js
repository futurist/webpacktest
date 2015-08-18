
// npm run build to build bundle

// run npm start, which starts the webpack-dev-server

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {

    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },

    // The resolve.alias object takes require expressions
    // (require('react')) as keys and filepath to actual
    // module as values
    resolve: {
        alias: {},
        extensions: ['', '.jsx']
    },

    //context: __dirname + '/app',

    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "out.js",
        pathinfo:false
    },
    module: {
        noParse: [],
        loaders: [

            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },

            { test: /\.html$/, loader: 'raw', exclude: /node_modules/ },

            //{ test: /\.css$/, loader: "style!css" },

            { test: /\.css$/, loader: 'style-loader!css-loader' }, // use ! to chain loaders
            { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.jsx$/, loader: 'jsx-loader' },

            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), exclude: /node_modules/}

        ]
    },
    plugins:[
         new ExtractTextPlugin('app.css'),
    ]
};

// config.addVendor('react', bower_dir + '/react/react.min.js');
// config.addVendor('material-ui', bower_dir + '/material-ui/src/index.js');
// config.addVendor('react-tap-event-plugin', node_modules_dir + '/react-tap-event-plugin/src/injectTapEventPlugin.js');


if (process.env.NODE_ENV == 'production') {
    config.output.path = __dirname + '/dist';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;

