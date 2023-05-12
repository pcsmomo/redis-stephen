# Section 11: Organizing Data with Sorted Sets

## 73. Adding and Removing Members

- `ZADD`: Adds one or more members to a sorted set, or updates their scores. Creates the key if it doesn't exist.
- `ZSCORE`: Returns the score of a member in a sorted set.
- `ZREM`: Removes one or more members from a sorted set. Deletes the sorted set if all members were removed.
-

```sh
ZADD products 45 monitor
# (integer) 1

ZSCORE products monitor
# "45"

ZREM products 45 monitor
# (integer) 1

ZSCORE products monitor
# (integer) 0
```

## 74. Finding a Range of Scores

- `ZCARD`: Returns the number of members in a sorted set.
- `ZCOUNT`: Returns the count of members in a sorted set that have scores within a range.

```sh
ZADD products 45 cpu
ZADD products 10 keyboard
ZADD products 55 power
ZCARD products
# (integer) 3

ZCOUNT products 0 50
# (integer) 2

# options for range
ZCOUNT products 10 45
# (integer) 2
ZCOUNT products (10 (45   # exclusive
# (integer) 0
ZCOUNT products -inf 40
# (integer) 1
```
