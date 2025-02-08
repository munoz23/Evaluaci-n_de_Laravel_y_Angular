<?php

namespace App\Http\Controllers\Api\V1\admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grado; 
use App\Models\Estudiante; 

use App\Http\Requests\EstudianteRequest;

class EstudianteController extends Controller
{
    
    public function store(EstudianteRequest $request)
    {
        $grado = Grado::create($request->all());
        $request['grado_id'] = $grado->id;
        $estudiante = Estudiante::create($request->all());

        return response()->json(['message' => 'Estudiante creado con éxito', 'data' => $estudiante], 201);
    }
    public function index($id_grado)
    {
        $estudiantes = Estudiante::where('grado_id', $id_grado)->with('grado')->get();

        return response()->json(['data' => $estudiantes], 200);
    }
}
