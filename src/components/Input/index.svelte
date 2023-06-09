<script lang="ts">
  import cx from 'classnames';

  export let label: string = 'Label';
  export let value: string = '';
  export let required: boolean = false;
  export let errorMessage: string = 'Error message';
  export let placeholder: string = '';
  export let onFocus: () => void = () => {};
  export let onBlur: () => void = () => {};

  let focused: boolean = false;

  const handleFocus = () => {
    focused = true;
    onFocus();
  };

  const handleBlur = () => {
    focused = false;
    onBlur();
  };
</script>

<div class="pt-1 pb-2 rr-input">
  {#if label}
    <div class="mb-1 leading-4 text-gray-600 rr-input-label">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </div>
  {/if}
  <div
    class={cx(
      'rounded-md py-1 px-2  border-2',
      errorMessage
        ? 'border-red-400'
        : focused
        ? 'shadow-lg bg-white border-indigo-500'
        : 'bg-gray-50 border-gray-300'
    )}
  >
    <input
      class="w-full bg-transparent border-none"
      {value}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input
      on:change
      {placeholder}
    />
  </div>
  {#if errorMessage}
    <div class="text-xs text-red-400">
      {errorMessage}
    </div>
  {/if}
</div>

<style>
  .rr-input {
    display: flex;
    flex-direction: column;
  }
  .rr-input input:focus-visible {
    border: none !important;
    outline: none;
  }
  .rr-input input::placeholder {
    color: rgb(226 232 240);
  }
</style>
