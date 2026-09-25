const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve("./public/assets/antd-custom.less"), "utf8"),
);

module.exports = {
  distDir: "./.next",
  trailingSlash: true,
  reactStrictMode: false,
  transpilePackages: [
    "antd",
    "@ant-design/icons",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "@vinuni/ui",
    "@shadcn/react",
    "radix-ui",
    "sonner",
  ],
  compiler: {
    styledComponents: true,
  },
  images: {
    disableStaticImages: true,
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, canvas: false };
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      assets: path.resolve(__dirname, "public/assets"),
      components: path.resolve(__dirname, "components"),
      common: path.resolve(__dirname, "common"),
    };

    config.module.rules.push({
      test: /\.css$/,
      use: [isServer ? "null-loader" : "style-loader", "css-loader"],
    });

    config.module.rules.push({
      test: /\.less$/,
      use: [
        isServer ? "null-loader" : "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
              math: "always",
              modifyVars: themeVariables,
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      type: "asset/resource",
    });

    return config;
  },
};
