import React, { Component } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { TagsList } from "../../services/constants/ads-data";
import { withRouter } from "react-router-dom";
import { FormButton } from "../common/buttons/btn";
import axios from "axios";

class EditAdForm extends Component{
 
    constructor(props){
        super(props);

        const params = new URLSearchParams(window.location.search);
        const { name, desc, price, sell, photo, tags } = this.props.location.state;

        this.state = {
            id: params.get("id"),
            name: name,
            desc: desc,
            price: price,
            sell: sell,
            photo: photo,
            tags: [tags],
            newTags: ""
        }
    }

    
    handleUpdateName = ev => this.setState( { name:ev.target.value } );
    handleUpdatePhoto = ev => this.setState({ photo:ev.target.value });
    handleUpdateDesc = ev => this.setState({ desc:ev.target.value });
    handleUpdatePrice = ev => this.setState({ price:ev.target.value });
    handleUpdateSell = ev => this.setState({ sell:ev.target.value });

    handleUpdateTag = ev => {
       
        const opts = ev.target.options;
        let value = []

        for (var i = 1, l = opts.length; i < l; i++) {

            if (opts[i].selected) {

                value.push(opts[i].value);
            }

        }

        this.setState({newTags:value})

    }
    
    handleSubmit = async ev => {

        ev.preventDefault();

        const {history} = this.props;

        //axios.defaults.withCredentials = true;
        await axios.put(`http://127.0.0.1:3000/api/anuncios/${this.state.id}`, { 
            name: this.state.name,
            price: parseInt(this.state.price),
            description: this.state.desc,
            tags: (this.state.newTags) ? this.state.newTags : this.state.tags,
            sell: this.state.sell,
            photo: this.state.photo
         }
        ).then(() => {

            history.push("/ads");
        }).catch(err => {

            alert(`no se ha guardado tu cambio, lo sentimos. ${err}` );
            history.push("/editar");
            
        })
    }

    Back = () => {
        const {history} = this.props;
        history.goBack();
    }

    render(){

        const {name, photo, desc, tags, price, sell} = this.state;
        let tagsJoined;
        if(tags){
           tagsJoined = tags.map( t => `${t}`).join("");
        }

        return(
            <Container>
                <Row>
                    <Col>
                        <button onClick={this.Back}>Volver</button>
                    </Col>
                </Row>
                <Row className="mt-5 mb-3">
                    <Col className="col-12"><h3>Editar: {this.state.name}</h3></Col>
                    <Col className="col-12"><p>Tags actuales: {tagsJoined}</p></Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Título anuncio</Form.Label>
                            <Form.Control 
                                name="name" 
                                type="text"
                                value={name} 
                                placeholder="¿Qué vas a vender o comprar?" 
                                onChange={this.handleUpdateName}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>URL imagen</Form.Label>
                            <Form.Control 
                                name="photo" 
                                type="text" 
                                value={photo} 
                                placeholder="Url de la imagen" 
                                onChange={this.handleUpdatePhoto}
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
                                value={desc} 
                                placeholder="Descríbelo un poco"
                                onChange={this.handleUpdateDesc}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Etiquetas</Form.Label>
                            <Form.Control 
                                name="tags" 
                                as="select"
                                multiple
                                onChange={this.handleUpdateTag}
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
                                value={price}
                                placeholder="¿Por cuánto lo vendes o lo compras?" 
                                onChange={this.handleUpdatePrice}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>
                                Tipo
                            </Form.Label>
                            <Form.Control
                                as="select" 
                                value={sell}
                                onChange={this.handleUpdateSell}
                            >
                                <option value="sell" id="sell">Venta</option>
                                <option value="buy" id="buy">Compra</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <FormButton type="submit">
                        Actualizar
                    </FormButton>
                </Form>
               
            </Container>  
        );
    }
}

export default withRouter(EditAdForm);