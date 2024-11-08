# `Button` Component Documentation

## **Description**

`Button` is a reusable React component designed to create styled buttons that adapt based on several customizable properties.

## **Parameters**

The component accepts an object with the following props:

1. **`text`** (string, required): The label displayed on the button.
2. **`width`** (string, required): Specifies the button's width. Accepts CSS-compatible values (e.g., `"100px"`, `"50%"`).
3. **`icon`** (string, optional): Specifies which icon to display on the button. Accepts one of the following values:
   - `search` for the search icon.
   - `edit` for the edit icon.
   - `whatsapp` for the WhatsApp icon.
4. **`bgColor`** (string, required): Determines the background color of the button. Accepts one of the following values (default value `white`):
   - `white`.
   - `red` changes font color to white.
5. **`action`** (function, required): A callback function triggered on the button's `onClick` event.

## **Usage Example**

Here’s how you can implement the `Button` component in your application:

```
import Button from './Button';

const handleClick = () => {
  alert("Button clicked!");
};

<Button 
  text="Editar publicación"
  icon="edit"
  width="280px" 
  bgColor="blue" 
  action={handleClick} 
/>
```