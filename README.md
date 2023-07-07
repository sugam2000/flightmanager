# Flight Manager

Welcome to the Drone Management Platform! This platform allows users to remotely control drones and view real-time video streaming and map data through a web interface. This readme file provides an overview of the project, installation instructions, and other important details.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

The Drone Management Platform offers the following features:

1. **Remote Drone Control**: Users can control the drone's movement, altitude, and other parameters remotely through a web interface.
2. **Real-Time Video Streaming**: Live video feed from the drone's camera is streamed to the web interface, allowing users to see what the drone sees.
3. **Map Integration**: The web interface displays a map with the drone's location in real-time, providing a visual representation of its movements.
4. **Drone Status Monitoring**: The platform provides real-time information about the drone's battery status, GPS coordinates, and other relevant data.

## Prerequisites

Before installing and using the Drone Management Platform, ensure that you have the following prerequisites:

- **Drone Hardware**: We have tested this firmware with ES32.
- **Web Server**: A server to host the platform. This can be a local development environment or a public server.
- **Node.js**: Make sure you have Node.js installed on your server or development machine. You can download it from the official Node.js website: [https://nodejs.org](https://nodejs.org)

## Installation

Follow these steps to install the Drone Management Platform:

1. Clone the repository to your local machine or server:

   ```shell
   git clone https://github.com/sugam2000/flightmanager.git
   ```

2. Navigate to the project's directory:

   ```shell
   cd flightmanager
   ```

3. Install the required dependencies using npm:

   ```shell
   npm install
   ```

4. Configure the platform by editing the `config.js` file and updating the necessary settings, such as API keys, server configurations, and other options.

5. Build the project:

   ```shell
   npm run build
   ```

6. Start the server:

   ```shell
   npm start
   ```

7. Access the Drone Management Platform by opening a web browser and entering the URL: `http://localhost:3000` (or the appropriate URL if hosted on a remote server).

## Usage

Once the Drone Management Platform is installed and running, follow these steps to control and monitor your drones:

1. Open the web interface by accessing the URL where the platform is hosted.

2.  log in to the account.

3. Once logged in, you should see a dashboard with options to control and monitor your drones.

4. To control a drone, Enter the controller authentication code go to the controller.

5. The live video feed from the drone's camera will be displayed on the web interface, allowing you to see real-time footage.

6. The map integration will show the drone's location and movements in real-time, providing a visual representation of its path.

7. Monitor the drone's battery status, GPS coordinates, and other relevant data on the web interface.

8. Enjoy using the Drone Management Platform!

## Contributing

We welcome contributions to the Drone Management Platform project. If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.

2. Create a new branch for your feature or bug fix:

   ```shell
   git checkout -b my-feature
   ```

3. Make the necessary changes and commit your code.

4. Push the changes to your forked repository.

5. Submit a pull request to the main repository, explaining the changes you have made and why they should be merged.

6. Our team will review your pull request and provide feedback.

7. Once approved, your changes will be merged into the main project.

## License

The Drone Management Platform is open-source software licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software. See the [LICENSE](LICENSE) file for more details.r
