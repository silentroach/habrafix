var objects = document.querySelectorAll('object');

for (var i = 0; i < objects.length; i++) {
	var obj = objects[i];

	var embed = obj.querySelector('embed[src]');

	if (
		!embed
		|| !embed.src.match(/http:\/\/pink.habralab/)
	) {
		obj.style.display = 'block';
	}
}
