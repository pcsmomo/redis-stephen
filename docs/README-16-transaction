# Section 16: More Practice with the E-Commerce App

## 116. Transactions

- `MULTI`: Starts a transaction.
- `EXEC`: Executes all commands in a transaction.

```sh
MULTI
# OK

SET color red
# QUEUED
SET count 5
# QUEUED

EXEC
# 1) OK
# 2) OK
```

## 117. Watching a Key with Transactions

- `WATCH`: Monitors changes to keys to determine the execution of a transaction.

```sh
WATCH color
# OK
SET color blue
# OK

MULTI
# OK

SET color red
# QUEUED
SET count 5
# QUEUED

EXEC
# (nil)
```

## 118. Isolated Connections for Transactions

### Common pattern of using transaction

```sh
WATCH color

GET color
GET count

######
MULTI

SET color red
SET count 5

EXEC
```

### To apply our e-commerce-app

```sh
WATCH item:a1

HGETALL item:a1

######
MULTI

HSET item:a1 amount 10 bids 1
RPUSH items

EXEC
```
