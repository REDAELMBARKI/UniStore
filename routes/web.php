<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';


//tanent routes
Route::get('/stores/new' , [TanentController::class,  'create']);

Route::prefix('tanent')->group(function(){
    Route::get('/overview' , [TanentController::class,  'overview']);
    Route::get('/analytics' , [TanentController::class,  'analytics']);
    Route::get('/stores' , [TanentController::class,  'instances']);
    Route::get('/subscriptions' , [TanentController::class,  'subscriptions']);
    Route::get('/details' , [TanentController::class,  'details']);
});



// ── Analytics & Overview ─────────────────────────────────────

// ── Catalog Management ───────────────────────────────────────
Route::get('/products',        [ProductController::class, 'index']) ->name('products');
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
Route::post('/products',       [ProductController::class, 'store']) ->name('products.store');

Route::prefix('admin/instance')->group(function(){
    Route::get('/products',        [ProductController::class, 'index']) ->name('admin.instance.products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('admin.instance.products.create');
    Route::post('/products',       [ProductController::class, 'store']) ->name('admin.instance.products.store');
});

Route::get('/categories',        [CategoryController::class, 'index']) ->name('categories.index');
Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');

// ── Sales & Orders ───────────────────────────────────────────
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

