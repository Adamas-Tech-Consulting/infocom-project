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

    //Frontend
    Route::get('/registration/{event_slug}', [App\Http\Controllers\FrontendController::class, 'registration_form'])->name('registration_form');

    //Authendication
    Route::middleware(['auth'])->group(function () {    

        //Dashboard
        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

        /* Master Setup */

        //Event Category
        Route::prefix('manage-event-category')->group(function (){
            Route::get('/', [App\Http\Controllers\EventCategoryController::class, 'index'])->name('event_category');
            Route::any('/create', [App\Http\Controllers\EventCategoryController::class, 'create'])->name('event_category_create');
            Route::any('/update/{id}', [App\Http\Controllers\EventCategoryController::class, 'update'])->name('event_category_update');
            Route::any('/delete/{id}', [App\Http\Controllers\EventCategoryController::class, 'delete'])->name('event_category_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\EventCategoryController::class, 'publish_unpublish'])->name('event_category_publish_unpublish');
        });

        //Schedule Type
        Route::prefix('manage-schedule-type')->group(function (){
            Route::get('/', [App\Http\Controllers\ScheduleTypeController::class, 'index'])->name('schedule_type');
            Route::any('/create', [App\Http\Controllers\ScheduleTypeController::class, 'create'])->name('schedule_type_create');
            Route::any('/update/{id}', [App\Http\Controllers\ScheduleTypeController::class, 'update'])->name('schedule_type_update');
            Route::any('/delete/{id}', [App\Http\Controllers\ScheduleTypeController::class, 'delete'])->name('schedule_type_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\ScheduleTypeController::class, 'publish_unpublish'])->name('schedule_type_publish_unpublish');
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
            Route::get('/{event_id?}', [App\Http\Controllers\SponsorsController::class, 'index'])->name('sponsors')->where('event_id', '[0-9]+');
            Route::any('/create/{event_id?}', [App\Http\Controllers\SponsorsController::class, 'create'])->name('sponsors_create');
            Route::any('/update/{id}/{event_id?}', [App\Http\Controllers\SponsorsController::class, 'update'])->name('sponsors_update');
            Route::any('/delete/{id}/{event_id?}', [App\Http\Controllers\SponsorsController::class, 'delete'])->name('sponsors_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\SponsorsController::class, 'publish_unpublish'])->name('sponsors_publish_unpublish');
        });

        //Speaker Category
        Route::prefix('manage-speakers-category')->group(function (){
            Route::get('/', [App\Http\Controllers\SpeakersCategoryController::class, 'index'])->name('speakers_category');
            Route::any('/create', [App\Http\Controllers\SpeakersCategoryController::class, 'create'])->name('speakers_category_create');
            Route::any('/update/{id}', [App\Http\Controllers\SpeakersCategoryController::class, 'update'])->name('speakers_category_update');
            Route::any('/delete/{id}', [App\Http\Controllers\SpeakersCategoryController::class, 'delete'])->name('speakers_category_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\SpeakersCategoryController::class, 'publish_unpublish'])->name('speakers_category_publish_unpublish');
        });

        //Speakers
        Route::prefix('manage-speakers')->group(function (){
            Route::get('/{event_id?}', [App\Http\Controllers\SpeakersController::class, 'index'])->name('speakers')->where('event_id', '[0-9]+');
            Route::any('/create/{event_id?}', [App\Http\Controllers\SpeakersController::class, 'create'])->name('speakers_create');
            Route::any('/update/{id}/{event_id?}', [App\Http\Controllers\SpeakersController::class, 'update'])->name('speakers_update');
            Route::any('/delete/{id}/{event_id?}', [App\Http\Controllers\SpeakersController::class, 'delete'])->name('speakers_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\SpeakersController::class, 'publish_unpublish'])->name('speakers_publish_unpublish');
        });

        //Contact Information
        Route::prefix('manage-contact-information')->group(function (){
            Route::get('/', [App\Http\Controllers\ContactInformationController::class, 'index'])->name('contact_information');
            Route::any('/create/{event_id?}/{schedule_id?}', [App\Http\Controllers\ContactInformationController::class, 'create'])->name('contact_information_create');
            Route::any('/update/{id}', [App\Http\Controllers\ContactInformationController::class, 'update'])->name('contact_information_update');
            Route::any('/delete/{id}', [App\Http\Controllers\ContactInformationController::class, 'delete'])->name('contact_information_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\ContactInformationController::class, 'publish_unpublish'])->name('contact_information_publish_unpublish');
        });

        //Users
        Route::prefix('manage-users')->group(function (){
            Route::get('/', [App\Http\Controllers\UserController::class, 'index'])->name('users');
            Route::any('/create', [App\Http\Controllers\UserController::class, 'create'])->name('users_create');
            Route::any('/update/{id}', [App\Http\Controllers\UserController::class, 'update'])->name('users_update');
            Route::any('/update-password/{id}', [App\Http\Controllers\UserController::class, 'update_password'])->name('users_update_password');
            Route::any('/delete/{id}', [App\Http\Controllers\UserController::class, 'delete'])->name('users_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\UserController::class, 'publish_unpublish'])->name('users_publish_unpublish');
        });

        
        //Event
        Route::prefix('manage-event')->group(function (){
            Route::get('/{mode?}', [App\Http\Controllers\EventController::class, 'index'])->name('event');
            Route::any('/create', [App\Http\Controllers\EventController::class, 'create'])->name('event_create');
            Route::any('/update/{id}', [App\Http\Controllers\EventController::class, 'update'])->name('event_update');
            Route::any('/delete/{id}', [App\Http\Controllers\EventController::class, 'delete'])->name('event_delete');
            Route::post('/publish-unpublish', [App\Http\Controllers\EventController::class, 'publish_unpublish'])->name('event_publish_unpublish');
            Route::post('/featured', [App\Http\Controllers\EventController::class, 'featured'])->name('event_featured');
            Route::any('/schedule-speakers/{event_id}', [App\Http\Controllers\EventController::class, 'schedule_speakers'])->name('event_schedule_speakers');
            Route::any('/contact-information/{event_id}', [App\Http\Controllers\EventController::class, 'contact_information'])->name('event_contact_information');
        });

        //Track Master
        Route::prefix('manage-track')->group(function (){
            Route::get('/{event_id}', [App\Http\Controllers\TrackController::class, 'index'])->name('track');
            Route::any('/create/{event_id}', [App\Http\Controllers\TrackController::class, 'create'])->name('track_create');
            Route::any('/update/{event_id}/{id}', [App\Http\Controllers\TrackController::class, 'update'])->name('track_update');
            Route::any('/delete/{event_id}/{id}', [App\Http\Controllers\TrackController::class, 'delete'])->name('track_delete');
        });

        //Schedule
        Route::prefix('manage-schedule')->group(function (){
            Route::get('/{event_id}', [App\Http\Controllers\ScheduleController::class, 'index'])->name('schedule');
            Route::any('/create/{event_id}', [App\Http\Controllers\ScheduleController::class, 'create'])->name('schedule_create');
            Route::any('/update/{event_id}/{id}', [App\Http\Controllers\ScheduleController::class, 'update'])->name('schedule_update');
            Route::any('/delete/{event_id}/{id}', [App\Http\Controllers\ScheduleController::class, 'delete'])->name('schedule_delete');
            Route::post('/publish-unpublish/{event_id}', [App\Http\Controllers\ScheduleController::class, 'publish_unpublish'])->name('schedule_publish_unpublish');
            Route::any('/speakers/{event_id}/{id?}', [App\Http\Controllers\ScheduleController::class, 'speakers'])->name('schedule_speakers');
            Route::any('/contact-information/{event_id}/{id}', [App\Http\Controllers\ScheduleController::class, 'contact_information'])->name('schedule_contact_information');
        });

        //Invitation
        Route::prefix('manage-invitation')->group(function (){
            Route::get('/', [App\Http\Controllers\InvitationController::class, 'index'])->name('invitation');
            Route::any('/create', [App\Http\Controllers\InvitationController::class, 'create'])->name('invitation_create');
            Route::any('/update/{id}', [App\Http\Controllers\InvitationController::class, 'update'])->name('invitation_update');
            Route::any('/delete/{id}', [App\Http\Controllers\InvitationController::class, 'delete'])->name('invitation_delete');
            Route::get('/invitee/{id}', [App\Http\Controllers\InvitationController::class, 'invitee'])->name('invitation_invitee');
            Route::post('/publish-unpublish', [App\Http\Controllers\InvitationController::class, 'publish_unpublish'])->name('invitation_publish_unpublish');
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
            Route::get('/{group_id}', [App\Http\Controllers\ContactsController::class, 'index'])->name('contacts');
            Route::any('/create/{group_id}', [App\Http\Controllers\ContactsController::class, 'create'])->name('contacts_create');
            Route::any('/update/{group_id}/{id}', [App\Http\Controllers\ContactsController::class, 'update'])->name('contacts_update');
            Route::any('/delete/{group_id}/{id}', [App\Http\Controllers\ContactsController::class, 'delete'])->name('contacts_delete');
            Route::post('/publish-unpublish/{group_id}', [App\Http\Controllers\ContactsController::class, 'publish_unpublish'])->name('contacts_publish_unpublish');
            Route::get('/download/sample/{group_id}', [App\Http\Controllers\ContactsController::class, 'download'])->name('contact_sample_download');
            Route::post('/upload/{group_id}', [App\Http\Controllers\ContactsController::class, 'upload'])->name('contact_upload');
        });
        

        //Registration Requests
        Route::prefix('manage-registration-request')->group(function (){
            Route::get('/{event_id}', [App\Http\Controllers\RegistrationRequestController::class, 'index'])->name('registration_request');
            Route::get('/download/{event_id}', [App\Http\Controllers\RegistrationRequestController::class, 'download'])->name('registration_request_download');
        });

    });
});





