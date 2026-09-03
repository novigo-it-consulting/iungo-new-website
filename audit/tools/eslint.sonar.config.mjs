import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**"],
  },
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["../../src/**/*.ts", "../../src/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname + "/../..",
      },
    },
  },
);
