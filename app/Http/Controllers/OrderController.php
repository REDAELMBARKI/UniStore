<?php

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query();

        
        if ($request->status) {
            $query->where('status', $request->status);
        }

       
        if ($request->date) {
            $query->whereDate('created_at', $request->date);
        }

        $orders = $query->latest()->get();

        return Inertia::render('Admin/Instance/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'date'])
        ]);
    }

    public function edit($id)
    {
        $order = Order::findOrFail($id);

        return Inertia::render('Admin/Instance/Orders/Edit', [
            'order' => $order
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $order->update([
            'status' => $request->status
        ]);

        return redirect()->route('orders.index');
    }

    public function destroy($id)
    {
        Order::findOrFail($id)->delete();

        return back();
    }
}
