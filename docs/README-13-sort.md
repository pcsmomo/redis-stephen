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
SORT books:likes BY books:*->year GET #
```

1. firstly, it gets a value of `year` column in matching key `book:*`
2. it will sort by the column, books:\*->year
3. return sorted members

## 94. Joining Data with Sort

```sh
SORT books:likes BY books:*->year GET books:*->title
# 1) "Bad Book"
# 2) "OK Book"
# 3) "Good Book"
SORT books:likes BY books:*->year GET books:*->title GET books:*->year
# 1) "Bad Book"
# 2) "1930"
# 3) "OK Book"
# 4) "1940"
# 5) "Good Book"
# 6) "1950"
SORT books:likes BY books:*->year GET # GET books:*->title GET books:*->year
# 1) "bad"
# 2) "Bad Book"
# 3) "1930"
# 4) "ok"
# 5) "OK Book"
# 6) "1940"
# 7) "good"
# 8) "Good Book"
# 9) "1950"

# sorted set is basically sorted by score already, so no need to sort and it makes it faster.
SORT books:likes BY nosort GET # GET books:*->title GET books:*->year
# 1) "bad"
# 2) "Bad Book"
# 3) "1930"
# 4) "ok"
# 5) "OK Book"
# 6) "1940"
# 7) "good"
# 8) "Good Book"
# 9) "1950"
```

## 95. A Few More Arguments

```sh
# it will also skip the sorting operation
SORT books:likes BY AEADSOFJED GET # GET books:*->title GET books:*->year

SORT books:likes BY nosort GET # GET books:*->title GET books:*->year ASC

SORT books:likes BY nosort GET # GET books:*->title GET books:*->year DESC
# 1) "good"
# 2) "Good Book"
# 3) "1950"
# 4) "ok"
# 5) "OK Book"
# 6) "1940"
# 7) "bad"
# 8) "Bad Book"
# 9) "1930"
```
