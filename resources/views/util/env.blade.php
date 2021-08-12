<?php
    try {
        $env = getenv('APP_ENV');
        error_log('Page compiled in ' . $env . ' mode.');
    } catch (Exception $e) {
        $env = 'development';
    }
?>

@if($env == 'production')
    @include('util.production')
@endif