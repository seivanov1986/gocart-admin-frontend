import List from "../../../library/list/list";
import { Link } from "react-router-dom";
import ProductService from '../../../services/product'
import AttributeService from '../../../services/attribute'
import AttributeToProductService from '../../../services/attributeToProduct'
import { Modal } from "antd";
import { useState } from 'react';
import ItemForm from "../../../library/form/form";

const columns = [
    {
      title: 'Название продукта',
      dataIndex: 'Name',
      render: (text, record) => {
        let url = "/admin/product/" + record.Id
        return (<Link to={url ?? ""}>{text}</Link>)
      },
    },
];

const items = [
  {
      type: 'selectajax',
      title: 'Аттрибут',
      name: 'attribute',
      service: AttributeService,
  },
  {
    type: 'input',
    title: 'Значение',
    name: 'value'
  },
];

const AddModal = (props) => {
  const [form, setForm] = useState(null)

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
          service={AttributeToProductService}
          items={items}
          {...props}
          params={{}}
          hideButton={true}
          setForm={setForm}
        />
      </Modal>
  )
}

const AttributesTab = (props) => {
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
              service={AttributeToProductService}
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

export default AttributesTab;