<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ asset(site_settings('site_logo')) }}" class="logo" alt="ABP-Infocom">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
