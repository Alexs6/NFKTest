var app = angular.module('vendorApp', ["kendo.directives"]);
app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);
app.controller('vendorCtrl', function ($scope, $http) {
    $scope.VendorModel = {};
    $scope.VendorTotalModel = {};

    $scope.VendorDataSource = {
        transport: {
            read: {
                url: '/Vendor/GetVendorList', //specify the URL which should return the records. This is the Read method of the HomeController.
                contentType: "application/json",
                type: "POST" //use HTTP POST request as by default GET is not allowed by ASP.NET MVC
            }
        }
    };
    $scope.vendorChanged = function () {
        if (this.value() && this.selectedIndex == -1) {                 
            toastr.error('Указанный поставщик не найден!');
            $scope.VendorTotalModel = {};
        } else {
            $http.post('/Vendor/GetVendorTotal', {
                vendorId: this.value()
            })
               .success(function (response) {
                   if (response.Status == "Error") {
                       toastr.error(response.Message);
                   } else {
                       $scope.VendorTotalModel = response;
                   }

               });
        }
    };
    $scope.VendorOptions = {
        optionLabel: " ",
        dataSource: $scope.VendorDataSource,
        dataTextField: "Name",
        dataValueField: "Id",
        filter: 'contains',
        placeholder: "Начните вводить ИНН",
        change: $scope.vendorChanged
    };

});

