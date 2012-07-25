;(function($, ko, undefined){

  var viewModel = {
    firstName: ko.observable(),
    lastName: ko.observable(),

    resetNames: function() {
      this.firstName('Planet');
      this.lastName('Earth');
    }
  };

  viewModel.resetNames();

  viewModel.fullName = ko.computed({
    owner: viewModel,
    read: function() {
      return this.firstName() + ' ' + this.lastName();
    }
  });

  $(function() {

    $('input').on('focusin', function(event) {
      $(this).val('').trigger('change');
    });

    $('.main').ko(viewModel, {

      'h1': function(vm){
        return {
          css: {
            hasFirst: vm.firstName() !== '',
            hasLast: vm.lastName() !== ''
          }
        };
      },

      'span.full-name': function(vm){
        return { text: vm.fullName };
      },

      '.first-name input': function(vm){
        return {
          value: vm.firstName,
          valueUpdate: 'afterkeydown'
        };
      },

      '.first-name.control-group': function(vm) {
        return {
          css: {
            error: vm.firstName().trim() === ''
          }
        }
      },

      '.last-name input': function(vm){
        return {
          value: vm.lastName,
          valueUpdate: 'afterkeydown'
        };
      },

      '.last-name.control-group': function(vm) {
        return {
          css: {
            warning: vm.lastName().trim() === ''
          }
        }
      },

      'a[href="#reset"]': function(vm) {
        return {
          click: vm.resetNames
        };
      }
    });

  });


})(jQuery, ko);
