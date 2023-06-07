<aside class="main-sidebar sidebar-light-lightblue elevation-4">
  <!-- Brand Logo -->
  <a href="index3.html" class="brand-link">
    <img src="{{ site_settings('site_favicon') }}" alt="{{ site_settings('site_name') }}" class="brand-image"> <!--Extra class : img-circle elevation-3 -->
    <span class="brand-text font-weight-light">{{ site_settings('site_name') }}</span>
  </a>
  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library -->
        <li class="nav-item">
          <a href="{{route('dashboard')}}" class="nav-link {{ Nav::isRoute('dashboard') }}">
            <i class="nav-icon fas fa-home"></i>
            <p>
              {{ __('admin.dashboard') }}
            </p>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link {{ Nav::isResource('conference') }} {{ Nav::isResource('event') }}">
            <i class="nav-icon fas fa-users"></i>
            <p>
              {{ __('admin.conference') }}
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview {{ Nav::isResource('conference') }} {{ Nav::isResource('event') }}">
            <li class="nav-item">
              <a href="{{route('conference_category')}}" class="nav-link {{ Nav::isRoute('conference_category') }} {{ Nav::isRoute('conference_category_create') }} {{ Nav::isRoute('conference_category_update') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.conference_category') }}</p>
                <!-- <span class="right badge badge-info">2</span> -->
              </a>
            </li>
            <li class="nav-item">
              <a href="{{route('conference')}}" class="nav-link {{ Nav::isRoute('conference') }} {{ Nav::isRoute('conference_create') }} {{ Nav::isRoute('conference_update') }} {{ Nav::isResource('event') }}">
                <i class="fas fa-users nav-icon"></i>
                <p>{{ __('admin.conference') }}</p>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link {{ Nav::isResource('manage-sponsors') }}">
            <i class="nav-icon fas fa-handshake"></i>
            <p>
              {{ __('admin.sponsors') }}
              <i class="fas fa-angle-left right"></i>
              <!-- <span class="badge badge-info right">6</span> -->
            </p>
          </a>
          <ul class="nav nav-treeview {{ Nav::isResource('manage-sponsors') }}">
            <li class="nav-item">
              <a href="{{route('sponsorship_type')}}" class="nav-link {{ Nav::isRoute('sponsorship_type') }} {{ Nav::isRoute('sponsorship_type_create') }} {{ Nav::isRoute('sponsorship_type_update') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.sponsorship_type') }}</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{route('sponsors')}}" class="nav-link {{ Nav::isRoute('sponsors') }} {{ Nav::isRoute('sponsors_create') }} {{ Nav::isRoute('sponsors_update') }}">
                <i class="far fa-user nav-icon"></i>
                <p>{{ __('admin.sponsors') }}</p>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="{{route('speakers')}}" class="nav-link {{ Nav::isResource('manage-speakers') }}">
            <i class="nav-icon fas fa-volume-up"></i>
            <p>
              {{ __('admin.speakers') }}
            </p>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>