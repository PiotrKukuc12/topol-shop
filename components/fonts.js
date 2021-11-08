import { Global } from '@emotion/react';

const Fonts = () => {
  return (
    <Global
      styles={`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
        `}
    />
  );
};

export default Fonts;