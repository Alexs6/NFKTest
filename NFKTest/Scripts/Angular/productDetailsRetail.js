var productDetailsModule = angular.module('productDetailsModule', [])
.controller('productDetailsCtrl', function ($scope) {
    var $fotoListActionUrl = GetFotoListAction;
    var $addToCartUrl = AddToCartAction;
    var $cartSummaryUrl = CartSummaryAction;

});
angular.bootstrap(document, ['productDetailsModule', 'addToCartPreviewModule']);
