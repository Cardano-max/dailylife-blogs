# Daily Life Blog

A simple blog website with admin panel for publishing articles about daily life topics.

## Features

- Public site with homepage, blog listing, and static pages
- "Hot Posts" section for featured content
- Admin panel for content management (create, edit, delete posts)
- Responsive design with Tailwind CSS
- MySQL database integration using Sequelize

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/daily-life-blog.git
cd daily-life-blog
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables file and fill in your values:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your MySQL database credentials and admin authentication:
```
DB_HOST=your-mysql-host
DB_USER=your-mysql-username
DB_PASS=your-mysql-password
DB_NAME=your-database-name
ADMIN_USER=your-admin-username
ADMIN_PASS=your-admin-password
PORT=3000
```

5. Start the development server:
```bash
npm run dev
```

6. Visit the following URLs in your browser:
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## Production Deployment

For production deployment:

```bash
npm start
```

## Project Structure

```
daily-life-blog/
├── models/           # Database models
├── public/           # Static assets
├── routes/           # Route handlers
├── views/            # EJS templates
├── middlewares/      # Express middlewares
├── server.js         # Main application file
└── ...
```