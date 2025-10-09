import { useState, useEffect, useMemo, useRef } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, value, setValue, mode, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  // debounce для поиска
  const debounceFetcher = useMemo(() => {
    const loadOptions = (inputValue) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      fetchOptions(inputValue)
        .then(newOptions => {
          if (fetchId !== fetchRef.current) return;
          setOptions(newOptions);
        })
        .finally(() => setFetching(false));
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  // обновляем options, чтобы при редактировании показывать метки
  useEffect(() => {
    if (!value) return;

    if (Array.isArray(value)) {
      setOptions(value.map(v => ({ label: v.label, value: v.value })));
    } else if (typeof value === 'object') {
      setOptions([{ label: value.label, value: value.value }]);
    }
  }, [value]);

  // правильное значение для Select (antd требует либо массив, либо примитив)
  const selectValue = Array.isArray(value)
    ? value.map(v => v.value)
    : value?.value ?? undefined;

  return (
    <Select
      mode={mode}
      showSearch
      allowClear
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      value={selectValue}
      options={options}
      onSearch={debounceFetcher}
      onChange={(val, option) => {
        if (setValue) {
          if (mode === 'multiple') {
            const items = (Array.isArray(option) ? option : []).map(o => ({
              label: o.label,
              value: o.value,
            }));
            setValue(items);
          } else {
            const o = Array.isArray(option) ? option[0] : option;
            setValue(o ? { label: o.label, value: o.value } : null);
          }
        }
      }}
      onDropdownVisibleChange={(open) => {
        if (!open || !props.service) return;
        props.service.selectList({})
          .then(res => {
            setOptions(
              res.data.List.map(cat => ({ value: cat.id, label: cat.name }))
            );
          })
          .catch(() => {});
      }}
    />
  );
}

function getFetch(service) {
  return async (query) => {
    try {
      const res = await service.selectList({ query });
      return res.data.List.map(cat => ({ value: cat.id, label: cat.name }));
    } catch {
      return [];
    }
  };
}

const Parent = ({ service, mode, setValue, value, ...props }) => (
  <DebounceSelect
    mode={mode ?? null}
    service={service ?? null}
    fetchOptions={getFetch(service)}
    value={value}
    setValue={setValue}
    placeholder="Выберите категорию"
    style={{ width: '100%' }}
    {...props}
  />
);

export default Parent;
