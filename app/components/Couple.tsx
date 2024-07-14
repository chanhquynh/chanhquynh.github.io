import { Divider } from '.';

export default function Couple() {
  return (
    <div id="couple" className="cq-section">
      <div className="section-bg"></div>
      <h1 className="section-title">Cô Dâu & Chú Rể</h1>
      <Divider />
      <div className="section-wrapper">
        <div className="section-content-bg"></div>
        <div id="bride" className="section-content--wrapper">
          <div className="section-content">
            <div className="couple-avatar"></div>
          </div>
          <div className="couple-content">
            <div className="couple-flexing">
              <h2 className="couple-title">Cô dâu</h2>
              <h1 className="couple-name">Phạm Hồng Quỳnh Anh</h1>
              <p className="couple-description">
                Quỳnh Anh sinh năm 1993, gốc Hà Nội. QA thích chụp ảnh các nụ
                cười, xem phim tài liệu, mê khám phá các sinh vật “tí hon” chỉ
                có thể soi thấy nhờ kính hiển vi. QA đang trên hành trình thực
                hiện ước mơ trở thành một nhà khoa học nghiên cứu về các bệnh
                truyền nhiễm để phát triển vaccine bảo vệ sức khoẻ con người.
              </p>
            </div>
          </div>
        </div>

        <div id="groom" className="section-content--wrapper">
          <div className="section-content">
            <div className="couple-avatar"></div>
          </div>
          <div className="couple-content">
            <div className="couple-flexing">
              <h2 className="couple-title">Chú rể</h2>
              <h1 className="couple-name">Trần Minh Chánh</h1>
              <p className="couple-description">
                Chàng trai Sài Gòn sinh năm 1996. Chánh thích chụp ảnh, thích
                Doraemon, là fan cứng của Arsenal. Chánh đam mê du lịch bằng
                phương tiện công cộng, thích trải nghiệm các loại hình phương
                tiện công cộng đặc trưng ở từng địa phương. Chánh đang là nghiên
                cứu sinh sau tiến sĩ, chuyên ngành công nghệ thông tin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
