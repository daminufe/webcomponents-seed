(function() {
    'use strict';

    example();

    function example() {
        console.log('DO SOMETHING HERE WITH COMPONENT 1!');
    }

    let exampleES6 = (arg1,arg2,arg3) => {
        let TESTVAR = 2;
        console.log(TESTVAR);
        return TESTVAR;
    }

    exampleES6();

})();
