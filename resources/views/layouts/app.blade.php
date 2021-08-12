<!DOCTYPE html>
<html lang="en">
    <head>
        <title>SuperSet</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel = "icon" href = "/storage/superset.png" />
        <meta name="copyright" content="Copyright Owner" />
        <meta name="author" content="Development Team 3: Brandon, Brett, Ruturaj, Steven, and Shane" />
        <meta name="description" content="The main purpose for SuperSet is for a user to keep a portfolio 
                                         of their collections of items. This idea started off very simple 
                                        and evolved to the fully fledged website you see today. We wanted 
                                        to build a platform where users can create accounts, create and manage 
                                        sets of items, and share their accounts and sets.  ">
        <meta name="keywords" content="Social Media, Profile, Collections, Share With Friends, New Users, Interactive Training, Admin Role" />
        <meta name="robots" content="none"/>
        
        @include('util.logic')
        @include('util.onpopstate')
    </head>
    <body>
        @yield('content')
        <script src="../js/app.js"></script>
    </body>
</html>
