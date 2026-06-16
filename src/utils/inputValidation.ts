/**
 * 排序可视化输入解析结果
 */
export interface ParseNumberArrayResult {
  values: number[];
  error?: string;
}

const INTEGER_PATTERN = /^-?\d+$/;

/**
 * 严格解析逗号分隔的整数数组，避免 parseInt 将 1.5 解析为 1 等宽松行为。
 */
export const parseIntegerArrayInput = (
  input: string,
  options: { minLength?: number; maxLength?: number; minValue?: number; maxValue?: number } = {}
): ParseNumberArrayResult => {
  const { minLength = 1, maxLength = 20, minValue = 0, maxValue = 999 } = options;
  const parts = input.split(',').map(part => part.trim());

  if (parts.length === 0 || parts.every(part => part.length === 0)) {
    return { values: [], error: '请输入数字数组，用英文逗号分隔' };
  }

  const invalidPart = parts.find(part => !INTEGER_PATTERN.test(part));
  if (invalidPart !== undefined) {
    return { values: [], error: `“${invalidPart || '空值'}”不是有效整数，请只输入整数并用英文逗号分隔` };
  }

  const values = parts.map(Number);

  if (values.length < minLength) {
    return { values, error: `至少需要输入 ${minLength} 个整数` };
  }

  if (values.length > maxLength) {
    return { values, error: `为保证动画流畅，最多支持 ${maxLength} 个整数` };
  }

  const outOfRange = values.find(value => value < minValue || value > maxValue);
  if (outOfRange !== undefined) {
    return { values, error: `数值 ${outOfRange} 超出范围，请输入 ${minValue}-${maxValue} 之间的整数` };
  }

  return { values };
};
