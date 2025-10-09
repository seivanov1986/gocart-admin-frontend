import { useState, useEffect, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, currentValue, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return;
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    if (!currentValue) return;
    // поддержка одиночного и множественного режима
    if (Array.isArray(currentValue)) {
      setOptions(currentValue.map(item => ({
        label: item.label,
        value: item.value,
      })));
    } else {
      setOptions([{ label: currentValue.label, value: currentValue.value }]);
    }
  }, [currentValue]);

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
      {...props}
      onChange={(value, option) => {
        // возвращаем полную информацию (ID + имя)
        if (props.setValue) {
          props.setValue(value, Array.isArray(option) ? option : [option]);
        }
      }}
    />
  );
}

function getFetch(service) {
  return async (query) => {
    const response = await service.selectList({ query });
    return response.data.List.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  };
}

export default function SelectAjax({ service, mode, value, setValue, ...props }) {
  return (
    <DebounceSelect
      mode={mode}
      fetchOptions={getFetch(service)}
      service={service}
      value={value}
      setValue={setValue}
      {...props}
    />
  );
}
