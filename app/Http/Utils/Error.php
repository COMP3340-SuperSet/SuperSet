<?php

use Namespace 

class Error
{
    public function response($message, $errors, $type){
        return response()->json([
            'message' => $message,
            'errors' => $errors
        ], $type);
    }
}
