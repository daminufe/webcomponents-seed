(function() {
    'use strict';

    example();

    function example() {
        console.log('DO SOMETHING HERE!');
    }

    let exampleES6 = (arg1,arg2,arg3) => {
        let a = 2;
        console.log(a);
        return a;
    }

    exampleES6();

})();
