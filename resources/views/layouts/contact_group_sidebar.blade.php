<div class="card card-default card-outline">
  <div class="card-body p-0">
    <ul class="nav nav-pills flex-column nav-side">
      <li class="nav-item">
        <a href="{{ route('contacts_group_update', $group_id) }}" class="nav-link {{ Nav::hasSegment('manage-contacts-group') }}">
          <i class="fa fa-calendar-plus"></i> {{ __('admin.details') }}
        </a>
      </li>
      <li class="nav-item">
        <a href="{{ route('contacts', $group_id) }}" class="nav-link {{ Nav::hasSegment('manage-contacts') }}">
          <i class="fas fa-address-book"></i> {{ __('admin.contacts') }}
        </a>
      </li>
    </ul>
  </div>
  <!-- /.card-body -->
</div>
<!-- /.card -->