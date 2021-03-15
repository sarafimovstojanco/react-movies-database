<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        return User::find($id);
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->only('first_name', 'last_name', 'email') + [
            'password' => Hash::make(1234),
            'background' => '#2E3B55',
            'color' => 'blue',
            'dark_mode' => false,
        ]);
        return response($user, Response::HTTP_CREATED);
    }

    function update(UserUpdateRequest $request, $id)
    {
        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email', 'background', 'color', 'dark_mode')+[
            'password' => Hash::make($request->password)
            // 'background' => $request->background,
            // 'color' => $request->color,
            // 'dark_mode' => $request->dark_mode,
        ]);

        return response($user, Response::HTTP_ACCEPTED); 
    }

    public function destroy($id)
    {
        User::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
