//$(function () {
//    var admins = new Bloodhound({
//        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('username'),
//        queryTokenizer: Bloodhound.tokenizers.whitespace,
//        prefetch: {
//            url: baseAddress() + "getallusers",
//            cache: false
//        }
//    });
//    admins.initialize();
//    $('.single-admin-name-tag').tagsinput({
//        itemValue: '_id',
//        itemText: 'username',
//        maxTags: 1,
//        tagClass: 'tags-multi',
//        typeaheadjs: {
//            name: 'admins',
//            displayKey: 'username',
//            source: admins.ttAdapter()
//        }
//    });

//    function baseUrl() {
//        //return "http://35.227.226.230/api/";
//        return "http://localhost:51725/api/";
//    };
//});