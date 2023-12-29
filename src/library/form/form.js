import { Select, Breadcrumb, Button, Divider, Flex, Form, Image, Input, InputNumber, 
    Modal, Pagination, Skeleton, Tooltip, Upload, Row, Col, Checkbox, Dropdown, Space } from 'antd';
import { Typography, notification } from 'antd';
import { UploadOutlined, UpCircleOutlined, SyncOutlined, FolderAddOutlined, 
    DeleteOutlined, DragOutlined, PlusCircleOutlined, FolderOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Search from 'antd/es/input/Search';
import { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { HomeOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import Password from 'antd/es/input/Password';
import UserService from '../../services/user'
import {useParams} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import Parent from './selectajax'
import ImageBox from './image'
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
};

const InputHidden = (item) => {
  item.form.setFieldsValue({
    [item.name]: item.value
  })

  return (
    <>
      <Form.Item hidden name={item.name ?? ""}>
        <Input type="hidden" value={item.value ?? ""} />
      </Form.Item>
    </>
  )
}

const InputRender = (item) => {
  return (
    <>
      <Form.Item
        label={item.title ?? ""}
        name={item.name ?? ""}
        rules={item.rules ?? []}
        >
        <Input 
            maxLength={100}
            suffix={
                <Tooltip title="Название страницы используется для поиска среди других страниц, а так же для заголовка H1. Должно иметь уникальное значение">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
            }
        />
      </Form.Item>
    </>
  )
}

const TextareaRender = (item) => {
  return (
    <>
      <Form.Item 
        name={item.name ?? ""}
        label={item.title ?? ""}
      >
        <Input.TextArea />
      </Form.Item>
    </>
  )
}

const SelectRender = (item) => {
  return (
    <>
      <Form.Item
            name={item.name ?? ""}
            label={item.title ?? ""}
        >
        <Select 
            placeholder="Please select a country"
            defaultValue={0}
        >
            <Option value={0}>Страница</Option>
            <Option value={1}>Статья</Option>
            <Option value={2}>Новость</Option>
        </Select>
      </Form.Item>
    </>
  )
}

const CkeditorRender = (item) => {
  return (
    <>
      <Form.Item 
            name={item.name ?? ""}
            label={item.title ?? ""}
            getValueFromEvent={(event, editor) => {
              return editor.getData();
            }}
        >
        <CKEditor
            editor={ClassicEditor}
            data={item.form.getFieldValue(item.name ?? "") ?? ""}
            config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
                    'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed', '|', 'undo', 'redo', '|', 'SourceEditing'],
                htmlSupport: {
                    allow: [
                        {
                            name: /.*/,
                            attributes: true,
                            classes: true,
                            styles: true
                        }
                    ]
                },
                mediaEmbed: {
                    previewsInData:true
                },
                BlockFillerMode: 'br',
            }}  
        />
      </Form.Item>
    </>
  )
}

const CheckboxRender = (item) => {
  return (
    <>
      <Form.Item
        label={item.title ?? ""}
        name={item.name ?? ""}
      >
          <Checkbox />
      </Form.Item>
    </>
  )
}

const DigitInputRender = (item) => {
  return (
    <>
      <Form.Item
        label={item.title ?? ""}
        name={item.name ?? ""}
      >
        <InputNumber 
            min={0} defaultValue={0} 
        />
      </Form.Item>
    </>
  )
}

const SelectAjaxRender = (item) => {
  const setValue = (value) => {
    item.form.setFieldsValue({
      [item.name]: value
    })
  }

  return (
    <>
      <Form.Item
            name={item.name ?? ""}
            label={item.title ?? ""}
        >
        <Parent setValue={setValue} service={item.service ?? null} />
      </Form.Item>
    </>
  )
}

const DividerRender = () => {
  return (
    <>
      <Divider />
    </>
  )
}

const PasswordRender = (item) => {
  return (
    <>
      <Form.Item
        label={item.title ?? ""}
        name={item.name ?? ""}
        rules={item.rules ?? []}
        >
        <Password />
      </Form.Item>
    </>
  )
}

const ImageRender = (item) => {
  return (
    <>
      <Form.Item
        name={item.name ?? ""}
        label={item.title ?? ""}
        valuePropName="fileList"
        //getValueFromEvent={normFile}
      >
        <ImageBox />
      </Form.Item>
    </>
  )
}

const elements = new Map(
  [
    ['input', InputRender],
    ['textarea', TextareaRender],
    ['ckeditor', CkeditorRender],
    ['select', SelectRender],
    ['selectajax', SelectAjaxRender],
    ['checkbox', CheckboxRender],
    ['digitinput', DigitInputRender],
    ['divider', DividerRender],
    ['password', PasswordRender],
    ['image', ImageRender],
    ['hidden', InputHidden],
  ]
)

const ItemForm = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);

  if (props.setForm) {
    props.setForm(form)
  }

  useEffect(() => {
    if (props.params.id) {
      props.service.read({id: Number(props.params.id)})
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.Row)
          form.setFieldsValue(response.data.Row);
          setIsLoading(false)
        }
      })
      .catch(e => {
          
      })
      .finally(e => {
          //setInQuery(false)
      });
    }
  }, []);

  const onFinish = (values) => {
    let request = {}

    for (const property in values) {
        if (property) {
            request[property] = values[property]
        }
    }

    if (props.params.id) {
      props.service.update({
        ...request,
        id: Number(props.params.id)
      })
      .then(response => {
          if (response.status === 200) {
              notification.success({
                  message: 'success',
                  description: 'Страница успешно добавлена',
              })
          } else {
              notification.error({
                  message: 'Terminal error',
                  description: response.error ?? 'unknown error',
                  duration: 10,
              })
          }
      })
      .catch(e => {
          notification.error({
              message: 'Template error',
              duration: 10,
              description: e.message,
          })
      })
      .finally(e => {
          //setInQuery(false)
      });
    } else {
      props.service.create(request)
      .then(response => {
          if (response.status === 200) {
              notification.success({
                  message: 'success',
                  description: 'Страница успешно добавлена',
              })
              if (props.setReload) {
                props.setReload(Date.now())
              }
          } else {
              notification.error({
                  message: 'Terminal error',
                  description: response.error ?? 'unknown error',
                  duration: 10,
              })
          }
      })
      .catch(e => {
          notification.error({
              message: 'Template error',
              duration: 10,
              description: e.message,
          })
      })
      .finally(e => {
          //setInQuery(false)
      });
    }
  }

  let items = props.items ?? []
  let hideButton = props.hideButton ?? false

  return (
      <>
          <Form
              {...formItemLayout}
              form={form}
              onFinish={onFinish}
              style={{
                  maxWidth: 1200,
              }}
          >

            {items.map((item, index) => ( 
              elements.get(item.type)({...item, form})
            ))}

          {!hideButton &&
            <>
            <Divider />

            <Form.Item>
                <Button 
                    type="primary" htmlType="submit"
                    //loading={inQuery}
                >
                Сохранить
                </Button>
            </Form.Item>
            </>
          }

          </Form>
      </>
  )
}

export default ItemForm;