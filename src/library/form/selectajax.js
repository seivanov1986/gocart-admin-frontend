import { useState, useEffect, useMemo, useRef } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, value, setValue, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  // дебаунс для поиска
  const debounceFetcher = useMemo(() => {
    const loadOptions = (inputValue) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(inputValue).then(newOptions => {
        if (fetchId !== fetchRef.current) return;
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  // обновляем options при value, чтобы отобразить label
  useEffect(() => {
    if (!value) return;
    setOptions(value.map(v => ({ label: v.label, value: v.value })));
  }, [value]);

  return (
    <Select
      mode={props.mode}
      showSearch
      allowClear
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      value={value}
      options={options}
      onSearch={debounceFetcher}
      onChange={(val, optionObjects) => {
        // возвращаем массив объектов {value, label}
        setValue(optionObjects);
      }}
      onDropdownVisibleChange={(open) => {
        if (!open) return;
        if (props.service) {
          props.service.selectList({})
            .then(res => {
              setOptions(res.data.List.map(cat => ({
                value: cat.id,
                label: cat.name
              })));
            })
            .catch(() => {});
        }
      }}
    />
  );
}

// создаём fetch для DebounceSelect
function getFetch(service) {
  return async function fetchUserList(username) {
    return service.selectList({ query: username })
      .then(res => res.data.List.map(cat => ({ value: cat.id, label: cat.name })))
      .catch(() => []);
  }
}

// компонент Parent
const Parent = ({ service, mode, setValue, value, ...props }) => {
  return (
    <DebounceSelect
      mode={mode ?? null}
      service={service ?? null}
      fetchOptions={getFetch(service)}
      value={value}
      setValue={setValue}
      showSearch
      allowClear
      placeholder="Выберите категорию"
      style={{ width: '100%' }}
      {...props}
    />
  );
};

export default Parent;
