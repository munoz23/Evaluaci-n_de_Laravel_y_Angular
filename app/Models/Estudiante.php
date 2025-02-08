<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'fecha_nacimiento',
        'nombre_padre',
        'nombre_madre',
        'fecha_ingreso',
        'grado_id',
    ];
    public function grado()
    {
        return $this->belongsTo(Grado::class);
    }
}
