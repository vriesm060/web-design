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
    el: document.querySelector('.qualification > progress')
  };

  var selection = {
    el: document.querySelectorAll('.subjects > input[type="checkbox"]'),
    init: function () {
      var self = this;

      this.el.forEach(function (subject) {
        subject.addEventListener('change', function (e) {
          if (this.checked) {
            self.checkSubjects(this.value);
          } else {
            self.uncheckSubjects(this.value);
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
