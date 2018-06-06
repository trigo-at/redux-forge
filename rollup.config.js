import pkg from './package.json';

export default {
    input: 'forge.js',
    output: [{file: pkg.main, format: 'cjs'}, {file: pkg.module, format: 'es'}],
};
