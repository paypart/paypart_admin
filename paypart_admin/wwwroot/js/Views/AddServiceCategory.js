$(function () {
    function setHeader(xhr) {
        var auth;
        if (sessionStorage.getItem('_token') != null) {
            auth = sessionStorage.getItem('_token');
            xhr.setRequestHeader('Authorization', auth);
            xhr.setRequestHeader('Content-type', "application/json");
        }
    }
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
        },
        submitHandler: function (form) {
            var servicecategory = {
                id: $("#hdnServiceCategoryId").val(),
                title: $("#title").val(),
                status: $("#status").val(),
            };
           
            console.log(servicecategory);
            //getToken(fee);
            //AddAntiForgeryToken(fee);
            servicecategory = JSON.stringify(servicecategory);
            //alert(servicecategory);


            $.ajax({
                type: "POST",
                url: baseUrl() + "servicecategory/addservicecategory",
                beforeSend: setHeader,
                data: servicecategory,
                contentType: "application/json; charset=utf-8",
                dataType: "json", 
                success: function (data) {
                    if (data != null) {
                        refreshservicecategory();
                        $('.single-service-category-tag').tagsinput('removeAll');
                        showservicecategory();
                    }
                },
                failure: function (errMsg) {
                    $('#subModal').modal('hide');
                    $("#failurelbl").html(": Service Category failed to submit");
                    $('#failModal').modal('show');
                    console.log(errMsg);
                }
            });
        }
    });
    var servicecat = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: baseUrl() + "servicecategory/getallservicecategories",
            cache: false
        }
    });
    servicecat.initialize();

    $('.multi-service-category-tag').tagsinput({
        itemValue: 'id',
        itemText: 'title',
        maxTags: 10,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'servicecat',
            displayKey: 'title',
            source: servicecat.ttAdapter()
        }
    });

    $('.single-service-category-tag').tagsinput({
        itemValue: 'id',
        itemText: 'title',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'billercat',
            displayKey: 'title',
            source: servicecat.ttAdapter()
        }
    });
    $('.single-service-category-tag').on('itemAdded', function (event) {
        refreshservicecategory();
        $("#hdnServiceCategoryId").val(event.item.id);
        $("#title").val(event.item.title);
        $("#status").val(event.item.status);
    });
    $('.single-service-category-tag').on('itemRemoved', function (event) {
        refreshservicecategory();
    });
    function refreshservicecategory() {
        $("#hdnServiceCategoryId").val("0");
        $("#status").val($("#status option:first").val());

        $("#title").val("");       
    };
    function showservicecategory() {
        $("#successlbl").html(": Service Category submitted successfully");
        $('#sucModal').modal('show');
        $('#subModal').modal('hide');
    };
    function baseUrl() {
		//return "http://172.17.0.11:9000/";
        return "http://69.167.186.129:9000/";
        //return "http://localhost:59947/api/";
    };
    $.validator.addMethod("requiredSCStatus", function (val, ele, arg) {
        if ($("#status").val() == 0) { return false; }
        return true;
    }, 'This Field is required.');
});