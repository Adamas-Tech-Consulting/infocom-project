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

        //Users
        Route::prefix('manage-users')->group(function (){
            Route::get('/', [App\Http\Controllers\UserController::class, 'index'])->name('users');
            Route::any('/create', [App\Http\Controllers\UserController::class, 'create'])->name('users_create');
            Route::any('/update/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('users_update');
            Route::any('/update-password/{id}', [App\Http\Controllers\UserController::class, 'update_password'])->name('users_update_password');
            Route::any('/delete/{id}', [App\Http\Controllers\UserController::class, 'delete'])->name('users_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\UserController::class, 'publish_unpublish'])->name('users_publish_unpublish');
        });

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
            Route::any('/sponsors/{conference_id}', [App\Http\Controllers\ConferenceController::class, 'sponsors'])->name('conference_sponsors');
            Route::any('/speakers/{conference_id}', [App\Http\Controllers\ConferenceController::class, 'speakers'])->name('conference_speakers');
            Route::any('/key-speakers', [App\Http\Controllers\ConferenceController::class, 'key_speakers'])->name('conference_key_speakers');
        });

        //Event Type
        Route::prefix('manage-event-type')->group(function (){
            Route::get('/', [App\Http\Controllers\EventTypeController::class, 'index'])->name('event_type');
            Route::any('/create', [App\Http\Controllers\EventTypeController::class, 'create'])->name('event_type_create');
            Route::any('/update/{id}', [App\Http\Controllers\EventTypeController::class, 'update'])->name('event_type_update');
            Route::any('/delete/{id}', [App\Http\Controllers\EventTypeController::class, 'delete'])->name('event_type_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\EventTypeController::class, 'publish_unpublish'])->name('event_type_publish_unpublish');
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
            Route::any('/key-speakers/{conference_id}', [App\Http\Controllers\ConferenceEventController::class, 'key_speakers'])->name('event_key_speakers');
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

        //Registration Requests
        Route::prefix('manage-registration-request')->group(function (){
            Route::get('/', [App\Http\Controllers\RegistrationRequestController::class, 'index'])->name('registration_request');
            Route::get('/switch-conference/{conference_id}', [App\Http\Controllers\RegistrationRequestController::class, 'switch_conference'])->name('switch_conference');
            Route::get('/csv-download', [App\Http\Controllers\RegistrationRequestController::class, 'csv_download'])->name('registration_request_csv_download');
        });

        //Contacts Group
        Route::prefix('manage-contacts-group')->group(function (){
            Route::get('/', [App\Http\Controllers\ContactsGroupController::class, 'index'])->name('contacts_group');
            Route::any('/create', [App\Http\Controllers\ContactsGroupController::class, 'create'])->name('contacts_group_create');
            Route::any('/update/{id}', [App\Http\Controllers\ContactsGroupController::class, 'update'])->name('contacts_group_update');
            Route::any('/delete/{id}', [App\Http\Controllers\ContactsGroupController::class, 'delete'])->name('contacts_group_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\ContactsGroupController::class, 'publish_unpublish'])->name('contacts_group_publish_unpublish');
        });

        //Contacts
        Route::prefix('manage-contacts')->group(function (){
            Route::get('/', [App\Http\Controllers\ContactsController::class, 'index'])->name('contacts');
            Route::any('/create', [App\Http\Controllers\ContactsController::class, 'create'])->name('contacts_create');
            Route::any('/update/{id}', [App\Http\Controllers\ContactsController::class, 'update'])->name('contacts_update');
            Route::any('/delete/{id}', [App\Http\Controllers\ContactsController::class, 'delete'])->name('contacts_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\ContactsController::class, 'publish_unpublish'])->name('contacts_publish_unpublish');
        });

    });
});





