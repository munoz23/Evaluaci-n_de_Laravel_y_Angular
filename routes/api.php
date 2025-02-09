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
    
    Route::post('/crear-alumno', 'EstudianteController@store');
    Route::get('/consultar-alumno/{idGrado}', 'EstudianteController@index');
   
//fin validar token

//cerrar sesion
    Route::post('/v1/logout', [App\Http\Controllers\Api\V1\public\AuthApiController::class, 'logout']);
// fin cerrar sesion
});