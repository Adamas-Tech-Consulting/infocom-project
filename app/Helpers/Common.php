<?php

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

if(!function_exists('image_upload')) {
  function image_upload($file,$folder,$type,$unlink_filename=NULL)
  {
    $use_s3 = env('USE_S3');

    if(!empty($unlink_filename))
    {
      if($use_s3) {
        if(Storage::disk('s3')->exists($folder.'/'.$unlink_filename)) {
          Storage::disk('s3')->delete($folder.'/'.$unlink_filename);
        }
      } else {
        if(file_exists(public_path('images').'/'.$folder.'/'.$unlink_filename)){
          unlink(public_path('images').'/'.$folder.'/'.$unlink_filename);
        }
      }
    }

    $extension = $file->getClientOriginalExtension();
    // File Name
    $filename = $type.'_'.time().'.'.$extension;
    // Upload file
    if($use_s3) {
      Storage::disk('s3')->put($folder.'/'.$filename, file_get_contents($file));
    } else {
      $location = public_path('images').'/'.$folder.'/';
      $file->move($location,$filename);
    }
    return $filename;
  }
}

if(!function_exists('image_delete')) {
  function image_delete($folder,$unlink_filename=NULL)
  {
    $use_s3 = env('USE_S3');

    if(!empty($unlink_filename))
    {
      if($use_s3) {
        if(Storage::disk('s3')->exists($folder.'/'.$unlink_filename)) {
          Storage::disk('s3')->delete($folder.'/'.$unlink_filename);
        }
        
      } else {
        if(file_exists(public_path('images').'/'.$folder.'/'.$unlink_filename)){
          unlink(public_path('images').'/'.$folder.'/'.$unlink_filename);
        }
      }
    }
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