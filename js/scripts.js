$(function() {
    var todoitems =[
        {
            tag: "Buy a new computer",
            done: true
        },
        {
            tag: "Buy a new car",
            done: false
        },
        {
            tag: "Buy a new house",
            done: false
        }
    ];


    var functions = {
        showtodoitems: function() {
            var itemlist = $("#itemlist");
            itemlist.html(""); //clear the list

            todoitems.forEach(function(item) {
                var todoitemstatus = (item.done ? "done" : "notdone");
                
                itemlist.append("\
                <tr>\
                    <td class=" + todoitemstatus + ">" + item.tag + "</td>\
                    <td>\
                        <button class='edit'>Edit</button>\
                        <button class='delete'>Delete</button>\
                        <button class='save'>Save</button>\
                        <button class='cancel'>Cancel</button>\
                    </td>\
                </tr>\
                ");
            });
        },

        addtodoitem: function(event) {
            event.preventDefault();

            var addinput = $("#addinput");
            var inputvalue = addinput.val();

            todoitems.push({
                tag: inputvalue,
                done: false
            });
            addinput.val("");
            functions.showtodoitems();
        },

        changeitemstatus: function() {
            todoitems.forEach(function(item) {
                if(item.tag === $(this).text()) {
                    item.done = !item.done;
                }
            }.bind(this));
            functions.showtodoitems();
        },

        edititem: function() {
            var selecteditemoptions = $(this).closest("td");
            var selecteditem = selecteditemoptions.prev();

            selecteditemoptions.find(".edit").hide();
            selecteditemoptions.find(".delete").hide();
            selecteditemoptions.find(".save").show();
            selecteditemoptions.find(".cancel").show();

            // selecteditem.removeClass("todoitem-notdone");
            // selecteditem.removeClass("todoitem-done");

            functions.currenttag = selecteditem.text();

            selecteditem.html("<input type='text' class='editinput' value='" + functions.currenttag + "'>");
        },

        canceledit: function() {
            var selecteditemoptions = $(this).closest("td");
            var selecteditem = selecteditemoptions.prev();

            selecteditemoptions.find(".edit").show();
            selecteditemoptions.find(".delete").show();
            selecteditemoptions.find(".save").hide();
            selecteditemoptions.find(".cancel").hide();

            // selecteditem.addClass("todoitem-notdone");
            selecteditem.html(functions.currenttag);
        },

        saveedit: function() {
            var newtag = $(".editinput").val();

            todoitems.forEach(function(item) {
                if(functions.currenttag === item.tag) {
                    item.tag = newtag;
                }
                functions.currenttag = newtag;
                functions.canceledit.call(this);
            });
        }
    };

    functions.showtodoitems();


    // $(".todoitem-notdone").on("click", functions.changeitemstatus); //stops working when items replaced by showtodoitems
    $("#addform").on("submit", functions.addtodoitem);
    $("table").on("click", ".notdone", functions.changeitemstatus);
    $("table").on("click", ".done", functions.changeitemstatus);
    $("table").on("click", ".edit", functions.edititem);
    $("table").on("click", ".cancel", functions.canceledit);
    $("table").on("click", ".save", functions.saveedit);
});