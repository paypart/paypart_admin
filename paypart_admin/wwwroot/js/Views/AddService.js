$(function () {
    function setHeader(xhr) {
        var auth;
        if (sessionStorage.getItem('_token') != null) {
            auth = sessionStorage.getItem('_token');
            xhr.setRequestHeader('Authorization', auth);
            xhr.setRequestHeader('Content-type', "application/json");
        }
    }
    function getBanks() {
        //$.getJSON(baseUrl2() + "Paystack/GetBanks", function (data) {
        //    $("#bankcode option").remove();
        //    $("#bankcode").append(
        //        $("<option></option>")
        //            .text("Select Bank")
        //            .val("0")
        //    );
        //    $.each(data, function (index, item) {
        //        $("#bankcode").append(
        //            $("<option></option>")
        //                .text(item.name)
        //                .val(item.code)
        //        );
        //    });
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "paystack/getBanks",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#bankcode option").remove();
                $("#bankcode").append(
                    $("<option></option>")
                        .text("Select Bank")
                        .val("0")
                );
                $.each(data, function (index, item) {
                    $("#bankcode").append(
                        $("<option></option>")
                            .text(item.name)
                            .val(item.code)
                    );
                });
            }
        });
    };
    function getAccountName() {
        var acctnum = $("#accountnumber").val();
        var id = $("#bankcode").val();
        if (acctnum.length >= 10 && id !== "0") {
            //$.getJSON(baseUrl2() + "Paystack/GetAccountName/" + id + "/" + acctnum, function (data) {
            //    $("#accountname").val("");
            //    $("#accountname").val(data.account_name);
            //});

            $.ajax({
                type: "GET",
                url: baseUrl() + "paystack/getAccountName/" + id + "/" + acctnum,
                beforeSend: setHeader,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $("#accountname").val("");
                    $("#accountname").val(data.account_name);
                }
            });
        }
    };
    function getBillers() {
        //$.getJSON(baseUrl5() + "getallbillers", function (data) {
        //    $("#billerid option").remove();
        //    $("#billerid").append(
        //        $("<option></option>")
        //            .text("Select Biller")
        //            .val(0)
        //    );
        //    $.each(data, function (index, item) {
        //        $("#billerid").append(
        //            $("<option></option>")
        //                .text(item.title)
        //                .val(item.id)
        //        );
        //    });
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "billers/getallbillers",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#billerid option").remove();
                $("#billerid").append(
                    $("<option></option>")
                        .text("Select Biller")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    $("#billerid").append(
                        $("<option></option>")
                            .text(item.title)
                            .val(item.id)
                    );
                });
            }
        });
    };
    function getServiceCategories() {
        //$.getJSON(baseUrl3() + "servicecategory/getallservicecategories", function (data) {
        //    $("#categoryid option").remove();
        //    $("#categoryid").append(
        //        $("<option></option>")
        //            .text("Select Service Category")
        //            .val(0)
        //    );
        //    $.each(data, function (index, item) {
        //        $("#categoryid").append(
        //            $("<option></option>")
        //                .text(item.title)
        //                .val(item.id)
        //        );
        //    });
        //});

        $.ajax({
            type: "GET",
            url: baseUrl() + "servicecategory/getallservicecategories",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#categoryid option").remove();
                $("#categoryid").append(
                    $("<option></option>")
                        .text("Select Service Category")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    $("#categoryid").append(
                        $("<option></option>")
                            .text(item.title)
                            .val(item.id)
                    );
                });
            }
        });
    };
    var service = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: baseUrl() + "service/getallservices",
            cache: false
        }
    });
    service.initialize();

    $('.multi-service-name-tag').tagsinput({
        itemValue: 'id',
        itemText: 'title',
        maxTags: 10,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'service',
            displayKey: 'title',
            source: service.ttAdapter()
        }
    });

    $('.single-service-name-tag').tagsinput({
        itemValue: 'id',
        itemText: 'title',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'service',
            displayKey: 'title',
            source: service.ttAdapter()
        }
    });
    $('.single-service-name-tag').on('itemAdded', function (event) {
        refreshservice();
        $("#hdnServiceId").val(event.item.id);
        $("#hdnServiceAccountId").val(event.item.serviceaccount.id);
        $("#bankcode").val(event.item.serviceaccount.bankcode);
        $("#accountnumber").val(event.item.serviceaccount.accountnumber);
        $("#accountname").val(event.item.serviceaccount.accountname);
        $("#status").val(event.item.serviceaccount.status);
        $("#categoryid").val(event.item.categoryid);
        $("#billerid").val(event.item.billerid);
        $("#title").val(event.item.title); 
    });
    $('.single-service-name-tag').on('itemRemoved', function (event) {
        refreshservice();
    });

    $("#form-new-service").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            "billerid": { requiredBillerService: true },
            "categoryid": { requiredServiceCategory: true },
            "status": { requiredServiceStatus: true },

            "title": "required",
            "serviceaccount.bank": { requiredBank: true },
            "serviceaccount.accountnumber": "required",
            "serviceaccount.accountname": "required",
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        submitHandler: function (form) {
            //alert("start");
            var serviceaccount = {
                id: $("#hdnServiceId").val(),
                serviceid: $("#hdnServiceAccountId").val(),
                bankcode: $("#bankcode").val(),
                bankname: $("#bankcode option:selected").text(),
                accountnumber: $("#accountnumber").val(),
                accountname: $("#accountname").val(),
                status: $("#status").val()
            };

            var service = {
                id: $("#hdnServiceId").val(), 
                categoryid: $("#categoryid").val(),
                billerid: $("#billerid").val(),
                title: $("#title").val(),
                status: $("#status").val(),
                serviceaccount: serviceaccount
            };      

            console.log(service);
            //alert("wait");
            //return;
            //getToken(fee);
            //AddAntiForgeryToken(fee);
            service = JSON.stringify(service);
           $.ajax({
                type: "POST",
                url: baseUrl() + "service/addservice",
                beforeSend: setHeader,
                data: service,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        refreshservice();
                        $('.single-service-name-tag').tagsinput('removeAll');
                        showservice();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Service failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    function baseUrl() {
		//return "http://172.17.0.11:9000/";
        return "http://69.167.186.129:9000/";
        //return "http://localhost:52283/api/service/";
    };
    //function baseUrl2() {
    //    //return "http://35.227.226.230/api/";
    //    return "http://localhost:50658/api/";
    //};
    //function baseUrl5() {
    //    return "http://localhost:59912/api/billers/";
    //};
    //function baseUrl3() {
    //    return "http://localhost:59947/api/";
    //};
    $("#accountname").focusout(function () {
        getAccountName();
    });
    $('#bankcode').change(function () {
        getAccountName();
    });
    getBanks();
    getBillers();
    getServiceCategories();
    $.validator.addMethod("requiredBank", function (val, ele, arg) {
        if ($("#bankcode").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredServiceStatus", function (val, ele, arg) {
        if ($("#status").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredBillerService", function (value, elem, param) {
        if ($("#billerid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredServiceCategory", function (val, ele, arg) {
        if ($("#categoryid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    function refreshservice() {
        $("#hdnServiceId").val("0");
        $("#hdnServiceAccountId").val("0");
        $("#bankcode").val($("#bankcode option:first").val()); 
        $("#accountnumber").val("");
        $("#accountname").val(""); 
        $("#status").val($("#status option:first").val()); 
        $("#categoryid").val($("#categoryid option:first").val()); 
        $("#billerid").val($("#billerid option:first").val()); 
        $("#title").val(""); 

    }
    function showservice() {
        $("#successlbl").html(": Service submitted successfully");
        $('#sucModal').modal('show');
        $('#subModal').modal('hide');
    }
})