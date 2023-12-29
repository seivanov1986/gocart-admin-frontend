import List from "../../../library/list/list";
import { Link } from "react-router-dom";
import ProductService from '../../../services/product'
import CategoryService from '../../../services/category'
import ProductToCategoryService from '../../../services/productToCategory'
import { Modal } from "antd";
import { useState } from 'react';
import ItemForm from "../../../library/form/form";

const columns = [
    {
      title: 'Название продукта',
      dataIndex: 'name_category',
    },
];

const items = [
    {
        type: 'selectajax',
        title: 'Категория',
        name: 'id_category',
        service: CategoryService,
    },
    {
      type: 'checkbox',
      title: 'Главная категория',
      name: 'main_category'
    },
];

const AddModal = (props) => {
    const [form, setForm] = useState(null)

    items.push({
        type: 'hidden',
        title: 'Продукт',
        name: 'id_product',
        value: Number(props.params.id ?? null),
    })

    return (
        <Modal 
            title="Добавить аттрибут"
            open={props.isOpen}
            onCancel={() => {
                props.closeFunc()
            }}
            onOk={(e) => {
                form.submit()
                props.closeFunc()
            }}
            style={{
                top: 20,
                minWidth: 800,
            }}
        >
            <ItemForm 
                service={ProductToCategoryService}
                items={items} 
                {...props}
                params={{}}
                hideButton={true}
                setForm={setForm}
            />
        </Modal>
    )
}

const CategoriesTab = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [reload, setReload] = useState(0)

    const addFunc = () => {
        setIsOpen(true)
    }

    const closeFunc = () => {
        setIsOpen(false)
    }

    return (
        <>
            <List 
                extra={{id_product:Number(props.params.id ?? null)}}
                service={ProductToCategoryService}
                columns={columns} 
                breadcumbItems={[]}
                createUrl="product"
                addFunc={addFunc}
                reload={reload}
            />
            <AddModal 
                isOpen={isOpen} 
                {...props}
                closeFunc={closeFunc}
                setReload={setReload}
            />
        </>
    )
}

export default CategoriesTab;