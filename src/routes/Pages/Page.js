import { Button, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const items = [
    {
        type: 'input',
        title: 'Название страницы'
    },
    {
        type: 'input',
        title: 'Шаблон'
    },
    {
        type: 'select',
        title: 'Тип страницы'
    },
    {
        type: 'image',
        title: 'Изображение страницы'
    },
    {
        type: 'textarea',
        title: 'Краткое описание'
    },
    {
        type: 'ckeditor',
        title: 'Описание'
    },
    {
        type: 'input',
        title: 'Сортировка'
    },
    {
        type: 'input',
        title: 'SEO URL'
    },
    {
        type: 'divider'
    },
    {
        type: 'input',
        title: 'Мета-тег Title'
    },
    {
        type: 'textarea',
        title: 'Мета-тег Description'
    },
    {
        type: 'textarea',
        title: 'Мета-тег Keywords'
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
        href: '/admin/pages',
        title: 'Страницы',
    }
]

const Page = () => {
    return (
        <>
            <ItemForm 
                items={items} 
                breadcrumb={breadcrumb}
            />
        </>
    )
}

export default Page;  