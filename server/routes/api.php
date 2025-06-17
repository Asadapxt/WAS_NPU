<?php

use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

// Route::get('/sso-user', function (Request $request) {
//     return $request->user();
// })->middleware('sso.auth');


Route::middleware('sso.auth')->group(function () {
    Route::post('/user', [UserController::class, 'addUser']);
    Route::get('/user', [UserController::class, 'currentUser']);
    Route::get('/users', [UserController::class, 'listUsers']);
    Route::get('/sso-user', [UserController::class, 'getSSOUser']);

    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    Route::put('/users/{id}', [UserController::class, 'updateUser']);
    Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

    Route::get('/search-users', [UserController::class, 'filterUser']);
    Route::post('/user/check-master-id', [UserController::class, 'checkMasterId']);
});
