<ul class="nav nav-pills">
  <li class="nav-item"><a class="nav-link  {{ Nav::isResource('manage-schedule/update') }}" href="{{route('schedule_update',[$parent_id,$schedule_id])}}"><i class="fas fa-clock"></i> {{ __('admin.schedule') }} {{ __('admin.details') }}</a></li>
  <li class="nav-item"><a class="nav-link  {{ Nav::isResource('manage-schedule/speakers') }}" href="{{route('schedule_speakers',[$parent_id,$schedule_id])}}"><i class="fa fa-volume-up"></i> {{ __('admin.speakers') }}</a></li>
  <li class="nav-item"><a class="nav-link  {{ Nav::isResource('manage-schedule/contact-information') }}" href="{{route('schedule_contact_information',[$parent_id,$schedule_id])}}"><i class="fa fa-user"></i> {{ __('admin.contact_information') }}</a></li>
</ul>