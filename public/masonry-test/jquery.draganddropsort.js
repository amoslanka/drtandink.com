(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Drag-And-Drop-Sort/
	// Feel free to use this jQuery Plugin
	
	var classModifier = "dds";
	var nextSetIdentifier = 0;
	var currentItem = null;
	var currentTarget = null;
	var itemInTransit = false;
	
	var insertClass;
	var movingClass;
	var itemClass;
	
	jQuery(document).mouseup( function () {
		if (itemInTransit && currentTarget != null) {
			var clone = jQuery(currentItem).clone();
			bindEvents(clone);
			jQuery(currentTarget).before(clone);
			jQuery(currentItem).remove();
		}
		currentItem = null;
		currentTarget = null;
		itemInTransit = false;
		jQuery("." + movingClass).removeClass(movingClass);
	});

	function bindEvents(item) {
		jQuery(item).mousedown( function () {
			currentItem = jQuery(this);
			itemInTransit = true;
			jQuery(this).addClass(movingClass);
			return false;
		});
		
		jQuery(item).mouseenter( function () {
			if (itemInTransit) {
				currentTarget = jQuery(this);
				jQuery(this).addClass(insertClass);
				return false;
			}
		});
		
		jQuery(item).mouseout( function () {
			jQuery(this).removeClass(insertClass);
		});
	}
	
	jQuery.fn.draganddropsort = function (settings) {
	
		var config = {"classModifier": "dds", "appendLastLine": true};
		
		if (settings) jQuery.extend(config, settings);
		
		classModifier = config.classModifier;
		insertClass = classModifier + "insert";
		movingClass = classModifier + "moving";
		itemClass = classModifier + "item";

		return this.each(function () {
		
			if (config.appendLastLine) {
				var clone = jQuery(this).children().first().clone();
				var children = jQuery(clone).children();
				if (children.length == 0) {
					jQuery(clone).html("&nbsp;");
				} else {
					jQuery(clone).children().each(function () {
						jQuery(this).html("&nbsp");
					});
				}
				jQuery(this).append(clone);
			}
		
			jQuery(this).children().each(function () {
				bindEvents(this);
				jQuery(this).addClass(itemClass);
			});
			
			nextSetIdentifier++;
		});

	};
})(jQuery);