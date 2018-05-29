$(function () {
    function setHeader(xhr) {
        var auth;
        if (sessionStorage.getItem('_token') != null) {
            auth = sessionStorage.getItem('_token');
            xhr.setRequestHeader('Authorization', auth);
            xhr.setRequestHeader('Content-type', "application/json");
        }
    }
    function getAllUserRoles() {
        $.ajax({
            type: "GET",
            url: baseUrl() + "roles/getalluserroles",
            beforeSend: setHeader,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#role_id option").remove();
                $("#role_id").append(
                    $("<option></option>")
                        .text("Select Role")
                        .val(0)
                );
                $.each(data, function (index, item) {
                    console.log(item);
                    $("#role_id").append(
                        $("<option></option>")
                            .text(item.role)
                            .val(item._id)
                    );
                });
            }
        });
    };
    function getBillers() {
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
    var admin = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('username'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: baseUrl() + 'users/getallusers',
            prepare: function (query, settings) {
                settings.url = settings.url
                settings.headers = {
                    "Authorization": (sessionStorage.getItem('_token') != null) ? sessionStorage.getItem('_token') : ""
                };
                return settings;
            }
        },
        limit: 10
    });
    admin.initialize();

    $('.multi-admin-name-tag').tagsinput({
        itemValue: '_id',
        itemText: 'username',
        maxTags: 10,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'admin',
            displayKey: 'username',
            source: admin.ttAdapter()
        }
    });

    $('.single-admin-name-tag').tagsinput({
        itemValue: '_id',
        itemText: 'username',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'admin',
            displayKey: 'username',
            source: admin.ttAdapter()
        }
    });
    $('.single-admin-name-tag').on('itemAdded', function (event) {
        refreshadmin();
        $("#hdnAdminId").val(event.item._id);
        $("#role_id").val(event.item.role_id);
        $("#billerid").val(event.item.billerid);
        $("#username").val(event.item.username);
        $("#email").val(event.item.email);
    });
    $('.single-admin-name-tag').on('itemRemoved', function (event) {
        refreshadmin();
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
        submitHandler: function (form) {
            var admin = {
                _id: $("#hdnAdminId").val(),
                role_id: $("#role_id").val(),
                billerid: $("#billerid").val(),
                username: $("#username").val(),
                email: $("#email").val(),
                createdby: sessionStorage.getItem('_email')
            }
           // console.log(admin);
            admin = JSON.stringify(admin);
            $.ajax({
                type: "POST",
                url: baseUrl() + "users/adduser",
                beforeSend: setHeader,
                data: admin,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        refreshadmin();
                        $('.single-admin-name-tag').tagsinput('removeAll');
                        showmodal();
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
    function baseUrl() {
		//return "http://172.17.0.11:9000/";
        return "http://69.167.186.129:9000/";
        //return "http://localhost:9000/";
    };
    function refreshadmin() {
        $("#hdnAdminId").val("0");
        $("#role_id").val($("#role_id option:first").val());
        $("#billerid").val($("#billerid option:first").val());

        $("#username").val("");
        $("#email").val("");
    };
    function showmodal() {
        $("#successlbl").html(": User submitted successfully");
        $('#sucModal').modal('show');
        $('#subModal').modal('hide');
    };
    $.validator.addMethod("requiredRole", function (val, ele, arg) {
        if ($("#role_id").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    $.validator.addMethod("requiredBiller", function (val, ele, arg) {
        if ($("#billerid").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
    getAllUserRoles();
    getBillers();
});