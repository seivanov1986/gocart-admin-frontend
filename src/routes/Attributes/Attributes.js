import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import AttributeService from '../../services/attribute'
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
        href: '/admin/attributes',
        title: 'Атрибуты',
    },
];

const columns = [
    {
      title: 'Название аттрибута',
      dataIndex: 'name',
      render: (text, record) => {
        let url = "/admin/attribute/" + record.id
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    },
    {
      title: 'Сигнатура',
      dataIndex: 'signature',
    },
];

const Attributes = () => {
    return (
        <List 
            service={AttributeService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
            createUrl="attribute"
        />
    )
}

export default Attributes;   