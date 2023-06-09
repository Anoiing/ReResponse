<script lang="ts">
  import cx from 'classnames';
  export let type: string = 'primary';
</script>

<div
  class={cx(
    'cursor-pointer pointer-events-auto rounded-md px-3 inline-flex items-center leading-6 h-9',
    type === 'primary' && 'bg-indigo-600 hover:bg-indigo-500 text-white',
    type === 'normal' &&
      'border-2 border-gray-400 hover:border-indigo-500 text-gray-500 hover:text-indigo-500'
  )}
  on:click
  on:keypress
>
  <slot><!-- optional fallback --></slot>
</div>
