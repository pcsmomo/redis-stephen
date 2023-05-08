_Exercise #1_

Store the value `Toyota` at the key `car`.

```sh
SET car Toyota
```

_Exercise #2_

Write a command that will store the value `triangle` at the key `shape` _only if_ the key `shape` is not defined.

```sh
SET shape triangle NX
SETNX shape triangle
```

_Exercise #3_

Write a command that will store the value `'Todays Headlines'` at the key `news`, but automatically expire the key after three seconds.

```sh
SET news 'Todays Headlines' EX 3
SETEX news 3 'Todays Headlines'
```
