import path from "path";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");
  const VUE_APP_PORT = env.VUE_APP_PORT || 8000;

  return {
    server: {
      host: "0.0.0.0",
      port: VUE_APP_PORT as number,
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        tests: path.resolve(__dirname, "src/__tests__"),
      },
    },
    test: {
      environment: "jsdom",
      include: ["**/*.spec.@(ts|tsx)"],
      setupFiles: ["./vitest.setup.ts"],
      clearMocks: true,
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    },
    plugins: [
      vue(),
      AutoImport({
        eslintrc: {
          enabled: true,
        },
        imports: [
          "vue",
          {
            "lodash-es": ["get"],
            "vue3-toastify": ["toast"],
            vitest: [
              "describe",
              "expect",
              "test",
              "it",
              "vi",
              "beforeEach",
              "afterEach",
            ],
            "@vue/test-utils": [
              "shallowMount",
              "mount",
              "config",
              "DOMWrapper",
            ],
          },
        ],
        vueTemplate: true,
        dts: "src/types/auto-imports.d.ts",
      }),
      Components({
        dirs: ["src/components"],
        extensions: ["vue"],
        dts: "src/types/components.d.ts",
      }),
    ],
  };
});
