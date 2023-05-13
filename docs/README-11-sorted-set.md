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

## 75. Removing the Highest and Lowest Members

- `ZPOPMIN`: Returns the lowest-scoring members from a sorted set after removing them. Deletes the sorted set if the last member was popped.
- `ZPOPMAX`: Returns the highest-scoring members from a sorted set after removing them. Deletes the sorted set if the last member was popped.

```sh
DEL products
ZADD products 45 cpu
ZADD products 10 keyboard
ZADD products 55 power

ZPOPMIN products 2
# 1) "keyboard"
# 2) "10"
# 3) "cpu"
# 4) "45"

DEL products
ZADD products 45 cpu
ZADD products 10 keyboard
ZADD products 55 power

ZPOPMAX products 2
# 1) "power"
# 2) "55"
# 3) "cpu"
# 4) "45"
```

## 76. Updating Scores

- `ZINCRBY`: Increments the score of a member in a sorted set.

```sh
DEL products
ZADD products 45 cpu
ZADD products 10 keyboard
ZADD products 55 power

ZINCRBY products 15 cpu
# "60"
ZSCORE products cpu
# "60"
```

## 77. Querying a Sorted Set

- `ZRANGE`: Returns members in a sorted set within a range of indexes.

```sh
DEL products
ZADD products 45 cpu
ZADD products 10 keyboard
ZADD products 55 power

ZRANGE products 1 2 WITHSCORES
# 1) "cpu"
# 2) "45"
# 3) "power"
# 4) "55"
ZRANGE products 1 2
# 1) "cpu"
# 2) "power"

ZRANGE products 0 48 BYSCORE
# 1) "keyboard"
# 2) "cpu"
ZRANGE products 0 48 BYSCORE WITHSCORES
# 1) "keyboard"
# 2) "10"
# 3) "cpu"
# 4) "45"

ZRANGE products -inf (55 BYSCORE WITHSCORES
# 1) "keyboard"
# 2) "10"
# 3) "cpu"
# 4) "45"

ZRANGE products 1 2 REV # Reverse whole list first, then get index 1 to index 2
# 1) "cpu"
# 2) "keyboard"

ZRANGE products 0 60 BYSCORE LIMIT 1 2  # skip 1 and get next 2 elements
# 1) "cpu"
# 2) "power"
```
