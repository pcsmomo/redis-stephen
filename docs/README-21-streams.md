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
