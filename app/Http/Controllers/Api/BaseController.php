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
            'status'  => 200,
            'message' => $message ? $message : 'successful',
            'data'    => ($result) ? $result : []
        ];
        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @param $error
     * @param  array  $errorMessages
     * @param  int  $code
     *
     * @return JsonResponse
     */
    public function sendError($error, $code = 200)
    {
        $response = [
            'status'  => $code,
            'message' => $error,
            'data'    => (object)[]
        ];
        return response()->json($response, $code);
    }
}
