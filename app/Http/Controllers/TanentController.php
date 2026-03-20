<?php

namespace App\Http\Controllers;

use App\Models\Tanent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TanentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function overview()
    {
        return Inertia::render('Admin/Tanent/OverviewPage');
    }
    public function analytics()
    {
        return Inertia::render('Admin/Tanent/AnalyticsPage');
    }
    public function instances()
    {
        return Inertia::render('Admin/Tanent/StoresPage');
    }
    public function subscriptions()
    {
        return Inertia::render('Admin/Tanent/SubscriptionsPage');
    }

    public function details()
    {
        return Inertia::render('Admin/Tanent/TanentDetailsPage');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    { 
        return Inertia::render("Client/Tanent/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tanent $tanent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tanent $tanent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tanent $tanent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tanent $tanent)
    {
        //
    }
}
