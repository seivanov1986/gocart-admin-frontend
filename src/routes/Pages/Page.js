import { Button, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import PageService from '../../services/page'
import { useParams } from "react-router-dom";

const items = [
    {
        type: 'input',
        title: 'Название страницы',
        name: 'name'
    },
    {
        type: 'input',
        title: 'Шаблон',
        name: 'template'
    },
    {
        type: 'select',
        title: 'Тип страницы',
        name: 'type'
    },
    {
        type: 'image',
        title: 'Изображение страницы',
        name: 'image_id'
    },
    {
        type: 'textarea',
        title: 'Краткое описание',
        name: 'short_content'
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
        href: '/admin/pages',
        title: 'Страницы',
    }
]

const Page = (props) => {
    const params = useParams()

    return (
        <>
            <ItemForm 
                service={PageService}
                items={items} 
                breadcrumb={breadcrumb}
                {...props}
                params={params}
            />
        </>
    )
}

export default Page;  