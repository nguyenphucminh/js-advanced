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
        return ++counter;
    }
}
```
## USE STRICT (STRICT MODE)
#### case
```
fullName = 'Nguyen Van A';
function testFunc() {
    age = 18;
} 
testFunc()

console.log(fullName) -> Nguyen Van A
console.log(age) -> 8 (?)
```
#### solution with 'use strict'
```
'use strict'
fullName = 'Nguyen Van A';
function testFunc() {
    age = 18;
} 
testFunc()

console.log(fullName) -> 'fullName is not defined'
console.log(age) -> 8 'age is not defined'
```

## Chuyển đổi sang Boolean bằng toán tử !!
Đôi khi chúng ta cần kiểm tra xem một số biến có tồn tại hay là giá trị của nó có hợp lệ hay không, để có thể xem nó là giá trị thực (true value).

Để thực hiện loại xác nhận này, bạn có thể sử dụng toán tử !! (Toán tử phủ định kép) đơn giản như là: !!variable

Nó sẽ tự động chuyển đổi bất kỳ loại dữ liệu nào thành boolean:

Biến này sẽ trả về false chỉ khi nó có một số giá trị sau: 0, null, "", undefined hoặc NaN
Nếu không nó sẽ trả lại true.

```
function Account(cash) {
    this.cash = cash;
    this.hasMoney = !!cash;
}

var account = new Account(100.50);
console.log(account.cash); // 100.50
console.log(account.hasMoney); // true

var emptyAccount = new Account(0);
console.log(emptyAccount.cash); // 0
console.log(emptyAccount.hasMoney); // false
// Trong trường hợp này, nếu giá trị account.cash lớn hơn 0, acount.hasMoney sẽ true
```

## Làm tròn số
```
console.log(23.9 | 0);  // Result: 23
console.log(-23.9 | 0); // Result: -23
```

## Sao chép mảng với các giá trị unique
```
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

#### Duplicate item in 2 array
```
var a = [1, 2, 3], b = [101, 2, 1, 10]
var c = a.concat(b)
var d = c.filter((item, pos) => c.indexOf(item) === pos)
console.log(d)
```
#### Async handler
```
express.get('/', asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}))
```
```
express.get('/',(req, res, next) => {
    foo.findAll()
    .then ( bar => {
       res.send(bar)
     } )
    .catch(next); // error passed on to the error handling route
})
```
#### Mix similar items of 2 arrray
```
const topics = [
  {
    topic: "ReactJS",
    posts: [
      { postID: "id1", title: "title1" },
      { postID: "id2", title: "title2" },
    ],
  },
  {
    topic: "Vue.js",
    posts: [
      { postID: "id3", title: "title3" },
      { postID: "id4", title: "title4" },
    ],
  },
];
const a = topics.reduce((total, item)=>{
    return [...total, ...item.posts]
},[])
console.log("arr", a)
```
#### Convert 2 dimensional arr to 1 dimensional arrr
```
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flatValues = data.reduce((total, value) => {
  return total.concat(value);
}, []);

console.log(flatValues); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```


The first one uses the async / await language elements and is more concise.
https://app.ganttlab.com/

