
(function () {

  var extras = {
    filter: document.querySelector('.filter'),
    filterBtn: document.querySelector('.btn-filter'),
    sort: document.querySelector('.sort'),
    sortBtn: document.querySelector('.btn-sort'),
    init: function () {
      var self = this;

      this.filterBtn.addEventListener('click', function () {
        self.openOptions(self.filter);
      }, false);

      this.sortBtn.addEventListener('click', function () {
        self.openOptions(self.sort);
      }, false);
    },
    openOptions: function (option) {
      if (option.classList.contains('open')) {
        option.classList.remove('open');
      } else {
        option.classList.add('open');
      }
    }
  };

  extras.init();

}) ();
