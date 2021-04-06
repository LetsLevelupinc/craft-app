function buildPlot() {

    const layout = {
      scope: "usa",
      showlegend: true,
      height: 600,
            // width: 980,
      geo: {
        projection: {
          type: "orthographic",
        },
        showland: true,
        landcolor: "rgb(219,213,191)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
      }
    };

    Plotly.newPlot("plot", logs, layout);

}

buildPlot();
