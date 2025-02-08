<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/v1/statusTest', function () {
    return response()->json(['status' => 'API is active'], 200);
});



//rutas publicas
Route::namespace('App\Http\Controllers\Api\V1\public')
    ->group(function(){
    Route::post('/v1/login', 'AuthApiController@login');

    });
//rutas protegidas 
Route::middleware('auth:sanctum')
    ->namespace('App\Http\Controllers\Api\V1\admin')
    ->group(function () {
    //Crud personas
    //validar token
    Route::get('/v1/tokenTest', function () {
        return response()->json(['status' => 'Token is active'], 200);
    });
   
   
//fin validar token

//cerrar sesion
    Route::post('/v1/logout', [App\Http\Controllers\Api\V1\Public\AuthApiController::class, 'logout']);
// fin cerrar sesion
});