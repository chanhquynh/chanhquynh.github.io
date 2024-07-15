'use client';
import { Form, Input, Modal, Skeleton } from 'antd';
import Item from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import Papa from 'papaparse';
import { useState } from 'react';
import useSWR from 'swr';

import Links from '../data/Links';
import { Divider } from './';

export default function Blessing() {
  const [isSending, setIsSending] = useState<boolean>(false);
  type Blesses = {
    'Dấu thời gian': string;
    name: string;
    blessing: string;
    response?: string;
  };

  const { data, mutate, isLoading } = useSWR(Links.BLESSING.data, (url) =>
    fetch(url, { cache: 'no-store' })
      .then((res) => res.text())
      .then(
        (data) => Papa.parse(data, { header: true }).data.reverse() as Blesses[]
      )
  );

  const generateBlesses = (fetchedData?: Blesses[]) => {
    if (!fetchedData) return '';
    const blesses = [];
    for (const bless of fetchedData) {
      blesses.push(
        <p className="cq-received-blessing">
          <span className="cq-received-blessing__name">{bless.name}</span>
          <span className="cq-received-blessing__blessing">
            {bless.blessing}
          </span>
        </p>
      );
    }
    return blesses;
  };

  const [form] = Form.useForm();
  const submitForm = async () => {
    setIsSending(true);
    const values = await form.validateFields();
    const name = encodeURIComponent(values.name);
    const blessing = encodeURIComponent(values.blessinginput);

    await fetch(
      `https://docs.google.com/forms/d/e/${Links.BLESSING.formId}/formResponse?usp=pp_url&entry.2069906091=${name}&entry.1102852873=${blessing}&entry.1618139638=0&submit=Submit`,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
        mode: 'no-cors',
      }
    ).then(() => {
      Modal.success({
        centered: true,
        keyboard: true,
        maskClosable: true,
        closable: true,
        footer: [],
        content: (
          <span className="cq-success-modal-content">
            Cám ơn quý vị rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất
            đến vợ chồng chúng tôi! <br /> Dữ liệu sẽ được cập nhật hoàn chỉnh
            sau 30 phút.
          </span>
        ),
        title: 'Gửi thành công!',
      });
      form.resetFields();
      mutate();
      setIsSending(false);
    });
  };

  const submitBtnClick = () => {
    if (!isSending) form.submit();
    else console.log('Wait...');
  };

  const generateForm = () => {
    return (
      <>
        <Form
          form={form}
          layout="vertical"
          onFinish={submitForm}
          id="cq-blessing-form-content"
          className="cq-form"
        >
          <Item
            className="cq-form-item"
            label="Tên của quý vị"
            required={true}
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: <div className="hidden"></div>,
              },
            ]}
          >
            <Input
              className="cq-form-input"
              placeholder="Tên hoặc Tên thường gọi"
            />
          </Item>
          <Item
            label="Lời chúc"
            required={true}
            name="blessinginput"
            className="cq-form-item cq-form-item__blessing"
            rules={[
              {
                required: true,
                whitespace: true,
                message: <div className="hidden"></div>,
              },
            ]}
          >
            <TextArea
              className="cq-form-input cq-form-input-textarea"
              placeholder="Nhập lời chúc"
            />
          </Item>

          <a
            id="cq-blessing-submit-btn"
            className="cq-btn cq-btn-primary"
            onClick={submitBtnClick}
          >
            Gửi lời chúc
          </a>
        </Form>
      </>
    );
  };

  return (
    <div id="blessing" className="cq-section">
      <div className="section-bg"></div>
      <div className="section-wrapper">
        <h1 className="section-title">Sổ Lưu Bút</h1>
        <Divider />
        <div className="section-content-bg"></div>
        <div className="section-content--wrapper">
          <div id="cq-blessing-form--wrapper" className="section-content ">
            <div id="cq-blessing-form">{generateForm()}</div>
          </div>
          <div id="cq-blessing-display--wrapper" className="section-content ">
            <div className="blessing-content-bg"></div>
            <div id="cq-blessing-display">
              {isLoading ? <Skeleton active /> : generateBlesses(data)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
