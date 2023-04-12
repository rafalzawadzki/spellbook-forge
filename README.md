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

### Dependencies
   1. [LangChain.js](https://js.langchain.com)
   2. [simple-git](https://github.com/steveukx/git-js)

### Prompt format
Prompts must adhere to a specific format (JSON/YAML). See more info [here](https://github.com/hwchase17/langchain-hub/tree/master/prompts)

#### Example

```jsx
├── prompt1
│   ├── prompt.json
│   └── readme.md
└── collection
    └── prompt2
        ├── prompt.yaml
        └── readme.md
```

The above file structure will result in the following API endpoints being generated:

`{host}/prompt1`

`{host}/collection/prompt2`

#### Files
1. `prompt.json` the main file with the prompt content and configuration.
2. `readme.md` additional information about prompt usage, examples etc.
