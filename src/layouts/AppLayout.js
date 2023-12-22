import { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Button, Breadcrumb, Radio, Table, Divider, Spin } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useEffect } from 'react';
import pingService from '../services/ping';
import {cleanToken} from '../authorization/auth'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    FileDoneOutlined,
    ProfileOutlined,
    FileImageOutlined,
    FileZipOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined
} from '@ant-design/icons';

import { Footer } from 'antd/es/layout/layout';

import './AppLayout.css'

const { Header, Content } = Layout;
const items = [
    {a: FileDoneOutlined, b:'Группы', k: '/admin/groups'},
    {a: TeamOutlined, b:'Пользователи', k: '/admin/users'},
  ].map((icon, index) => ({
    key: icon.k,
    icon: React.createElement(icon.a),
    label: icon.b,
}));

const Logo = (collapsed) => {
    return (
        <Link to="/admin">
            <img 
                src="https://tech-max.ru/admin/static/dist/img/AdminLTELogo.png" 
                style={{
                    float: 'left',
                    lineHeight: .8,
                    marginLeft: 0.8,
                    marginRight: 0.5,
                    marginTop: -3,
                    maxHeight: 33,
                    width: 'auto'
                }}
            />
            <span className="logotext"
                style={{
                    display: collapsed.collapsed === false ? 'inline' : 'none'
                }}
            >GoCart</span>
        </Link>
    )
}

const AppLayout = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        pingService.ping()
        .then(response => {
            if (response.status === 200) {
                setShowPreloader(false)
            }
        })
        .catch(e => {
            cleanToken()
            navigate('/admin/login/')
        });
    }, []);

    return (
        <Layout className="app-layout">
            <Sider
                className="app-layout-slider"
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={250}
            >
                <div className="app-layout-logo">
                    <Logo collapsed={collapsed}/>
                </div>
                <Menu 
                    className="app-layout-menu"
                    onClick={(e) => {navigate(e.key)}}
                    theme="dark"
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header className="app-layout-header">
                    <Button
                        className="buter"
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px' }}
                    />
                    <a class="exitlink" href="/admin/logout">Выход</a>
                </Header>
                <Content>
                    <div className="app-layout-content-box">
                        <Outlet/>
                    </div>
                </Content>
                <Footer className="app-layout-footer">
                    Version 0.1.1
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AppLayout;
