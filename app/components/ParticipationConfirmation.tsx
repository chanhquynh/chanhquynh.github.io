'use client';

// import type { FormProps } from 'antd';
import { Form, Input, InputNumber, Modal, Skeleton } from 'antd';
import Item from 'antd/es/form/FormItem';
import Papa from 'papaparse';
import { useState } from 'react';
import useSWR from 'swr';

import { Divider } from '.';

type Props = {
  links: { data: string; formId: string };
};

const ParticipationConfirmation = (props: Props) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  type Participant = {
    'Dấu thời gian': string;
    name: string;
    addon?: string;
    total: number;
  };

  const { data, mutate, isLoading } = useSWR(props.links.data, (url) =>
    fetch(url, { cache: 'no-store' })
      .then((res) => res.text())
      .then(
        (data) =>
          Papa.parse(data, { header: true }).data.reverse() as Participant[]
      )
  );

  const generateParticipants = (fetchedData?: Participant[]) => {
    if (!fetchedData) return '';
    const participants = [];
    for (const participant of fetchedData) {
      const addon =
        participant.addon != '' && participant.addon != '0'
          ? ` + ${participant.addon}`
          : '';
      participants.push(
        <p className="cq-confirmed-participant">
          {participant.name}
          {addon}
        </p>
      );
    }
    return participants;
  };

  const [form] = Form.useForm();

  const submitForm = async () => {
    setIsSending(true);
    const values = await form.validateFields();
    const name = encodeURIComponent(values.name);
    const addons: string = values.addons ?? '0';
    const total = parseInt(addons) + 1;

    await fetch(
      `https://docs.google.com/forms/d/e/${props.links.formId}/formResponse?usp=pp_url&entry.930157452=${name}&entry.1341605716=${addons}&entry.1501030110=${total}&submit=Submit`,
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
            Cám ơn anh/chị rất nhiều vì đã nhận lời tham dự tiệc cưới của vợ
            chồng chúng tôi! Sự hiện diện của anh/chị là niềm vinh dự lớn lao
            cho gia đình chúng tôi. <br /> Dữ liệu sẽ được cập nhật hoàn chỉnh
            sau 30 phút.
          </span>
        ),
        title: 'Xác nhận thành công!',
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
          onFinish={submitForm}
          id="cq-confirmation-form"
          className="cq-form"
        >
          <Item
            className="cq-form-item"
            label="Tên của anh/chị"
            required={true}
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Vui lòng điền tên của anh/chị.',
              },
            ]}
          >
            <Input
              className="cq-form-input"
              placeholder="Tên hoặc Tên thường gọi"
              style={{ width: '100%' }}
            />
          </Item>
          <Item
            label="Số người đi cùng"
            name="addons"
            className="cq-form-item"
            rules={[
              {
                pattern: new RegExp(/[0-9]/),
                whitespace: true,
                message: 'Vui lòng điền số.',
              },
            ]}
          >
            <div id="cq-confirmation-form--addons-submit">
              <InputNumber
                className="cq-form-input cq-form-input-number"
                min={0}
                max={5}
                controls={false}
                keyboard={false}
                defaultValue={0}
              />
              <a className="cq-btn cq-btn-primary" onClick={submitBtnClick}>
                Xác nhận tham dự
              </a>
            </div>
          </Item>
        </Form>
      </>
    );
  };

  return (
    <>
      <div id="confirmation" className="cq-section">
        <h1 className="section-title">Chung Vui</h1>
        <Divider />
        <div className="section-wrapper">
          <div className="section-content-bg"></div>
          <div className="section-content--wrapper">
            <span className="pb-4 text-center">
              Sự hiện diện của quý anh chị là niềm hạnh phúc của gia đình chúng
              tôi. <br />
              Vui lòng thông báo cho gia đình chúng tôi sự hiện diện của anh chị
              để chúng tôi có thể tiếp đón chu đáo.
            </span>
            <div id="cq-confirmation--wrapper" className="section-content ">
              {generateForm()}
              <h1 className="content-title">Khách mời đã xác nhận</h1>
              <div id="confirmed-participant">
                {isLoading ? <Skeleton active /> : generateParticipants(data)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipationConfirmation;
