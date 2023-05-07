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
