import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Style from './style'
import ProjectService from '../../services/projectService'
import HoursProvisioningService from '../../services/hoursProvisioningService'

export default class HoursProvisioningReal extends React.Component {

    constructor(props){
        super(props)
        this.props = props;
        this.state = {
            showFiltros: true,
            project: {},
            editDados: {},
            newDados: {},
            selectDados: {
                projects: []
            },
            provisionings: []
        }
    }

    componentDidUpdate(){
        console.log("Prov state: ",this.state)
    }

    async componentDidMount(){
        this.props.setLoad(true)
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                let prov = [];
                if(res.data.length > 0){
                    await HoursProvisioningService.getAllFiltered({
                        projectId: res.data[0].id
                    })
                        .then(res2 => {
                            this.setState({
                                ...this.state,
                                provisionings: res2.data == "" ? [] : res2.data
                            })
                            prov = res2.data
                            console.log("RES2: ",res2)
                        })
                        .catch(error => {
                            console.log("EE 2",error)
                        })
                        .finally(() => {
                            this.props.setLoad(false)
                        })
                }
                this.setState({
                    ...this.state,
                    selectDados: {
                        ...this.state.selectDados,
                        projects: res.data == "" ? [] : res.data
                    },
                    project: res.data == "" ? {} : res.data[0]
                })
            })
            .catch(error => {
                console.log("Prov error: "+error);
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    handleProjectFiltro(e){
        this.setState({
            ...this.state,

        })
    }

    render() {
        return (
            <>
                <Viewer>
                    <Style.Container>
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showFiltros}
                                onClick={() => { this.setState({ ...this.state, showFiltros: true }) }}
                            >
                                <p>Provisionamentos</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showFiltros}
                                onClick={() => { this.setState({ ...this.state, showFiltros: false }) }}
                            >
                                <p>Novo / Editar provisionamento</p>
                            </Style.HeaderButton>
                        </Style.HeaderContainer>
                        {this.state.showFiltros ? 
                            <>
                                <Style.Dados>
                                    <Style.DHeader> Filtros </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Projeto</Form.Label>
                                                                <Form.Control as="select" onChange={(event) => { this.handleProject() }}>
                                                                    {
                                                                        this.state.selectDados.projects.map((value, i) => {
                                                                            return (
                                                                                <option value={i} key={value.id} >{value.name}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBigBox>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Recurso</Form.Label>
                                                                <Form.Control as="select" value="Choose...">
                                                                    <option>Selecione...</option>
                                                                    <option>Projeto 1</option>
                                                                    <option>Projeto 2</option>
                                                                    <option>Projeto 3</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Categoria</Form.Label>
                                                                <Form.Control as="select" value="Choose...">
                                                                    <option>Selecione...</option>
                                                                    <option>Projeto 1</option>
                                                                    <option>Projeto 2</option>
                                                                    <option>Projeto 3</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Mês</Form.Label>
                                                                <Form.Control as="select" value="Choose...">
                                                                    <option>Selecione...</option>
                                                                    <option>Projeto 1</option>
                                                                    <option>Projeto 2</option>
                                                                    <option>Projeto 3</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBox>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { console.log("FFF: ",this.state.provisionings) }}>
                                            Filtrar
                                        </Style.BotaoForm>
                                    </Style.DFooter>
                                </Style.Dados>
                                <Style.DadosThree>
                                    <Style.DHeader> Provisionamento de Horas </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.SubContainer>
                                                <Style.Component>
                                                    <Style.DHeaderTwo> Jan/2020 </Style.DHeaderTwo>
                                                    <Style.DBody>
                                                        <Style.DBoxBody>
                                                            {
                                                                this.state.provisionings.map((value, i) => {
                                                                    return (
                                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">"Categoria: { value.category.id }"</Tooltip>}>
                                                                            <span className="d-inline-block">
                                                                                <Button disabled style={{ pointerEvents: 'none' }}>
                                                                                    {value.amountHours}
                                                                            </Button>
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    );
                                                                })
                                                            }
                                                        </Style.DBoxBody>
                                                    </Style.DBody>
                                                </Style.Component>
                                            </Style.SubContainer>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                </Style.DadosThree>
                            </>
                            :
                            <>
                                <Style.DadosTwo>
                                    <Style.DHeader> Dados do Provisionamento </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridProjectAction">
                                                        <Form.Label>Projeto</Form.Label>
                                                        <Form.Control as="select" value="Choose...">
                                                            <option>Selecione...</option>
                                                            <option>Projeto 1</option>
                                                            <option>Projeto 2</option>
                                                            <option>Projeto 3</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBigBox>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Recurso</Form.Label>
                                                        <Form.Control as="select" value="Choose...">
                                                            <option>Selecione...</option>
                                                            <option>Recurso 1</option>
                                                            <option>Recurso 2</option>
                                                            <option>Recurso 3</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                            <Style.DBoxFirstTwo>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" placeholder="Automatico" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstTwo>
                                        </Style.DBoxBody>
                                        <Style.DBoxBodyFlexRight>
                                            <Style.DBoxFirstThree>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Data</Form.Label>
                                                        <Form.Control type="date"></Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstThree>
                                            <Style.DBoxFirstFour>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Horas</Form.Label>
                                                        <Form.Control type="text" placeholder="00h" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstFour>
                                        </Style.DBoxBodyFlexRight>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm>
                                            Gravar
                                        </Style.BotaoForm>
                                        <Style.BotaoForm>
                                            Deletar
                                        </Style.BotaoForm>
                                    </Style.DFooter>
                                </Style.DadosTwo>
                            </>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}