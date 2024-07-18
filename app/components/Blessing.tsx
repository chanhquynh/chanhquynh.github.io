'use client';
import { Form, Input, Modal, Skeleton } from 'antd';
import Item from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { Octokit } from 'octokit';
import { useState } from 'react';
import useSWR from 'swr';

import Links from '../data/Links';
import useOctokit from '../data/useOctokit';
import { Divider } from './';

export default function Blessing({ octokit }: { octokit: Octokit }) {
  const [isSending, setIsSending] = useState<boolean>(false);
  const { getData, updateData } = useOctokit(octokit);

  const { data, mutate, isLoading } = useSWR(Links.BLESSING.fileName, () =>
    getData(Links.BLESSING.gistId, Links.BLESSING.fileName)
  );

  const generateBlesses = () => {
    if (!data) return '';
    const _data = [...data].reverse();
    const blesses = [];
    for (const bless of _data) {
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

    const _blessingData = data ? [...data] : [];
    _blessingData.push({
      name: values.name,
      blessing: values.blessingInput,
    });

    const updateReqStatus = await updateData(
      Links.BLESSING.gistId,
      Links.BLESSING.fileName,
      _blessingData
    );
    if (updateReqStatus == 200) {
      Modal.success({
        centered: true,
        keyboard: true,
        maskClosable: true,
        closable: true,
        footer: [],
        content: (
          <span className="cq-success-modal-content">
            Cám ơn quý vị rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất
            đến vợ chồng chúng tôi!
          </span>
        ),
        title: 'Gửi thành công!',
      });
      form.resetFields();
      mutate();
    } else {
      Modal.error({
        centered: true,
        keyboard: true,
        maskClosable: true,
        closable: true,
        footer: [],
        content: (
          <span className="cq-success-modal-content">Đã xảy ra lỗi...</span>
        ),
        title: 'KHÔNG thành công!',
      });
    }
    setIsSending(false);
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
            name="blessingInput"
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
              {isLoading ? <Skeleton active /> : generateBlesses()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
