# Section 2: Commands for Adding and Querying Data

## 10. Variations of SET

```sh
SET color red

SET color green get
# "red"
```

### XX -- Only set the key if it already exist.

```sh
SET asdf "hi there" XX
# (nil)

SET color blue XX
# OK
```

### NX -- Only set the key if it does not already exist.

```sh
SET color blue NX
# (nil)
```
