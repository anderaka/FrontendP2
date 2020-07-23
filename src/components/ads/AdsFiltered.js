import React, { Component } from 'react';
import axios from "axios";
import {Container, Card, Row, Col} from "react-bootstrap";
import { withRouter } from "react-router-dom";


import './Ads.css';


export class AdsFiltered extends Component {

    constructor(props){
        super(props);
        this.state = {
            adsF: []
        }
    }

    componentDidMount = async () => {

        const params = new URLSearchParams(window.location.search);

        const adName = (params.get("name")) ? `name=${params.get("name")}` : "" ;
        const adDescription = (params.get("description")) ? `description=${params.get("description")}` : "";
        const adVenta = (params.get("venta")) ? `venta=${params.get("venta")}` : "" ;
        const adTag = (params.get("tag")) ? `tag=${params.get("tag")}` : "" ;
        const adPrice = (params.get("pricemin")) || (params.get("pricemax")) ? `price=${params.get("pricemin")}-${params.get("pricemax")}` : "";

        //axios.defaults.withCredentials = true;

        
        await axios.get(`http://127.0.0.1:3000/api/anuncios?${adName}&${adVenta}&${adPrice}&${adDescription}`
        ).then(res => {

            const adsF = res.data.results;
            this.setState({ adsF });
        }).catch(() => {

            alert("Algo salió mal, y no pudimos filtrar los anuncios, vuelve a intentarlo");
        })

    }

    navigateToDetail = (id) => {

        const { history } = this.props;

        history.push({
            pathname: `/detail/${id}`
        })
    }

    Back = () => {

        const {history} = this.props;
        history.goBack();

    }

    render(){
        
        const { adsF } = this.state;
        return (

            <Container>
            <Row>
                <Col>
                    <button onClick={this.Back}>Volver</button>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                { adsF.map(ad => 
                    <Col key={ad._id} className="col-12 col-sm-6 col-lg-4 mb-4" >
                        <Card onClick={() => {this.navigateToDetail(ad._id)}}>
                            <Card.Img className="img-card" variant="top" src={ad.photo} />
                            <Card.Body>
                                <Card.Title>{ad.name}</Card.Title>
                                <Card.Text as={"div"}>
                                    <dl>
                                        <dt>Precio: {ad.price} €</dt>

                                        <dt>Desc:</dt>
                                        <dd>{ad.description}</dd>

                                        <dt>Tipo:</dt>
                                        <dd>{ad.sell}</dd>

                                        <dt>Tags:</dt>
                                        { ad.tags && ad.tags.map(tag => (
                                            <dd key={tag}>
                                                {tag}
                                            </dd>
                                        ))
                                        }

                                        <dt>created:</dt>
                                        <dd>created: {ad.createdAt}</dd>
                                    </dl>
                                </Card.Text>
                                <Card.Footer>
                                    <small className="text-muted">Última actualización: {ad.updatedAt}</small>
                                </Card.Footer>
                            </Card.Body>
                            
                        </Card>
                    </Col>
                )}          
            </Row>
        </Container>    
 
        )

    }
}

export default withRouter(AdsFiltered);