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
        //labelInValue
        //filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        onDropdownVisibleChange={(e) => {
            if (e === false) {
                //setLoading(false)
                return
            }
            //setLoading(true)
            CategoryDataService.list({})
            .then(response => {
                let data = [];
                for (let i = 0; i < response.data.list.length; i++) {
                    data.push({ value: response.data.list[i].Id, label: response.data.list[i].Name })
                }

                setOptions(data)
            })
            .catch(e => {
                
            })
            .finally(() => {
                //setLoading(false)
            });
        }}
      />
    );
}

async function fetchUserList(username) {
    console.log('fetching user', username);
    return fetch('https://randomuser.me/api/?results=5')
      .then((response) => response.json())
      .then((body) =>
        body.results.map((user) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        })),
      );
}

const Parent = (props) => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [searchText, setSearchText] = useState("")
    const [value, setValue] = useState([]);

    console.log(items)

    return (
        <>
            <DebounceSelect
                //mode="multiple"
                showSearch
                allowClear                
                //value={value}
                placeholder="Select users"
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                style={{
                    width: '100%',
                }}
            />
        </>
    )
}

export default Parent;