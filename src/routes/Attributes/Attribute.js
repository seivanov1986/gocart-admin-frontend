import { Button, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const items = [
    {
        type: 'input',
        title: 'Название аттрибута',
        name: 'name'
    },
    {
        type: 'input',
        title: 'Сигнатура',
        name: 'signature'
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
        href: '/admin/attributes',
        title: 'Аттрибуты',
    }
]

const Attribute = () => {
    return (
        <>
            <ItemForm 
                items={items} 
                breadcrumb={breadcrumb}
            />
        </>
    )
}

export default Attribute;  