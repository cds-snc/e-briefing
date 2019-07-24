<?php

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

Route::get('/', 'HomeController@index');

Auth::routes(['verify' => true]);

Route::get('password/change', ['as' => 'password.edit', 'uses' => 'Auth\ChangePasswordController@edit']);
Route::post('password/change', ['as' => 'password.update', 'uses' => 'Auth\ChangePasswordController@update']);

Route::resource('users', 'UserController');
Route::resource('binders', 'BinderController');

Route::post('binders/{binder}/generate', ['as' => 'binders.generate', 'uses' => 'GenerateBinderPackage']);

/*
 * Days
 */
Route::resource('days', 'DayController', ['only' => [
    'edit', 'update', 'destroy'
]]);

Route::resource('binders.days', 'BinderDaysController', ['only' => [
    'index', 'create', 'store'
]]);

/*
 * People
 */
Route::resource('people', 'PeopleController', ['only' => [
    'destroy', 'edit', 'update'
]]);

Route::resource('binders.people', 'BinderPeopleController', ['only' => [
    'index', 'create', 'store'
]]);

/*
 * Documents
 */
Route::resource('documents', 'DocumentsController', ['only' => [
    'edit', 'update', 'destroy'
]]);

Route::resource('binders.documents', 'BinderDocumentsController', ['only' => [
    'index', 'create', 'store'
]]);

Route::get('documents/{document}/preview', 'DocumentPreviewController');

/*
 * Articles
 */
Route::resource('articles', 'ArticlesController', ['only' => [
    'show', 'edit', 'update', 'destroy'
]]);

Route::resource('binders.articles', 'BinderArticlesController', ['only' => [
    'index', 'create', 'store'
]]);

/*
 * Events
 */
Route::resource('days.events', 'DayEventsController', ['only' => [
    'index', 'create', 'store'
]]);

Route::resource('events', 'EventController', ['only' => [
    'show', 'edit', 'update', 'destroy'
]]);

/*
 * Collaborators
 */
Route::resource('binders.collaborators', 'BinderCollaboratorsController', ['only' => [
    'index'
]]);

Route::put('binders/{binder}/collaborators', ['as' => 'binders.collaborators.add', 'uses' => 'BinderCollaboratorsController@add']);


Route::put('events/{event}/participants', ['as' => 'events.participants.add', 'uses' => 'EventParticipantsController@add']);
Route::get('events/{event}/participants/create', ['as' => 'events.participants.create', 'uses' => 'EventParticipantsController@create']);
Route::post('events/{event}/participants', ['as' => 'events.participants.store', 'uses' => 'EventParticipantsController@store']);
Route::delete('events/{event}/participants/{person}/remove', ['as' => 'events.participants.remove', 'uses' => 'EventParticipantsController@remove']);

Route::put('events/{event}/contacts', ['as' => 'events.contacts.add', 'uses' => 'EventContactsController@add']);
Route::get('events/{event}/contacts/create', ['as' => 'events.contacts.create', 'uses' => 'EventContactsController@create']);
Route::post('events/{event}/contacts', ['as' => 'events.contacts.store', 'uses' => 'EventContactsController@store']);
Route::delete('events/{event}/contacts/{person}/remove', ['as' => 'events.contacts.remove', 'uses' => 'EventContactsController@remove']);

Route::put('events/{event}/documents', ['as' => 'events.documents.add', 'uses' => 'EventDocumentsController@add']);
Route::get('events/{event}/documents/create', ['as' => 'events.documents.create', 'uses' => 'EventDocumentsController@create']);
Route::post('events/{event}/documents', ['as' => 'events.documents.store', 'uses' => 'EventDocumentsController@store']);
Route::delete('events/{event}/documents/{document}/remove', ['as' => 'events.documents.remove', 'uses' => 'EventDocumentsController@remove']);