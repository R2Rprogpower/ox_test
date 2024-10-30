<?php

namespace App\Http\Controllers\Api\V1;


use App\Http\Controllers\Controller;
use App\Models\V1\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Api\V1\RegisterUserRequest;
use App\Http\Requests\Api\V1\LoginUserRequest;
use Illuminate\Support\Carbon;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function hello() {
        echo 'Welcome to v1';
    }

    public function register(RegisterUserRequest $request)
    {
        // The validation is already handled
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    }


    public function login(LoginUserRequest $request)
    {
        // Retrieve the credentials from the validated request
        $credentials = $request->only('email', 'password');
        $tokenName = $request->token_name;
        $expiresAt = $expiresAt ?? Carbon::now()->addDay();

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // Authentication successful
            $user = Auth::user();
            $token = $user->createToken(name: $tokenName, expiresAt:  $expiresAt   )->plainTextToken;

            return response()->json(['message' => 'Login successful!', 'token' => $token], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
