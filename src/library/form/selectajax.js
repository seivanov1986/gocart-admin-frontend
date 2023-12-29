import { useState } from 'react';
import CategoryDataService from '../../services/category';
import { useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
      <Select
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        onChange={(e) => {
          if (props.setValue) {
            props.setValue(e)
          }
        }}
        onDropdownVisibleChange={(e) => {
            if (e === false) {
                //setLoading(false)
                return
            }
            //setLoading(true)
            props.service.selectList({})
            .then(response => {
              setOptions(response.data.List.map((category) => ({
                label: category.name,
                value: category.id
              })))
            })
            .catch(e => {
                
            })
            .finally(() => {
            });
        }}
      />
    );
}

async function fetchUserList(username) {
  return CategoryDataService.selectList({
    query: username
  })
  .then(response => {
    return response.data.List.map((category) => ({
      label: category.name,
      value: category.id
    }))
  })
  .catch(e => {
      
  })
  .finally(() => {
  });
}

function getFetch(service) {
  return async function fetchUserList(username) {
    return service.selectList({
      query: username
    })
    .then(response => {
      return response.data.List.map((category) => ({
        label: category.name,
        value: category.id
      }))
    })
    .catch(e => {
        
    })
    .finally(() => {
    });
  }
}

const Parent = (props) => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [searchText, setSearchText] = useState("")
    const [value, setValue] = useState([]);

    // service = props.service

    return (
        <>
            <DebounceSelect
                service={props.service ?? null}
                showSearch
                allowClear                
                placeholder="Select users"
                fetchOptions={getFetch(props.service ?? null)}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                style={{
                    width: '100%',
                }}
                {...props}
            />
        </>
    )
}

export default Parent;