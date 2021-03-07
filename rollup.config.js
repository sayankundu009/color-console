import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const production = !process.env.ROLLUP_WATCH;

const devOutput = {
    file: 'dist/color-console.js',
    format: 'iife',
}

const productionOutput = {
    file: 'dist/color-console.min.js',
    format: 'iife',
    plugins: [
        terser(),
        filesize(),
    ],
}

export default {
    input: 'src/index.js',
    output: production ? productionOutput : devOutput
}