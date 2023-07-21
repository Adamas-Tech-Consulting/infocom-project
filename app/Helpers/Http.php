<?php

namespace App\Helpers;

use GuzzleHttp;

class Http
{
  public static function post($url,$body) {
    $client = new GuzzleHttp\Client();
    $response = $client->post($url, ['form_params' => $body]);
    return $response;
  }
}