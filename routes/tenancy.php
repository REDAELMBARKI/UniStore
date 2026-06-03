<?php

use App\Http\Controllers\TenenacyDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware([
    'web',
    \App\Http\Middleware\HandleInertiaRequests::class,
])->group(function () {


    
    Route::get('/tenancy/dashboard', [TenenacyDashboardController::class , 'index'])->name('tenancy.dashboard');

    Route::get('/tenancy/stores', function () {
        return Inertia::render('tenancy/stores/Index');
    })->name('tenancy.stores');

    Route::get('/tenancy/roles', function () {
        return Inertia::render('tenancy/roles/Index');
    })->name('tenancy.roles');
});
