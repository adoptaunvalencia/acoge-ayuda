# Input

The `Input` component is a customizable and reusable input. You can use this component for text, number or password type inputs.

## Props

- **`type`** (string, required): Input type, accepted types for this component are text, number and password (email type has to be text).
- **`label`** (string, optional): Label text of the input.
- **`name`** (string, optional): Name attribute of the input.
- **`id`** (string, optional): ID attribute of the input.
- **`tooltip`** (string, optional): Tooltip text displayed under the input, usually information or explanation about the input.
- **`required`** (boolean, optional): Mark the input as required, by default it set to false. In order to detect if an input is required just seach for class .input-required in validation.
- **`className`** (string, optional): Input additional classes.
- **`onChange`** (function, optional): Callback fuction to be executed when input value changes.

## Example Usage

```javascript
import Input from 'components/input/Input'

const handleChangeInput = (value) => {
  console.log(value)
}

<Input 
  type="text"
  label="Nombre"
  name="name"
  id="name"
  tooltip="Ingrese su nombre"
  onChange={handleChangeInput}
/>
```

# Select

The `Select` component is a customizable and reusable select input. In this component the value information is inside a hidden input text and also you can capture the option selected with a function

## Props

- **`label`** (string, optional): Label text of the input.
- **`name`** (string, optional): Name attribute of the input.
- **`id`** (string, optional): ID attribute of the input.
- **`tooltip`** (string, optional): Tooltip text displayed under the input, usually information or explanation about the input.
- **`defaultOption`** (boolean, optional): If `true` the select options will have a default option with the same name as the label for the user to reset the value. By  default it set to `false`.
- **`required`** (boolean, optional): If `true` the component will be flagged as required, by default it set to `false`. In order to detect if an input is required just search for class .input-required in validation.
- **`options`** (array/object, required): Select options, this prop can be an `object {key: value}`, in this case, key will be the value of the input and the value returned by the callback function and value will be the text displayed when an option is selected or `array` where the input value, value returned by the callback function and the text displayed when an option is selected are the same
- **`className`** (string, optional): Input additional classes.
- **`onChange`** (function, optional): Callback fuction to be executed when input value changes. The value returned by this function will always be the key value (when options is and object) or just the value (when options is an array)

## Example Usage

### Options as an array

### Options as an object

```javascript
import Select from 'components/select/Select'

const selectOptionsObject = {
  'option1': 'Option1',
  'option2': 'Option2',
  'option3': 'Option3',
  'option4': 'Option4',
  'option5': 'Option5',
}

const handleChangeSelect = (value) => {
  console.log(value)
}

<Select 
  label="Nombre"
  name="name"
  id="name"
  tooltip="Ingrese su nombre"
  defaultOption={true}
  options={selectOptionsObject}
  onChange={handleChangeSelect}
/>
```

### Options as an Array

```javascript
import Select from 'components/select/Select'

const selectOptionsArray = [
  'Option1',
  'Option2',
  'Option3',
  'Option4',
  'Option5',
]

const handleChangeSelect = (value) => {
  console.log(value)
}

<Select 
  label="Nombre"
  name="name"
  id="name"
  tooltip="Ingrese su nombre"
  defaultOption={true}
  options={selectOptionsArray}
  onChange={handleChangeSelect}
/>
```

# Checkbox

The `Checkbox` component is a customizable and reusable checkbox.

## Props

- **`label`** (string, optional): Label text next to the checkbox.
- **`name`** (string, optional): Name attribute of the checkbox input.
- **`id`** (string, optional): ID attribute of the checkbox input.
- **`required`** (boolean, optional): Mark the checkbox input as required, by default it set to false. In order to detect if an input is required just seach for class .input-required in validation.
- **`className`** (string, optional): Input additional classes.
- **`onChange`** (function, optional): Callback fuction to be executed when user check or uncheck input.

## Example Usage

```javascript
import Checkbox from 'components/checkbox/Checkbox'

const handleChangeCheckbox = (value) => {
  console.log(value)
}

<Checkbox
  label="Checkbox label" 
  name="name"
  id="name"
  onChange={handleChangeCheckbox}
/>
```

# Textarea

The `Textarea` component is a customizable and reusable textarea.

## Props

- **`label`** (string, optional): Label text of the textarea.
- **`name`** (string, optional): Name attribute of the textarea.
- **`id`** (string, optional): ID attribute of the textarea.
- **`tooltip`** (string, optional): Tooltip text displayed under the textarea, usually information or explanation about it.
- **`maxLength`** (number, optional): Max number of characters allowed.
- **`rows`** (number, optional): Number of initial rows. 
- **`required`** (boolean, optional): Mark the input as required, by default it set to false. In order to detect if an input is required just seach for class .input-required in validation.
- **`className`** (string, optional): Input additional classes.
- **`onChange`** (function, optional): Callback fuction to be executed when textarea value changes.

## Example Usage

```javascript
import Textarea from 'components/textarea/Textarea'

const handleChangeTextarea = (value) => {
  console.log(value)
}

<Textarea 
  label="Nombre"
  name="name"
  id="name"
  rows={2}
  maxLength={50}
  tooltip="Ingrese su nombre"
  onChange={handleChangeTextarea}
/>
```