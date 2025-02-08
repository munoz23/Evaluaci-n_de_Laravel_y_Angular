<?php

use Illuminate\Support\Facades\Route;

Route::middleware('App\Http\Controllers\Api\V1\public')
    ->group(function(){
    Route::post('/v1/login', 'AuthApiController@login');

    });
