<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-dark">
  <!-- Left navbar links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
    </li>
  </ul>

  <!-- Right navbar links -->
  <ul class="navbar-nav ml-auto">
    <!-- <li class="nav-item">
      <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
        <i class="fas fa-th-large"></i>
      </a>
    </li> -->
    <li class="nav-item dropdown user user-menu">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        @if(Auth::User()['user_img'] != null && Auth::User()['user_img'] !='' && @file_get_contents('images/user_img/'.Auth::user()['user_img']))
          <img src="{{ asset('images/user_img/'.Auth::User()['user_img'])}}" class="user-image" alt="">
        @else
          <img src="/dist/img/user2-160x160.jpg" class="user-image" alt="">
        @endif
      </a>
      <ul class="dropdown-menu">
        <!-- User image -->
        <li class="user-header">
            @if(Auth::User()['user_img'] != null && Auth::User()['user_img'] !='' && @file_get_contents('images/user_img/'.Auth::user()['user_img']))
            <img src="{{ asset('images/user_img/'.Auth::User()['user_img'])}}" class="img-circle" alt="User Image">
          @else
            <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="">
          @endif
          </br>
          <p>
            {{Auth::User()['name']}}
            <small>{{ __('Member Since') }}: {{ date('jS F Y',strtotime( Auth::User()['created_at']))}}</small>
          </p>
          
        </li>

        <li class="user-footer">
          <div class="float-left">
            <a href="#" class="btn btn-warning btn-sm">{{ __('Profile') }}</a>
          </div>
          <div class="float-right">

            <a class="btn btn-warning btn-sm" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
              {{ __('Logout') }}
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST">
                @csrf
            </form>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</nav>
  <!-- /.navbar -->