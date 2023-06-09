import { writable } from "svelte/store";

// 默认数据
export const defaultData = {
  ruleName: "",
  origin: "",
  local: "",
  active: true
};
// 规则数据列表
export const _rrData = writable<any[]>([]);
// 主页显示状态
export const _mainStatus = writable<string>("list");
// 激活的规则
export const _activeRules = writable<string[]>([]);
// 操作项id
export const _handledIdx = writable<number>(-1);
// 操作项内容
export const _handleItem = writable<any>(defaultData);
