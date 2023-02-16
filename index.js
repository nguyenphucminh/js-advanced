let i = 0;
(function myFunc(){
    i++
    if(i<10){
        myFunc()
    }
})()