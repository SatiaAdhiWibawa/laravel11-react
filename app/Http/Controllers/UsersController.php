<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class UsersController extends Controller
{

    // VARIABLES GLOBALS
    protected $rules = [
        'name'     => 'required|string|max:255',
        'email'    => 'required|string|email|max:255',
        'password' => 'required|string|min:8|confirmed',
    ];


    // ================================== //
    // FUCTION TO DISPLAY USERS INDEX PAGE //
    // ================================== //
    public function index()
    {
        try {
            return Inertia::render('Users/Index', [
                'users' => User::all(),
            ]);
        } catch (Exception $e) {
            abort(500, 'Internal Server Error' . $e->getMessage());
        }
    }


    // =================================== //
    // FUCTION CREATE A NEW USER RECORD    //
    // =================================== //
    public function create()
    {
        try {
            return Inertia::render('Users/Create');
        } catch (Exception $e) {
            abort(500, 'Internal Server Error' . $e->getMessage());
        }
    }


    // =================================== //
    // FUCTION STORE A NEW USER RECORD    //
    // =================================== //
    public function store(Request $request)
    {
        try {
            $request->validate($this->rules);
            User::create($request->all());
            return redirect()->route('users.index')->with('success', 'User berhasil ditambahkan!');
        } catch (Exception $e) {
            abort(500, 'Internal Server Error' . $e->getMessage());
        }
    }

    // =================================== //
    // FUCTION TO DISPLAY USERS EDIT PAGE //
    // =================================== //
    public function edit($id)
    {
        try {
            return Inertia::render('Users/Edit', [
                'user' => User::find($id),
            ]);
        } catch (Exception $e) {
            abort(500, 'Internal Server Error' . $e->getMessage());
        }
    }


    // =================================== //
    // FUCTION TO UPDATE A USER RECORD //
    // =================================== //
    public function update(Request $request, $id)
    {
        try {
            $request->validate($this->rules);
            $user = User::find($id);
            $user->update($request->all());
            return redirect()->route('users.index')->with('success', 'User berhasil diupdate!');
        } catch (Exception $e) {
            abort(500, 'Internal Server Error' . $e->getMessage());
        }
    }


    // =================================== //
    // FUCTION TO DELETE A USER RECORD //
    // =================================== //
    public function destroy($id)
    {
        try {
            User::destroy($id);
            return redirect()->route('users.index')->with('success', 'User berhasil dihapus!');
        } catch (Exception $e) {
            abort(500, 'Internal Server Error' . $e->getMessage());
        }
    }
}
