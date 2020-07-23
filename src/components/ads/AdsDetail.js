import React, {Component} from 'react';
import {Container, Row, Col, Image} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import axios from "axios";

class AdDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            ad: []
        }
    }

    componentDidMount = async () => {

        const {match: {params}} = this.props;

        const { history } = this.props;

        
        //axios.defaults.withCredentials = true;
         axios.get(`http://127.0.0.1:3000/api/anuncios/${params.id}`
        ).then(res => {

        const ad = res.data.result;
        this.setState({ad:ad})
        }).catch(err => {

            alert(`No se ha podido recuperar los anuncios, logueate de nuevo`);
            history.push("/login");
        })
    }

    Back = () => {
        const {history} = this.props;
        history.goBack();
    }
    
    render(){

        const { ad } = this.state;
                
        return(
            <Container>
                <Row>
                    <Col>
                        <button onClick={this.Back}>Volver</button>
                    </Col>
                </Row>

                <Row>
                    <Col className="mt-5">
                        <h2>{ad.name}</h2>
                        <Image src={ad.photo} fluid />

                        <dl>
                            <dt>Precio: {ad.price} €</dt>

                            <dt>Tipo:</dt>
                            <dd>{ad.sell}</dd>

                            <dt>Tags:</dt>
                            { ad.tags && ad.tags.map(tag => (
                                <dd key={tag}>
                                    <span>{tag}</span>
                                </dd>
                            ))
                        }
                            <dt>Desc:</dt>
                            <dd>{ad.description}</dd>
                        </dl>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(AdDetail);