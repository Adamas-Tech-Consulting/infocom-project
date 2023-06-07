@extends('layouts.app')
@section('title', 'Login')
@section('content')

<div class="login-logo">
    <img src="dist/img/logo.gif">
</div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
        <p class="login-box-msg">{{ __('admin.login_msg') }}</p>
        
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="input-group mb-3">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus  placeholder="{{ __('admin.email_address') }}">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                    </div>
                </div>
                @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
            <div class="input-group mb-3">
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="{{ __('admin.password') }}">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
            <div class="row">
            <div class="col-8">
                <div class="icheck-primary">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                <label for="remember">
                    {{ __('admin.remember_me') }}
                </label>
                </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">{{ __('admin.login_btn') }}</button>
            </div>
            <!-- /.col -->
            </div>
        </form>

        @if (Route::has('password.request'))
        <p class="mb-1 d-none">
            <a class="btn btn-link" href="{{ route('password.request') }}">
                {{ __('Forgot Your Password?') }}
            </a>
        </p>
        @endif
    </div>
    <!-- /.login-card-body -->
  </div>
@endsection
