import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryService from '../../services/category'
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
        href: '/admin/categories',
        title: 'Категории',
    }
];

const columns = [
    {
      title: 'Название категории',
      dataIndex: 'name',
      render: (text, record) => {
        let url = "/admin/category/" + record.id
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    }
];

const Categories = () => {
    return (
        <List 
            service={CategoryService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
            createUrl="category"
        />
    )
}

export default Categories;   