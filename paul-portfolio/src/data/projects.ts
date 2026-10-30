import type { Project } from '../types/project.ts'

/**
 * ───────────────────────────────────────────────────────────────
 *  CENTRAL PROJECT DATA
 * ───────────────────────────────────────────────────────────────
 *  This is the only place project content lives. The gallery, filters,
 *  home-page previews, case-study pages, previous/next links and the
 *  sitemap are all generated from this array.
 *
 *  To add a project: append one object to this array (see README, "Adding a project").
 *  Display order = array order.
 *
 *  HONESTY RULES (keep these true as the projects grow):
 *   - status: only use "live" when visitors can actually use it.
 *   - features[].state: only use "done" for features that really work.
 *   - liveUrl / githubUrl: leave them out until the real URL exists.
 *   - technologies on planned projects are the intended stack.
 * ───────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: 'devflow',
    slug: 'devflow',
    title: 'DevFlow',
    tagline: 'Team project and issue management platform',
    shortDescription:
      'A workspace where teams organise projects, track issues, assign work and follow progress, with role-based access and real-time updates.',
    longDescription:
      'DevFlow is a team collaboration platform inspired by the workflows of modern project management tools. It is my most ambitious portfolio project: it is meant to show how I design an application end to end, from the database schema and access control to real-time features and delivery.',
    category: 'full-stack',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Socket.IO', 'JWT', 'GitHub Actions'],
    role: 'Solo build: product planning, interface design, frontend, API, database design and delivery pipeline.',
    status: 'in-development',
    mockup: 'kanban',
    featured: true,
    features: [
      { title: 'Organisations and teams', description: 'Users belong to organisations with their own members.', state: 'planned' },
      { title: 'Projects and boards', description: 'Kanban-style boards for each project.', state: 'planned' },
      { title: 'Issues and task management', description: 'Status, priority, assignee and due date on every issue.', state: 'planned' },
      { title: 'Comments and collaboration', state: 'planned' },
      { title: 'Notifications', state: 'planned' },
      { title: 'Project analytics', description: 'Simple progress and workload views.', state: 'planned' },
      { title: 'Authentication and authorisation', description: 'Token-based sign-in with role-based permissions.', state: 'planned' },
      { title: 'Real-time updates', description: 'Board and issue changes appear for teammates without a refresh.', state: 'planned' },
      { title: 'Database persistence', state: 'planned' },
    ],
    caseStudy: {
      overview:
        'DevFlow lets a team keep its work in one place: create a project, break it into issues, assign them, discuss them and watch progress move across a board. The project is under active development, so this page describes the intended design. Features are marked as planned until they exist.',
      problem:
        'Small teams often track work across chat threads, spreadsheets and memory. Things get lost, nobody is sure who owns what, and status updates take meetings. A shared board with clear ownership and live updates removes most of that friction.',
      goals: [
        'Let a user create an organisation, invite members and manage projects inside it.',
        'Give every issue a clear owner, status and priority.',
        'Keep boards in sync between teammates in real time.',
        'Make sure people can only see and change what their role allows.',
        'Ship it like a real product: automated tests, a CI pipeline and a documented deployment.',
      ],
      designDecisions: [
        {
          title: 'A separate API instead of server-rendered pages',
          body: 'The React frontend talks to a FastAPI backend over a documented REST API. This keeps the interface and the business rules independent, so either side can change without breaking the other.',
        },
        {
          title: 'Permissions enforced on the server',
          body: 'The interface hides actions a user is not allowed to take, but the API is what actually refuses them. Hiding a button is a courtesy; checking on the server is the security.',
        },
        {
          title: 'PostgreSQL for relational data',
          body: 'Organisations, members, projects, issues and comments are naturally related. A relational database gives foreign keys, transactions and clear queries for those relationships.',
        },
      ],
      architecture: {
        summary:
          'A single-page React app calls a FastAPI service for data and listens to a Socket.IO connection for live changes. Both services read and write PostgreSQL.',
        layers: [
          { name: 'Frontend', description: 'React and TypeScript single-page app with React Router, an API client layer and a Socket.IO client.' },
          { name: 'API', description: 'FastAPI service with request validation, authentication and role checks on every protected route.' },
          { name: 'Real-time', description: 'Socket.IO server that groups connected users into rooms per project and broadcasts changes.' },
          { name: 'Database', description: 'PostgreSQL with versioned migrations so the schema can change safely.' },
          { name: 'Delivery', description: 'GitHub Actions to run tests on each push, with a documented production deployment.' },
        ],
      },
      challenges: [
        {
          challenge: 'Different people need different permissions in different organisations.',
          approach: 'Model membership as its own table with a role, and put every permission check in one authorisation layer the API routes share.',
          tradeOff: 'More design work up front, but permissions stay consistent instead of being scattered across routes.',
        },
        {
          challenge: 'Keeping boards correct when several people edit at once.',
          approach: 'Treat the server as the source of truth. Clients send changes, the server saves them and broadcasts the result to the project room.',
          tradeOff: 'Reconnects and missed events need handling, which is more complex than polling but feels far better to use.',
        },
        {
          challenge: 'Signing users in securely without forcing constant logins.',
          approach: 'Use short-lived access tokens with refresh tokens, so a stolen access token expires quickly.',
          tradeOff: 'More moving parts than a simple session cookie, in exchange for a cleaner separation between frontend and API.',
        },
      ],
      learnings: [
        'Designing a relational schema for organisations, memberships, projects and issues.',
        'Enforcing authorisation on the server rather than trusting the interface.',
        'Building real-time features over WebSockets and handling reconnects.',
        'Writing API tests and running them automatically in CI.',
      ],
      futureImprovements: [
        'File attachments on issues using S3-compatible storage.',
        'Email notifications for assignments and mentions.',
        'An activity log for every project.',
        'Search across issues and comments.',
      ],
    },
  },

  {
    id: 'ikeja-online',
    slug: 'ikeja-online',
    title: 'Ikeja Online 2.0',
    tagline: 'A modern electronics marketplace for Nigeria',
    shortDescription:
      'A rebuilt marketplace with a fresh interface, better product discovery and a smoother shopping journey, for customers, vendors and admins.',
    longDescription:
      'Ikeja Online 2.0 reimagines my earlier e-commerce work with a new visual identity, a clearer shopping flow and a properly engineered backend. It keeps the same business idea as the original marketplace but is a new implementation, not a copy of its interface.',
    category: 'e-commerce',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Framer Motion', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Paystack'],
    role: 'Solo build: interface design, frontend, API, database design and payment integration.',
    status: 'in-development',
    mockup: 'storefront',
    featured: true,
    relatedLink: { label: 'Original Ikeja Online marketplace', url: 'https://ikeja-online.onrender.com' },
    features: [
      { title: 'Product catalogue with categories', state: 'planned' },
      { title: 'Search, filtering and sorting', description: 'Filters kept in the URL so results can be shared.', state: 'planned' },
      { title: 'Product detail and comparison', state: 'planned' },
      { title: 'Wishlist and shopping cart', state: 'planned' },
      { title: 'Multi-step checkout', state: 'planned' },
      { title: 'Paystack payments with server-side verification', state: 'planned' },
      { title: 'Order tracking', state: 'planned' },
      { title: 'Customer, vendor and admin dashboards', state: 'planned' },
      { title: 'Reviews and vendor messaging', state: 'planned' },
      { title: 'Loading, empty, error and success states', state: 'planned' },
    ],
    caseStudy: {
      overview:
        'The original Ikeja Online marketplace already supports customer and vendor accounts, category browsing, a wishlist, a cart and Paystack payments. Version 2.0 is a ground-up rebuild focused on a better interface, stronger product discovery and a cleaner architecture. It is in development, so features below are marked as planned.',
      problem:
        'Online electronics shoppers compare many similar products. A cluttered interface, weak filtering or a confusing checkout makes people leave. Vendors, meanwhile, need simple tools to manage stock and orders.',
      goals: [
        'Help shoppers find the right product quickly with search, filters and comparison.',
        'Make checkout short, clear and trustworthy.',
        'Give vendors and admins dashboards for products, stock and orders.',
        'Verify every payment on the server before an order is marked as paid.',
        'Handle empty, loading and error situations gracefully everywhere.',
      ],
      designDecisions: [
        {
          title: 'A new visual identity',
          body: 'The rebuild deliberately does not reuse the original interface. It targets clearer hierarchy, bigger touch targets for mobile shoppers and a calmer layout that puts products first.',
        },
        {
          title: 'Server state and client state kept separate',
          body: 'TanStack Query handles data fetched from the API (caching, refetching, loading states) while Zustand holds small client-only state like the cart drawer. Each tool does one job.',
        },
        {
          title: 'Payments verified by the backend',
          body: 'The browser can say a payment succeeded, but the server asks Paystack directly before marking an order as paid. The client is never trusted for money.',
        },
      ],
      architecture: {
        summary:
          'A React single-page app calls a FastAPI service. The API owns the business rules (stock, orders, roles, payment verification) and stores everything in PostgreSQL.',
        layers: [
          { name: 'Frontend', description: 'React, TypeScript and Tailwind with role-aware routes for customers, vendors and admins.' },
          { name: 'API', description: 'FastAPI with Pydantic validation and SQLAlchemy models, separating customer, vendor and admin capabilities.' },
          { name: 'Payments', description: 'Paystack checkout on the client and a server-side verification step before an order is confirmed.' },
          { name: 'Database', description: 'PostgreSQL with migrations for products, categories, orders, inventory and reviews.' },
          { name: 'Messaging', description: 'WebSockets for vendor and customer messaging and live notifications.' },
        ],
      },
      challenges: [
        {
          challenge: 'Two shoppers buying the last item at the same time.',
          approach: 'Reduce stock inside a database transaction and reject the order if stock has run out.',
          tradeOff: 'Slightly more careful database code, but it prevents overselling.',
        },
        {
          challenge: 'Fast filtering across many products.',
          approach: 'Filter and paginate on the server, keep the filter state in the URL, and cache results on the client.',
          tradeOff: 'More API work than filtering in the browser, but it keeps working as the catalogue grows.',
        },
        {
          challenge: 'Three kinds of users with different needs.',
          approach: 'Use role-based routes and API permissions so a customer, a vendor and an admin each see only their tools.',
        },
      ],
      learnings: [
        'Integrating a real payment provider safely, including server-side verification.',
        'Modelling products, inventory and orders without race conditions.',
        'Designing search and filtering that stays usable on mobile.',
        'Structuring a larger React and TypeScript codebase by feature.',
      ],
      futureImprovements: [
        'Product recommendations based on browsing and purchases.',
        'Vendor analytics.',
        'Delivery tracking integrations.',
        'Progressive web app support for offline browsing.',
      ],
    },
  },

  {
    id: 'taskflow',
    slug: 'taskflow',
    title: 'TaskFlow',
    tagline: 'Real-time task management',
    shortDescription:
      'A productivity app for organising tasks by status, priority and due date, with live updates so changes appear as they happen.',
    longDescription:
      'TaskFlow goes beyond a basic to-do list. It is built to practise clean component design, form validation, API integration and real-time synchronisation, while staying simple enough to be pleasant to use every day.',
    category: 'productivity',
    technologies: ['React', 'Flask', 'Socket.IO', 'REST API'],
    role: 'Solo build: frontend components and state, Flask API, real-time events and validation.',
    status: 'in-development',
    mockup: 'tasks',
    featured: true,
    features: [
      { title: 'Create, edit and delete tasks', state: 'planned' },
      { title: 'Status and priority', state: 'planned' },
      { title: 'Due dates', state: 'planned' },
      { title: 'Categories or projects', state: 'planned' },
      { title: 'Search and filtering', state: 'planned' },
      { title: 'Task detail view', state: 'planned' },
      { title: 'Real-time updates', description: 'Changes made in one window show up in another.', state: 'planned' },
      { title: 'Responsive dashboard', state: 'planned' },
      { title: 'Persistent storage', state: 'planned' },
    ],
    caseStudy: {
      overview:
        'TaskFlow is a task manager with a React frontend, a Flask API and Socket.IO for live updates. It is still being built, so the feature list is the target scope, not a record of what is finished.',
      problem:
        'Most simple task apps stop at a checklist. People need to see what is urgent, what is blocked and what changed, and teams need those changes to appear without refreshing the page.',
      goals: [
        'Make the common actions (add, update, finish a task) fast and obvious.',
        'Let people sort and filter by status, priority, category and due date.',
        'Show changes made elsewhere in real time.',
        'Validate input clearly on the client and again on the server.',
      ],
      designDecisions: [
        {
          title: 'Small, focused components',
          body: 'Task list, task card, filters and form are separate components with clear props, which keeps each one easy to test and change.',
        },
        {
          title: 'Validation in two places',
          body: 'The form checks input immediately to help the user. The Flask API checks it again because the client can never be fully trusted.',
        },
        {
          title: 'Socket.IO for live changes',
          body: 'When a task changes, the server emits an event and connected clients update their view, instead of every client repeatedly asking for updates.',
        },
      ],
      architecture: {
        summary:
          'A React app uses REST calls for creating and reading tasks and a Socket.IO connection to receive change events from the Flask server.',
        layers: [
          { name: 'Frontend', description: 'React components for the dashboard, task list, filters, form and detail view.' },
          { name: 'API', description: 'Flask REST endpoints for task operations with server-side validation.' },
          { name: 'Real-time', description: 'Flask-SocketIO events broadcast task changes to connected clients.' },
          { name: 'Storage', description: 'Persistent database storage, so tasks survive restarts.' },
        ],
      },
      challenges: [
        {
          challenge: 'Making the interface feel instant while the server is still saving.',
          approach: 'Update the screen optimistically, then reconcile with the server response and roll back if the save fails.',
          tradeOff: 'Extra state handling in exchange for a much more responsive feel.',
        },
        {
          challenge: 'Avoiding duplicate or conflicting updates from live events.',
          approach: 'Identify tasks by id and merge incoming events into existing state rather than appending blindly.',
        },
      ],
      learnings: [
        'Structuring React state so the interface stays predictable as features grow.',
        'Connecting a Flask API and a React client over REST and Socket.IO.',
        'Designing forms with helpful, accessible validation.',
      ],
      futureImprovements: [
        'User accounts and shared workspaces.',
        'Recurring tasks and reminders.',
        'Drag-and-drop ordering.',
        'Keyboard shortcuts.',
      ],
    },
  },

  {
    id: 'insightboard',
    slug: 'insightboard',
    title: 'InsightBoard',
    tagline: 'Business analytics dashboard',
    shortDescription:
      'A dashboard concept that turns business data into clear metrics, interactive charts and searchable tables. Uses clearly labelled demo data.',
    longDescription:
      'InsightBoard is a planned dashboard project about information design: choosing the right chart, making filters obvious, and keeping tables readable. Until it connects to a real data source it will use demo data that is labelled as such everywhere it appears.',
    category: 'dashboards-apis',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart library', 'REST API'],
    role: 'Planned solo build: information design, frontend architecture, chart integration and data handling.',
    status: 'planned',
    mockup: 'analytics',
    featured: false,
    features: [
      { title: 'Summary metric cards', state: 'planned' },
      { title: 'Interactive charts', state: 'planned' },
      { title: 'Date-range filters', state: 'planned' },
      { title: 'Searchable and sortable tables', state: 'planned' },
      { title: 'API integration', state: 'planned' },
      { title: 'CSV export', state: 'planned' },
      { title: 'Responsive dashboard layouts', state: 'planned' },
      { title: 'Loading, empty and error states', state: 'planned' },
    ],
    caseStudy: {
      overview:
        'InsightBoard is a concept and roadmap project. Nothing on this page has been built yet; it describes what the project is meant to demonstrate and how it will be approached.',
      problem:
        'Teams collect plenty of data but struggle to read it. A good dashboard answers the question "how are we doing?" at a glance and lets people dig into the details when they need to.',
      goals: [
        'Show the most important numbers first, with context.',
        'Let people change the date range and see everything update together.',
        'Keep tables fast and readable as data grows.',
        'Handle slow, empty and failed data loads without confusing the user.',
      ],
      designDecisions: [
        {
          title: 'Demo data, clearly labelled',
          body: 'Until a real source is connected, all figures come from a generated demo dataset and the interface says so. No invented business results.',
        },
        {
          title: 'One shared filter state',
          body: 'The date range lives in one place and drives every card, chart and table, so the page can never show conflicting periods.',
        },
        {
          title: 'Charts with text alternatives',
          body: 'Each chart will have a table or summary available so the information is not locked inside an image.',
        },
      ],
      architecture: {
        summary:
          'A React app fetches data through a small API layer, derives metrics and chart series from it, and renders them with a charting library.',
        layers: [
          { name: 'Data layer', description: 'API client with a swappable demo-data source for development.' },
          { name: 'Transformation', description: 'Pure functions that turn raw records into metrics and chart series, easy to unit test.' },
          { name: 'Presentation', description: 'Metric cards, charts and tables as reusable components.' },
        ],
      },
      challenges: [
        {
          challenge: 'Large tables that stay fast.',
          approach: 'Paginate first, and consider windowing the rows if the dataset grows.',
        },
        {
          challenge: 'Date ranges across time zones.',
          approach: 'Store and compare dates in UTC and format them for display only at the edge.',
        },
        {
          challenge: 'Charts that are accessible.',
          approach: 'Provide text summaries and data tables next to every chart and avoid relying on colour alone.',
        },
      ],
      learnings: [
        'Choosing the right visualisation for each question.',
        'Structuring data-transformation code so it is testable.',
        'Designing consistent loading, empty and error states.',
      ],
      futureImprovements: [
        'Saved views and shareable filters.',
        'Scheduled report exports.',
        'Connection to a live data source.',
      ],
    },
  },

  {
    id: 'cloudpulse',
    slug: 'cloudpulse',
    title: 'CloudPulse',
    tagline: 'Deployment and infrastructure monitor',
    shortDescription:
      'A developer-focused dashboard concept showing deployments, build history and service health. Uses simulated data that is clearly labelled.',
    longDescription:
      'CloudPulse is a planned project for learning and demonstrating Linux, containers, CI/CD and cloud concepts by building the kind of dashboard those tools feed. It will use simulated data, labelled as simulated, until real integrations are set up.',
    category: 'cloud-devops',
    technologies: ['React', 'TypeScript', 'Python', 'Docker', 'GitHub Actions', 'Linux', 'AWS'],
    role: 'Planned solo build: dashboard interface, data model, simulator and, later, real integrations.',
    status: 'planned',
    mockup: 'pipeline',
    featured: false,
    features: [
      { title: 'Deployment history', state: 'planned' },
      { title: 'Build and deployment statuses', state: 'planned' },
      { title: 'Service-health indicators', state: 'planned' },
      { title: 'CI/CD pipeline visualisation', state: 'planned' },
      { title: 'Environment overview', state: 'planned' },
      { title: 'Container information', state: 'planned' },
      { title: 'Event and log views', state: 'planned' },
      { title: 'Deployment documentation', state: 'planned' },
    ],
    caseStudy: {
      overview:
        'CloudPulse is a concept and roadmap project. No live infrastructure is monitored and no real metrics are shown. Everything described here is the plan.',
      problem:
        'When a deployment fails, developers want to know what changed, which step broke and whether users are affected. Good tooling makes those answers visible in seconds.',
      goals: [
        'Show the state of each environment and service at a glance.',
        'Visualise a CI/CD pipeline from commit to deployment.',
        'Keep a readable history of builds and deployments.',
        'Use this project to practise Docker, GitHub Actions, Linux and AWS fundamentals for real.',
      ],
      designDecisions: [
        {
          title: 'A simulator behind a real interface',
          body: 'The dashboard reads data through a defined interface. At first a simulator provides it, labelled as simulated. Later a GitHub Actions or AWS adapter can replace it without redesigning the screens.',
        },
        {
          title: 'No cloud credentials in the browser',
          body: 'Anything that needs secrets runs on the backend. The frontend only receives the results it is allowed to show.',
        },
      ],
      architecture: {
        summary:
          'A React dashboard reads status data from a small Python service. The service starts with simulated data and is designed to later call real CI and cloud APIs.',
        layers: [
          { name: 'Dashboard', description: 'React and TypeScript views for deployments, services, pipelines and events.' },
          { name: 'Service', description: 'Python API that exposes status data in one consistent shape.' },
          { name: 'Data source', description: 'Simulator first, then replaceable adapters for GitHub Actions and AWS.' },
          { name: 'Packaging', description: 'Docker for running the stack and a GitHub Actions workflow for tests and builds.' },
        ],
      },
      challenges: [
        {
          challenge: 'Showing honest data before real integrations exist.',
          approach: 'Label every simulated value in the interface and keep the simulator separate from the real adapters.',
        },
        {
          challenge: 'Handling secrets safely.',
          approach: 'Keep tokens on the server, load them from environment variables and never ship them to the browser.',
        },
        {
          challenge: 'Keeping status fresh.',
          approach: 'Start with polling and move to streaming only if it is genuinely needed.',
        },
      ],
      learnings: [
        'How a CI/CD pipeline is structured from commit to deployment.',
        'Packaging an application with Docker.',
        'Managing configuration and secrets outside the code.',
        'Designing monitoring views that highlight what needs attention.',
      ],
      futureImprovements: [
        'Real GitHub Actions integration.',
        'AWS service-health integration.',
        'Alerting rules and notifications.',
        'Kubernetes cluster overview.',
      ],
    },
  },

  {
    id: 'bookingflow',
    slug: 'bookingflow',
    title: 'BookingFlow',
    tagline: 'Appointment and reservation platform',
    shortDescription:
      'A booking platform for service businesses: services, available time slots, confirmations and an admin dashboard.',
    longDescription:
      'BookingFlow is a planned business application that focuses on practical logic: availability, time zones, double-booking prevention and a friendly booking form. It is a concept, not a product used by any real business.',
    category: 'full-stack',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
    role: 'Planned solo build: booking logic, interface, API and data persistence.',
    status: 'planned',
    mockup: 'calendar',
    featured: false,
    features: [
      { title: 'Service listings', state: 'planned' },
      { title: 'Available time slots', state: 'planned' },
      { title: 'Booking creation and cancellation', state: 'planned' },
      { title: 'Customer details and confirmation', state: 'planned' },
      { title: 'Admin dashboard and booking statuses', state: 'planned' },
      { title: 'Calendar views', state: 'planned' },
      { title: 'Form validation', state: 'planned' },
      { title: 'Notifications where configured', state: 'planned' },
    ],
    caseStudy: {
      overview:
        'BookingFlow is a concept and roadmap project. It has no real clients or usage. The page describes what will be built and the problems it is meant to solve.',
      problem:
        'Service businesses lose time to back-and-forth messages about availability, and lose money to double bookings and no-shows. A booking tool should show real availability and confirm instantly.',
      goals: [
        'Show only time slots that are genuinely free.',
        'Let customers book and cancel in a few steps.',
        'Give admins a clear view of upcoming bookings and their statuses.',
        'Never allow two bookings for the same slot.',
      ],
      designDecisions: [
        {
          title: 'Time stored in UTC',
          body: 'All times are stored in UTC and converted for display, so daylight saving and time zones cannot corrupt bookings.',
        },
        {
          title: 'The database prevents double booking',
          body: 'A constraint on provider and time slot makes a double booking impossible, even if two requests arrive at once.',
        },
        {
          title: 'A short, forgiving booking form',
          body: 'Ask only for what is needed, validate as people type, and say clearly how to fix any problem.',
        },
      ],
      architecture: {
        summary:
          'A React app lets customers pick a service and a slot. A FastAPI service calculates availability and stores bookings in PostgreSQL.',
        layers: [
          { name: 'Frontend', description: 'Customer booking flow and an admin dashboard with calendar and list views.' },
          { name: 'API', description: 'FastAPI endpoints for services, availability and bookings.' },
          { name: 'Availability engine', description: 'Business logic that combines opening hours, service duration and existing bookings.' },
          { name: 'Database', description: 'PostgreSQL tables for services, providers, bookings and customers.' },
        ],
      },
      challenges: [
        {
          challenge: 'Calculating availability correctly.',
          approach: 'Write the availability logic as a pure, heavily tested function of opening hours, durations and existing bookings.',
        },
        {
          challenge: 'Two people booking the same slot at once.',
          approach: 'Rely on a database constraint and handle the conflict with a clear message.',
        },
        {
          challenge: 'Time zones.',
          approach: 'Store UTC, keep the business time zone as data and format only for display.',
        },
      ],
      learnings: [
        'Date and time handling done properly.',
        'Putting business rules where they cannot be bypassed.',
        'Testing logic-heavy code.',
      ],
      futureImprovements: [
        'Email and SMS reminders.',
        'Online deposits.',
        'Calendar sync.',
        'Multiple staff members per business.',
      ],
    },
  },
]
