import { Link } from "react-router-dom";
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import SefurlService from '../../services/sefurl'
import List from "../../library/list/list";
import SefurlFilter from "./Filter";

const breadcumbItems = [
    {
        href: '/admin',
        title: <HomeOutlined />,
    },
    {
        type: 'separator',
    },
    {
        href: '/admin/sefurls',
        title: 'Ссылки',
    }
];

const columns = [
    {
      title: 'Путь',
      dataIndex: 'url',
      render: (text, record) => {
        let url = "/admin/"

        if (record.type == 1) url += "page"
        if (record.type == 2) url += "category"
        if (record.type == 3) url += "product"

        url += "/" + record.id_object
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      render: (text, record) => {
        if (record.type == 1) return ("Страница")
        if (record.type == 2) return ("Категория")
        if (record.type == 3) return ("Продукт")
        return (text)
      }
    }
];

const Sefurls = () => {
    return (
        <List 
            buttonExists={false}
            service={SefurlService}
            columns={columns} 
            breadcumbItems={breadcumbItems}
            filter={<SefurlFilter />}
        />
    )
}

export default Sefurls;   