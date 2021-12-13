import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterNav = () => {
  return (
    <Layout>
      <Footer style={{ textAlignVertical: 'center', textAlign: 'center' }}>
        www.elrecomendado.com.ar | Todos los derechos reservados
      </Footer>
    </Layout>
  );
};

export default FooterNav;
