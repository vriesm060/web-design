
(function () {

  var extras = {
    extras: document.querySelector('.extras'),
    filter: document.querySelector('.filter'),
    filterBtn: document.querySelector('.btn-filter'),
    sort: document.querySelector('.sort'),
    sortBtn: document.querySelector('.btn-sort'),
    options: document.querySelectorAll('.options'),
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

      this.options.forEach(function (item) {
        if (item !== option) {
          item.classList.remove('open');
        }
      });

      if (option.classList.contains('open') && this.extras.classList.contains('open')) {
        option.classList.remove('open');
        this.extras.classList.remove('open');
      } else if (this.extras.classList.contains('open')) {
        option.classList.add('open');
      } else {
        option.classList.add('open');
        this.extras.classList.add('open');
      }

    }
  };

  extras.init();

}) ();
