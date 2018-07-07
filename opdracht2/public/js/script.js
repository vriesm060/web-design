'use strict';

(function () {

  var courses = {
    el: document.querySelectorAll('.course'),
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

      return {
        "course": course.dataset.course,
        "subjects": arr
      };
    }
  };

  courses.init();

})();
