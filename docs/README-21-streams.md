# Section 21: Service Communication with Streams

[Redis Commands: Streams](https://redis.io/commands/?group=stream)

## 177. Adding Messages to a Stream

- `XADD`: Appends a new message to a stream. Creates the key if it doesn't exist.

```sh
XADD fruits * name strawberry color red
# "1684573584965-0"

# fruits: where the stream is stored
# *: Have Redis generate an ID for us (a unix timestamp)
# name: key
# strawberry: valule
# color: key
# red: value
```

## 178. Consuming Streams with XREAD

- `XREAD`: Returns messages from multiple streams with IDs greater than the ones requested. Blocks until a message is available otherwise.

```sh
# Read all messages from the beginning of time
XREAD STREAMS fruits 0-0
# 1) 1) "fruits"
#    2) 1) 1) "1684573584965-0"
#          2) 1) "name"
#             2) "strawberry"
#             3) "color"
#             4) "red"

# Read all messages after (but not including) this timestamp
XREAD STREAMS fruits 1684573584965-0
# (nil)
XREAD STREAMS fruits 1684573584964-0
# 1) 1) "fruits"
#    2) 1) 1) "1684573584965-0"
```

```sh
XADD fruits * name banana color yellow
# "1684574013812-0"

XREAD STREAMS fruits 0-0
# 1) 1) "fruits"
#    2) 1) 1) "1684573584965-0"
#       2) 1) "1684574013812-0"

XREAD COUNT 1 STREAMS fruits 0-0
# 1) 1) "fruits"
#    2) 1) 1) "1684573584965-0"

XREAD COUNT 3 STREAMS fruits 0-0
# 1) 1) "fruits"
#    2) 1) 1) "1684573584965-0"
#       2) 1) "1684574013812-0"
```

## 179. Blocking Reads

```sh
# if no messages are available, wait for 3000 ms before returning
XREAD BLOCK 3000 STREAMS fruits 0-0
# the new message below will be displayed here
```

```sh
# during waiting, add a new message in a different terminal
XADD fruits * name orange color orange
# "1684621171617-0"
```

```sh
# either COUNT or BLOCK command will be ignored depending on data existance
XREAD COUNT 5 BLOCK 3000 STREAMS fruits 1684621171617-0
XREAD COUNT 5 BLOCK 3000 STREAMS fruits 0-0
XADD fruits * name apple color red
```

## 180. An XREAD Shortcut

```sh
# $: Look for messages starting at the 'current' time
XREAD COUNT 5 BLOCK 3000 STREAMS fruits $
XADD fruits * name pineapple color yellow
```
