## Operator Nullish(??)
trả về giá trị phía sau dấu ?? khi giá trị đầu là null hoặc undefined
```
let value1 = null;
let value2 = undefined;
let value3 = 'hello';

let result1 = value1 ?? 'default'; // result1 is 'default'
let result2 = value2 ?? 'default'; // result2 is 'default'
let result3 = value3 ?? 'default'; // result3 is 'hello'
```

## IIFE (the funtion is private)
```
(function(message){
    console.log(message)
})("chào bạn")
```
```
const app = (function{
    const cars = []
    return {
        add(car) {
            cars.push(car)
        },
        edit(index, car){
            cars[index] = car
        }
        delete(index){
            cars.splice(index,1)
        }
    }
})()
```
## SCOPE IN JS
- Global - Toàn cầu
- Code block - Khối mã : let, const
```
{
    let A = "A"
    const B = "B"
}
console.log(A) -> A is not defined
console.log(B) -> B is not defined
```
- Local scope - Hàm: var function
```
{
    var C = "hehe";
}
console.log(C) -> hehe 
```
```
function logger(){
    var name = "MINH";
    console.log(name) -> MINH 

    function logger2(){
        console.log("OK")
    }
    logger2() -> OK
}
logger()
console.log(name) -> name is not defined
logger2() -> logger2 is not defined
```
#### Get the variable at the nearest scope
```
const age = 18
{
    const age = 16
    {
        const age = 14
        {
            const age = 12
            {
                const age = 10
                console.log(age) -> 10
            }
        }
    }
}
```
#### When is the variable removed from memory
- Global varibles -> không tắt tab hoặc refresh tab thì sẽ không bị xóa
- Block code & trong hàm 
```
{
    const age = 16
    let name = 'MINH'
    console.log(age)
    console.log(name)
}
//khi thoát khỏi hàm thì biến sẽ bị xóa khỏi bộ nhớ
```

```
function logger(){
    const A = Math.random();
    console.log(A);
}
logger()
//sau khi thực thi logger function xõng thì const A sẽ bị xóa
```
- Biến trong hàm được tham chiếu bởi 1 hàm

```
function makeCounter(){
    let counter = 0;
    function Increasecounter(){
        rerturn ++counter
    }
    return Increasecounter;
}
const Increasecounter1 = makeCounter()
// vì Increasecounter1 là biến global nên nó sẽ keep lại giá trị bên trong nó, nên sau khi gọi lại liên tục thì biến counter sẽ tăng liên tục

console.log(Increasecounter1()) -> 1
console.log(Increasecounter1()) -> 2
console.log(Increasecounter1()) -> 3
```

## Closer in JS
là một hàm có thể ghi nhớ nơi nó được tạo và truy cập được biến ở bên ngoài phạm vi của nó 
```
function createLogger(namespace){
    function logger(message){
        console.log(`$[namespace] ${message}`)
    }
    return logger
}
const infoLogger = createLogger('Info')
infoLogger("Start Send Mail")
infoLogger("Sending Your Mail")
infoLogger("Send Mail Successfully !!!")

const errorLogger = createLogger('Error')
errorLogger("Your Mail not found")
errorLogger("Send Mail error")
```
#### closure with LocalStorage

```
function createStorage(key){
    const store = JSON.parse(localStorage.getItem(key)) ?? {}

    const save = () => {
        localStorage.setItem(key, JSON.stringify(store))
    }

    const storage = {
        get(key) {
            return store[key]
        },
        set(key, value) {
            store[key] = value
            save()
        },
        remove(key) {
            delete store[key]
            save()
        }
    }
    return storage
}


const profileSetting = createStorage('profile_setting')
console.log(profileSetting.set('fullName')) -> undefined
profileSetting.set('fullName', 'Minh Nguyen')

```

## HOISTING 
#### var & function (được hoisting)
```
console.log(age) -> undefined
var age =  16
// biến var age chỉ được khởi tạo, không được gán 


var age 
console.log(age) -> undefined
age = 16
console.log(age) -> 16
```
```
console.log(sum(1,1)) -> 2

function sum(a,b){
    return a + b;
}
```
#### let & const: phạm vi khối ()
```
{
    let fullName
    console.log(fullName) -> cannot access 'fullName' before initialization 
    fullName = 'Nguyen Van A'
     console.log(fullName) -> Nguyen Van A
}
```

#### Bonus
```
const counter1 = makeCounter();
console.log(counter1) -> 1

function makeCounter(){
    let counter = 0

    return increaseCounter

    function increaseCounter(){
        return ++counter
    }
}
```