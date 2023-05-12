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
