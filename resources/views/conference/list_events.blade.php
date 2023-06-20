<table id="list_table2" class="table table-bordered table-striped w-100">
  <thead>
  <tr>
    <th>#</th>
    <th>{{ __('admin.date') }}</th>
    <th>{{ __('admin.title') }}</th>
    <th>{{ __('admin.type') }}</th>
    <th>{{ __('admin.day') }}</th>
    <th>{{ __('admin.venue') }}</th>
    <th class="text-center">{{ __('admin.speaker') }} {{ __('admin.assign_or_remove') }}</th>
  </tr>
  </thead>
  <tbody>
  @foreach($rows as $key => $row)
  <tr>
    <td>{{$key+1}}</td>
    <td>{{$row->event_date}}</td>
    <td>{{$row->event_title}}</td>
    <td>{{$row->event_type_name}}</td>
    <td>{{$row->event_day}}</td>
    <td>{{$row->event_venue}}</td>
    <td class="text-center">
      <button type="button" class="btn btn-xs bg-gradient-{{$row->is_key_speaker==1 ? 'success' : 'secondary'}} {{($row->event_speakers_id)?'':'d-none'}} toggle-event-key-speaker"  data-bs-toggle="tooltip" title="{{$row->is_key_speaker==1 ? __('admin.key_speaker') : __('admin.non_key_speaker')}}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$row->conference_id}}" data data-is-key-speaker="{{($row->is_key_speaker)}}"><i class="fa fa-key"></i></button>
      <button type="button" class="btn btn-xs bg-gradient-{{($row->event_speakers_id)?'danger':'primary'}} toggle-event-assigned"  data-bs-toggle="tooltip" title="{{ ($row->event_speakers_id) ? __('admin.remove') : __('admin.assign') }}" data-id="{{$row->event_speakers_id}}" data-conference-id="{{$row->conference_id}}" data-event-id = "{{$row->id}}" data-speakers-id="{{($speakers_id)}}"><i class="fa fa-{{($row->event_speakers_id)?'minus-circle':'plus-circle'}}"></i></button>
    </td>
  </tr>
  @endforeach
  </tbody>
</table>