import { Breadcrumb, Button, Collapse, Divider, Flex, Form, Input, Pagination, Popconfirm, Select, Skeleton, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HomeOutlined, UpCircleOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from "antd/es/table/Column";
import { Option } from "antd/es/mentions";

const accordionItem = (form, onFinish) => {
  return (
    <>
      <Form
        name="complex-form"
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        style={{
          maxWidth: 1000,
          paddingRight: '20px',
          'padding-top': 20,
        }}
      >
        <Form.Item label="Название страницы">
          <Form.Item
            name="name" 
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: 0,
              margin: 0
            }}>
              <Input/>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Тип страницы">   
          <Form.Item
            name="type" 
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: 0,
              margin: 0
            }}
          >
            <Select 
              mode="multiple"
            >
              <Option value="1">Статья</Option>
              <Option value="0">Страница</Option>
              <Option value="2">Новость</Option>
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Применить условия
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

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
              children: accordionItem(form, onFinish),
            },
]} />


<br />
        </>
    )
}

export default PageFilter;   