'use client';

import { ClockCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { Divider, WeddingButtons } from '.';

export default function Wedding() {
  const [invitation, setInvitation] = useState<boolean>(false);
  useEffect(() => {
    if (window.location.pathname !== '/') setInvitation(true);
  }, []);
  return (
    <div id="wedding" className="cq-section">
      <h1 className="section-title">Thông Tin Tiệc Cưới</h1>
      <Divider />
      <span
        className={`cq-wedding-invitation ${invitation ? 'cq-wedding-invitation--visible' : ''}`}
      >
        TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH
        <br />
        Đến tham dự buổi tiệc chung vui cùng gia đình chúng tôi
      </span>
      <div className="section-wrapper">
        <div className="section-content-bg"></div>
        <div className="section-content--wrapper">
          <div id="cq-wedding-location-info" className="section-content">
            <h1 id="cq-wedding-save-the-date">Save the Date</h1>
            <div id="cq-wedding-cover"></div>
            <div className="cq-wedding-location cq-wedding-location-lg">
              <h1 className="cq-wedding-restaurant">
                Nhà Hàng Hương Phố - Sảnh 3
              </h1>
              <span className="cq-wedding-address">
                A12 Phan Văn Trị, Phường 7, Gò Vấp, TP.HCM
              </span>
              <span>
                <a
                  className="cq-link cq-wedding-map"
                  href="https://maps.app.goo.gl/Ckpbjz1ZB24Va6R4A"
                  target="_blank"
                >
                  xem bản đồ
                </a>
              </span>
            </div>
          </div>

          <div id="cq-wedding-date-info" className="section-content">
            <div id="cq-wedding-calendar--wrapper">
              {/* <div id="cq-wedding-calendar-bg"></div> */}
              <table id="cq-wedding-calendar">
                <thead>
                  <tr className="">
                    <td colSpan={7}>
                      <div
                        className={`cq-wedding-month-time ${invitation ? 'cq-wedding-month-time--invitation' : ''}`}
                      >
                        <h2>THÁNG 9, 2024</h2>
                        <h2
                          className={`cq-wedding-time ${invitation ? 'cq-wedding-time--visible' : ''}`}
                        >
                          <ClockCircleOutlined /> 17:00
                        </h2>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>T2</th>
                    <th>T3</th>
                    <th>T4</th>
                    <th>T5</th>
                    <th>T6</th>
                    <th className="cq-wedding-day">T7</th>
                    <th>CN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td className="cq-wedding-day">14</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                    <td>19</td>
                    <td>20</td>
                    <td>21</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>26</td>
                    <td>27</td>
                    <td>28</td>
                    <td>29</td>
                  </tr>
                  <tr>
                    <td>30</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cq-wedding-location cq-wedding-location-mobile">
              <h1 className="cq-wedding-restaurant">Nhà Hàng Hương Phố</h1>
              <h1 className="cq-wedding-restaurant">- Sảnh 3 -</h1>
              <span className="cq-wedding-address">
                A12 Phan Văn Trị, Phường 7, <br /> Gò Vấp, TP.HCM
              </span>
              <span>
                <a
                  className="cq-link cq-wedding-map"
                  href="https://maps.app.goo.gl/Ckpbjz1ZB24Va6R4A"
                  target="_blank"
                >
                  Xem bản đồ
                </a>
              </span>
            </div>
            <WeddingButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
