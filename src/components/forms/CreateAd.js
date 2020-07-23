import React, {Component} from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { TagsList } from "../../services/constants/ads-data";
import { withRouter } from "react-router-dom";
import { FormButton } from "../common/buttons/btn";

import axios from "axios";

class CreateAdForm extends Component{

    state = {
        name: "",
        photo: "",
        description: "",
        tags: "",
        price: "",
        type: ""
    }
    
    handleChangeName  = ev => this.setState({ name: ev.target.value });
    handleChangePhoto   = ev => this.setState({ photo: ev.target.value });
    handleChangeDescription  = ev => this.setState({ description: ev.target.value });
    handleChangePric    = ev => this.setState({ price: ev.target.value});
    handleChangeSell  = ev => this.setState({ sell: ev.target.value });

    handleChangeTag = ev => {
       
        const opts = ev.target.options;
        let value = []

        for (var i = 1, l = opts.length; i < l; i++) {
            if (opts[i].selected) {
                value.push(opts[i].value);
            }
        }

        this.setState({tags:value})

    }

    handleSubmit = async ev => {

        ev.preventDefault();

        const {history} = this.props;

        axios.defaults.withCredentials = true;
        await axios.post('http:///api/anuncios', { 
            name: this.state.name,
            photo: this.state.photo,
            description: this.state.description,
            tags: this.state.tags,
            price: parseInt(this.state.price),
            sell: this.state.sell
         }

        ).then(() => {

            history.push("/ads");
        }).catch(err => {

            alert(`no se ha guardado tu anuncio, lo sentimos, ${err}`);
            history.push("/crear");

        })

    }

    Back = () => {

        const {history} = this.props;
        history.goBack();
        
      }

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <button onClick={this.Back}>Volver</button>
                    </Col>
                </Row>

                <Row className="my-5">
                <Col><h4>Crear anuncio</h4></Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Título anuncio</Form.Label>
                            <Form.Control 
                                name="name" 
                                type="text" 
                                placeholder="¿Qué vas a vender?" 
                                onChange={this.handleChangeName}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>URL imagen</Form.Label>
                            <Form.Control 
                                name="photo" 
                                type="text" 
                                placeholder="Url de la imagen" 
                                onChange={this.handleChangePhoto}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Descripción anuncio</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="4" 
                                maxLength="240" 
                                name="description"
                                placeholder="Descríbelo un poco"
                                onChange={this.handleChangeDescription}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Etiquetas</Form.Label>
                            <Form.Control 
                                name="tags" 
                                as="select" 
                                multiple
                                onChange={this.handleChangeTag}
                            >
                                <TagsList />
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control 
                                name="price" 
                                type="number" 
                                min="0"
                                placeholder="¿Por cuánto lo vendes o lo compras?" 
                                onChange={this.handleChangePrice}
                            />

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label as="legend" column>
                                Tipo
                            </Form.Label>
                            <Form.Check
                                custom
                                inline
                                type="radio"
                                name="type"
                                label="Venta"
                                value="sell"
                                id="venta"
                                required
                                onChange={this.handleChangeType}
                                />

                            <Form.Check
                                custom
                                inline
                                type="radio"
                                name="type"
                                label="Compra"
                                value="buy"                                
                                id="buy"
                                required
                                onChange={this.handleChangeType}
                                />
                        </Form.Group>
                    </Form.Row>

                    <FormButton type="submit">
                        Crear
                    </FormButton>

                </Form>
                <hr/>
            </Container>    
        );
    }
}

export default withRouter(CreateAdForm);