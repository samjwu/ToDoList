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

            var errmsg = null;

            if(!inputvalue) {
                errmsg = "To Do Item cannot be null";
            }
            else {
                todoitems.forEach(function(item) {
                    if(item.tag === inputvalue) {
                        errmsg = "Cannot have duplicate To Do Items";
                    }
                });
            }

            if(errmsg) {
                functions.showerror(errmsg);
                return;
            }

            todoitems.push({
                tag: inputvalue,
                done: false
            });

            addinput.val(""); //reset input field

            functions.showtodoitems();
        },

        showerror: function(errmsg) {
            // $(".errormsg").html(errmsg).slideDown("slow");
            $(".errormsg").html(errmsg).fadeIn();
            
        },

        removeerror: function() {
            // $(".errormsg").slideUp("slow");
            $(".errormsg").fadeOut();    
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

            //remove class to prevent status onclick event
            functions.currentstatus = selecteditem.attr("class");
            selecteditem.removeClass(functions.currentstatus);

            functions.currenttag = selecteditem.text();
            selecteditem.html("<input type='text' class='editinput' value='" + functions.currenttag + "'>");
        },

        deleteitem: function() {
            var selecteditemtext = $(this).parent("td").prev().text();
            var itemdeleted = false;

            todoitems.forEach(function(item, index) {
                if(!itemdeleted && selecteditemtext === item.tag) {
                    todoitems.splice(index, 1);
                    itemdeleted = true;
                }
            });

            functions.showtodoitems();
        },

        saveedit: function() {
            var newtag = $(".editinput").val();
            var errmsg = null;
            var duplicateitemcount = 0;

            if(!newtag) {
                errmsg = "To Do Item cannot be null";
            }
            else {
                todoitems.forEach(function(item) {
                    if(item.tag === newtag) {
                        duplicateitemcount++;
                    }
                });
            }

            if(duplicateitemcount == 1) {
                errmsg = "Cannot have duplicate To Do Items";
            }

            if(errmsg) {
                functions.showerror(errmsg);
                return;
            }

            todoitems.forEach(function(item) {
                if(functions.currenttag === item.tag) {
                    item.tag = newtag;
                }
            });
            
            functions.currenttag = newtag;
            
            functions.canceledit.call(this);
        },

        canceledit: function() {
            var selecteditemoptions = $(this).closest("td");
            var selecteditem = selecteditemoptions.prev();

            selecteditemoptions.find(".edit").show();
            selecteditemoptions.find(".delete").show();
            selecteditemoptions.find(".save").hide();
            selecteditemoptions.find(".cancel").hide();

            selecteditem.addClass(functions.currentstatus);

            selecteditem.html(functions.currenttag);
        }
    };

    functions.showtodoitems();


    // $(".todoitem-notdone").on("click", functions.changeitemstatus); //stops working when items replaced by showtodoitems
    $("#addform").on("submit", functions.addtodoitem);
    $("#addinput").on("keyup", functions.removeerror);
    $("table").on("click", ".notdone", functions.changeitemstatus);
    $("table").on("click", ".done", functions.changeitemstatus);
    $("table").on("click", ".edit", functions.edititem);
    $("table").on("click", ".delete", functions.deleteitem);
    $("table").on("click", ".save", functions.saveedit);
    $("table").on("click", ".cancel", functions.canceledit);
});