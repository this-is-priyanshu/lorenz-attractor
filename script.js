document.addEventListener("DOMContentLoaded", function () {
    
    const sigmaSlider = document.getElementById("slider-sigma");
    const rhoSlider = document.getElementById("slider-rho");
    const betaSlider = document.getElementById("slider-beta");
    const sigmaValue = document.getElementById("slider-sigma-value");
    const rhoValue = document.getElementById("slider-rho-value");
    const betaValue = document.getElementById("slider-beta-value");

    let sigma = parseFloat(sigmaSlider.value);
    let rho = parseFloat(rhoSlider.value);
    let beta = parseFloat(betaSlider.value);
    const dt = 0.01;
    const tMax = 100;

    function lorenzRK4(x, y, z, sigma, rho, beta, dt) {
        let k1x = dt * (sigma * (y - x));
        let k1y = dt * (x * (rho - z) - y);
        let k1z = dt * (x * y - beta * z);

        let k2x = dt * (sigma * ((y + k1y / 2) - (x + k1x / 2)));
        let k2y = dt * ((x + k1x / 2) * (rho - (z + k1z / 2)) - (y + k1y / 2));
        let k2z = dt * ((x + k1x / 2) * (y + k1y / 2) - beta * (z + k1z / 2));

        let k3x = dt * (sigma * ((y + k2y / 2) - (x + k2x / 2)));
        let k3y = dt * ((x + k2x / 2) * (rho - (z + k2z / 2)) - (y + k2y / 2));
        let k3z = dt * ((x + k2x / 2) * (y + k2y / 2) - beta * (z + k2z / 2));

        let k4x = dt * (sigma * ((y + k3y) - (x + k3x)));
        let k4y = dt * ((x + k3x) * (rho - (z + k3z)) - (y + k3y));
        let k4z = dt * ((x + k3x) * (y + k3y) - beta * (z + k3z));

        let xNext = x + (k1x + 2 * k2x + 2 * k3x + k4x) / 6;
        let yNext = y + (k1y + 2 * k2y + 2 * k3y + k4y) / 6;
        let zNext = z + (k1z + 2 * k2z + 2 * k3z + k4z) / 6;

        return [xNext, yNext, zNext];
    }

    function computeTrajectory(x0, y0, z0, sigma, rho, beta, dt, tMax) {
        let x = x0, y = y0, z = z0;
        const trajectory = { x: [x], y: [y], z: [z] };

        for (let t = dt; t <= tMax; t += dt) {
            [x, y, z] = lorenzRK4(x, y, z, sigma, rho, beta, dt);
            trajectory.x.push(x);
            trajectory.y.push(y);
            trajectory.z.push(z);
        }

        return trajectory;
    }

    function updateGraph() {
        sigma = parseFloat(sigmaSlider.value);
        rho = parseFloat(rhoSlider.value);
        beta = parseFloat(betaSlider.value);

        sigmaValue.textContent = sigma;
        rhoValue.textContent = rho;
        betaValue.textContent = beta;

        const trajectory = computeTrajectory(1.0, 1.0, 1.0, sigma, rho, beta, dt, tMax);

        Plotly.newPlot("graph", [{
            x: trajectory.x,
            y: trajectory.y,
            z: trajectory.z,
            mode: "lines",
            type: "scatter3d",
            line: {
                color: "blue",
                width: 2,
            },
        }], {
            title: "Lorenz Attractor",
            scene: {
                xaxis: { title: "X" },
                yaxis: { title: "Y" },
                zaxis: { title: "Z" },
            },
            dragmode: "orbit",
            scrollZoom: true,
        }, { responsive: true });
    }

    updateGraph();

    sigmaSlider.addEventListener("input", updateGraph);
    rhoSlider.addEventListener("input", updateGraph);
    betaSlider.addEventListener("input", updateGraph);
});
