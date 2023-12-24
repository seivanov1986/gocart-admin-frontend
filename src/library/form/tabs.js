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
import ItemForm from './form';

const Tabs = (props) => {
    const [selectName, setSelectName] = useState(props.tabs[0].label)

    return (
        <>
            {props.params.id &&
                <>
                    <Dropdown
                        menu={{
                            items: props.tabs,
                            selectable: true,
                            defaultSelectedKeys: ['0'],
                            onClick: (e) => {
                                let item = props.tabs[e.key]
                                setSelectName(item.label)
                                props.onTabChange(item.tab)
                            },
                        }}
                        trigger={['click']}
                    >
                        <Typography.Link>
                            <Space>
                                {selectName}
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>

                    <Divider />
                </>
            }
        </>
    )
}

export default Tabs;