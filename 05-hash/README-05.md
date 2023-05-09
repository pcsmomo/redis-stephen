# Section 5: Hash Data Structures

## 34. Storing and Retrieving Hashes

- `HSET` -- sets the value of one or more fields on a hash.

```sh
HSET company name 'Concrete Co' age 1915
# (integer) 2

HSET company name 'Concrete Co' age 1915 industry materials reveneu 5.3
# (integer) 2

HGET compnay name
# "Concrete Co"

HGETALL company
# 1) "name"
# 2) "Concrete Co"
# 3) "age"
# 4) "1915"
# 5) "industry"
# 6) "materials"
# 7) "reveneu"
# 8) "5.3"
```

### 35. Deleting Hash Data

```sh
HEXISTS company age
# (integer) 1

DEL company
# (integer) 1

HSET company name 'Concrete Co' age 1915
# (integer) 2

HDEL company age
# (integer) 1

HGETALL company
# 1) "name"
# 2) "Concrete Co"
```
