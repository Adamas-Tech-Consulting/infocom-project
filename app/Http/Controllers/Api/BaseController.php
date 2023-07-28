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
    public function sendResponse($result, $message)
    {
        $response = [
            'status'  => (string)200,
            'message' => $message ? $message : 'successful',
            'data'    => ($result) ? $result : (object)[]
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
