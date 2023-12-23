import { Button, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductService from '../../services/product'

const items = [
    {
        type: 'input',
        title: 'Название товара',
        name: 'name'
    },
    {
        type: 'checkbox',
        title: 'Активная',
        name: 'active'
    },
    {
        type: 'input',
        title: 'Шаблон',
        name: 'template'
    },
    {
        type: 'image',
        title: 'Изображение страницы',
        name: 'image_id'
    },
    {
        type: 'input',
        title: 'Цена',
        name: 'price'
    },
    {
        type: 'ckeditor',
        title: 'Описание',
        name: 'content'
    },
    {
        type: 'input',
        title: 'Сортировка',
        name: 'sort'
    },
    {
        type: 'input',
        title: 'SEO URL',
        name: 'sefurl'
    },
    {
        type: 'divider'
    },
    {
        type: 'input',
        title: 'Мета-тег Title',
        name: 'title'
    },
    {
        type: 'textarea',
        title: 'Мета-тег Description',
        name: 'description'
    },
    {
        type: 'textarea',
        title: 'Мета-тег Keywords',
        name: 'keywords'
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
        href: '/admin/products',
        title: 'Продукты',
    }
]

const Product = () => {
    return (
        <>
            <ItemForm 
                service={ProductService}
                items={items} 
                breadcrumb={breadcrumb}
            />
        </>
    )
}

export default Product;  