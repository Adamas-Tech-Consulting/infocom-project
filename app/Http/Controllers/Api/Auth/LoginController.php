<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;  
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Client;
use Laravel\Passport\HasApiTokens;
use App\Models\RegistrationRequest;
use Mail;
use Validator;
use Hash;

class LoginController extends BaseController
{

    use IssueTokenTrait;

	private $client;

	public function __construct(){
		$this->client = Client::find(2);
	}

    public function login(Request $request)
    {
    	$this->validate($request, [
    		'mobile' => 'required',
    		'otp' => 'required'
    	]);
        
        $authUser = RegistrationRequest::where('mobile', $request->mobile)->first();
        if(isset($authUser) && $authUser->published == 0){
            return response()->json('Blocked User', 401); 
        }
        else{
            if(isset($authUser))
            {
                $request->request->add(['email' => $authUser->email]);
                $request->request->add(['password' => $request->otp]);
                return $this->issueToken($request, 'password');  
            }
            else{
                return response()->json('invalid User login', 401);
            }
        }
    }

    public function refresh(Request $request){
    	$this->validate($request, [
    		'refresh_token' => 'required'
    	]);

    	return $this->issueToken($request, 'refresh_token');
    }
    
    public function logoutApi()
    {

        $token = Auth::user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);

    }
    
}
