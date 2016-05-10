// --------------------------------------------------------------------------
//      _                    _            _   _      
//     | |                  | |          | | (_)     
//  ___| |__   __ _ _ __ ___| |_ __ _ ___| |_ _  ___ 
// / __| '_ \ / _` | '__/ _ \ __/ _` / __| __| |/ __|
// \__ \ | | | (_| | | |  __/ || (_| \__ \ |_| | (__ 
// |___/_| |_|\__,_|_|  \___|\__\__,_|___/\__|_|\___|
//
// --------------------------------------------------------------------------
//  Version: 1.0
//   Author: Simon Sturgess
//  Website: dahliacreative.github.io/sharetastic
//     Docs: dahliacreative.github.io/sharetastic/docs
//     Repo: github.com/dahliacreative/sharetastic
//   Issues: github.com/dahliacreative/sharetastic/issues
// --------------------------------------------------------------------------

(function(window, $) {

  $.fn.sharetastic = function(options) {
    var options = $.extend(options, {
      sprite: 'sharetastic.svg',
      feeds: {
        facebook: true,
        twitter: true,
        linkedin: true,
        email: true
      }
    });
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

  this.feeds = {
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
};

// --------------------------------------------------------------------------
// Build the DOM
// --------------------------------------------------------------------------
Sharetastic.prototype.build = function() {
  for(var key in this.options.feeds) {
    if(this.options.feeds[key]) {
      var link = $('<a/>');
      link
        .addClass(this.feeds[key].class)
        .attr('href', this.feeds[key].href)
        .attr('target', this.feeds[key].target)
        .html(this.feeds[key].icon);
      this.el.append(link);
    }
  }
};

// --------------------------------------------------------------------------
// Get Meta Content
// --------------------------------------------------------------------------
Sharetastic.prototype.getMetaContent = function(propName) {
  var metas = document.getElementsByTagName('meta');
  for(var i = 0; i < metas.length; i++) {
    if(metas[i].getAttribute("name") == propName) {
      return metas[i].getAttribute("content");
    }
    return "";
  }
};