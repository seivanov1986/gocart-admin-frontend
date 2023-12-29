import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductService from '../../services/product'
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
        href: '/admin/products',
        title: 'Продукты',
    }
];

const columns = [
    {
      title: 'Название продукта',
      dataIndex: 'name',
      render: (text, record) => {
        let url = "/admin/product/" + record.Id
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    },
];

const Products = () => {
    return (
        <List 
            service={ProductService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
            createUrl="product"
        />
    )
}

export default Products;   