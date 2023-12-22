import { Breadcrumb, Button, Divider, Flex, Pagination, Skeleton, Table } from "antd";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const List = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let rows = [];
            for (let i = 0; i < selectedRows.length; i++) {
                rows.push(selectedRows[i].id)
            }

            setSelectedRows(rows)
        },
        getCheckboxProps: (record) => ({
          id: record.id
        }),
    }; 

    const update = () => {
        setIsLoading(true)
        props.service.list({
            page: page
        })
        .then(response => {
            for (let i = 0; i < response.data.List.length; i++) {
                response.data.List[i].key = response.data.List[i].id
            }

            setData(response.data.List)
            setTotal(response.data.Total)
            setIsLoading(false)
        })
        .catch(e => {
        });
    }

    useEffect(() => {
        update()
    }, [page]);

    if (isLoading) {
        return (
            <>
                <Breadcrumb separator="" items={[]} />
                <Skeleton active />
            </>
        )    
    }

    return (
        <>

            <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={props.breadcumbItems}
                />
            </div>

            <Divider />

            <Flex gap="small" wrap="wrap">
                <Link to="/admin/user">
                    <Button type="primary" icon={<PlusCircleOutlined />} size='large' />
                </Link>
                <Button 
                    type="primary" 
                    icon={<DeleteOutlined />} 
                    size='large' 
                    onClick={(e) => {
                        props.service.delete({
                            ids: selectedRows
                        })
                        .then(response => {
                            if (response.status == 200) {
                                update()
                            }
                        })
                        .catch(e => {
                        });
                    }}
                />
            </Flex>

            <Divider />

            <Table 
                rowSelection={{
                    type: 'multiple',
                    ...rowSelection,
                }}
                dataSource={data}
                style={{overflow: 'scroll'}}
                bordered={true}
                pagination={false}
                columns={props.columns}
            />
            <div
                style={{
                    textAlign: 'right',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                }}
            >
            <Pagination 
                hideOnSinglePage={true}
                defaultCurrent={1} 
                total={total} 
                defaultPageSize={8} 
                onChange={(page) => {
                    setPage(page-1)
                }}
                current={page+1}
            />
            </div>
        </>
    )
}



export default List;