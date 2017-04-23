<?php
session_start();
require('Chat.php');
print_r($_POST);
Chat::execute($_POST);