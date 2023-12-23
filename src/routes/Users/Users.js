import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import UserService from '../../services/user'
import List from "../../library/list/list";

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
    return (
        <List 
            service={UserService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
            createUrl="user"
        />
    )
}

export default Users;   