# Invegintory Management System

A modern, visually stunning Inventory Management System web application with advanced UI and smooth animations.

## Features

- **Authentication**: Login, Sign Up, and Forgot Password flows
- **Dashboard**: Overview of Receipts and Deliveries with key metrics
- **Operations**:
  - Receipts management (List, Detail views with status workflow)
  - Deliveries management (List, Detail views with stock validation)
- **Stock Management**: View and edit product inventory levels and costs
- **Move History**: Track all inventory movements with visual indicators
- **Settings**: Manage Warehouses and Locations

## Tech Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Styling with glassmorphism effects
- **Vite** - Build tool
- **Lucide React** - Icons

## Design Features

- Dark theme with glassmorphism effects
- Smooth micro-interactions and animations
- Fully responsive design (desktop-first, tablet-friendly)
- High contrast accent colors (soft neon/coral)
- Rounded cards with soft shadows
- Dynamic status transitions
- Kanban and Table view modes

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Authentication

- **Login**: Use any credentials (demo mode - no validation)
- **Sign Up**: Create a new account
- **Forgot Password**: Reset password flow (use OTP: `123456` for demo)

### Dashboard

- View summary of Receipts and Deliveries
- Click on cards to navigate to respective list views

### Operations

#### Receipts
- Create new receipts
- Status workflow: Draft → Ready → Done
- Add products with quantities
- Switch between Table and Kanban views

#### Deliveries
- Create new deliveries
- Status workflow: Draft → Waiting → Ready → Done
- Stock validation with alerts for insufficient quantities
- Visual indicators for stock issues

### Stock

- View all products with costs and quantities
- Inline editing for cost, on-hand, and free quantities
- Search functionality

### Move History

- View all inventory movements
- Color-coded: Green for in-moves, Red for out-moves
- Filter by status and search by various fields

### Settings

- **Warehouses**: Add and manage warehouses
- **Locations**: Add, edit, and delete locations within warehouses

## Sample Data

The application comes with pre-loaded sample data:
- 4 Receipts (various statuses)
- 3 Deliveries (various statuses)
- 3 Stock items (Desk, Table, Chair)
- Sample move history entries
- Default warehouse and locations

## Project Structure

```
src/
├── components/       # Reusable components
│   └── AppLayout.jsx # Main app shell with navigation
├── context/          # React Context providers
│   ├── AuthContext.jsx
│   └── DataContext.jsx
├── pages/            # Page components
│   ├── auth/         # Authentication pages
│   ├── operations/    # Receipts and Deliveries
│   ├── settings/      # Settings pages
│   ├── Dashboard.jsx
│   ├── Stock.jsx
│   └── MoveHistory.jsx
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the accent colors and theme:

```js
colors: {
  accent: {
    DEFAULT: '#FF6B9D',
    dark: '#FF4D7A',
    light: '#FF8FB3'
  }
}
```

### Sample Data

Modify `src/context/DataContext.jsx` to change initial data.

## License

MIT
