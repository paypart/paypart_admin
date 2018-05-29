$(function () {
    function setHeader(xhr) {
        var auth;
        if (sessionStorage.getItem('_token') != null) {
            auth = sessionStorage.getItem('_token');
            xhr.setRequestHeader('Authorization', auth);
            xhr.setRequestHeader('Content-type', "application/json");
        }
    }
    function getBillerCategories() {
        //$.getJSON(baseUrl3() + "billercategory/getallbillercategories", function (data) {
        //    $("#category_id option").remove();
        //    $("#category_id").append(
        //        $("<option></option>")
        //            .text("Select Biller Category")
        //            .val(0)
        //    );
        //    $.each(data, function (index, item) {
        //        $("#category_id").append(
        //            $("<option></option>")
        //                .text(item.title)
        //                .val(item._id)
        //        );
        //    });
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "billercategory/getallbillercategories",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#category_id option").remove();
                $("#category_id").append(
                    $("<option></option>")
                        .text("Select Biller Category")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    $("#category_id").append(
                        $("<option></option>")
                            .text(item.title)
                            .val(item._id)
                    );
                });
            }
        });
    };
    function getCountries() {
        //$.getJSON(baseUrl4() + "Country/GetAllCountries", function (data) {
        //    $("#countryid option").remove();
        //    $("#countryid").append(
        //        $("<option></option>")
        //            .text("Select Country")
        //            .val(0)
        //    );
        //    $.each(data, function (index, item) {
        //        $("#countryid").append(
        //            $("<option></option>")
        //                .text(item.title)
        //                .val(item.id)
        //        );
        //    });
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "country/getAllCountries",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#countryid option").remove();
                $("#countryid").append(
                    $("<option></option>")
                        .text("Select Country")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    $("#countryid").append(
                        $("<option></option>")
                            .text(item.title)
                            .val(item.id)
                    );
                });
            }
        });
    };
    function getStatesByCountryId(id, stateid) {
        //$.getJSON(baseUrl4() + "State/GetStatesByCountryId/" + id, function (data) {
        //    $("#stateid option").remove();
        //    $("#stateid").append(
        //        $("<option></option>")
        //            .text("Select State")
        //            .val(0)
        //    );
        //    $.each(data, function (index, item) {
        //        $("#stateid").append(
        //            $("<option></option>")
        //                .text(item.title)
        //                .val(item.id)
        //        );
        //    });
        //    $("#stateid").val(stateid);
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "state/getStatesByCountryId/" + id,
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#stateid option").remove();
                $("#stateid").append(
                    $("<option></option>")
                        .text("Select State")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    $("#stateid").append(
                        $("<option></option>")
                            .text(item.title)
                            .val(item.id)
                    );
                });
                $("#stateid").val(stateid);
            }
        });
    };
    //function getBanks() {
    //    $.getJSON(baseUrl2() + "Paystack/GetBanks", function (data) {
    //        $("#ddlBank option").remove();
    //        $("#ddlBank").append(
    //            $("<option></option>")
    //                .text("Select Bank")
    //                .val("0")
    //        );
    //        $.each(data, function (index, item) {
    //            $("#ddlBank").append(
    //                $("<option></option>")
    //                    .text(item.name)
    //                    .val(item.code)
    //            );
    //        });
    //    });

    //    $.ajax({
    //        type: "GET",
    //        url: baseUrl() + "paystack/getBanks",
    //        beforeSend: setHeader,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            $("#stateid option").remove();
    //            $("#stateid").append(
    //                $("<option></option>")
    //                    .text("Select State")
    //                    .val(0)
    //            );
    //            $.each(data, function (index, item) {
    //                $("#stateid").append(
    //                    $("<option></option>")
    //                        .text(item.title)
    //                        .val(item.id)
    //                );
    //            });
    //            $("#stateid").val(stateid);
    //        }
    //    });
    //};
    //function getAccountName() {
    //    var acctnum = $("#txtAcctNum").val();
    //    var id = $("#ddlBank").val();
    //    if (acctnum.length >= 10 && id !== "0") {
    //        $.getJSON(baseUrl2() + "Paystack/GetAccountName/" + id + "/" + acctnum, function (data) {
    //            $("#txtAcctName").val("");
    //            $("#txtAcctName").val(data.account_name);
    //        });
    //    }
    //};
    var billers = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //prefetch: {
        //    url: baseUrl() + "billers/getallbillers",
        //    cache: false
        //}
        remote: {
            url: baseUrl() + 'billers/getallbillers',
            prepare: function (query, settings) {
                settings.url = settings.url
                settings.headers = {
                    "Authorization": (sessionStorage.getItem('_token') != null) ? sessionStorage.getItem('_token') : ""
                };
                return settings;
            }
        }
    });
    billers.initialize();

    $('.multi-biller-name-tag').tagsinput({
        itemValue: 'id',
        itemText: 'title',
        maxTags: 10,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'billers',
            displayKey: 'title',
            source: billers.ttAdapter()
        }
    });

    $('.single-biller-name-tag').tagsinput({
        itemValue: 'id',
        itemText: 'title',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'billers',
            displayKey: 'title',
            source: billers.ttAdapter()
        }
    });

    $("#form-new-biller").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            "category_id": { requiredType: true },
            "title": "required",
            "billercontact.street": "required",
            "billercontact.email": "required",
            "billercontact.phone": "required",
            "billercontact.city": "required",
            "billercontact.countryid": { requiredCountry: true },
            "billercontact.stateid": { requiredState: true },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        submitHandler: function (form) {
            var billercontact = {
                id: $("#hdnBillerContactId").val(),
                billerid: $("#hdnBillerId").val(),
                street: $("#street").val(),
                city: $("#city").val(),
                stateid: $("#stateid").val(),
                countryid: $("#countryid").val(),
                postcode: $("#postcode").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                emailaux: $("#emailaux").val(),
                phoneaux: $("#phoneaux").val(),
            };
            var biller = {
                id: $("#hdnBillerId").val(),
                title: $("#title").val(),
                logo: $("#logo").val(),
                category_id: $("#category_id").val(),
                billercontact: billercontact
            };
            console.log(biller);
            //getToken(fee);
            //AddAntiForgeryToken(fee);
            biller = JSON.stringify(biller);
            $.ajax({
                type: "POST",
                url: baseUrl() + "billers/addbiller",
                beforeSend: setHeader,
                data: biller,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        refreshbiller();
                        $('.single-biller-name-tag').tagsinput('removeAll');
                        showbiller();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Admin failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    function refreshbiller() {
        $("#hdnBillerId").val("0");
        $("#hdnBillerContactId").val("0");

        $("#stateid").val($("#stateid option:first").val());
        $("#countryid").val($("#countryid option:first").val());
        $("#category_id").val($("#category_id option:first").val());

        $("#title").val("");
        $("#street").val("");
        $("#city").val("");
        $("#postcode").val("");
        $("#email").val("");
        $("#phone").val("");
        $("#phone").val("");
        $("#emailaux").val("");
        $("#phoneaux").val("");
        $("#logo").val("");

    };
    function showbiller() {
        $("#successlbl").html(": Biller submitted successfully");
        $('#sucModal').modal('show');
        $('#subModal').modal('hide');
    };
    $('.single-biller-name-tag').on('itemAdded', function (event) {
        refreshbiller();
        $("#hdnBillerId").val(event.item.id);
        $("#hdnBillerContactId").val(event.item.billercontact.id);

        $("#countryid").val(event.item.billercontact.countryid);
        $("#category_id").val(event.item.category_id);

        $("#title").val(event.item.title);
        $("#street").val(event.item.billercontact.street);
        $("#city").val(event.item.billercontact.city);
        $("#postcode").val(event.item.billercontact.postcode);
        $("#email").val(event.item.billercontact.email);
        $("#phone").val(event.item.billercontact.phone);
        $("#emailaux").val(event.item.billercontact.emailaux);
        $("#phoneaux").val(event.item.billercontact.phoneaux);
        getStatesByCountryId(event.item.billercontact.countryid, event.item.billercontact.stateid);
    });
    function baseUrl() {
		//return "http://172.17.0.11:9000/";
        return "http://69.167.186.129:9000/";
        //return "http://35.190.28.102/api/";
    };
    function baseUrl2() {
        return "http://35.227.226.230/api/";
    };
    function baseUrl3() {
        return "http://localhost:59947/api/";
    };
    function baseUrl4() {
        return "http://localhost:60967/api/";
    };
    function baseUrl5() {
        return "http://localhost:59912/api/";
    };
    //$("#txtAcctNum").focusout(function () {
    //    getAccountName();
    //});
    //$('#ddlBank').change(function () {
    //    getAccountName();
    //});
    $('#countryid').change(function () {
        var id = $(this).val();
        getStatesByCountryId(id, 0);
    });
    getBillerCategories();
    getCountries();
    //getBanks();
    $.validator.addMethod("requiredType", function (val, ele, arg) {
        if ($("#category_id").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredCountry", function (val, ele, arg) {
        if ($("#countryid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredState", function (val, ele, arg) {
        if ($("#stateid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
});