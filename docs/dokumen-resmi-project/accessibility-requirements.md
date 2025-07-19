# Accessibility Requirements - Phase 1

**Version:** 1.0  
**Date:** July 18, 2025  
**Author:** Farid-Ze (Tech Team)  
**Status:** Final Draft

## 1. Introduction

This document outlines the accessibility requirements for Phase 1 of the Merajut ASA platform. It provides technical specifications, implementation guidelines, and testing criteria to ensure we meet our target of >95% WCAG 2.1 AA compliance. These requirements apply to all components and pages developed in Phase 1.

## 2. Accessibility Standards

### 2.1 Compliance Level

All components and pages must conform to:
- [WCAG 2.1 Level AA](https://www.w3.org/TR/WCAG21/)
- [Indonesian Accessibility Standards (SNI ISO/IEC 40500:2016)](https://bsn.go.id/)

### 2.2 Core Success Criteria Focus Areas

While all WCAG 2.1 AA criteria apply, these areas require particular focus during implementation:

| Category | Success Criteria | Priority |
|----------|-----------------|----------|
| Perceivable | 1.1.1 Non-text Content | High |
| Perceivable | 1.3.1 Info and Relationships | High |
| Perceivable | 1.4.3 Contrast (Minimum) | High |
| Perceivable | 1.4.4 Resize Text | High |
| Operable | 2.1.1 Keyboard | High |
| Operable | 2.4.3 Focus Order | High |
| Operable | 2.4.7 Focus Visible | High |
| Understandable | 3.3.1 Error Identification | High |
| Robust | 4.1.1 Parsing | High |
| Robust | 4.1.2 Name, Role, Value | High |

## 3. Technical Implementation Requirements

### 3.1 Semantic HTML

#### 3.1.1 HTML Structure Requirements

- Use appropriate HTML5 semantic elements (`<nav>`, `<main>`, `<section>`, `<article>`, etc.)
- Implement proper heading hierarchy (`<h1>` through `<h6>`)
- Use landmark regions for page structure

```tsx name=PageStructure.tsx
// Example of correct semantic structure
const PageStructure: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <nav aria-label="Main Navigation">
          {/* Navigation content */}
        </nav>
      </header>
      <main id="main-content">
        {/* Main content goes here */}
        {children}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </>
  );
};
```

#### 3.1.2 Content Structure

- Use lists (`<ul>`, `<ol>`) for groups of related items
- Use description lists (`<dl>`, `<dt>`, `<dd>`) for key-value pairs
- Use tables (`<table>`) only for tabular data with proper headers (`<th>`)

```tsx name=AccessibleTable.tsx
// Example of accessible table implementation
const AccessibleTable: React.FC<{ data: Campaign[] }> = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <caption>Recent Campaigns</caption>
        <thead>
          <tr>
            <th scope="col">Campaign Name</th>
            <th scope="col">Goal</th>
            <th scope="col">Progress</th>
            <th scope="col">Days Left</th>
          </tr>
        </thead>
        <tbody>
          {data.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.name}</td>
              <td>{formatCurrency(campaign.goal)}</td>
              <td>{formatPercentage(campaign.progress)}</td>
              <td>{campaign.daysLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### 3.2 Forms and Inputs

#### 3.2.1 Form Requirements

- Associate labels with form controls using `for`/`id` attributes
- Group related form elements with `<fieldset>` and `<legend>`
- Provide clear error messages with `aria-describedby`
- Use `required` attribute and `aria-required="true"` for required fields
- Implement form validation with appropriate ARIA attributes

```tsx name=AccessibleFormField.tsx
// Example of accessible form field implementation
interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  required = false,
  error,
  helperText,
  value,
  onChange,
}) => {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;
  
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
      />
      {helperText && <div id={helperId} className="helper-text">{helperText}</div>}
      {error && <div id={errorId} className="error-message" role="alert">{error}</div>}
    </div>
  );
};
```

#### 3.2.2 Custom Form Elements

- Custom select dropdowns must be keyboard accessible and screen reader compatible
- Custom checkboxes/radio buttons must maintain keyboard focus and screen reader announcements
- Use `role`, `aria-checked`, and other appropriate ARIA attributes for custom controls

```tsx name=CustomCheckbox.tsx
// Example of accessible custom checkbox
const CustomCheckbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ id, label, checked, onChange }) => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="visually-hidden" // CSS that hides visually but keeps it accessible
      />
      <label htmlFor={id} className="checkbox-label">
        <span 
          className={`checkbox-indicator ${checked ? 'checked' : ''}`}
          aria-hidden="true"
        >
          {checked && <CheckIcon />}
        </span>
        {label}
      </label>
    </div>
  );
};
```

### 3.3 Focus Management

#### 3.3.1 Focus Requirements

- All interactive elements must be focusable and have visible focus indicators
- Focus order must follow logical page flow
- Implement focus trapping for modals and dialogs
- Restore focus when dialogs close or dynamic content changes
- Skip links must be provided for navigation to main content

```tsx name=FocusTrap.tsx
// Focus trap utility for modals
import { useEffect, useRef } from 'react';

const FocusTrap: React.FC<{ isActive: boolean; children: React.ReactNode }> = ({ 
  isActive, 
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isActive && containerRef.current) {
      // Store the previously focused element
      previousFocus.current = document.activeElement as HTMLElement;
      
      // Get all focusable elements in the container
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        // Focus the first element
        (focusableElements[0] as HTMLElement).focus();
      }
    }
    
    return () => {
      // Restore focus when component unmounts or trap is deactivated
      if (isActive && previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [isActive]);
  
  // Handle tab key to trap focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isActive || !containerRef.current) return;
    
    if (e.key === 'Tab') {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  return (
    <div ref={containerRef} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};
```

#### 3.3.2 Skip Link Implementation

```tsx name=SkipLink.tsx
// Skip link implementation
const SkipLink: React.FC = () => {
  return (
    <a 
      href="#main-content"
      className="skip-link"
      // Skip link is visually hidden until focused
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        padding: '8px 16px',
        background: '#1A6BCC',
        color: 'white',
        zIndex: 100,
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s',
        ':focus': {
          transform: 'translateY(0)',
        }
      }}
    >
      Skip to main content
    </a>
  );
};
```

### 3.4 ARIA Implementation

#### 3.4.1 ARIA Landmark Roles

- Implement appropriate ARIA landmark roles when HTML5 semantic elements aren't applicable
- Use `aria-label` or `aria-labelledby` to provide accessible names for landmarks
- Avoid duplicate landmark roles without distinctions

```tsx name=AriaLandmarks.tsx
// Example of ARIA landmark implementation
const PageWithARIA: React.FC = () => {
  return (
    <div>
      <div role="banner">
        <div role="navigation" aria-label="Main">
          {/* Navigation content */}
        </div>
        <div role="search">
          {/* Search functionality */}
        </div>
      </div>
      
      <div role="main" id="main-content">
        {/* Main content */}
      </div>
      
      <div role="complementary" aria-label="Campaign Information">
        {/* Sidebar content */}
      </div>
      
      <div role="contentinfo">
        {/* Footer content */}
      </div>
    </div>
  );
};
```

#### 3.4.2 ARIA for Interactive Components

- Use appropriate ARIA roles, states, and properties for custom interactive components
- Implement `aria-expanded`, `aria-controls`, `aria-haspopup` for disclosure widgets
- Use `aria-pressed`, `aria-selected` for toggle states
- Implement `aria-live` regions for dynamic content updates

```tsx name=AriaDisclosure.tsx
// Example of ARIA for an accordion component
const AccordionItem: React.FC<{
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ id, title, isExpanded, onToggle, children }) => {
  const headingId = `${id}-heading`;
  const contentId = `${id}-content`;
  
  return (
    <div className="accordion-item">
      <h3>
        <button
          id={headingId}
          className="accordion-button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={contentId}
        >
          {title}
          <span className="accordion-icon" aria-hidden="true">
            {isExpanded ? '-' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className={`accordion-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
};
```

#### 3.4.3 Live Regions

```tsx name=LiveRegion.tsx
// Example of ARIA live region for notifications
const NotificationArea: React.FC<{
  notifications: string[];
  level?: 'polite' | 'assertive';
}> = ({ notifications, level = 'polite' }) => {
  return (
    <div 
      className="notification-area" 
      aria-live={level}
      aria-atomic="true"
    >
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
};
```

### 3.5 Images and Media

#### 3.5.1 Image Accessibility

- All images must have appropriate alt text
- Decorative images must use `alt=""` or `role="presentation"`
- Complex images must have extended descriptions when needed
- SVG elements must include appropriate accessibility attributes

```tsx name=AccessibleImage.tsx
// Examples of accessible images
const ContentImage: React.FC<{
  src: string;
  alt: string;
  isDecorative?: boolean;
}> = ({ src, alt, isDecorative = false }) => {
  return isDecorative ? (
    <img src={src} alt="" role="presentation" />
  ) : (
    <img src={src} alt={alt} />
  );
};

// Accessible SVG
const IconButton: React.FC<{
  icon: string;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => {
  return (
    <button onClick={onClick} aria-label={label}>
      <svg 
        aria-hidden="true" 
        focusable="false"
        width="24" 
        height="24"
      >
        <use xlinkHref={`#${icon}`}></use>
      </svg>
    </button>
  );
};
```

#### 3.5.2 Video and Audio Accessibility

- All videos must have captions
- Provide audio descriptions for important visual information
- Provide transcripts for audio content
- Media players must be keyboard accessible with proper ARIA labels

```tsx name=AccessibleVideo.tsx
// Example of accessible video player
const AccessibleVideo: React.FC<{
  videoSrc: string;
  posterSrc: string;
  captionsSrc: string;
  title: string;
  transcriptText: string;
}> = ({ videoSrc, posterSrc, captionsSrc, title, transcriptText }) => {
  const [showTranscript, setShowTranscript] = useState(false);
  
  return (
    <div className="video-container">
      <h2 id="video-title">{title}</h2>
      <video
        controls
        poster={posterSrc}
        aria-labelledby="video-title"
        width="100%"
      >
        <source src={videoSrc} type="video/mp4" />
        <track 
          kind="captions" 
          src={captionsSrc} 
          label="English captions" 
          srcLang="en" 
          default 
        />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-controls">
        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          aria-expanded={showTranscript}
          aria-controls="video-transcript"
        >
          {showTranscript ? 'Hide' : 'Show'} Transcript
        </button>
      </div>
      
      {showTranscript && (
        <div id="video-transcript" className="transcript">
          {transcriptText}
        </div>
      )}
    </div>
  );
};
```

### 3.6 Color and Contrast

#### 3.6.1 Contrast Requirements

- Text must have a contrast ratio of at least 4.5:1 against its background
- Large text (18pt or 14pt bold and larger) must have a contrast ratio of at least 3:1
- UI components and graphical objects must have a contrast ratio of at least 3:1 against adjacent colors

```tsx name=ContrastUtils.ts
// Utility function to check contrast ratios
export function getLuminance(color: string): number {
  // Remove # if present
  color = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  // Calculate luminance
  const rLum = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLum = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLum = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
}

export function getContrastRatio(foreground: string, background: string): number {
  const fgLum = getLuminance(foreground);
  const bgLum = getLuminance(background);
  
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsContrastRequirements(
  foreground: string, 
  background: string, 
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}
```

#### 3.6.2 Color Independence

- Information must never be conveyed by color alone
- Use additional indicators (icons, patterns, text) alongside color
- Ensure form validation errors use more than just color to indicate issues

```tsx name=ColorIndependentStatus.tsx
// Example of color-independent status indicator
const StatusIndicator: React.FC<{
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
}> = ({ status, message }) => {
  // Map status to both color and icon
  const statusConfig = {
    success: { color: 'green', icon: '✓', label: 'Success' },
    warning: { color: 'orange', icon: '⚠', label: 'Warning' },
    error: { color: 'red', icon: '✕', label: 'Error' },
    info: { color: 'blue', icon: 'ℹ', label: 'Information' }
  };
  
  const config = statusConfig[status];
  
  return (
    <div 
      className={`status-indicator ${status}`}
      style={{ color: config.color }}
    >
      <span className="status-icon" aria-hidden="true">
        {config.icon}
      </span>
      <span className="visually-hidden">{config.label}:</span>
      <span className="status-message">{message}</span>
    </div>
  );
};
```

### 3.7 Responsive and Mobile Accessibility

#### 3.7.1 Responsive Design Requirements

- Content must be accessible at 320px width minimum
- Text must remain readable when zoomed to 200%
- No horizontal scrolling at 320px when zoomed to 200%
- Touch targets must be at least 44x44px for mobile devices

```tsx name=ResponsiveContainer.tsx
// Example of accessible responsive container
const ResponsiveContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div 
      className="responsive-container"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
      }}
    >
      {children}
    </div>
  );
};
```

#### 3.7.2 Touch Interaction

```tsx name=TouchTarget.tsx
// Example of properly sized touch target
const TouchButton: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: '44px',
        minHeight: '44px',
        padding: '12px 16px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {label}
    </button>
  );
};
```

### 3.8 Motion and Animation

#### 3.8.1 Reduced Motion

- Honor the `prefers-reduced-motion` media query
- Provide non-animated alternatives for essential animations
- Avoid animations that could trigger vestibular disorders

```tsx name=ReducedMotion.tsx
// Example of respecting reduced motion preferences
import { useEffect, useState } from 'react';

const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersReducedMotion;
};

const AnimatedComponent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const animationStyle = prefersReducedMotion 
    ? { opacity: 1 } // No animation
    : { 
        opacity: 1, 
        transition: 'opacity 0.3s ease-in-out',
        animation: 'fadeIn 0.3s ease-in-out',
      };
  
  return (
    <div style={animationStyle}>
      {/* Component content */}
    </div>
  );
};
```

#### 3.8.2 Animation Controls

- Provide pause/stop controls for animations that last more than 5 seconds
- Ensure animations don't block user interaction
- Animations must not flash more than 3 times per second

```tsx name=ControlledAnimation.tsx
// Example of animation with user controls
const ControlledAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  
  return (
    <div className="controlled-animation">
      <div 
        className={`animated-content ${isPlaying ? 'playing' : 'paused'}`}
        aria-live="polite"
      >
        {/* Animated content */}
      </div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        aria-pressed={!isPlaying}
      >
        {isPlaying ? 'Pause' : 'Play'} Animation
      </button>
    </div>
  );
};
```

## 4. Testing and Validation

### 4.1 Automated Testing

#### 4.1.1 Required Testing Tools

- **Jest with axe-core**: Unit testing for component accessibility
- **Cypress with axe**: End-to-end accessibility testing
- **Storybook with a11y addon**: Component-level accessibility testing
- **Lighthouse**: Automated accessibility audits in CI/CD

```tsx name=AccessibilityTest.test.tsx
// Example of Jest accessibility test with axe-core
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../components/Button';

expect.extend(toHaveNoViolations);

describe('Button component accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Button onClick={() => {}} variant="primary">
        Click Me
      </Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('should have appropriate ARIA attributes when disabled', async () => {
    const { container } = render(
      <Button onClick={() => {}} variant="primary" disabled>
        Disabled Button
      </Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### 4.1.2 CI/CD Integration

- Automated accessibility tests must run on every pull request
- Pull requests with accessibility violations must be blocked from merging
- Accessibility reports must be generated and stored for each build

```yaml name=a11y-workflow.yml
# GitHub Actions workflow for accessibility testing
name: Accessibility Tests

on:
  pull_request:
    branches: [main, develop]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Jest accessibility tests
        run: npm run test:a11y
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Run Storybook accessibility tests
        run: npm run test:storybook:a11y
      
      - name: Build application
        run: npm run build
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/campaign
            http://localhost:3000/donate
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### 4.2 Manual Testing

#### 4.2.1 Screen Reader Testing

- All components must be tested with at least two screen readers:
  - NVDA on Windows
  - VoiceOver on macOS/iOS
- Critical user journeys must be completely navigable via screen reader

#### 4.2.2 Keyboard Testing

- All interactive elements must be operable using keyboard only
- Tab order must be logical and follow visual layout
- Focus must be visible at all times
- No keyboard traps may exist

#### 4.2.3 Manual Testing Checklist

```markdown name=a11y-checklist.md
# Accessibility Manual Testing Checklist

## General
- [ ] All page functionality is available using the keyboard only
- [ ] Visual focus indicator is clearly visible
- [ ] Focus moves in a logical order through the page
- [ ] Skip links are available and work correctly
- [ ] Page has a logical heading structure

## Forms
- [ ] All form controls have associated labels
- [ ] Error messages are associated with form fields
- [ ] Required fields are clearly indicated
- [ ] Form can be submitted using keyboard only

## Images and Media
- [ ] All images have appropriate alt text
- [ ] Decorative images have empty alt text
- [ ] Videos have captions
- [ ] Audio has transcripts

## Structure
- [ ] Proper landmark regions are used
- [ ] Lists are marked up correctly
- [ ] Tables have headers and appropriate markup

## Interactions
- [ ] Custom controls have appropriate ARIA roles and states
- [ ] Expandable sections properly indicate state
- [ ] Modal dialogs trap focus correctly
- [ ] Dynamic content changes are announced to screen readers

## Visual
- [ ] Text meets contrast requirements
- [ ] Interface elements meet contrast requirements
- [ ] Content is readable when zoomed to 200%
- [ ] Page is usable at 320px width
```

### 4.3 User Testing

- Conduct testing with users who rely on assistive technology
- Include users with diverse disabilities in usability testing
- Document and address feedback from accessibility-focused user testing

## 5. Tooling and Resources

### 5.1 Development Tools

- **ESLint with jsx-a11y**: Static analysis for accessibility issues
- **axe DevTools**: Browser extension for testing during development
- **Contrast checkers**: Tools to verify color contrast compliance
- **Screen readers**: NVDA, VoiceOver, JAWS for testing

### 5.2 Component Library Tools

```tsx name=a11y-utilities.ts
// Accessibility utility functions for development
export const a11yUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // Check if reduced motion is preferred
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Create properly hidden content for screen readers only
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
  
  // Ensure element is not hidden from screen readers
  notSrOnly: {
    position: 'static',
    width: 'auto',
    height: 'auto',
    padding: '0',
    margin: '0',
    overflow: 'visible',
    clip: 'auto',
    whiteSpace: 'normal',
  }
};
```

## 6. Component-Specific Requirements

### 6.1 Navigation Components

- **MainNavigation**: Must implement ARIA for current page, expandable menus
- **Pagination**: Must include proper ARIA labeling and current page indication
- **Breadcrumbs**: Must use appropriate ARIA and structured list markup

### 6.2 Interactive Components

- **Modal**: Must trap focus, handle ESC key, and announce to screen readers
- **Accordion**: Must use proper ARIA expanded state and keyboard controls
- **Tabs**: Must follow ARIA tab pattern with proper keyboard navigation
- **Dropdown**: Must support keyboard navigation and proper ARIA attributes

### 6.3 Form Components

- **FormField**: Must associate labels, support validation, and communicate errors
- **Select**: Must support keyboard navigation and screen reader announcements
- **DatePicker**: Must allow keyboard date entry and navigate calendar with keyboard
- **FileUpload**: Must provide accessible feedback and error handling

### 6.4 Content Components

- **Card**: Must have proper heading structure and focus management for interactive elements
- **Carousel**: Must have controls, pause ability, and keyboard navigation
- **Tooltip**: Must be accessible via keyboard and not rely solely on hover
- **ProgressBar**: Must communicate progress visually and to screen readers

## 7. Phase 1 Implementation Checklist

### 7.1 Priority 1 (Must Have)

- [ ] Semantic HTML structure for all pages
- [ ] Keyboard accessibility for all interactive elements
- [ ] Proper focus management and visible focus styles
- [ ] Form accessibility including labels and error handling
- [ ] Image alt text and media alternatives
- [ ] Color contrast compliance
- [ ] Screen reader compatibility for critical user journeys
- [ ] Responsive design for 320px width

### 7.2 Priority 2 (Should Have)

- [ ] Skip links
- [ ] ARIA landmark roles
- [ ] Enhanced form validation feedback
- [ ] Reduced motion alternatives
- [ ] Comprehensive error handling
- [ ] Enhanced keyboard shortcuts

### 7.3 Priority 3 (Nice to Have)

- [ ] High contrast theme
- [ ] Font size controls
- [ ] Animation control preferences
- [ ] Advanced screen reader announcements
- [ ] Accessibility statement page

## 8. Governance and Monitoring

### 8.1 Accessibility Reviews

- Code reviews must include accessibility criteria
- New components require accessibility review before approval
- Regular accessibility audits scheduled (bi-weekly)

### 8.2 Reporting and Monitoring

- Accessibility issues tracked in dedicated JIRA project
- Monthly accessibility compliance reports
- User feedback mechanism for accessibility issues

## 9. Resources and References

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components Patterns](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [React Accessibility Documentation](https://reactjs.org/docs/accessibility.html)

## 10. Conclusion

These accessibility requirements establish the foundation for creating an inclusive platform that meets our target of >95% WCAG 2.1 AA compliance. By implementing these technical specifications during Phase 1, we ensure that accessibility is built into the core of our platform rather than added as an afterthought.

This document should be used in conjunction with our design system and technical architecture blueprint to guide implementation decisions. As we progress through Phase 1, this document will be updated to address any additional requirements or challenges identified during development.