# Section 19: Querying Data with RediSearch

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
