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
