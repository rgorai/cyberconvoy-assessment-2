# Employee Management App

Welcome to Ron Gorai's submission for CyberConvoy's technical assessment II.

## Prerequisites

Node
port 3001 open

## Steps to Run


## Notes
- This is my first time implementing a MySQL database, Google OAuth and TailwindCSS, so I'm not very familiar with the best coding and security practices with these technologies, so I've attempted them as best I can based on research and my experience with similar technologies
- even though it @@ session based handling, flashes
- Some aspects of the application may seem somewhat over-engineered for the scale of this app - these are pasted from my personal, relatively larger-scale projects
- I included these partially to expedite my development time for those aspects, but mainly to help convey my thought processes
- I left the console statements for API calls in so you can observe the state management conserving them in action
- I am using React Context API to manage state in this app since it works and does not require additional dependencies (my implementation could even be further optimized using useReducer), but at scale something like Redux would be better suited