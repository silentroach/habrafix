/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
// в расширениях для Opera нельзя пользовать файлы скриптов, поэтому внедряем прямо в документ
( function(css) {

	var 
		parent = document.getElementsByTagName('head')[0] || document.documentElement,
		style  = document.createElement('style');
		
	style.type = 'text/css';

	var cssText = document.createTextNode(css);
	
	style.appendChild(cssText);
	
	parent.appendChild(style);


} )('%CSS%'); // переменная подставляется билдером