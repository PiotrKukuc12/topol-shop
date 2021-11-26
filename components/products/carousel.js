import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { Box } from '@chakra-ui/layout';

const height = {base:'370px',md:"540px", lg:"640px"}
const width = {base:'380px',md:"540px", lg:"640px"}

const ImageCarousel = ({ images }) => {
  function renderThumbs(children) {
    return children.map((item, index) => {
      return (
        <Image
          //   className={classes.image}
          objectFit='cover'
          src={item.props.children.props.src}
          width={70}
          height={70}
          key={item.props.children.key}
        />
      );
    });
  }

  return (
    <Box w={width} h={height} mb={{base:'100px', md:'100px', lg:'120px'}}>
      <Carousel
        showArrows={true}
        renderThumbs={renderThumbs}
      >
        <Box w={width} h={height}>
          <Image src={images.image1} layout='fill' />
        </Box>
        <Box w={width} h={height}>
          <Image src={images.image2} layout='fill' />
        </Box>
        <Box w={width} h={height}>
          <Image src={images.image3} layout='fill' />
        </Box>
        <Box w={width} h={height}>
          <Image src={images.image4} layout='fill' />
        </Box>

      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
