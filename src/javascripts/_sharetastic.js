// --------------------------------------------------------------------------
//      _                    _            _   _      
//     | |                  | |          | | (_)     
//  ___| |__   __ _ _ __ ___| |_ __ _ ___| |_ _  ___ 
// / __| '_ \ / _` | '__/ _ \ __/ _` / __| __| |/ __|
// \__ \ | | | (_| | | |  __/ || (_| \__ \ |_| | (__ 
// |___/_| |_|\__,_|_|  \___|\__\__,_|___/\__|_|\___|
//
// --------------------------------------------------------------------------
//  Version: 1.1
//   Author: Simon Sturgess
//  Website: dahliacreative.github.io/sharetastic
//     Docs: dahliacreative.github.io/sharetastic/docs
//     Repo: github.com/dahliacreative/sharetastic
//   Issues: github.com/dahliacreative/sharetastic/issues
// --------------------------------------------------------------------------

(function(window, $) {

  $.fn.sharetastic = function(opts) {
    var options = {},
        customFeeds = {};

    if(opts && opts.hasOwnProperty('customFeeds')) {
      options.customFeeds = opts.customFeeds;
    }

    for(var key in options.customFeeds) {
      customFeeds[key] = true;
    }

    options.feeds = $.extend({
        facebook: true,
        twitter: true,
        linkedin: true,
        email: true
      }, customFeeds);

    if(opts && opts.hasOwnProperty('feeds')) {
      options.feeds = $.extend(options.feeds, opts.feeds);
    }

    if(opts && opts.hasOwnProperty('sprite')) {
      options.sprite = opts.sprite;
    } else {
      options.sprite = 'sharetastic.svg';
    }
    $.ajax({
      url: options.sprite,
      success: function(data) {
        $('body').prepend(data.documentElement);
      }
    });
    return this.each(function() {
      new Sharetastic($(this), options).build();
    });
  };

})(window, jQuery);

// --------------------------------------------------------------------------
// Sharetastic Constructor
// --------------------------------------------------------------------------
 var Sharetastic = function(el, options) {
  this.el = el;
  this.el.addClass('sharetastic');

  this.options = options;

  this.page = {
    url: window.location,
    title: document.title,
    description: this.getMetaContent('description')
  }

  var feeds = {
    facebook: {
      class: 'sharetastic__button sharetastic__button--facebook',
      href: 'https://www.facebook.com/sharer/sharer.php?u=' + this.page.url + '&title=' + this.page.title + '&description=' + this.page.description,
      target: '_blank',
      icon: '<svg width="10" height="19" class="sharetastic__icon"><use xlink:href="#facebook"/></svg>'
    },
    twitter: {
      class: 'sharetastic__button sharetastic__button--twitter',
      href: 'http://twitter.com/home?status=' + this.page.title + ' - ' + this.page.description + ' - ' + this.page.url,
      target: '_blank',
      icon: '<svg width="18" height="14" class="sharetastic__icon"><use xlink:href="#twitter"/></svg>'
    },
    linkedin: {
      class: 'sharetastic__button sharetastic__button--linkedin',
      href: 'https://www.linkedin.com/shareArticle?mini=true&url=' + this.page.url + '&title=' + this.page.title + '&summary=' + this.page.description,
      target: '_blank',
      icon: '<svg width="18" height="18" class="sharetastic__icon"><use xlink:href="#linkedin"/></svg>'
    },
    email: {
      class: 'sharetastic__button sharetastic__button--email',
      href: 'mailto:?Body=%0A%0A' + this.page.title + '%0A' + this.page.description + '%0A' + this.page.url,
      icon: '<svg width="20" height="13" class="sharetastic__icon"><use xlink:href="#email"/></svg>'
    }
  }

  this.feeds = $.extend(feeds, options.customFeeds);
};

