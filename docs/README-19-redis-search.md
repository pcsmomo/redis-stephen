# Section 19: Querying Data with RediSearch

[Redis Commands: Search](https://redis.io/commands/?group=search)

## 152. Creating and Using an Index

- `FT.CREATE`: Creates an index with the given spec
- `FT.SEARCH`: Searches the index with a textual query, returning either documents or just ids
  - `()`: for TEXT
  - `{}`: for TAG
  - `[]`: for NUMERIC

```sh
HSET cars#a1 name 'fast car' color red year 1950
# (integer) 3
HSET cars#b1 name 'car' color red year 1960
HSET cars#c1 name 'old car' color blue year 1970
HSET cars#d1 name 'new car' color blue year 1990
```

```sh
# FT.CREATE idx:cars
#     ON HASH
#     PREFIX 1 cars#
#     SCHEMA
#         name TEXT
#         year NUMERIC
#         color TAG

FT.CREATE idx:cars ON HASH PREFIX 1 cars# SCHEMA name TEXT year NUMERIC color TAG
# FT.CREATE idx ON HASH PREFIX 1 blog:post: SCHEMA title TEXT SORTABLE published_at NUMERIC SORTABLE category TAG SORTABLE
# FT.CREATE idx ON HASH PREFIX 1 blog:post: SCHEMA sku AS sku_text TEXT sku AS sku_tag TAG SORTABLE
```

```sh
FT.SEARCH idx:cars '@name:(fast car)'
# 1) (integer) 1
# 2) "cars#a1"
# 3) 1) "name"
#    2) "fast car"
#    3) "color"
#    4) "red"
#    5) "year"
#    6) "1950"

FT.SEARCH idx:cars '@color:{blue}'
# 1) (integer) 2
# 2) "cars#c1"
# 3) 1) "name"
#    2) "old car"
#    3) "color"
#    4) "blue"
#    5) "year"
#    6) "1970"
# 4) "cars#d1"
# 5) 1) "name"
#    2) "new car"
#    3) "color"
#    4) "blue"
#    5) "year"
#    6) "1990"

FT.SEARCH idx:cars '@year:[1955 1980]'
# 1) (integer) 2
# 2) "cars#b1"
# 3) 1) "name"
#    2) "car"
#    3) "color"
#    4) "red"
#    5) "year"
#    6) "1960"
# 4) "cars#c1"
# 5) 1) "name"
#    2) "old car"
#    3) "color"
#    4) "blue"
#    5) "year"
#    6) "1970"
```

## 155. Numeric Queries

```sh
FT.SEARCH idx:cars '@year:[1955 1980] @color:{blue}'
# FT.SEARCH idx:locations '@cities:{ New York | Los Angeles | Barcelona }'

FT.SEARCH idx:cars '@year:[1955 1980]'
FT.SEARCH idx:cars '@year:[(1955 (1980]' # exclusive -> (1956-1979)
FT.SEARCH idx:cars '@year:[1955 +inf]'
FT.SEARCH idx:cars '@year:[-inf 1980]'
FT.SEARCH idx:cars '-@year:[1955 1980]' # not including 1955-1980
```

## 156. Tag Queries

```sh
HSET cars#e1 name 'modern car' color 'light blue' year 2000
HSET cars#f1 name 'test car' color "light green" year 2010

FT.SEARCH idx:cars '@color:{blue}'
FT.SEARCH idx:cars '-@color:{blue}'
FT.SEARCH idx:cars '@color:{red | blue}'
FT.SEARCH idx:cars '@color:{light\ blue}'
FT.SEARCH idx:cars "@color:{'light blue'}"
# FT.SEARCH idx:cars '@color:{"light blue"}'  # (error) Syntax error at offset 8 near color
```

### Stop words

[Stop words](https://redis.io/docs/stack/search/reference/stopwords/)

- All 'stop' words are removed from tag and text queries!!!
- `@cities:{ to | a | or }` -> `@cities:{ }`
- a, is, the, an, and, are, as, at, be, but, by, for, if, in, into, it, no, not, of, on, or, such, that, their, then, there, these, they, this, to, was, will, with\

## 157. Text Queries

(a fast, fast car!!!) -> [fast, fast, car]

### Stemming

Stemming is used to reduce words down to a base form

- [Stemming demo](https://snowballstem.org/demo.html)
- fasting, fastly, fasts -> fast

```sh
FT.SEARCH idx:cars '@name:(fast)'
FT.SEARCH idx:cars '@name:(fast car)' # 'fast' and 'car'
FT.SEARCH idx:cars '@name:(fast | car)' # 'fast or 'car'
FT.SEARCH idx:cars '-@name:(fast)' # does not include 'fast'

FT.SEARCH idx:cars '@name:(a fast fast car)'
FT.SEARCH idx:cars '@name:(fastly)'
```

## 158. Fuzzy Search

- Wrap a term with `%` to include strings that have a slight different in characters
  - it allows only 1 character mismatch
  - `%%`: allows 2 characters mismatch
  - `%%%`: allows up to 3 characters mismatch, but no more

```sh
FT.SEARCH idx:cars '@name:(%dar%)'
FT.SEARCH idx:cars '@name:(%nww%)'

FT.SEARCH idx:cars '@name:(%%e%%)'

FT.SEARCH idx:cars '@name:(%%%moder%%%)'
# 1) (integer) 1
# 2) "cars#e1"
# 3) 1) "name"
#    2) "modern car"
FT.SEARCH idx:cars '@name:(%%%mode%%%)'
# 1) (integer) 3
# 2) "cars#c1"
# 3) 1) "name"
#    2) "old car"
# 4) "cars#d1"
# 5) 1) "name"
#    2) "new car"
# 6) "cars#e1"
# 7) 1) "name"
#    2) "modern car"
FT.SEARCH idx:cars '@name:(%%%mod%%%)'
#  1) (integer) 6
```

## 159. Prefix Search

Add `*` to a string to do prefix search

> minimum two characters are required. `fa*`(⭕), `f*`(❌)

```sh
FT.SEARCH idx:cars '@name:(fa*)'
FT.SEARCH idx:cars '@name:(ol*)'
FT.SEARCH idx:cars '@name:(ca*)'
```

it can be suffix or middle search

```sh
FT.SEARCH idx:cars '@name:(*st)'
# 1) (integer) 2
# 2) "cars#a1"
# 3) 1) "name"
#    2) "fast car"
# 4) "cars#f1"
# 5) 1) "name"
#    2) "test car"
FT.SEARCH idx:cars '@name:(*ode*)'
# 1) (integer) 1
# 2) "cars#e1"
# 3) 1) "name"
#    2) "modern car"
```

## 163. When to Create the Index?

- `FT._LIST`: Returns a list of all existing indexes

```sh
FT._LIST
# 1) "idx:cars"
# 2) "idx:items"
```

### 169. Understanding Queries with EXPLAIN

- `FT.EXPLAINCLI`: Returns the execution plan for a complex query

```sh
FT.EXPLAINCLI idx:items 'chair'
# 1) UNION {
# 2)   chair
# 3)   +chair(expanded)
# 4) }
# 5)
```

- Stemming
  - chairs, chaired, chairing -> chair
- `+chair(expanded)` does the opposite of Stemming
  - chair -> chairs, chaired, chairing

```sh
# exclude "desk"
FT.EXPLAINCLI idx:items 'chair -desk'
#  1) INTERSECT {
#  2)   UNION {
#  3)     chair
#  4)     +chair(expanded)
#  5)   }
#  6)   NOT{
#  7)     desk
#  8)   }
#  9) }
# 10)
```

```sh
# It doesn't search description
FT.EXPLAINCLI idx:items '@name:(chair) | @description:(chair)'
#  1) @name:UNION {
#  2)   @name:UNION {
#  3)     @name:chair
#  4)     @name:+chair(expanded)
#  5)   }
#  6)   @NULL:UNION {
#  7)     @NULL:chair
#  8)     @NULL:+chair(expanded)
#  9)   }
# 10) }
# 11)

FT.EXPLAINCLI idx:items '(@name:(chair)) | (@description:(chair))'
#  1) UNION {
#  2)   @name:UNION {
#  3)     @name:chair
#  4)     @name:+chair(expanded)
#  5)   }
#  6)   @description:UNION {
#  7)     @description:chair
#  8)     @description:+chair(expanded)
#  9)   }
# 10) }
# 11)
```

### 170. Query Performance with PROFILE

- `FT.PROFILE`: Performs a `FT.SEARCH` or `FT.AGGREGATE` command and collects performance information

```sh
FT.PROFILE idx:items SEARCH QUERY 'chairs' LIMIT 0 0
# 1) 1) (integer) 206
# 2) 1) 1) Total profile time
#       2) "0"
#    2) 1) Parsing time
#       2) "0"
#    3) 1) Pipeline creation time
#       2) "0"
#    4) 1) Iterators profile
#       2)  1) Type
#           2) UNION
#           3) Query type
#           4) UNION
#           5) Time
#           6) "0"
#           7) Counter
#           8) (integer) 206
#           9) Child iterators
#          10)  1) Type
#               2) TEXT
#               3) Term
#               4) chairs
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 101
#               9) Size
#              10) (integer) 101
#          11)  1) Type
#               2) TEXT
#               3) Term
#               4) +chair
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 101
#               9) Size
#              10) (integer) 101
#          12)  1) Type
#               2) TEXT
#               3) Term
#               4) chair
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 176
#               9) Size
#              10) (integer) 176
#    5) 1) Result processors profile
#       2) 1) Type
#          2) Index
#          3) Time
#          4) "0"
#          5) Counter
#          6) (integer) 206
#       3) 1) Type
#          2) Counter
#          3) Time
#          4) "0"
#          5) Counter
#          6) (integer) 1

FT.PROFILE idx:items SEARCH QUERY '%%chair%%' LIMIT 0 0
# 1) 1) (integer) 222
# 2) 1) 1) Total profile time
#       2) "0"
#    2) 1) Parsing time
#       2) "0"
#    3) 1) Pipeline creation time
#       2) "0"
#    4) 1) Iterators profile
#       2)  1) Type
#           2) UNION
#           3) Query type
#           4) "FUZZY - chair"
#           5) Time
#           6) "0"
#           7) Counter
#           8) (integer) 222
#           9) Child iterators
#          10)  1) Type
#               2) TEXT
#               3) Term
#               4) +chair
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 101
#               9) Size
#              10) (integer) 101
#          11)  1) Type
#               2) TEXT
#               3) Term
#               4) +chais
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 1
#               9) Size
#              10) (integer) 1
#          12)  1) Type
#               2) TEXT
#               3) Term
#               4) +fair
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 1
#               9) Size
#              10) (integer) 1
#          13)  1) Type
#               2) TEXT
#               3) Term
#               4) +pair
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 1
#               9) Size
#              10) (integer) 1
#          14)  1) Type
#               2) TEXT
#               3) Term
#               4) car
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 18
#               9) Size
#              10) (integer) 18
#          15)  1) Type
#               2) TEXT
#               3) Term
#               4) chair
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 176
#               9) Size
#              10) (integer) 176
#          16)  1) Type
#               2) TEXT
#               3) Term
#               4) chaira
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 1
#               9) Size
#              10) (integer) 1
#          17)  1) Type
#               2) TEXT
#               3) Term
#               4) chairs
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 101
#               9) Size
#              10) (integer) 101
#          18)  1) Type
#               2) TEXT
#               3) Term
#               4) chaise
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 1
#               9) Size
#              10) (integer) 1
#          19)  1) Type
#               2) TEXT
#               3) Term
#               4) chat
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 1
#               9) Size
#              10) (integer) 1
#          20)  1) Type
#               2) TEXT
#               3) Term
#               4) cheer
#               5) Time
#               6) "0"
#               7) Counter
#               8) (integer) 4
#               9) Size
#              10) (integer) 4
#    5) 1) Result processors profile
#       2) 1) Type
#          2) Index
#          3) Time
#          4) "0"
#          5) Counter
#          6) (integer) 222
#       3) 1) Type
#          2) Counter
#          3) Time
#          4) "0"
#          5) Counter
#          6) (integer) 1
```
