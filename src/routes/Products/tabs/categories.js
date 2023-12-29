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
      dataIndex: 'Name',
    },
];

const items = [
    {
        type: 'selectajax',
        title: 'Категория',
        name: 'name',
        service: CategoryService,
    },
    {
      type: 'checkbox',
      title: 'Главная категория',
      name: 'main'
    },
];

const AddModal = (props) => {
    return (
        <Modal 
            title="Добавить аттрибут"
            open={props.isOpen}
            onCancel={() => {
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
            />
        </Modal>
    )
}

const CategoriesTab = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const addFunc = () => {
        setIsOpen(true)
    }

    const closeFunc = () => {
        setIsOpen(false)
    }

    return (
        <>
            <List 
                service={ProductToCategoryService}
                columns={columns} 
                breadcumbItems={[]}
                createUrl="product"
                addFunc={addFunc}
            />
            <AddModal 
                isOpen={isOpen} 
                closeFunc={closeFunc}
            />
        </>
    )
}

export default CategoriesTab;