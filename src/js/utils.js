habrafix.utils = ( function() {

	var classList = function(element) {
		return element['classList'];
	};

	return {
		// удаление элемента
		removeElement: function(element) {
			element.parentNode.removeChild(element);
		},

		// найти и что-то сделать с элементами
		seekAndCallback: function(selector, callback) {
			var 
				elements = document.querySelectorAll(selector),
				element = null;

			for (var i = 0; i < elements.length; i++) {
				callback(elements[i]);
			}			
		},

		// найти элемент(ы) и удалить
		seekAndDestroy: function(selector) {
			var utils = this;
		
			utils.seekAndCallback(selector, function(element) {
				utils.removeElement(element);
			} );
		},
		
		// найти элемент(ы) и показать
		seekAndShow: function(selector) {
			var utils = this;
		
			utils.seekAndCallback(selector, function(element) {
				utils.show(element);
			} );
		},
		
		// скрываем элемент
		hide: function(element) {
			element.style.display = 'none';
		},
		
		// показываем элемент
		show: function(element) {
			element.style.display = 'block';
		},
		
		hasClass: function(element, className) {
			return classList(element).contains(className);
		},

		removeClass: function(element, className) {
			if (this.hasClass(element, className)) {
				classList(element).remove(className);
			}
		},

		addClass: function(element, className) {
			if (!this.hasClass(element, className)) {
				classList(element).add(className);
			}
		},

		toggleClass: function(element, className) {
			if (this.hasClass(element, className)) {
				this.removeClass(element, className);
			} else {
				this.addClass(element, className);
			}
		},
		
		// склоняем [яблоко, яблока, яблок]
		getPluralForm: function(number, endings) {
			var
				mod10  = number % 10,
				mod100 = number % 100;

			if (
				mod10 == 1 
				&& mod100 != 11
			) {
				return endings[0];
			}	else
			if (
				mod10 >= 2 
				&& mod10 <= 4
				&& (
					mod100 < 10 
					|| mod100 >= 20
				)
			) {
				return endings[1];
			} else {
				return endings[2];
			}
		}

	}
	
} )();
