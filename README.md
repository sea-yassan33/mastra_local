# 概要
- ollama(gpt-oss:20b)のローカルLLMを使用してmastaraを動かす

## ollamaの設定

```sh
## 下記のURLでダウンロード
https://ollama.com/download

## インストーラーを起動

## バージョン確認
ollama --version
　>> ollama version is 0.12.11

## gpt-oss:20bモデルをダウンロード
ollama pull gpt-oss:20b

## モデルリスト
ollama list

## モデル情報
llama show gpt-oss:20b

## gpt-oss:20bモデルを実行
ollama run gpt-oss:20b

## --verbose: 各種メトリクスの表示
ollama run gpt-oss:20b --verbose

## ollama 起動　（GUIで動かしているなら不要）
ollama serve

## 実行状況の確認
ollama ps

## 停止方法 
ollama stop gpt-oss:20b
```

## mastraの導入

```sh
npm create mastra@latest
> npx
> create-mastra
┌   Mastra Create
│  ## プロジェクト名
◇  What do you want to name your project?
│  mastra_local
│  ## srcディレクトリの設定
◇  Where should we create the Mastra files? (default: src/)
│  src/
│  ## LLMプロバイダーの設定（localなのでとりあえず）
◇  Select a default provider:
│  OpenAI
│  ## APIkey設定（localでKey発行していない場合はskip）
◇  Enter your OpenAI API key?
│  Skip for now
│  ## IDEにMastraを入れるか？
◇  Make your IDE into a Mastra expert? (Installs Mastra's MCP server)
│  Skip for now
│
◇  Project structure created
◇  npm dependencies installed
◇  Mastra CLI installed
◇  Mastra dependencies installed
◇  .gitignore added
└  Project created successfully
```

### プロジェクト作成後

- 必要なモジュールを導入
```sh
cd mastra_local/

## 必要なモジュールを入れる
## 導入中「warn」はpeerDependencies のバージョン衝突を “適切に解決した” の通知
## エラー（ERROR）がなければOK
npm install ollama-ai-provider-v2 @mastra/mcp @mastra/core dotenv

```

- [tsconfig.json](./tsconfig.json)の作成

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```






### 参考
- [公式：mastra](https://mastra.ai/ja/docs)
- [mastra_ollamaの導入方法](https://ai-sdk.dev/providers/community-providers/ollama)

