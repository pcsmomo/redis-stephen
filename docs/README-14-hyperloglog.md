# Section 14: HyperLogLog Structures

## 98. HyperLogsLogs

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
