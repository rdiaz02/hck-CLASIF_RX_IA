var trace1 = {
    x: ['2020-03-25', '2020-03-29', 
	'2020-04-02', '2020-04-04'],
    y: [40, 35, 25, 9],
    marker: {
	color: 'rgb(142, 124, 195)',
	size: 12
    },
    name: 'COVID-19 %',
    type: 'scatter'
};


var trace2 = {
    x: ['2020-03-25', '2020-03-27', 
	'2020-04-01', '2020-04-03'],
    // Cleaner if left on top part    
    y: [104, 104, 104, 104],
    mode: 'markers+text',
    name: 'Anotaciones',

    // Notice how a newline is inserted in "Dolor de cabeza"
    text: ['Fiebre 38.5', 
           'Sin tos', 
           'Fiebre 37.3',
           'Dolor de<br> cabeza' ],
    textposition: 'bottom',
    textfont: {
	family: 'sans serif',
	size: 14
    },
    // Do not show the y-value when hovering  
    hoverinfo: 'x+text',
    type: 'scatter'
};

// A hack to display a right axis
// No way to do it otherwise
// https://community.plotly.com/t/mirror-axis-x-bottom-and-top-y-left-and-right/7698
var trace3 =  {
  yaxis: 'y2'
}

var data = [trace1, trace2, trace3];

var layout = 
    {
	showlegend: false,
	title: {
	    text:'Evolución temporal Probabilidad\
 Neumonía compatible COVID-19, en %',
	    font: {
		family: 'Arial',
		size: 24
	    },
	    xref: 'paper',
	    x: 0.05,
	},
	xaxis: {
	    showgrid: true,
	    // No idea what next does
	    // but it forces plot to be square?
	    //zeroline: true,
	    showline: true,
	    title: {
		text: 'Fecha',
		font: {
		    family: 'Arial',
		    size: 18,
		    color: '#7f7f7f'
		}
	    },
	},
	yaxis: {
	    mirror: 'allticks',
	    range: [0, 106],
	    showgrid: true,
	    zeroline: true,
	    showline: true,
	    side: 'left',
	    title: {
		text: 'Neumonía compatible COVID-19, %',
		font: {
		    family: 'Liberation Sans',
		    size: 18,
		    color: '#7f7f7f'
		}
	    }
	},
	yaxis2: {
	    range: [0, 106],
	    anchor: 'x',
	    overlaying: 'y1',
	    side: 'right'
	} 
    };

Plotly.newPlot('myDiv', data, layout);

// FIXME:
// What will happen if the text is veeeery large?
