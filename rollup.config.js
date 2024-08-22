import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import {
  chromeExtension,
  simpleReloader,
} from 'rollup-plugin-chrome-extension';
import { emptyDir } from 'rollup-plugin-empty-dir';
import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import zip from 'rollup-plugin-zip';
import preserveDirectives from 'rollup-preserve-directives';

const isProduction = process.env.NODE_ENV === 'production';

// noinspection JSUnusedGlobalSymbols
export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: path.join('chunks', '[name]-[hash].js'),
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      preventAssignment: true,
    }),
    chromeExtension(),
    // Reloads extension during watch mode
    simpleReloader(),
    resolve({ browser: true }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    // Empties the output dir before a new build
    emptyDir(),
    // Outputs a zip file in ./releases
    isProduction && zip({ dir: 'releases' }),
    preserveDirectives(),
    postcss({ extensions: ['.css'] }),
    html({ include: '**/*.html' }),
  ],
};
