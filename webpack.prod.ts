import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const FileManagerPlugin = require('filemanager-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
/**
 * Find all component files, then create entry for that component
 */
const PUBLIC_DIST = 'dist';
enum ModuleType {
  CJS = 'commonjs',
  ESM = 'module',
}
const files = fs.readdirSync('./src');
const componentFiles = files.filter((f) => f.charAt(0).match(/[A-Z]/));
const generateComponentFileEntry = (type: ModuleType): webpack.Configuration['entry'] => {
  const componentFileConfig: webpack.Configuration['entry'] = componentFiles.reduce(
    (result, componentFile) => {
      const componentPath = `${componentFile}/index`;

      const entryPath = type === ModuleType.ESM ? `${componentPath}` : `cjs/${componentPath}`;
      return {
        ...result,
        [entryPath]: {
          import: `/src/${componentPath}.tsx`,
          library: {
            type: type,
          },
        },
      };
    },
    {},
  );
  return componentFileConfig;
};

const config: webpack.Configuration = {
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  entry: {
    'cjs/index': {
      import: '/src/index.ts',
      library: {
        // name: 'pui',
        type: 'module',
      },
    },
    ...(generateComponentFileEntry(ModuleType.CJS) as object),
    index: {
      import: '/src/index.ts',
      library: {
        type: 'commonjs',
      },
    },
    ...(generateComponentFileEntry(ModuleType.ESM) as object),
    /* CSS */
    utility: {
      import: '/src/styles/_index.scss',
    },
  },
  output: {
    path: path.resolve(__dirname, PUBLIC_DIST),
    filename: '[name].js',
    // library: ['@peppers/ui'],
    // libraryTarget: 'umd',
    // libraryTarget: 'module',
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        peppers: {
          name: 'peppers',
          type: 'css/mini-extract',
          chunks: (chunk) => chunk.name !== 'utility',
          enforce: true,
        },
        utility: {
          name: 'utility',
          type: 'css/mini-extract',
          chunks: (chunk) => chunk.name === 'utility',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      //use ts-loader before add to final bundle
      {
        test: /\.(ts|tsx)?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    //find files
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', 'js', 'jsx', 'css', 'scss'],
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: `${PUBLIC_DIST}/types`,
              destination: `${PUBLIC_DIST}/cjs`,
            },
            {
              source: `${PUBLIC_DIST}/types`,
              destination: `${PUBLIC_DIST}`,
            },
            {
              source: 'README.md',
              destination: `${PUBLIC_DIST}/README.md`,
            },
            {
              source: 'LICENSE',
              destination: `${PUBLIC_DIST}/LICENSE`,
            },
          ],
          delete: [
            `${PUBLIC_DIST}/types`,
            `${PUBLIC_DIST}/**/*.LICENSE.txt`,
            `${PUBLIC_DIST}/**/*.stories.d.ts`,
            // `${PUBLIC_DIST}/*/*.css`,
            // `${PUBLIC_DIST}/cjs/*/*.css`,
          ],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      ignoreOrder: true,
    }),
  ],
  devtool: 'source-map',
  stats: {
    errorDetails: true,
  },
};

export default config;
