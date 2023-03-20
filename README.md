# Technical Criteria - Readme

## Schema Design

<hr/>

### 1. High-level design

At a high-level, we need some following services (or components) to handle above requirements:

![High Level Design](images/dbdesign.png)

### 2. Service module design

![Module Design](images/moduledesign.png)

- **User Service**: manages users with CRUD operations.
- **Item Service**: manages items for users to bid.
- **Wallet Service**: processes user's wallet.
- **Authentication Service**: authenticates users, implemented JWT approach.

## Software development principles

<hr/>
### KISS (Keep It Simple Stupid)
- Most systems work best if they are kept simple rather than made complex.
- Less code takes less time to write, has less bugs, and is easier to modify.
- > The best design is the simplest one that works - Albert Einstein.

**What applied:** Keep system design and the implementation code simple

### YAGNI (You aren't gonna need it)

- Don't implement something until it is necessary.
- Any work that's only used for a feature that's needed tomorrow, means losing effort from features that need to be done for the current iteration.

**What applied:** Always implement things when we actually need them, never when we just foresee that we need them.

### Separation of Concerns

- Separating a system into multiple distinct microservices, such that each service addresses a separate concern (product, order, shopping cart...).
- AOP to separate of cross-cutting concerns.

### DRY

- Put business rules, long expressions, if statements, math formulas, metadata, etc. in only one place.

### Code For The Maintainer

- Maintenance is by far the most expensive phase of any project.
- Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.
- Always code and comment in such a way that if someone a few notches junior picks up the code, they will take pleasure in reading and learning from it.

**What applied:** Comprehensive documentation, make the code clean, add comment for some special intentions.

### Avoid Premature Optimization

- It is unknown upfront where the bottlenecks will be.
- After optimization, it might be harder to read and thus maintain.

**What applied:** Don't optimize until we need to, and only after profiling we discover a bottleneck optimise that.

### Minimise Coupling

- Eliminate, minimise, and reduce complexity of necessary relationships.
- By hiding implementation details, coupling is reduced.

**What applied:** Encapsulation in OOP, DI.

### Inversion of Control

IoC inverts the flow of control as compared to traditional control flow (Don't call us, we'll call you).

- In traditional programming: our custom code makes calls to a library.
- IoC: framework make calls to our custom code.

**What applied:** Spring IoC container with Constructor-Based Dependency Injection for main code and Field-Based Dependency Injection for test code.

### Single Responsibility Principle

Every class should have a single responsibility, and that responsibility should be entirely encapsulated by the class. Responsibility can be defined as a reason to change, so a class or module should have one, and only one, reason to change.

**What applied:** break system into multiple services, each services has only one responsibility. In each services, break into multiple layers, each layers were broken into multiple classes, each class has only one reason to change.

## Application default configuration

<hr/>
To make it easier for development process, we still expose these ports on the local machine to send request directly with services or to view actual data in the data stores. 
In production environment, we leverage the infrastructure to make the downstream services become unreachable from the client, we only expose one single point - API Gateway.

| Service         | Port (customizable) |
| --------------- | ------------------- |
| graphql service | 5001                |
| react           | 3001                |
| mongo           | 27017               |
| redis           | 6379                |

## Local Development Guideline

<hr/>

### 1. Prerequisites

- NodeJS (v14 or above), `npm` and `yarn`
- `Docker`
- `Makefile`

### 2. Setup Local Development Environment

<br/>

1. Clone the project to local machine and go to the folder

```
git clone https://github.com/DaiThanh97/jitera-technical-test.git
cd jitera-technical-test
```

2. Run `make bootstrap-server` cli to bootstrap the application.

**OR**

1. Start the infrastructure using (optional)

```
### Redis
docker run --name redis -p 6379:6379 -d redis

### MongoDB
docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123123 mongo
```

2. Run the back-end in development mode (live-reload support). Make sure that you're in root directory.

```
cd backend && yarn start:dev
```

3. Run the front-end in development mode (live-reload support). Make sure that you're in root directory.

```
cd frontend && yarn start
```

<br/>

**NOTE**: The app should be accessible at http://localhost:3000. The backend GraphQL can be accessed at http://localhost:5001/graphql. Please change `.env.example` to `.env` to bootstrap correctly.

### - Should access to backend through **Apollo Studio** to manually fetch data.

![High Level Design](images/query.png)

### - Frontend should look like this.

![High Level Design](images/login.png)
![High Level Design](images/list.png)

## Other Notes

<hr/>

### What I have completed

### 1. Functionalities

1. Login.
2. Register new user.
3. Deposit: add money to user.
4. Create Item: create new item in DRAFT mode.
5. Publish Item: publish item for other users to bid.
6. Auto expired item when reach time.
7. Get list items.
8. Get list items by user: get all items that created by specific user.
9. Polling.

### 2. Others

1. Local Development Setup script.

### 3. What can be improved if have more times

1. More unit tests for `back-end`, `front-end`.
2. Write end-to-end tests.
3. Implement feature to decrease user's money when bid finished after time expired.
4. Implement CI/CD for automation deployment using Github Actions, Jenkins,...
5. Add auth service for security purpose when communicate with others services. Ex: `Firebase`, `Auth0`,...
6. Implement `Prometheus`, `Datadog` for monitoring and health checking purpose.
7. Apply microservices architecture when business growing up using Apollo Federation.
8. For development process, we can separate microservices into different repos.
