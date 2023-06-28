<div class="card card-default card-outline">
  <div class="card-body p-0">
    <ul class="nav nav-pills flex-column nav-side">
      <li class="nav-item">
        <a href="{{ route('event_update', $event_id) }}" class="nav-link {{ Nav::isResource('manage-event/update') }}">
          <i class="fa fa-calendar-plus"></i> {{ __('admin.event') }} {{ __('admin.details') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('track', $event_id) }}" class="nav-link {{ Nav::isResource('manage-track') }}">
          <i class="fas fa-road"></i> {{ __('admin.track_master') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('schedule', $event_id) }}" class="nav-link {{ Nav::isResource('manage-schedule') }}">
          <i class="fas fa-clock"></i> {{ __('admin.schedule') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('event_sponsors', $event_id) }}" class="nav-link {{ Nav::isResource('manage-event/sponsors') }}">
          <i class="fa fa-user"></i> {{ __('admin.sponsors') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('event_speakers', $event_id) }}" class="nav-link {{ Nav::isResource('manage-event/speakers') }}">
          <i class="fa fa-volume-up"></i> {{ __('admin.speakers') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('event_contact_information', $event_id) }}" class="nav-link {{ Nav::isResource('manage-event/contact-information') }}">
          <i class="fa fa-address-book"></i> {{ __('admin.contact_information') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('registration_request', $event_id) }}" class="nav-link {{ Nav::isResource('manage-registration-request') }}">
          <i class="fa fa-user"></i> {{ __('admin.registration_request') }}
        </a>
      </li>
    </ul>
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->