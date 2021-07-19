<?php

namespace App\Http\Utils;

function errorResponse($message, $errors, $type)
{
    return response()->json([
        'message' => $message,
        'errors' => $errors
    ], $type);

}
