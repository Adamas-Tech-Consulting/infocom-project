<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Auth;

//Model
use App\Models\ConferenceCategory;
use App\Models\ConferenceMethod;
use App\Models\Conference;

class HomeController extends BaseController
{
    public function getConference(Request $request)
    {
        $rows = Conference::join('conference_category','conference_category.id','=','conference.conference_category_id')
        ->join('conference_method','conference_method.id','=','conference.conference_method_id')
        ->get(['conference.*','conference_category.name as conference_category_name','conference_method.name as conference_method_name']);
        return response()->json($rows->toArray(), 200); 
    }
}