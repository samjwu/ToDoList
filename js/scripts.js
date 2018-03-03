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

            todoitems.forEach(function(todo) {
                var todoitemstatus = "todoitem-" + (todo.done ? "done" : "notdone");
                
                itemlist.append("\
                <tr>\
                    <td class=" + todoitemstatus + ">" + todo.item + "</td>\
                    <td>\
                        <button>Edit</button>\
                        <button>Delete</button>\
                    </td>\
                </tr>\
                ");
            });
        },

        changeitemstatus: function() {
            todoitems.forEach(function(todo) {
                if(todo.item == $(this).text()) {
                    todo.done = !todo.done;
                }
            }.bind(this));
            functions.showtodoitems();
        },

        addtodoitem: function(event) {
            event.preventDefault();

            var addinput = $("#addinput");
            var inputvalue = addinput.val();

            todoitems.push({
                item: inputvalue,
                done: false
            });
            addinput.val("");
            functions.showtodoitems();
        }
    };

    functions.showtodoitems();


    // $(".todoitem-notdone").on("click", functions.changeitemstatus); //stops working when items replaced by showtodoitems
    $("#addform").on("submit", functions.addtodoitem);
    $("table").on("click", ".todoitem-notdone", functions.changeitemstatus);
    $("table").on("click", ".todoitem-done", functions.changeitemstatus);

});