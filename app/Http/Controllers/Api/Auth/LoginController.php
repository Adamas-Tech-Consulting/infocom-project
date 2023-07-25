<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;  
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Client;
use Laravel\Passport\HasApiTokens;
use Laravel\Passport\Token;
use Laravel\Passport\RefreshToken;
use App\Models\RegistrationRequest;
use Mail;
use Validator;
use Hash;
use Response;

class LoginController extends BaseController
{

    use IssueTokenTrait;

	private $client;
    private $data;

	public function __construct(){
		$this->client = Client::find(2);
	}

    public function otp_request(Request $request)
    {
        if ($request->isMethod('post')) 
        {
            $validator = Validator::make($request->all(), [
                'client_id' => 'required',
                'client_secret' => 'required',
                'mobile' => 'required',
            ]);
            if($validator->fails()) 
            {
                return $this->sendError('Invalid Input', 403);
            } 
            else 
            {
                try {
                    if($this->client->id == $request->client_id && $this->client->secret == $request->client_secret)
                    {
                        $authUser = RegistrationRequest::where('mobile', $request->mobile)->first();
                        if(isset($authUser) && $authUser->published == 0)
                        {
                            return $this->sendError('Blocked User', 401);
                        } 
                        else 
                        {
                            if(isset($authUser))
                            {
                                $password = Hash::make('2023');
                                RegistrationRequest::where('id', $authUser->id)->update(['password' => $password]);
                                return $this->sendResponse($this->data, 'OTP Sent'); 
                            }
                            else{
                                return $this->sendError('Invalid User', 401);
                            }
                        }
                    }
                    else
                    {
                        return $this->sendError('Invalid Client ID or Secret', 401);
                    }                        
                }   
                catch(Exception $e) {   
                    return $this->sendError('Forbidden', 403);
                }
            }
        }
    }

    public function login(Request $request)
    {
        if ($request->isMethod('post')) 
        {
            $validator = Validator::make($request->all(), [
                'client_id' => 'required',
                'client_secret' => 'required',
                'mobile' => 'required',
                'otp' => 'required'
            ]);
            if($validator->fails()) 
            {
                return $this->sendError('Invalid Input', 403);
            } 
            else 
            {
                try {
                    if($this->client->id == $request->client_id && $this->client->secret == $request->client_secret)
                    {
                        $authUser = RegistrationRequest::where('mobile', $request->mobile)->first();
                        if(isset($authUser) && $authUser->published == 0)
                        {
                            return $this->sendError('Blocked User', 401);
                        }
                        else
                        {
                            if(isset($authUser))
                            {
                                $request->request->add(['user' => $authUser->toArray()]);
                                $request->request->add(['email' => $authUser->email]);
                                $request->request->add(['password' => $request->otp]);
                                Token::where('user_id', $authUser->id)->delete();
                                RefreshToken::whereNotIn('access_token_id',function($query) {
                                    $query->select('id as access_token_id')->from('oauth_access_tokens');
                                })->delete();
                                return $this->issueToken($request, 'password');
                            }
                            else{
                                return $this->sendError('Invalid User login', 401);
                            }
                        }
                    }
                    else
                    {
                        return $this->sendError('Invalid Client ID or Secret', 401);
                    }     
                }   
                catch(Exception $e) {
                    return $this->sendError('Forbidden', 403);
                }
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
