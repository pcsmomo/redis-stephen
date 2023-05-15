# Section 14: HyperLogLog Structures

## 98. HyperLogsLogs

- `PFADD`: Adds elements to a HyperLogLog key. Creates the key if it doesn't exist.
- `PFCOUNT`: Returns the approximated cardinality of the set(s) observed by the HyperLogLog key(s).

```sh
PFADD vegetables celery
# (integer) 1
PFADD vegetables celery
# (integer) 0
PFADD vegetables potato
# (integer) 1
PFADD vegetables potato
# (integer) 0

PFCOUNT vegetables
# (integer) 2
```
