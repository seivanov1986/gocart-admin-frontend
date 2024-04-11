import { Breadcrumb, Button, Collapse, Divider, Flex, Form, Input, Pagination, Popconfirm, Select, Skeleton, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, UpCircleOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from "antd/es/table/Column";
import { Option } from "antd/es/mentions";

const PageFilter = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)

        let filter = {}
        if (values.name != null) {
            filter.name = values.name
        }
        if (values.type != null) {
            let types = []
            for (let i = 0; i < values.type.length; i++) {
                types.push(parseInt(values.type[i]))
            }

            filter.type = types
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
<Form.Item label="Название страницы"

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
    <Form.Item label="Тип страницы">
      
        <Form.Item
          name="type"
          noStyle
        >
          <Select 
            mode="multiple"
            style={{
                width: 160,
            }}
          >
            <Option value="1">Статья</Option>
            <Option value="0">Страница</Option>
            <Option value="2">Новость</Option>
          </Select>
        </Form.Item>
      
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

export default PageFilter;   