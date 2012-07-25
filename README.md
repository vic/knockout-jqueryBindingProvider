Knockout jQuery binding provider.
=================================

A custom binding provider for [Knockout.js](http://knockoutjs.com) that allows you to define bindings using jquery selectors
instead of filling your view elements with complex data-bind attributes.

DEMO: http://vic.github.com/knockout-jqueryBindingProvider


```javascript

  // having a view model like this
  var viewModel = {
    firstName: ko.observable(),
    lastName: ko.observable()
  };
  viewModel.fullName = ko.computed({
    owner: viewModel,
    read: function() {
      return this.firstName() + ' ' + this.lastName();
    }
  });

  // you can bind its properties with
  $('.main').ko(viewModel, {
      'span.full-name': function(vm){
        return { text: vm.fullName };
      },
   
      '.first-name input': function(vm){
        return {
          value: vm.firstName,
          valueUpdate: 'afterkeydown'
        };
      },

      '.last-name input': function(vm){
        return {
          value: vm.lastName,
          valueUpdate: 'afterkeydown'
        };
      }
  });

```


