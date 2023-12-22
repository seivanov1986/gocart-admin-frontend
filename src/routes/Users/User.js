import { Select, Breadcrumb, Button, Divider, Flex, Form, Image, Input, InputNumber, 
    Modal, Pagination, Skeleton, Tooltip, Upload, Row, Col } from 'antd';
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

const User = (props) => {
    const params = useParams();

    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [imageOpen, setImageOpen] = useState(false);
    const [inQuery, setInQuery] = useState(false);
    const [form] = Form.useForm();

    const changeIdImage = (idImage) => {
        console.log(idImage)
        form.setFieldValue("id_image", idImage)
        setImageOpen(false)
    }

    const onGenderChange = (value) => {
      switch (value) {
        case 'male':
          form.setFieldsValue({
            note: 'Hi, man!',
          });
          break;
        case 'female':
          form.setFieldsValue({
            note: 'Hi, lady!',
          });
          break;
        case 'other':
          form.setFieldsValue({
            note: 'Hi there!',
          });
          break;
        default:
      }
    };

    useEffect(() => {
        if (params.id) {
            setIsEdit(true)
            UserService.read({id: Number(params.id)})
            .then(response => {
                if (response.status === 200) {
                    form.setFieldsValue(response.data.Row);
                    setIsLoading(false)
                } else {
                    setIsError(true)
                }
            })
            .catch(e => {
                setIsError(true)
            });
        } else {
            setIsLoading(false)
        }
    }, []);

    const onFinish = (values) => {
        console.log(values);
        let request = {}

        for (const property in values) {
            if (property) {
                request[property] = values[property]
            }
        }

        setInQuery(true)

        if (params.id) {
            UserService.update({
                ...request,
                id: Number(params.id)
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
                setInQuery(false)
            });
        } else {
            UserService.create(request)
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
                setInQuery(false)
            });
        }
    };

    /*
    if (loading) {
        return (
            <>

                <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={[
                    {
                        href: '/admin',
                        title: <HomeOutlined />,
                    },
                    {
                        type: 'separator',
                    },
                    {
                        href: '/admin/pages',
                        title: 'Страницы',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        title: 'Страница',
                    },
                    ]}
                />
                </div>

                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </>
        )
    }
    */

    if (isLoading) {
        return (
            <>
                <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={[
                    {
                        href: '/admin',
                        title: <HomeOutlined />,
                    },
                    {
                        type: 'separator',
                    },
                    {
                        href: '/admin/pages',
                        title: 'Страницы',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        title: 'Страница',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        title: 'Редактирование',
                    },
                    ]}
                />
                </div>
                <Skeleton active />
            </>
        )
    }

    return (
    <>
            <div style={{paddingTop: '20px'}}>
                <Breadcrumb
                    separator=""
                    items={[
                    {
                        href: '/admin',
                        title: <HomeOutlined />,
                    },
                    {
                        type: 'separator',
                    },
                    {
                        href: '/admin/users',
                        title: 'Пользователи',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        title: 'Пользователь',
                    },
                    {
                        type: 'separator',
                    },
                    {
                        title: 'Редактирование',
                    },
                    ]}
                />
                </div>

                <Divider />

    <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        style={{
            maxWidth: 1200,
        }}
    >
        <Form.Item
        label="Логин"
        name="login"
        rules={[
            {
            required: true,
            message: 'Имя пользователя не должно быть пустым',
            },
        ]}
        >
        <Input 
            maxLength={10}
            suffix={
                <Tooltip title="">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
            }
        />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Пароль"
        name="password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        >
        <Password />
        </Form.Item>

        <Divider />

        <Form.Item>
            <Button 
                type="primary" htmlType="submit"
                loading={inQuery}
            >
            Сохранить
            </Button>
        </Form.Item>
    </Form>
    </>
    )
};

export default User;