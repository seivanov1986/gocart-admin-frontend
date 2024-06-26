import { Breadcrumb, Button, Divider, Form, Input, Tooltip } from "antd";
import ItemForm from "../../library/form/form";
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductService from '../../services/product'
import ImageToProductService from '../../services/imageToProduct'
import { useParams } from "react-router-dom";
import Tabs from "../../library/form/tabs";
import { useState } from 'react';
import CategoriesTab from "./tabs/categories";
import AttributesTab from "./tabs/attributes";
import ImageList from "../../library/list/imagelist";

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
        name: 'id_image'
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
        href: '/admin/products',
        title: 'Продукты',
    }
]

const tabs = [
    {
      key: '0',
      label: 'Основные',
      tab: 'main',
      widget: 'main'
    },
    {
      key: '1',
      label: 'Изображения',
      tab: 'images',
      widget: 'images'
    },
    {
      key: '2',
      label: 'Категории',
      tab: 'categories',
      widget: 'categories'
    },
    {
      key: '3',
      label: 'Атрибуты',
      tab: 'attributes',
      widget: 'attributes'
    }
];

const Tab = (props) => {
    if (props.tab == 'main') {
        return (
            <>
                <ItemForm 
                    service={ProductService}
                    items={items} 
                    {...props}
                />
            </>
        )
    }

    if (props.tab == 'categories') {
        return (
            <>
                <CategoriesTab 
                    {...props}
                />
            </>
        )
    }

    if (props.tab == 'attributes') {
        return (
            <>
                <AttributesTab 
                    {...props}
                />
            </>
        )
    }

    const getQuery = (id1, id2) => {
        return {
            image_id: id1,
            product_id: id2,
        };
    }

    if (props.tab == 'images') {
        return (
            <>
                <ImageList 
                    extra={{id_product: Number(props.params.id)}}
                    service={ImageToProductService} 
                    getQuery={getQuery}
                />
            </>
        )
    }

    return (<></>)
}

const Product = (props) => {
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

export default Product;  