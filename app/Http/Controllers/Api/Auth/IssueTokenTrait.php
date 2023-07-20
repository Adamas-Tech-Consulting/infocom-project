<?php 

namespace App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Api\BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

trait IssueTokenTrait {
	public function issueToken(Request $request, $grantType, $scope = "*")
	{
		$params = [
			'grant_type' => $grantType,
			'client_id' => $this->client->id,
			'client_secret' => $this->client->secret, 
			'username' => $request->email, 		
			'scope' => $scope
		];
		$request->request->add($params);
		$proxy = Request::create('oauth/token', 'POST');
		$response =  Route::dispatch($proxy);
		$data = (array)json_decode($response->getContent());
		if(array_key_exists('error', $data))
		{
			return $this->sendError('Invalid OTP', 401);
		}
		else
		{
			$response = $data;
			$response['user_details'] = $request->user; 
			return $this->sendResponse($response,'');
		}
	}
}