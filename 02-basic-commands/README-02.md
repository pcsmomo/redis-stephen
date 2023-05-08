# Section 2: Commands for Adding and Querying Data

## 10. Variations of SET

- `GET` -- Return the old string stored at key, or nil if key did not exist.

```sh
SET color red

SET color green GET
# "red"
```

- `XX` -- Only set the key if it already exist.

```sh
SET asdf "hi there" XX
# (nil)

SET color blue XX
# OK
```

- `NX` -- Only set the key if it does not already exist.

```sh
SET color blue NX
# (nil)
```

## 11. Use Case of Expiration Options

### Why?

Redis is an in-memory key-value data store that is often used as a cache or for fast data retrieval. One of the features of Redis is the ability to set an expiration time for keys, meaning that after a certain amount of time, the key and its associated value will be automatically removed from the database.

- Memory management
- Cache invalidation
- Time-limited access

### Various expiration options

- `EX` seconds -- Set the specified expire time, in seconds.

```sh
SET color red EX 2
# OK
GET color
# "red"
GET color  # after 2 seconds
# (nil)
```

- `PX` milliseconds -- Set the specified expire time, in milliseconds.
- `EXAT` timestamp-seconds -- Set the specified Unix time at which the key will expire, in seconds.

```sh
time
# 1) "1683440767"
# 2) "929625"

# use website, https://www.epochconverter.com/
SET mykey "Hello World!" EXAT 1683440880  # Date and time (your time zone): Sunday, May 7, 2023 4:28:00 PM GMT+10:00
# OK
GET mykey
# "Hello World!"
GET mykey
```

- `PXAT` timestamp-milliseconds -- Set the specified Unix time at which the key will expire, in milliseconds.
- `KEEPTTL` -- Retain the time to live associated with the key.

## 12. Setting Multiple Keys

- SETEX
  - `SETEX color 2 red` === `SET color red EX 2`
- SETNX
  - `SETNX`

```sh
MSET color red model toyoya
GET color
# "red"
GET model
# "toyota"

MGET color model
# 1) "red"
# 2) "toyoya"
```

### 14. String Ranges

```sh
DEL color
# (integer) 1
DEL color
# (integer) 0
```

```sh
GET model
# "toyota"
GETRANGE model 0 2
# "toy"

SETRANGE model 2 blue
# (integer) 6
GET model
# "toblue"
```

### 15. Are These Commands Even Useful?

| id  | type  | color | material |
| --- | ----- | ----- | -------- |
| 1   | couch | brown | leather  |
| 2   | table | red   | wood     |
| 3   | chair | green | plastic  |

⬇️

| id  | type | color | material |
| --- | ---- | ----- | -------- |
| 1   | a    | q     | g        |
| 2   | g    | b     | o        |
| 3   | e    | e     | c        |

⬇️

| Key    | Value |
| ------ | ----- |
| item:1 | bcd   |
| item:2 | qog   |
| item:3 | cir   |

1. Fetch one to three properties of a single item
   - `GETRANGE item:1 0 0`
2. Update one to three properties of a single item
   - `SETRANGE item:1 0 bcd`
3. Fetch all properties related to several items
   - `MGET item:1 item:2 item:3`
4. Create several items
   - `MSET item:4 trq item:5 nzq`

### 16. Dealing with Numbers

- DECR
- DECRBY
- INCR
- INCRBY
- INCRBYFLOAT

```sh
SET age 20
INCR age
# (integer) 21
DECR age
# (integer) 20
INCRBY age 20
# (integer) 40
INCRBY age 20
# (integer) 40
INCRBY age -12
# (integer) 28
INCRBYFLOAT age -3.333
# "24.667"
INCRBYFLOAT age 0.333
# "25"
```

### 17. Again... Why do These Commands Exist?

You could use `GET` and `SET` commands to increase number,
but it is volunerable for asynchronous issues (if many requests occurs at the same time)

To solve this issue,

1. Use a Redis transaction with `WATCH`
2. Use a lock
3. Use INCR
