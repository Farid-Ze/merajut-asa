// Theme
export { default as theme } from './theme';

// Providers
export { UIProvider, type UIProviderProps } from './components/UIProvider';

// Components
export { Button, type ButtonProps } from './components/Button';
export {
    Card,
    CardContent, CardFooter, CardHeader, type CardProps
} from './components/Card';
export { Heading, type HeadingProps } from './components/Heading';
export { Input, type InputProps } from './components/Input';

// Re-export commonly used Chakra UI components
export {
    Alert, AlertDescription, AlertIcon,
    AlertTitle, Badge, Box, Center, ChakraProvider, Circle, Container, Divider, Flex,
    Grid, HStack, Icon,
    IconButton, Image,
    Link, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Spacer, Spinner, Square, Stack, Text, Toast, useDisclosure, useToast, VStack
} from '@chakra-ui/react';

// Re-export Chakra UI types
export type {
    AlertProps, BadgeProps, BoxProps, ContainerProps, FlexProps,
    GridProps, IconButtonProps, IconProps, ImageProps,
    LinkProps, StackProps,
    TextProps
} from '@chakra-ui/react';

