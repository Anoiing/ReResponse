<script lang="ts">
  import { _mainStatus } from '../store';
  import Editor from '../Editor/index.svelte';
  import List from '../List/index.svelte';
</script>

<div class="w-full">
  {#if $_mainStatus === 'list'}
    <List />
  {:else}
    <Editor />
  {/if}
</div>
