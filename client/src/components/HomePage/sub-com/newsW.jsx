import React, {Component} from "react";
import c1 from "../img/w1.jpeg";
import c2 from "../img/w2.jpg";
import c3 from "../img/w3.jpg";

class newsW extends Component {
    state = {
        info1: undefined,
        info2: undefined,
        info3: undefined,
        l1: undefined,
        l2: undefined,
        l3: undefined,
        t1: undefined,
        t2: undefined,
        t3: undefined,
    };

    componentWillMount() {
        const request = new Request("/news/find", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });

        fetch(request)
            .then(response => response.json())
            .then(data => {
                this.setState({info1: data.news.w1})
                this.setState({info2: data.news.w2})
                this.setState({info3: data.news.w3})
                this.setState({l1: data.news.lw1})
                this.setState({l2: data.news.lw2})
                this.setState({l3: data.news.lw3})
                this.setState({t1: data.news.tw1})
                this.setState({t2: data.news.tw2})
                this.setState({t3: data.news.tw3})

            })
            .catch(error => console.log(error));

    };

    render() {
        return (
            <div>
                <div className="media">
                    <img src={c1} className="newsimgs " alt="..."/>
                    <div className="b">
                        <h2>{this.state.t1}</h2>
                        <p>{this.state.info1}</p>
                        <p className="mb-0">{this.state.l1}</p>
                    </div>
                </div>
                <br></br> <br></br>
                <br></br>
                <div className="media">
                    <img src={c2} className="newsimgs " alt="..."/>
                    <div className="b">
                        <h2>{this.state.t2}</h2>
                        <p>{this.state.info2}</p>
                        <p className="mb-0">{this.state.l2}</p>
                    </div>
                </div>
                <br></br> <br></br>
                <br></br>
                <div className="media">
                    <img src={c3} className="newsimgs " alt="..."/>
                    <div className="b">
                        <h2>{this.state.t3}</h2>
                        <p>{this.state.info3}</p>
                        <p className="mb-0">{this.state.l3}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default newsW;
