import type { Configuration } from "@rspack/cli";

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
	},
	resolve: {
		extensions: [".ts"],
	},
	performance: { hints: false },
	devtool: "inline-source-map",
};

export default CONFIG;
