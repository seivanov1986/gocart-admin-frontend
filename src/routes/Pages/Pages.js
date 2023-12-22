import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import PageService from '../../services/page'
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

const Pages = () => {
    return (
        <List 
            service={PageService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
        />
    )
}

export default Pages;   