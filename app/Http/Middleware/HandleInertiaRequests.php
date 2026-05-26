<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = \App\Models\StoreSetting::all()->pluck('value', 'key')->toArray();
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? $request->user()->load('roles') : null,
            ],
            'flash' => [
                'client_secret' => session('client_secret'),
                'order_id'      => session('order_id'),
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
                'errors'  => $request->session()->get('errors'), 
            ],
            'storeConfigs' => [
                'store_theme_style' => $settings['store_theme_style'] ?? 'orangeNight',
                'store_layout_style' => $settings['store_layout_style'] ?? 'grid',
                'store_card_config' => isset($settings['store_card_config']) ? json_decode($settings['store_card_config'], true) : [
                    'cardId' => 'card-2',
                    'showPrice' => true,
                    'showRating' => true,
                    'showBorder' => true,
                    'isRounded' => true,
                ],
                'admin_theme_style' => $settings['admin_theme_style'] ?? 'luxuryNoir',
                'admin_theme_mode' => $settings['admin_theme_mode'] ?? 'dark',
            ],
            'cartCount' => $request->user() ? \App\Models\Cart::where('user_id', $request->user()->id)->sum('quantity') : 0,
            'cartItems' => $request->user() ? app(\App\Services\CartService::class)->getCartItems(false) : [],
        ];
    }
}
