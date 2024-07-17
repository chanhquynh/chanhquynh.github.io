import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import type { Metadata } from 'next';
import { Comfortaa, Dancing_Script, Lora } from 'next/font/google';
import React, { ReactNode } from 'react';

import {
  Couple,
  Footer,
  Navigation,
  Photos,
  Rings,
  TopInfo,
  Wedding,
} from './components';

const sans = Comfortaa({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans',
});

const serif = Lora({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
});

const handwriting = Dancing_Script({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: 'variable',
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV == 'production'
      ? 'https://chanhquynh.github.io/'
      : 'localhost:3000'
  ),
  title: 'Quỳnh Anh & Minh Chánh',
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${sans.variable} ${serif.variable} ${handwriting.variable}`}
    >
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#a4784a',
              },
            }}
          >
            <Layout className="cq-layout-wrapper">
              <Header id="cq-header" className="cq-nav">
                <div id="mobile-logo"></div>

                <span className="cq-logo">
                  Q <Rings /> C
                </span>

                <Navigation type="mobile" />
              </Header>
              <Navigation type="normal" />
              <Layout id="cq-content-wrapper__outer">
                <TopInfo />
                <Couple />
                <Photos />
                <Wedding />
                {children}
                <Footer />
              </Layout>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
