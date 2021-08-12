<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel = "icon" href = "/storage/superset.png" />

        <title>SuperSet</title>
        <meta name="description" content="">
        <meta name="author" content="">
        @include('util.logic')
        @include('util.onpopstate')
        @include('util.env')
    </head>
    <body>
        @yield('content')
        <script src="../js/app.js"></script>
    </body>
</html>
