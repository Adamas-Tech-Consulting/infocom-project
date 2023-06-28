<?php 

namespace App\Http\Controllers\Api\Auth;

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
		$json = (array)json_decode($response->getContent());
		$json['user_details'] = $request->user;
		$response->setContent(json_encode($json));
		return $response;
	}
}