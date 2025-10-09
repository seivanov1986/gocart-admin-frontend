import React, { useState } from "react";
import { Breadcrumb, Divider, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import ItemForm from "../../library/form/form";
import CategoryService from "../../services/category";
import ImageToCategoryService from "../../services/imageToCategory";
import ImageList from "../../library/list/imagelist";

const breadcrumb = [
  {
    href: "/admin",
    title: <HomeOutlined />,
  },
  {
    type: "separator",
  },
  {
    href: "/admin/categories",
    title: "Категории",
  },
];

const items = [
  { type: "input", title: "Категория", name: "name" },
  { type: "checkbox", title: "Активная", name: "disabled" },
  { type: "input", title: "Шаблон", name: "template" },
  { type: "selectajax", title: "Родительская категория", name: "id_parent", service: CategoryService },
  { type: "image", title: "Изображение страницы", name: "id_image" },
  { type: "input", title: "Цена", name: "price" },
  { type: "ckeditor", title: "Описание", name: "content" },
  { type: "digitinput", title: "Сортировка", name: "sort" },
  { type: "input", title: "SEO URL", name: "sefurl" },
  { type: "divider" },
  { type: "input", title: "Мета-тег Title", name: "title" },
  { type: "textarea", title: "Мета-тег Description", name: "description" },
  { type: "textarea", title: "Мета-тег Keywords", name: "keywords" },
];

const Category = (props) => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("main");

  // контент вкладок
  const tabItems = [
    {
      key: "main",
      label: "Основные",
      children: (
        <ItemForm
          service={CategoryService}
          items={items}
          params={params}
          {...props}
        />
      ),
    },
    {
      key: "images",
      label: "Изображения",
      children: (
        <ImageList
          extra={{ id_category: Number(params.id) }}
          service={ImageToCategoryService}
          getQuery={(id1, id2) => ({
            image_id: id1,
            category_id: id2,
          })}
        />
      ),
    },
  ];

  return (
    <>
      <div style={{ paddingTop: "20px" }}>
        <Breadcrumb separator="" items={breadcrumb} />
      </div>

      <Divider />

      {/* если мы редактируем категорию */}
      {params.id ? (
        <Tabs
          defaultActiveKey="main"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={tabItems}
        />
      ) : (
        // если создаём новую категорию — только форма
        <ItemForm
          service={CategoryService}
          items={items}
          params={params}
          {...props}
        />
      )}
    </>
  );
};

export default Category;
