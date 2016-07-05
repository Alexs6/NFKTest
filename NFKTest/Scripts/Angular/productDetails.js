angular.module('productDetailsModule', ["kendo.directives"])
.config(['$httpProvider', function ($httpProvider) {
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }])
.controller('productDetailsCtrl', function ($scope, $http) {
    var $fotoListActionUrl = GetFotoListAction;
    var $addToCartUrl = AddToCartAction;
    var $cartSummaryUrl = CartSummaryAction;
    //$scope.fotoDataSource = {
    //    transport: {
    //        read: {
    //            dataType: "json",
    //            url: $fotoListActionUrl
    //        }
    //    }
    //};
    $scope.quantityKendoOptions = {
        format: "n0",
        decimals: 0
    }
    //$scope.fotoKendoOpitons = {
    //    dataSource: $scope.fotoDataSource,
    //    dataTextField: "FotoName",
    //    dataValueField: "FotoID",
    //    template: '#:FotoName# (#:Quantity#)'
    //}


    //$scope.addToCart = function () {
    //    $http({ method: 'POST', url: $addToCartUrl + "/" + $scope.fotoDrop })
    //    .success(function (data, status, headers, config) {

    //        if (data.Status == "Error") {
    //            toastr.error(data.Message);
    //        } else {
    //            //toastr.options.positionClass = "toast-bottom-right";
    //            toastr.success(data.Message);
    //            $http({ method: 'GET', url: $cartSummaryUrl }).success(function (data2) {
    //                $('#cart-div').html(data2);
    //            });
    //        }
    //    })
    //}
    $scope.addToCart = function ($index, $fotoID) {
        var quantity = $scope.Quantity[$index]
        $http({
            method: 'POST',
            cache: false,
            url: $addToCartUrl,
            data: { "id": $fotoID, "quantity": quantity }
        })
        .success(function (data, status, headers, config) {

            if (data.Status == "Error") {
                toastr.error(data.Message);
            } else {
                //toastr.options.positionClass = "toast-bottom-right";
                toastr.success(data.Message);

                $http({ method: 'GET', cache: false, url: $cartSummaryUrl }).success(function (data2) {
                    $('.cart-div').html(data2);
                });
            }
        });
    }
});