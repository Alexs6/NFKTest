
var app = angular.module('cartApp', ["kendo.directives", 'ng.shims.placeholder', 'ui.mask']);
app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);
app.controller('CartCtrl', function ($scope, $http) {
    $scope.SubmitOrderBtnDisabled = false;
    $scope.orderSuccess = false;
    $scope.OrderComments = "";
    $scope.itemList = [];
    var cartInfo = JSON.parse(localStorage.getItem('Cart'));
    if (cartInfo != null) {
        $scope.itemList = cartInfo.Items;
    }
    $scope.remove = function (index) {
        removeFromCartLocal($scope.itemList[index].FotoId);
        $scope.itemList.splice(index, 1);
        $scope.refreshCart();
    };
    $scope.update = function (index) {
        updateCartLocal($scope.itemList[index].FotoId, $scope.itemList[index].Quantity)
        $scope.refreshCart();

    };
    $scope.changeDM = function () {
        $scope.SelfPickUpPointDataSource.filter(
          {
              "field": "DeliveryMethod",
              "operator": "eq",
              "value": $scope.DeliveryMethod
          });
        $("#SelfPickUpPointId").data("kendoDropDownList").value(null);

    }
    $scope.SelfPickUpPointDataSource = new kendo.data.DataSource({
        //serverFiltering: true,
        transport: {
            read: {
                url: '/LocalOrder/GetSelfPickUpPointList', //specify the URL which should return the records. This is the Read method of the HomeController.
                contentType: "application/json",
                type: "POST"
            }
        }
    });


    $scope.SelfPickUpPointKendoOptions = {
        optionLabel: {
            Name: " ",
            Id: null
        },
        dataSource: $scope.SelfPickUpPointDataSource,
        dataTextField: "Name",
        dataValueField: "Id",
        template: '<span class="#:data.HtmlClass#">#:data.Name#</span>',
        autoBind: false

    };

    $scope.quantityKendoOptions = {
        format: "n0",
        decimals: 0
    }
    $scope.getTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.itemList.length; i++) {
            var product = $scope.itemList[i];
            total += (product.Price * product.Quantity);
        }
        return total;
    };
    $scope.getDeliveryPrice = function () {
        var subTotal = $scope.getTotal();
        if (subTotal > 4000) {
            return 0;
        }
        if ($scope.DeliveryMethod == 'SD') {
            return 250;
        } else if ($scope.DeliveryMethod == 'MPU' || $scope.DeliveryMethod == 'RPU') {
            return 125;
        } 
    };
    $scope.getTotalWithDelivery = function () {
        return $scope.getTotal() + $scope.getDeliveryPrice();
    };


    $scope.trySubmitCart = function (cartForm) {
        $scope.SubmitOrderBtnDisabled = true;
        $http.post($ChekoutUrl, {
            ItemList: $scope.itemList,
            OrderComments: $scope.OrderComments,
            Name: $scope.Name,
            Phone: $scope.Phone,
            Email: $scope.Email,
            DeliveryMethod: $scope.DeliveryMethod,
            DeliveryAddress: $scope.DeliveryAddress,
            SelfPickUpPointId: $scope.SelfPickUpPointId
        })
           .success(function (cartResponse) {
               if (cartResponse.Status == "Error") {
                   toastr.error(cartResponse.Message);
                   $scope.SubmitOrderBtnDisabled = false;
               } else {
                   $scope.orderSuccess = true;
                   localStorage.removeItem('Cart');
                   $scope.refreshCart();
                   yandexMetrikaReachGoal('OrderSent');
               }

           });
    };
    $scope.refreshCart = function () {
        recalcCartLocal();
        refreshCartLocal();
    };
});
var resizeDropDown = function (e) {
    var $dropDown = $(e.sender.element),
        dataWidth = $dropDown.data("kendoDropDownList").list.width(),
        listWidth = dataWidth + 20,
        containerWidth = listWidth + 6;

    // Set widths to the new values
    $dropDown.data("kendoDropDownList").list.width(listWidth);
    $dropDown.closest(".k-widget").width(containerWidth);
}
$(document).on("keydown", "input", function (e) {
    if (e.which == 13) e.preventDefault();
});