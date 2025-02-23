# Lorenz attractor
This project visualizes the Lorenz attractor, a system of differential equations that exhibits deterministic chaotic behaviour, i.e. it is a chaotic system where the behaviour is entirely determined by the initial conditions, but even tiny changes in those initial conditions can lead to drastically different outcomes in the future. For a certain set of parameters, the Lorenz attractor resembles the wings of a butterfly, hence the term "butterfly effect" for the phenomenon.
### Features
- Uses Runge-Kutta method of 4th order (RK4 method) to solve the system of equations
- Interactive real-time 3-D visualization of the Lorenz attractor
- Adjustable parameters (σ, ρ, β) with sliders
###### Initial conditions are set to x<sub>0</sub> = 1, y<sub>0</sub> = 1, z<sub>0</sub> = 1 by default.
### Technologies Used
- **HTML, CSS**: For the web interface
- **JavaScript**: For implementing the numerical method to solve the system
- **Plotly.js**: For interactive 3-D graph plotting
- **MathJax**: For LaTeX equation rendering
###### Note: It is recommended to open this project on a computer, as the interface may get distorted on a smartphone/tablet screen.
