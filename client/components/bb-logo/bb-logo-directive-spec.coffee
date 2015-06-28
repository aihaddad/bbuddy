describe 'bbLogo', ->

  element = $scope = undefined

  beforeEach inject ($compile, $rootScope) ->
    $scope = $rootScope
    element = angular.element '<div>{{2+2}}</div>'
    element = $compile(element)($rootScope)

  it 'should equal 4', ->
    $scope.$digest()
    expect(element.html()).toBe "4"
