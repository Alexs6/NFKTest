var app = angular.module('CompanyInfoApp', ["kendo.directives", 'ng.shims.placeholder']);
app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);
app.controller('CompanyInfoCtrl', function ($scope, $http, repo) {
    $scope.CompanyInfo = {};
    $scope.TransportCompanyDataSource = {
        transport: {
            read: {
                url: '/TransportCompany/Read', //specify the URL which should return the records. This is the Read method of the HomeController.
                contentType: "application/json",
                type: "POST" //use HTTP POST request as by default GET is not allowed by ASP.NET MVC
            }
        }
    };
    $scope.TransportCompanyOptions = {
        optionLabel: " ",
        dataSource: $scope.TransportCompanyDataSource,
        dataTextField: "Name",
        dataValueField: "Name"
    };
    repo.get().then(function (companyInfoData) {
        $scope.CompanyInfo = companyInfoData;
    });
    $scope.ActivityTypeDataSource = [" ", "Розничная торговля", "Интернет-магазин", "Оптовая торговля", "Другое"];
 
    $scope.editCompanyInfo = function (CompanyInfoForm) {
        $http.post($EditCompanyInfoAjaxUrl, $scope.CompanyInfo)
                  .success(function (companyInfoEditResponse) {
                      if (companyInfoEditResponse.Status == "Error") {
                          toastr.error(companyInfoEditResponse.Message);
                      } else {
                          switch ($fromAction) {
                              case "Personal":
                                  window.location.href = '/Account/Personal';
                                  break;
                              case "UserTable":
                                  window.location.href = '/User/Index';
                                  break;
                              default:
                                  window.location.href = '/Account/Personal';
                                  break;
                          }
                      }
                  });
    };
});
app.factory('repo', function ($http, $q) {
    return {
        get: function () {
            var deferred = $q.defer();
            $http.get($GetCompanyInfoModelUrl, {
                params: { name: $UserName }
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
    }
});