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

> This prompt repository: https://github.com/rafalzawadzki/spellbook-prompts/hello-world
> 
> Can be executed like this: https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world?execute


➡️ Spellbook server: https://book.spell.so 

The server uses `spellbook-forge` and is currently hooked up to Github as a git host. You can use any public repository with prompts in it (as long as they adhere to [the accepted format](#-documentation)).

For example, using a repository [rafalzawadzki/spellbook-prompts](https://github.com/rafalzawadzki/spellbook-prompts), you can form an endpoint ([and many more](#api)):

https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world

## 📖 Documentation

> 💡 Full documentation coming soon!

### OpenAI key
If you want to use the `execute` query on your own spellbook-forge instance, you need to provide an OpenAI API key in .env file or env variables:
```md
OPENAI_API_KEY=your-key
```

### Main dependencies
   1. [🦜🔗 LangChain.js](https://js.langchain.com)
   2. [simple-git](https://github.com/steveukx/git-js)

### Prompt format
Prompt files must adhere to a specific format (JSON/YAML). See examples here [here](https://github.com/rafalzawadzki/spellbook-prompts).

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

### API

#### CRUD

- `GET` `{host}/path/to/prompt` - get prompt content

- `POST` `{host}/path/to/prompt` - upsert prompt content

- `DELETE` `{host}/path/to/prompt` - delete prompt (along with readme and metadata!)

#### Execution

- `GET` `{host}/path/to/prompt?execute` - for simple prompts without templating

- `POST` `{host}/path/to/prompt?execute` - for prompts with templating (recommended)

```
// request body
{
  "variables": [
    "name": "World"
  ]
}
```

- `GET` `{host}/path/to/prompt?execute=gpt4` - with different model (not implemented yet)

### Using with LangChain

You can fetch the prompt content and execute it using LangChain:

```js
import { PromptTemplate } from "langchain/prompts";

export const run = async () => {
  const template = await fetch(
          "https://book.spell.so/rafalzawadzki/spellbook-prompts/hello-world"
  ).then((res) => res.text());
  const prompt = new PromptTemplate({template, inputVariables: ["product"]})
  // do something with the prompt ...
}
```

The presented solution ofc makes sense mostly in chaining, for simple prompts it's best to just use Spellbook directly!

In the future I may contribute to extend the [LangChain `prompt/load`](https://js.langchain.com/docs/api/modules/prompts_load) function to support loading prompts from Spellbook, eg:

```js
import { loadPrompt } from "langchain/prompts/load";
const prompt = await loadPrompt("{spellbook-host}/hello-world/prompt");
```


## ☑️ Todo
- [ ] Documentation
  - [ ] OpenAI API key
  - [x] Generated API
  - [ ] Templating
  - [x] Using with LangChain
  - [ ] Prompt format
  - [ ] Available models
- [ ] Add missing functionality
  - [ ] `POST /prompt?execute` with body
  - [ ] Support for different models, eg. `execute=gpt4`
  - [ ] Graceful error handling
  - [ ] Response formatting
