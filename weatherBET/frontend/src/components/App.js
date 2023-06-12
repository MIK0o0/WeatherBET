// import React, { Component } from "react";
// import { render } from "react-dom";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <h1>Testin react code</h1>
//   }
// }

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);

import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export default function App(){
    const [viewport, setViewport] = useState({
            viewport: {
                latitude: 45.4211,
                longitude: -75.6903,
                width: "100%",
                height: "100%",
                zoom: 10
            }
        });
    return (
        <div>
            test
            <ReactMapGL
            >
                markers
            </ReactMapGL>
        </div>
    );
    
}
// import React, { Component } from "react";
// import { render } from "react-dom";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         test
//       </div>
//     );
//   }
// }

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);

