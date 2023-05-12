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

## 61. Store Variations

- `SUNIONSTORE`: Stores the union of multiple sets in a key.
- `SINTERSTORE`: Stores the intersect of multiple sets in a key.
- `SDIFFSTORE`: Stores the difference of multiple sets in a key.

```sh
SINTERSTORE colors:results colors:1 colors:2 colors:3
# (integer) 1

SMEMBERS colors:results
# 1) "blue"
```

## 62. Checking for an Element in a Set

- `SISMEMBER`: Determines whether a member belongs to a set.
- `SMISMEMBER`: Determines whether multiple members belong to a set.

```sh
SMEMBERS colors:1
# 1) "orange"
# 2) "blue"
# 3) "red"

SISMEMBER colors:1 purple
# (integer) 0

SMISMEMBER colors:1 red green blue
# 1) (integer) 1
# 2) (integer) 0
# 3) (integer) 1
```

## 63. Scanning a Set

- `SCARD`: Returns the number of members in a set. Length
- `SREM`: Removes one or more members from a set. Deletes the set if the last member was removed.
- `SSCAN`: Iterates over members of a set.

```sh
SCARD colors:1
# (integer) 3

SMEMBERS colors:2
SREM colors2:blue   # remove one
SMEMBERS colors:2
```

```sh
SSCAN colors:1 0 COUNT 2
# 1) "1"            # next cursor ID
# 2) 1) "blue"
#    2) "red"
SSCAN colors:1 1 COUNT 2
# 1) "0"
# 2) 1) "orange"
```

## 65. Most Common Use Cases of Sets

### Enforcing uniqueness of any value

```sh
SISMEMBER usernames:unique powerseller1
```

### Creating a relationship between different records

```sh
# Which items do user with ID 45 like?
SMEMBERS users#45:likes

# How many items does user with ID 45 like?
SCARD users#45:likes

# Does user with ID 45 like the item with ID 123?
SISMEMBER users#45:likes 123
```

### Finding common attributes between different things

```sh
SINTER users#45:likes users#32:likes
```

### General list of elements where order doesn't matter
