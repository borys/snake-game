# Snake game

[![CI workflow](https://github.com/borys/snake-game/actions/workflows/run-test.yml/badge.svg)](https://github.com/borys/snake-game/actions/workflows/run-test.yml)
[![Deploy static content to Pages](https://github.com/borys/snake-game/actions/workflows/deploy.yml/badge.svg)](https://github.com/borys/snake-game/actions/workflows/deploy.yml)

Toy-project, old school snake game, used to test new JS features in browser. Also it is good place to play with programming patterns.

You may check it here: [>snake game<](https://borys.github.io/snake-game/)

Project assumptions:

- written in VanillaJS
- no external libs required
- optionally use JsDoc with tsc for type checking
- tools like prettier, linter are allowed
- bundlers - conditionally allowed for minification
- should work in browser

## Install, Build, Run

EcmaScript Modules need to follow CORS politics. This means that it need http server to work.

Development:

```bash
pnpm install
pnpm dev
```

Production:

```bash
pnpm install
pnpm build
pnpm preview
```
