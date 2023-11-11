import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ command, mode, ssrBuild }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  process.env = {
    ...process.env,
    ...env,
    BASE_URL: process.env.NODE_ENV === "development" ? "/" : "/wiki/",
    MODE: mode,
  };
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": process.env, // process.env를 전달
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
