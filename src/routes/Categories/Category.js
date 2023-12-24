import { Button, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryService from '../../services/category'
import { useParams } from "react-router-dom";

const items = [
    {
        type: 'input',
        title: 'Категория',
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
        type: 'selectajax',
        title: 'Родительская категория',
        name: 'parent_id'
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
        type: 'digitinput',
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
        href: '/admin/categories',
        title: 'Категории',
    }
]

const Category = (props) => {
    const params = useParams()

    return (
        <>
            <ItemForm 
                service={CategoryService}
                items={items} 
                breadcrumb={breadcrumb}
                {...props}
                params={params}
            />
        </>
    )
}

export default Category;  