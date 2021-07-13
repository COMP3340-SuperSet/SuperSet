<?php

namespace App\Http\Utils;

// class Error
// {
// }

function errorResponse($message, $errors, $type)
{
    return response()->json([
        'message' => $message,
        'errors' => $errors
    ], $type);
}
