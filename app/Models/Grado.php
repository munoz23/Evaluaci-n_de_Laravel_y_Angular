<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Grado extends Model
{
    use HasFactory;
    protected $fillable = [
        'grado',
        'seccion',
    ];

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class);
    }
}
