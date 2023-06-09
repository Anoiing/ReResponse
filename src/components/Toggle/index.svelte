<script lang="ts">
  import cx from 'classnames';

  export let onChange = (value: boolean) => {};
  export let checked = false;

  const handleChange = () => {
    checked = !checked;
    onChange(checked);
  };
</script>

<div class="inline-flex items-center">
  <slot />
  <div
    class={cx(
      'ml-2 w-10 h-6 p-1 transition duration-200 ease-in-out rounded-full pointer-events-auto ring-1 ring-inset cursor-pointer',
      checked
        ? 'bg-indigo-600 ring-black/20'
        : 'bg-slate-900/10 ring-slate-900/5'
    )}
    on:click={handleChange}
    on:keypress
  >
    <div
      class={cx(
        'w-4 h-4 transition duration-200 ease-in-out bg-white rounded-full shadow-sm ring-1 ring-slate-700/10',
        checked ? 'translate-x-4 ' : ''
      )}
    />
  </div>
</div>
