<aside class="main-sidebar sidebar-dark-warning elevation-4">
  <!-- Brand Logo -->
  <a href="{{route('home')}}" class="brand-link">
    <img src="{{ asset(site_settings('site_favicon')) }}" alt="{{ site_settings('site_name') }}" class="brand-image"> <!--Extra class : img-circle elevation-3 -->
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
        <li class="nav-item {{ Nav::hasSegment(['manage-event-category','manage-schedule-type','manage-sponsorship-type','manage-speakers-category','manage-contact-information'], 1 ,'menu-is-opening menu-open') }}">
          <a href="#" class="nav-link {{ Nav::hasSegment(['manage-event-category','manage-schedule-type','manage-sponsorship-type','manage-speakers-category','manage-contact-information']) }}">
            <i class="nav-icon fas fa-cogs"></i>
            <p>
              {{ __('admin.master_setup') }}
              <i class="fas fa-angle-right right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview {{ Nav::hasSegment(['manage-event-category','manage-schedule-type','manage-sponsorship-type','manage-speakers-category','manage-contact-information']) }}">
            <li class="nav-item">
              <a href="{{route('event_category')}}" class="nav-link {{ Nav::hasSegment('manage-event-category') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.event_category') }}</p>
              </a>
            </li>
            <!-- <li class="nav-item">
              <a href="{{route('schedule_type')}}" class="nav-link {{ Nav::hasSegment('manage-schedule-type') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.schedule_type') }}</p>
              </a>
            </li> -->
            <li class="nav-item">
              <a href="{{route('sponsorship_type')}}" class="nav-link {{ Nav::hasSegment('manage-sponsorship-type') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.sponsorship_type') }}</p>
              </a>
            </li>
            <!-- <li class="nav-item">
              <a href="{{route('speakers_category')}}" class="nav-link {{ Nav::hasSegment('manage-speakers-category') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.speakers_category') }}</p>
              </a>
            </li> -->
            <li class="nav-item">
              <a href="{{route('contact_information')}}" class="nav-link {{ Nav::hasSegment('manage-contact-information') }}">
                <i class="fas fa-cubes nav-icon"></i>
                <p>{{ __('admin.admin_contact') }}</p>
                <!-- <span class="right badge badge-info">2</span> -->
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
        <li class="nav-item {{ Nav::hasSegment(['manage-event','manage-schedule','manage-sponsors','manage-speakers','manage-registration-request'], 1, 'menu-is-opening menu-open') }}">
          <a href="{{route('event')}}" class="nav-link {{ Nav::hasSegment(['manage-event','manage-schedule','manage-sponsors','manage-speakers','manage-registration-request']) }}">
            <i class="nav-icon fas fa-calendar-plus"></i>
            <p>
              {{ __('admin.event') }}
              <!-- <i class="fas fa-angle-right right"></i> -->
            </p>
          </a>
        </li>
        <li class="nav-item {{ Nav::hasSegment(['manage-contacts-group','manage-contacts'], 1 ,'menu-is-opening menu-open') }}">
          <a href="{{route('contacts_group')}}" class="nav-link {{ Nav::hasSegment(['manage-contacts-group','manage-contacts']) }}">
            <i class="nav-icon fas fa-address-book"></i>
            <p>
              {{ __('admin.contacts') }}
            </p>
          </a>
        </li>
        <!-- <li class="nav-item {{ Nav::hasSegment(['manage-invitation'], 1 ,'menu-is-opening menu-open') }}">
          <a href="{{route('invitation')}}" class="nav-link {{ Nav::hasSegment(['manage-invitation']) }}">
            <i class="nav-icon fas fa-envelope"></i>
            <p>
              {{ __('admin.invitation') }}
            </p>
          </a>
        </li> -->
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>