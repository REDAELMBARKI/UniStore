<?php

namespace App\Http\Controllers\Admin\Instance;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;


class OrderItemController extends Controller
{
    public function index($orderId)
    {
        $items = OrderItem::where('order_id', $orderId)->get();

        return inertia('Admin/Instance/Orders/Items', [
            'items' => $items
        ]);
    }

    public function destroy($id)
    {
        OrderItem::findOrFail($id)->delete();

        return back();
    }
}
