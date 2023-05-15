# Section 15: Storing Collections with Lists

## 102. Reading and Writing Data to a List

- `LPUSH`: Prepends one or more elements to a list. Creates the key if it doesn't exist.
- `RPUSH`: Appends one or more elements to a list. Creates the key if it doesn't exist.

- `LLEN`: Returns the length of a list.
- `LINDEX`: Returns an element from a list by its index.

```sh
LPUSH temps 25
# (integer) 1
RPUSH temps 27
# (integer) 2

LLEN temps
# (integer) 2
LINDEX temps 0
# "25"
LINDEX temps 1
# "27"
LINDEX temps -1
# "27"
LINDEX temps -2
# "25"
```

## 103. Ranges and Searches

- `LRANGE`: Returns a range of elements from a list.
- `LPOS`: Returns the index of matching elements in a list.

```sh
DEL temps

RPUSH temps 25
RPUSH temps 27
RPUSH temps 25
RPUSH temps 30
RPUSH temps 24

LRANGE temps 1 3
# 1) "27"
# 2) "25"
# 3) "30"
LRANGE temps 0 -1
# 1) "25"
# 2) "27"
# 3) "25"
# 4) "30"
# 5) "24"
LRANGE temps 0 -2
# 1) "25"
# 2) "27"
# 3) "25"
# 4) "30"
LRANGE temps -3 -1
# 1) "25"
# 2) "30"
# 3) "24"
```

```sh
LPOS temps 25
# (integer) 0
LPOS temps 25 RANK 2
# (integer) 2
LPOS temps 25 COUNT 2
# 1) (integer) 0
# 2) (integer) 2

LPOS temps 24 MAXLEN 4
# (nil)
LPOS temps 24 MAXLEN 5
# (integer) 4
```

## 104. Trimming Lists

- `LPOP`: Returns the first elements in a list after removing it. Deletes the list if the last element was popped.
- `RPOP`: Returns and removes the last elements of a list. Deletes the list if the last element was popped.
- `LSET`: Sets the value of an element in a list by its index.
- `LTRIM`: Removes elements from both ends a list. Deletes the list if all elements were trimmed.

```sh
DEL temps

RPUSH temps 25
RPUSH temps 27
RPUSH temps 25
RPUSH temps 30
RPUSH temps 24

LINDEX temps 0
# "25"
LPOP temps
# "25"
LINDEX temps 0
# "27"

LINDEX temps -1
# "24"
RPOP temps 2
# 1) "24"
# 2) "30"
LINDEX temps -1
# "25"
```

```sh
DEL temps

RPUSH temps 25
RPUSH temps 27
RPUSH temps 25
RPUSH temps 30
RPUSH temps 24

LINDEX temps 0
# "25"
LSET temps 0 35
# OK
LINDEX temps 0
# "35"

LINDEX temps -1
LSET temps -1 35
LINDEX temps -1
# "35"

LLEN temps
# (integer) 5
```

```sh
LTRIM temps 1 3 # it will leave only between index 1-3
LINDEX temps 0
# "27"
LINDEX temps -1
# "30"
LLEN temps
# (integer) 3
```

## 105. Removing Elements

- `LINSERT`: Inserts an element before or after another element in a list.
- `LREM`: Removes elements from a list. Deletes the list if the last element was removed.

```sh
DEL temps

RPUSH temps 25
RPUSH temps 27
RPUSH temps 25
RPUSH temps 30
RPUSH temps 24

LINSERT temps BEFORE 30 15
# (integer) 6
LINDEX temps 3
# "15"

LINSERT temps AFTER 30 15
# (integer) 6
LRANGE temps 0 -1
# 1) "25"
# 2) "27"
# 3) "25"
# 4) "15"
# 5) "30"
# 6) "15"
# 7) "24"
```

```sh
DEL temps

RPUSH temps 25
RPUSH temps 27
RPUSH temps 25
RPUSH temps 30
RPUSH temps 24

# Remove two copy of 25 (from right to left: -2)
LREM temps -2 25
# (integer) 2
LRANGE temps 0 -1
# 1) "27"
# 2) "30"
# 3) "24"

# Remove a copy of 25 (from left to right: 1)
LREM temps 1 25

# Remove all 25
LREM temps 0 25
```

## 106. List Use Cases

```sh
DEL reviews

RPUSH reviews b2
RPUSH reviews a1

HSET books:a1 title 'Good Book'
HSET books:b2 title 'Bad Book'

SORT reviews BY nosort GET books:*->title
```
