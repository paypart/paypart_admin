// Write your Javascript code.
$(function () {
    function setHeader(xhr) {
        var h_value;
        if (sessionStorage.getItem('h_value') != null) {
            h_value = sessionStorage.getItem('h_value');
            xhr.setRequestHeader('HVal', h_value);
            sessionStorage.removeItem('h_value');
        }
    }
    $("#txtTermStart").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',
        yearRange: "-100:+12",
        minDate: 0
    });
    $("#txtTermEnds").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',
        yearRange: "-100:+12",
        minDate: 0
    });
    $("#txtTermEditStart").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',
        yearRange: "-100:+12",
        minDate: 0
    });
    $("#txtTermEditEnds").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy',
        yearRange: "-100:+12",
        minDate: 0
    });
    $('#dash').click(function (e) {
        $('.lbltag').html("DashBoard");
        //alert("dashboardfire");
        $("#page-body").load('/Home/Dashboard');
        //$("#page-body").load('@Url.Action("Dashboard","Home")');

        //$("#div-dashboard").delay(100).fadeIn(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);

        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#new-biller').click(function (e) {
        $('.lbltag').html("New Biller");

        $("#page-body").load('/Home/AddBiller');
        //$("#page-body").load('@Url.Action("NewSchool","Home")');
        //if (sessionStorage.getItem('data') != null) {
        //    sessionStorage.removeItem('data');
        //}
        //$("#label-panel-heading").html("Create a new organization");
        //resetOrgForm();
        //$("#div-new-org").delay(100).fadeIn(100);
        //$("#div-org-form").delay(100).fadeIn(100)
        //$("#div-org-search").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
        //$("#txtOrgName").removeAttr("disabled");
    });
    $('#manage-biller').click(function (e) {
        $('.lbltag').html("Manage Biller");
        $("#label-panel-heading").html("Manage existing biller");

        $("#page-body").load('/Home/ManageBiller');

        //$("#div-manage-org").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-new-org").delay(100).fadeIn(100);
        //$("#div-org-search").delay(100).fadeIn(100);
        //$("#div-org-form").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
        //$("#txtOrgName").attr("disabled", "disabled");
    });

    $('#new-admin').click(function (e) {
        $('.lbltag').html("New Administrator");
        $("#label-admin-panel-heading").html("Create a new administrator");

        $("#page-body").load('/Home/AddAdmin');

        //if (sessionStorage.getItem('admindata') != null) {
        //    sessionStorage.removeItem('admindata');
        //}
        //resetAdminForm();
        //$("#div-new-admin").delay(100).fadeIn(100);
        //$("#div-admin-form").delay(100).fadeIn(100);
        //$("#div-admin-search").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#manage-admin').click(function (e) {
        $('.lbltag').html("Manage Administrator");
        $("#label-admin-panel-heading").html("Manage existing administrator");

        $("#page-body").load('/Home/ManageAdmin');

        //$("#div-new-admin").delay(100).fadeIn(100);
        //$("#div-admin-search").delay(100).fadeIn(100);
        //$("#div-admin-form").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#new-fee').click(function (e) {
        $('.lbltag').html("New Bill");

        $("#page-body").load('/Home/AddSchoolBill');

        //$("#div-new-fee").delay(100).fadeIn(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#manage-fee').click(function (e) {
        $('.lbltag').html("Manage Bill");

        $("#page-body").load('/Home/ManageSchoolBill');

        //$("#div-manage-fee").delay(100).fadeIn(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });

    $('#new-class').click(function (e) {
        $('.lbltag').html("New Class");

        $("#page-body").load('/Home/AddSchoolClass');

        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-new-class").delay(100).fadeIn(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#manage-class').click(function (e) {
        $('.lbltag').html("Manage Class");

        $("#page-body").load('/Home/ManageSchoolClass');

        //$("#div-manage-fee").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").delay(100).fadeIn(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#new-term').click(function (e) {
        $('.lbltag').html("New Term");

        $("#page-body").load('/Home/AddSchoolTerm');

        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-fee").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").delay(100).fadeIn(100);
        //$("#div-manage-term").fadeOut(100);
    });
    $('#manage-term').click(function (e) {
        $('.lbltag').html("Manage Term");

        $("#page-body").load('/Home/ManageSchoolTerm');

        //$("#div-manage-fee").fadeOut(100);
        //$("#div-dashboard").fadeOut(100);
        //$("#div-new-org").fadeOut(100);
        //$("#div-new-admin").fadeOut(100);
        //$("#div-manage-org").fadeOut(100);
        //$("#div-new-fee").fadeOut(100);
        //$("#div-manage-admin").fadeOut(100);
        //$("#div-new-class").fadeOut(100);
        //$("#div-manage-class").fadeOut(100);
        //$("#div-new-term").fadeOut(100);
        //$("#div-manage-term").delay(100).fadeIn(100);
    });
    function getBillerCategories() {
        $.getJSON(baseAddress() + "api/billercategory/getallbillercategories", function (data) {
            $("#ddlBillerCategory option").remove();
            $("#ddlBillerCategory").append(
                $("<option></option>")
                    .text("Select Biller Category")
                    .val(0)
            );
            $.each(data, function (index, item) {
                console.log(item);
                $("#ddlBillerCategory").append(
                    $("<option></option>")
                        .text(item.title)
                        .val(item._id)
                );
            });
        });
    };
    function getCountries() {
        $.getJSON(baseAddress() + "getCountries", function (data) {
            $("#ddlCountry option").remove();
            $("#ddlCountry").append(
                $("<option></option>")
                    .text("Select Country")
                    .val(0)
            );
            $.each(data, function (index, item) {
                $("#ddlCountry").append(
                    $("<option></option>")
                        .text(item.Country)
                        .val(item.Id)
                );
            });
        });
    };
    function getBanks() {
        $.getJSON(baseAddress() + "getBanks", function (data) {
            $("#ddlBank option").remove();
            $("#ddlBank").append(
                $("<option></option>")
                    .text("Select Bank")
                    .val("0")
            );
            $.each(data, function (index, item) {
                $("#ddlBank").append(
                    $("<option></option>")
                        .text(item.name)
                        .val(item.code)
                );
            });
        });
    };
    function getAccountName() {
        var acctnum = $("#txtAcctNum").val();
        var id = $("#ddlBank").val();
        if (acctnum.length >= 10 && id != "0") {
            $.getJSON(baseAddress() + "getAccountName?id=" + id + "&acctnum=" + acctnum, function (data) {
                $("#txtAcctName").val("");
                $("#txtAcctName").val(data.account_name);
            });
        }
    };
    $("#txtAcctNum").focusout(function () {
        getAccountName();
    });
    $('#ddlBank').change(function () {
        getAccountName();
    });
    $('#ddlCountry').change(function () {
        var id = $(this).val();
        getStatesByCountryId(id, 0);
    });
    $('#ddlManageTerm').change(function () {
        var tid = $(this).val();
        var cid = $('#ddlManageClass').val();
        getClassByOrgId(tid);
        if (cid > 0 && tid > 0) {
            getFeeByOrgTermClassId(cid, tid);
        }
    });
    $('#ddlManageClass').change(function () {
        var cid = $(this).val();
        var tid = $('#ddlManageTerm').val();
        if (cid > 0 && tid > 0) {
            getFeeByOrgTermClassId(cid, tid);
            $("#txtItemEditCost").val("");
            $("#txtItemEditName").val("");
            $("#ddlEditCurrency").val($("#ddlEditCurrency option:first").val());
        }
    });
    function getCounts() {
        var authdata;
        if (sessionStorage.getItem('authdata') != null) {
            authdata = JSON.parse(sessionStorage.getItem('authdata'));
        }
        var id = authdata.orgid;
        $.getJSON(baseAddress() + "countEntities/" + id, function (data) {
            if (data != null) {
                $("#lblOrgCount").html(data.orgCount);
                $("#lblAdminCount").html(data.adminCount);
                $("#lblFeeCount").html(data.feeCount);
                $("#lblbpaymentCount").html(data.payCount);
            }
        });
    }
    function getFeeByOrgTermClassId(cid, tid) {
        var authdata;
        if (sessionStorage.getItem('authdata') != null) {
            authdata = JSON.parse(sessionStorage.getItem('authdata'));
        }
        var id = authdata.orgid;
        //var id = 2;//remove on go live
        $.getJSON(baseAddress() + "getFeeByOrgTermClassId/" + id + "?cid=" + cid + "&tid=" + tid, function (data) {
            if (data.length > 0) {
                sessionStorage.setItem('feedata', JSON.stringify(data));
                var fees = [];

                if (sessionStorage.getItem('e_fees') != null) {
                    sessionStorage.removeItem('e_fees')
                }

                $.each(data, function (index, item) {
                    var fee = {
                        item: item.Item,
                        cost: item.Cost,
                        currency: item.Curid
                    }

                    var l = fees.length;
                    fees[l] = fee;
                });

                sessionStorage.setItem('e_fees', JSON.stringify(fees));
                vieweditfees();
                $("#div-manage-item-list").delay(100).fadeIn(100);

            }
        });
    }
    function getStatesByCountryId(id, stateid) {
        $.getJSON(baseAddress() + "getStatesByCountryId/" + id, function (data) {
            $("#ddlStates option").remove();
            $("#ddlStates").append(
                $("<option></option>")
                    .text("Select State")
                    .val(0)
            );
            $.each(data, function (index, item) {
                $("#ddlStates").append(
                    $("<option></option>")
                        .text(item.State)
                        .val(item.Id)
                );
            });
            $("#ddlStates").val(stateid);
        });
    };
    function getRoles() {
        $.getJSON(baseAddress() + "getRoles", function (data) {
            $("#ddlAdminRole option").remove();
            $("#ddlAdminRole").append(
                $("<option></option>")
                    .text("Select Role")
                    .val(0)
            );
            $.each(data, function (index, item) {
                $("#ddlAdminRole").append(
                    $("<option></option>")
                        .text(item.Role)
                        .val(item.Id)
                );
            });
        });
    }
    function getTermByOrgId() {
        var authdata;
        if (sessionStorage.getItem('authdata') != null) {
            authdata = JSON.parse(sessionStorage.getItem('authdata'));
        }
        var id = authdata.orgid;
        //var id = 2;//remove on go live
        $.getJSON(baseAddress() + "getTermByOrgId/" + id, function (data) {
            $("#ddlManageTerm option").remove();
            $("#ddlManageTerm").append(
                $("<option></option>")
                    .text("Select Term")
                    .val(0)
            );
            $.each(data, function (index, item) {
                var sdate = formatDate(item.Startdate);
                var edate = formatDate(item.Enddate);
                $("#ddlManageTerm").append(
                    $("<option></option>")
                        .text(item.Name + "  (" + sdate + " to " + edate + ")")
                        .val(item.Id)
                );
            });
            $("#ddlTermSuffixItem option").remove();
            $("#ddlTermSuffixItem").append(
                $("<option></option>")
                    .text("Select Term")
                    .val(0)
            );
            $.each(data, function (index, item) {
                var sdate = formatDate(item.Startdate);
                var edate = formatDate(item.Enddate);
                $("#ddlTermSuffixItem").append(
                    $("<option></option>")
                        .text(item.Name + "  (" + sdate + " to " + edate + ")")
                        .val(item.Id)
                );
            });
        });
    };
    function getClassByOrgId(tid) {
        var authdata;
        if (sessionStorage.getItem('authdata') != null) {
            authdata = JSON.parse(sessionStorage.getItem('authdata'));
        }
        var id = authdata.orgid;

        //var id = 2;//remove on go live
        $.getJSON(baseAddress() + "getClassByOrgId/" + id + "?tid=" + tid, function (data) {
            $("#ddlManageClass option").remove();
            $("#ddlManageClass").append(
                $("<option></option>")
                    .text("Select Class")
                    .val(0)
            );
            $.each(data, function (index, item) {
                $("#ddlManageClass").append(
                    $("<option></option>")
                        .text(item.Name)
                        .val(item.Id)
                );
            });
        });
    };
    function getClassesByOrgId() {
        var authdata;
        if (sessionStorage.getItem('authdata') != null) {
            authdata = JSON.parse(sessionStorage.getItem('authdata'));
        }
        var id = authdata.orgid;
        $.getJSON(baseAddress() + "getClassesByOrgId/" + id, function (data) {
            $("#tblItemClasses > tbody > tr:nth-child(n+2)").remove();
            $('#tblItemClasses').DataTable($.each(data, function (index, item) {
                var btnid = "btn" + item.Id;
                var name = item.Name.split(' ');
                var cnt = name.length;
                var prefix = "";
                for (var i = 0; i < cnt; i++) {
                    if (i + 1 < cnt) {
                        prefix += name[i] + " ";
                    }
                }
                var _class = name[cnt - 1];
                var e_class = {
                    id: item.Id,
                    prefix: prefix,
                    _class: _class
                }
                $("#tblItemClasses tbody").append(
                   "<tr><td>" + prefix + '</td><td>' + _class + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '"  data-id = "' + btnid + '" class="btn btn-link editClass" data-toggle="modal" data-target="#editClassModal">Edit</button></td><td class="td-close-file"><button type="button" id = "' + btnid + '" data-id = "' + btnid + '" class="btn btn-link deleteClass" data-toggle="modal" data-target="#deleteModal">Delete</button></td></tr>')

                $('#' + btnid).data('key', e_class);

            }));
        });
    };
    function getTermsByOrgId() {
        var authdata;
        if (sessionStorage.getItem('authdata') != null) {
            authdata = JSON.parse(sessionStorage.getItem('authdata'));
        }
        var id = authdata.orgid;
        $.getJSON(baseAddress() + "getTermsByOrgId/" + id, function (data) {
            $("#tblItemTerms > tbody > tr:nth-child(n+2)").remove();
            $('#tblItemTerms').DataTable($.each(data, function (index, item) {
                var btnid = "btn" + item.Id;
                var name = item.Name.split(' ');
                var cnt = name.length;
                var suffix = "";
                var term = "";
                if (cnt > 0) {
                    term = name[0];
                }
                for (var i = 0; i < cnt; i++) {
                    if (i > 0) {
                        suffix += name[i] + " ";
                    }
                }
                term = term.trim();
                var e_term = {
                    id: item.Id,
                    suffix: suffix,
                    startdate: item.Startdate,
                    enddate: item.Enddate,
                    term: term
                }
                $("#tblItemTerms tbody").append(
                   "<tr><td>" + term + '</td><td>' + suffix + '</td><td>' + formatDate(item.Startdate) + '</td><td>' + formatDate(item.Enddate) + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '"  data-id = "' + btnid + '" class="btn btn-link editTerm" data-toggle="modal" data-target="#editTermModal">Edit</button></td><td class="td-close-file"><button type="button" id = "' + btnid + '" data-id = "' + btnid + '" class="btn btn-link deleteTerm" data-toggle="modal" data-target="#deleteModal">Delete</button></td></tr>')

                $('#' + btnid).data('key', e_term);
            }));
        });
    };
    var classes = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: baseAddress() + "getClassesByOrgId/",
            replace: function (url, uriEncodedQuery) {
                id = (sessionStorage.getItem('authdata') != null) ? JSON.parse(sessionStorage.getItem('authdata')).orgid : 0;

                return url + id
            },
            cache: false
        }
    });
    classes.initialize();

    $('.multi-class-name-tag').tagsinput({
        itemValue: 'Id',
        itemText: 'Name',
        maxTags: 6,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'classes',
            displayKey: 'Name',
            source: classes.ttAdapter()
        }
    });
    var terms = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: baseAddress() + "getTermByOrgId/",
            replace: function (url, uriEncodedQuery) {
                id = (sessionStorage.getItem('authdata') != null) ? JSON.parse(sessionStorage.getItem('authdata')).orgid : 0;

                return url + id
            },
            cache: false
        }
    });
    terms.initialize();

    $('.single-class-name-tag').tagsinput({
        itemValue: 'Id',
        itemText: 'Name',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'terms',
            displayKey: 'Name',
            source: terms.ttAdapter()
        }
    });
    var schools = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: baseAddress() + "getOrgs",
            cache: false
        }
    });
    schools.initialize();

    $('.multi-staff-name-tag').tagsinput({
        itemValue: 'Id',
        itemText: 'Name',
        maxTags: 10,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'schools',
            displayKey: 'Name',
            source: schools.ttAdapter()
        }
    });

    $('.single-staff-name-tag').tagsinput({
        itemValue: 'Id',
        itemText: 'Name',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'schools',
            displayKey: 'Name',
            source: schools.ttAdapter()
        }
    });

    var admins = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Username'),
        //datumTokenizer: Bloodhound.tokenizers.obj.whitespace(datum.Username),

        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: baseAddress() + "getUsers",
            cache: false
        }
    });
    admins.initialize();
    $('.single-admin-name-tag').tagsinput({
        itemValue: 'Id',
        itemText: 'Username',
        maxTags: 1,
        tagClass: 'tags-multi',
        typeaheadjs: {
            name: 'admins',
            displayKey: 'Username',
            source: admins.ttAdapter()
        }
    });
    $("#btnSearchOrgs").click(function () {
        var id = $("#txtSearchOrgs").val();
        $.getJSON(baseAddress() + "getOrgById/" + id, function (data) {
            if (data != null) {
                //console.log(data);
                resetOrgForm();
                fillOrgForm(data);
                sessionStorage.setItem('data', JSON.stringify(data));
                $("#div-org-form").delay(100).fadeIn(100);
            };
        });
    });
    $("#btnSearchAdmin").click(function () {
        var id = $("#txtSearchAdmin").val();
        $.getJSON(baseAddress() + "getUserById/" + id, function (data) {
            if (data != null) {
                // console.log(data);
                $.getJSON(baseAddress() + "getOrgById/" + data.Orgid, function (odata) {
                    resetAdminForm();
                    var name = (odata != null) ? odata.Name : "";
                    fillAdminForm(data, name);
                    sessionStorage.setItem('admindata', JSON.stringify(data));
                    $("#div-admin-form").delay(100).fadeIn(100);
                });
            };
        });
    });
    $('#btnLogout').click(function () {
        logout();
    });
    function resetOrgForm() {
        $("#anchorFile").text("");
        $("#txtSearchOrgs").tagsinput("removeAll");
        $("#txtOrgName").val("");
        $("#fileOrgLogo").val("");
        $("#txtOrgAddress").val("");
        $("#txtOrgCity").val("");
        $("#txtOrgPostCode").val("");
        $("#txtOrgEmail").val("")
        $("#txtOrgAltEmail").val("")
        $("#txtOrgPhone").val("");
        $("#txtOrgAltPhone").val("");
        $("#ddlBillerCategory").val($("#ddlBillerCategory option:first").val());
        $("#ddlStates").val($("#ddlStates option:first").val());
        $("#ddlCountry").val($("#ddlCountry option:first").val());
    }
    function fillOrgForm(data) {
        if (data.Logo != "") {
            $('#anchorFile').attr('href', data.Logo);
            var logo = data.Logo;
            var a_text = logo.split('\\');
            var a = a_text[a_text.length - 1];
            $("#anchorFile").text(a);
            $("#anchorFile").css("color", "red");
        }
        $("#txtOrgName").val(data.Name).attr("disabled", "disabled");
        //$("#fileOrgLogo").val(data.Logo);
        $("#txtOrgAddress").val(data.Address[0].Street);
        $("#txtOrgCity").val(data.Address[0].City);
        $("#txtOrgPostCode").val(data.Address[0].Postcode);
        $("#txtOrgEmail").val(data.Email[0].Emailaddress);
        $("#txtOrgAltEmail").val((data.Email.length > 1) ? data.Email[1].Emailaddress : "");
        $("#txtOrgPhone").val(data.Phone[0].Phonenumber);
        $("#txtOrgAltPhone").val((data.Phone.length > 1) ? data.Phone[1].Phonenumber : "");
        $("#ddlBillerCategory").val(data.Typeid);
        var id = data.Address[0].Countryid;
        $("#ddlCountry").val(id);
        $("#txtAcctName").val(data.Account[0].Accountname);
        $("#txtAcctNum").val(data.Account[0].Accountnumber);
        $("#ddlBank").val(data.Account[0].Bankcode);
        getStatesByCountryId(id, data.Address[0].Stateid);
    }
    function resetAdminForm() {
        $("#ddlAdminRole").val($("#ddlAdminRole option:first").val());
        $("#txtAdminUName").val("");
        $("#txtAdminEmail").val("");
        $("#txtAdminOrg").tagsinput("removeAll");
        $("#txtSearchAdmin").tagsinput("removeAll");
    }
    function fillAdminForm(data, name) {
        $("#ddlAdminRole").val(data.Roleid);
        $("#txtAdminUName").val(data.Username);
        $("#txtAdminEmail").val(data.Email);
        if (data.Orgid > 0) {
            $('#txtAdminOrg').tagsinput('add', { Id: data.Orgid, Name: name });
        }

    }
    $("#btnAddItem").click(function () {
        if ($("#ddlCurrency").val() == 0) {
            $("#lblCurrency").addClass("error-class");
            $("#lblCurrency").html("Enter Currency to add");
            return;
        }
        else {
            $("#lblCurrency").html("");
        }
        if ($("#txtItemName").val() == "") {
            $("#lblItemName").addClass("error-class");
            $("#lblItemName").html("Enter item name to add");
            return;
        }
        else {
            $("#lblItemName").html("");
        }
        if ($("#txtItemCost").val() == "") {
            $("#lblItemCost").addClass("error-class");
            $("#lblItemCost").html("Enter item cost to add");
            return;
        }
        else {
            $("#lblItemCost").html("");
        }

        var fee = {
            Item: $("#txtItemName").val(),
            Currency: $("#ddlCurrency").val(),
            Cost: parseInt($("#txtItemCost").val())
        }

        var fees = [];
        if (sessionStorage.getItem('_fees') != null) {
            fees = JSON.parse(sessionStorage.getItem('_fees'));
        }

        for (var i = 0; i < fees.length; i++) {
            alert(fees[i].Item + " " + $("#txtItemName").val());
            if (fees[i].Item.toLowerCase() == $("#txtItemName").val().toLowerCase()) {
                $("#cautionlbl").html(": Item already exist in list ");
                $('#warnModal').modal('show');
                return;
            }
        }

        var l = fees.length;
        fees[l] = fee;

        sessionStorage.setItem('_fees', JSON.stringify(fees));
        $("#txtItemCost").val("");
        $("#txtItemName").val("");
        $("#ddlCurrency").val($("#ddlCurrency option:first").val());

        viewfees();
    });
    function viewfees() {
        var _fees = new Array();
        $("#tblItemFees > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('_fees') != null) {
            _fees = JSON.parse(sessionStorage.getItem('_fees'));

            for (var i = 0; i < _fees.length; i++) {
                var btnid = "btn" + i;
                $("#tblItemFees tbody").append(
                   "<tr><td>" + _fees[i].Item + '</td><td>' + _fees[i].Currency + _fees[i].Cost + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteFee(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_fees.length > 0) {
                $("#div-item-list").delay(100).fadeIn(100);
            }
        }
    }
    $("#btnAddItemEdit").click(function () {
        if ($("#ddlEditCurrency").val() == 0) {
            $("#lblEditCurrency").addClass("error-class");
            $("#lblEditCurrency").html("Enter Currency to add");
            return;
        }
        else {
            $("#lblEditCurrency").html("");
        }
        if ($("#txtItemEditName").val() == "") {
            $("#lblItemEditName").addClass("error-class");
            $("#lblItemEditName").html("Enter item name to add");
            return;
        }
        else {
            $("#lblItemEditName").html("");
        }
        if ($("#txtItemEditCost").val() == "") {
            $("#lblItemEditCost").addClass("error-class");
            $("#lblItemEditCost").html("Enter item cost to add");
            return;
        }
        else {
            $("#lblItemEditCost").html("");
        }

        var fee = {
            item: $("#txtItemEditName").val(),
            cost: $("#txtItemEditCost").val(),
            currency: $("#ddlEditCurrency").val()
        }

        var fees = [];
        if (sessionStorage.getItem('e_fees') != null) {
            fees = JSON.parse(sessionStorage.getItem('e_fees'));
        }


        for (var i = 0; i < fees.length; i++) {
            if (fees[i].item.toLowerCase() == $("#txtItemEditName").val().toLowerCase()) {
                $("#cautionlbl").html(": Item already exist in list ");
                $('#warnModal').modal('show');
                return;
            }
        }

        var l = fees.length;
        fees[l] = fee;

        sessionStorage.setItem('e_fees', JSON.stringify(fees));
        $("#txtItemEditCost").val("");
        $("#txtItemEditName").val("");
        $("#ddlEditCurrency").val($("#ddlEditCurrency option:first").val());

        vieweditfees();

    });
    function vieweditfees() {
        var _fees = new Array();
        $("#tblEditItemFees > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('e_fees') != null) {
            _fees = JSON.parse(sessionStorage.getItem('e_fees'));

            //console.log(_fees);

            for (var i = 0; i < _fees.length; i++) {
                var btnid = "btn" + i;
                $("#tblEditItemFees tbody").append(
                   "<tr><td>" + _fees[i].item + '</td><td>' + _fees[i].currency + _fees[i].cost + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteEditFee(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_fees.length > 0) {
                $("#div-edit-item-list").delay(100).fadeIn(100);
            }
        }
    }
    $('#btnmoddelete').click(function () {
        var control = $("#hdndeletefromcontrol").val();
        if (control == "class") {
            var e_class;
            if (sessionStorage.getItem('_class') != null) {
                e_class = JSON.parse(sessionStorage.getItem('_class'));
            }
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var _class = {
                Id: e_class.id,
                Orgid: authdata.orgid,
                Name: e_class.prefix + " " + e_class._class,
                Status: 2,
                message: null
            }
            _class = JSON.stringify(_class);
            getToken(_class);
            deleteClass(_class);
        }
        if (control == "term") {
            var e_term;
            if (sessionStorage.getItem('_term') != null) {
                e_term = JSON.parse(sessionStorage.getItem('_term'));
            }
            var authdata;
            if (sessionStorage.getItem('authdata') != null) {
                authdata = JSON.parse(sessionStorage.getItem('authdata'));
            }

            var _term = {
                Id: e_term.id,
                Orgid: authdata.orgid,
                Name: e_term.term + " " + e_term.suffix,
                Startdate: e_term.startdate,
                Enddate: e_term.enddate,
                Status: 2,
                message: null
            }
            _term = JSON.stringify(_term);
            getToken(_term);
            deleteTerm(_term);
        }
    });
    function deleteClass(_class) {

        $.ajax({
            type: "POST",
            url: baseAddress() + "deleteClass",
            beforeSend: setHeader,
            data: _class,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    if (data.includes("success")) {
                        sessionStorage.setItem('show-manage-class', "true");
                        location.reload();
                    }
                }
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    };
    function deleteTerm(_term) {
        $.ajax({
            type: "POST",
            url: baseAddress() + "deleteTerm",
            beforeSend: setHeader,
            data: _term,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data);
                    if (data.includes("success")) {
                        sessionStorage.setItem('show-manage-term', "true");
                        location.reload();
                    }
                }
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    };
    function formatDate(date) {
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

        var d = new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
    }
    function logout() {
        var i = sessionStorage.length;
        while (i--) {
            var key = sessionStorage.key(i);
            if (key != null) {
                sessionStorage.removeItem(key);
            }
        }
        window.location.href = 'http://localhost:51470/Home/Login';
        //window.location.href = 'http://fees.midesoftng.com/Home/Login';
    } getClassesByOrgId
    function baseAddress() {
        var badd = "http://localhost:59947/";
        //var badd = "http://fees.midesoftng.com/api/Tasker/";
        return badd;
    };
    $('#txtSearchAdmin').on('itemAdded', function (event) {
        var $elt = $('#txtSearchAdmin').tagsinput('input');
        $elt.removeAttr('placeholder');
    });
    $('#txtSearchAdmin').on('itemRemoved', function (event) {
        var $elt = $('#txtSearchAdmin').tagsinput('input');
        $elt.attr('placeholder', 'Search Administrators...');
    });
    $('#txtSearchOrgs').on('itemAdded', function (event) {
        var $elt = $('#txtSearchOrgs').tagsinput('input');
        $elt.removeAttr('placeholder');
    });
    $('#txtSearchOrgs').on('itemRemoved', function (event) {
        var $elt = $('#txtSearchOrgs').tagsinput('input');
        $elt.attr('placeholder', 'Search Organizations...');
    });
    $('#txtClassItem').on('itemAdded', function (event) {
        $('#lblTermSuffixItem').html("");
        var $elt = $('#txtClassItem').tagsinput('input');
        $elt.removeAttr('placeholder');
    });
    $('#txtClassItem').on('itemRemoved', function (event) {
        var $elt = $('#txtClassItem').tagsinput('input');
        $elt.attr('placeholder', 'Select Class(es)...');
    });
    //if (sessionStorage.getItem('authdata') != null) {
    //    var data = JSON.parse(sessionStorage.getItem('authdata'));
    //    if (data.roleid == 2) {
    //        $('.lbltag').html("New Class");
    //        $("#div-new-class").show();
    //    }
    //    if (data.roleid == 1) {
    //        $("#div-dashboard").show();
    //    }
    //};
    if (sessionStorage.getItem('show-manage-class') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-manage-class'));
        if (show == true) {
            $("#manage-class").trigger("click");
            $("#successlbl").html(": Class submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-manage-class')
        }
    };
    if (sessionStorage.getItem('show-manage-term') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-manage-term'));
        if (show == true) {
            $("#manage-term").trigger("click");
            $("#successlbl").html(": Term submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-manage-term');
        }
    };
    if (sessionStorage.getItem('show-new-org') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-new-org'));
        if (show == true) {
            $("#new-org").trigger("click");
            $('#subModal').modal('hide');
            $("#successlbl").html(": Organization submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-new-org');
        }
    };
    if (sessionStorage.getItem('show-new-admin') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-new-admin'));
        if (show == true) {
            $("#new-admin").trigger("click");
            $('#subModal').modal('hide');
            $("#successlbl").html(": Administrator submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-new-admin');
        }
    };
    if (sessionStorage.getItem('show-new-fee') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-new-fee'));
        if (show == true) {
            $("#new-fee").trigger("click");
            $('#subModal').modal('hide');
            $("#successlbl").html(": Fees submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-new-fee');
        }
    };
    if (sessionStorage.getItem('show-new-class') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-new-class'));
        if (show == true) {
            $("#new-class").trigger("click");
            $('#subModal').modal('hide');
            $("#successlbl").html(": Class submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-new-class');
        }
    };
    if (sessionStorage.getItem('show-new-term') != null) {
        var show = JSON.parse(sessionStorage.getItem('show-new-term'));
        if (show == true) {
            $("#new-term").trigger("click");
            $('#subModal').modal('hide');
            $("#successlbl").html(": Term submitted successfully");
            $('#sucModal').modal('show');
            sessionStorage.removeItem('show-new-term');
        }
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
    }
    //getCounts();
    getBillerCategories();
    //getCountries();
    //getRoles();
    //getTermByOrgId();
    //getClassesByOrgId();
    //getTermsByOrgId();
    //getBanks();

});
function formatDate(date) {
    var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

    var d = new Date(date);
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
}
function deleteFee(value) {
    if (sessionStorage.getItem('_fees') != null) {
        var _fees = JSON.parse(sessionStorage.getItem('_fees'));

        if (value > -1) {
            _fees.splice(value, 1);
        }

        sessionStorage.setItem('_fees', JSON.stringify(_fees));

        $("#tblItemFees > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('_fees') != null) {
            _fees = JSON.parse(sessionStorage.getItem('_fees'));

            for (var i = 0; i < _fees.length; i++) {
                var btnid = "btn" + i;
                $("#tblItemFees tbody").append(
                   "<tr><td>" + _fees[i].Item + '</td><td>' + _fees[i].Currency + _fees[i].Cost + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteFee(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_fees.length > 0) {
                $("#div-item-list").delay(100).fadeIn(100);
            }
        }
    }
};
function deleteEditFee(value) {
    if (sessionStorage.getItem('e_fees') != null) {
        var _fees = JSON.parse(sessionStorage.getItem('e_fees'));

        if (value > -1) {
            _fees.splice(value, 1);
        }

        sessionStorage.setItem('e_fees', JSON.stringify(_fees));

        $("#tblEditItemFees > tbody > tr:nth-child(n+2)").remove();
        if (sessionStorage.getItem('e_fees') != null) {
            _fees = JSON.parse(sessionStorage.getItem('e_fees'));

            for (var i = 0; i < _fees.length; i++) {
                var btnid = "btn" + i;
                $("#tblEditItemFees tbody").append(
                   "<tr><td>" + _fees[i].item + '</td><td>' + _fees[i].currency + _fees[i].cost + '</td><td class="td-close-file"><button type="button" id = "' + btnid + '" onclick="deleteEditFee(' + i + ');" class="btn btn-link">Remove</button></td></tr>')
            }
            if (_fees.length > 0) {
                $("#div-edit-item-list").delay(100).fadeIn(100);
            }
        }
    }
};
$(document).on('click', '.editClass', function () {
    var btnid = $(this).data('id');
    var e_class = $('#' + btnid).data('key');

    $("#txtClassEditPrefix").val(e_class.prefix);
    $("#txtClassEditNumber").val(e_class._class);
    $('#lblClassEditNumber').html("");
    $('#lblClassEditPrefix').html("");
    $('#btnEditClass').data('key', e_class);
});
$(document).on('click', '.deleteClass', function () {
    var btnid = $(this).data('id');
    var e_class = $('#' + btnid).data('key');
    sessionStorage.setItem('_class', JSON.stringify(e_class));

    $("#lblmoddeleteheader").html("Delete Class");
    $("#hdndeletefromcontrol").val("class");
    $("#lblmoddelete").html("Are you sure you want to delete this Class?");
});
$(document).on('click', '.editTerm', function () {
    var btnid = $(this).data('id');
    var e_term = $('#' + btnid).data('key');

    $("#ddlTermEditItem option").filter(function () {
        return this.text == e_term.term;
    }).attr('selected', true);

    //$("#ddlTermEditItem").val(e_term.suffix);
    $("#txtTermEditSuffix").val(e_term.suffix);
    $("#txtTermEditStart").val(formatDate(e_term.startdate));
    $("#txtTermEditEnds").val(formatDate(e_term.enddate));
    $('#lblTermEditItem').html("");
    $('#lblTermEditSuffix').html("");
    $('#lblTermEditStart').html("");
    $('#lblTermEditEnds').html("");
    $('#btnEditTerm').data('key', e_term);
});
$(document).on('click', '.deleteTerm', function () {
    var btnid = $(this).data('id');
    var e_term = $('#' + btnid).data('key');
    sessionStorage.setItem('_term', JSON.stringify(e_term));

    $("#lblmoddeleteheader").html("Delete Term");
    $("#hdndeletefromcontrol").val("term");
    $("#lblmoddelete").html("Are you sure you want to delete this Term?");
});
