'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Image } from 'antd';
import React, { ReactChild } from 'react';
import { Carousel } from 'react-responsive-carousel';

import PhotoSrc from '../data/PhotoSrc';
import { Divider } from '.';

export default function Photos() {
  const PhotoItem = ({ url, photoKey }: { url: string; photoKey: number }) => (
    <div>
      <Image
        src={`/carousel/${url}`}
        className="cq-carousel-photo"
        key={`photo-${photoKey}`}
        alt={`photo-${photoKey}`}
        preview={false}
      />
    </div>
  );
  const generatePhotoItems = () => {
    const items = [];

    for (const src of PhotoSrc) {
      items.push(
        <PhotoItem
          key={PhotoSrc.indexOf(src)}
          url={src}
          photoKey={PhotoSrc.indexOf(src)}
        />
      );
    }
    return items;
  };

  const customRenderThumb = (children: ReactChild[]) =>
    children.map((item: ReactChild) => {
      const _item = item as React.JSX.Element;
      return (
        <Image
          src={`/carousel/${_item.props.url}`}
          className="cq-carousel-photo"
          key={`photo-${_item.props.photoKey}`}
          alt={`photo-${_item.props.photoKey}`}
          preview={false}
        />
      );
    });

  return (
    <div id="photos" className="cq-section">
      <div className="section-bg"></div>
      <div className="section-wrapper">
        <h1 className="section-title">Album Ảnh</h1>
        <Divider />
        <div className="section-content--wrapper">
          <div id="cq-photos-wrapper">
            <span>
              <center>
                Vuốt sang trái/phải hoặc dùng phím mũi tên để chuyển ảnh.
              </center>
              <br />
            </span>
            <Carousel
              showIndicators={false}
              useKeyboardArrows
              interval={5000}
              emulateTouch
              showThumbs
              // autoPlay
              stopOnHover={false}
              renderThumbs={customRenderThumb}
              infiniteLoop
              className="cq-carousel"
            >
              {generatePhotoItems()}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
