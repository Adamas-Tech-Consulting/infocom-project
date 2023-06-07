<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::middleware(['web'])->group(function () {
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::middleware(['auth'])->group(function () {    

        //Dashboard
        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

        //Conference Category
        Route::prefix('manage-conference-category')->group(function (){
            Route::get('/', [App\Http\Controllers\ConferenceCategoryController::class, 'index'])->name('conference_category');
            Route::any('/create', [App\Http\Controllers\ConferenceCategoryController::class, 'create'])->name('conference_category_create');
            Route::any('/update/{id}', [App\Http\Controllers\ConferenceCategoryController::class, 'update'])->name('conference_category_update');
            Route::any('/delete/{id}', [App\Http\Controllers\ConferenceCategoryController::class, 'delete'])->name('conference_category_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\ConferenceCategoryController::class, 'publish_unpublish'])->name('conference_category_publish_unpublish');
        });

        //Conference
        Route::prefix('manage-conference')->group(function (){
            Route::get('/', [App\Http\Controllers\ConferenceController::class, 'index'])->name('conference');
            Route::any('/create', [App\Http\Controllers\ConferenceController::class, 'create'])->name('conference_create');
            Route::any('/update/{id}', [App\Http\Controllers\ConferenceController::class, 'update'])->name('conference_update');
            Route::any('/delete/{id}', [App\Http\Controllers\ConferenceController::class, 'delete'])->name('conference_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\ConferenceController::class, 'publish_unpublish'])->name('conference_publish_unpublish');
        });

        //Event
        Route::prefix('manage-event')->group(function (){
            Route::get('/{conference_id}', [App\Http\Controllers\ConferenceEventController::class, 'index'])->name('event');
            Route::any('/create/{conference_id}', [App\Http\Controllers\ConferenceEventController::class, 'create'])->name('event_create');
            Route::any('/update/{conference_id}/{id}', [App\Http\Controllers\ConferenceEventController::class, 'update'])->name('event_update');
            Route::any('/delete/{conference_id}/{id}', [App\Http\Controllers\ConferenceEventController::class, 'delete'])->name('event_delete');
            Route::post('/publish-unpublish/{conference_id}', [App\Http\Controllers\ConferenceEventController::class, 'publish_unpublish'])->name('event_publish_unpublish');
            Route::get('/create-event-details/{conference_id}', [App\Http\Controllers\ConferenceEventController::class, 'create_event_details'])->name('event_details_create');
            Route::any('/sponsors/{conference_id}/{id}', [App\Http\Controllers\ConferenceEventController::class, 'sponsors'])->name('event_sponsors');
            Route::any('/speakers/{conference_id}/{id}', [App\Http\Controllers\ConferenceEventController::class, 'speakers'])->name('event_speakers');
        });

        //Sponsorship Type
        Route::prefix('manage-sponsorship-type')->group(function (){
            Route::get('/', [App\Http\Controllers\SponsorshipTypeController::class, 'index'])->name('sponsorship_type');
            Route::any('/create', [App\Http\Controllers\SponsorshipTypeController::class, 'create'])->name('sponsorship_type_create');
            Route::any('/update/{id}', [App\Http\Controllers\SponsorshipTypeController::class, 'update'])->name('sponsorship_type_update');
            Route::any('/delete/{id}', [App\Http\Controllers\SponsorshipTypeController::class, 'delete'])->name('sponsorship_type_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\SponsorshipTypeController::class, 'publish_unpublish'])->name('sponsorship_type_publish_unpublish');
        });

        //Sponsors
        Route::prefix('manage-sponsors')->group(function (){
            Route::get('/', [App\Http\Controllers\SponsorsController::class, 'index'])->name('sponsors');
            Route::any('/create/{conference_id?}/{event_id?}', [App\Http\Controllers\SponsorsController::class, 'create'])->name('sponsors_create');
            Route::any('/update/{id}', [App\Http\Controllers\SponsorsController::class, 'update'])->name('sponsors_update');
            Route::any('/delete/{id}', [App\Http\Controllers\SponsorsController::class, 'delete'])->name('sponsors_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\SponsorsController::class, 'publish_unpublish'])->name('sponsors_publish_unpublish');
        });

        //Speakers
        Route::prefix('manage-speakers')->group(function (){
            Route::get('/', [App\Http\Controllers\SpeakersController::class, 'index'])->name('speakers');
            Route::any('/create/{conference_id?}/{event_id?}', [App\Http\Controllers\SpeakersController::class, 'create'])->name('speakers_create');
            Route::any('/update/{id}', [App\Http\Controllers\SpeakersController::class, 'update'])->name('speakers_update');
            Route::any('/delete/{id}', [App\Http\Controllers\SpeakersController::class, 'delete'])->name('speakers_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\SpeakersController::class, 'publish_unpublish'])->name('speakers_publish_unpublish');
        });

    });
});





