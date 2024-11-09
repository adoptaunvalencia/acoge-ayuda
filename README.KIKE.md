# Button Component Documentation

The `Button` component is a customizable and reusable button component designed for React applications. It supports text, an optional icon, custom colors, and an action callback when clicked. This component is styled with `global.css` for consistent visual presentation.

## Props

- **`text`** (string, optional): Text displayed on the button. If omitted, the button can render only the icon or be blank.
- **`icon`** (ReactNode, optional): An SVG or other icon to display within the button. This should be passed as a React element. If no icon is provided, only the text or an empty button will be displayed.

- **`bgColor`** (string, optional): Background color of the button, provided as a CSS color value. Defaults to `var(--bg-color)`.

- **`textColor`** (string, optional): Text color for the button label, provided as a CSS color value. Defaults to `var(--text-color)`.
- **`DEFAULT`**: (bgColor and textColor):

```javascript
backgroundColor: bgColor ? bgColor : 'var(--bg-lighter-gray)'
color: textColor ? textColor : 'var(--text-primary)'
```

- **`action`** (function, optional): Callback function to be executed on button click. By default, it is an empty function. Use this prop to specify actions like API calls or event handlers.

- **`disabled`** (boolean, optional): If `true`, the button will be disabled, and `onClick` events will not trigger. By default, it is set to `false`.

## Example Usage

Here's an example of how to use the `Button` component in a React application, including a custom `getOffers` function as the click action.

### 1. Define the `getOffers` function

```javascript

const getOffers = () => {
  alert("Offers...");
};

<Button
  text='Get Offers'
  icon={myIcon}
  bgColor='#FF5733'
  textColor='white'
  action={getOffers}
/>
```
