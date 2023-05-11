# Section 9: Enforcing Uniqueness with Sets

## 57. Basics of Sets

- SADD: Adds one or more members to a set. Creates the key if it doesn't exist.
- SMEMBERS: Returns all members of a set.

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
