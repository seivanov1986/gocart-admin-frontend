module.exports = function override(config, env) {
  if (env === "production") {
    config.output.filename = 'static/js/[name].js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';

    config.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'MiniCssExtractPlugin') {
        plugin.options.filename = 'static/css/[name].css';
        plugin.options.chunkFilename = 'static/css/[name].chunk.css';
      }
    });
  }
  return config;
};

