import { Breadcrumb, Button, Collapse, Divider, Flex, Form, Input, Pagination, Popconfirm, Select, Skeleton, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, UpCircleOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from "antd/es/table/Column";
import { Option } from "antd/es/mentions";
import Parent from "../../library/form/selectajax";
import CategoryService from '../../services/category'

const ProductFilter = (props) => {
    const [form] = Form.useForm();

    const categorySetValue = (value) => {
      form.setFieldsValue({
        ["category"]: value
      })
    }

    const onFinish = (values) => {
        console.log(values)

        let filter = {}
        if (values.name != null) {
            filter.name = values.name
        }
        
        if (values.category) {
          let types = []
          for (let i = 0; i < values.category.length; i++) {
              types.push(parseInt(values.category[i]))
          }
          filter.category_id = types
        }

        props.setFilter(filter)
    }

    return (
        <>
            <Collapse accordion items={[
  {
    key: '1',
    label: 'Фильтр',
    children: <Form
    name="complex-form"
    form={form}
    onFinish={onFinish}
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      //span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
  >
<Form.Item label="Название продукта"

 style={{
    'padding-top': 20,
 }}
>
      <Space>
        <Form.Item
          name="name"
          noStyle
        >
          <Input
            style={{
              width: 160,
            }}
          />
        </Form.Item>
      </Space>
    </Form.Item>

    <Form.Item name="category" label="Категория" colon={false}>
      <Parent 
        style={{
          width: 160,
        }}
        service={CategoryService}
        setValue={categorySetValue}
        mode="multiple"
      />
    </Form.Item>
    
    <Form.Item label=" " colon={false}>
      <Button type="primary" htmlType="submit">
        Commit
      </Button>
    </Form.Item>
  </Form>,
  },
]} />


<br />
        </>
    )
}

export default ProductFilter;   