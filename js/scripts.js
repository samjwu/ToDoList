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

            todoitems.forEach(function(item) {
                var todoitemstatus = "todoitem-" + (item.done ? "done" : "notdone");
                
                itemlist.append("\
                <tr>\
                    <td class=" + todoitemstatus + ">" + item.item + "</td>\
                    <td>\
                        <button>Edit</button>\
                        <button>Delete</button>\
                    </td>\
                </tr>\
                ");
            });
        },

        changeitemstatus: function() {
            todoitems.forEach(function(item) {
                console.log($(this));
                // if(item.item) {
                //     item.done = !item.done;
                // }
            });
        }
    };

    functions.showtodoitems();


    $(".todoitem-notdone").on("click", functions.changeitemstatus);
});