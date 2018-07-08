'use strict';

(function () {

  var courses = {
    el: document.querySelectorAll('.course'),
    all: [],
    init: function () {
      var self = this;

      this.el.forEach(function (course) {
        self.getCourseSubjects(course);
      });
    },
    getCourseSubjects: function (course) {
      var subjects = course.querySelectorAll('[data-subject]');
      var arr = [];

      subjects.forEach(function (subject) {
        arr.push(subject.dataset.subject);
      });

      var obj = {
        "course": course.dataset.course,
        "subjects": arr
      };

      this.all.push(obj);
    }
  };

  courses.init();

  var progress = {
    el: document.querySelector('.qualification > progress'),
    percentage: 0,
    calcPercentage: function (val, checked) {
      var allSubjects = courses.all.map(function (course) {
        return course.subjects;
      });

      allSubjects = allSubjects.concat.apply([], allSubjects);

      var selectedSubjects = allSubjects.filter(function (subject) {
        return subject == val;
      });

      // matched subjects

      var totalSubjects = allSubjects.length;
      var numOfSubjects = selectedSubjects.length;
      var percentage = Math.round((numOfSubjects / totalSubjects) * 100);

      if (checked) {
        this.percentage += percentage;
      } else {
        this.percentage -= percentage;
      }

      this.renderPercentage(this.percentage);
    },
    renderPercentage: function (perc) {
      this.el.value = perc;

      if (this.el.value >= 20 && this.el.value < 43) {
        this.el.dataset.zone = 'medium';
      } else if (this.el.value >= 43) {
        this.el.dataset.zone = 'save';
      } else {
        this.el.dataset.zone = 'danger';
      }
    }
  };

  var selection = {
    el: document.querySelectorAll('.subjects > input[type="checkbox"]'),
    init: function () {
      var self = this;

      document.querySelector('.subjects .action-button').setAttribute('disabled', true);

      this.el.forEach(function (subject) {
        subject.addEventListener('change', function (e) {
          if (this.checked) {
            document.querySelector('.qualification').classList.add('show');
            document.querySelector('.subjects .action-button').removeAttribute('disabled');
            self.checkSubjects(this.value);
            progress.calcPercentage(this.value, true);
          } else {
            self.uncheckSubjects(this.value);
            progress.calcPercentage(this.value, false);
          }

          if (progress.el.value == 0) {
            document.querySelector('.subjects .action-button').setAttribute('disabled', true);
            document.querySelector('.qualification').classList.remove('show');
          }
        });
      });
    },
    checkSubjects: function (val) {
      var checkedSubjects = document.querySelectorAll('[data-subject="' + val + '"]');
      checkedSubjects.forEach(function (subject) {
        subject.classList.add('checked');
      });
    },
    uncheckSubjects: function (val) {
      var checkedSubjects = document.querySelectorAll('[data-subject="' + val + '"]');
      checkedSubjects.forEach(function (subject) {
        subject.classList.remove('checked');
      });
    }
  };

  selection.init();

})();
