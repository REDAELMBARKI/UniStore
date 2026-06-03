<?php

namespace App\Traits;

use App\Models\Store;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToStore
{
    protected static function bootBelongsToStore(): void
    {
        static::creating(function ($model) {
            if (!$model->store_id && session()->has('store_id')) {
                $model->store_id = session()->get('store_id');
            }
        });

        static::addGlobalScope('store', function (Builder $builder) {
            if (session()->has('store_id')) {
                $builder->where('store_id', session()->get('store_id'));
            }
        });
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
