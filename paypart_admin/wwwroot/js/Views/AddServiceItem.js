$(function () {
    function setHeader(xhr) {
        var auth;
        if (sessionStorage.getItem('_token') != null) {
            auth = sessionStorage.getItem('_token');
            xhr.setRequestHeader('Authorization', auth);
            xhr.setRequestHeader('Content-type', "application/json");
        }
    }
    $('#ddlServices').change(function () {
        var id = $(this).val();
        if (id > 0) {
            $("#div-content").delay(100).fadeIn(100);
            getCostItems(id);
        }
        else {
            $("#div-content").delay(100).fadeOut(100);
        }
    });
    $('#costitems').click(function () {
        $("#div-add-item").delay(100).fadeIn(100);
        $("#div-add-fields").delay(100).fadeOut(100);
        $("#costitems").addClass("active");
        $("#formitems").removeClass("active");
    });
    $('#formitems').click(function () {
        $("#div-add-item").delay(100).fadeOut(100);
        $("#div-add-fields").delay(100).fadeIn(100);
        $("#costitems").removeClass("active");
        $("#formitems").addClass("active");
    });
    $("#btnAddItem").click(function () {

        if ($("#txtItemName").val() === "") {
            $("#lblItemName").addClass("error-class");
            $("#lblItemName").html("Enter item name");
            return;
        }
        else {
            $("#lblItemName").html("");
        }

        if ($("#txtItemCost").val() === "") {
            $("#lblItemCost").addClass("error-class");
            $("#lblItemCost").html("Enter item cost");
            return;
        }
        else {
            $("#lblItemCost").html("");
        }

        if ($("#ddlPaymandate").val() == 0) {
            $("#lblPaymandate").addClass("error-class");
            $("#lblPaymandate").html("Select mandate");
            return;
        }
        else {
            $("#lblPaymandate").html("");
        }

        if ($("#ddlCurrency").val() == 0) {
            $("#lblCurrency").addClass("error-class");
            $("#lblCurrency").html("Select currency");
            return;
        }
        else {
            $("#lblCurrency").html("");
        }

        var costitem = {
            id: 0,
            serviceid: parseInt($("#ddlServices").val()),
            title: $("#txtItemName").val(),
            cost: parseInt($("#txtItemCost").val()),
            currency: $("#ddlCurrency").val(),
            mandate: $("#ddlPaymandate").val(),
            status: 1
        }

        var costitems = [];
        if (sessionStorage.getItem('_costitems') !== null) {
            costitems = JSON.parse(sessionStorage.getItem('_costitems'));
        }

        for (var i = 0; i < costitems.length; i++) {
            alert(costitems[i].title + " " + $("#txtItemName").val());
            if (costitems[i].title.toLowerCase() === $("#txtItemName").val().toLowerCase()) {
                $("#cautionlbl").html(": Item already exist in list ");
                $('#warnModal').modal('show');
                return;
            }
        }

        var l = costitems.length;
        costitems[l] = costitem;

        var _cidata = [];
        if (sessionStorage.getItem('_cidata') !== null) {
            alert("not null");
            _cidata = JSON.parse(sessionStorage.getItem('_cidata'));
            _cidata[_cidata.length] = costitem;
            sessionStorage.setItem('_cidata', JSON.stringify(_cidata));
            console.log(_cidata);
        }

        sessionStorage.setItem('_costitems', JSON.stringify(costitems));
        $("#txtItemCost").val("");
        $("#txtItemName").val("");
        $("#ddlCurrency").val($("#ddlCurrency option:first").val());
        $("#ddlPaymandate").val($("#ddlPaymandate option:first").val());


        viewcostitems();
    });

    $("#btnAddField").click(function () {

        if ($("#field").val() === "") {
            $("#lblfield").addClass("error-class");
            $("#lblfield").html("Enter field name");
            return;
        }
        else {
            $("#lblfield").html("");
        }

        if ($("#ftype").val() == 0) {
            $("#lblType").addClass("error-class");
            $("#lblType").html("Select field type.");
            return;
        }
        else {
            $("#lblType").html("");
        }

        if ($("#mandate").val() == 0) {
            $("#lblmandate").addClass("error-class");
            $("#lblmandate").html("Select mandate");
            return;
        }
        else {
            $("#lblmandate").html("");
        }

        var formitem = {
            id: 0,
            serviceid: parseInt($("#ddlServices").val()),
            label: $("#field").val(),
            type: parseInt($("#ftype").val()),
            value: $("#value").val(),
            mandate: $("#mandate").val(),
            status: 1
        }

        var formitems = [];
        if (sessionStorage.getItem('_formitems') !== null) {
            formitems = JSON.parse(sessionStorage.getItem('_formitems'));
        }

        for (var i = 0; i < formitems.length; i++) {
            alert(formitems[i].label + " " + $("#field").val());
            if (formitems[i].label.toLowerCase() === $("#field").val().toLowerCase()) {
                $("#cautionlbl").html(": Item already exist in list ");
                $('#warnModal').modal('show');
                return;
            }
        }

        var l = formitems.length;
        formitems[l] = formitem;

        sessionStorage.setItem('_formitems', JSON.stringify(formitems));
        $("#field").val("");
        $("#value").val("");
        $("#ftype").val($("#ftype option:first").val());
        $("#mandate").val($("#mandate option:first").val());

        viewformitems();
    });

    function viewcostitems() {
        var _costitems = new Array();
        $("#tblCostItems > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('_costitems') !== null) {
            _costitems = JSON.parse(sessionStorage.getItem('_costitems'));

            for (var i = 0; i < _costitems.length; i++) {
                var btnid = "btn" + i;
                var mandate;
                $('#ddlPaymandate option').each(function () {
                    if ($(this).val() == _costitems[i].mandate) {
                        mandate = $(this).text();
                        return;
                    }
                });

                $("#tblCostItems tbody").append(
                    "<tr><td>" + _costitems[i].title + '</td><td>' + _costitems[i].currency + _costitems[i].cost + '</td><td>' + mandate + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteCostItem(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_costitems.length > 0) {
                $("#div-item-list").delay(100).fadeIn(100);
            }
        }
    };

    function viewformitems() {
        var _formitems = new Array();
        $("#tblFormItems > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('_formitems') !== null) {
            _formitems = JSON.parse(sessionStorage.getItem('_formitems'));

            for (var i = 0; i < _formitems.length; i++) {
                var btnid = "btn" + i;
                var mandate;
                var ftype;

                $('#mandate option').each(function () {
                    if ($(this).val() == _formitems[i].mandate) {
                        mandate = $(this).text();
                        return;
                    }
                });

                $('#ftype option').each(function () {
                    if ($(this).val() == _formitems[i].mandate) {
                        ftype = $(this).text();
                        return;
                    }
                });

                $("#tblFormItems tbody").append(
                    "<tr><td>" + _formitems[i].label + '</td><td>' + _formitems[i].value + '</td><td>' + ftype + '</td><td>' + mandate + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteFormItem(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_formitems.length > 0) {
                $("#div-item-form").delay(100).fadeIn(100);
            }
        }
    };
    function getServices() {
        //$.getJSON(baseUrl() + "getallservices", function (data) {
        //    $("#ddlServices option").remove();
        //    $("#ddlServices").append(
        //        $("<option></option>")
        //            .text("Select Service")
        //            .val(0)
        //    );
        //    $.each(data, function (index, item) {
        //        $("#ddlServices").append(
        //            $("<option></option>")
        //                .text(item.title)
        //                .val(item.id)
        //        );
        //    });
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "service/getallservices",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#ddlServices option").remove();
                $("#ddlServices").append(
                    $("<option></option>")
                        .text("Select Service")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    $("#ddlServices").append(
                        $("<option></option>")
                            .text(item.title)
                            .val(item.id)
                    );
                });
            }
        });
    };
    function getCostItems(serviceid) {
        $.getJSON(baseUrl2() + "costitem/getcostItems/" + serviceid, function (data) {
            if (sessionStorage.getItem('_costitems') !== null) {
                sessionStorage.removeItem('_costitems')
            }
            if (sessionStorage.getItem('_cidata') !== null) {
                sessionStorage.removeItem('_cidata')
            }
            console.log(data);
            sessionStorage.setItem('_cidata', JSON.stringify(data));
            sessionStorage.setItem('_costitems', JSON.stringify(data));
            viewcostitems();
        });
    };
    $("#form-new-service-items").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            itemtables: { requiredTableItems: true },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        submitHandler: function (form) {
            var costItems;

            if (sessionStorage.getItem('_cidata') != null) {
                alert("final cidata");
                costItems = sessionStorage.getItem('_cidata');
            }
            else
            {
                alert("final costitems");
                if (sessionStorage.getItem('_costitems') != null) {
                    costItems = sessionStorage.getItem('_costitems');
                }
                else {
                    $("#cautionlbl").html(": Add Cost Item(s) to proceed.");
                    $('#warnModal').modal('show');
                    return;
                };
            }
            console.log(costItems);

            //getToken(fee);
            //AddAntiForgeryToken(fee);

            $.ajax({
                type: "POST",
                url: baseUrl2() + "costitem/addcostItems",
                beforeSend: setHeader,
                data: costItems,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        refreshcostitem();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Cost Item failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    $("#form-new-service-forms").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            tblFormItems: { requiredTableForms: true },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        submitHandler: function (form) {
            var formItems;
            if (sessionStorage.getItem('_formitems') != null) {
                formItems = sessionStorage.getItem('_formitems');
            }
            else {
                $("#cautionlbl").html(": Add Form Item(s) to proceed.");
                $('#warnModal').modal('show');
                return;
            };

            console.log(formItems);
            //getToken(fee);
            //AddAntiForgeryToken(fee);

            $.ajax({
                type: "POST",
                url: baseUrl2() + "formitem/addformItems",
                beforeSend: setHeader,
                data: formItems,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $('#subModal').modal('show');
                    console.log(data);
                    if (data != null) {
                        refreshformitem();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Form Items failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });

    $.validator.addMethod("requiredTableItems", function (val, ele, arg) {
        if (sessionStorage.getItem('_costitems') !== null) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredTableForms", function (val, ele, arg) {
        if (sessionStorage.getItem('_formitems') !== null) { return false; }
        return true;
    }, 'This Field is required.');

    function refreshcostitem() {
        alert("show");
        $("#successlbl").html(": Cost Items submitted successfully");
        $("#lblItemList > tbody > tr:nth-child(n+2)").remove();
        $("#div-item-list").delay(100).fadeOut(100);
        $('#sucModal').modal('show');
        sessionStorage.removeItem('_costitems');
        sessionStorage.removeItem('_cidata');
        $('#subModal').modal('hide');
    }
    function refreshformitem() {
        alert("show");
        $("#successlbl").html(": Form Items submitted successfully");
        $("#tblFormItems > tbody > tr:nth-child(n+2)").remove();
        $("#div-item-form").delay(100).fadeOut(100);
        $('#sucModal').modal('show');
        sessionStorage.removeItem('_formitems');
        $('#subModal').modal('hide');
    }
    function baseUrl() {
		//return "http://172.17.0.11:9000/";
        return "http://69.167.186.129:9000/";
        //return "http://localhost:52283/api/service/";
    };
    //function baseUrl2() {
    //    return "http://localhost:50857/api/";
    //};
    getServices();
});




function deleteFormItem(value) {
    if (sessionStorage.getItem('_formitems') != null) {
        var _formitems = JSON.parse(sessionStorage.getItem('_formitems'));

        if (value > -1) {
            _formitems.splice(value, 1);
        }

        sessionStorage.setItem('_formitems', JSON.stringify(_formitems));

        $("#tblFormItems > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('_formitems') != null) {
            _formitems = JSON.parse(sessionStorage.getItem('_formitems'));

            for (var i = 0; i < _formitems.length; i++) {
                var btnid = "btn" + i;
                var mandate;
                var ftype;

                $('#mandate option').each(function () {
                    if ($(this).val() == _formitems[i].mandate) {
                        mandate = $(this).text();
                        return;
                    }
                });

                $('#ftype option').each(function () {
                    if ($(this).val() == _formitems[i].mandate) {
                        ftype = $(this).text();
                        return;
                    }
                });
                $("#tblFormItems tbody").append(
                    "<tr><td>" + _formitems[i].label + '</td><td>' + _formitems[i].value + '</td><td>' + ftype + '</td><td>' + mandate + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteFormItem(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_formitems.length > 0) {
                $("#div-item-form").delay(100).fadeIn(100);
            }
        }
    }
};

function deleteCostItem(value) {
    if (sessionStorage.getItem('_costitems') != null) {
        var _costitems = JSON.parse(sessionStorage.getItem('_costitems'));
        var _cidata = [];

        if (sessionStorage.getItem('_cidata') !== null) {
            _cidata = JSON.parse(sessionStorage.getItem('_cidata'));
            _cidata[value].status = 2;
            sessionStorage.setItem('_cidata', JSON.stringify(_cidata));
            console.log(_cidata);
        }


        if (value > -1) {
            _costitems.splice(value, 1);
        }

        sessionStorage.setItem('_costitems', JSON.stringify(_costitems));

        $("#tblCostItems > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('_costitems') != null) {
            _costitems = JSON.parse(sessionStorage.getItem('_costitems'));

            for (var i = 0; i < _costitems.length; i++) {
                var btnid = "btn" + i;
                var mandate;

                $('#ddlPaymandate option').each(function () {
                    if ($(this).val() == _costitems[i].mandate) {
                        mandate = $(this).text();
                        return;
                    }
                });

                $("#tblCostItems tbody").append(
                    "<tr><td>" + _costitems[i].title + '</td><td>' + _costitems[i].currency + _costitems[i].cost + '</td><td>' + mandate + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteCostItem(' + i + ');" class="btn btn-link">Remove</button></td></tr>')

            }
            if (_costitems.length > 0) {
                $("#div-item-cost").delay(100).fadeIn(100);
            }
        }
    }
};
