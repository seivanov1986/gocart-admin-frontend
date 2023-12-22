import { Breadcrumb, Button, Divider, Flex, Pagination, Table } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import UserService from '../../services/user'

const breadcumbItems = [
    {
        href: '/admin',
        title: <HomeOutlined />,
    },
    {
        type: 'separator',
    },
    {
        href: '/admin/users',
        title: 'Пользователи',
    }
];

const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'login',
      render: (text, record) => {
        let url = "/admin/user/" + record.id
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => {
        return text ?? '-'
      }   
    },
];

const Users = () => {
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])

    const update = () => {
        UserService.list({
            page: page
        })
        .then(response => {
            for (let i = 0; i < response.data.List.length; i++) {
                response.data.List[i].key = response.data.List[i].id
            }

            setData(response.data.List)
            setTotal(response.data.Total)
        })
        .catch(e => {
        });
    }

    useEffect(() => {
        update()
    }, [page]);

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

    return (
        <>
            <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={breadcumbItems}
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
                    onClick={(e) => {}}
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
                columns={columns}
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

export default Users;   