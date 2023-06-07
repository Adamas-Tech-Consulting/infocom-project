<div class="card">
  <div class="card-body">
    <div class="row">
      <div class="col-2">
        <div class="form-group">
          <label for="hall_number">{{ __('admin.hall_number') }}</label>
          <input type="text" class="form-control" name="hall_number[]" placeholder="{{ __('admin.enter') }} {{ __('admin.hall_number') }}">
        </div>
      </div>
      <div class="col-2">
        <div class="form-group">
          <label for="from_time">{{ __('admin.from') }} {{ __('admin.time') }}</label>
          <input type="time" class="form-control" name="from_time[]" placeholder="{{ __('admin.from_time') }}">
        </div>
      </div>
      <div class="col-2">
        <div class="form-group">
          <label for="to_time">{{ __('admin.to') }} {{ __('admin.time') }}</label>
          <input type="time" class="form-control" name="to_time[]" placeholder="{{ __('admin.to_time') }}">
        </div>
      </div>
      <div class="col-2">
        <div class="form-group">
          <label for="is_wishlist">{{ __('admin.wishlist_enabled') }}(Y/N)</label>
          <select class="form-control" name="is_wishlist[]" style="width: 100%;">
            <option value="">{{ __('admin.select') }} {{ __('admin.one') }}</option>
            <option value="1">{{ __('admin.yes') }}</option>
            <option value="0">{{ __('admin.no') }}</option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <div class="form-group">
          <label for="subject_line">{{ __('admin.session_subject_line') }}</label>
          <textarea class="form-control" name="subject_line[]" placeholder="{{ __('admin.enter') }} {{ __('admin.session_subject_line') }}" style="height:38px"></textarea>
        </div>
      </div>
      <div class="col-1">
        <div class="form-group float-right">
          <label for="rem_event_details" style="height:20px"></label>
          <div><button type="button" data-bs-toggle="tooltip" title="{{ __('admin.remove') }} {{ __('admin.event') }} {{ __('admin.details') }}" id="remove_event_details" class="btn btn-sm btn-danger bW float-right"><i class="fa fa-minus-circle" aria-hidden="true"></i></button></div>
        </div>
      </div>			
    </div>
  </div>
</div>