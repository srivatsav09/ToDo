import React from 'react';
import { Card, Image } from '@nextui-org/react';
import { css } from '@emotion/react';

const TransparentCard = () => {
  return (
    <div css={cardStyles}>
      <Image src="/calm.avif" alt="Background Image" />
      <Card css={cardContentStyles}>
        {/* <Card.Header>Transparent Card</Card.Header> */}
        {/* <Card.Body>
          <p>This is a transparent card positioned over the background image.</p>
        </Card.Body> */}
      </Card>
    </div>
  );
};

const cardStyles = css`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const cardContentStyles = css`
  position: absolute;
  zIndex:1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 20px;
  width: 500px;
`;

export default TransparentCard;