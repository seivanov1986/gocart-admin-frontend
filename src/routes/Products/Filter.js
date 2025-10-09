import { Button, Collapse, Form, Input } from "antd";
import { useEffect, useState } from 'react';
import Parent from "../../library/form/selectajax";
import CategoryService from '../../services/category';
import { create } from 'zustand';

// Zustand store
export const useStore = create((set) => ({
  form: null,                // ссылка на форму
  filterValues: {},          // сохранённые значения фильтра
  setForm: (formInstance) => set({ form: formInstance }),
  setFilterValues: (values) => set({ filterValues: values }),
}));

// форма внутри Collapse
const accordionItem = (form, onFinish, categoryValue, categorySetValue) => {
  return (
    <Form
      name="complex-form"
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      style={{ maxWidth: 1000, paddingRight: '20px', paddingTop: 20 }}
    >
      <Form.Item label="Название продукта">
        <Form.Item
          name="name"
          style={{ width: '100%', maxWidth: '500px', padding: 0, margin: 0 }}
        >
          <Input placeholder="Введите название" />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Категория">
        <Form.Item
          name="category"
          colon={false}
          style={{ width: '100%', maxWidth: '500px', padding: 0, margin: 0 }}
        >
          <Parent
            service={CategoryService}
            mode="multiple"
            value={categoryValue}
            setValue={categorySetValue}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Применить условия
        </Button>
      </Form.Item>
    </Form>
  );
};

// основной компонент фильтра
const ProductFilter = (props) => {
  const [form] = Form.useForm();
  const { setForm, filterValues, setFilterValues } = useStore();
  const [categoryValue, setCategoryValue] = useState([]);

  useEffect(() => {
    setForm(form);

    if (filterValues.category && filterValues.categoryLabels) {
      const restored = filterValues.category.map((id, idx) => ({
        value: id,
        label: filterValues.categoryLabels[idx]
      }));
      setCategoryValue(restored);
      form.setFieldsValue({ category: restored, name: filterValues.name });
    }
  }, [form, setForm, filterValues]);

  const categorySetValue = (selectedOptions) => {
    setCategoryValue(selectedOptions || []);
    form.setFieldsValue({ category: selectedOptions || [] });

    setFilterValues({
      ...filterValues,
      category: selectedOptions ? selectedOptions.map(o => o.value) : [],
      categoryLabels: selectedOptions ? selectedOptions.map(o => o.label) : []
    });
  };

  const onFinish = (values) => {
    const categoryLabels = categoryValue.map(o => o.label);
    const categoryIds = categoryValue.map(o => o.value);

    setFilterValues({
      ...values,
      category: categoryIds,
      categoryLabels
    });

    let filter = {};
    if (values.name) filter.name = values.name;
    if (categoryIds.length > 0) filter.category_id = categoryIds;

    props.setFilter(filter);
  };

  return (
    <>
      <Collapse
        accordion
        items={[
          {
            key: '1',
            label: 'Фильтр',
            children: accordionItem(form, onFinish, categoryValue, categorySetValue),
          },
        ]}
      />
      <br />
    </>
  );
};

export default ProductFilter;
