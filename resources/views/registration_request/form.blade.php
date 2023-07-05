@extends('layouts.frontend')
@section('title', $page_name)

@section('content')
<section>
  <div class="container py-4 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block" style="padding: 1rem;">
              <img src="{{($row_event->event_logo)?config('constants.CDN_URL').'/'.config('constants.EVENT_FOLDER').'/'.$row_event->event_logo:'/dist/img/no-banner.jpg'}}"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              <h4 class="text-center mt-2">{{$row_event->title}}</h4>
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-1 p-lg-4 text-black">
                <form>
                  <h5 class="fw-normal mb-1 pb-1" style="letter-spacing: 1px;">
                    Please fill up all information 
                    <p class="small text-muted mt-1 text-red">* Marked fields are mandatory</p>
                  </h5>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label class="form-label" for="form2Example17">First Name <span class="text-red">*</span></label>
                        <input type="email" id="form2Example17" class="form-control form-control-md"  />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label class="form-label" for="form2Example17">Last Name <span class="text-red">*</span></label>
                        <input type="email" id="form2Example17" class="form-control form-control-md"  />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label class="form-label" for="form2Example17">Email Id <span class="text-red">*</span></label>
                        <input type="email" id="form2Example17" class="form-control form-control-md"  />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label class="form-label" for="form2Example17">Mobile Number <span class="text-red">*</span></label>
                        <input type="email" id="form2Example17" class="form-control form-control-md"  />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <label class="form-label" for="form2Example17">Designation <span class="text-red">*</span></label>
                        <input type="email" id="form2Example17" class="form-control form-control-md"  />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label class="form-label" for="form2Example17">Organization <span class="text-red">*</span></label>
                        <input type="email" id="form2Example17" class="form-control form-control-md"  />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="form2Example27">Car Pick Up Address <span class="text-red">*</span></label>
                    <textarea class="form-control form-control-md"></textarea>
                  </div>

                  <div class="form-group"> 
                    <div class="icheck-primary">
                      <input class="form-check-input" type="checkbox" name="agree" id="agree">
                      <label for="agree">By registering, you agree to Indiainfocom <a href="http://indiainfocom1.com/page/disclaimer" target="_blank">Terms &amp; Conditions</a></label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group d-flex">
                        <label class="form-label mr-2">Captcha: <span id="captchaText">0 + 9 =</span></label>
                        <input id="captchaInput" aria-label="Captcha Input" type="text" class="form-control" oninput="myFunction(3)" required="" style="width: 67%;">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <button type="submit" class="btn btn-dark btn-block btn-md" disabled="disabled"><i class="fa fa-paper-plane"></i> SUBMIT</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection