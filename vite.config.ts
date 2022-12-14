import path, { resolve } from 'path';
import packageJson from './package.json';
import { defineConfig, Plugin } from 'vite';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const dist = resolve(__dirname, 'dist');
const prettyName = 'GitHub Pull Request Title Case Helper';
const targetHosts = ['https://github.com/*'];

const extensionManifest = {
  // Below is a TypeScript implementation of fields from the JSON schema documented here:
  // https://developer.chrome.com/docs/extensions/mv3/manifest/
  manifest_version: 3,
  name: prettyName,
  version: packageJson.version,
  description: packageJson.description, // Must be at most 132 characters long
  author: packageJson.author.name,
  homepage_url: packageJson.homepage,
  icons: {
    16: 'icons/icon-16x16.png',
    32: 'icons/icon-32x32.png',
    48: 'icons/icon-48x48.png', // This one is displayed in the Chrome Extensions Management page
    128: 'icons/icon-128x128.png',
    512: 'icons/icon-512x512.png'
  },
  action: {
    default_icon: {
      16: 'icons/icon-16x16.png',
      24: 'icons/icon-24x24.png',
      32: 'icons/icon-32x32.png'
    },
    default_title: prettyName,
    default_popup: 'popup.html'
  },
  incognito: 'spanning',
  host_permissions: targetHosts,
  content_scripts: [
    {
      matches: targetHosts,
      js: ['js/content-script.js'],
      css: ['css/content-script.css']
    }
  ]
};

function generateManifest(outDir: string): Plugin {
  return {
    name: 'manifest-generator',
    writeBundle: async options => {
      // See: https://rollupjs.org/guide/en/#writebundle
      try {
        if (!existsSync(outDir)) {
          mkdirSync(outDir);
        }
        const destination = path.join(outDir, 'manifest.json');
        writeFileSync(destination, JSON.stringify(extensionManifest, null, 2), {
          encoding: 'utf-8'
        });
        console.log(`Emitted ${destination}`);
      } catch (e) {
        console.error(e);
      }
    }
  };
}

export default defineConfig(config => ({
  root: 'src',
  publicDir: resolve(__dirname, 'src/assets'),
  esbuild: {
    minifyIdentifiers: false // See: https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
  },
  build: {
    outDir: dist,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // These are regarded as the "roots" of the project: a compiled JavaScript file will be
        // generated for each entry below
        'content-script': resolve(__dirname, 'src/content-script.ts'),
        'popup': resolve(__dirname, 'src/popup.html')
      },
      output: {
        assetFileNames: assetInfo => {
          // This function removes the hash from generated stylesheets
          if (assetInfo.name.endsWith('css')) {
            return 'css/[name][extname]'; // [extname] is the file extension with a period
          } else {
            return assetInfo.name;
          }
        },
        entryFileNames: 'js/[name].js' // This removes the hash from generated JavaScript files
      }
    }
  },
  define: {
    EXTENSION_NAME: '"' + packageJson.name + '"',
    EXTENSION_VERSION: '"' + packageJson.version + '"'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [generateManifest(dist)]
}));
