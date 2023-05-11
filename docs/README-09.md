# Section 9: Enforcing Uniqueness with Sets

## 57. Basics of Sets

- `SADD`: Adds one or more members to a set. Creates the key if it doesn't exist.
- `SMEMBERS`: Returns all members of a set.

```sh
SADD colors red
# (integer) 1
SADD colors red
# (integer) 0   : Already exists
SADD colors green
# (integer) 1

SMEMBERS colors
# 1) "green"
# 2) "red"
```

## 58. Union of Sets, 59. Intersection of Sets, 60. Difference of Sets

- `SUNION`: Returns the union of multiple sets.
- `SINTER`: Returns the intersect of multiple sets.
- `SDIFF`: Returns the difference of multiple sets.

```sh
SADD colors:1 red blue orange
SADD colors:2 blue green purple
SADD colors:3 blue red purple

SUNION colors:1 colors:2 colors:3
# 1) "green"
# 2) "blue"
# 3) "orange"
# 4) "red"
# 5) "purple"

SINTER colors:1 colors:2 colors:3
# 1) "blue"

SDIFF colors:1 colors:2 colors:3
# 1) "orange"  # colors:1 - colors:2 - colors:3
SDIFF colors:2 colors:1 colors:3
# 1) "green"   # colors:2 - colors:1 - colors:3
```
