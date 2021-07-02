<?php
    use App\Http\Controllers\SettingController;
    $db = SettingController::show('theme');
    $theme = $db['value'];
?>

@if($theme == '2')
    @include('themes.theme_2')
@elseif($theme == '1')
    @include('themes.theme_1')
@else
    @include('themes.theme_0')
@endif