import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("plugin:@typescript-eslint/recommended"),

    rules: {
        "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-use-before-define": "error",
        "@/quotes": ["error", "single", {
            allowTemplateLiterals: true,
        }],

        indent: ["error", 2],
        semi: ["error", "never"],
        "arrow-parens": [1, "always"],

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],

        "no-trailing-spaces": "error",
    },
}]);