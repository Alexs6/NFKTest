
document.addEventListener('DOMContentLoaded', function () {
        //localStorage['Cart'] = JSON.stringify(
        //    {
        //        "TotalPrice": 1000,
        //        "TotalQuantity": 423
        //    });
    refreshCartLocal();
}, false);
//var app = angular.module('cartNotAuthApp', []);
//app.config(['$httpProvider', function ($httpProvider) {
//    //initialize get if not there
//    if (!$httpProvider.defaults.headers.get) {
//        $httpProvider.defaults.headers.get = {};
//    }
//    //disable IE ajax request caching
//    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
//}]);
//app.controller('CartNotAuthCtrl', function ($scope, $http) {
//    if (localStorage.getItem('Cart') != null) {
//        $scope.Cart = JSON.parse(localStorage['Cart']);

//    }
//    else {
//        $scope.Cart = {
//            "TotalPrice": 0,
//            "TotalQuantity": 0
//        };
//    }
//    localStorage['Cart'] = JSON.stringify(
//        {
//            "TotalPrice": 1000,
//            "TotalQuantity": 423
//        });

//    //$scope.Cart = 
//    //    {
//    //        "TotalPrice": 1000,
//    //        "TotalQuantity": 2
//    //    };
//    //$scope.invoice = {
//    //    items: [{
//    //        qty: 10,
//    //        description: 'item',
//    //        cost: 9.95
//    //    }]
//    //};

//    $scope.addItem = function () {
//        $scope.Cart.items.push({
//            qty: 1,
//            description: '',
//            cost: 0
//        });
//    },

//    $scope.removeItem = function (index) {
//        $scope.Cart.items.splice(index, 1);
//    },

//    $scope.total = function () {
//        var total = 0;
//        angular.forEach($scope.Cart.items, function (item) {
//            total += item.qty * item.cost;
//        })

//        return total;
//    }

//});

