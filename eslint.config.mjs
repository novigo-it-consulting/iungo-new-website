import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import jsxNoUiLiterals from "./eslint/jsx-no-ui-literals.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/i18n/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message: "Importe Link de @/i18n/navigation.",
            },
            {
              name: "next/navigation",
              importNames: ["useRouter", "usePathname", "redirect"],
              message:
                "Importe useRouter, usePathname e redirect de @/i18n/navigation.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.{tsx}", "src/app/**/*.{tsx}"],
    plugins: {
      iungo: {
        rules: {
          "jsx-no-ui-literals": jsxNoUiLiterals,
        },
      },
    },
    rules: {
      "iungo/jsx-no-ui-literals": "error",
    },
  },
]);

export default eslintConfig;
