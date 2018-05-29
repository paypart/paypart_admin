$(function () {
    function setHeader(xhr) {
        var h_value;
        if (sessionStorage.getItem('h_value') != null) {
            h_value = sessionStorage.getItem('h_value');
            xhr.setRequestHeader('HVal', h_value);
            sessionStorage.removeItem('h_value');
        }
    }
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
        //submitHandler: function (form) {
        //    $('#subModal').modal('show');
        //    var data;
        //    if (sessionStorage.getItem('data') != null) {
        //        data = JSON.parse(sessionStorage.getItem('data'));
        //    }
        //    var filesList = $('#fileOrgLogo').get(0).files;
        //    var organization = {
        //        Id: (data != null) ? data.Id : 0,
        //        Typeid: parseInt($("#ddlType").val()),
        //        Name: $("#txtOrgName").val(),
        //        Logo: (filesList.length > 0) ? filesList[0].name : "",
        //        Status: 1,
        //        Address: [{
        //            Id: (data != null) ? data.Address[0].Id : 0,
        //            Orgid: (data != null) ? data.Address[0].Orgid : 0,
        //            Street: $("#txtOrgAddress").val(),
        //            City: $("#txtOrgCity").val(),
        //            Stateid: parseInt($("#ddlStates").val()),
        //            Countryid: parseInt($("#ddlCountry").val()),
        //            Postcode: $("#txtOrgPostCode").val(),
        //            Status: 1
        //        }],
        //        Phone: [{
        //            Id: (data != null) ? data.Phone[0].Id : 0,
        //            Orgid: (data != null) ? data.Phone[0].Orgid : 0,
        //            Phonenumber: $("#txtOrgPhone").val(),
        //            Status: 1
        //        },
        //        {
        //            Id: (data != null && data.Phone.length > 1) ? data.Phone[1].Id : 0,
        //            Orgid: (data != null && data.Phone.length > 1) ? data.Phone[1].Orgid : 0,
        //            Phonenumber: $("#txtOrgAltPhone").val(),
        //            Status: 1
        //        }],
        //        Email: [{
        //            Id: (data != null) ? data.Email[0].Id : 0,
        //            Orgid: (data != null) ? data.Email[0].Orgid : 0,
        //            Emailaddress: $("#txtOrgEmail").val(),
        //            Status: 1
        //        },
        //        {
        //            Id: (data != null && data.Email.length > 1) ? data.Email[1].Id : 0,
        //            Orgid: (data != null && data.Email.length > 1) ? data.Email[1].Orgid : 0,
        //            Emailaddress: $("#txtOrgAltEmail").val(),
        //            Status: 1
        //        }],
        //        Account: [{
        //            Id: (data != null) ? data.Account[0].Id : 0,
        //            Orgid: (data != null) ? data.Account[0].Orgid : 0,
        //            Bankcode: $("#ddlBank").val(),
        //            Bankname: $("#ddlBank option:selected").text(),
        //            Accountnumber: $("#txtAcctNum").val(),
        //            Accountname: $("#txtAcctName").val(),
        //            Accountref: "",
        //            Status: 1
        //        }]
        //    }

        //    organization = JSON.stringify(organization);
        //    console.log(organization);
        //    getToken(organization);
        //    AddAntiForgeryToken(organization);
        //    UploadFiles($("#txtOrgName").val());

        //    $.ajax({
        //        type: "POST",
        //        url: baseAddress() + "saveOrg",
        //        beforeSend: setHeader,
        //        data: organization,
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (data) {
        //            if (data != null) {
        //                resetOrgForm();
        //                sessionStorage.setItem('show-new-org', "true");
        //                location.reload();
        //                console.log(data);
        //            }
        //        },
        //        failure: function (errMsg) {
        //            $('#subModal').modal('hide');
        //            $("#failurelbl").html(": Organization failed to submit");
        //            $('#failModal').modal('show');
        //            console.log(errMsg);
        //        }
        //    });
        //}

    });
    $("#form-new-admin").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            role_id: { requiredRole: true },
            username: {
                required: true
                //remote: {
                //    url: baseAddress2() + "checkadminuname" + $("#txtAdminUName").val(),
                //    data: { Id: function () { return (sessionStorage.getItem('admindata') != null) ? JSON.parse(sessionStorage.getItem('admindata')).Id : 0 } },
                //    async: false
                //}
            },
            email: "required",
            billerid: { requiredBiller: true },
        },
        messages: {
            username: {
                required: "This field is required.",
                remote: "Username already exists."
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
    });
    $("#form-new-biller-category").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            status: { requiredBCStatus: true },
            
            title: "required",
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        }
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
        }
    });
    $("#form-new-service-category").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            status: { requiredSCStatus: true },

            title: "required",
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        }
    });
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
            //alert("submit handler!");
            var costItems;
            if (sessionStorage.getItem('_costitems') != null) {
                costItems = sessionStorage.getItem('_costitems');
            }
            else {
                $("#cautionlbl").html(": Add Cost Items to proceed.");
                $('#warnModal').modal('show');
                return;
            };
            
            console.log(costItems);
            //getToken(fee);
            //AddAntiForgeryToken(fee);

            $.ajax({
                type: "POST",
                url: baseAddress() + "saveFee",
                beforeSend: setHeader,
                data: costItems,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        resetFeeForm();

                        sessionStorage.setItem('show-new-fee', "true");
                        location.reload();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Fees failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    $("#form-new-fee").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            txtClassItem: { areTagsAdded: true },
            ddlTermSuffixItem: { requiredTermSuffix: true },
        },
        messages: {
            txtClassItem: {
                required: "You must add at least one class to proceed!",
            },
            ddlTermSuffixItem: {
                required: "This field is required.",
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "txtClassItem") {
                error.appendTo('#lblClassItem');
            }
            if (element.attr("name") == "ddlTermSuffixItem") {
                error.appendTo('#lblTermSuffixItem');
            }
        },
        submitHandler: function (form) {
            $('#subModal').modal('show');
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var classes = [];
            var _classes = [];
            classes = $("#txtClassItem").tagsinput('items');
            for (var i = 0; i < classes.length; i++) {
                var _class = {
                    Id: classes[i].Id,
                    Orgid: authdata.orgid,
                    Name: classes[i].Name,
                    Status: 1,
                    message: null
                }
                _classes.push(_class);
            };

            var feeItems = [];
            if (sessionStorage.getItem('_fees') != null) {
                feeItems = JSON.parse(sessionStorage.getItem('_fees'));
                if (feeItems.length <= 0) {
                    $("#cautionlbl").html(": Add Fee Items to proceed.");
                    $('#warnModal').modal('show');
                    return;
                }
            }
            else {
                $("#cautionlbl").html(": Add Fee Items to proceed.");
                $('#warnModal').modal('show');
                return;
            };
            var fee = {
                Id: 0,
                Orgid: authdata.orgid,
                Termid: parseInt($("#ddlTermSuffixItem").val()),
                Classid: 0,
                Item: null,
                Curid: null,
                Cost: 0,
                Status: 1,
                Ispaid: false,
                Class: _classes,
                FeeItems: feeItems
            };

            fee = JSON.stringify(fee);
            console.log(fee);
            getToken(fee);
            AddAntiForgeryToken(fee);

            $.ajax({
                type: "POST",
                url: baseAddress() + "saveFee",
                beforeSend: setHeader,
                data: fee,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        resetFeeForm();

                        sessionStorage.setItem('show-new-fee', "true");
                        location.reload();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Fees failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    $("#form-manage-fee").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {

        },
        messages: {

        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorPlacement: function (error, element) {

        },
        submitHandler: function (form) {
            $('#subModal').modal('show');
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }
            var fees = [];
            var feeItems = [];
            if (sessionStorage.getItem('e_fees') != null) {
                feeItems = JSON.parse(sessionStorage.getItem('e_fees'));
            }
            else {
                return;
            };
            var feedata = [];
            if (sessionStorage.getItem('feedata') != null) {
                feedata = JSON.parse(sessionStorage.getItem('feedata'));
                if (feedata.length > 0) {
                    $.each(feedata, function (index, item) {
                        var exists = false;
                        for (var i = 0; i < feeItems.length; i++) {
                            if (feeItems[i].item == item.Item) {
                                exists = true;
                                break;
                            }
                        }
                        if (!exists) {
                            var feeItem = {
                                item: item.Item,
                                cost: item.Cost,
                                currency: item.Curid
                            }
                            var fee = {
                                Id: item.Id,
                                Orgid: authdata.orgid,
                                Termid: item.Termid,
                                Classid: item.Classid,
                                Item: item.Item,
                                Curid: item.Curid,
                                Cost: parseFloat(item.Cost),
                                Status: item.Status,
                                Ispaid: false,
                                Class: null,
                                FeeItems: null
                            };
                            fees[fees.length] = fee;
                        }
                    });
                }
            }
            if (feeItems.length > 0) {
                $.each(feeItems, function (index, item) {
                    var exists = false;
                    var classid = 0;
                    var termid = 0;
                    for (var i = 0; i < feedata.length; i++) {
                        classid = feedata[i].Classid;
                        termid = feedata[i].Termid;
                        if (feedata[i].Item == item.item) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        var feeItem = {
                            item: item.item,
                            cost: item.cost,
                            currency: item.currency
                        }
                        var fee = {
                            Id: 0,
                            Orgid: authdata.orgid,
                            Termid: termid,
                            Classid: classid,
                            Item: item.item,
                            Curid: item.currency,
                            Cost: parseFloat(item.cost),
                            Status: 1,
                            Ispaid: false,
                            Class: null,
                            FeeItems: null
                        };
                        fees[fees.length] = fee;
                    }
                });
            }
            fees = JSON.stringify(fees);
            console.log(fees);
            getToken(fees);
            AddAntiForgeryToken(fees);

            $.ajax({
                type: "POST",
                url: baseAddress() + "updateFee",
                beforeSend: setHeader,
                data: fees,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        resetEditFeeForm();
                        console.log(data);
                        $('#subModal').modal('hide');
                        $("#successlbl").html(": Fees submitted successfully");
                        $('#sucModal').modal('show');
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Fees failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    $("#form-new-class").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            txtClassPrefix: {
                required: true
            },
            txtClassNumber: {
                required: true
            },
        },
        messages: {
            txtClassPrefix: {
                required: "This field is required.",
            },
            txtClassNumber: {
                required: "This field is required.",
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "txtClassPrefix") {
                error.appendTo('#lblClassPrefix');
            }
            if (element.attr("name") == "txtClassNumber") {
                error.appendTo('#lblClassNumber');
            }
        },
        submitHandler: function (form) {
            $('#subModal').modal('show');
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var _class = {
                Id: 0,
                Orgid: authdata.orgid,
                Name: $("#txtClassPrefix").val().trim() + " " + $("#txtClassNumber").val().trim(),
                Status: 1,
                message: null
            }

            _class = JSON.stringify(_class);
            console.log(_class);
            getToken(_class);
            AddAntiForgeryToken(_class);
            saveClass(_class);

        }
    });
    $("#form-edit-class").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            txtClassEditPrefix: {
                required: true
            },
            txtClassEditNumber: {
                required: true
            },
        },
        messages: {
            txtClassEditPrefix: {
                required: "This field is required.",
            },
            txtClassEditNumber: {
                required: "This field is required.",
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "txtClassEditPrefix") {
                error.appendTo('#lblClassEditPrefix');
            }
            if (element.attr("name") == "txtClassEditNumber") {
                error.appendTo('#lblClassEditNumber');
            }
        },
        submitHandler: function (form) {
            $('#subModal').modal('show');
            var e_class = $('#btnEditClass').data('key');

            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var _class = {
                Id: e_class.id,
                Orgid: authdata.orgid,
                Name: $("#txtClassEditPrefix").val().trim() + " " + $("#txtClassEditNumber").val().trim(),
                Status: 1,
                message: null
            }

            _class = JSON.stringify(_class);
            console.log(_class);
            getToken(_class);
            AddAntiForgeryToken(_class);
            saveClass(_class);
        }
    });
    $("#form-new-term").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            ddlTermItem: {
                requiredTerm: true
            },
            txtTermSuffix: {
                required: true
            },
            txtTermStart: {
                required: true
            },
            txtTermEnds: {
                required: true
            },
        },
        messages: {
            ddlTermItem: {
                required: "This field is required.",
            },
            txtTermSuffix: {
                required: "This field is required.",
            },
            txtTermStart: {
                required: "This field is required.",
            },
            txtTermEnds: {
                required: "This field is required.",
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "ddlTermItem") {
                error.appendTo('#lblTermItem');
            }
            if (element.attr("name") == "txtTermSuffix") {
                error.appendTo('#lblTermSuffix');
            }
            if (element.attr("name") == "txtTermStart") {
                error.appendTo('#lblTermStart');
            }
            if (element.attr("name") == "txtTermEnds") {
                error.appendTo('#lblTermEnds');
            }
        },
        submitHandler: function (form) {
            $('#subModal').modal('show');
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var term = {
                Id: 0,
                Orgid: authdata.orgid,
                Name: $("#ddlTermItem option:selected").text().trim() + " " + $("#txtTermSuffix").val().trim(),
                Startdate: $("#txtTermStart").val().trim(),
                Enddate: $("#txtTermEnds").val().trim(),
                Status: 1,
                message: null
            }

            term = JSON.stringify(term);
            console.log(term);
            getToken(term);
            AddAntiForgeryToken(term);
            saveTerm(term);
        }
    });
    $("#form-edit-term").validate({
        errorClass: "error-class",
        validClass: "valid-class",
        ignore: "",
        rules: {
            ddlTermEditItem: {
                requiredEditTerm: true
            },
            txtTermEditSuffix: {
                required: true
            },
            txtTermEditStart: {
                required: true
            },
            txtTermEditEnds: {
                required: true
            },
        },
        messages: {
            ddlTermEditItem: {
                required: "This field is required.",
            },
            txtTermEditSuffix: {
                required: "This field is required.",
            },
            txtTermEditStart: {
                required: "This field is required.",
            },
            txtTermEditEnds: {
                required: "This field is required.",
            },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "ddlTermEditItem") {
                error.appendTo('#lblTermEditItem');
            }
            if (element.attr("name") == "txtTermEditSuffix") {
                error.appendTo('#lblTermEditSuffix');
            }
            if (element.attr("name") == "txtTermEditStart") {
                error.appendTo('#lblTermEditStart');
            }
            if (element.attr("name") == "txtTermEditEnds") {
                error.appendTo('#lblTermEditEnds');
            }
        },
        submitHandler: function (form) {
            $('#subModal').modal('show');
            var e_term = $('#btnEditTerm').data('key');
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var term = {
                Id: e_term.id,
                Orgid: authdata.orgid,
                Name: $("#ddlTermEditItem option:selected").text().trim() + " " + $("#txtTermEditSuffix").val().trim(),
                Startdate: $("#txtTermEditStart").val().trim(),
                Enddate: $("#txtTermEditEnds").val().trim(),
                Status: 1,
                message: null
            }

            term = JSON.stringify(term);
            console.log(term);
            getToken(term);
            AddAntiForgeryToken(term);
            saveTerm(term);
        }
    });
    function saveClass(_class) {
        $.ajax({
            type: "POST",
            url: baseAddress() + "saveClass",
            beforeSend: setHeader,
            data: _class,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    if (data.message.includes("success")) {
                        $('#subModal').modal('hide');
                        if (data.message.includes("update")) {
                            resetClassEditForm();
                            $('#editClassModal').modal('hide');
                            sessionStorage.setItem('show-manage-class', "true");
                            location.reload();
                        }
                        if (data.message.includes("save")) {
                            resetClassForm();
                            sessionStorage.setItem('show-new-class', "true");
                            location.reload();
                        }
                    }
                    if (data.message.includes("duplicate")) {
                        $('#subModal').modal('hide');
                        if (data.message.includes("update")) {
                            $('#editClassModal').modal('hide');
                        }
                        $("#failurelbl").html(": This class already exist for organization");
                        $('#failModal').modal('show');
                    }
                }
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    };
    function saveTerm(term) {
        $.ajax({
            type: "POST",
            url: baseAddress() + "saveTerm",
            beforeSend: setHeader,
            data: term,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    if (data.message.includes("success")) {
                        $('#subModal').modal('hide');
                        if (data.message.includes("update")) {
                            resetTermEditForm();
                            $('#editTermModal').modal('hide');
                            sessionStorage.setItem('show-manage-term', "true");
                            location.reload();
                        }
                        if (data.message.includes("save")) {
                            resetTermForm();

                            sessionStorage.setItem('show-new-term', "true");
                            location.reload();
                        }
                    }
                    if (data.message.includes("duplicate")) {
                        $('#subModal').modal('hide');
                        if (data.message.includes("update")) {
                            $('#editTermModal').modal('hide');
                        }
                        $("#failurelbl").html(": This term already exist for organization");
                        $('#failModal').modal('show');
                    }
                }
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    }
    function UploadFiles(pname) {
        var files = $("#fileOrgLogo").get(0).files;

        console.log(files);

        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();

                for (var i = 0; i < files.length; i++) {
                    data.append("UploadedFiles" + i, files[i]);
                }

                $.ajax({
                    type: "POST",
                    url: baseAddress() + 'UploadFiles?id=' + pname,
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        console.log(result);
                    },
                    error: function (xhr, status, p3, p4) {
                        var err = "Error " + " " + status + " " + p3 + " " + p4;
                        if (xhr.responseText && xhr.responseText[0] == "{")
                            err = JSON.parse(xhr.responseText).Message;
                        console.log(err);
                    }
                });
            } else {
                alert("This browser doesn't support HTML5 file uploads!");
            }
        }
    };
    function resetOrgForm() {
        $("#txtSearchOrgs").tagsinput("removeAll");
        $("#txtOrgName").val("");
        $("#fileOrgLogo").val("");
        $("#txtOrgAddress").val("");
        $("#txtOrgCity").val("");
        $("#txtOrgPostCode").val("");
        $("#txtOrgEmail").val("")
        $("#txtOrgAltEmail").val("")
        $("#txtOrgPhone").val("");
        $("#txtAcctName").val("")
        $("#txtAcctNum").val("");
        $("#txtOrgAltPhone").val("");
        $("#ddlBank").val($("#ddlBank option:first").val());
        $("#ddlType").val($("#ddlType option:first").val());
        $("#ddlStates").val($("#ddlStates option:first").val());
        $("#ddlCountry").val($("#ddlCountry option:first").val());
    }
    function resetFeeForm() {
        $("#ddlTermSuffixItem").val($("#ddlTermSuffixItem option:first").val());
        $("#txtClassItem").tagsinput("removeAll");
        //$("#txtTermStart").val("");
        //$("#txtTermEnds").val("");
        //$("#txtClassPrefix").val("");
        //$("#txtTermSuffix").val("");
        //$("#div-check-class input[name='check_classes']").each(function () {
        //    $(this).prop('checked', false);
        //});
        //$("input[name='optradio']").prop('checked', false);
        sessionStorage.removeItem('_fees');
        $("#lblItemList").hide();
        $("#tblItemFees").hide();
    }
    function resetAdminForm() {
        $("#ddlAdminRole").val($("#ddlAdminRole option:first").val());
        $("#txtAdminUName").val("");
        $("#txtAdminEmail").val("");
        $("#txtAdminOrg").tagsinput("removeAll");
    }
    function resetEditFeeForm() {
        $("#ddlManageTerm").val($("#ddlManageTerm option:first").val());
        $("#ddlManageClass").val($("#ddlManageClass option:first").val());
        $("#div-manage-item-list").hide();
        sessionStorage.removeItem('e_fees');
        //$("#lblEditItemList").hide();
        //$("#tblEditItemFees").hide();
    }
    function resetClassForm() {
        $("#txtClassPrefix").val("");
        $("#txtClassNumber").val("");
    }
    function resetClassEditForm() {
        $("#txtClassEditPrefix").val("");
        $("#txtClassEditNumber").val("");
        $('#lblClassEditNumber').html("");
        $('#lblClassEditPrefix').html("");
    }
    function resetTermForm() {
        $("#ddlTermItem").val($("#ddlTermItem option:first").val());
        $("#txtTermSuffix").val("");
        $("#txtTermStart").val("");
        $("#txtTermEnds").val("");
    }
    function resetTermEditForm() {
        $("#ddlTermEditItem").val($("#ddlTermEditItem option:first").val());
        $("#txtTermEditSuffix").val("");
        $("#txtTermEditStart").val("");
        $("#txtTermEditEnds").val("");
    }
    function baseAddress() {
        var badd = "http://localhost:21812/api/Tasker/";
        //var badd = "http://fees.midesoftng.com/api/Tasker/";
        return badd;
    };
    function baseAddress2() {
        var badd = "http://localhost:51725/api/users/";
        //var badd = "http://fees.midesoftng.com/api/Tasker/";
        return badd;
    };
    AddAntiForgeryToken = function (data) {
        if (sessionStorage.getItem('id_token') != null) {
            var token = sessionStorage.getItem('id_token');
            data.__RequestVerificationToken = token;
        }
        return data;
    };
    function getToken(value) {
        var hashValue;
        var h_key;
        if (sessionStorage.getItem('h_key') != null) {
            h_key = sessionStorage.getItem('h_key');
        }
        hashValue = CryptoJS.HmacSHA256(value, h_key);
        hashValue = CryptoJS.enc.Base64.stringify(hashValue);
        sessionStorage.setItem("h_value", hashValue);
    }; 
    $.validator.addMethod("requiredTableItems", function (val, ele, arg) {
        if (sessionStorage.getItem('_fees') !== null) {  return false; }
        return true;
        }, 'This Field is required.');
    $.validator.addMethod("requiredType", function (val, ele, arg) {
        if ($("#category_id").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredCountry", function (val, ele, arg) {
        if ($("#countryid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredBank", function (val, ele, arg) {
        if ($("#bankcode").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredState", function (val, ele, arg) {
        if ($("#stateid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredRole", function (val, ele, arg) {
        if ($("#role_id").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredBiller", function (val, ele, arg) {
        if ($("#billerid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    //$.validator.addMethod("requiredAdminOrg", function (val, ele, arg) {
    //    if ($("#ddlAdminRole").val() != 1 && $("#txtAdminOrg").val() == "") { return false; }
    //    return true;
    //}, 'This Field is required.');
    $.validator.addMethod("uniqueAdminUname", function (val, ele, arg) {
        $.getJSON(baseAddress2() + "checkadminuname/" + $("#txtAdminUName").val(), function (data) {
            console.log(data);
            if (data == true) { return false; }
            return true;
        });
    }, 'Username already exists.'); 
    $.validator.addMethod("requiredBCStatus", function (val, ele, arg) {
        if ($("#status").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredSCStatus", function (val, ele, arg) {
        if ($("#status").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredCurrency", function (val, ele, arg) {
        if ($("#ddlCurrency").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredEditCurrency", function (val, ele, arg) {
        if ($("#ddlEditCurrency").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("isClassItemSelected", function (value, elem, param) {
        if ($("[name='check_classes']:checkbox:checked").length > 0) {
            return true;
        } else {
            return false;
        }
    }, "You must select at least one item!");
    $.validator.addMethod("isTermItemSelected", function (value, elem, param) {
        if ($("[name='optradio']").is(":checked")) {
            return true;
        } else {
            return false;
        }
    }, "You must select one item!");
    $.validator.addMethod("requiredServiceStatus", function (val, ele, arg) {
        if ($("#status").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredEditTerm", function (val, ele, arg) {
        if ($("#ddlTermEditItem").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredServiceCategory", function (val, ele, arg) {
        if ($("#categoryid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("areTagsAdded", function (value, elem, param) {
        var approverlist = $("#txtClassItem").tagsinput('items');
        if (approverlist.length > 0) {
            return true;
        } else {
            return false;
        }
    }, "You must add at least one class to proceed!");
    $.validator.addMethod("requiredAdminOrg", function (value, elem, param) {
        var approverlist = $("#billerid").tagsinput('items');
        if (approverlist.length > 0) {
            return true;
        } else {
            return false;
        }
    }, 'This Field is required.');
    $.validator.addMethod("requiredBillerService", function (value, elem, param) {
        if ($("#billerid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
});