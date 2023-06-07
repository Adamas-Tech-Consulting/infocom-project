<?php

use Illuminate\Support\Facades\Session;

if(!function_exists('image_upload')) {
  function image_upload($file,$folder,$type,$unlink_filename=NULL)
  {
    if(!empty($unlink_filename))
    {
      if(file_exists(config("constants.CDN_PATH").'/'.$folder.'/'.$unlink_filename)){
          unlink(config("constants.CDN_PATH").'/'.$folder.'/'.$unlink_filename);
      }
    }
    $extension = $file->getClientOriginalExtension();
    // File Name
    $filename = $type.'_'.time().'.'.$extension;
    // File upload location
    $location = config("constants.CDN_PATH").'/'.$folder.'/';
    // Upload file
    $file->move($location,$filename);

    return $filename;
  }
}

if(!function_exists('site_settings')) {
  function site_settings($key) 
  {
    if(in_array($key, ['site_logo','site_footer_logo','site_favicon'])) {
      return '/images/'.Session::get('site_settings')->$key;
    } else {
      return Session::get('site_settings')->$key;
    }
  }
}


?>