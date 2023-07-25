<?php

/*
    |--------------------------------------------------------------------------
    | Constants
    |--------------------------------------------------------------------------
    |
    | This page contains all constant variables
    |
    */

return [

  'powered_by' => 'Adamastech consulting',
  'powered_by_img' => env('APP_URL').'/images/powered_by.png',
  
	'CDN_PATH' => public_path('images'),
  'CDN_URL' => env('APP_URL').'/images',

  'EVENT_FOLDER' => 'event',
  'SPONSORS_FOLDER' => 'sponsors',
  'SPEAKERS_FOLDER' => 'speakers',

  'WP_SITE'  => 'http://localhost/infocom/',

  'SITE_URL'  => 'http://localhost/infocom/wp-json/abp/v1/',

  'CREATE_EVENT_CATEGORY' => 'create-event-category',
  'UPDATE_EVENT_CATEGORY' => 'update-event-category',
  'DELETE_EVENT_CATEGORY' => 'delete-event-category',

  'CREATE_SPONSORSHIP_TYPE' => 'create-sponsorship-type',
  'UPDATE_SPONSORSHIP_TYPE' => 'update-sponsorship-type',
  'DELETE_SPONSORSHIP_TYPE' => 'delete-sponsorship-type',

  'CREATE_EVENT' => 'create-event',
  'UPDATE_EVENT' => 'update-event',
  'DELETE_EVENT' => 'delete-event',

];

?>