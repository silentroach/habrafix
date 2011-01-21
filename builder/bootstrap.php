<?php

define('PATH_TOOLS',   ROOT . 'tools' . DS);
define('PATH_SOURCES', ROOT . 'src' . DS);

require __DIR__ . DS . 'helpers.php';

// ���������, ���� �� ����������� ��� ������ � tools
if ('' == exec('find ' . escapeshellarg(PATH_TOOLS) . ' -name gcc.jar')) {
	echo "Tools not found. Preparing...\n\n";

	$cwd = getcwd();
	chdir(PATH_TOOLS);
	system('./prepare');
	chdir($cwd);
}