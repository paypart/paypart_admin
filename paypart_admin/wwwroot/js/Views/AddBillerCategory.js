$(function () {
    function setHeader(xhr) {
        var auth;
        if (sessionStorage.getItem('_token') != null) {
            auth = sessionStorage.getItem('_token');
            xhr.setRequestHeader('Authorization', auth);
            xhr.setRequestHeader('Content-type', "application/json");
        }
    }
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
        },
        submitHandler: function (form) {
            var billercategory = {
                _id: $("#hdnBillerCategoryId").val(),
                title: $("#title").val(),
                status: $("#status").val(),
            };
            //console.log(billercategory);
            //getToken(fee);
            //AddAntiForgeryToken(fee);
            billercategory = JSON.stringify(billercategory);
            $.ajax({
                type: "POST",
                url: baseUrl() + "billercategory/addbillercategory",
                beforeSend: setHeader,
                data: billercategory,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        refreshbillercategory();
                        $('.single-biller-category-tag').tagsinput('removeAll');
                        showbillercategory();
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
    var billercategory = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //prefetch: {
        //    url: baseUrl() + "billercategory/getallbillercategories",
        //    cache: false
        //}
         remote: {
             url: baseUrl() + 'billercategory/getallbillercategories',
            prepare: function (query, settings) {
                settings.url = settings.url
                settings.headers = {
                    "Authorization": (sessionStorage.getItem('_token') != null) ? sessionStorage.getItem('_token') : ""
                };
                return settings;
            }
        }
    });
    billercategory.initialize();

    $('.multi-biller-category-tag').tagsinput({
        itemValue: '_id',
        itemText: 'title',
        maxTags: 10,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'billercategory',
            displayKey: 'title',
            source: billercategory.ttAdapter()
        }
    });

    $('.single-biller-category-tag').tagsinput({
        itemValue: '_id',
        itemText: 'title',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'billercategory',
            displayKey: 'title',
            source: billercategory.ttAdapter()
        }
    });
    $('.single-biller-category-tag').on('itemAdded', function (event) {
        refreshbillercategory();
        $("#hdnBillerCategoryId").val(event.item._id);
        $("#title").val(event.item.title);
        $("#status").val(event.item.status);
    });
    $('.single-biller-category-tag').on('itemRemoved', function (event) {
        refreshbillercategory();
    });
    function refreshbillercategory() {
        $("#hdnBillerCategoryId").val("0");
        $("#status").val($("#status option:first").val());
        $("#title").val("");
    };
    function showbillercategory() {
        $("#successlbl").html(": Biller Category submitted successfully");
        $('#sucModal').modal('show');
        $('#subModal').modal('hide');
    };
    function baseUrl() {
		//return "http://172.17.0.11:9000/";
        return "http://69.167.186.129:9000/";
        //return "http://localhost:59947/api/";
    };
    $.validator.addMethod("requiredBCStatus", function (val, ele, arg) {
        if ($("#status").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
});