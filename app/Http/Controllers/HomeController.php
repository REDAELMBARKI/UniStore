<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\HomeLayoutOrc;
use App\Models\Banner;
use App\Models\RuleBasedCollection;
use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $heroSlider = Slider::where('is_active', true)->with('slides')->first();
        $orcs = HomeLayoutOrc::with('sortable')->orderBy('order')->get();
        $feed = [];

        foreach ($orcs as $orc) {
            $component = $orc->sortable;
            if (!$component || !$component->is_active) {
                continue;
            }

            if ($component instanceof Banner) {
                // Eager load associated slots
                $component->load('slots');
                $feed[] = [
                    'type' => 'banner',
                    'data' => $component
                ];
            } elseif ($component instanceof RuleBasedCollection) {
                $query = Product::with(['thumbnail', 'badge', 'nichCategory']);
                
                $rules = $component->rules ?? [];
                foreach ($rules as $rule) {
                    $field = $rule['field'] ?? null;
                    $operator = $rule['operator'] ?? '=';
                    $value = $rule['value'] ?? null;
                    
                    if ($field && $value !== null) {
                        if ($field === 'category_id') {
                            $query->whereHas('nichCategory', function ($q) use ($value) {
                                $q->where('name', $value)->orWhere('id', $value);
                            });
                        } elseif ($field === 'badge') {
                            $query->whereHas('badge', function ($q) use ($value) {
                                $q->where('name', $value);
                            });
                        } elseif ($field === 'discount') {
                            $query->whereHas('variants', function ($q) use ($value) {
                                $q->whereRaw("((compare_price - price) / compare_price * 100) >= ?", [$value]);
                            });
                        } else {
                            $query->where($field, $operator, $value);
                        }
                    }
                }
                
                $limit = $component->layout_config['displayLimit'] ?? 10;
                $products = $query->with(['variants' => function($q) {
                    $q->where('is_default', true);
                }])->limit($limit)->get()->map(function($p) {
                   $defaultVariant = $p->variants->first();
                   return [
                      'id' => $p->id,
                      'name' => $p->name,
                      'brand' => $p->brand,
                      'price' => $defaultVariant ? $defaultVariant->price : 0,
                      'originalPrice' => $defaultVariant ? $defaultVariant->compare_price : 0,
                      // Sellenium media handling fallback
                      'image' => $p->thumbnail ? $p->thumbnail->url ?? null : null,
                      'category' => $p->nichCategory ? $p->nichCategory->name : null,
                      'rating' => $p->rating_average ?? 5,
                      'reviews' => $p->rating_count ?? 0,
                      'badge' => $p->badge ? $p->badge->name : null,
                   ];
                });
                
                $componentData = $component->toArray();
                $componentData['products'] = $products;
                
                $feed[] = [
                    'type' => 'collection',
                    'data' => $componentData
                ];
            }
        }

        return Inertia::render('Home/HomePage', [
            'feed' => $feed,
            'heroSlider' => $heroSlider,
        ]);
    }
}
