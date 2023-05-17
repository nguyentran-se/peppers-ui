import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs';

/**
 * Find all component files, then create entry for that component
 */
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

      const entryPath = type === ModuleType.ESM ? `esm/${componentPath}` : `cjs/${componentPath}`;
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
  mode: 'development',
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
    'esm/index': {
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
    path: path.resolve(__dirname, 'ui'),
    filename: '[name].js',
    // library: ['@peppers/ui'],
    // libraryTarget: 'umd',
    libraryTarget: 'module',

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
        test: /\.(ts|tsx)?$/i,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
    extensions: ['.ts', '.tsx', 'js', 'jsx'],
  },

  devtool: 'source-map',
};

export default config;
