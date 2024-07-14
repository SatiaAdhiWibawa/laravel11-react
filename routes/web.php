<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
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

Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    //     Route::get('/users', [UsersController::class, 'index'])->name('users.index');
    //     Route::get('/users', [UsersController::class, 'index'])->name('users.edit');
    //     Route::post('/users', [UsersController::class, 'index'])->name('users.create');
    //     Route::patch('/users', [UsersController::class, 'update'])->name('users.update');
    //     Route::delete('/users', [UsersController::class, 'destroy'])->name('users.destroy');
    Route::resource('/users', UsersController::class);
});


require __DIR__ . '/auth.php';
