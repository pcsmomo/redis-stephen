# Section 17: Extending Redis with Scripting

## 123. Basics of Lua

```lua
print(123)
print('Hello World!')
print("Hello World!")


local sum = 1 + 1
print(sum)
sum = 5
print(sum)

if sum > 0 then
    print('sum is greater than 0')
end

if sum ~=0 then
    print('sum is not equal to 0')
end

if sum == 0 then
    print('asdf')
end

if 0 and '' then
    print('0 is truthy')
end

if false or not true then

end

if nil then
    print('wont run')
end
```

## 124. Handling Arrays

```lua
local colors = {'red', 'green', 'blue'}

print(colors[1])  -- start from 1, not 0
print(#colors)  -- length

table.insert(colors, 'orange')
print(colors[4])

for i, v in ipairs(colors) do
    print(i, v)  -- index, value
end

for i=5, 10 do
    print(i)
end
```

## 125. Handling Tables

```lua
-- LUA table == JS object
local user = {id = 'a1', name = 'samantha'}

print(user['id'])

for k, v in pairs(user) do
    print(k, v)
end
```

## 126. Loading and Executing Scripts

```sh
# don't forget 'return'
# if there are '' in your script, use ""
SCRIPT LOAD 'return 1 + 1'
# "c301e0c5bc3538d2bad3fdbf2e281887e643ada4"

# don't forget 0
EVALSHA c301e0c5bc3538d2bad3fdbf2e281887e643ada4 0
# (integer) 2


SCRIPT LOAD 'return 20 + 20'
# "e5d2517a068b886e5baaeeb43bc1c4e384018fdf"
EVALSHA e5d2517a068b886e5baaeeb43bc1c4e384018fdf 0
# (integer) 40
```

## 127. Providing Arguments

```sh
SCRIPT LOAD 'return 1 + tonumber(ARGV[1])'
# "f54696c104acb23787e4d627c487221c6f79ace7"
EVALSHA f54696c104acb23787e4d627c487221c6f79ace7 0 '100'
# (integer) 101

SCRIPT LOAD 'return 1 + tonumber(ARGV[1]) + tonumber(ARGV[2])'
# "c64fe48b79aa91f6624b133ff9f588642817d8e4"
EVALSHA c64fe48b79aa91f6624b133ff9f588642817d8e4 0 '100' '200'
# (integer) 301
```

## 128. Providing Key lists

```sh
SET color red
SCRIPT LOAD 'return redis.call("GET", "color")'
# "5c319cc258f79a4a2387edac10122cb4ee3770ea"
EVALSHA 5c319cc258f79a4a2387edac10122cb4ee3770ea 0
# "red"

DEL color
# (integer) 1
EVALSHA 5c319cc258f79a4a2387edac10122cb4ee3770ea 0
# (nil)
SET color blue
# OK
EVALSHA 5c319cc258f79a4a2387edac10122cb4ee3770ea 0
# "blue"
```

```sh
SET color red
# OK
SCRIPT LOAD 'return redis.call("GET", KEYS[1])'
# "d1ad8397c172dc0a63e271f0c4c4250ca8d5d1fb"
EVALSHA d1ad8397c172dc0a63e271f0c4c4250ca8d5d1fb 1 color
# "red"
```
