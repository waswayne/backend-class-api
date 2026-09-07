# Backend Class

A small Express and TypeScript API used for live coding.

## Run locally

```bash
npm install
npm run dev
```

The server runs at `http://localhost:4000`.

## Endpoints

- `GET /` - Check that the server is running
- `GET /students` - Get all students
- `GET /students/:id` - Get one student
- `POST /students` - Add a student
- `PUT /students/:id` - Update a student

Student data is stored in memory, so it resets whenever the server restarts.
