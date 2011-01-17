/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.utils = ( function() {

	// closure tools не понимают что у элемента есть .classList
	var classList = function(element) {
		return element['classList'];
	};

	return {
		/**
		 * Удаление элемента
		 * @param {string} element Селектор
		 */
		removeElement: function(element) {
			element.parentNode.removeChild(element);
		},

		/**
		 * Найти и что-то сделать с элементами
		 * @param {string} selector Селектор
		 * @param {function(HTMLElement)} callback Callback-функция
		 */
		seekAndCallback: function(selector, callback) {
			var 
				elements = document.querySelectorAll(selector),
				element = null;

			for (var i = 0; i < elements.length; i++) {
				callback(elements[i]);
			}			
		},

		/**
		 * Найти и убрать элемент
		 * @param {string} selector Селектор
		 */
		seekAndDestroy: function(selector) {
			var utils = this;
		
			utils.seekAndCallback(selector, function(element) {
				utils.removeElement(element);
			} );
		},
		
		/**
		 * Найти элемент(ы) и показать
		 * @param {string} selector Селектор
		 */
		seekAndShow: function(selector) {
			var utils = this;
		
			utils.seekAndCallback(selector, function(element) {
				utils.show(element);
			} );
		},
		
		/**
		 * Скрываем элемент
		 * @param {HTMLElement} element HTML элемент
		 */
		hide: function(element) {
			element.style.display = 'none';
		},
		
		/**
		 * Показываем элемент
		 * @param {HTMLElement} element HTML элемент
		 */
		show: function(element) {
			element.style.display = 'block';
		},
		
		/**
		 * Есть ли у элемента указанный класс
		 * @param {HTMLElement} element HTML элемент
		 * @param {string} className Название класса
		 */
		hasClass: function(element, className) {
			return classList(element).contains(className);
		},

		/**
		 * Удалить класс, если такой присутствует у элемента
		 * @param {HTMLElement} element HTML элемент
		 * @param {string} className Название класса
		 */
		removeClass: function(element, className) {
			if (this.hasClass(element, className)) {
				classList(element).remove(className);
			}
		},

		/**
		 * Добавить класс к элементу
		 * @param {HTMLElement} element HTML элемент
		 * @param {string} className Название класса
		 */
		addClass: function(element, className) {
			if (!this.hasClass(element, className)) {
				classList(element).add(className);
			}
		},

		/**
		 * Добавить или удалить класс у элемента
		 * @param {HTMLElement} element HTML элемент
		 * @param {string} className Название класса
		 */
		toggleClass: function(element, className) {
			if (this.hasClass(element, className)) {
				this.removeClass(element, className);
			} else {
				this.addClass(element, className);
			}
		},
		
		/**
		 * Склоняем в зависимости от числа спереди
		 * @param {number} number Число
		 * @param {Array.<string>} endings Склонения (например: [яблоко, яблока, яблок])
		 * @return {string} Результат
		 */
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
