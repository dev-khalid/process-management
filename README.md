 **# Process Management System**


**## Key Features**

- **Streamlined Process Control:**
    - Initiate processes effortlessly with the `/start` endpoint.
    - Gracefully terminate processes using the `/stop/:processId` endpoint.
    - Gather valuable insights with the `/checklogs/:processId` endpoint.

**## Endpoints**

- **`/start`:**
    - Initiates a new process which will generate a random number in a interval of 5 minutes and log that number along with timestamp.
    - Returns: Process ID .
- **`/stop/:processId`:**
    - Stops the specified process.
    - Returns: Confirmation message (if successful) and logs associated with that process.
- **`/checklogs/:processId`:**
    - Retrieves logs for the specified process.
    - Returns: Process logs.

**## Getting Started**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/process-management-system.git
    ```
2. **Install dependencies:**
    ```bash
    cd process-management-system
    npm install
    ```
3. **Start the server:**
    ```bash
    npm run dev
    ```

**## Usage**

- Access the endpoints using your preferred HTTP client or browser.
- Replace `:processId` with the actual process ID in the `/stop` and `/checklogs` endpoints.

**## License**

This project is licensed under the MIT License. See the `LICENSE` file for details.


**## Additional Information**

- **Technology Stack:** [Node.js , express.js , bullmq , redis]
- **Diagram:**[Figma](https://www.figma.com/file/sQuTbhvRQWbPNiRksFTOzK/Untitled?type=whiteboard&node-id=0%3A1&t=7i1u0DKl4WjMubfx-1)
