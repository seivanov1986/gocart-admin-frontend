import { Breadcrumb, Button, Divider, Flex, Pagination, Popconfirm, Skeleton, Table } from "antd";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from "antd/es/table/Column";

const List = (props) => {
    const buttonExists = props.buttonExists ?? true
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

            {buttonExists &&
            <>
                <Flex gap="small" wrap="wrap">
                    <Link to={"/admin/"+props.createUrl}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size='large' />
                    </Link>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={(e) => {
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
                        //onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                            type="primary" 
                            icon={<DeleteOutlined />} 
                            size='large'
                        />
                    </Popconfirm>
                </Flex>

                <Divider />
            </>
            }

            <Table 
                rowSelection={{
                    type: 'multiple',
                    ...rowSelection,
                }}
                dataSource={data}
                style={{overflow: 'scroll'}}
                bordered={true}
                pagination={false}
                //columns={props.columns}
            >
                {props.columns.map((item, index) => (
                    <Column
                        title={item.title}
                        dataIndex={item.dataIndex}
                        render={item.render}
                    />
                ))}
            </Table>
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