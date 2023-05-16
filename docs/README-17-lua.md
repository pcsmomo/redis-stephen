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
