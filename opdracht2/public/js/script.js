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
    tooltip: document.querySelector('.qualification .tooltip'),
    percentage: 0,
    points: [0, 0, 0],
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
      this.renderTooltip(this.percentage, false, val);
    },
    addLevel: function (fieldset, value) {
      var reducer = function (arr) {
        return arr.reduce(function (acc, val) {
          return acc + val;
        });
      }

      this.percentage -= reducer(this.points);

      switch (fieldset) {
        case 'html':
          this.points[0] = Number(value);
          break;
        case 'css':
          this.points[1] = Number(value);
          break;
        case 'js':
          this.points[2] = Number(value);
          break;
      }

      this.percentage += reducer(this.points);
      this.renderPercentage(this.percentage);
      this.renderTooltip(this.percentage, true, value);
    },
    renderPercentage: function (perc) {
      this.el.value = perc;

      if (this.el.value >= 18 && this.el.value < 35) {
        this.el.dataset.zone = 'medium';
      } else if (this.el.value >= 35) {
        this.el.dataset.zone = 'save';
      } else {
        this.el.dataset.zone = 'danger';
      }

      if (this.el.value >= 75) {
        this.el.classList.add('full');
      } else {
        this.el.classList.remove('full');
      }
    },
    renderTooltip: function (perc, fieldset = false, val = null) {
      var msg;
      var msgs = [
        'Dit is een goede basis, maar de minor is wel een stuk meer technisch geörienteerd.',
        'Met alleen JavaScript wordt deze minor wel lastig.',
        'Zonder veel technische interesses is deze minor niet zo geschikt.',
        'Technische interesses passen goed bij deze minor, maar basiskennis is ook belangrijk.',
        'Deze minor past helemaal bij jou interesses!'
      ];

      // Add tooltip texts for several cases:
      selection.selected.forEach(function (index, i, self) {
        var reducer = self.reduce(function (acc, val) {
          return acc + val;
        });

        switch (index) {
          case 0:
          case 1:
            if (reducer < 2) {
              msg = msgs[0];
            } else if (perc >= 35) {
              msg = msgs[4];
            }
            break;
          case 2:
            if (self.length == 1) {
              msg = msgs[1];
            } else if (perc >= 35) {
              msg = msgs[4];
            }
            break;
          case 0:
          case 1:
          case 2:
          case 3:
            if (reducer < 7 && self.length >= 3) {
              msg = msgs[3];
            } else if (reducer < 7 && self.length < 3) {
              msg = msgs[2];
            } else if (perc >= 35) {
              msg = msgs[4];
            }
            break;
          case 4:
          case 5:
            if (reducer >= 4 && reducer < 10 && self.length < 3) {
              msg = msgs[2];
            } else if (perc >= 35) {
              msg = msgs[4];
            }
            break;
          case 6:
          case 7:
          case 8:
          case 9:
            if (reducer >= 6 && reducer < 31 && self.length >= 3) {
              msg = msgs[3];
            } else if (reducer >= 6 && reducer < 31 && self.length < 3) {
              msg = msgs[2];
            } else if (perc >= 35) {
              msg = msgs[4];
            }
            break;
          case 10:
          case 11:
            if (reducer >= 10 && reducer < 47 && self.length < 3) {
              msg = msgs[2];
            } else if (perc >= 35) {
              msg = msgs[4];
            }
            break;
        }
      });

      if (fieldset) {
        var points = this.points.reduce(function (acc, val) {
          return acc + val;
        });

        if (points < -5) {
          msg = 'Matig niveau.';
        } else if (points >= -5 && points < 10) {
          msg = 'Oke niveau.';
        } else if (points >= 10 && points < 20) {
          msg = 'Goed niveau.';
        } else {
          msg = 'Uitstekend niveau!';
        }
      }

      if (msg != undefined) {
        this.tooltip.textContent = msg;
        this.tooltip.classList.add('show');

        // Add screenreader info:
        var screenreader = document.createElement('span');
        screenreader.classList.add('screenreader');
        screenreader.textContent = 'Geschikt voor mij? ' + msg;
        console.log(val);
        document.querySelector('input[value="' + val + '"] + label').appendChild(screenreader);
      } else {
        this.tooltip.classList.remove('show');
      }

      var progressbarLength = this.el.offsetWidth - 24;
      var tooltipLength = this.tooltip.offsetHeight;
      var left = 'calc(-5.625rem + ' + Math.round((perc / 75) * progressbarLength) + 'px - (' + tooltipLength + 'px / 2))';
      this.tooltip.style.left = left;

      if (this.el.value >= 75) {
        this.tooltip.style.left = 'calc(-5.625rem + ' + progressbarLength + 'px - (' + tooltipLength + 'px / 2))';
      }
    }
  };

  var selection = {
    el: document.querySelectorAll('.subjects > input[type="checkbox"]'),
    selected: [],
    init: function () {
      var self = this;

      document.querySelector('.subjects .action-button').setAttribute('disabled', true);

      this.el.forEach(function (subject, i) {
        subject.addEventListener('change', function (e) {
          if (this.checked) {
            document.querySelector('.qualification').classList.add('show');
            document.querySelector('.subjects .action-button').removeAttribute('disabled');
            self.checkSubjects(this.value);
            self.selected.push(i);
            progress.calcPercentage(this.value, true);
          } else {
            self.uncheckSubjects(this.value);
            self.selected.splice(self.selected.indexOf(i), 1);
            progress.calcPercentage(this.value, false);

            // Remove screenreader info:
            this.nextElementSibling.removeChild(this.nextElementSibling.children[0]);
          }

          if (progress.el.value == 0) {
            document.querySelector('.subjects .action-button').setAttribute('disabled', true);
            document.querySelector('.qualification').classList.remove('show');
          }
        });
      });

      this.el[0].parentNode.addEventListener('submit', function (e) {
        e.preventDefault();
        document.querySelector('#level').scrollIntoView();
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

  var level = {
    el: document.querySelectorAll('.levels input[type="radio"]'),
    init: function () {
      var self = this;

      this.el.forEach(function (input) {
        input.addEventListener('change', function (e) {
          if (this.checked) {
            progress.addLevel(this.parentNode.name, this.value);
          }
        });
      });

      this.el[0].parentNode.parentNode.addEventListener('submit', function (e) {
        e.preventDefault();
        document.querySelector('#courses').scrollIntoView();
      });
    }
  };

  level.init();

  var sections = {
    el: document.querySelectorAll('.page-section'),
    init: function () {
      var self = this;
      var tops = [];
      var pos = 0;
      var ticking = false;

      this.el.forEach(function (section) {
        var top = section.offsetTop;
        tops.push(top);
      });

      function moveToSection(pos) {
        var closest = tops.reduce(function(prev, curr) {
          return (Math.abs(curr - pos) < Math.abs(prev - pos) ? curr : prev);
        });

        var idx = tops.indexOf(closest);
        var section = self.el[idx];


      }

      window.addEventListener('scroll', function (e) {
        pos = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(function () {
            moveToSection(pos);
            ticking = false;
          });

          ticking = true;
        }
      });
    }
  };

  sections.init();

})();
