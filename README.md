# Snake game

Toy-project, old school snake game, used to test new JS features in browser. Also it is good place to play with programming patterns.

Assumptions:

- written in VanillaJS
- no external libs
- optionally use JsDoc for type checking
- tools like prettier, linter are allowed
- bundlers - conditionally allowed for minification
- should work in browser

## Run

EcmaScript Modules need to follow CORS politics. This means that it need http server to work.

```bash
pnpm start
```

## Programming patterns

### Factory method

### Composite Pattern

Used in `GameScene`

### State Pattern

#### Snake Movement Direction

I used _State Pattern_ inside `Snake` object to store movement direction.
Why? not all movement direction changes are allowed:
you can't change direction from left to right, or from up to down. Also movement direction decide how is calculated next head position.
Using simple variable for storing state implicates a lot of code branching:

- when changing movement direction:

```js
if (['UP', 'DOWN'].includes(direction)
    && ['LEFT', 'RIGHT'].includes(nextDirection)) {

    direction = nextDirection;
}
// similar condition for change from horizontal to vertical
...
```

- when calculating next position:

```js
nextPosition(oldPosition) {
  switch(direction) {
    case 'UP':
      return ...;
    case 'DOWN':
      return ...;
    ...
  }
}
```

#### Game Control - Menu

Game may be in one of following states:

- running game
- pause menu
- main menu
- game over
