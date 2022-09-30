<script>
import Chart from "chart.js/auto";

export default {
  props: ["idChart", "typeChart", "title"],
  methods: {
    random_rgba() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        r().toFixed(1) +
        ")"
      );
    },
  },
  mounted() {
    const ctx = document.getElementById(`${this.idChart}`).getContext("2d");
    const myChart = new Chart(ctx, {
      type: this.typeChart,
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: this.title,
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    myChart;
  },
};
</script>

<template>
  <canvas :id="this.idChart"></canvas>
</template>
