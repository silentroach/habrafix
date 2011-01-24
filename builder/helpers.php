<?php

function compressJS($files = array(), $rootpath = '.') {
	$compiler = 'java -jar ' . PATH_GCC . ' --compilation_level ADVANCED_OPTIMIZATIONS ' .
		'--warning_level QUIET';
		
	echo "Compressing .js...\n  ";
		
	foreach($files as $js) {
		$file = realpath($rootpath . DS . $js);
		$basename = pathinfo($file, PATHINFO_BASENAME);
		
		if ('debug.js' === $basename) {
			continue;
		}
		
		echo $basename . ' ';
		
		$compiler .= ' --js ' . escapeshellarg($file);
	}
	
	echo "\n";
	
	$externs = explode("\n", trim(shell_exec('find ' . escapeshellarg(PATH_TOOLS . 'externs' . DS) . ' -name *.js')));

	foreach($externs as $extern) {
		$compiler .= ' --externs ' . escapeshellarg($extern);
	}
	
	return shell_exec($compiler);
}

function combineJS($files = array(), $rootpath = '.') {
	echo "Combining plain .js...\n  ";
	
	$result = '';
		
	foreach($files as $js) {
		$file = realpath($rootpath . DS . $js);
		$basename = pathinfo($file, PATHINFO_BASENAME);
		
		if ('debug.js' === $basename) {
			continue;
		}
		
		echo $basename . ' ';
		
		$result .= file_get_contents($file) . "\n";
	}
	
	echo "\n";

	return $result;
}

function compressCSS($files = array(), $rootpath = '.', $replacements = array()) {
	$compiler = 'java -jar ' . PATH_YUI . ' ';
		
	echo "Compressing .css...\n  ";
	
	$content = '';
		
	foreach($files as $css) {
		$file = realpath($rootpath . DS . $css);
		$basename = pathinfo($file, PATHINFO_BASENAME);
		
		echo $basename . ' ';
		
		$content .= file_get_contents($file);
	}
	
	echo "\n";
	
	foreach($replacements as $from => $to) {
		$content = str_replace($from, $to, $content);
	}
	
	echo $content;
	
	$tmppath = sys_get_temp_dir() . DS . 'temp.css';
	
	file_put_contents($tmppath, $content);

	$compiler .= escapeshellarg($tmppath);
	$result = shell_exec($compiler);
	
	unlink($tmppath);

	return $result;
}