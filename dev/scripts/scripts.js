// scripts.js

// ============================================================================
// PAVE: Global
// ============================================================================

var PAVE = PAVE || {};
    PAVE.Home = {};
    PAVE.Global = {};
    PAVE.App = {};
    PAVE.Secondary = {};

// ============================================================================
// PAVE: Init
// ============================================================================
$(document).ready(function(){

  new PAVE.Global.MobileMenu();

  if ( $('.page-home').length ) {
    new PAVE.App.FormHelpers();
    new PAVE.Home.StickyNav();
  }

  if ( $('.page-about').length ) {
    new PAVE.Secondary.AboutTopNavBar();
  }

  if ( $('.page-application').length ) {
    new PAVE.App.FieldActive();
    new PAVE.App.SchoolBlock();
    new PAVE.App.WorkBlock();
    new PAVE.App.CollegeRadioInputs();
    new PAVE.App.SchoolBlockSave();
    new PAVE.App.SchoolBlockDuplication();
    new PAVE.App.WorkBlockSave();
    new PAVE.App.WorkBlockDuplication();
    new PAVE.App.FormHelpers();
    new PAVE.App.FinalSteps();
    new PAVE.App.LoanTermsSelection();
  }

  if ( $('.page-application').length && !$('.page-sidebar').hasClass('no-stick') ) {
    new PAVE.App.SidebarStick();
  }

  if ( $('.page-settings').length ) {
    new PAVE.App.SidebarStick();
  }

  if ( $('.page-support').length ) {
    new PAVE.Secondary.SupportSidebarLinkList();
    new PAVE.Secondary.SidebarSticky();
    new PAVE.Secondary.SidebarLinkListClicks();
    new PAVE.Secondary.MobileSecondaryNavLinkClicksSupport();
  }

  if ( $('.range-slider').length ) {
    new PAVE.App.RangeSlider();
  }

  if ( $('.page-secondary').length ) {
    new PAVE.Secondary.TopNavBar();
  }

  if ( $('.page-careers').length ) {
    new PAVE.Secondary.CareersSidebarLinkList();
    new PAVE.Secondary.SidebarSticky();
    new PAVE.Secondary.SidebarLinkListClicks();
    new PAVE.Secondary.MobileSecondaryNavLinkClicksCareers();
  }

  if ( $('.page-legal').length ) {
    new PAVE.Secondary.LegalNav();
  }

  if ( $('.page-flow-7').length ) {
    new PAVE.App.UploadBlockEditing();
  }

});

$(window).load(function() {
  new showtimeClass();

  if ( $('.page-home').length ) {
    new PAVE.Home.TestimonialSlider();
    new PAVE.Home.QuoteSlider();
  }
});

// ============================================================================
// PAVE: Init
// ============================================================================
function showtimeClass() {
  $('body').addClass('showtime');
}

// Add Commas to Number
function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

// ============================================================================
// PAVE: Global
// ============================================================================
PAVE.Global.MobileMenu = function() {
  var mobileMenuTrigger = $('.mobile-menu-trigger'),
      mobileMenuOverlay = $('.mobile-menu-overlay'),
      mobileMenuClose = $('.mobile-menu-close-x');

  function resizeMobileMenuOverlay(curWindowHeight) {
    $(mobileMenuOverlay).css('height', curWindowHeight);
  }

  function toggleMobileMenu() {
    $('body').toggleClass('mobile-menu-open');
  }

  $(mobileMenuTrigger).on('click', function(evt) {
    evt.preventDefault();

    var mobileMenuHeight = $(window).height();
    toggleMobileMenu();
    resizeMobileMenuOverlay(mobileMenuHeight);
  });

  $(mobileMenuClose).on('click', function() {
    toggleMobileMenu();
  });

  $(window).on('resize', function() {
    var mobileMenuHeight = $(window).height();

    resizeMobileMenuOverlay(mobileMenuHeight);
  });
};

PAVE.Home.StickyNav = function() {
  function checkWindowWidth() {
    if ( $(window).width() >= 1010 ) {
      stuckOffsetOne = -70;
      stuckOffsetTwo = -65;
    } else if ( $(window).width() >= 641 && $(window).width() <= 1009 ) {
      stuckOffsetOne = -40;
      stuckOffsetTwo = -50;
    } else {
      stuckOffsetOne = -154;
      stuckOffsetTwo = -162;
    }

    return stuckOffsetOne;
    return stuckOffsetTwo;
  }

  checkWindowWidth();

  $(window).on('resize', function() {
    checkWindowWidth();
  });

  var waypointStickyNav = new Waypoint({
    element: document.getElementById('sticky-nav-trigger'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.main-header').addClass('stuck');
        $('.hero-main').addClass('nav-stuck');
        $('.inner-header').addClass('stuck');
      } else if ( direction === "up" ) {
        $('.main-header').removeClass('stuck');
        $('.hero-main').removeClass('nav-stuck');
        $('.inner-header').removeClass('stuck');
      }
    },
  });

  var waypointStickyNavFadeIn = new Waypoint({
    element: document.getElementById('sticky-nav-trigger'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.inner-header').addClass('visible');
      } else if ( direction === "up" ) {
        $('.inner-header').removeClass('visible');
      }
    },
    offset: stuckOffsetOne
  });

  var waypointHomeSectionFade = new Waypoint({
    element: document.getElementById('sticky-nav-trigger'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.home-hero-values-wrapper').addClass('stuck');
      } else if ( direction === "up" ) {
        $('.home-hero-values-wrapper').removeClass('stuck');
      }
    },
    offset: stuckOffsetTwo
  });

};

PAVE.Secondary.AboutTopNavBar = function() {
  var waypointAboutTopBarHide = new Waypoint({
    element: $('#about-nav-trigger'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.main-header').addClass('hidden');
        $('.hero-main').addClass('nav-stuck');
        $('.inner-header').addClass('hidden');

        if ( $(window).width() >= 641 ) {
          $('.inner-header').fadeOut(0);
        }
      } else if ( direction === "up" ) {
        $('.main-header').removeClass('hidden');
        $('.hero-main').removeClass('nav-stuck');
        $('.inner-header').removeClass('hidden');

        if ( $(window).width() >= 641 ) {
          $('.inner-header').fadeIn(0);
        }
      }
    },
    offset: 100
  });

  var waypointAboutTopBarShow = new Waypoint({
    element: $('#about-nav-trigger'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.main-header').addClass('stuck');
        $('.inner-header').delay(200).fadeIn(350);
      } else if ( direction === "up" ) {
        $('.main-header').removeClass('stuck');

        if ( $(window).width() >= 641 ) {
          $('.inner-header').fadeOut(0);
        }
      }
    },
    offset: 70
  });

  // mobile sticky nav
  var waypointAboutTopBar = new Waypoint({
    element: $('#js-mobile-sticky-header'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.main-header').addClass('sticky');
      } else if ( direction === "up" ) {
        $('.main-header').removeClass('sticky');
      }
    },
    offset: -40
  });

};

// ============================================================================
// PAVE: Home
// ============================================================================
PAVE.Home.TestimonialSlider = function() {
  $('.testimonial-slider').flexslider({
    directionNav: false,
    controlNav: true,
    slideshow: false,
    animation: "slide",
    touch: true,
    itemWidth: 275,
    itemMargin: 30,
  });
};

PAVE.Home.QuoteSlider = function() {
  $('.quote-slider').flexslider({
    directionNav: false,
    controlNav: true,
    slideshow: false
  });

  $('.proof-slide').on('mouseover', function () {
    var targetSlide = $(this).data('slide-number');

    $('.proof-slide').removeClass('active');
    $(this).addClass('active');
    $('.quote-slider').flexslider(targetSlide);
  }).on('click', function () {
    var targetSlide = $(this).data('slide-number');

    $('.proof-slide').removeClass('active');
    $(this).addClass('active');
    $('.quote-slider').flexslider(targetSlide);
  });

  $('.flex-control-nav li').on('mouseover', function () {
    var targetLink = parseInt($(this).text(), 10);
        targetSlide = targetLink - 1;

    $('.proof-slide').removeClass('active');
    $('.proof-slide-' + targetLink).addClass('active');
    $('.quote-slider').flexslider(targetSlide);
  }).on('click', function () {
    var targetSlide = $(this).data('slide-number');

    $('.proof-slide').removeClass('active');
    $('.proof-slide-' + targetLink).addClass('active');
    $('.quote-slider').flexslider(targetSlide);
  });

};

// ============================================================================
// PAVE: Secondary Pages
// ============================================================================
PAVE.Secondary.SupportSidebarLinkList = function() {
  activateSectionLink = function(curSection) {
    $('.secondary-nav-item').removeClass('active');
    curLink = $('[data-section-title="' + curSection + '"]');
    $(curLink).addClass('active');
  };

  var waypointAbout = new Waypoint({
    element: document.getElementById('page-secondary'),
    handler: function(direction) {
      activateSectionLink(this.element.id);
    },
    offset: '-13%'
  });

  $('#applying').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('applying');
    }
  }, {
    offset: '12%'
  });

  $('#applying').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('applying');
    }
  }, {
    offset: '9%'
  });

  $('#onboarding').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('onboarding');
    }
  }, {
    offset: '12%'
  });

  $('#onboarding').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('onboarding');
    }
  }, {
    offset: '9%'
  });

  $('#payments').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('payments');
    }
  }, {
    offset: '12%'
  });

  $('#payments').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('payments');
    }
  }, {
    offset: '9%'
  });

  $('#investing').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('investing');
    }
  }, {
    offset: '12%'
  });

  $('#investing').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('investing');
    }
  }, {
    offset: '9%'
  });

  $('#security').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('security');
    }
  }, {
    offset: '12%'
  });

  $('#security').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('security');
    }
  }, {
    offset: '9%'
  });

  $('#other').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('other');
    }
  }, {
    offset: '20%'
  });

  $('#other').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('other');
    }
  }, {
    offset: '9%'
  });

  var waypointInvesting = new Waypoint({
    element: document.getElementById('other'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.secondary-nav').removeClass('stuck');
      } else if ( direction === "up" ) {
        $('.secondary-nav').addClass('stuck');
      }
    },
    offset: '-4%'
  });
};

PAVE.Secondary.CareersSidebarLinkList = function() {
  activateSectionLink = function(curSection) {
    $('.secondary-nav-item').removeClass('active');
    curLink = $('[data-section-title="' + curSection + '"]');
    $(curLink).addClass('active');
  };

  var waypointCareerOne = new Waypoint({
    element: document.getElementById('page-secondary'),
    handler: function(direction) {
      activateSectionLink(this.element.id);
    },
    offset: '-13%'
  });

  $('#careers-engineering').waypoint(function(direction) {
    if (direction === 'down') {
      activateSectionLink('careers-engineering');
    }
  }, {
    offset: '12%'
  });

  $('#careers-engineering').waypoint(function(direction) {
    if (direction === 'up') {
      activateSectionLink('page-secondary');
    }
  }, {
    offset: '30%'
  });

  $('#secondary-cta-alt').waypoint(function(direction) {
    if (direction === 'down') {
      $('.secondary-nav').removeClass('stuck');
    }
  }, {
    offset: '30%'
  });

  $('#secondary-cta-alt').waypoint(function(direction) {
    if (direction === 'up') {
      $('.secondary-nav').addClass('stuck');
    }
  }, {
    offset: '40%'
  });
};

PAVE.Secondary.SidebarLinkListClicks = function() {
  $('.secondary-nav-item').on('click', function(evt) {
    evt.preventDefault();

    var target = $(this).data('section-title'),
        targetSection = $('#' + target);

    if ( $('.page-support').length ) {
      var extraPadding = 110;
    } else if ( $('.page-careers').length ) {
      var extraPadding = 110;
    }

    if ( target = '#page-secondary' ) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - extraPadding
      }, 1000);
    } else if ( targetSection.length ) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - extraPadding
      }, 1000);
    }
  });
};

PAVE.Secondary.MobileSecondaryNavLinkClicksCareers = function() {
  $('.mobile-secondary-nav-item').on('click', function(evt) {
    evt.preventDefault();

    var target = $(this).data('section-title'),
        targetSection = $('#' + target);

    if ( $(window).width() <= 640 ) {
      designPadding = 56;
      careerPadding = 72;
    } else {
      designPadding = 75;
      careerPadding = 94;
    }

    if ( target == 'careers-design' ) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - designPadding
      }, 1000);
    } else if ( targetSection.length ) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - careerPadding
      }, 1000);
      console.log(careerPadding);
    }
  });
};

PAVE.Secondary.MobileSecondaryNavLinkClicksSupport = function() {
  $('.mobile-secondary-nav-item').on('click', function(evt) {
    evt.preventDefault();

    var target = $(this).data('section-title'),
        targetSection = $('#' + target);

    if ( target == 'about' ) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 42
      }, 1000);
      console.log('56');
    } else {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 72
      }, 1000);
      console.log('100');
    }
  });
};

PAVE.Secondary.SidebarSticky = function() {
  var waypointSidebar = new Waypoint({
    element: $('#page-secondary'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.secondary-nav').addClass('stuck');
      } else if ( direction === "up" ) {
        $('.secondary-nav').removeClass('stuck');
      }
    },
    offset: -400
  });
};

PAVE.Secondary.TopNavBar = function() {
  var waypointTopBarHide = new Waypoint({
    element: $('#page-secondary'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.secondary-header').addClass('hide');
        $('.inner-header').fadeOut(0);
        $('.secondary-hero-mobile').addClass('padding');
      } else if ( direction === "up" ) {
        $('.secondary-header').removeClass('hide');
        $('.inner-header').fadeIn(0);
        $('.secondary-hero-mobile').removeClass('padding');
      }
    },
    offset: -112
  });

  var waypointTopBarShow = new Waypoint({
    element: $('#page-secondary'),
    handler: function(direction) {
      if ( direction === "down" ) {
        $('.secondary-header').addClass('stuck');
        $('.inner-header').delay(200).fadeIn(350);
      } else if ( direction === "up" ) {
        $('.secondary-header').removeClass('stuck');
        // $('.inner-header').fadeOut(0);
      }
    },
    offset: -400
  });
};

PAVE.Secondary.LegalNav = function() {
  $('.legal-nav-item').on('click', function(event) {
    var target = $(this).data('section-title'),
        targetSection = $('#' + target);

    if ( $(window).width() <= 640 ) {
      if ( targetSection.length ) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: targetSection.offset().top - 80
        }, 1000);
      }
    } else {
      if ( targetSection.length ) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: targetSection.offset().top - 110
        }, 1000);
      }
    }
  });
};

// ============================================================================
// PAVE: Application Flow
// ============================================================================

PAVE.App.SidebarStick = function() {
  var sidebar = $('.sidebar-inner'),
      stickyTop = $('.page-main').offset().top,
      headerHeight = $('.inner-header').height(),
      extraTopPadding = 50,
      topPadding = headerHeight + extraTopPadding,
      sidebarWidth = $('.sidebar-inner').outerWidth(),
      windowWidth = $(window).width();

  $(window).resize(function() {
    windowWidth = $(window).width();
    stickyTop = $('.page-main').offset().top;
  });

  // if window is < 642 && user is scrolled down a bit
  if ( $(window).width() <= 641 ) {
    topPadding = 110;
  } else {
    topPadding = headerHeight + extraTopPadding;
  }

  $(window).scroll(function() {
    var windowTop = $(window).scrollTop() + headerHeight + extraTopPadding,
        sidebarWidth = $('.sidebar-inner').outerWidth();

    if ( stickyTop < windowTop ) {
      $(sidebar).css({ position: 'fixed', top: topPadding });
      $(sidebar).css('width', sidebarWidth);
    } else {
      $(sidebar).css('position', 'static');

      if ( windowWidth <= 1010 ) {
        sidebar.addClass('medium');
      } else {
        sidebar.addClass('large');
      }
    }
  });
};

// Add Class to Active Inputs
PAVE.App.FieldActive = function() {
  $(".form-input").focus(function(){
    $(this).parent().addClass('active');
  }).blur(function(){
    $(this).parent().removeClass('active');
  });
};

PAVE.App.LoanTermsSelection = function() {
  if ( $('.loan-terms-option').hasClass('selected') ) {
    $('.loan-terms-option.selected').find('.terms-col-btn').html('Selected');
  }

  $('.loan-terms-option').on('click', function() {
    if ( $(this).hasClass('selected') ) {
      // do nothing
    } else {
      $('.loan-terms-option').removeClass('selected');
      $('.loan-terms-option').find('input[type="checkbox"]').prop( "checked", false );
      // activate section visually
      $(this).addClass('selected');
      // check hidden input
      $(this).find('input[type="checkbox"]').prop( "checked", true );
    };
  });

  $('#loan-terms-opt-1').on('click', function() {
    if ( $(this).find('.terms-col-btn').html() == 'Selected') {
      // do nothing
    } else {
      $(this).find('.terms-col-btn').html("Selected");
      $('#loan-terms-opt-2').find('.terms-col-btn').html("Select 3 years");
    }
  });

  $('#loan-terms-opt-2').on('click', function() {
    if ( $(this).find('.terms-col-btn').html() == 'Selected') {
      // do nothing
    } else {
      $(this).find('.terms-col-btn').html("Selected");
      $('#loan-terms-opt-1').find('.terms-col-btn').html("Select 2 years");
    }
  });
};

PAVE.App.FinalSteps = function() {
  showStepsContent = function(stepsType) {
    if ( $('.steps-content[data-toggle=' + stepsType + ']').hasClass('toggled') ) {
      // do nothing
    } else {
      $('.steps-content').removeClass('toggled');
      $('.steps-content[data-toggle=' + stepsType + ']').addClass('toggled');
    }
  };

  toggleStepsButton = function(stepsToggle) {
    if ( $(stepsToggle).hasClass('toggled') ) {
      // do nothing
    } else {
      $('.steps-toggle').removeClass('toggled');
      $(stepsToggle).addClass('toggled');
    }
  };

  $(document).on('click', '.steps-toggle', function(evt) {
    evt.preventDefault();
    var stepsType = $(this).data('toggle');

    toggleStepsButton( $(this) );
    showStepsContent( $(this).data('toggle') );

  });
};

PAVE.App.FormHelpers = function() {
  $('.form-input-ssn').mask('000-00-0000');
  $('.form-input-currency').mask('000,000,000', {reverse: true});
  $('.form-input-tele').mask('(000) 000-0000');

  $("select").change(function() {
    $(this).addClass('checked');
  });

  $('[data-toggle="tooltip"]').tooltip();
};

// Range Slider UI
PAVE.App.RangeSlider = function() {
  var $element = $('#bonusFunds');
  var $handle;

  $element
    .rangeslider({
      polyfill: false,
      onInit: function() {
        $handle = $('.rangeslider__handle', this.$range);
        updateHandle($handle[0], "$" + addCommas(this.value));
        $('.range-slider').addClass('loaded');
      }
    })
    .on('input', function() {
      updateHandle($handle[0], "$" + addCommas(this.value));
    });

  function updateHandle(el, val) {
    el.textContent = val;
  }
}

// -------------------------------------------------
// School Block
// -------------------------------------------------
showAddSchoolButton = function() {
  $('#add-another-school').addClass('visible');
}

hideAddSchoolButton = function() {
  $('#add-another-school').removeClass('visible');
}

clearSchoolForm = function(clearElem) {
  // reset values in saved block clone
  clearElem.find('.form-block-title').text('');
  clearElem.find('.form-block-details').text('');
}

PAVE.App.SchoolBlock = function() {
  var schoolBlock = $('.form-content-block.school'),
      schoolBlockEdit = $('.form-block-edit.school'),
      schoolBlockDelete = $('.form-block-delete.school');

  // edit form
  $(document).on('click', '.form-block-edit.school', function(evt) {
    evt.preventDefault();

    var curBlock = $(this).data('school-block');

    $(this).closest('.form-content-block').addClass('hidden');
    $(this).closest('.school-block').find('.edit-cancel').removeClass('hidden');
    $(this).closest('.school-block').find('.form-school-block').addClass('editing');
  });

  // cancel editing form
  $(document).on('click', '.edit-cancel', function(evt) {
    evt.preventDefault();

    $(this).closest('.school-block').find('.form-content-block').removeClass('hidden');
    $(this).closest('.school-block').find('.form-school-block').removeClass('editing');
  })

  // cancel edit
  $(document).on('click', '.btn-cancel', function(evt) {
    evt.preventDefault();

    var curBlock = $(this).data('school-block');
    $('#school-block-' + curBlock).removeClass('editing');

    $('.form-content-block.school[data-school-block=' + curBlock + ']').removeClass('hidden');
  });

  // delete form toggle
  $(document).on('click', '.form-block-delete.school', function(evt) {
    evt.preventDefault();

    $(this).parent('.form-block-buttons').addClass('hidden');
    $(this).parent('.form-block-buttons').siblings('.delete-block').removeClass('hidden');
  });

  // delete form
  $(document).on('click', '.delete-yes', function(evt) {
    evt.preventDefault();

    $(this).closest('.delete-block').addClass('hidden');
    $(this).closest('.form-content-block').addClass('hidden');
    $(this).closest('.form-content-block').find('.form-block-buttons').removeClass('hidden');

    var curBlock = $(this).data('school-block'),
        curSchoolBlock = $('#schoolEntry' + curBlock),
        curSchoolBlockTitles = curSchoolBlock.find('.form-content-block');

    // if only 1 school block, dont delete, just clear
    if ( $('.school-block').length == 1 ) {
      clearSchoolForm(curSchoolBlockTitles);
      curSchoolBlock.trigger('reset');
    } else {
      curSchoolBlock.remove();
    }

  });

  // delete NO option
  $(document).on('click', '.delete-no', function(evt) {
    evt.preventDefault();

    $(this).closest('.delete-block').addClass('hidden');
    $(this).closest('.delete-block').siblings('.form-block-buttons').removeClass('hidden');
  });

  // submit section
  $(document).on('click', '.btn-submit-section', function(evt) {
    evt.preventDefault();

    var curBlock = $(this).data('school-block');

    if ( $(this).hasClass('is-disabled') ) {
      // do nothing
    } else {
      $(this).closest('.school-block').find('.form-content-block').removeClass('hidden');
      $(this).closest('.school-block').find('.form-school-block').removeClass('editing');
    }
  });
}

PAVE.App.CollegeRadioInputs = function() {
  $('input[name="college"]').bind('change',function(){
    var showOrHide = ($(this).val() == 'attendedCollegeYes') ? true : false;

    if ( showOrHide = true ) {
      $('.school-wrapper').toggleClass('hidden');
    }
  });
}

PAVE.App.SchoolBlockSave = function() {
  $(document).on('click', '.btn-submit-section', function() {
    var schoolBlock = $(this).closest('.school-block'),
        schoolTitle = $(schoolBlock).find('input.input_school').val(),
        schoolDegree = $(schoolBlock).find('select.select_degree').val(),
        schoolField = $(schoolBlock).find('select.select_study').val();

    // TODO combine actions??
    // set values in saved block
    $(this).closest('.form-content-block').find(':input').each(function() {
      if(!$(this).val()){
        return false;
      }
    });

    if ( $(this).hasClass('is-disabled') ) {
      // do nothing
    } else {
      schoolBlock.find('.form-block-title').text(schoolTitle);
      schoolBlock.find('.form-block-details').text(schoolDegree + ', ' + schoolField);
      schoolBlock.find('.form-content-block').addClass('saved');
      schoolBlock.find('.form-content-block').removeClass('hidden');
      schoolBlock.find('.form-school-block').addClass('saved');
      schoolBlock.find('.form-school-block').removeClass('editing');

      $(this).closest('.school-wrapper').siblings('#add-another-school').addClass('visible');
    }
  });
};

PAVE.App.SchoolBlockDuplication = function() {
  $('#btnAdd').click(function (evt) {

    var num     = $('.school-block').length,
        newNum  = new Number(num + 1),
        newNumber  = new Number(num + 1),
        newElem = $('#schoolEntry' + num).clone().attr('id', 'schoolEntry' + newNum);

    if ( $('#schoolEntry' + newNum).length ) {
      var firstNum = $('.school-block:first').attr('id').replace('schoolEntry', '');
      var lastNum = new Number( $('.school-block:last').attr('id').replace('schoolEntry', ''));
      var newNum = new Number(lastNum + 1);
      var newElem = $('#schoolEntry' + firstNum).clone().attr('id', 'schoolEntry' + newNum);
    }

    hideAddSchoolButton();

    newElem.find('.form-content-block').attr('id', 'schoolSavedEntry' + newNum);
    newElem.find('.form-content-block').data('school-block', newNum);
    newElem.find('.form-block-edit').data('school-block', newNum);
    newElem.find('.form-block-delete').data('school-block', newNum);
    newElem.find('.delete-yes').data('school-block', newNum);

    // reset values in saved block clone
    newElem.find('.form-block-title').text('');
    newElem.find('.form-block-details').text('');

    // Area of Study - select
    newElem.find('.label_study').attr('for', 'ID' + newNum + '_areaOfStudy');
    newElem.find('.select_study').attr('id', 'ID' + newNum + '_areaOfStudy').attr('name', 'ID' + newNum + '_areaOfStudy').val('');

    // Degree - select
    newElem.find('.label_degree').attr('for', 'ID' + newNum + '_degree');
    newElem.find('.select_degree').attr('id', 'ID' + newNum + '_degree').attr('name', 'ID' + newNum + '_degree').val('');

    // Enrollment Status - select
    newElem.find('.label_status').attr('for', 'ID' + newNum + '_status');
    newElem.find('.select_status').attr('id', 'ID' + newNum + '_status').attr('name', 'ID' + newNum + '_status').val('');

    // Graduation Date - select
    newElem.find('.label_grad').attr('for', 'ID' + newNum + '_grad');
    newElem.find('.select_grad').attr('id', 'ID' + newNum + '_grad').attr('name', 'ID' + newNum + '_grad').val('');

    // School - text
    newElem.find('.label_school').attr('for', 'ID' + newNum + '_school');
    newElem.find('.input_school').attr('id', 'ID' + newNum + '_school').attr('name', 'ID' + newNum + '_school').val('');

    // Insert the new element after the last "duplicatable" input field
    $(newElem).find('.form-content-block').removeClass('saved');
    $(newElem).find('.form-school-block').removeClass('saved');
    $('.school-wrapper').append(newElem);
  });

  // Enable the "add" button
  $('#btnAdd').attr('disabled', false);
}

// -------------------------------------------------
// Work Block
// -------------------------------------------------
showAddWorkButton = function() {
  $('#add-another-work').addClass('visible');
}

hideAddWorkButton = function() {
  $('#add-another-work').removeClass('visible');
}

clearWorkForm = function(clearElem) {
  // reset values in saved block clone
  clearElem.find('.form-block-title').text('');
  clearElem.find('.form-block-details').text('');
}

PAVE.App.WorkBlock = function() {
  var workBlock = $('.form-content-block.work'),
      workBlockEdit = $('.form-block-edit.work'),
      workBlockDelete = $('.form-block-delete.work');

  // edit form
  $(document).on('click', '.form-block-edit.work', function(evt) {
    evt.preventDefault();

    var curBlock = $(this).data('work-block');

    $(this).closest('.form-content-block').addClass('hidden');
    $(this).closest('.work-block').find('.edit-cancel').removeClass('hidden');
    $(this).closest('.work-block').find('.form-work-block').addClass('editing');
  });

  $(document).on('click', '.edit-cancel', function(evt) {
    evt.preventDefault();

    $(this).closest('.work-block').find('.form-content-block').removeClass('hidden');
    $(this).closest('.work-block').find('.form-work-block').removeClass('editing');
  })

  $(document).on('click', '.btn-cancel', function(evt) {
    evt.preventDefault();

    var curBlock = $(this).data('work-block');
    $('#work-block-' + curBlock).removeClass('editing');

    $('.form-content-block.work[data-work-block=' + curBlock + ']').removeClass('hidden');
  });

  // delete form
  $(document).on('click', '.form-block-delete.work', function(evt) {
    evt.preventDefault();

    $(this).parent('.form-block-buttons').addClass('hidden');
    $(this).parent('.form-block-buttons').siblings('.delete-block').removeClass('hidden');
  });

  $(document).on('click', '.delete-yes', function(evt) {
    evt.preventDefault();

    $(this).closest('.delete-block').addClass('hidden');
    $(this).closest('.form-content-block').addClass('hidden');
    $(this).closest('.form-content-block').find('.form-block-buttons').removeClass('hidden');

    var curBlock = $(this).data('work-block'),
        curWorkBlock = $('#workEntry' + curBlock),
        curWorkBlockTitles = curWorkBlock.find('.form-content-block');

    if ( $('.work-block').length == 1 ) {
      clearWorkForm(curWorkBlockTitles);
      curWorkBlock.trigger('reset');
    } else {
      curWorkBlock.remove();
    }

  });

  $(document).on('click', '.delete-no', function(evt) {
    evt.preventDefault();

    $(this).closest('.delete-block').addClass('hidden');
    $(this).closest('.delete-block').siblings('.form-block-buttons').removeClass('hidden');
  });

  $(document).on('click', '.btn-submit-section', function(evt) {
    evt.preventDefault();

    var curBlock = $(this).data('work-block');

    if ( $(this).hasClass('is-disabled') ) {
      // do nothing
    } else {
      $(this).closest('.work-block').find('.form-content-block').removeClass('hidden');
      $(this).closest('.work-block').find('.form-work-block').removeClass('editing');
    }
  });
}

PAVE.App.WorkBlockSave = function() {
  $(document).on('click', '.btn-submit-section', function() {
    var workBlock = $(this).closest('.work-block'),
        workTitle = $(workBlock).find('input.input_company').val(),
        workRole = $(workBlock).find('select.select_jobRole').val(),
        workStartYear = $(workBlock).find('select.select_startDateYear').val(),
        workEndYear = $(workBlock).find('select.select_endDateYear').val();

    if ( $(this).hasClass('is-disabled') ) {
      // do nothing
    } else {
      workBlock.find('.form-block-title').text(workTitle);
      workBlock.find('.form-block-details').text(workRole + ', ' + workStartYear + ' to ' + workEndYear);
      workBlock.find('.form-content-block').addClass('saved');
      workBlock.find('.form-content-block').removeClass('hidden');
      workBlock.find('.form-work-block').addClass('saved');
      workBlock.find('.form-work-block').removeClass('editing');

      $(this).closest('.work-wrapper').siblings('#add-another-work').addClass('visible');
    }
  });
};

PAVE.App.WorkBlockDuplication = function() {
  $('#btnAddWork').click(function (evt) {

    var num     = $('.work-block').length,
        newNum  = new Number(num + 1),
        newNumber  = new Number(num + 1),
        newElem = $('#workEntry' + num).clone().attr('id', 'workEntry' + newNum);

    if ( $('#workEntry' + newNum).length ) {
      var firstNum = $('.work-block:first').attr('id').replace('workEntry', '');
      var lastNum = new Number( $('.work-block:last').attr('id').replace('workEntry', ''));
      var newNum = new Number(lastNum + 1);
      var newElem = $('#workEntry' + firstNum).clone().attr('id', 'workEntry' + newNum);
    }

    hideAddWorkButton();

    newElem.find('.form-content-block').attr('id', 'workSavedEntry' + newNum);
    newElem.find('.form-content-block').data('work-block', newNum);
    newElem.find('.form-block-edit').data('work-block', newNum);
    newElem.find('.form-block-delete').data('work-block', newNum);
    newElem.find('.delete-yes').data('work-block', newNum);

    // reset values in saved block clone
    newElem.find('.form-block-title').text('');
    newElem.find('.form-block-details').text('');

    // Company - input
    newElem.find('.label_company').attr('for', 'ID' + newNum + '_company');
    newElem.find('.input_company').attr('id', 'ID' + newNum + '_company').attr('name', 'ID' + newNum + '_company').val('');

    // Job Role - select
    newElem.find('.label_jobRole').attr('for', 'ID' + newNum + '_jobRole');
    newElem.find('.select_jobRole').attr('id', 'ID' + newNum + '_jobRole').attr('name', 'ID' + newNum + '_jobRole').val('');

    // Industry - select
    newElem.find('.label_industry').attr('for', 'ID' + newNum + '_industry');
    newElem.find('.select_industry').attr('id', 'ID' + newNum + '_industry').attr('name', 'ID' + newNum + '_industry').val('');

    // End Date Month - select
    newElem.find('.label_startDate').attr('for', 'ID' + newNum + '_startDate');
    newElem.find('.select_startDate').attr('id', 'ID' + newNum + '_startDate').attr('name', 'ID' + newNum + '_startDate').val('');

    // End Date Year - select
    newElem.find('.label_startDateYear').attr('for', 'ID' + newNum + '_startDateYear');
    newElem.find('.select_startDateYear').attr('id', 'ID' + newNum + '_startDateYear').attr('name', 'ID' + newNum + '_startDateYear').val('');

    // End Date Month - select
    newElem.find('.label_endDate').attr('for', 'ID' + newNum + '_endDate');
    newElem.find('.select_endDate').attr('id', 'ID' + newNum + '_endDate').attr('name', 'ID' + newNum + '_endDate').val('');

    // End Date Year - select
    newElem.find('.label_endDateYear').attr('for', 'ID' + newNum + '_endDateYear');
    newElem.find('.select_endDateYear').attr('id', 'ID' + newNum + '_endDateYear').attr('name', 'ID' + newNum + '_endDateYear').val('');


    // Insert the new element after the last "duplicatable" input field
    $(newElem).find('.form-content-block').removeClass('saved');
    $(newElem).find('.form-work-block').removeClass('saved');
    $('.work-wrapper').append(newElem);

    // add a limit?
    // if (newNum == 5) {
    //   $('#btnAddWork').attr('disabled', true).prop('value', "You've reached the limit");
    // }
  });

  // Enable the "add" button
  $('#btnAddWork').attr('disabled', false);
}

// Upload Blocks on App Flow 7
PAVE.App.UploadBlockEditing = function() {
  // delete form toggle
  $(document).on('click', '.form-block-delete.upload', function(evt) {
    evt.preventDefault();

    $(this).parent('.upload-block-buttons').addClass('hidden');
    $(this).parent('.upload-block-buttons').siblings('.delete-block').removeClass('hidden');
  });

  // delete form
  $(document).on('click', '.delete-yes.upload', function(evt) {
    evt.preventDefault();

    $(this).closest('.delete-block').addClass('hidden');
    $(this).closest('.upload-content-block').addClass('hidden');
    $(this).closest('.upload-content-block').find('.upload-block-buttons').removeClass('hidden');
    $(this).closest('.step-row').removeClass('upload-valid');
  });

  // delete NO option
  $(document).on('click', '.delete-no.upload', function(evt) {
    evt.preventDefault();

    $(this).closest('.delete-block').addClass('hidden');
    $(this).closest('.delete-block').siblings('.upload-block-buttons').removeClass('hidden');
  });
};

PAVE.tracking = function(eventName) {
    ga('send', 'event', 'click',  eventName);
    mixpanel.track(eventName);
};