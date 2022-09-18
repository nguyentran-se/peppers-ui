import * as fs from 'fs';
import * as packageJson from '../package.json';
const config = {
  name: '@pepperse/ui',
  version: packageJson.version,
  author: 'nguyentran-se',
  license: 'MIT',
  repository: {
    type: 'git',
    url: 'https://github.com/nguyentran-se/peppers-ui',
    directory: 'nguyentran-se/peppers-ui',
  },
  keywords: ['react', 'react-component', 'peppers-ui'],
  private: false,
  description: 'Peppers UI',
  main: './cjs/index.js',
  module: './index.js',
  types: './index.d.ts',
  peerDependencies: {
    '@types/react': '^17.0.0 || ^18.0.0',
    react: '^17.0.0 || ^18.0.0',
    'react-dom': '^17.0.0 || ^18.0.0',
  },
  publishConfig: {
    access: 'public',
    tag: 'latest',
  },
  engines: {
    node: '>=16.0.0',
  },
  dependencies: {},
};

//GENERATE package.json
fs.writeFile('dist/package.json', JSON.stringify(config), (err) => {
  if (err) throw err;
  console.log('Generate package.json in dist successfully!');
});
