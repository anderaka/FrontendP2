import React, { Component } from 'react';
import { Container, Row, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { TagsList, PriceList } from "../../services/constants/ads-data"
import { FormButton } from "../common/buttons/btn";

export class Filter extends Component{

    state = {

        name: "",
        tag: "",
        min: "",
        max: "",
        type: ""

    }
    
    handleChangeName    = ev => this.setState({ name: ev.target.value });
    handleChangeTag     = ev => this.setState({ tag: ev.target.value });
    handleChangeMin     = ev => this.setState({ min: ev.target.value});
    handleChangeMax     = ev => this.setState({ max: ev.target.value });
    handleChangeType    = ev => this.setState({ type: ev.target.value });

    handleSubmit = ev => {

        ev.preventDefault();

        this.props.history.push({

           pathname: '/filter',
           search: `?name=${this.state.name}&venta=${this.state.type}&tag=${this.state.tag}&pricemin=${this.state.min}&pricemax=${this.state.max}`,

        });

    }

    render(){

        return(

            <Container className="mt-5">
                
                <Row>
                    <Col className="mb-4"><h4>Filtrar anuncios</h4></Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>¿Qué estas buscando?</Form.Label>
                            <Form.Control name="name" type="text" placeholder="busca por texto" onChange={this.handleChangeName}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Etiquetas</Form.Label>
                            <Form.Control name="tag" as="select" onChange={this.handleChangeTag}>
                                <TagsList />
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Precio mín.</Form.Label>
                            <Form.Control as="select" onChange={this.handleChangeMin}>
                                <PriceList />
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Precio máx.</Form.Label>
                            <Form.Control as="select" onChange={this.handleChangeMax}>
                                <PriceList />
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label as="legend" column>
                                Tipo
                            </Form.Label>
                            <Form.Check
                                custom
                                inline
                                type="radio"
                                name="tipo"
                                label="Venta"
                                value="true"
                                id="venta"
                                checked = {this.state.type === "true"}
                                onChange={this.handleChangeType}
                                />
                            <Form.Check
                                custom
                                inline
                                type="radio"
                                label="Compra"
                                value="false"
                                name="tipo"
                                id="compra"
                                checked = {this.state.type === "false"}
                                onChange={this.handleChangeType}
                                />
                        </Form.Group>
                    </Form.Row>

                    <FormButton type="submit" className="col my-4">
                        Filtrar
                    </FormButton>

                </Form>
                <hr/>
            </Container> 

        );

    }
    
}

export default withRouter(Filter);