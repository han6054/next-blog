/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");
const withTM = require("next-transpile-modules")(["three"]);

const nextConfig = {
  compiler: {
    removeConsole: false,
  },
};

module.exports = withContentlayer({ ...nextConfig, ...withTM });
