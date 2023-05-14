# Section 13: From Relational Data to Redis

## 91. The Sort Command

- Probably the trickiest command to understand
- Used on sets, sorted sets, and lists
- Calling this command 'SORT' is misleading!!!
- Terminology we use with 'sort' conflicts with terms we use for sorted sets!!!!

## 92. Terminology Around Sort

```sh
HSET books:good title 'Good Book' year 1950
HSET books:bad title 'Bad Book' year 1930
HSET books:ok title 'OK Book' year 1940

ZADD books:likes 999 good
ZADD books:likes 0 bad
ZADD books:likes 40 ok
```

```sh
SORT books:likes
# (error) ERR One or more scores can't be converted into double
# Sort refers to these members as scores (confisuing!)

SORT books:likes ALPHA
# 1) "bad"
# 2) "good"
# 3) "ok"

SORT books:likes LIMIT 1 2 ALPHA  # LIMIT (offset) (count)
# 1) "good"
# 2) "ok"
```

## 93. Specifying the BY Argument

```sh
SORT books:likes BY books:*->year
# 1) "bad"
# 2) "ok"
# 3) "good"
```

1. firstly, it gets a value of `year` column in matching key `book:*`
2. it will sort by the column, books:\*->year
3. return sorted members
