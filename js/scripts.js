$(function() {
    var todoitems =[
        {
            item: "Buy a new computer",
            done: true
        },
        {
            item: "Buy a new car",
            done: false
        },
        {
            item: "Buy a new house",
            done: false
        }
    ];

    var functions = {
        showtodoitems: function() {
            var itemlist = $("#itemlist");
            itemlist.html(""); //clear the list
            todoitems.forEach(function(todoitems) {
                itemlist.append("\
                <tr>\
                    <td>" + todoitems.item + "</td>\
                    <td>\
                        <button>Edit</button>\
                        <button>Delete</button>\
                    </td>\
                </tr>\
                ");
            });
        }
    };

    functions.showtodoitems();
});