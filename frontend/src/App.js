import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import { HomeOutlined } from '@ant-design/icons'

// import Home from "./pages/Home/index.jsx";
import ProductForm from "./pages/Product/Form";
import VariantForm from "./pages/Variant/Form";
import ImageLogoForm from "./pages/ImageLogo/Form";
import LinkImageProduct from "./pages/Product/LinkImageForm";
import LinkImageVariant from "./pages/Variant/LinkImageForm";
import ProductList from "./pages/Product/List";
import VariantList from "./pages/Variant/List";
import ImageList from "./pages/ImageLogo/List";
import ProductDetail from "./pages/ProductDetail";
import VariantDetail from "./pages/VariantDetail";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollasped] = useState(false);

  const onCollapse = (collapsedParam) => setCollasped({ collapsedParam });

  const logoStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Link to="/">
            <div className="logo" style={logoStyle}>
              <HomeOutlined style={{color:"66788a"}} />
              <h1 className="logo-text">&nbsp; Home</h1>
            </div>
          </Link>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="sub1" icon={<DesktopOutlined />} title="Products">
              <Menu.Item key="1">
                <Link to="/product/insert">Insert</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/product/images">Attach Image</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/product/list">List</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="Variants">
              <Menu.Item key="4">
                <Link to="/variant/form">Insert</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/variant/images">Attach Images</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/variant/list">List</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<FileOutlined />} title="Images">
              <Menu.Item key="7">
                <Link to="/image_logo/form">Insert</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/image_logo/list">List</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, marginBottom: 16 }}
          />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route exact path="/" component={ProductList} />
                <Route path="/product/insert" component={ProductForm} />
                <Route path="/product/images" component={LinkImageProduct} />
                <Route path="/product/list" component={ProductList} />
                <Route
                  path="/product/detail/:productId"
                  component={ProductDetail}
                />
                <Route path="/product/:productId" component={ProductForm} />
                <Route path="/variant/form" component={VariantForm} />
                <Route path="/variant/images" component={LinkImageVariant} />
                <Route path="/variant/list" component={VariantList} />
                <Route
                  path="/variant/detail/:variantId"
                  component={VariantDetail}
                />
                <Route
                  path="/variant/:variantId"
                  component={VariantForm}
                />
                <Route path="/image_logo/form" component={ImageLogoForm} />
                <Route path="/image_logo/list" component={ImageList} />
                <Route
                  path="/image_logo/:imageId"
                  component={ImageLogoForm}
                />
                
                <Route render={() => <h1>404 Not Found</h1>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
