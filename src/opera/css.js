/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
// в расширениях для Opera нельзя пользовать файлы со стилями, поэтому внедряем прямо через javascript
var 
	parent = document.getElementsByTagName('head')[0] || document.documentElement,
	style  = document.createElement('style');
	
style.type = 'text/css';

// переменная подставляется билдером
var cssText = document.createTextNode('%CSS%');

style.appendChild(cssText);

parent.appendChild(style);