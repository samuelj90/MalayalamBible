// Sidebar toggle
$(document).ready(function() {
	var overlay = $('.sidebar-overlay');
	$('.sidebar-toggle').on('click', function() {
		var sidebar = $('#sidebar');
		sidebar.toggleClass('open');
		if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
			overlay.addClass('active');
		} else {
			overlay.removeClass('active');
		}
	});
	overlay.on('click', function() {
		$(this).removeClass('active');
		$('#sidebar').removeClass('open');
	});
});



//Add JQuery animation to bootstrap dropdown elements.	
(function($) {
	var dropdown = $('.dropdown');
	// Add slidedown animation to dropdown
	dropdown.on('show.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	});
	// Add slideup animation to dropdown
	dropdown.on('hide.bs.dropdown', function(e) {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	});
})(jQuery);

//Remove Class Jquery Helper
(function(removeClass) {
	jQuery.fn.removeClass = function(value) {
		if (value && typeof value.test === "function") {
			for (var i = 0, l = this.length; i < l; i++) {
				var elem = this[i];
				if (elem.nodeType === 1 && elem.className) {
					var classNames = elem.className.split(/\s+/);
					for (var n = classNames.length; n--;) {
						if (value.test(classNames[n])) {
							classNames.splice(n, 1);
						}
					}
					elem.className = jQuery.trim(classNames.join(" "));
				}
			}
		} else {
			removeClass.call(this, value);
		}
		return this;
	}
})(jQuery.fn.removeClass);

// Load the Google Transliterate API
google.load("elements", "1", {
    packages: "transliteration"
});

function onLoad() {
    var options = {
        sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
        destinationLanguage: [google.elements.transliteration.LanguageCode.MALAYALAM],
        shortcutKey: 'ctrl+g',
        transliterationEnabled: true
    };

    // Create an instance on TransliterationControl with the required
    // options.
    var control = new google.elements.transliteration.TransliterationControl(options);

    // Enable transliteration in the textbox with id
    // 'transliterateTextarea'.
    control.makeTransliteratable(['transliterateTextbox']);
}
google.setOnLoadCallback(onLoad);
