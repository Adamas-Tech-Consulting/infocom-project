@component('mail::message')
# Welcome, {{$user['first_name']}} !!

You have registered successfully

<h5 class="fw-normal" style="letter-spacing: 1px;">
  <p>Conference Name :  {{$user['title']}} </p>
  <p>Conference Venue : {{$user['event_venue']}} </p>
  <p>Conference Date : {{date('F d, Y',strtotime($user['event_start_date']))}} @if($user['event_end_date']>$user['event_start_date']) - {{date('F d, Y',strtotime($user['event_end_date']))}} @endif</p>
  @if($user['registration_type']=='P'  && !$user['rt_request'])
  <p>Order ID : {{$user['order_id']}}
  <p>Amount  : ₹ {{$user['payable_amount']}} (For {{$user['attendance_type']}} {{($user['attendance_type']=='one') ? 'day' : 'days'}})</p>
  <p>Payment Status : @if($user['transaction_status']=='SUCCESS') Paid @else Pending @endif</p>
  @endif
</h5>

Thanks,<br>
ABP Team
@endcomponent
