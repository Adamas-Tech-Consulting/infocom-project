<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use DB;
use Validator;
use App\QuestionPaperQuestionModel;
use App\ExaminationModel;
use App\AssignExamModel;
use App\StudentExaminationModel;
use App\ExaminationResultModel;

class StudentExaminationController extends Controller
{
  public function exam_list(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'secret' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['Secret Key is required'], 402);
    }

    $key = DB::table('api_keys')->where('secret_key', '=', $request->secret)->first();

    if (!$key) {
      return response()->json(['Invalid Secret Key !'], 400);
    }

    $student_id = $key->user_id;

    $data = array(
      'current_exams'   =>  StudentExaminationModel::get_student_examination('current',$student_id),
      'upcoming_exams'  =>  StudentExaminationModel::get_student_examination('upcoming',$student_id),
      'completed_exams' =>  StudentExaminationModel::get_student_examination('completed',$student_id),
      'expired_exams'   =>  StudentExaminationModel::get_student_examination('expired',$student_id)
    );
    
    return response()->json(array('data'=>$data), 200);
  }

  public function exam_start(Request $request)
  {

  }

  public function exam_end(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'secret' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['Secret Key is required'], 402);
    }

    $key = DB::table('api_keys')->where('secret_key', '=', $request->secret)->first();

    if (!$key) {
      return response()->json(['Invalid Secret Key !'], 400);
    }

    $student_id = $key->user_id;
    $examination_id =$request->examination_id;

    $current_datetime = date('Y-m-d H:i:s');
    DB::table('adm_tran_assign_exam')->where('examination_id', '=', $examination_id)->where('student_id', '=', $student_id)->update(['end_at'=>$current_datetime]);
    ExaminationResultModel::prepare_student_exam_result($student_id,$examination_id);
    
  }

  public function exam_result(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'secret' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['Secret Key is required'], 402);
    }

    $key = DB::table('api_keys')->where('secret_key', '=', $request->secret)->first();

    if (!$key) {
      return response()->json(['Invalid Secret Key !'], 400);
    }

    $student_id = $key->user_id;
    $examination_id =$request->examination_id;

    $data = ExaminationResultModel::from('adm_tran_examination_result as exm_res')
                                  ->join("adm_tran_examination as exm", "exm.examination_id", "=", "exm_res.examination_id")
                                  ->join("adm_tran_assign_exam as asgn_exm",function($join){
                                      $join->on("asgn_exm.examination_id", "=", "exm_res.examination_id")
                                            ->on("asgn_exm.student_id", "=", "exm_res.student_id");
                                  })
                                  ->where('exm_res.examination_id','=',$examination_id)
                                  ->where('exm_res.student_id','=',$student_id)
                                  ->get(['exm_res.*','exm.name','asgn_exm.start_time'])
                                  ->first();

    return response()->json(array('data'=>$data), 200);
  }
  
}