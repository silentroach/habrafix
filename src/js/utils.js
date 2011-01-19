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
