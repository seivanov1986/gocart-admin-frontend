import { Breadcrumb, Button, Divider, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryService from '../../services/category'
import { useParams } from "react-router-dom"
import { useState } from 'react';
import Tabs from "../../library/form/tabs";
import ImageList from "../../library/list/imagelist";

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
        name: 'parent_id',
        service: CategoryService
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

const tabs = [
    {
        key: '0',
        label: 'Основные',
        tab: 'main'
    },
    {
        key: '1',
        label: 'Изображения',
        tab: 'images'
    }
]

const Tab = (props) => {
    if (props.tab == 'main') {
        return (
            <>
                <ItemForm 
                    service={CategoryService}
                    items={items} 
                    {...props}
                />
            </>
        )
    }

    if (props.tab == 'images') {
        return (
            <>
                <ImageList />
            </>
        )
    }

    return (<></>)
}

const Category = (props) => {
    const params = useParams()
    const [tab, setTab] = useState('main')

    return (
        <>
            <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={breadcrumb}
                />
            </div>

            <Divider />

            <Tabs 
                params={params}
                tabs={tabs}
                onTabChange={(e) => {
                    setTab(e)
                }}
            />

            <Tab
                {...props} 
                params={params}
                tab={tab} 
            />
        </>
    )
}

export default Category;  