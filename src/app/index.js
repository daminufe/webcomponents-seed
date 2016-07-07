(function() {
    'use strict';

    example();

    function example() {
        console.log('DO SOMETHING HERE!');

        var users = [
            { 'user': 'barney', 'age': 36, 'active': true },
            { 'user': 'fred',   'age': 40, 'active': false }
        ];

        let result =_.filter(users, (item) => { return !item.active; });
        console.log(result);

        // Code To append component HTML - TEST
        // var link = document.querySelector('link[rel="import"]');
        // var content = link.import;
        //
        // // Grab DOM from warning.html's document.
        // var el = content.querySelector('.c1');
        //
        // document.body.appendChild(el.cloneNode(true));
    }

    let exampleES6 = (arg1,arg2,arg3) => {
        let a = 2;
        console.log(a);
        return a;
    }

    exampleES6();

})();
