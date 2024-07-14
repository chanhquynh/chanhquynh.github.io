'use client';

import { MenuOutlined } from '@ant-design/icons';
import { Anchor, Button, Popover } from 'antd';
import { AnchorContainer, AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import { useEffect, useState } from 'react';

import { showTransfer } from '.';
import Rings from './Rings';

type Props = {
  type: 'normal' | 'mobile';
};

export default function Navigation(props: Props) {
  const [navItems, setNavItems] = useState<AnchorLinkItemProps[]>([]);
  useEffect(() => {
    const _navItems: AnchorLinkItemProps[] = [
      { key: 'couple', href: '#couple', title: 'Chúng tôi' },
      { key: 'photos', href: '#photos', title: 'Album ảnh' },
      { key: 'wedding', href: '#wedding', title: 'Tiệc cưới' },
      { key: 'blessing', href: '#blessing', title: 'Lưu bút' },
    ];
    if (window.location.pathname !== '/')
      _navItems.push(
        {
          key: 'confirmation',
          href: '#confirmation',
          title: 'Chung vui',
        },
        {
          key: 'transfer',
          href: '#',
          title: (
            <a className="cq-anchor-transfer" onClick={showTransfer}>
              Mừng cưới
            </a>
          ),
        }
      );
    setNavItems(_navItems);
  }, []);

  return props.type == 'normal' ? (
    <nav id="cq-nav">
      <span className="cq-logo">
        Q <Rings /> C
      </span>
      <Anchor
        direction="horizontal"
        // targetOffset={128}
        getContainer={() =>
          document.querySelector(
            '#cq-content-wrapper__outer'
          ) as AnchorContainer
        }
        className="cq-anchor"
        items={navItems}
      />
    </nav>
  ) : (
    <Popover
      id="mobile-nav"
      placement="bottomRight"
      content={
        <Anchor
          direction="vertical"
          // targetOffset={64}
          getContainer={() =>
            document.querySelector(
              '#cq-content-wrapper__outer'
            ) as AnchorContainer
          }
          className="cq-anchor"
          items={navItems}
        />
      }
    >
      <Button icon={<MenuOutlined />} id="mobile-nav-btn" />
    </Popover>
  );
}
