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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(generateComponentFileEntry(ModuleType.CJS) as any),
    'esm/index': {
      import: '/src/index.ts',
      library: {
        type: 'commonjs',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(generateComponentFileEntry(ModuleType.ESM) as any),
  },
  // target: 'web',
  output: {
    path: path.resolve(__dirname, 'ui'),
    filename: '[name].js',
    // library: ['@peppers/ui'],
    // libraryTarget: 'umd',
    clean: true,
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
