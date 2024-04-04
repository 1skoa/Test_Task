<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;
	protected $table = 'products';

	 /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	  protected $fillable = [
        'article',
        'name',
        'status',
        'data',
    ];

	 /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */

	 protected $casts = [
        'data' => 'array',
    ];


	public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }
    public function routeNotificationForMail($notification)
    {
        return config('products.email');
    }
}
