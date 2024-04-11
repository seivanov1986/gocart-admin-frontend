import { Breadcrumb, Button, Collapse, Divider, Flex, Form, Input, Pagination, Popconfirm, Select, Skeleton, Space, Table, Tooltip, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, UpCircleOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from "antd/es/table/Column";
import { Option } from "antd/es/mentions";
import { cloneElement } from 'react';

const List = (props) => {
    const buttonExists = props.buttonExists ?? true
    const [isLoading, setIsLoading] = useState(true)

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [parentID, setParentID] = useState(0)
    const [pathParent, setPathParent] = useState([])
    const [filter, setFilter] = useState({})

    const clonedElement = useMemo(() => {
        if (!props.filter) return null
        return cloneElement(
            props.filter, {setFilter}
        )
    }, [props.filter, setFilter]);

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
            ...props.extra ?? null,
            page: page,
            id_parent: parentID,
            filter: filter,
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
    }, [page, props.reload ?? false, parentID, filter]);

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
            {props.breadcumbItems.length > 0 &&
                <>
                <div style={{paddingTop: '20px'}}>
                    <Breadcrumb
                        separator=""
                        items={props.breadcumbItems}
                    />
                </div>

                <Divider />
                </>
            }

            {buttonExists &&
            <>
                <Flex gap="small" wrap="wrap">
                    {props.addFunc &&
                        <Button 
                            onClick={props.addFunc}
                            type="primary" icon={<PlusCircleOutlined />} size='large' />
                    }
                    {!props.addFunc &&
                    <Link to={"/admin/"+props.createUrl}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size='large' />
                    </Link>
                    }
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

                    {parentID > 0 &&
                        <Button 
                            icon={<UpCircleOutlined />} 
                            size='large'
                            onClick={() => {
                                if (pathParent.length == 0) {
                                    return
                                }

                                let last = pathParent.pop()
                                setParentID(last)
                            }}
                        />
                    }

                </Flex>

                <Divider />
            </>
            }

            {clonedElement}

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
                        render={(a, b) => {
                            if (item.render === undefined) {
                                return a
                            }

                            return item.render(a, b, {
                                pathParent: pathParent,
                                setPathParent: setPathParent,
                                setParentID: setParentID,
                                parentID: parentID,
                            })
                        }}
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
                showSizeChanger={false}
            />
            </div>
        </>
    )
}



export default List;