<script lang="ts">
  import mainImg from '@/assets/undraw_server_down.svg';
  import Main from './lib/Main/index.svelte';
</script>

<div class="p-8">
  <div class="text-xl font-bold text-center text-indigo-500">
    ReResponse V1.0
  </div>
  <div class="flex justify-center px-12 my-6">
    <img
      src={mainImg}
      alt=""
    />
  </div>
  <Main />
</div>
