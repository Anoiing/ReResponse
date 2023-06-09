<script lang="ts">
  import { _handleItem } from '../store';
  import { _mainStatus } from '../store';
  import { startsWith, compact } from 'lodash';
  import Button from '@/components/Button/index.svelte';
  import Input from '@/components/Input/index.svelte';
  import niceTry from 'nice-try';

  const URLRegExp =
    /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;

  const formData: any = {};

  const errors = {
    ruleName: '',
    origin: '',
    local: '',
  };

  const onChange = (key: string, e: any) => {
    formData[key] = e.target.value;
    errors[key] = '';
  };

  const handleSave = () => {
    // 基本格式校验
    if (!formData.ruleName && ![0, '0'].includes(formData.ruleName)) {
      errors.ruleName = '请填写规则名称!';
    }
    if (!URLRegExp.test(formData.origin)) {
      errors.origin = '请填写正确的远程资源地址!';
    }
    if (!formData.local) {
      errors.local = '请填写正确的本地资源地址!';
    }
    // 有错误返回
    if (compact(Object.values(errors)).length > 0) {
      return false;
    }
    // 处理本地地址
    if (
      !formData.local.includes('://') &&
      !startsWith(formData.local, 'file://')
    ) {
      formData.local = `file://${formData.local}`;
    }
    formData.active = true;
    // 存储数据
    const rrData =
      niceTry(() => JSON.parse(localStorage.getItem('rrData'))) ?? [];
    localStorage.setItem('rrData', JSON.stringify([...rrData, formData]));
    handleCancel();
  };

  const handleCancel = () => {
    _mainStatus.set('list');
  };
</script>

<Input
  label="规则名称"
  required
  value={formData.ruleName || $_handleItem.ruleName}
  errorMessage={errors.ruleName}
  on:input={(e) => onChange('ruleName', e)}
  on:change={(e) => onChange('ruleName', e)}
/>
<Input
  label="远程资源地址"
  required
  value={formData.origin || $_handleItem.origin}
  errorMessage={errors.origin}
  on:input={(e) => onChange('origin', e)}
  on:change={(e) => onChange('origin', e)}
/>
<Input
  label="本地资源地址"
  required
  value={formData.local || $_handleItem.local}
  errorMessage={errors.local}
  on:input={(e) => onChange('local', e)}
  on:change={(e) => onChange('local', e)}
/>
<div class="flex justify-end gap-2 mt-2 leading-6">
  <Button on:click={handleSave}>确 定</Button>
  <Button
    type="normal"
    on:click={handleCancel}>取 消</Button
  >
</div>
