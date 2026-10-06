import path from "node:path";

import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";

const repoRoot = path.resolve(import.meta.dirname, "../..");

export default tseslint.config(
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: repoRoot,
      },
    },
  },
);
