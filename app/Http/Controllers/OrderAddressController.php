<?php



namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderAddress;


class OrderAddressController extends Controller
{

    public function store(Request $request)
    {
        $order = Order::create([
            'user_id' => auth()->id(),
            'status' => 'pending'
        ]);

        OrderAddress::create([
            'order_id' => $order->id,
            'name' => $request->name,
            'phone' => $request->phone,
            'city' => $request->city,
            'address' => $request->address,
        ]);

        return redirect('/thank-you');
    }
}
