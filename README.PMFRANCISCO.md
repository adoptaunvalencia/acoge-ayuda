# React Map with Assistance Offers

This project uses React and Leaflet to display assistance offers (accommodation, hygiene, food, and pet fostering) on an interactive map. Offers are categorized and displayed with custom icons based on their type.

## FunctionProvider Context

The `FunctionProvider` manages and provides data to the app through context. It is responsible for:

- Getting the user's geolocation using the browser’s geolocation API.
- Fetching assistance offers from an external API and categorizing them.
- Providing functions to filter offers based on the city and distance from the user's location.

### Props

This provider doesn't receive any external props but provides the following values to its context:

- **`userLocation`**: The current user's location (latitude and longitude).
- **`categorizedOffers`**: Categorized offers (`all`, `accommodation`, `hygiene`, `food`, `pet_fostering`).
- **`load`**: A loading state for fetching data.
- **`filterOffers`**: A function to filter offers based on selected city and maximum distance.

To use the context in other components, import `FunctionContext`:

```javascript
import { FunctionContext } from "../../contexts/function.contexts/FunctionContext";
```

## How Filtering Works
The `filterOffers` function filters the offers based on:
- **`City`**: Shows offers only for the selected city.
- **`Distance`**: Filters offers within the specified maximum distance from the user's location.


## Map Component

The `Map` component uses the `FunctionContext` to display offers on an interactive map with category layers. The map shows markers for each offer type and allows users to filter offers by category.

### Props

- **`maxDistance`**: The maximum distance from the user's location to filter offers.
- **`selectedCity`**: The selected city to filter offers by city.

### Example Usage

```javascript
<Map maxDistance={50} selectedCity="Madrid" />
```
