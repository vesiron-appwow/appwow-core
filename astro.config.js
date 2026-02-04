const cloudflare = require("@astrojs/cloudflare").default;

module.exports = {
  output: "server",
  adapter: cloudflare(),
};
