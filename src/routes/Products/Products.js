import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import ProductService from '../../services/product'
import List from "../../library/list/list";
import ProductFilter from "./Filter";
import { Button, Dropdown, message } from 'antd';
import { useCallback } from 'react';

const breadcumbItems = [
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
];

const Products = () => {

  // функция копирования
  const handleCopy = useCallback(async (id) => {
    try {
      await ProductService.copy({ id });
      message.success('Товар успешно скопирован');
    } catch (error) {
      console.error(error);
      message.error('Ошибка при копировании товара');
    }
  }, []);

  // функция удаления
  const handleDelete = useCallback(async (id) => {
    try {
      await ProductService.delete(id);
      message.success('Товар удалён');
    } catch (error) {
      console.error(error);
      message.error('Ошибка при удалении товара');
    }
  }, []);

  const columns = [
    {
      title: 'Название продукта',
      dataIndex: 'name',
      render: (text, record) => {
        const url = "/admin/product/" + record.id;
        return <Link to={url}>{text}</Link>;
      },
    },
    {
      title: 'Действие',
      dataIndex: 'actions',
      render: (_, record) => {
        const items = [
          {
            key: 'copy',
            label: 'Скопировать',
            onClick: () => handleCopy(record.id),
          },
          {
            key: 'delete',
            label: 'Удалить',
            onClick: () => handleDelete(record.id),
          },
        ];

        return (
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={['click']}
          >
            <Button>...</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <List
      service={ProductService}
      columns={columns}
      breadcumbItems={breadcumbItems}
      createUrl="product"
      filter={<ProductFilter />}
    />
  );
};

export default Products;
