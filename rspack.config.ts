import { Configuration } from "@rspack/cli";

const CONFIG: Configuration = {
  context: __dirname,
  module: {
    rules: [
      {
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "main.js",
    path: "./dist",
  },
  devtool: "inline-source-map",
};

export default CONFIG;
