/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
// частичная функциональность jQuery, плагиат на плагиате
habrafix.dom = (function() {

	var idExpr = /^#([^ .>:]+)$/;

	/**
	 * @param {string} selector Селектор или элемент
	 * @param {?HTMLElement} context Контекст поиска
	 * @return {Object}
	 */
	var dom = function(selector, context) {
		return new dom.fn.init(selector, context);
	};
	
	dom.fn = dom.prototype = {
		/**
		 * @param {string} selector Селектор или элемент
		 * @param {?HTMLElement} context Контекст поиска
		 * @return {Object}
		 */
		init: function(selector, context) {		
			var 
				doc = context || document,
				matches = idExpr.exec(selector),
				i = j = 0,
				elements = (!matches) ? (doc.querySelectorAll(selector) || []) : [];
				
			if (matches) {
				var tmp = doc.getElementById(matches[1]);
				
				if (tmp) {
					elements.push(tmp);
				}
			}
				
			for (var l = elements.length; j < l; j++) {
				this[i++] = elements[j];
			}
				
			this.length = i;
					
			return this;
		},
		
		length: 0,
		
		/**
		 * Размер коллекции
		 * @return {number}
		 */
		size: function() {
			return this.length;
		},
		
		/**
		 * Пробегаемся по элементам коллекции
		 * @param {function()} callback
		 */
		each: function(callback) {
			for (var i = 0; i < this.length; i++) {
				if (callback.apply(this[i]) === false) {
					break;
				}
			}
			
			return this;
		},
		
		/**
		 * Содержимое тега
		 * @return {?string}
		 */
		html: function() {
			return this[0] && this[0].nodeType === 1 ? this[0].innerHTML : null;
		},
		
		/**
		 * Получаем значение атрибута
		 * @param {string} key Название атрибута
		 */
		attr: function(key) {
			return this[0] && (key in this[0]) ? this[0][key] : null;
		},
		
		/**
		 * Удаление
		 */
		remove: function() {
			this.each( function() {
				this.parentNode.removeChild(this);
			} );
			
			return this;
		},
		
		/**
		 * Первый элемент
		 */
		first: function() {
			return this[0] ? this[0] : null;
		},
		
		/**
		 * Присутствует ли класс у элементов в коллекции
		 * @param {string} className
		 * @return {boolean}
		 */
		hasClass: function(className) {
			var result = false;
			
			this.each( function() {
				var
					element = this,
					elementClass = ' ' + element.className + ' ';
					
				if (elementClass.indexOf(' ' + className + ' ') >= 0) {
					result = true;
					return false;
				}
			} );
			
			return result;
		},
		
		/**
		 * Добавляем класс к элементам
		 * @param {string} className
		 */
		addClass: function(className) {
			this.each( function() {
				var 
					element = this,
					elementClass = ' ' + element.className + ' ';
					
				if (elementClass.indexOf(' ' + className + ' ') < 0) {
					element.className += ' ' + className;
				}
			} );
			
			return this;
		},
		
		/**
		 * Удаляем класс
		 * @param {string} className
		 */
		removeClass: function(className) {
			this.each( function() {
				var
					element = this,
					elementClass = (' ' + element.className + ' ').replace(' ' + className + ' ', ' ');
					
				element.className = elementClass.trim();
			} );
			
			return this;
		},
		
		/**
		 * Переключаем класс
		 * @param {string} className
		 */
		toggleClass: function(className) {
			if (this.hasClass(className)) {
				this.removeClass(className);
			} else {
				this.addClass(className);
			}
			
			return this;
		}
	};
	
	dom.fn.init.prototype = dom.fn;
	
	return (dom);

})();
