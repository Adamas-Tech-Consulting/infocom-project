<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Session;
use App\Models\SiteSettingsModel;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if(!Session::get('site_settings')) {
            Session::put('site_settings',SiteSettingsModel::first());
        }
    }
}
