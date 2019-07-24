<div class="field">
    <label class="label" for="name">{{ __('Binder name') }}</label>
    <p class="control">
        <input type="text" class="input" name="name" id="name" value="{{ old('name', $binder->name) }}">
    </p>
</div>
<div class="field">
    <label class="label" for="description">{{ __('Description') }}</label>
    <textarea name="description" id="description" class="textarea">{{ old('description', $binder->description) }}</textarea>
</div>