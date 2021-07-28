<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

include __DIR__ . '/../Utils/Error.php';

use function App\Http\Utils\errorResponse;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        $user = $this->create($request->all());

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json([
                'user' => $user,
                'message' => 'registration successful'
            ], 201);
        }
    }

    public function testPassword(Request $request)
    {
        $credentials = $request->only('userid', 'password');
        if (auth('web')->attempt($credentials)) {
            return response()->json(['result' => true], 200);
        }else{
            return response()->json(['result' => false], 200);
        }
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => ['required', 'string', 'min:4', 'max:32', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:4', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    protected function guard()
    {
        return Auth::guard();
    }

    public function check()
    {
        if (Auth::check()) {
            return response()->json(['user' => Auth::user()], 200);
        } else {
            return response()->json(['user' => null], 200);
        }
    }

    public function login(Request $request)
    {
        $email = filter_var($request->username, FILTER_VALIDATE_EMAIL);

        //if email is valid, then user is attempting to log in with email
        if ($email) {
            if (Auth::attempt(['email' => $request->username, 'password' => $request->password])) {
                $user = User::where('email', '=', $email)->first();
                if($user->role == 3) return response()->json(['message' => 'User Banned'], 401);
                $token = $user->createToken('access_token')->plainTextToken;
                return response()->json(['message' => 'Login successful', 'access_token' => $token], 200);
            } else {
                return errorResponse(
                    'Invalid Credentmials',
                    ["login" => ["Email and Password do not match."]],
                    401
                );
            }
        }
        //else user entered username
        else {
            if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
                $user = User::where('username', '=', $request->username)->first();
                if($user->role == 3) return response()->json(['message' => 'User Banned'], 401);
                $token = $user->createToken('access_token')->plainTextToken;
                return response()->json(['message' => 'Login successful', 'access_token' => $token], 200);
            } else {
                return errorResponse(
                    'Invalid Credentials',
                    ["login" => ["Username and Password do not match."]],
                    401
                );
            }
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged Out'], 200);
    }
}
