import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  languageOptions: { globals: globals.node ,
    parser: tsParser, // TypeScript用パーサー
    ecmaVersion: 2021, // ECMAScriptのバージョン指定
    sourceType: "module", // モジュール形式のコードをサポート
    ecmaFeatures: {
      jsx: true, // JSXをサポート}},
    },
  },
},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      indent: ["error", 2], // スペース2つのインデント
      quotes: ["error", "single"], // シングルクォートを使用
      semi: ["error", "always"], // セミコロンを必須にする
    },
  },

];