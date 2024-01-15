import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

build({
  entryPoints: ['./src/main.ts'],
  logLevel: 'info',
  outfile: 'dist/main.js',
  bundle: true,
  minify: true,
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  packages: 'external',
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/app/bot/i18n/locales/*'],
        to: ['./dist/locales'],
      },
      watch: true,
    }),
  ],
});
