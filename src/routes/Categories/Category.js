import { Button, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const items = [
    {
        type: 'input',
        title: 'Категория'
    },
    {
        type: 'checkbox',
        title: 'Активная'
    },
    {
        type: 'input',
        title: 'Шаблон'
    },
    {
        type: 'selectajax',
        title: 'Родительская категория'
    },
    {
        type: 'image',
        title: 'Изображение страницы'
    },
    {
        type: 'input',
        title: 'Цена'
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
        href: '/admin/categories',
        title: 'Категории',
    }
]

const Category = () => {
    return (
        <>
            <ItemForm 
                items={items} 
                breadcrumb={breadcrumb}
            />
        </>
    )
}

export default Category;  