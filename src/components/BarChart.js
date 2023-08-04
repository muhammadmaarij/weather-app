import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ data2 }) {
  let chartData;
  if (data2 == null) {
  } else {
    chartData = {
      labels: Object.keys(data2),
      datasets: [
        {
          label: "Pollution Data",
          data: Object.values(data2),
          backgroundColor: "darkslateblue",
        },
      ],
    };
  }
  return (
    <div>
      {data2 && (
        <div style={{ margin: "200px" }}>
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Air Pollution Stats",
                  font: {
                    size: 32,
                  },
                  legend: {
                    display: true,
                    position: "top",
                    labels: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      size: 20,
                    },
                  },
                },

                y: {
                  grid: {
                    display: false,
                  },
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 20,
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default BarChart;
