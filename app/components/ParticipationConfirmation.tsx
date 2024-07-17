'use client';

// import type { FormProps } from 'antd';
import { Form, Input, InputNumber, Modal, Skeleton } from 'antd';
import Item from 'antd/es/form/FormItem';
import { Octokit } from 'octokit';
import { useState } from 'react';
import useSWR from 'swr';

import useOctokit from '../data/useOctokit';
import { Blessing, Divider } from '.';

type Props = {
  links: { gistId: string; fileName: string };
};

const octokit = new Octokit({
  auth: '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',
});

const ParticipationConfirmation = (props: Props) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const { getData, updateData } = useOctokit(octokit);

  const { data, mutate, isLoading } = useSWR(props.links.fileName, () =>
    getData(props.links.gistId, props.links.fileName)
  );

  const generateParticipants = () => {
    if (!data) return '';
    const participants = [];
    const _data = [...data].reverse();
    for (const participant of _data) {
      const addon = participant.addon != 0 ? ` + ${participant.addon}` : '';
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
    const name = values.name;
    const addons = values.addons ? parseInt(values.addons) : 0;
    const total = addons + 1;

    const _participantData = data ? [...data] : [];
    _participantData.push({
      name: name,
      addon: addons,
      total: total,
    });
    const updateReqStatus = await updateData(
      props.links.gistId,
      props.links.fileName,
      _participantData
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
            Cám ơn quý khách rất nhiều vì đã nhận lời tham dự tiệc cưới của vợ
            chồng chúng tôi! Sự hiện diện của quý khách là niềm vinh hạnh cho
            gia đình chúng tôi.
          </span>
        ),
        title: 'Xác nhận thành công!',
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
          onFinish={submitForm}
          id="cq-confirmation-form"
          className="cq-form"
        >
          <Item
            className="cq-form-item"
            label="Tên của quý khách"
            required={true}
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Vui lòng điền tên của quý khách.',
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
      <Blessing octokit={octokit} />
      <div id="confirmation" className="cq-section">
        <h1 className="section-title">Chung Vui</h1>
        <Divider />
        <div className="section-wrapper">
          <div className="section-content-bg"></div>
          <div className="section-content--wrapper">
            <span className="pb-4 text-center">
              Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng
              tôi. <br />
              Vui lòng thông báo cho gia đình chúng tôi sự hiện diện của quý
              khách để chúng tôi có thể tiếp đón chu đáo.
            </span>
            <div id="cq-confirmation--wrapper" className="section-content ">
              {generateForm()}
              <h1 className="content-title">Khách mời đã xác nhận</h1>
              <div id="confirmed-participant">
                {isLoading ? <Skeleton active /> : generateParticipants()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipationConfirmation;
