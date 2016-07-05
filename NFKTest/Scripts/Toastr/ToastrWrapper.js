toastrCallback = function (jsonResult) {
    if (jsonResult.Status == 'Error') {
        toastr.error(jsonResult.Message);
    } else {
        toastr.success(jsonResult.Message);
    }
};
