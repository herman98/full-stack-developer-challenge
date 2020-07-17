import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, FileOutlined } from '@ant-design/icons'
import Home from './pages/Home/index.jsx'
import ProductForm from './pages/Product/Form'
import VariantForm from './pages/Variant/Form'
import VariantList from './pages/Variant/list/List'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function App() {
  const [collapsed, setCollasped] = useState(false)

  const onCollapse = (collapsedParam) => setCollasped({ collapsedParam })

  const logoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Link to="/">
            <div className="logo" style={logoStyle}><h1 className="logo-text">Home</h1></div>
          </Link>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1" icon={<DesktopOutlined />} title="Product">
              <Menu.Item key="1">
                <Link to="/product/form">Insert</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="Variant">
              <Menu.Item key="3">
                <Link to="/variant/form">Insert</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, marginBottom: 16 }}
          />
          <Content style={{ margin: '0 16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/product/form" component={ProductForm} />
                <Route path="/variant/form" component={VariantForm} />
                <Route path="/variant/list" component={VariantList} />
                <Route render={() => <h1>404 Not Found</h1>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  )
}

export default App
