<table id="list_table2" class="table table-bordered table-striped w-100">
  <thead>
  <tr>
    <th>#</th>
    <th>{{ __('admin.title') }}</th>
    <th>{{ __('admin.date') }}</th>
    <th>{{ __('admin.time') }}</th>
    <th>{{ __('admin.venue') }}</th>
    <th class="text-center">{{ __('admin.speaker') }} {{ __('admin.assign_or_remove') }}</th>
  </tr>
  </thead>
  <tbody>
  @foreach($rows as $key => $row)
  <tr>
    <td>{{$key+1}}</td>
    <td>{{$row->schedule_title}}</td>
    <td>{{$row->schedule_date}}</td>
    <td>{{date('H:i A',strtotime($row->from_time))}} - {{date('H:i A',strtotime($row->to_time))}}</td>
    <td>{{$row->schedule_venue}}</td>
    <td class="text-center">
      <button type="button" class="btn btn-xs bg-gradient-{{$row->is_key_speaker==1 ? 'success' : 'secondary'}} {{($row->schedule_speakers_id)?'':'d-none'}} toggle-schedule-key-speaker"  data-bs-toggle="tooltip" title="{{$row->is_key_speaker==1 ? __('admin.key_speaker') : __('admin.non_key_speaker')}}" data-id="{{$row->schedule_speakers_id}}" data-event-id="{{$row->event_id}}" data data-is-key-speaker="{{($row->is_key_speaker)}}"><i class="fa fa-key"></i></button>
      <button type="button" class="btn btn-xs bg-gradient-{{($row->schedule_speakers_id)?'danger':'primary'}} toggle-schedule-assigned"  data-bs-toggle="tooltip" title="{{ ($row->schedule_speakers_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->schedule_speakers_id}}" data-event-id="{{$row->event_id}}" data-schedule-id = "{{$row->id}}" data-speakers-id="{{($speakers_id)}}"><i class="fa fa-{{($row->schedule_speakers_id)?'minus-circle':'plus-circle'}}"></i></button>
    </td>
  </tr>
  @endforeach
  </tbody>
</table>