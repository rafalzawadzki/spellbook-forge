# 🪄📙🔨 Spellbook Forge

Make your LLM prompts executable and version controlled. 

## Quick Start

In your Express server:

`yarn add spellbook-forge`

```typescript
import { spellbookForge } from "spellbook-forge";

const app = express()
  .use(spellbookForge({
    gitHost: 'https://github.com'
  }))
```

and then:

```
http://localhost:3000/your/repository/prompt?execute

<-- HTTP 200
{
  "prompt-content": "Complete this phrase in coders’ language: Hello …",
  "model": "gpt3.5",
  "result": "Hello, World!"
}
```

## 🤔 What is this?

This is an [ExpressJS](https://expressjs.com) middleware that allows you to create an API interface for your LLM prompts. 
It will automatically generate a server for your prompts stored in a git repository. Using Spellbook, you can:
- Store & manage LLM prompts in a familiar tool: a git repository
- Execute prompts with chosen model and get results using a simple API
- Perform basic CRUD operations on prompts

> **Note:** It's an early version. Expect bugs, breaking changes and poor performance.

## 📖 Documentation

Full documentation coming soon!
