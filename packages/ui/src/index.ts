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

// IMPORTANT: Chakra UI components and types are no longer re-exported
// Import them directly from @chakra-ui/react in your application

