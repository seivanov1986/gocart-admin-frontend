import List from "../../../library/list/list";
import { Link } from "react-router-dom";
import ProductService from '../../../services/product'
import AttributeService from '../../../services/attribute'
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
          service={ProductService}
          items={items} 
          {...props}
          params={{}}
          hideButton={true}
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
              service={ProductService}
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