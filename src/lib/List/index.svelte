<script lang="ts">
  import { _rrData, _mainStatus, _activeRules } from '../store';
  import { onMount } from 'svelte';
  import Button from '@/components/Button/index.svelte';
  import cx from 'classnames';
  import empty from '@/assets/undraw_empty.svg';
  import ItemTools from '../ItemTools/index.svelte';
  import niceTry from 'nice-try';
  import publish from '@/assets/publish.svg';
  import publishGray from '@/assets/publish-gray.svg';
  import Toggle from '@/components/Toggle/index.svelte';

  let activeAll = false;

  onMount(() => {
    _rrData.set(
      niceTry(() => JSON.parse(localStorage.getItem('rrData'))) ?? []
    );
  });

  $: {
    const rrActive = $_rrData.map((o) => o.active).filter((o) => o);
    if (rrActive.length === $_rrData.length) {
      activeAll = true;
    } else {
      activeAll = false;
    }
  }

  const handleAll = (value: boolean) => {
    const rrData = $_rrData.map((o) => {
      o.active = value;
      return o;
    });
    _rrData.set(rrData);
    localStorage.setItem('rrData', JSON.stringify(rrData));
  };

  const handleActive = (idx: number) => {
    const rrData = [...$_rrData];
    rrData[idx].active = !rrData[idx].active;
    _rrData.set(rrData);
    localStorage.setItem('rrData', JSON.stringify(rrData));
  };

  const handleEdit = () => {
    _mainStatus.set('eidt');
  };
</script>

<div class="flex justify-end mb-4">
  <Toggle
    checked={activeAll}
    onChange={handleAll}>全{activeAll ? '开' : '关'}</Toggle
  >
</div>
{#if $_rrData.length}
  <div
    class="pl-2 pr-3 overflow-auto border-2 border-indigo-500 rounded-lg rr-rule-list h-72"
  >
    {#each $_rrData as rrItem, idx}
      <div
        id={`rr-item-${idx}`}
        class={cx(
          'flex items-center pr-2 my-3 ml-4 bg-white border shadow-md',
          rrItem.active ? 'border-indigo-500' : 'border-gray-300'
        )}
      >
        <div
          class={cx(
            'rule-icon',
            'flex-none block -ml-3 rounded-full shadow-md cursor-pointer w-7 h-7 bg-slate-100 border-2',
            rrItem.active ? 'border-indigo-500' : 'bg-slate-100'
          )}
          on:click={() => handleActive(idx)}
          on:keypress={() => handleActive(idx)}
        >
          <img
            class="w-full h-full"
            src={rrItem.active ? publish : publishGray}
            alt=""
          />
        </div>
        <div class="flex-1 px-4 py-2 truncate">
          {rrItem.ruleName}
        </div>
        <ItemTools {idx} />
      </div>
    {/each}
  </div>
{:else}
  <div
    class="flex items-center justify-center w-full border-2 border-indigo-500 rounded-lg h-72"
  >
    <div class="inline-flex flex-col items-center opacity-70">
      <img
        class="w-14"
        src={empty}
        alt=""
      />
      <div class="mt-2 text-xs text-gray-500">暂无数据，请添加</div>
    </div>
  </div>
{/if}
<div class="mt-4">
  <Button on:click={handleEdit}>添加代理项</Button>
</div>

<style>
  .rule-icon {
    padding: 0 6px 0 4px;
  }
</style>
