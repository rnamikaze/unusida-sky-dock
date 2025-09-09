import React, { useState } from "react";
import { Box, Text, Image, Spinner } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const zoomAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const ImageLoader = ({
    width,
    height,
    imageUrl,
    bg = "gray.100",
    animationSpeed = "15s",
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Box
            width={width}
            height={height}
            position="relative"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={bg}
        >
            {!isLoaded && (
                <Text position="absolute">
                    <Spinner thickness="3px" />
                </Text>
            )}

            <Box
                width="100%"
                height="100%"
                animation={`${zoomAnimation} ${animationSpeed} ease-in-out infinite`}
                display={isLoaded ? "block" : "none"}
            >
                <Image
                    src={imageUrl}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    objectPosition="center"
                    onLoad={() => setIsLoaded(true)}
                    alt="Zooming image"
                />
            </Box>
        </Box>
    );
};

export default ImageLoader;
