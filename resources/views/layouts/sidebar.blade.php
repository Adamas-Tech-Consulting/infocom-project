<aside class="main-sidebar sidebar-dark-warning elevation-4">
  <!-- Brand Logo -->
  <a href="{{route('home')}}" class="brand-link">
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
        <li class="nav-item {{ Nav::hasSegment(['manage-conference-category','manage-sponsorship-type','manage-sponsors','manage-speakers'], 1 ,'menu-is-opening menu-open') }}">
          <a href="#" class="nav-link {{ Nav::hasSegment(['manage-conference-category','manage-sponsorship-type','manage-sponsors','manage-speakers']) }}">
            <i class="nav-icon fas fa-cogs"></i>
            <p>
              {{ __('admin.master_setup') }}
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview {{ Nav::hasSegment(['manage-conference-category','manage-event-type','manage-sponsorship-type','manage-sponsors','manage-speakers']) }}">
            <li class="nav-item">
              <a href="{{route('conference_category')}}" class="nav-link {{ Nav::hasSegment('manage-conference-category') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.conference_category') }}</p>
                <!-- <span class="right badge badge-info">2</span> -->
              </a>
            </li>
            <li class="nav-item">
              <a href="{{route('event_type')}}" class="nav-link {{ Nav::hasSegment('manage-event-type') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.event_type') }}</p>
                <!-- <span class="right badge badge-info">2</span> -->
              </a>
            </li>
            <li class="nav-item">
              <a href="{{route('sponsorship_type')}}" class="nav-link {{ Nav::hasSegment('manage-sponsorship-type') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.sponsorship_type') }}</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{route('sponsors')}}" class="nav-link {{ Nav::hasSegment('manage-sponsors') }}">
                <i class="far fa-user nav-icon"></i>
                <p>{{ __('admin.all') }} {{ __('admin.sponsors') }}</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{route('speakers')}}" class="nav-link {{ Nav::hasSegment('manage-speakers') }}">
                <i class="nav-icon fas fa-volume-up"></i>
                <p>{{ __('admin.all') }} {{ __('admin.speakers') }}</p>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="{{route('users')}}" class="nav-link {{ Nav::isResource('manage-users') }}">
            <i class="nav-icon fas fa-user-secret"></i>
            <p>
              {{ __('admin.users') }}
            </p>
          </a>
        </li>
        <li class="nav-item {{ Nav::hasSegment(['manage-conference','manage-event'], 1, 'menu-is-opening menu-open') }}">
          <a href="{{route('conference')}}" class="nav-link {{ Nav::hasSegment(['manage-conference','manage-event']) }}">
            <i class="nav-icon fas fa-users"></i>
            <p>
              {{ __('admin.conference') }}
              <!-- <i class="fas fa-angle-left right"></i> -->
            </p>
          </a>
          <!-- <ul class="nav nav-treeview {{ Nav::hasSegment(['manage-conference','manage-event']) }}">
            <li class="nav-item">
              <a href="{{route('conference')}}" class="nav-link {{ Nav::hasSegment('manage-conference') }}">
                <i class="fas fa-list nav-icon"></i>
                <p>{{ __('admin.conference') }}</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link {{ Nav::isResource('manage-event') }}">
                <i class="fas fa-calendar nav-icon"></i>
                <p>Invite Contacts</p>
              </a>
            </li>
          </ul> -->
        </li>
        <li class="nav-item">
          <a href="{{route('registration_request')}}" class="nav-link {{ Nav::isResource('manage-registration-request') }}">
            <i class="nav-icon fas fa-user"></i>
            <p>
              {{ __('admin.registration_request') }}
            </p>
          </a>
        </li>
        <li class="nav-item">
          <a href="{{route('contacts')}}" class="nav-link {{ Nav::isResource('manage-contacts') }}">
            <i class="nav-icon fas fa-address-book"></i>
            <p>
              {{ __('admin.contacts') }}
            </p>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>