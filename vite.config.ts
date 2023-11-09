import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host: process.env.HOST,
      port: +(process.env.PORT || 3000),
    },
    base: process.env.NODE_ENV === "development" ? "/" : "/wiki/",
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve("src") },
        { find: "@entity", replacement: path.resolve("src/entity") },
        { find: "@module", replacement: path.resolve("src/module") },
      ],
    },
    build: {
      minify: "terser",
      cssMinify: true,
      terserOptions: {
        keep_classnames: true,
      },
    },
  };
});
