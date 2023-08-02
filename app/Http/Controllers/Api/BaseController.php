<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @param $result
     * @param $message
     *
     * @return JsonResponse
     */
    public function sendResponse($result, $message, $return_type='object')
    {
        $return_type = ($return_type=='array') ? [] : (object)[];
        $response = [
            'status'  => (string)200,
            'message' => $message ? $message : 'successful',
            'data'    => ($result) ? $result : $return_type
        ];
        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @param $error
     * @param  array  $errorMessages
     * @param  string  $code
     *
     * @return JsonResponse
     */
    public function sendError($error, $status=200, $code = 200)
    {
        $response = [
            'status'  => (string)$status,
            'message' => $error,
            'data'    => (object)[]
        ];
        return response()->json($response, $code);
    }
}
