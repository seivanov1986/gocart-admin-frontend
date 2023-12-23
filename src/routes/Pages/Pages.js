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
        href: '/admin/pages',
        title: 'Страницы',
    }
];

const columns = [
    {
      title: 'Название страницы',
      dataIndex: 'name',
      render: (text, record) => {
        let url = "/admin/page/" + record.id
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    },
    {
      title: 'Тип страницы',
      dataIndex: 'type',
      render: (type) => {
        switch (type) {
            case 0:
                return ("Страница")
            case 1:
                return ("Статья")
            case 2:
                return ("Новость")
        }
      } 
    },
];

const Pages = () => {
    return (
        <List 
            service={PageService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
            createUrl="page"
        />
    )
}

export default Pages;   