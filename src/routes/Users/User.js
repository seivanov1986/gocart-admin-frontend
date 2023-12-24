import { Breadcrumb, Button, Divider, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import UserService from '../../services/user'
import { useParams } from "react-router-dom";

const items = [
    {
        type: 'input',
        title: 'Логин',
        name: 'login'
    },
    {
        type: 'input',
        title: 'Email',
        name: 'email'
    },
    {
        type: 'password',
        title: 'Пароль',
        name: 'password'
    }
]

const breadcrumb = [
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
]

const User = (props) => {
    const params = useParams()

    return (
        <>
            <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={breadcrumb}
                />
            </div>

            <Divider />

            <ItemForm 
                service={UserService}
                items={items} 
                breadcrumb={breadcrumb}
                {...props}
                params={params}
            />
        </>
    )
}

export default User;  