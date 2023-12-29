import { Breadcrumb, Button, Divider, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import AttributeService from '../../services/attribute'
import { useParams } from "react-router-dom";

const items = [
    {
        type: 'input',
        title: 'Название аттрибута',
        name: 'name',
        service: AttributeService,
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

const Attribute = (props) => {
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
                service={AttributeService}
                items={items} 
                breadcrumb={breadcrumb}
                {...props}
                params={params}
            />
        </>
    )
}

export default Attribute;  