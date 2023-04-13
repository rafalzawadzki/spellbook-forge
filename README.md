# 🪄📙🔨 Spellbook Forge
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/langchainai.svg?style=social&label=Follow%20%40SpellHQ)](https://twitter.com/spellhq) [![](https://dcbadge.vercel.app/api/server/R2nTZPGf?compact=true&style=flat)](https://discord.gg/R2nTZPGf)

✨ Make your LLM prompts executable and version controlled. ✨

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
GET http://localhost:3000/your/repository/prompt?execute

<-- HTTP 200
{
  "prompt-content": "Complete this phrase in coders’ language: Hello …",
  "model": "gpt3.5",
  "result": "Hello, World!"
}
```
See [live examples](#-try-it) to try it out!

## 🤔 What is this?

This is an [ExpressJS](https://expressjs.com) middleware that allows you to create an API interface for your LLM prompts. 
It will automatically generate a server for your prompts stored in a git repository. Using Spellbook, you can:
- Store & manage LLM prompts in a familiar tool: a git repository
- Execute prompts with chosen model and get results using a simple API
- Plug into LangChain templating system
- Perform basic CRUD operations on prompts

> 💡 **Note:** It's an early version. Expect bugs, breaking changes and poor performance.

## 🚀 Try it

> Open this link in your browser:
> https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world. 
> 
> Read below for a longer explanation!

➡️ Spellbook server: https://book.spell.so 

The server uses `spellbook-forge` and is currently hooked up to Github as a git host. You can use any public repository with prompts in it (as long as they adhere to [the accepted format](#-documentation)).

For example, using a repository [rafalzawadzki/spellbook-prompts](https://github.com/rafalzawadzki/spellbook-prompts), you can form an endpoint (and many more):

### CRUD
```
GET https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world
POST https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world
PUT https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world
DELETE https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world
```

### EXECUTION
```
// for simple prompts without templating
GET https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world?execute
 
// for prompts with templating (recommended)
POST https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world?execute
body: {
  "variables": [
    "name": "World"
  ]
}

// with different model
GET https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world?execute=gpt4
```



## 📖 Documentation

> 💡 Full documentation coming soon!

### Dependencies
   1. [🦜🔗 LangChain.js](https://js.langchain.com)
   2. [simple-git](https://github.com/steveukx/git-js)

### Prompt format
Prompts must adhere to a specific format (JSON/YAML). See more info [here](https://github.com/hwchase17/langchain-hub/tree/master/prompts).

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

## ☑️ Todo
- [ ] Documentation
  - [ ] OpenAI API key
  - [ ] Generated API
  - [ ] Templating
  - [ ] Using with LangChain
  - [ ] Prompt format
  - [ ] Available models
- [ ] Add missing functionality
  - [ ] `POST /prompt?execute` with body
  - [ ] Support for different models
  - [ ] Graceful error handling
  - [ ] Response formatting
