function resizeIframe(obj) {
  obj.style.height =
    obj.contentWindow.document.documentElement.scrollHeight + "px";
}

var app = angular.module("cqWed", []);
app.controller("cqCtrl", function ($scope) {
  $scope.langTexts = langTexts;
  $scope.lang = [
    {
      id: 1,
      text: "VI",
    },
    { id: 2, text: "EN" },
  ];
  $scope.selectedLang = $scope.lang[0];
  console.log(langTexts[$scope.selectedLang.text].sections.home);
});
